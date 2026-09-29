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
const registrySandbox = { window: {} };
vm.runInNewContext(read("assets/js/content-registry.js"), registrySandbox, { timeout: 1000 });
const contentRegistry = registrySandbox.window.MOLGGA_CONTENT_REGISTRY;
assert(contentRegistry?.schemaVersion === 1, "content registry: missing supported schema version");
const registryCategoryIds = contentRegistry?.categories?.map((category) => category.id) || [];
const registryContents = contentRegistry?.contents || [];
const registryContentIds = registryContents.map((content) => content.id);
assert(new Set(registryCategoryIds).size === registryCategoryIds.length, "content registry: duplicate category IDs");
assert(new Set(registryContentIds).size === registryContentIds.length, "content registry: duplicate content IDs");
for (const category of contentRegistry?.categories || []) {
  for (const locale of locales) assert(Boolean(localeResources[locale][category.labelKey]), `${locale}.json: missing content category label ${category.labelKey}`);
}
for (const content of registryContents) {
  assert(Boolean(content.id && content.type && content.page && content.source?.kind), `content registry: incomplete identity or source for ${content.id || "unknown"}`);
  assert(Boolean(content.cardLabelKey && content.createdAt && /^\d{4}-\d{2}-\d{2}$/.test(content.createdAt)), `content registry: card label or creation date is missing for ${content.id}`);
  for (const locale of locales) assert(Boolean(localeResources[locale][content.cardLabelKey]), `${locale}.json: missing ${content.id} card label translation ${content.cardLabelKey}`);
  assert(content.categoryIds?.length > 0 && content.categoryIds.every((id) => registryCategoryIds.includes(id)), `content registry: invalid categories for ${content.id}`);
  assert(content.tagIds?.length > 0 && content.tagIds.every(Boolean), `content registry: missing tags for ${content.id}`);
  for (const tagId of content.tagIds || []) {
    for (const locale of locales) assert(Boolean(localeResources[locale][`tag.${tagId}`]), `${locale}.json: missing ${content.id} search tag translation tag.${tagId}`);
  }
  assert(Boolean(content.metrics && Number.isInteger(content.metrics.estimatedMinutes || Math.min(...Object.values(content.metrics.estimatedMinutesByBracket || {})))), `content registry: missing estimated duration for ${content.id}`);
  assert(fs.existsSync(path.join(root, content.thumbnail?.replace(/^\//, "") || "__missing_thumbnail__")), `content registry: missing thumbnail for ${content.id}`);
  assert(fs.existsSync(path.join(root, "ko", content.page)), `content registry: missing Korean page for ${content.id}`);
  for (const key of [content.titleKey, content.descriptionKey]) {
    for (const locale of locales) assert(Boolean(localeResources[locale][key]), `${locale}.json: missing ${content.id} metadata translation ${key}`);
  }
}
assert(registryContents.some((content) => content.id === "travel-role" && content.source?.kind === "archetype" && content.page === "travel-role-test.html"), "content registry: travel-role quiz is not registered for the shared archetype engine");
assert(registryContents.some((content) => content.id === "romance-style" && content.source?.kind === "archetype" && content.page === "romance-style-test.html"), "content registry: romance-style quiz is not registered for the shared archetype engine");
for (const locale of locales) {
  assert(localeResourceKeys.every((key) => Object.hasOwn(localeResources[locale], key)), `${locale}.json: translation keys differ from ko.json`);
  if (locale !== "ko") {
    const untranslated = Object.entries(localeResources[locale]).filter(([, value]) => typeof value === "string" && /[\uac00-\ud7af]/.test(value));
    assert(untranslated.length === 0, `${locale}.json: translated values still contain Korean script: ${untranslated.slice(0, 5).map(([key]) => key).join(", ")}`);
  }
}
const phaseTwoTranslationKeys = [
  "contentBrowser.search.label", "contentBrowser.search.placeholder", "contentBrowser.category.label",
  "contentBrowser.category.all", "contentBrowser.sort.label", "contentBrowser.sort.popular", "contentBrowser.sort.popularLoading",
  "contentBrowser.sort.popularUnavailable", "contentBrowser.sort.latest",
  "contentBrowser.view.label", "contentBrowser.view.grid",
  "contentBrowser.view.compact", "contentBrowser.view.list", "contentBrowser.results.count",
  "contentBrowser.results.empty", "contentBrowser.results.reset", "contentBrowser.metrics.label",
  "contentBrowser.metrics.quiz", "contentBrowser.metrics.worldcup", "contentBrowser.preview.label",
  "contentBrowser.preview.close", "contentBrowser.preview.cancel", "contentBrowser.preview.start",
  "contentBrowser.preview.pool", "contentBrowser.preview.actionLabel", "contentBrowser.recommendations.title",
  "contentBrowser.recommendations.description", "contentBrowser.recommendations.start",
  "나도 테스트하기", "나도 월드컵 해보기", "animal.sharePrompt", "mbti.sharePrompt"
];
const phaseThreeTranslationKeys = [
  "contentActivity.scope.label", "contentActivity.scope.all", "contentActivity.scope.favorites",
  "contentActivity.scope.recent", "contentActivity.favorite.add", "contentActivity.favorite.remove",
  "contentActivity.empty.favorites", "contentActivity.empty.recent", "contentActivity.recent.title",
  "contentActivity.recent.clear", "contentActivity.suggestions.title", "contentActivity.suggestions.open",
  "privacy.quizAnswers", "privacy.localContentPreferences", "privacy.contentStartCounts", "privacy.storageNotice",
  "privacy.adCookiesDisclosure", "privacy.adSettingsIntro", "privacy.adSettingsMiddle", "privacy.adSettingsSuffix",
  "2026년 9월 29일", "PRIVACY · 시행일 2026년 9월 29일", "aboutads.info 광고 선택"
];
for (const locale of locales) {
  for (const key of phaseTwoTranslationKeys) assert(Boolean(localeResources[locale][key]), `${locale}.json: missing phase 2 UI translation ${key}`);
  for (const key of phaseThreeTranslationKeys) assert(Boolean(localeResources[locale][key]), `${locale}.json: missing phase 3 UI or privacy translation ${key}`);
}

const activityStorage = new Map();
const activityWindow = {
  MOLGGA_CONTENT_REGISTRY: contentRegistry,
  location: { pathname: "/ko/worldcup" },
  localStorage: {
    getItem(key) { return activityStorage.get(key) ?? null; },
    setItem(key, value) { activityStorage.set(key, value); }
  },
  addEventListener() {},
  dispatchEvent() {}
};
vm.runInNewContext(read("assets/js/content-activity.js"), { window: activityWindow, Date, Event, JSON, Number, Object, Array, Set }, { timeout: 1000 });
const activityApi = activityWindow.MOLGGA_CONTENT_ACTIVITY;
assert(activityApi?.getState().recent[0]?.id === "weekend", "content activity: opening a registered content route is not recorded locally");
assert(activityApi?.toggleFavorite("mbti") === true && activityApi.isFavorite("mbti"), "content activity: favorite cannot be added");
assert(activityApi?.toggleFavorite("mbti") === false && !activityApi.isFavorite("mbti"), "content activity: favorite cannot be removed");
activityApi?.toggleFavorite("animal-test");
activityApi?.clearRecent();
const storedActivity = JSON.parse(activityStorage.get("molgga.contentActivity.v1") || "{}");
assert(storedActivity.recent.length === 0 && storedActivity.favorites.includes("animal-test"), "content activity: clear recent removes favorites or keeps recent entries");
assert(Object.keys(storedActivity).sort().join(",") === "favorites,recent", "content activity: unexpected data fields are persisted");
assert(storedActivity.favorites.every((id) => registryContentIds.includes(id)) && activityApi.getState().recent.length === 0, "content activity: invalid content IDs are retained");
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
  assert(html.includes('data-content-browser'), `${locale}/index.html: shared content browser mount point is missing`);
  assert(html.includes('content-registry.js?v=20260929-2') && html.includes('content-activity.js?v=20260928-1') && html.includes('content-browser.js?v=20260929-4'), `${locale}/index.html: shared content browser scripts are missing or stale`);
  assert(html.includes('content-activity.css?v=20260929-5'), `${locale}/index.html: local activity controls stylesheet is missing or stale`);
  const staticCards = [...html.matchAll(/<article\b[^>]*\bclass=["'][^"']*\bcategory-card\b/gi)];
  const disclosures = [...html.matchAll(/<details\b([^>]*)>/gi)]
    .filter(([opening]) => /\bclass=["'][^"']*\bhome-disclosure\b/i.test(opening));
  assert(staticCards.length === 0, `${locale}/index.html: cards are duplicated in HTML instead of generated from the shared registry`);
  assert(/<div\b(?=[^>]*\bclass=["'][^"']*\bcategory-grid\b[^"']*["'])(?=[^>]*\bdata-category-list(?:\s|=|>))[^>]*>/i.test(html), `${locale}/index.html: dynamic registry card mount point is missing`);
  assert(read("assets/js/content-browser.js").includes("registry.contents.forEach") && read("assets/js/content-browser.js").includes("const makeCard ="), `${locale}/index.html: shared registry card renderer is missing`);
  const cards = registryContents.map((content) => `${content.id}|${content.categoryIds[0]}|${content.page}`);
  assert(cards.length === registryContents.length && new Set(cards.map((card) => card.split("|")[0])).size === registryContents.length, `${locale}/index.html: registry card data does not map one-to-one`);
  assert(registryContents.some((content) => content.page === "late-night-worldcup.html"), `${locale}/index.html: late-night matchup is missing from registry`);
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
  if (slug === "privacy") {
    assert(html.includes('data-i18n="privacy.adCookiesDisclosure"'), `${page}: Google ad cookie disclosure is missing`);
    assert(html.includes('data-i18n="privacy.contentStartCounts"'), `${page}: aggregate popularity disclosure is missing`);
    assert(html.includes('href="https://adssettings.google.com/"') && html.includes('href="https://www.aboutads.info/choices/"'), `${page}: ad preference controls are missing`);
    assert(html.includes('2026년 9월 29일'), `${page}: privacy policy update date is stale`);
  }
  if (slug === "index" || registryContents.some((content) => path.posix.basename(content.page, ".html") === slug)) {
    assert(html.includes('content-activity.js?v=20260928-1'), `${page}: local content activity script is missing or stale`);
  }
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
  assert(/assets\/css\/styles\.css\?v=20260929-1/.test(html), `${page}: shared styles are missing or stale`);
  assert(!/(?:i18n-catalog|worldcup-i18n|spending-habits-i18n)\.js/.test(html), `${page}: obsolete translation bundle is still loaded`);
  const i18nKeys = [...html.matchAll(/\bdata-i18n=["']([^"']+)["']/gi)].map(([, key]) => key);
  assert(i18nKeys.length > 0, `${page}: no visible text is connected to i18next`);
  for (const key of i18nKeys) assert(Object.hasOwn(localeResources[locale], key), `${page}: ${locale}.json is missing data-i18n key ${key}`);
  const hasContentResult = /data-(?:quiz|worldcup)-result\b|id=["'](?:animal-result|mbti-result)["']/.test(html);
  if (hasContentResult) {
    assert(html.includes('content-registry.js?v=20260929-2'), `${page}: result recommendations lack the shared content registry`);
    assert(html.includes('content-recommendations.js?v=20260928-1'), `${page}: shared result recommendations are not loaded`);
  }
  for (const [, declaration] of html.matchAll(/\bdata-i18n-attr=["']([^"']+)["']/gi)) {
    for (const entry of declaration.split(";")) {
      const key = entry.slice(entry.indexOf(":") + 1).trim();
      assert(Object.hasOwn(localeResources[locale], key), `${page}: ${locale}.json is missing metadata key ${key}`);
    }
  }
  if (locale !== "ko") {
    for (const [index, value] of metadataTitles.entries()) assert(!/[\uac00-\ud7af]/.test(value), `${page}: non-Korean title ${index + 1} contains Korean text`);
    for (const [index, description] of descriptions.entries()) assert(!/[\uac00-\ud7af]/.test(description), `${page}: non-Korean description ${index + 1} contains Korean text`);
    const untranslatedAttributes = [...html.matchAll(/\b(?:aria-label|title|placeholder|alt)=["']([^"']*)["']/gi)]
      .map(([, value]) => value)
      .filter((value) => /[\uac00-\ud7af]/.test(value));
    assert(untranslatedAttributes.length === 0, `${page}: localized accessibility or form attributes still contain Korean: ${untranslatedAttributes.join(" | ")}`);
  }
  if (locale === "ko") assert(Array.from(descriptions[0]).length <= 80, `${page}: Korean description exceeds Naver's 80-character guidance`);
  for (const [, reference] of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)) {
    checkLocalReference(page, reference);
  }
}

const updatedAboutOfferings = "주말·야식 월드컵, 동물상·MBTI·테토/에겐·애착 유형·전생·소비 습관·친구 여행 역할 테스트를 즐길 수 있습니다. 야식 월드컵은 50개 메뉴에서 16강 또는 32강 대진을 무작위로 구성하고, 전생 테스트는 25문항으로 진행합니다. 애착 유형 콘텐츠는 연구 자료를 참고하며, 각 콘텐츠의 질문과 설명은 몰까가 직접 작성합니다.";
const updatedResultNote = "결과는 각 페이지에서 선택한 내용에 따른 참고 정보입니다. 월드컵은 마지막까지 선택한 항목을 보여 주며, 야식 월드컵 랭킹에는 완주한 대진의 우승 메뉴가 집계됩니다. 성향 테스트는 선택에서 드러난 경향을 살펴보는 콘텐츠입니다. 어떤 결과도 전문 심리검사나 의료·법률·교육·채용 판단을 대신하지 않습니다.";
for (const [locale, expected] of Object.entries({
  en: ["Explore the weekend and late-night food matchups, plus quizzes about animal styles, MBTI, Teto/Egen, attachment styles, past lives, spending habits, and your role on a trip with friends. The late-night matchup randomly draws a 16- or 32-entry bracket from 50 dishes, and the past-life quiz now takes 25 questions. Attachment-style content draws on research; molgga writes its own questions and explanations.", "Results are a reference based on the choices you make on each page. A matchup shows the item you select through the final round; the late-night food leaderboard counts winners from completed matchups. Preference quizzes offer a light look at tendencies in your answers. None of these results replace professional psychological testing or medical, legal, educational, or employment decisions."],
  ja: ["週末・夜食の対決、動物タイプ・MBTI・テト／エゲン・愛着スタイル・前世・お金の使い方・友達との旅行での役割テストを楽しめます。夜食対決は50種類のメニューから16または32品をランダムに選び、前世テストは25問で遊べます。愛着スタイルの内容は研究資料を参考にし、質問と説明はmolggaが作成しています。", "結果は各ページで選んだ内容をもとにした参考情報です。マッチでは最後まで選んだ項目が表示され、夜食マッチのランキングには完了した対戦の優勝メニューが集計されます。好みのテストは回答に表れた傾向を気軽に見るためのものです。専門的な心理検査や医療・法律・教育・採用の判断に代わるものではありません。"],
  zh: ["可以体验周末和夜宵选择赛，以及动物类型、MBTI、Teto/Egen、依恋类型、前世、消费习惯和朋友旅行角色测试。夜宵选择赛会从50种菜单中随机组成16强或32强，前世测试现为25道题。依恋类型内容参考相关研究，各项问题和说明均由molgga原创。", "结果仅供参考，依据你在各页面中的选择生成。选择赛会显示你一路选到最后的项目；夜宵排行榜只统计完成整场对决后胜出的菜单。偏好测试用于轻松了解答案中体现的倾向，不能替代专业心理测评或医疗、法律、教育、招聘等判断。"]
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
  assert(translate("about.offerings.current") === expected[0], `${locale}: About offerings paragraph translation is missing or stale`);
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

for (const file of [...walk("assets/js", (entry) => entry.endsWith(".js")), ...walk("functions", (entry) => entry.endsWith(".js")), "scripts/audit-integrations.mjs", "scripts/audit-result-distributions.mjs"]) {
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
assert(frontendCups.weekend?.items.length === 50, `weekend World Cup must draw from 50 unique candidates (found ${frontendCups.weekend?.items.length ?? 0})`);
assert(/shuffle\(config\.items\)\.slice\(0,\s*bracketSize\)/.test(read("assets/js/worldcup.js")), "World Cup must randomly draw the selected bracket size from the complete candidate list");

const registryArchetypeSandbox = { window: {} };
for (const file of ["assets/js/teto-egen-data.js", "assets/js/attachment-data.js", "assets/js/past-life-data.js", "assets/js/spending-habits-data.js", "assets/js/travel-role-data.js", "assets/js/romance-style-data.js"]) {
  vm.runInNewContext(read(file), registryArchetypeSandbox, { timeout: 1000, filename: file });
}
const archetypeConfigs = registryArchetypeSandbox.window.MOA_ARCHETYPE_TESTS || {};
const quizMetrics = (page, formId, profileCount) => {
  const html = read(`ko/${page}`);
  const form = html.match(new RegExp(`<form\\b[^>]*\\bid=["']${formId}["']`, "i"));
  assert(Boolean(form), `${page}: registry form ${formId} is missing`);
  const groups = new Map();
  for (const tagMatch of html.matchAll(/<input\b[^>]*>/gi)) {
    const attributes = Object.fromEntries([...tagMatch[0].matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key.toLowerCase(), value]));
    if (!attributes.name || !attributes.value) continue;
    if (formId === "animal-quiz" && !/^q\d+$/.test(attributes.name)) continue;
    if (formId === "mbti-quiz" && !/^(?:ei|sn|tf|jp)[1-5]$/.test(attributes.name)) continue;
    groups.set(attributes.name, (groups.get(attributes.name) || 0) + 1);
  }
  const choicesPerQuestion = [...new Set(groups.values())];
  return { questionCount: groups.size, choicesPerQuestion, resultCount: profileCount };
};

for (const content of registryContents) {
  const { metrics, source } = content;
  if (source.kind === "worldcup") {
    const game = frontendCups[source.id];
    assert(Boolean(game), `content registry: unknown World Cup source ${source.id} (${content.id})`);
    if (!game) continue;
    assert(game.page === content.page, `content registry: ${content.id} page differs from World Cup config`);
    assert(metrics.candidateCount === game.items.length, `content registry: ${content.id} candidateCount differs from source data (${metrics.candidateCount} vs ${game.items.length})`);
    assert(metrics.choiceCount === 2, `content registry: ${content.id} should be a two-choice matchup`);
    assert(JSON.stringify([...metrics.availableBrackets].sort((a, b) => a - b)) === JSON.stringify([...game.availableBrackets].sort((a, b) => a - b)), `content registry: ${content.id} bracket options differ from source data`);
    assert(metrics.availableBrackets.every((bracket) => Number.isInteger(metrics.estimatedMinutesByBracket?.[bracket])), `content registry: ${content.id} duration is missing for an available bracket`);
  } else if (source.kind === "legacy-form") {
    const profiles = source.formId === "animal-quiz" ? animalProfiles : mbtiProfiles;
    const actual = quizMetrics(content.page, source.formId, profiles.size);
    assert(metrics.questionCount === actual.questionCount, `content registry: ${content.id} questionCount differs from form (${metrics.questionCount} vs ${actual.questionCount})`);
    assert(actual.choicesPerQuestion.length === 1 && actual.choicesPerQuestion[0] === metrics.choicesPerQuestion, `content registry: ${content.id} choicesPerQuestion differs from form (${actual.choicesPerQuestion.join(", ")})`);
    assert(metrics.resultCount === actual.resultCount, `content registry: ${content.id} resultCount differs from profiles (${metrics.resultCount} vs ${actual.resultCount})`);
  } else if (source.kind === "archetype") {
    const config = archetypeConfigs[source.id];
    assert(Boolean(config), `content registry: unknown archetype source ${source.id} (${content.id})`);
    if (!config) continue;
    const choicesPerQuestion = [...new Set(config.questions.map((question) => question.choices.length))];
    assert(config.url?.endsWith(`/${content.page}`), `content registry: ${content.id} page differs from archetype source`);
    assert(metrics.questionCount === config.questions.length, `content registry: ${content.id} questionCount differs from source data (${metrics.questionCount} vs ${config.questions.length})`);
    assert(choicesPerQuestion.length === 1 && choicesPerQuestion[0] === metrics.choicesPerQuestion, `content registry: ${content.id} choicesPerQuestion differs from source data (${choicesPerQuestion.join(", ")})`);
    assert(metrics.resultCount === Object.keys(config.profiles).length, `content registry: ${content.id} resultCount differs from profiles`);
    const statedMinutes = config.estimatedMinutes;
    assert(Boolean(statedMinutes) && Number(statedMinutes) === metrics.estimatedMinutes, `content registry: ${content.id} estimatedMinutes differs from its existing content definition`);
    const sharePromptKey = config.sharePrompt || config.title;
    for (const locale of locales) assert(Boolean(localeResources[locale][sharePromptKey]), `${locale}.json: missing ${content.id} share prompt ${sharePromptKey}`);
    for (const [resultId, profile] of Object.entries(config.profiles)) {
      const image = profile.image || profile.imageFile;
      assert(Boolean(image) && fs.existsSync(path.resolve(root, "ko", image)), `${content.id}/${resultId}: configured result image is missing (${image || "none"})`);
      assert(Boolean(profile.shareDescription) && profile.shareDescription !== profile.description, `${content.id}/${resultId}: result-screen and share descriptions must be separate fields`);
      for (const key of [profile.name, profile.catchphrase, profile.description, profile.shareDescription]) {
        for (const locale of locales) assert(Boolean(localeResources[locale][key]), `${locale}.json: missing ${content.id}/${resultId} result text ${key}`);
      }
      for (const locale of locales) assert(!/[○•]/u.test(localeResources[locale][profile.shareDescription]), `${locale}.json: share description for ${content.id}/${resultId} contains a screen-only marker`);
    }
    for (const [questionIndex, question] of config.questions.entries()) {
      for (const key of [question.prompt, ...question.choices.map((choice) => choice.text)]) {
        for (const locale of locales) assert(Boolean(localeResources[locale][key]), `${locale}.json: missing ${content.id} question ${questionIndex + 1} text ${key}`);
      }
    }
  } else {
    assert(false, `content registry: unsupported source kind ${source.kind} for ${content.id}`);
  }
}

const resultShareSource = read("assets/js/share.js");
assert(resultShareSource.includes("imageUrl: publicUrl(current.imageUrl)"), "result sharing: Kakao feed is not using the result-specific image URL");
assert(resultShareSource.includes("title: current.title") && resultShareSource.includes("description: current.description || current.text"), "result sharing: Kakao feed lacks result-specific text");
assert(resultShareSource.includes("translate(current.buttonTitle || \"결과 확인하기\")"), "result sharing: Kakao feed button does not support a per-content start label");
const archetypeShareSource = read("assets/js/archetype-test.js");
assert(archetypeShareSource.includes("imageUrl: imagePath") && archetypeShareSource.includes(".replace(/\\.html$/, \"\")"), "archetype result sharing: result image or clean same-content route is missing");
assert(archetypeShareSource.includes("tr(config.sharePrompt || config.title)") && archetypeShareSource.includes("title: resultLine") && archetypeShareSource.includes("`${shareQuestion} [${resultName}]`"), "archetype result sharing: test context or bracketed result name is missing from the result title");
assert(archetypeShareSource.includes("tr(profile.shareDescription)") && archetypeShareSource.includes("renderResultSentences(tr(profile.description))") && archetypeShareSource.includes('aria-hidden="true">•</span> '), "archetype result copy: screen and share descriptions or sentence markers are not separated");
assert(read("assets/js/archetype-test.js").includes("Math.imul(hash, 0x01000193)") && read("assets/js/app.js").includes("Math.imul(tieHash, 0x01000193)"), "quiz scoring: deterministic answer-based tie-breaking must be consistent across archetype and animal quizzes");
assert(read("assets/js/worldcup.js").includes("imageUrl: winner.image") && read("assets/js/worldcup.js").includes("title: `${localize(config.title)} [${localize(winner.name)}]`") && read("assets/js/worldcup.js").includes("나도 월드컵 해보기"), "World Cup result sharing: contextual bracketed title, winner image, or same-game CTA is missing");
const legacyQuizSource = read("assets/js/app.js");
assert(legacyQuizSource.includes("imageUrl: profile.image") && legacyQuizSource.includes('tr("animal.sharePrompt")') && legacyQuizSource.includes('tr("mbti.sharePrompt")') && legacyQuizSource.includes("const resultLine = `${sharePrompt} [${resultName}]`") && legacyQuizSource.includes("renderResultSentences(tr(profile.daily))") && legacyQuizSource.includes('aria-hidden="true">•</span> '), "legacy quiz result sharing context or sentence-formatted result descriptions are missing");

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
  "assets/js/spending-habits-data.js",
  "assets/js/travel-role-data.js",
  "assets/js/romance-style-data.js"
];
const archetypeSandbox = { window: {} };
for (const file of archetypeFiles) vm.runInNewContext(read(file), archetypeSandbox, { timeout: 1000 });
for (const [testId, config] of Object.entries(archetypeSandbox.window.MOA_ARCHETYPE_TESTS || {})) {
  const profileIds = Object.keys(config.profiles || {});
  assert(config.questions?.length > 0, `${testId}: no questions configured`);
  assert(!/(?:\d+\s*(?:문항|questions|問|题)|(?:약|about|approximately)\s*\d+\s*(?:분|min))/i.test(config.eyebrow || ""), `${testId}: eyebrow repeats question count or estimated duration`);
  config.questions.forEach((question, questionIndex) => {
    assert(typeof question.prompt === "string" && question.prompt.trim(), `${testId}: question ${questionIndex + 1} has no prompt`);
    assert(/(?:마지막\s*질문|last\s+question|final\s+question)/i.test(question.prompt) === false, `${testId}: question ${questionIndex + 1} hard-codes a final-question label`);
    assert(question.choices?.length >= 2, `${testId}: question ${questionIndex + 1} has fewer than two choices`);
    for (const choice of question.choices || []) {
      assert(choice.scores?.length > 0, `${testId}: question ${questionIndex + 1} has a choice without scores`);
      for (const entry of choice.scores || []) {
        const profileId = typeof entry === "string" ? entry : entry.id;
        assert(profileIds.includes(profileId), `${testId}: question ${questionIndex + 1} scores unknown profile ${profileId}`);
        if (typeof entry !== "string") assert(Number.isFinite(entry.weight) && entry.weight > 0, `${testId}: question ${questionIndex + 1} has an invalid weight for ${profileId}`);
      }
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
    .replace(/^import \{ CONTENT_START_IDS \} from [^;]+;\s*/m, "")
    .replace(`export async function ${exportedName}`, `globalThis.${exportedName} = async function`);
  vm.runInNewContext(source, sandbox, { timeout: 1000 });
  return sandbox[exportedName];
}

const contentStartConfigSandbox = {};
vm.runInNewContext(read("functions/_shared/content-start-config.js").replace("export const CONTENT_START_IDS =", "globalThis.CONTENT_START_IDS ="), contentStartConfigSandbox, { timeout: 1000 });
const contentStartIds = contentStartConfigSandbox.CONTENT_START_IDS;
assert(JSON.stringify(contentStartIds) === JSON.stringify(registryContentIds), "content-start allow-list differs from the shared content registry");
const apiContext = () => ({ WORLD_CUPS: backendCups, CONTENT_START_IDS: contentStartIds, URL, Request, Response, JSON, Number, Object, RegExp, TextDecoder, Uint8Array });
const onRequestPost = loadApi("functions/api/worldcup-vote.js", "onRequestPost", apiContext());
const onRequestGet = loadApi("functions/api/worldcup-rankings.js", "onRequestGet", apiContext());
const onContentStartPost = loadApi("functions/api/content-start.js", "onRequestPost", apiContext());
const onContentStartsGet = loadApi("functions/api/content-starts.js", "onRequestGet", apiContext());
const writes = [];
const mockDb = {
  prepare(sql) {
    return {
      async all() {
        if (/FROM content_start_counts/i.test(sql)) return { results: [{ contentId: "travel-role", starts: 9 }, { contentId: "weekend", starts: 3 }] };
        return { results: [{ itemId: "cup-ramyeon", wins: 3 }] };
      },
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

const postContentStart = (body, origin = "https://molgga.com", db = mockDb) => onContentStartPost({
  request: new Request("https://molgga.com/api/content-start", {
    method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body)
  }), env: { MOLGGA_DB: db }
});
const beforeStartWrites = writes.length;
response = await postContentStart({ contentId: "travel-role" });
body = await response.json();
assert(response.status === 200 && body.accepted === true, "content-start API rejects a registered content ID");
assert(writes.length === beforeStartWrites + 1 && writes.at(-1).values.join("|") === "travel-role", "content-start API stores data beyond the content ID counter");
assert(/content_start_counts/i.test(writes.at(-1).sql) && /starts\s*=\s*starts\s*\+\s*1/i.test(writes.at(-1).sql), "content-start API does not increment the aggregate counter atomically");
response = await postContentStart({ contentId: "travel-role" }, "https://attacker.example");
assert(response.status === 403, "content-start API accepts a mismatched Origin");
response = await onContentStartPost({ request: new Request("https://molgga.com/api/content-start", { method: "POST", body: JSON.stringify({ contentId: "weekend" }) }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 403, "content-start API accepts a request without an Origin header");
response = await postContentStart({ contentId: "unknown-content" });
assert(response.status === 400, "content-start API accepts an unregistered content ID");
response = await onContentStartPost({ request: new Request("https://molgga.com/api/content-start", { method: "POST", headers: { origin: "https://molgga.com" }, body: "x".repeat(1024) }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 413, "content-start API accepts an oversized body without a Content-Length header");
response = await onContentStartPost({ request: new Request("https://molgga.com/api/content-start", { method: "POST", headers: { origin: "https://molgga.com" }, body: "{" }), env: { MOLGGA_DB: mockDb } });
assert(response.status === 400, "content-start API accepts malformed JSON");
response = await postContentStart({ contentId: "weekend" }, "https://molgga.com", null);
assert(response.status === 503, "content-start API does not report a missing database binding");
response = await onContentStartsGet({ request: new Request("https://molgga.com/api/content-starts"), env: { MOLGGA_DB: mockDb } });
body = await response.json();
assert(response.status === 200 && body.counts?.[0]?.contentId === "travel-role" && body.counts?.[0]?.starts === 9, "content-start API fails to return aggregate popularity counts");
response = await onContentStartsGet({ request: new Request("https://molgga.com/api/content-starts"), env: {} });
assert(response.status === 503, "content-start API does not gracefully handle a missing D1 binding");

const readme = read("README.md");
const documentedDatabase = readme.match(/D1 데이터베이스 `([^`]+)`/)?.[1];
const migrationCommand = readme.match(/wrangler d1 execute ([^\s`]+)/)?.[1];
assert(Boolean(documentedDatabase) && documentedDatabase === migrationCommand, "README: D1 database name differs from migration command");
assert(readme.includes("MOLGGA_DB") && ["functions/api/worldcup-vote.js", "functions/api/worldcup-rankings.js", "functions/api/content-start.js", "functions/api/content-starts.js"].every((route) => read(route).includes("env.MOLGGA_DB")), "D1 binding name differs between documentation and API routes");
assert(readme.includes("Cloudflare WAF 규칙") && readme.includes("Origin") && readme.includes("/api/worldcup-vote" ) && readme.includes("/api/content-start"), "README does not document the shared Origin and rate-limit requirements");
assert(readme.includes("migrations/0002_content_start_counts.sql"), "README does not document the popularity counter migration");
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
const startCountMigration = read("migrations/0002_content_start_counts.sql");
assert(/content_id\s+TEXT\s+PRIMARY KEY/i.test(startCountMigration) && /starts\s+INTEGER\s+NOT NULL\s+DEFAULT\s+0/i.test(startCountMigration), "content-start migration is missing its aggregate count schema");
assert(/CHECK\s*\(starts\s*>=\s*0\)/i.test(startCountMigration), "content-start migration allows negative totals");
assert(/ON\s+CONFLICT\s*\(content_id\)\s+DO\s+UPDATE\s+SET\s+starts\s*=\s*starts\s*\+\s*1/i.test(read("functions/api/content-start.js")), "content-start route does not atomically increment aggregate counts");
assert(/CONTENT_START_IDS\.includes\(contentId\)/.test(read("functions/api/content-start.js")), "content-start route does not enforce its content allow-list");
assert(!/CF-Connecting-IP|ip\.src|navigator\.userAgent|localStorage|sendBeacon/i.test(read("functions/api/content-start.js") + read("assets/js/content-browser.js").match(/fetch\("\/api\/content-start"[\s\S]*?\}\);/)?.[0]), "content-start collection adds a client or IP identifier");
assert(read("assets/js/content-browser.js").includes('start.addEventListener("click"') && read("assets/js/content-browser.js").includes('fetch("/api/content-starts"'), "explorer does not submit and read aggregate content-start counts");

if (errors.length) {
  console.error(`Integration audit failed (${errors.length} issues across ${checks} checks):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Integration audit passed: ${checks} checks across ${allHtml.length} localized pages, content discovery and recommendations, localized SEO, World Cup data/APIs, archetype data, assets, sitemap, redirects, and D1 docs.`);
}
