import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
let checks = 0;

function assert(condition, message) {
  checks += 1;
  if (!condition) errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory, predicate) {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) return walk(relative, predicate);
    return predicate(relative) ? [relative] : [];
  });
}

function checkLocalReference(page, reference) {
  if (/^(?:[a-z]+:|\/\/|#)/i.test(reference)) return;
  const clean = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  const target = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(root, path.dirname(page), clean);
  assert(fs.existsSync(target), `${page}: missing local reference ${reference}`);
}

function publishedPage(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  const staticPath = decoded.endsWith("/")
    ? path.join(root, relative, "index.html")
    : path.join(root, path.extname(relative) ? relative : `${relative}.html`);
  return staticPath;
}

const locales = ["ko", "en", "ja", "zh"];
const localeResources = Object.fromEntries(locales.map((locale) => [locale, JSON.parse(read(`${locale}.json`))]));
const localeResourceKeys = Object.keys(localeResources.ko);
for (const locale of locales) {
  assert(localeResourceKeys.every((key) => Object.hasOwn(localeResources[locale], key)), `${locale}.json: translation keys differ from ko.json`);
}
const localePages = Object.fromEntries(locales.map((locale) => [
  locale,
  walk(locale, (file) => file.endsWith(".html")).map((file) => path.posix.basename(file)).sort()
]));
const expectedPages = localePages.ko.join("\n");
for (const locale of locales.slice(1)) {
  assert(localePages[locale].join("\n") === expectedPages, `${locale}: localized page set differs from ko`);
}

const homeContentSets = Object.fromEntries(locales.map((locale) => {
  const html = read(`${locale}/index.html`);
  const cards = [...html.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/gi)]
    .filter(([opening]) => /\bclass=["'][^"']*\bcategory-card\b/i.test(opening))
    .map(([whole, opening, body]) => {
      const category = opening.match(/\bdata-category=["']([^"']+)["']/i)?.[1] || "";
      const destination = body.match(/<a\b[^>]*\bhref=["']([^"']+)["']/i)?.[1] || "";
      return `${category}|${destination}`;
    });
  const disclosures = [...html.matchAll(/<details\b([^>]*)>/gi)]
    .filter(([opening]) => /\bclass=["'][^"']*\bhome-disclosure\b/i.test(opening));
  assert(cards.length === 8, `${locale}/index.html: expected eight home content cards`);
  assert(cards.some((card) => card.endsWith("|late-night-worldcup.html")), `${locale}/index.html: late-night matchup is missing from home`);
  assert(disclosures.length === 2, `${locale}/index.html: both home disclosure sections must remain available`);
  assert(disclosures.every(([opening]) => !/\bopen(?:\s|=|>)/i.test(opening)), `${locale}/index.html: home disclosures should start collapsed`);
  return [locale, cards];
}));
for (const locale of locales.slice(1)) {
  assert(JSON.stringify(homeContentSets[locale]) === JSON.stringify(homeContentSets.ko), `${locale}/index.html: home content cards or destinations differ from ko`);
}

const allHtml = locales.flatMap((locale) => walk(locale, (file) => file.endsWith(".html")));
for (const page of allHtml) {
  const html = read(page);
  const [locale] = page.split("/");
  const slug = path.posix.basename(page, ".html");
  const declaredLocale = html.match(/<html\b[^>]*\blang=["']([^"']+)/i)?.[1]?.slice(0, 2);
  assert(declaredLocale === locale, `${page}: html lang does not match its locale folder`);
  const route = slug === "index" ? `/${locale}/` : `/${locale}/${slug}`;
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  const openGraphUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)?.[1];
  if (slug !== "404") assert(canonical === `https://molgga.com${route}`, `${page}: canonical does not match the clean published route`);
  assert(openGraphUrl === `https://molgga.com${route}`, `${page}: og:url does not match the clean published route`);
  if (slug !== "404") {
    const alternates = new Map([...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)].map((match) => [match[1], match[2]]));
    const localizedRoute = (targetLocale) => slug === "index" ? `/${targetLocale}/` : `/${targetLocale}/${slug}`;
    for (const [language, targetLocale] of [["ko-KR", "ko"], ["en-US", "en"], ["ja", "ja"], ["zh-CN", "zh"], ["x-default", "ko"]]) {
      assert(alternates.get(language) === `https://molgga.com${localizedRoute(targetLocale)}`, `${page}: ${language} alternate does not match the clean route`);
    }
  }
  const title = html.match(/<title\b[^>]*>(.*?)<\/title>/is)?.[1] || "";
  const metadataTitles = [title, ...["og:title", "twitter:title"].map((name) => html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)`, "i"))?.[1] || "")];
  const descriptions = ["description", "og:description", "twitter:description"].map((name) => html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)`, "i"))?.[1] || "");
  assert(metadataTitles.every(Boolean), `${page}: title/Open Graph/Twitter title metadata is incomplete`);
  assert(descriptions.every(Boolean), `${page}: description/Open Graph/Twitter description metadata is incomplete`);
  assert(html.includes("https://cdn.jsdelivr.net/npm/i18next@26.3.6/dist/umd/i18next.min.js"), `${page}: pinned i18next CDN script is missing`);
  assert(html.includes("https://cdn.jsdelivr.net/npm/i18next-http-backend@4.0.1/i18nextHttpBackend.min.js"), `${page}: pinned i18next HTTP backend script is missing`);
  assert(/assets\/js\/i18n\.js\?v=\d{8}-\d+/.test(html), `${page}: i18n.js is missing a cache token`);
  assert(!/(?:i18n-catalog|worldcup-i18n|spending-habits-i18n)\.js/.test(html), `${page}: obsolete translation bundle is still loaded`);
  const i18nKeys = [...html.matchAll(/\bdata-i18n=["']([^"']+)["']/gi)].map(([, key]) => key);
  assert(i18nKeys.length > 0, `${page}: no visible text is connected to i18next`);
  for (const key of i18nKeys) assert(Object.hasOwn(localeResources[locale], key), `${page}: ${locale}.json is missing data-i18n key ${key}`);
  for (const [, declaration] of html.matchAll(/\bdata-i18n-attr=["']([^"']+)["']/gi)) {
    for (const entry of declaration.split(";")) {
      const key = entry.slice(entry.indexOf(":") + 1).trim();
      assert(Object.hasOwn(localeResources[locale], key), `${page}: ${locale}.json is missing metadata key ${key}`);
    }
  }
  if (locale !== "ko") {
    for (const [index, value] of metadataTitles.entries()) assert(!/[\uac00-\ud7af]/.test(value), `${page}: non-Korean title ${index + 1} contains Korean text`);
    for (const [index, description] of descriptions.entries()) assert(!/[\uac00-\ud7af]/.test(description), `${page}: non-Korean description ${index + 1} contains Korean text`);
  }
  if (locale === "ko") assert(Array.from(descriptions[0]).length <= 80, `${page}: Korean description exceeds Naver's 80-character guidance`);
  for (const [, reference] of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)) {
    checkLocalReference(page, reference);
  }
}

const updatedAboutOfferings = "현재 몰까에서는 주말 취향·야식 월드컵과 동물상, MBTI, 테토/에겐, 애착 유형, 전생, 소비 습관 테스트를 즐길 수 있습니다. 애착 유형 콘텐츠는 연구 자료를 참고하고, 각 콘텐츠의 질문과 설명은 몰까가 직접 작성합니다. 외부 테스트 문항이나 다른 사이트의 결과를 그대로 옮기지 않습니다.";
const updatedResultNote = "결과는 각 페이지에서 선택한 내용에 따른 참고 정보입니다. 월드컵은 마지막까지 선택한 항목을 보여 주며, 야식 월드컵 랭킹에는 완주한 대진의 우승 메뉴가 집계됩니다. 성향 테스트는 선택에서 드러난 경향을 살펴보는 콘텐츠입니다. 어떤 결과도 전문 심리검사나 의료·법률·교육·채용 판단을 대신하지 않습니다.";
for (const [locale, expected] of Object.entries({
  en: ["Try the weekend and late-night food matchups, plus quizzes about animal characters, MBTI, Teto/Egen, attachment styles, past lives, and spending habits. Attachment-style content draws on research, and molgga writes its own questions and explanations. We do not copy questions or results from other sites.", "Results are a reference based on the choices you make on each page. A matchup shows the item you select through the final round; the late-night food leaderboard counts winners from completed matchups. Preference quizzes offer a light look at tendencies in your answers. None of these results replace professional psychological testing or medical, legal, educational, or employment decisions."],
  ja: ["molggaでは、週末や夜食のマッチ、動物タイプ・MBTI・テト／エゲン・愛着スタイル・前世・お金の使い方に関するテストを楽しめます。愛着スタイルの内容は研究資料を参考にし、質問と説明はmolggaが作成しています。他のテストの設問や結果をそのまま転載していません。", "結果は各ページで選んだ内容をもとにした参考情報です。マッチでは最後まで選んだ項目が表示され、夜食マッチのランキングには完了した対戦の優勝メニューが集計されます。好みのテストは回答に表れた傾向を気軽に見るためのものです。専門的な心理検査や医療・法律・教育・採用の判断に代わるものではありません。"],
  zh: ["molgga提供周末和夜宵选择赛，以及动物、MBTI、Teto/Egen、依恋类型、前世和消费习惯测试。依恋类型内容参考相关研究，各项问题和说明均由molgga原创。我们不会照搬其他测试的问题或其他网站的结果。", "结果仅供参考，依据你在各页面中的选择生成。选择赛会显示你一路选到最后的项目；夜宵排行榜只统计完成整场对决后胜出的菜单。偏好测试用于轻松了解答案中体现的倾向，不能替代专业心理测评或医疗、法律、教育、招聘等判断。"]
})) {
  const aboutHtml = read(`${locale}/about.html`);
  assert(aboutHtml.includes(updatedAboutOfferings) && aboutHtml.includes(updatedResultNote), `${locale}: About page source text is out of sync with its translation keys`);
  const translate = (value) => localeResources[locale][value] ?? localeResources.ko[value] ?? value;
  const homeHtml = read(`${locale}/index.html`)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const homeText = homeHtml.replace(/<[^>]*>/g, "\n").split(/\n/)
    .map((value) => value.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim())
    .filter((value) => /[\uac00-\ud7af]/.test(value));
  const homeLabels = [...homeHtml.matchAll(/\b(?:aria-label|title|placeholder)=["']([^"']+)["']/gi)]
    .map(([, value]) => value)
    .filter((value) => /[\uac00-\ud7af]/.test(value));
  const untranslatedHomeCopy = [...new Set([...homeText, ...homeLabels])]
    .filter((value) => translate(value) === value);
  assert(untranslatedHomeCopy.length === 0, `${locale}: home page has missing translations: ${untranslatedHomeCopy.join(" | ")}`);
  assert(translate(updatedAboutOfferings) === expected[0], `${locale}: About offerings paragraph translation is missing or stale`);
  assert(translate(updatedResultNote) === expected[1], `${locale}: result interpretation paragraph translation is missing or stale`);
  if (locale === "ja") {
    assert(!/ナダム/.test(translate("가까움도 나다움도 함께 지켜요.")), "ja: attachment result copy contains a transliteration error");
    assert(!/制格/.test(translate("전생의 당신은 궁과 마을 사이를 오가던 심부름꾼 토끼였어요. 발이 빨라 급한 소식을 전하는 데 늘 제격이었고, 가는 길에 새로운 친구도 자주 만들었죠.")), "ja: past-life result copy contains a mistranslation");
  }
  if (locale === "zh") {
    assert(translate("/ 몰까 소개") === "/ 关于 molgga", "zh: About breadcrumb contains a corrupted translation");
    assert(translate("문의 안내") === "联系说明", "zh: contact label contains a corrupted translation");
  }
}

for (const [, reference] of read("assets/css/styles.css").matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
  checkLocalReference("assets/css/styles.css", reference.trim());
}

const sitemap = read("sitemap.xml");
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
  const pathname = new URL(url, "https://molgga.com").pathname;
  assert(!/\.html$/i.test(pathname), `sitemap.xml: legacy .html route is listed: ${pathname}`);
  assert(fs.existsSync(publishedPage(pathname)), `sitemap.xml: missing page ${pathname}`);
}

const redirectLines = read("_redirects").split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("#"));
for (const line of redirectLines) {
  const [, destination] = line.trim().split(/\s+/);
  if (!destination || destination.includes(":")) continue;
  assert(fs.existsSync(publishedPage(destination)), `_redirects: missing destination ${destination}`);
}

