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
assert.match(machineJs, /localStorage\.setItem\(storageKey/);
assert.match(machineJs, /\.archetype-result-card/);
assert.match(machineJs, /\.island-ending/);

const css = read("assets/css/vending-machine.css");
assert.match(css, /@media \(max-width:680px\)/);
assert.match(css, /@media \(max-width:360px\)/);
assert.match(css, /\.vm-mobile-tray \{ position:fixed/);
assert.match(css, /\.vm-focus\.is-zoomed \.vm-focus-crt/);

for (const language of languages) {
  const home = read(`${language}/index.html`);
  assert.match(home, /data-vending-machine/);
  assert.match(home, /data-vm-floor/);
  assert.match(home, /data-vm-insert-tray/);
  assert.match(home, /data-vm-mobile-tray/);
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
  assert.match(privacy, /data-i18n="privacy\.vendingState"/);
  assert.ok(translations["privacy.vendingState"], `Missing vending privacy copy: ${language}`);
}

console.log(`Vending machine static audit passed: ${registry.contents.length} content routes, ${languages.length} locale homes, card assets and privacy copy.`);
