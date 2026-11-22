import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const project = resolve(fileURLToPath(new URL("..", import.meta.url)));
const languages = ["ko", "en", "ja", "zh"];
const read = (path) => readFileSync(resolve(project, path), "utf8");
const registryWindow = {};
vm.runInNewContext(read("assets/js/content-registry.js"), { window: registryWindow });
const registry = registryWindow.MOLGGA_CONTENT_REGISTRY;
assert.ok(registry?.contents?.length, "Content registry did not load");

const ids = new Set();
const categoryIds = new Set(registry.categories.map(({ id }) => id));
for (const content of registry.contents) {
  assert.ok(!ids.has(content.id), `Duplicate content id: ${content.id}`);
  ids.add(content.id);
  assert.ok(content.categoryIds.every((id) => categoryIds.has(id)), `Unknown category on ${content.id}`);
  assert.ok(existsSync(resolve(project, content.thumbnail.replace(/^\//, ""))), `Missing card image: ${content.thumbnail}`);
  for (const language of content.availableLanguages || languages) {
    assert.ok(existsSync(resolve(project, language, content.page)), `Missing route: ${language}/${content.page}`);
  }
}

const machineJs = read("assets/js/vending-machine.js");
const dictionary = machineJs.match(/const strings = (\{[\s\S]*?\n  \});/);
assert.ok(dictionary, "Could not locate vending copy dictionary");
const copy = vm.runInNewContext(`(${dictionary[1]})`);
for (const language of languages) {
  assert.ok(copy[language], `Missing UI copy for ${language}`);
  assert.deepEqual(Object.keys(copy.ko).sort(), Object.keys(copy[language]).sort(), `UI copy keys differ in ${language}`);
}
assert.equal(copy.ko.autoConfirm, "카드를 자동 정리하겠습니까?");
assert.match(machineJs, /const starterIds = \["weekend", "mbti", "night-train"\]/);
assert.match(machineJs, /state\.points \+= 20/);
assert.match(machineJs, /state\.points -= 40/);
assert.match(machineJs, /if \(!categoryId\) state\.points -= 40/);
assert.match(machineJs, /if \(packBusy\) return/);
assert.match(machineJs, /card\.dataset\.vmCompletion = entryDefinition\(entry\)\.completionCondition\.kind/);
assert.match(machineJs, /groupForEntry\(entry\) === categoryId/);
assert.match(machineJs, /current\.origin/);
assert.match(machineJs, /mobileLockerTray\.hidden/);
assert.match(machineJs, /data-vm-temp-locker/);
assert.match(machineJs, /t\("ready"\)/);
assert.match(machineJs, /clone\.classList\.add\("is-feeding-up"\)/);
assert.match(machineJs, /const slotCenterTop = slotRect\.top \+ slotRect\.height \/ 2 - 2/);
assert.match(machineJs, /clone\.style\.setProperty\("--vm-feed-up"/);
assert.match(machineJs, /showRecognition\(entry\);\s*await zoomIntoCRT\(crtRect\)/);
assert.match(machineJs, /const launchId = \+\+launchGeneration/);
assert.match(machineJs, /if \(!isCurrentLaunch\(\)\) return/);
assert.match(machineJs, /const waitForFrameLoad = \(iframe, timeoutMs = 15000\)/);
assert.match(machineJs, /iframe\.style\.visibility = "hidden"/);
assert.match(machineJs, /await frameLoaded;[\s\S]*?screen\.replaceChildren\(iframe\)/);
assert.match(machineJs, /vm-drag-preview/);
assert.match(machineJs, /insertCard\(current\.contentId, current\.dragCard, current\.origin\)/);
assert.match(machineJs, /pendingReturn = \{ contentId, origin:returnOrigin[\s\S]*?width:cardWidth, height:cardHeight \}/);
assert.match(machineJs, /width:pendingReturn\?\.width \|\| sourceCard\.offsetWidth/);
assert.match(machineJs, /card\.classList\.add\("vm-return-card", "is-revealed", "is-emerging"\)/);
assert.match(machineJs, /inner\.style\.transform = "rotateX\(0deg\) rotateY\(180deg\)"/);
assert.match(machineJs, /const restoreEjectedCard = \(\) =>/);
assert.match(machineJs, /if \(current\.returning\)/);
assert.match(machineJs, /dragCard\.style\.transform = window\.getComputedStyle\(card\)\.transform/);
assert.match(machineJs, /dragInner\.style\.transform = window\.getComputedStyle\(sourceInner\)\.transform/);
assert.match(machineJs, /const cloneRect = dragCard\.getBoundingClientRect\(\)/);
assert.match(machineJs, /revealed:true/);
assert.match(machineJs, /ko:"카드 꺼내기"/);
assert.doesNotMatch(machineJs, /dragging\.dragCard\.style\.(width|height)\s*=/);
assert.doesNotMatch(machineJs, /rotate\(90deg\)|slotThickness/);
assert.match(machineJs, /overlay\.classList\.add\("is-returning"\)/);
assert.doesNotMatch(machineJs, /vm-card-insert|data-vm-insert\]/);
assert.doesNotMatch(machineJs, /frame\.style\.(top|left|width|height)/);
assert.match(machineJs, /localStorage\.setItem\(storageKey/);
assert.match(machineJs, /\.archetype-result-card/);
assert.match(machineJs, /\.island-ending/);
assert.match(machineJs, /const storageKey = "molgga\.vendingMachine\.v2"/);
assert.match(machineJs, /legacyStorageKey/);

const css = read("assets/css/vending-machine.css");
assert.match(css, /@media \(max-width:680px\)/);
assert.match(css, /@media \(max-width:360px\)/);
assert.match(css, /\.vm-mobile-tray, \.vm-mobile-lockers \{ position:fixed/);
assert.match(css, /\.vm-focus\.is-zoomed \.vm-focus-crt/);
assert.match(css, /--vm-alley:#151121/);
assert.match(css, /--vm-plum:#9177bd/);
assert.match(css, /--vm-crt:#18221f/);
assert.match(css, /--vm-lime:#dafa98/);
assert.match(css, /transform:rotateX\(58deg\)/);
assert.match(css, /vm-card\.is-revealed[^\{]*\{ width:/);
assert.match(css, /\.vm-drag-preview \{[^}]*pointer-events:none/);
assert.match(css, /\.vm-card\.is-return-target \{[^}]*pointer-events:none/);
assert.match(css, /\.vm-return-card\.is-emerging \{[^}]*animation:vm-receipt-feed/);
assert.match(css, /@keyframes vm-receipt-feed[\s\S]*?0%\{clip-path:inset\(100% 0 0 0\);transform:translateY\(-100%\)\}[\s\S]*?100%\{clip-path:inset\(0\);transform:translateY\(0\)\}/);
assert.match(css, /\.vm-insert-animation\.is-feeding-up \{[^}]*animation:vm-card-feed-up/);
assert.match(css, /@keyframes vm-card-feed-up[\s\S]*?100%\{clip-path:inset\(100% 0 0 0\);transform:rotate\(0deg\) translateY\(var\(--vm-feed-up,-20px\)\);opacity:0\}/);
assert.doesNotMatch(css, /vm-card-feed-up[\s\S]*?translateY\(-88%\)/);
assert.doesNotMatch(machineJs, /feedScale|scale\(\.72\)/);
assert.match(css, /\.vm-focus\.is-returning \.vm-focus-screen \{ background:transparent; \}/);
assert.doesNotMatch(css, /vm-eject-chip|vm-chip-eject/);

for (const language of languages) {
  const home = read(`${language}/index.html`);
  assert.match(home, /data-vending-machine/);
  assert.match(home, /data-vm-floor/);
  assert.match(home, /data-vm-insert-tray/);
  assert.match(home, /data-vm-mobile-tray/);
  assert.match(home, /data-vm-mobile-lockers/);
  assert.match(home, /data-vm-confirm/);
  assert.match(home, /data-vm-theme-preview/);
  assert.match(home, /data-vm-points/);
  assert.match(home, /id="vm-shop"/);
  assert.match(home, /data-vm-overlay/);
  assert.match(home, /vending-machine\.js\?v=/);
  assert.match(home, /vending-machine\.css\?v=/);
  assert.doesNotMatch(home, /data-content-browser|data-category-list/);
  for (const [, selector] of machineJs.matchAll(/by\("([^"]+)"\)/g)) {
    const hook = selector.replace(/[.\[\]]/g, "");
    assert.ok(home.includes(hook), `Missing ${selector} in ${language}/index.html`);
  }
  const privacy = read(`${language}/privacy.html`);
  const translations = JSON.parse(read(`${language}.json`));
  const decodeHtml = (value = "") => value.replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&quot;", '"');
  const staticTitle = decodeHtml(home.match(/<title data-i18n="seo\.title\.index">([^<]+)<\/title>/)?.[1]);
  const staticDescription = decodeHtml(home.match(/<meta name="description" content="([^"]+)" data-i18n-attr="content:seo\.description\.index">/)?.[1]);
  assert.equal(staticTitle, translations["seo.title.index"], `Static title differs from ${language}.json`);
  assert.equal(staticDescription, translations["seo.description.index"], `Static description differs from ${language}.json`);
  assert.match(home, /theme-color" content="#151121"/);
  assert.match(home, /class="vending-page"/);
  assert.match(privacy, /data-i18n="privacy\.vendingState"/);
  assert.ok(translations["privacy.vendingState"], `Missing vending privacy copy: ${language}`);
}

console.log(`Vending machine static audit passed: ${registry.contents.length} content routes, ${languages.length} locale homes, card assets and privacy copy.`);
