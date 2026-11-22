(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const root = document.querySelector("[data-vending-machine]");
  if (!registry || !root) return;

  const lang = () => (window.MOA_I18N?.language || document.documentElement.lang || "ko").slice(0, 2);
  const strings = {
    ko: {
      kicker:"MOLGGA ALLEY · 콘텐츠 자판기", title:"골목에서 카드를 찾아볼까?", intro:"마음에 드는 카드를 골라 자판기에 넣어보자. 카드마다 다른 이야기가 시작된다.", points:"보유 포인트", floor:"골목 바닥", floorHint:"카드를 눌러 앞면을 확인하거나, 자판기 쪽으로 끌어보자.", auto:"자동 정리", cardBack:"MOLGGA", turnCard:"카드를 뒤집어 내용 보기", insert:"자판기에 넣기", useCard:"이 카드로 시작", tray:"여기에 카드를 놓으면 자판기가 작동한다", machine:"딸깍 자판기", machineHint:"카드를 초록색 유도칸에 넣어보자", screenIdle:"카드를 기다리는 중", screenHint:"골목에서 카드를 찾아 슬롯에 넣어보자", slot:"카드 슬롯", trayLabel:"유도칸", lockers:"카드 정리함", emptyLocker:"아직 넣어둔 카드가 없다.", open:"열기", close:"닫기", takeOut:"꺼내기", cards:"장", autoConfirm:"카드를 자동 정리하겠습니까?", sorted:"바닥의 카드를 가지런히 놓았다.", noCards:"정리할 카드가 없다.", standard:"일반 카드팩", standardDesc:"아직 갖고 있지 않은 콘텐츠 카드 한 장이 나온다.", buyStandard:"40P로 카드팩 열기", theme:"테마 카드팩", themeDesc:"원하는 주제에서 새 카드 한 장을 고른다.", buyTheme:"40P로 테스트 구매", allOwned:"이 주제의 카드를 모두 찾았다.", insufficient:"포인트가 부족하다.", packEmpty:"새 카드가 남아 있지 않다.", packGet:"새 카드를 찾았다: {{name}}", stored:"정리함에 넣었다.", returned:"골목 바닥에 꺼내놓았다.", start:"카드 인식 중", scanHint:"잠시만 기다려줘", ready:"카드가 인식됐다", startContent:"콘텐츠를 불러오는 중", eject:"게임칩 빼기", saved:"진행은 이 브라우저에 저장된다.", completed:"처음 완료한 콘텐츠다. 20P를 받았다.", completedBefore:"이미 완료한 콘텐츠다.", chooseTheme:"주제를 고르자", count:"보유 카드", floorCount:"바닥에 놓인 카드", folderStored:"정리함에 보관 중", source:"콘텐츠로 바로 가기", shop:"카드팩 상점", closeOverlay:"자판기 닫기", fallback:"이 콘텐츠는 새 탭에서 연다.", backToAlley:"골목으로 돌아왔다."
    },
    en: {
      kicker:"MOLGGA ALLEY · CONTENT VENDING", title:"Find a card in the alley", intro:"Pick a card and place it in the machine. Each one opens a different experience.", points:"Points", floor:"Alley floor", floorHint:"Tap a card to turn it over, or drag it toward the machine.", auto:"Arrange cards", cardBack:"MOLGGA", turnCard:"Turn over this card", insert:"Insert card", useCard:"Play this card", tray:"Drop a card here to use the vending machine", machine:"Click Vending Machine", machineHint:"Place a card on the green guide tray", screenIdle:"Waiting for a card", screenHint:"Find a card in the alley and insert it", slot:"Card slot", trayLabel:"Guide tray", lockers:"Card lockers", emptyLocker:"No cards stored here yet.", open:"Open", close:"Close", takeOut:"Take out", cards:"cards", autoConfirm:"Would you like to arrange the cards automatically?", sorted:"The cards on the floor have been arranged.", noCards:"There are no cards to arrange.", standard:"Standard card pack", standardDesc:"Get one content card you do not own yet.", buyStandard:"Open a pack · 40P", theme:"Themed card pack", themeDesc:"Choose a new card from a topic you like.", buyTheme:"Test purchase · 40P", allOwned:"You have found every card in this topic.", insufficient:"You need more points.", packEmpty:"No new cards remain.", packGet:"You found a new card: {{name}}", stored:"Card placed in the locker.", returned:"Card placed back on the alley floor.", start:"Reading card", scanHint:"Just a moment", ready:"Card recognized", startContent:"Loading content", eject:"Eject game chip", saved:"Progress is saved in this browser.", completed:"First completion! You earned 20P.", completedBefore:"This content was already completed.", chooseTheme:"Choose a topic", count:"cards owned", floorCount:"on the floor", folderStored:"stored", source:"Open content directly", shop:"Card pack shop", closeOverlay:"Close vending machine", fallback:"Opening this content in a new tab.", backToAlley:"Back in the alley."
    },
    ja: {
      kicker:"MOLGGA ALLEY · コンテンツ自販機", title:"路地でカードを見つけよう", intro:"気になるカードを選んで自販機に入れてみよう。カードごとに違う体験が始まる。", points:"ポイント", floor:"路地の床", floorHint:"カードを押して表面を見たり、自販機へドラッグしたりしよう。", auto:"カードを整える", cardBack:"MOLGGA", turnCard:"カードをめくる", insert:"カードを入れる", useCard:"このカードで始める", tray:"ここにカードを置くと自販機が動く", machine:"クリック自販機", machineHint:"カードを緑のガイドトレイに置こう", screenIdle:"カードを待っています", screenHint:"路地でカードを見つけてスロットに入れよう", slot:"カードスロット", trayLabel:"ガイドトレイ", lockers:"カード整理箱", emptyLocker:"まだカードは入っていません。", open:"開く", close:"閉じる", takeOut:"取り出す", cards:"枚", autoConfirm:"カードを自動で整理しますか？", sorted:"床のカードを整えました。", noCards:"整理するカードがありません。", standard:"スタンダードパック", standardDesc:"まだ持っていないコンテンツカードが1枚出ます。", buyStandard:"パックを開く · 40P", theme:"テーマパック", themeDesc:"好きなテーマから新しいカードを選びます。", buyTheme:"テスト購入 · 40P", allOwned:"このテーマのカードはすべて見つけました。", insufficient:"ポイントが足りません。", packEmpty:"新しいカードは残っていません。", packGet:"新しいカードを見つけた: {{name}}", stored:"整理箱に入れました。", returned:"路地の床に戻しました。", start:"カードを読み取り中", scanHint:"少々お待ちください", ready:"カードを認識しました", startContent:"コンテンツを読み込み中", eject:"ゲームチップを取り出す", saved:"進行状況はこのブラウザーに保存されます。", completed:"初回クリア！20Pを獲得しました。", completedBefore:"このコンテンツはクリア済みです。", chooseTheme:"テーマを選ぶ", count:"枚所持", floorCount:"床に置いてある", folderStored:"収納中", source:"コンテンツを直接開く", shop:"カードパックショップ", closeOverlay:"自販機を閉じる", fallback:"このコンテンツを新しいタブで開きます。", backToAlley:"路地に戻りました。"
    },
    zh: {
      kicker:"MOLGGA ALLEY · 内容贩卖机", title:"去巷子里找一张卡吧", intro:"挑一张喜欢的卡放进贩卖机，每张卡都会开启不同的体验。", points:"积分", floor:"巷子地面", floorHint:"点击卡片查看正面，或把它拖向贩卖机。", auto:"整理卡片", cardBack:"MOLGGA", turnCard:"翻开卡片", insert:"投入卡片", useCard:"用这张卡开始", tray:"把卡放在这里，贩卖机就会启动", machine:"咔嗒贩卖机", machineHint:"把卡放到绿色引导槽", screenIdle:"等待卡片", screenHint:"在巷子里找到卡片并投入", slot:"卡片插槽", trayLabel:"引导槽", lockers:"卡片收纳柜", emptyLocker:"这里还没有收纳卡片。", open:"打开", close:"关闭", takeOut:"取出", cards:"张", autoConfirm:"要自动整理卡片吗？", sorted:"地面上的卡片已摆放整齐。", noCards:"没有需要整理的卡片。", standard:"普通卡包", standardDesc:"随机获得一张尚未拥有的内容卡。", buyStandard:"打开卡包 · 40P", theme:"主题卡包", themeDesc:"从喜欢的主题中挑选一张新卡。", buyTheme:"测试购买 · 40P", allOwned:"这个主题的卡片都已找到。", insufficient:"积分不足。", packEmpty:"没有新卡了。", packGet:"发现新卡：{{name}}", stored:"已放入收纳柜。", returned:"已放回巷子地面。", start:"正在识别卡片", scanHint:"请稍候", ready:"卡片已识别", startContent:"正在加载内容", eject:"取出游戏芯片", saved:"进度保存在此浏览器中。", completed:"首次完成内容，获得20P。", completedBefore:"此内容已完成过。", chooseTheme:"选择主题", count:"张已拥有", floorCount:"张在地面", folderStored:"已收纳", source:"直接打开内容", shop:"卡包商店", closeOverlay:"关闭贩卖机", fallback:"将在新标签页打开此内容。", backToAlley:"已回到巷子。"
    }
  };
  const t = (key, values = {}) => {
    const template = strings[lang()]?.[key] || strings.ko[key] || key;
    return template.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name] ?? "");
  };
  const tr = (key, fallback = "") => window.MOA_I18N?.t(key, { defaultValue: fallback }) || fallback || key;
  const contents = registry.contents.filter((entry) => !entry.availableLanguages || entry.availableLanguages.includes(lang()));
  const categories = registry.categories.filter((entry) => !entry.availableLanguages || entry.availableLanguages.includes(lang()));
  const contentById = new Map(contents.map((entry) => [entry.id, entry]));
  const categoryById = new Map(categories.map((entry) => [entry.id, entry]));
  const starterIds = ["weekend", "mbti", "night-train"].filter((id) => contentById.has(id));
  const storageKey = "molgga.vendingMachine.v1";
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const safeRandom = () => Math.random();
  const defaultPositions = { weekend:{x:6,y:12,r:-8,z:1}, mbti:{x:42,y:43,r:5,z:2}, "night-train":{x:72,y:16,r:9,z:3} };

  const normalizeState = (raw) => {
  const validIds = new Set(registry.contents.map((entry) => entry.id));
    const owned = Array.isArray(raw?.owned) ? [...new Set(raw.owned.filter((id) => validIds.has(id)))] : [];
    starterIds.forEach((id) => { if (!owned.includes(id)) owned.push(id); });
    const stored = {};
    registry.categories.forEach((category) => {
      const allowed = new Set(registry.contents.filter((entry) => entry.categoryIds.includes(category.id)).map((entry) => entry.id));
      stored[category.id] = [...new Set((Array.isArray(raw?.stored?.[category.id]) ? raw.stored[category.id] : []).filter((id) => owned.includes(id) && allowed.has(id)))];
    });
    const storedIds = new Set(Object.values(stored).flat());
    const positions = {};
    owned.forEach((id, index) => {
      const candidate = raw?.positions?.[id];
      const fallback = defaultPositions[id] || { x: 8 + (index * 29) % 72, y: 8 + (index * 37) % 72, r: ((index % 13) - 6), z:index + 1 };
      positions[id] = {
        x: clamp(Number.isFinite(candidate?.x) ? candidate.x : fallback.x, 0, 94),
        y: clamp(Number.isFinite(candidate?.y) ? candidate.y : fallback.y, 0, 82),
        r: clamp(Number.isFinite(candidate?.r) ? candidate.r : fallback.r, -15, 15),
        z: Number.isFinite(candidate?.z) ? candidate.z : fallback.z
      };
    });
    return {
      version:1,
      points:Number.isFinite(raw?.points) ? Math.max(0, Math.floor(raw.points)) : 0,
      owned,
      stored,
      positions,
      completed:[...new Set((Array.isArray(raw?.completed) ? raw.completed : []).filter((id) => validIds.has(id)))],
      nextZ:Number.isFinite(raw?.nextZ) ? raw.nextZ : owned.length + 1
    };
  };
  const readState = () => {
    try { return normalizeState(JSON.parse(localStorage.getItem(storageKey) || "null")); }
    catch { return normalizeState(null); }
  };
  let state = readState();
  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch { setStatus(lang() === "ko" ? "이 브라우저에서 저장 공간을 사용할 수 없다." : "Browser storage is unavailable."); }
  };
  const by = (selector) => root.querySelector(selector);
  const floor = by("[data-vm-floor]");
  const machine = by("[data-vm-machine]");
  const slot = by("[data-vm-slot]");
  const crt = by("[data-vm-crt]");
  const machineTray = by("[data-vm-insert-tray]");
  const mobileTray = by("[data-vm-mobile-tray]");
  const lockers = by("[data-vm-lockers]");
  const overlay = by("[data-vm-overlay]");
  const frame = by("[data-vm-focus-crt]");
  const screen = by("[data-vm-screen]");
  const status = by("[data-vm-status]");
  let dragging = null;
  let activeContent = null;
  let completionObserver = null;
  let activeIframe = null;
  let closePromise = null;

  const setStatus = (message) => { if (status) status.textContent = message; };
  const label = (entry) => tr(entry.titleKey, entry.titleKey);
  const description = (entry) => tr(entry.descriptionKey, "");
  const categoryLabel = (categoryId) => {
    const category = categoryById.get(categoryId);
    return category ? tr(category.labelKey, category.id) : categoryId;
  };
  const cardCount = (count, kind) => {
    const formats = {
      owned:{ ko:`${count}장 보유`, en:`${count} owned`, ja:`${count}枚所持`, zh:`已拥有 ${count} 张` },
      floor:{ ko:`바닥 ${count}장`, en:`${count} on the floor`, ja:`床に ${count}枚`, zh:`地面 ${count} 张` },
      stored:{ ko:`${count}장`, en:`${count} stored`, ja:`${count}枚`, zh:`${count} 张` }
    };
    return formats[kind]?.[lang()] || formats[kind].ko;
  };
  const wrongLockerMessage = () => ({
    ko:"이 카드는 주제에 맞는 정리함에 넣어야 한다.",
    en:"This card belongs in a different topic locker.",
    ja:"このカードは別のテーマの整理箱に入れてください。",
    zh:"这张卡应放入对应主题的收纳柜。"
  }[lang()] || "This card belongs in a different topic locker.");
  const setStaticLabels = () => {
    const values = [
      ["[data-vm-kicker]", "kicker"], ["[data-vm-title]", "title"], ["[data-vm-intro]", "intro"],
      ["[data-vm-points-label]", "points"], ["[data-vm-floor-title]", "floor"], ["[data-vm-floor-hint]", "floorHint"],
      ["[data-vm-auto]", "auto"], ["[data-vm-machine-hint]", "machineHint"], ["[data-vm-screen-idle]", "screenIdle"],
      ["[data-vm-screen-hint]", "screenHint"], ["[data-vm-slot-label]", "slot"], ["[data-vm-tray-label]", "trayLabel"],
      ["[data-vm-mobile-tray-label]", "tray"], ["[data-vm-lockers-title]", "lockers"], ["[data-vm-standard-title]", "standard"],
      ["[data-vm-standard-desc]", "standardDesc"], ["[data-vm-buy-standard]", "buyStandard"], ["[data-vm-theme-title]", "theme"],
      ["[data-vm-theme-desc]", "themeDesc"], ["[data-vm-buy-theme]", "buyTheme"], ["[data-vm-theme-label]", "chooseTheme"],
      ["[data-vm-save-note]", "saved"], ["[data-vm-eject]", "eject"]
    ];
    values.forEach(([selector, key]) => { const node = by(selector); if (node) node.textContent = t(key); });
    const machinePanel = by("[data-vm-machine]");
    if (machinePanel) machinePanel.setAttribute("aria-label", t("machine"));
    const machineBody = by(".vm-machine");
    if (machineBody) machineBody.setAttribute("aria-label", t("machine"));
    const shop = by("[data-vm-shop]");
    if (shop) shop.setAttribute("aria-label", t("shop"));
    if (frame) frame.setAttribute("aria-label", t("machine"));
  };
  const primaryCategory = (entry) => entry.categoryIds.find((id) => categoryById.has(id)) || categories[0]?.id;
  const assetUrl = (path) => path.startsWith("/") ? new URL(`..${path}`, document.baseURI).href : new URL(path, document.baseURI).href;
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const newPixelIcon = (entry, size = 12) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.className = "vm-recognition-pixel";
    canvas.setAttribute("aria-hidden", "true");
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;
    const seedText = entry.id;
    let seed = 0;
    for (let i = 0; i < seedText.length; i += 1) seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    const colors = ["#c4f4bd", "#78d6a2", "#3c986f", "#cde8e0"];
    ctx.clearRect(0,0,size,size);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x <= Math.floor(size / 2); x += 1) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        if (((seed >>> 29) & 7) < 4 || (y > 1 && y < size - 2 && x > 1 && x < 4)) {
          const color = colors[(seed >>> 17) % colors.length];
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
          ctx.fillRect(size - x - 1, y, 1, 1);
        }
      }
    }
    return canvas;
  };

  const makeCard = (entry, position) => {
    const card = make("article", "vm-card");
    card.dataset.vmCard = entry.id;
    card.style.left = `${position.x}%`;
    card.style.top = `${position.y}%`;
    card.style.setProperty("--vm-card-rotation", `${position.r}deg`);
    card.style.transform = `rotate(${position.r}deg)`;
    card.style.zIndex = String(position.z);
    card.setAttribute("aria-grabbed", "false");
    const inner = make("div", "vm-card-inner");
    const back = make("div", "vm-card-face vm-card-back");
    back.setAttribute("aria-hidden", "false");
    const backBrand = make("b", "", t("cardBack"));
    const flip = make("button", "vm-card-turn", "↻");
    flip.type = "button";
    flip.tabIndex = 0;
    flip.setAttribute("aria-label", t("turnCard"));
    back.append(backBrand, flip);
    const front = make("div", "vm-card-face vm-card-front");
    front.setAttribute("aria-hidden", "true");
    const image = make("img", "vm-card-picture");
    image.src = assetUrl(entry.thumbnail);
    image.alt = "";
    image.draggable = false;
    image.loading = "lazy";
    const copy = make("div", "vm-card-copy");
    copy.append(make("span", "vm-card-category", categoryLabel(primaryCategory(entry))));
    copy.append(make("strong", "vm-card-title", label(entry)));
    copy.append(make("p", "vm-card-description", description(entry)));
    const insert = make("button", "vm-card-insert", t("insert"));
    insert.type = "button";
    insert.tabIndex = -1;
    insert.dataset.vmInsert = entry.id;
    copy.append(insert);
    front.append(image, copy);
    inner.append(back, front);
    card.append(inner);
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-vm-insert]")) return;
      if (card.dataset.suppressClick === "1") { card.dataset.suppressClick = "0"; return; }
      const reveal = !card.classList.contains("is-revealed");
      card.classList.toggle("is-revealed", reveal);
      back.setAttribute("aria-hidden", String(reveal));
      front.setAttribute("aria-hidden", String(!reveal));
      insert.tabIndex = reveal ? 0 : -1;
      if (card.classList.contains("is-revealed")) {
        card.style.zIndex = String(++state.nextZ);
        state.positions[entry.id].z = state.nextZ;
        save();
      }
    });
    return card;
  };

  const render = () => {
    setStaticLabels();
    by("[data-vm-points]").textContent = `${state.points}P`;
    const visibleOwned = state.owned.filter((id) => contentById.has(id));
    const onFloor = visibleOwned.filter((id) => !Object.values(state.stored).some((ids) => ids.includes(id)));
    by("[data-vm-owned-count]").textContent = cardCount(visibleOwned.length, "owned");
    by("[data-vm-floor-count]").textContent = cardCount(onFloor.length, "floor");
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const cardWidth = mobile ? (window.matchMedia("(max-width: 360px)").matches ? 88 : Math.min(120, window.innerWidth * .27)) : Math.min(166, window.innerWidth * .14);
    const columns = mobile ? 2 : 4;
    const rows = Math.ceil(onFloor.length / columns);
    const baseHeight = mobile ? 410 : 510;
    const floorHeight = Math.max(baseHeight, rows * (cardWidth / .69 + 34) + 22);
    floor.style.minHeight = `${floorHeight}px`;
    const floorWidth = floor.getBoundingClientRect().width;
    const maxCardX = Math.max(0, (floorWidth - cardWidth) / Math.max(1,floorWidth) * 100);
    const maxCardY = Math.max(0, (floorHeight - cardWidth / .69) / floorHeight * 100);
    floor.replaceChildren(...onFloor.map((id) => {
      const entry = contentById.get(id);
      const position = state.positions[id];
      return entry ? makeCard(entry, { ...position, x:Math.min(position.x,maxCardX), y:Math.min(position.y,maxCardY) }) : null;
    }).filter(Boolean));
    lockers.replaceChildren(...categories.map((category) => {
      const section = make("section", "vm-locker");
      section.dataset.vmLocker = category.id;
      const cards = (state.stored[category.id] || []).filter((id) => contentById.has(id));
      const toggle = make("button", "vm-locker-head");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.dataset.vmOpenLocker = category.id;
      toggle.append(make("strong", "", categoryLabel(category.id)), make("span", "", cardCount(cards.length, "stored")), make("span", "", t("open")));
      const body = make("div", "vm-locker-content");
      body.hidden = true;
      body.dataset.vmLockerBody = category.id;
      body.addEventListener("dragover", (event) => event.preventDefault());
      body.addEventListener("drop", (event) => event.preventDefault());
      if (!cards.length) body.append(make("p", "vm-locker-empty", t("emptyLocker")));
      cards.forEach((id) => {
        const entry = contentById.get(id);
        if (!entry) return;
        const row = make("div", "vm-locker-card");
        const img = make("img"); img.src = assetUrl(entry.thumbnail); img.alt = ""; img.loading = "lazy";
        row.append(img, make("strong", "", label(entry)));
        const takeOut = make("button", "", t("takeOut"));
        takeOut.type = "button"; takeOut.dataset.vmTakeOut = id;
        row.append(takeOut); body.append(row);
      });
      section.addEventListener("dragover", (event) => { event.preventDefault(); section.classList.add("is-drop-target"); });
      section.addEventListener("dragleave", (event) => { if (!section.contains(event.relatedTarget)) section.classList.remove("is-drop-target"); });
      section.append(toggle, body);
      return section;
    }));
    const options = by("[data-vm-theme]");
    const selectedTheme = options.value;
    options.replaceChildren();
    categories.forEach((category) => {
      const option = make("option", "", categoryLabel(category.id));
      option.value = category.id;
      options.append(option);
    });
    if (categoryById.has(selectedTheme)) options.value = selectedTheme;
    updateShopButtons();
  };

  const unowned = (categoryId = null) => contents.filter((entry) => !state.owned.includes(entry.id) && (!categoryId || entry.categoryIds.includes(categoryId)));
  const updateShopButtons = () => {
    const available = unowned();
    const themeAvailable = unowned(by("[data-vm-theme]").value);
    by("[data-vm-buy-standard]").disabled = state.points < 40 || available.length === 0;
    by("[data-vm-buy-theme]").disabled = state.points < 40 || themeAvailable.length === 0;
  };

  const addCard = (entry) => {
    if (state.owned.includes(entry.id)) return false;
    state.owned.push(entry.id);
    state.positions[entry.id] = { x:6 + safeRandom() * 72, y:8 + safeRandom() * 48, r:(safeRandom() - .5) * 22, z:++state.nextZ };
    save(); render();
    setStatus(t("packGet", { name:label(entry) }));
    return true;
  };

  const purchase = (categoryId = null) => {
    if (state.points < 40) { setStatus(t("insufficient")); return; }
    const pool = unowned(categoryId);
    if (!pool.length) { setStatus(categoryId ? t("allOwned") : t("packEmpty")); return; }
    const entry = pool[Math.floor(safeRandom() * pool.length)];
    state.points -= 40;
    state.owned.push(entry.id);
    state.positions[entry.id] = { x:5 + safeRandom() * 74, y:8 + safeRandom() * 48, r:(safeRandom() - .5) * 24, z:++state.nextZ };
    save(); render(); setStatus(t("packGet", { name:label(entry) }));
  };

  const arrange = () => {
    const floorIds = state.owned.filter((id) => !Object.values(state.stored).some((ids) => ids.includes(id)));
    if (!floorIds.length) { setStatus(t("noCards")); return; }
    if (!window.confirm(t("autoConfirm"))) return;
    floor.classList.add("is-auto-arranging");
    const columns = window.matchMedia("(max-width: 680px)").matches ? 2 : 4;
    const bounds = floor.getBoundingClientRect();
    const cardWidth = window.matchMedia("(max-width: 360px)").matches ? 88 : window.matchMedia("(max-width: 680px)").matches ? Math.min(120, window.innerWidth * .27) : Math.min(166, window.innerWidth * .14);
    const cardHeight = cardWidth / .69;
    const maxX = Math.max(0, (bounds.width - cardWidth) / bounds.width * 100);
    const maxY = Math.max(0, (bounds.height - cardHeight) / bounds.height * 100);
    const rows = Math.ceil(floorIds.length / columns);
    floorIds.forEach((id, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const pos = state.positions[id];
      pos.x = 2 + (col * Math.max(0, maxX - 4)) / Math.max(1, columns - 1);
      pos.y = rows < 2 ? Math.min(18, maxY) : Math.min(maxY, 4 + row * (maxY / (rows - 1)));
      pos.r = ((index % 5) - 2) * 1.2;
      pos.z = index + 1;
    });
    save(); render();
    floor.classList.add("is-auto-arranging");
    window.setTimeout(() => floor.classList.remove("is-auto-arranging"), 650);
    setStatus(t("sorted"));
  };

  const categoryDrop = (categoryId, contentId) => {
    const entry = contentById.get(contentId);
    if (!entry || !entry.categoryIds.includes(categoryId)) return false;
    Object.values(state.stored).forEach((ids) => { const index = ids.indexOf(contentId); if (index >= 0) ids.splice(index,1); });
    state.stored[categoryId] ||= [];
    state.stored[categoryId].push(contentId);
    save(); render();
    const section = root.querySelector(`[data-vm-locker="${CSS.escape(categoryId)}"]`);
    const body = section?.querySelector("[data-vm-locker-body]");
    const button = section?.querySelector("[data-vm-open-locker]");
    if (body) body.hidden = false;
    if (button) { button.setAttribute("aria-expanded", "true"); button.lastElementChild.textContent = t("close"); }
    setStatus(t("stored"));
    return true;
  };

  const putOnFloor = (contentId, leftPx = null, topPx = null) => {
    Object.values(state.stored).forEach((ids) => { const index = ids.indexOf(contentId); if (index >= 0) ids.splice(index,1); });
    if (leftPx !== null && topPx !== null) {
      const bounds = floor.getBoundingClientRect();
      const cardWidth = window.matchMedia("(max-width: 360px)").matches ? 88 : window.matchMedia("(max-width: 680px)").matches ? Math.min(120, window.innerWidth * .27) : Math.min(166, window.innerWidth * .14);
      const cardHeight = cardWidth / .69;
      state.positions[contentId].x = clamp(((leftPx - bounds.left) / Math.max(1,bounds.width)) * 100, 0, Math.max(0, (bounds.width - cardWidth) / bounds.width * 100));
      state.positions[contentId].y = clamp(((topPx - bounds.top) / Math.max(1,bounds.height)) * 100, 0, Math.max(0, (bounds.height - cardHeight) / bounds.height * 100));
    }
    state.positions[contentId].z = ++state.nextZ;
    save(); render(); setStatus(t("returned"));
  };

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const completionVisible = (doc) => {
    if (!doc) return false;
    const candidates = [...doc.querySelectorAll(".archetype-result-card, .island-ending, [data-quiz-result], [data-worldcup-result], #result")];
    return candidates.some((element) => {
      if (element.hidden || element.getAttribute("aria-hidden") === "true") return false;
      let node = element;
      while (node && node.nodeType === 1) {
        const style = doc.defaultView?.getComputedStyle(node);
        if (node.hidden || style?.display === "none" || style?.visibility === "hidden") return false;
        node = node.parentElement;
      }
      return Boolean(element.textContent.trim()) && element.getBoundingClientRect().width > 0;
    });
  };
  const awardCompletion = (entry) => {
    if (!entry || state.completed.includes(entry.id)) return;
    state.completed.push(entry.id);
    state.points += 20;
    save(); render();
    const toast = make("div", "vm-point-toast", t("completed"));
    toast.setAttribute("role", "status");
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 4300);
  };
  const observeCompletion = (iframe, entry) => {
    completionObserver?.disconnect();
    const inspect = () => {
      try { if (completionVisible(iframe.contentDocument)) awardCompletion(entry); }
      catch { /* Same-origin pages are expected; inaccessible frames do not earn points. */ }
    };
    iframe.addEventListener("load", () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        completionObserver = new MutationObserver(inspect);
        completionObserver.observe(doc.documentElement, { subtree:true, childList:true, attributes:true, attributeFilter:["hidden","aria-hidden","class","style"] });
        inspect();
      } catch { /* Keep the game playable if browser policy blocks frame inspection. */ }
    });
  };

  const showRecognition = (entry) => {
    screen.replaceChildren();
    const panel = make("div", "vm-recognition");
    panel.append(newPixelIcon(entry, 16), make("strong", "", t("start")), make("p", "vm-recognition-dots", t("scanHint")));
    screen.append(panel);
  };

  const zoomIntoCRT = async (sourceRect) => {
    overlay.hidden = false;
    overlay.style.setProperty("--vm-x", `${sourceRect.left}px`);
    overlay.style.setProperty("--vm-y", `${sourceRect.top}px`);
    overlay.style.setProperty("--vm-w", `${Math.max(1,sourceRect.width)}px`);
    overlay.style.setProperty("--vm-h", `${Math.max(1,sourceRect.height)}px`);
    frame.style.setProperty("--vm-x", `${sourceRect.left}px`);
    frame.style.setProperty("--vm-y", `${sourceRect.top}px`);
    frame.style.setProperty("--vm-w", `${Math.max(1,sourceRect.width)}px`);
    frame.style.setProperty("--vm-h", `${Math.max(1,sourceRect.height)}px`);
    frame.style.top = `${sourceRect.top}px`;
    frame.style.left = `${sourceRect.left}px`;
    frame.style.width = `${sourceRect.width}px`;
    frame.style.height = `${sourceRect.height}px`;
    void frame.offsetWidth;
    requestAnimationFrame(() => overlay.classList.add("is-zoomed"));
    await wait(650);
  };

  const insertCard = async (contentId) => {
    if (activeContent || !state.owned.includes(contentId)) return;
    const entry = contentById.get(contentId);
    if (!entry) return;
    const card = floor.querySelector(`[data-vm-card="${CSS.escape(contentId)}"]`);
    if (!card) return;
    activeContent = entry;
    document.body.classList.remove("vm-is-dragging");
    const machineOutOfView = (() => {
      const rect = machine.getBoundingClientRect();
      return rect.top >= window.innerHeight || rect.bottom <= 0;
    })();
    let clone = null;
    const createFlightCard = () => {
      const rect = card.getBoundingClientRect();
      clone = card.cloneNode(true);
      clone.classList.add("vm-insert-animation", "is-revealed");
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.transform = `rotate(${state.positions[contentId].r}deg)`;
      document.body.append(clone);
      card.style.visibility = "hidden";
      return rect;
    };
    if (machineOutOfView) {
      const rect = createFlightCard();
      requestAnimationFrame(() => {
        clone.style.left = `${Math.max(8, window.innerWidth / 2 - rect.width / 2)}px`;
        clone.style.top = `${Math.max(8, window.innerHeight - rect.height - 24)}px`;
        clone.style.transform = "rotate(90deg)";
      });
      await wait(620);
      machine.scrollIntoView({ behavior:"smooth", block:"center" });
      await wait(650);
    } else {
      createFlightCard();
    }
    const slotRect = slot.getBoundingClientRect();
    const flightRect = clone.getBoundingClientRect();
    requestAnimationFrame(() => {
      clone.style.left = `${slotRect.left + slotRect.width / 2 - flightRect.width / 2}px`;
      clone.style.top = `${slotRect.top + slotRect.height / 2 - flightRect.height / 2}px`;
      clone.style.transform = "rotate(90deg)";
    });
    await wait(640);
    clone.remove();
    card.style.visibility = "";
    machineTray.classList.remove("is-drop-target");
    const crtRect = crt.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    await zoomIntoCRT(crtRect);
    showRecognition(entry);
    await wait(1050);
    screen.replaceChildren();
    const ready = make("div", "vm-recognition");
    ready.append(newPixelIcon(entry, 16), make("strong", "", label(entry)), make("p", "", t("startContent")));
    screen.append(ready);
    await wait(700);
    const iframe = make("iframe", "vm-embedded-game");
    iframe.title = label(entry);
    iframe.allow = "clipboard-read; clipboard-write; fullscreen";
    iframe.src = new URL(entry.page, document.baseURI).href;
    activeIframe = iframe;
    observeCompletion(iframe, entry);
    screen.replaceChildren(iframe);
    by("[data-vm-focus-name]").textContent = label(entry);
    iframe.focus({ preventScroll:true });
  };

  const eject = async () => {
    if (closePromise) return closePromise;
    closePromise = (async () => {
      const previous = activeContent;
      completionObserver?.disconnect(); completionObserver = null;
      activeIframe?.remove(); activeIframe = null;
      screen.replaceChildren();
      overlay.classList.remove("is-zoomed");
      await wait(620);
      const chip = make("div", "vm-eject-chip");
      chip.setAttribute("aria-hidden", "true");
      document.body.append(chip);
      await wait(700); chip.remove();
      overlay.hidden = true;
      document.body.style.overflow = "";
      activeContent = null;
      closePromise = null;
      setStatus(previous && state.completed.includes(previous.id) ? t("completedBefore") : t("backToAlley"));
      by("[data-vm-floor]").scrollIntoView({ behavior:"smooth", block:"center" });
    })();
    return closePromise;
  };

  floor.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("button")) return;
    const card = event.target.closest("[data-vm-card]");
    if (!card) return;
    const contentId = card.dataset.vmCard;
    const rect = card.getBoundingClientRect();
    const initialLeft = rect.left + (rect.width - card.offsetWidth) / 2;
    const initialTop = rect.top + (rect.height - card.offsetHeight) / 2;
    card.classList.add("is-dragging");
    card.setAttribute("aria-grabbed", "true");
    try { card.setPointerCapture(event.pointerId); } catch { /* Mouse-like pointers may not support capture. */ }
    card.style.zIndex = String(++state.nextZ);
    state.positions[contentId].z = state.nextZ;
    dragging = { card, contentId, startX:event.clientX, startY:event.clientY, offsetX:event.clientX - initialLeft, offsetY:event.clientY - initialTop, left:initialLeft, top:initialTop, moved:false };
    document.body.classList.add("vm-is-dragging");
  });

  window.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.startX;
    const dy = event.clientY - dragging.startY;
    if (Math.abs(dx) + Math.abs(dy) > 5) {
      dragging.moved = true;
      dragging.card.classList.add("is-revealed");
      const front = dragging.card.querySelector(".vm-card-front");
      const back = dragging.card.querySelector(".vm-card-back");
      if (front) front.setAttribute("aria-hidden", "false");
      if (back) back.setAttribute("aria-hidden", "true");
      const insert = dragging.card.querySelector("[data-vm-insert]");
      if (insert) insert.tabIndex = 0;
    }
    dragging.left = event.clientX - dragging.offsetX;
    dragging.top = event.clientY - dragging.offsetY;
    dragging.card.style.transform = "rotate(0deg)";
    dragging.card.style.position = "fixed";
    dragging.card.style.left = `${dragging.left}px`;
    dragging.card.style.top = `${dragging.top}px`;
    if (event.clientY > window.innerHeight - 64) window.scrollBy(0, 18);
    else if (event.clientY < 48) window.scrollBy(0, -18);
    mobileTray.setAttribute("aria-hidden", "false");
    dragging.card.style.visibility = "hidden";
    const hoverTarget = document.elementFromPoint(event.clientX, event.clientY);
    dragging.card.style.visibility = "";
    machineTray.classList.toggle("is-drop-target", Boolean(hoverTarget?.closest("[data-vm-insert-tray]")));
  });

  window.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    const current = dragging;
    current.card.style.visibility = "hidden";
    const target = document.elementFromPoint(event.clientX, event.clientY);
    current.card.style.visibility = "";
    const locker = target?.closest("[data-vm-locker]");
    const onMachineTray = Boolean(target?.closest("[data-vm-insert-tray]"));
    const trayRect = mobileTray.getBoundingClientRect();
    const overTray = window.matchMedia("(max-width: 680px)").matches && !mobileTray.hidden && document.body.classList.contains("vm-is-dragging") && event.clientX >= trayRect.left && event.clientX <= trayRect.right && event.clientY >= trayRect.top && event.clientY <= trayRect.bottom;
    current.card.classList.remove("is-dragging");
    current.card.setAttribute("aria-grabbed", "false");
    if (!current.moved) {
      dragging = null;
      document.body.classList.remove("vm-is-dragging");
      mobileTray.setAttribute("aria-hidden", "true");
      return;
    }
    current.card.dataset.suppressClick = "1";
    window.setTimeout(() => { if (current.card.dataset.suppressClick === "1") current.card.dataset.suppressClick = "0"; }, 250);
    const bounds = floor.getBoundingClientRect();
    const cardWidth = current.card.offsetWidth;
    const cardHeight = current.card.offsetHeight;
    const left = clamp(current.left - bounds.left, 0, Math.max(0, bounds.width - cardWidth));
    const top = clamp(current.top - bounds.top, 0, Math.max(0, bounds.height - cardHeight));
    current.card.style.position = "absolute";
    current.card.style.left = `${left}px`;
    current.card.style.top = `${top}px`;
    current.card.style.transform = `rotate(${state.positions[current.contentId].r}deg)`;
    state.positions[current.contentId].x = bounds.width ? left / bounds.width * 100 : 0;
    state.positions[current.contentId].y = bounds.height ? top / bounds.height * 100 : 0;
    if (overTray || onMachineTray) {
      save(); render();
      insertCard(current.contentId);
    } else if (locker && locker.dataset.vmLocker) {
      const accepted = categoryDrop(locker.dataset.vmLocker, current.contentId);
      if (!accepted) setStatus(wrongLockerMessage());
    } else {
      save();
    }
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.setAttribute("aria-hidden", "true");
    machineTray.classList.remove("is-drop-target");
  });
  window.addEventListener("pointercancel", () => {
    if (!dragging) return;
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.setAttribute("aria-hidden", "true");
    render();
  });

  root.addEventListener("click", (event) => {
    const insert = event.target.closest("[data-vm-insert]");
    if (insert) { insertCard(insert.dataset.vmInsert); return; }
    const openLocker = event.target.closest("[data-vm-open-locker]");
    if (openLocker) {
      const body = root.querySelector(`[data-vm-locker-body="${CSS.escape(openLocker.dataset.vmOpenLocker)}"]`);
      const isOpen = body && !body.hidden;
      if (body) body.hidden = isOpen;
      openLocker.setAttribute("aria-expanded", String(!isOpen));
      openLocker.lastElementChild.textContent = isOpen ? t("open") : t("close");
      return;
    }
    const takeOut = event.target.closest("[data-vm-take-out]");
    if (takeOut) { putOnFloor(takeOut.dataset.vmTakeOut); return; }
  });
  by("[data-vm-auto]").addEventListener("click", arrange);
  by("[data-vm-buy-standard]").addEventListener("click", () => purchase());
  by("[data-vm-buy-theme]").addEventListener("click", () => purchase(by("[data-vm-theme]").value));
  by("[data-vm-theme]").addEventListener("change", updateShopButtons);
  by("[data-vm-eject]").addEventListener("click", eject);
  window.addEventListener("resize", () => { if (!dragging && !activeContent) render(); });
  mobileTray.addEventListener("dragover", (event) => event.preventDefault());
  mobileTray.setAttribute("aria-hidden", "true");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) eject();
  });

  if (window.i18next?.on) {
    window.i18next.on("initialized", render);
    window.i18next?.on("languageChanged", () => {
      state = normalizeState(state);
      render();
    });
  }
  if (window.MOA_I18N?.ready?.then) window.MOA_I18N.ready.then(() => { render(); save(); });
  else { render(); save(); }
})();