for (const file of [...walk("assets/js", (entry) => entry.endsWith(".js")), ...walk("functions", (entry) => entry.endsWith(".js")), "scripts/audit-integrations.mjs"]) {
  const result = spawnSync(process.execPath, ["--input-type=module", "--check"], { input: read(file), encoding: "utf8" });
  assert(result.status === 0, `${file}: JavaScript syntax check failed${result.stderr ? ` (${result.stderr.trim()})` : ""}`);
}

const measurementIds = new Set();
for (const page of allHtml) {
  const html = read(page);
  const scripts = [...html.matchAll(/googletagmanager\.com\/gtag\/js\?id=([^&"']+)/g)].map((match) => match[1]);
  const configs = [...html.matchAll(/gtag\(['"]config['"],\s*['"]([^'"]+)/g)].map((match) => match[1]);
  assert(scripts.length === 1 && configs.length === 1 && scripts[0] === configs[0], `${page}: Google Analytics loader/config missing or mismatched`);
  if (scripts[0]) measurementIds.add(scripts[0]);
}
assert(measurementIds.size <= 1, `localized pages use inconsistent Google Analytics IDs: ${[...measurementIds].join(", ")}`);

const appSource = read("assets/js/app.js");
const animalProfiles = new Map([...appSource.matchAll(/^\s{6}([a-z]+): \{[^\n]*?\bimage: "([^"]+)"/gm)].map((match) => [match[1], match[2]]));
const animalHtml = read("ko/animal-test.html");
const animalQuestions = new Set([...animalHtml.matchAll(/\bname="q(\d+)"/g)].map((match) => Number(match[1])));
assert(animalQuestions.size === 10 && [...animalQuestions].every((number) => number >= 1 && number <= 10), "animal quiz: question names must cover q1 through q10");
assert(animalProfiles.size === 6, "animal quiz: expected six result profiles");
for (const [, value] of animalHtml.matchAll(/\bname="q\d+"[^>]*\bvalue="([^"]+)"/g)) {
  for (const profileId of value.split(",")) assert(animalProfiles.has(profileId), `animal quiz: answer scores unknown profile ${profileId}`);
}
for (const [profileId, image] of animalProfiles) {
  assert(fs.existsSync(path.resolve(root, "ko", image)), `animal/${profileId}: missing result image ${image}`);
}

const mbtiProfiles = new Map([...appSource.matchAll(/^\s{6}([A-Z]{4}): \{ title: "[^"]+", image: "([^"]+)"/gm)].map((match) => [match[1], match[2]]));
const mbtiHtml = read("ko/mbti.html");
const expectedMbtiNames = ["ei", "sn", "tf", "jp"].flatMap((axis) => [1, 2, 3, 4, 5].map((number) => `${axis}${number}`));
const mbtiQuestions = new Set([...mbtiHtml.matchAll(/\bname="((?:ei|sn|tf|jp)[1-5])"/g)].map((match) => match[1]));
assert(expectedMbtiNames.every((name) => mbtiQuestions.has(name)) && mbtiQuestions.size === 20, "MBTI quiz: form fields must cover all 20 axis questions");
const expectedAxisValues = { ei: ["E", "I"], sn: ["S", "N"], tf: ["T", "F"], jp: ["J", "P"] };
const mbtiFieldValues = new Map();
for (const [, name, value] of mbtiHtml.matchAll(/\bname="((?:ei|sn|tf|jp)[1-5])"[^>]*\bvalue="([^"]+)"/g)) {
  if (!mbtiFieldValues.has(name)) mbtiFieldValues.set(name, new Set());
  mbtiFieldValues.get(name).add(value);
}
for (const name of expectedMbtiNames) {
  const expected = expectedAxisValues[name.slice(0, 2)];
  const actual = [...(mbtiFieldValues.get(name) || [])].sort();
  assert(JSON.stringify(actual) === JSON.stringify([...expected].sort()), `MBTI quiz: ${name} does not offer both expected axis answers`);
}
const mbtiTypes = ["E", "I"].flatMap((ei) => ["S", "N"].flatMap((sn) => ["T", "F"].flatMap((tf) => ["J", "P"].map((jp) => ei + sn + tf + jp))));
assert(mbtiProfiles.size === 16 && mbtiTypes.every((type) => mbtiProfiles.has(type)), "MBTI quiz: one or more of the 16 result profiles are missing");
for (const [type, image] of mbtiProfiles) {
  assert(fs.existsSync(path.resolve(root, "ko", image)), `MBTI/${type}: missing result image ${image}`);
}

const worldcupSandbox = { window: {} };
vm.runInNewContext(read("assets/js/worldcup-data.js"), worldcupSandbox, { timeout: 1000 });
const frontendCups = worldcupSandbox.window.MOLGGA_WORLDCUPS;
const backendSource = read("functions/_shared/worldcup-config.js").replace(
  "export const WORLD_CUPS =",
  "globalThis.WORLD_CUPS ="
);
const backendSandbox = {};
vm.runInNewContext(backendSource, backendSandbox, { timeout: 1000 });
const backendCups = backendSandbox.WORLD_CUPS;
assert(JSON.stringify(Object.keys(frontendCups).sort()) === JSON.stringify(Object.keys(backendCups).sort()), "worldcup frontend/backend game IDs differ");

for (const [gameId, config] of Object.entries(frontendCups)) {
  const backend = backendCups[gameId];
  if (!backend) continue;
  assert(JSON.stringify([...config.availableBrackets].sort()) === JSON.stringify([...backend.brackets].sort()), `${gameId}: frontend/backend bracket sizes differ`);
  const ids = config.items.map((item) => item.id);
  assert(new Set(ids).size === ids.length, `${gameId}: duplicate item IDs`);
  assert(JSON.stringify([...ids].sort()) === JSON.stringify([...backend.items].sort()), `${gameId}: frontend/backend item IDs differ`);
  for (const bracket of config.availableBrackets) {
    assert(Number.isInteger(bracket) && bracket >= 2 && bracket <= ids.length && (bracket & (bracket - 1)) === 0, `${gameId}: invalid bracket size ${bracket}`);
    let round = [...ids].slice(0, bracket);
    let played = 0;
    while (round.length > 1) {
      round = round.filter((_, index) => index % 2 === 0);
      played += round.length;
    }
    assert(round.length === 1 && played === bracket - 1, `${gameId}: ${bracket}-bracket does not resolve to one winner`);
  }
  for (const item of config.items) {
    for (const locale of locales) {
      assert(typeof item.name?.[locale] === "string" && item.name[locale].trim(), `${gameId}/${item.id}: missing ${locale} name`);
      assert(typeof item.detail?.[locale] === "string" && item.detail[locale].trim(), `${gameId}/${item.id}: missing ${locale} detail`);
    }
    assert(fs.existsSync(path.resolve(root, "ko", item.image)), `${gameId}/${item.id}: missing image ${item.image}`);
  }
  for (const locale of locales) {
    const page = `${locale}/${config.page}`;
    const html = read(page);
    assert(html.includes(`data-worldcup-game="${gameId}"`), `${page}: game root is missing or mismatched`);
    for (const bracket of config.availableBrackets) {
      assert(html.includes(`data-bracket-size="${bracket}"`), `${page}: missing ${bracket}-round selection`);
    }
  }
}
const worldcupScriptVersions = new Set();
for (const page of allHtml.filter((file) => /(?:^|\/)(?:late-night-)?worldcup\.html$/.test(file))) {
  const version = read(page).match(/assets\/js\/worldcup\.js\?v=([^"']+)/)?.[1];
  assert(Boolean(version), `${page}: worldcup.js cache token is missing`);
  if (version) worldcupScriptVersions.add(version);
}
assert(worldcupScriptVersions.size === 1, `World Cup pages use inconsistent worldcup.js cache tokens: ${[...worldcupScriptVersions].join(", ")}`);

const archetypeFiles = [
  "assets/js/teto-egen-data.js",
  "assets/js/attachment-data.js",
  "assets/js/past-life-data.js",
  "assets/js/spending-habits-data.js"
];
const archetypeSandbox = { window: {} };
for (const file of archetypeFiles) vm.runInNewContext(read(file), archetypeSandbox, { timeout: 1000 });
for (const [testId, config] of Object.entries(archetypeSandbox.window.MOA_ARCHETYPE_TESTS || {})) {
  const profileIds = Object.keys(config.profiles || {});
  assert(config.questions?.length > 0, `${testId}: no questions configured`);
  const statedCount = config.eyebrow?.match(/·\s*(\d+)문항/)?.[1];
  assert(Boolean(statedCount) && Number(statedCount) === config.questions.length, `${testId}: eyebrow count is missing or does not match question data`);
  config.questions.forEach((question, questionIndex) => {
    assert(typeof question.prompt === "string" && question.prompt.trim(), `${testId}: question ${questionIndex + 1} has no prompt`);
    assert(/(?:마지막\s*질문|last\s+question|final\s+question)/i.test(question.prompt) === false, `${testId}: question ${questionIndex + 1} hard-codes a final-question label`);
    assert(question.choices?.length >= 2, `${testId}: question ${questionIndex + 1} has fewer than two choices`);
    for (const choice of question.choices || []) {
      assert(choice.scores?.length > 0, `${testId}: question ${questionIndex + 1} has a choice without scores`);
      for (const profileId of choice.scores || []) assert(profileIds.includes(profileId), `${testId}: question ${questionIndex + 1} scores unknown profile ${profileId}`);
    }
  });
  for (const [profileId, profile] of Object.entries(config.profiles || {})) {
    for (const compatibleId of [...(profile.good || []), ...(profile.tricky || [])]) {
      assert(profileIds.includes(compatibleId), `${testId}/${profileId}: compatibility refers to unknown profile ${compatibleId}`);
    }
    const image = profile.image || profile.imageFile;
    if (image) assert(fs.existsSync(path.resolve(root, "ko", image)), `${testId}/${profileId}: missing result image ${image}`);
  }
}

function loadApi(relativePath, exportedName, sandbox) {
  const source = read(relativePath)
    .replace(/^import \{ WORLD_CUPS \} from [^;]+;\s*/m, "")
    .replace(`export async function ${exportedName}`, `globalThis.${exportedName} = async function`);
  vm.runInNewContext(source, sandbox, { timeout: 1000 });
  return sandbox[exportedName];
}

const apiContext = () => ({ WORLD_CUPS: backendCups, URL, Request, Response, JSON, Number, Object, RegExp, TextDecoder, Uint8Array });
const onRequestPost = loadApi("functions/api/worldcup-vote.js", "onRequestPost", apiContext());
const onRequestGet = loadApi("functions/api/worldcup-rankings.js", "onRequestGet", apiContext());
const writes = [];
const mockDb = {
  prepare(sql) {
    return {
      bind(...values) {
        return {
          async run() { writes.push({ sql, values }); return { meta: { changes: 1 } }; },
          async all() { return { results: [{ itemId: "cup-ramyeon", wins: 3 }] }; }
        };
      }
    };
  }
};
const validVote = { gameId: "late-night-food", itemId: "cup-ramyeon", bracketSize: 16, voteId: "audit-vote-123456" };
const post = async (body, origin = "https://molgga.com", db = mockDb) => onRequestPost({
  request: new Request("https://molgga.com/api/worldcup-vote", {
    method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body)
  }), env: { MOLGGA_DB: db }
});

let response = await post(validVote);
let body = await response.json();
assert(response.status === 200 && body.accepted === true, "vote API rejects a valid vote");
assert(writes.length === 1 && writes[0].values.join("|") === "audit-vote-123456|late-night-food|cup-ramyeon|16", "vote API writes unexpected fields");
response = await post(validVote, "https://attacker.example");
assert(response.status === 403, "vote API accepts a mismatched Origin");
response = await onRequestPost({ request: new Request("https://molgga.com/api/worldcup-vote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(validVote) }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 403, "vote API accepts a request without an Origin header");
response = await post({ ...validVote, itemId: "not-a-menu-item" });
assert(response.status === 400, "vote API accepts an unknown item ID");
response = await post({ ...validVote, gameId: "__proto__" });
assert(response.status === 400, "vote API does not safely reject a prototype-key game ID");
response = await post({ ...validVote, gameId: "constructor" });
assert(response.status === 400, "vote API does not safely reject an inherited-key game ID");
response = await post({ ...validVote, bracketSize: 15 });
assert(response.status === 400, "vote API accepts an unsupported bracket size");
response = await post({ ...validVote, voteId: "short" });
assert(response.status === 400, "vote API accepts a malformed vote ID");
response = await onRequestPost({ request: new Request("https://molgga.com/api/worldcup-vote", { method: "POST", headers: { origin: "https://molgga.com" }, body: "x".repeat(4096) }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 413, "vote API accepts an oversized body without a Content-Length header");
response = await onRequestPost({ request: new Request("https://molgga.com/api/worldcup-vote", { method: "POST", headers: { origin: "https://molgga.com" }, body: "{" }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 400, "vote API accepts malformed JSON");
response = await post(validVote, "https://molgga.com", null);
assert(response.status === 503, "vote API does not report missing database binding");
response = await onRequestGet({ request: new Request("https://molgga.com/api/worldcup-rankings?gameId=late-night-food"), env: { MOLGGA_DB: mockDb } });
body = await response.json();
assert(response.status === 200 && body.items?.[0]?.itemId === "cup-ramyeon", "ranking API fails to return grouped results");
response = await onRequestGet({ request: new Request("https://molgga.com/api/worldcup-rankings?gameId=unknown"), env: { MOLGGA_DB: mockDb } });
assert(response.status === 400, "ranking API accepts an unknown game ID");

const readme = read("README.md");
const documentedDatabase = readme.match(/D1 데이터베이스 `([^`]+)`/)?.[1];
const migrationCommand = readme.match(/wrangler d1 execute ([^\s`]+)/)?.[1];
assert(Boolean(documentedDatabase) && documentedDatabase === migrationCommand, "README: D1 database name differs from migration command");
assert(readme.includes("MOLGGA_DB") && read("functions/api/worldcup-vote.js").includes("env.MOLGGA_DB") && read("functions/api/worldcup-rankings.js").includes("env.MOLGGA_DB"), "D1 binding name differs between documentation and API routes");
assert(readme.includes("Rate Limiting 규칙") && readme.includes("Origin"), "README does not document Origin validation and the external rate-limiting requirement");
const i18nScriptVersions = new Set();
for (const page of allHtml) {
  const references = [...read(page).matchAll(/assets\/js\/i18n\.js(?:\?v=([^"']+))?/g)];
  for (const [, version] of references) {
    assert(Boolean(version), `${page}: i18n.js is missing a cache token`);
    if (version) i18nScriptVersions.add(version);
  }
}
assert(i18nScriptVersions.size === 1, `localized pages use missing or inconsistent i18n.js cache tokens: ${[...i18nScriptVersions].join(", ")}`);
assert(Object.keys(localeResources.ko).length === Object.keys(localeResources.en).length
  && Object.keys(localeResources.ko).length === Object.keys(localeResources.ja).length
  && Object.keys(localeResources.ko).length === Object.keys(localeResources.zh).length,
`${locales.join(", ")}.json: translation resource sizes differ`);
const migration = read("migrations/0001_worldcup_votes.sql");
for (const column of ["vote_id", "game_id", "item_id", "bracket_size", "created_at"]) {
  assert(new RegExp(`\\b${column}\\b`, "i").test(migration), `D1 migration is missing ${column}`);
}
assert(/vote_id\s+TEXT\s+PRIMARY KEY/i.test(migration), "D1 vote ID is not a primary key for idempotency");
assert(/CHECK\s*\(bracket_size\s+IN\s*\(8,\s*16,\s*32\)\)/i.test(migration), "D1 bracket constraint differs from supported bracket sizes");
assert(/INSERT\s+OR\s+IGNORE\s+INTO\s+worldcup_votes/i.test(read("functions/api/worldcup-vote.js")), "vote API is missing idempotent insert behavior");
assert(/GROUP\s+BY\s+item_id[\s\S]*ORDER\s+BY\s+wins\s+DESC[\s\S]*LIMIT\s+10/i.test(read("functions/api/worldcup-rankings.js")), "ranking query does not aggregate and limit top items");

if (errors.length) {
  console.error(`Integration audit failed (${errors.length} issues across ${checks} checks):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Integration audit passed: ${checks} checks across ${allHtml.length} localized pages, localized SEO and translations, World Cup data/APIs, archetype data, assets, sitemap, redirects, and D1 docs.`);
}
