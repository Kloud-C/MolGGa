(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const root = document.querySelector("[data-vending-machine]");
  if (!registry || !root) return;

  const lang = () => (window.MOA_I18N?.language || document.documentElement.lang || "ko").slice(0, 2);
  const strings = {
      ko: {
      brand:"딸깍 자판기", kicker:"MOLGGA · 심야 카드 골목", title:"밤 골목에서 카드를 찾아보자", intro:"바닥에 놓인 카드를 살펴보고, 마음에 드는 한 장을 자판기에 넣어보자.", points:"보유 포인트", floor:"골목 바닥", floorHint:"카드를 눌러 앞면을 확인하거나 끌어 옮길 수 있다.", auto:"자동 정리", cardBack:"MOLGGA", turnCard:"카드를 뒤집어 내용 보기", insert:"자판기에 넣기", useCard:"이 카드로 시작", tray:"카드를 여기에 놓기", machine:"딸깍 자판기", machineHint:"카드를 초록색 받침에 놓으면 시작된다", screenIdle:"카드 대기 중", screenHint:"골목에서 카드 한 장을 골라보자", slot:"카드 슬롯", trayLabel:"카드 투입구", lockers:"카드 정리함", emptyLocker:"아직 보관한 카드가 없다.", open:"열기", close:"닫기", takeOut:"바닥에 꺼내기", cards:"장", autoConfirm:"카드를 자동 정리하겠습니까?", autoExplain:"지금 배치한 카드 위치가 바뀐다.", cancel:"취소", confirmArrange:"자동 정리", sorted:"바닥의 카드를 가지런히 놓았다.", noCards:"정리할 카드가 없다.", standard:"골목 카드팩", standardDesc:"아직 찾지 못한 카드 한 장이 나온다. 한 팩에 40P가 든다.", buyStandard:"40P로 카드팩 뜯기", theme:"테마 확장팩", themeDesc:"테마와 들어 있는 카드를 확인한 뒤 무료로 구매 흐름을 체험할 수 있다.", buyTheme:"무료 테스트 구매", allOwned:"이 정리함의 카드를 모두 찾았다.", insufficient:"포인트가 부족하다.", packEmpty:"새 카드가 남아 있지 않다.", packGet:"새 카드를 찾았다: {{name}}", stored:"정리함에 넣었다.", returned:"골목 바닥에 꺼내놓았다.", start:"카드 인식 중", scanHint:"잠시만 기다려줘", ready:"카드 인식 완료", startContent:"곧 콘텐츠가 시작된다", eject:"게임칩 빼기", saved:"카드와 포인트는 이 브라우저에 저장된다.", completed:"처음 완료한 콘텐츠다. 20P를 받았다.", completedBefore:"이미 완료한 콘텐츠다.", chooseTheme:"테마를 고르자", count:"보유 카드", floorCount:"바닥에 놓인 카드", folderStored:"정리함에 보관 중", source:"콘텐츠 페이지 열기", shop:"카드팩 상점", closeOverlay:"자판기 닫기", fallback:"이 콘텐츠를 새 탭에서 연다.", backToAlley:"골목으로 돌아왔다.", kindMatch:"월드컵", kindTest:"테스트", kindStory:"이야기", completion:"끝까지 완료하면 20P", included:"팩에 들어 있는 카드", kindPrefix:"콘텐츠", standardOpening:"카드팩을 뜯는 중", lockerHint:"카드를 유형에 맞는 칸에 놓자", dragInsert:"카드를 넣을 곳", dragLocker:"정리함에 넣기"
    },
    en: {
      brand:"Click Card Arcade", kicker:"MOLGGA · THE MIDNIGHT ALLEY", title:"Find a card in the night alley", intro:"Turn over a card on the pavement, then feed the one you like into the machine.", points:"Your points", floor:"Cards on the pavement", floorHint:"Tap a card to see its front, or drag it to move it.", auto:"Arrange cards", cardBack:"MOLGGA", turnCard:"Turn over this card", insert:"Insert into machine", useCard:"Play this card", tray:"Drop a card here", machine:"Click Card Machine", machineHint:"Place a card on the green tray to begin", screenIdle:"CARD WAITING", screenHint:"Pick one card from the alley", slot:"Card slot", trayLabel:"Insert card", lockers:"Card lockers", emptyLocker:"Nothing stored here yet.", open:"Open", close:"Close", takeOut:"Return to floor", cards:"cards", autoConfirm:"Arrange the cards automatically?", autoExplain:"The positions you chose will change.", cancel:"Cancel", confirmArrange:"Arrange cards", sorted:"The cards are lined up on the floor.", noCards:"There are no cards to arrange.", standard:"Alley card pack", standardDesc:"Get one card you have not found yet. Each pack costs 40P.", buyStandard:"Open pack · 40P", theme:"Themed expansion", themeDesc:"Preview its theme and cards, then try the purchase flow for free.", buyTheme:"Try a free purchase", allOwned:"You found every card in this locker.", insufficient:"You need more points.", packEmpty:"No new cards remain.", packGet:"New card found: {{name}}", stored:"Card placed in the locker.", returned:"Card returned to the pavement.", start:"Reading card", scanHint:"Just a moment", ready:"Card recognized", startContent:"Starting your content", eject:"Eject game chip", saved:"Cards and points are saved in this browser.", completed:"First completion. You earned 20P.", completedBefore:"This content was already completed.", chooseTheme:"Choose a theme", count:"owned", floorCount:"on the floor", folderStored:"stored", source:"Open content page", shop:"Card pack shop", closeOverlay:"Close machine", fallback:"Opening this content in a new tab.", backToAlley:"Back in the alley.", kindMatch:"Matchup", kindTest:"Quiz", kindStory:"Story", completion:"Earn 20P by completing it", included:"Cards in this pack", kindPrefix:"Content", standardOpening:"Opening the pack", lockerHint:"Place each card in its matching locker", dragInsert:"Drop card to play", dragLocker:"Store in a locker"
    },
    ja: {
      brand:"カード自販機", kicker:"MOLGGA · 深夜のカード路地", title:"夜の路地でカードを探そう", intro:"路地に落ちているカードをめくり、気になる一枚を自販機に入れてみよう。", points:"所持ポイント", floor:"路地のカード", floorHint:"カードを押して表を見たり、ドラッグして動かしたりできる。", auto:"カードを整える", cardBack:"MOLGGA", turnCard:"カードをめくる", insert:"自販機に入れる", useCard:"このカードで始める", tray:"ここにカードを置く", machine:"カード自販機", machineHint:"緑の受け皿にカードを置くと始まる", screenIdle:"カード待機中", screenHint:"路地でカードを一枚選ぼう", slot:"カードスロット", trayLabel:"カード投入口", lockers:"カード整理箱", emptyLocker:"まだカードはありません。", open:"開く", close:"閉じる", takeOut:"床に戻す", cards:"枚", autoConfirm:"カードを自動で整理しますか？", autoExplain:"今のカードの位置が変わります。", cancel:"キャンセル", confirmArrange:"自動で整理", sorted:"床のカードを並べました。", noCards:"整理するカードがありません。", standard:"路地のカードパック", standardDesc:"まだ見つけていないカードが一枚出る。1パック40P。", buyStandard:"パックを開く · 40P", theme:"テーマ拡張パック", themeDesc:"テーマとカードを確認してから、無料で購入の流れを試せる。", buyTheme:"無料で試す", allOwned:"この整理箱のカードはすべて見つけました。", insufficient:"ポイントが足りません。", packEmpty:"新しいカードは残っていません。", packGet:"新しいカードを見つけた: {{name}}", stored:"整理箱に入れました。", returned:"路地の床に戻しました。", start:"カードを読み取り中", scanHint:"少々お待ちください", ready:"カード認識完了", startContent:"まもなく始まります", eject:"ゲームチップを取り出す", saved:"カードとポイントはこのブラウザーに保存されます。", completed:"初回クリア。20Pを獲得しました。", completedBefore:"このコンテンツはクリア済みです。", chooseTheme:"テーマを選ぶ", count:"枚所持", floorCount:"床にある", folderStored:"収納中", source:"コンテンツページを開く", shop:"カードパックショップ", closeOverlay:"自販機を閉じる", fallback:"コンテンツを新しいタブで開きます。", backToAlley:"路地に戻りました。", kindMatch:"対戦", kindTest:"テスト", kindStory:"ストーリー", completion:"最後まで進むと20P", included:"パックに入っているカード", kindPrefix:"種類", standardOpening:"パックを開封中", lockerHint:"カードの種類に合った整理箱に入れよう", dragInsert:"カードを入れる", dragLocker:"整理箱に入れる"
    },
    zh: {
      brand:"卡片贩卖机", kicker:"MOLGGA · 深夜卡片小巷", title:"在夜巷里找一张卡", intro:"翻开地上的卡片，挑一张喜欢的放进贩卖机。", points:"当前积分", floor:"巷子里的卡片", floorHint:"点击卡片查看正面，也可以拖动它。", auto:"整理卡片", cardBack:"MOLGGA", turnCard:"翻开这张卡", insert:"投入贩卖机", useCard:"用这张卡开始", tray:"把卡放在这里", machine:"卡片贩卖机", machineHint:"把卡放到绿色托盘上即可开始", screenIdle:"等待卡片", screenHint:"从巷子里挑一张卡吧", slot:"卡片插槽", trayLabel:"卡片入口", lockers:"卡片收纳柜", emptyLocker:"这里还没有卡片。", open:"打开", close:"关闭", takeOut:"放回地面", cards:"张", autoConfirm:"要自动整理卡片吗？", autoExplain:"卡片现在的位置会改变。", cancel:"取消", confirmArrange:"自动整理", sorted:"地上的卡片已摆放整齐。", noCards:"没有需要整理的卡片。", standard:"巷子卡包", standardDesc:"随机获得一张尚未找到的卡片。每包40P。", buyStandard:"打开卡包 · 40P", theme:"主题扩展包", themeDesc:"先查看主题和卡片，再免费体验购买流程。", buyTheme:"免费体验购买", allOwned:"这个收纳格的卡片都找到了。", insufficient:"积分不足。", packEmpty:"没有新卡了。", packGet:"发现新卡：{{name}}", stored:"已放入收纳柜。", returned:"已放回巷子地面。", start:"正在识别卡片", scanHint:"请稍候", ready:"卡片识别完成", startContent:"内容即将开始", eject:"取出游戏芯片", saved:"卡片和积分保存在此浏览器中。", completed:"首次完成，获得20P。", completedBefore:"此内容已完成过。", chooseTheme:"选择主题", count:"张已拥有", floorCount:"张在地面", folderStored:"已收纳", source:"打开内容页面", shop:"卡包商店", closeOverlay:"关闭贩卖机", fallback:"将在新标签页打开此内容。", backToAlley:"已回到巷子。", kindMatch:"对决", kindTest:"测试", kindStory:"故事", completion:"完成内容可获得20P", included:"卡包内的卡片", kindPrefix:"类型", standardOpening:"正在拆开卡包", lockerHint:"请把卡片放入对应收纳格", dragInsert:"放入贩卖机", dragLocker:"放入收纳柜"
    }
  };
  const t = (key, values = {}) => {
    const template = strings[lang()]?.[key] || strings.ko[key] || key;
    return template.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name] ?? "");
  };
  const tr = (key, fallback = "") => window.MOA_I18N?.t(key, { defaultValue: fallback }) || fallback || key;
  const contents = registry.contents.filter((entry) => !entry.availableLanguages || entry.availableLanguages.includes(lang()));
  const categories = [
    { id:"matchups", labelKey:"locker.matchups" },
    { id:"tests", labelKey:"locker.tests" },
    { id:"stories", labelKey:"locker.stories" }
  ];
  const contentById = new Map(contents.map((entry) => [entry.id, entry]));
  const starterIds = ["weekend", "mbti", "night-train"].filter((id) => contentById.has(id));
  const storageKey = "molgga.vendingMachine.v2";
  const legacyStorageKey = "molgga.vendingMachine.v1";
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const safeRandom = () => Math.random();
  const cardAspectRatio = 0.66;
  const cardWidthForViewport = () => {
    if (window.matchMedia("(max-width: 680px)").matches) return clamp(window.innerWidth * .36, 112, 132);
    if (window.matchMedia("(max-width: 900px)").matches) return clamp(window.innerWidth * .12, 112, 132);
    return clamp(window.innerWidth * .1, 112, 140);
  };
  const cardLiftSize = () => {
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const width = mobile
      ? clamp(window.innerWidth * .48, 156, 190)
      : clamp(window.innerWidth * (window.matchMedia("(max-width: 900px)").matches ? .24 : .16), 164, 210);
    return { width, height:width / .62 };
  };
  const defaultPositions = { weekend:{x:8,y:22,r:-11,z:1}, mbti:{x:39,y:43,r:7,z:2}, "night-train":{x:70,y:14,r:12,z:3} };
  const groupForEntry = (entry) => entry.type === "worldcup" || entry.formatId === "worldcup" ? "matchups" : entry.formatId === "story" || entry.source?.kind === "story" || entry.source?.kind === "survival" ? "stories" : "tests";
  const groupForId = (id) => groupForEntry(contentById.get(id) || {});

  const normalizeState = (raw) => {
    const validIds = new Set(contents.map((entry) => entry.id));
    const owned = Array.isArray(raw?.owned) ? [...new Set(raw.owned.filter((id) => validIds.has(id)))] : [];
    starterIds.forEach((id) => { if (!owned.includes(id)) owned.push(id); });
    const stored = {};
    categories.forEach((category) => {
      const legacyIds = Object.values(raw?.stored || {}).flatMap((ids) => Array.isArray(ids) ? ids : []);
      const storedIds = [...(Array.isArray(raw?.stored?.[category.id]) ? raw.stored[category.id] : []), ...legacyIds];
      stored[category.id] = [...new Set(storedIds.filter((id) => owned.includes(id) && validIds.has(id) && groupForId(id) === category.id))];
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
      version:2,
      points:Number.isFinite(raw?.points) ? Math.max(0, Math.floor(raw.points)) : 0,
      owned,
      stored,
      positions,
      completed:[...new Set((Array.isArray(raw?.completed) ? raw.completed : []).filter((id) => validIds.has(id)))],
      nextZ:Number.isFinite(raw?.nextZ) ? raw.nextZ : owned.length + 1
    };
  };
  const readState = () => {
    try { return normalizeState(JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey) || "null")); }
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
  const mobileLockerTray = by("[data-vm-mobile-lockers]");
  const lockers = by("[data-vm-lockers]");
  const autoDialog = by("[data-vm-confirm]");
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
    const names = {
      ko:{ matchups:"고르는 재미", tests:"나의 성향", stories:"이야기" },
      en:{ matchups:"Matchups", tests:"Quizzes", stories:"Stories" },
      ja:{ matchups:"対決", tests:"テスト", stories:"ストーリー" },
      zh:{ matchups:"对决", tests:"测试", stories:"故事" }
    };
    return names[lang()]?.[categoryId] || names.ko[categoryId] || categoryId;
  };
  const kindLabel = (entry) => t(groupForEntry(entry) === "matchups" ? "kindMatch" : groupForEntry(entry) === "stories" ? "kindStory" : "kindTest");
  const entryDefinition = (entry) => ({
    id:entry.id,
    titleKey:entry.titleKey,
    type:kindLabel(entry),
    descriptionKey:entry.descriptionKey,
    icon:entry.thumbnail,
    execute:{ path:entry.page, source:entry.source },
    completionCondition:{ kind:"visible-result", selectors:entry.source?.kind === "survival" ? [".island-ending"] : [".archetype-result-card", "[data-quiz-result]", "[data-worldcup-result]", "#result"] }
  });
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
      ["[data-vm-brand]", "brand"], ["[data-vm-kicker]", "kicker"], ["[data-vm-title]", "title"], ["[data-vm-intro]", "intro"],
      ["[data-vm-points-label]", "points"], ["[data-vm-floor-title]", "floor"], ["[data-vm-floor-hint]", "floorHint"],
      ["[data-vm-auto]", "auto"], ["[data-vm-machine-hint]", "machineHint"], ["[data-vm-screen-idle]", "screenIdle"],
      ["[data-vm-screen-hint]", "screenHint"], ["[data-vm-slot-label]", "slot"], ["[data-vm-tray-label]", "trayLabel"],
      ["[data-vm-mobile-tray-label]", "tray"], ["[data-vm-lockers-title]", "lockers"], ["[data-vm-standard-title]", "standard"],
      ["[data-vm-standard-desc]", "standardDesc"], ["[data-vm-buy-standard]", "buyStandard"], ["[data-vm-theme-title]", "theme"],
      ["[data-vm-theme-desc]", "themeDesc"], ["[data-vm-buy-theme]", "buyTheme"], ["[data-vm-theme-label]", "chooseTheme"],
      ["[data-vm-save-note]", "saved"], ["[data-vm-eject]", "eject"],
      ["[data-vm-shop-link]", "shop"], ["[data-vm-auto-title]", "autoConfirm"],
      ["[data-vm-auto-explain]", "autoExplain"], ["[data-vm-auto-cancel]", "cancel"],
      ["[data-vm-auto-confirm]", "confirmArrange"]
    ];
    values.forEach(([selector, key]) => { const node = document.querySelector(selector) || by(selector); if (node) node.textContent = t(key); });
    const machinePanel = by("[data-vm-machine]");
    if (machinePanel) machinePanel.setAttribute("aria-label", t("machine"));
    const machineBody = by(".vm-machine");
    if (machineBody) machineBody.setAttribute("aria-label", t("machine"));
    const shop = by("[data-vm-shop]");
    if (shop) shop.setAttribute("aria-label", t("shop"));
    if (frame) frame.setAttribute("aria-label", t("machine"));
    const mobileTrayLabel = by("[data-vm-mobile-tray]");
    if (mobileTrayLabel) mobileTrayLabel.textContent = t("dragInsert");
    const mobileLockersLabel = by("[data-vm-mobile-lockers]");
    if (mobileLockersLabel) {
      mobileLockersLabel.replaceChildren(...categories.map((category) => {
        const target = make("button", "vm-mobile-locker-target", `${categoryLabel(category.id)} · ${t("dragLocker")}`);
        target.type = "button";
        target.dataset.vmTempLocker = category.id;
        return target;
      }));
    }
  };
  const primaryCategory = (entry) => groupForEntry(entry);
  const cardAccent = (entry) => {
    const palettes = { matchups:["#f2a65a","#c8759b","#d5c572"], tests:["#7dd6bb","#83a9e8","#dd9ad5"], stories:["#e58a74","#91a9ce","#d2b46e"] };
    let seed = 0;
    for (const char of entry.id) seed = (seed * 33 + char.charCodeAt(0)) >>> 0;
    return palettes[groupForEntry(entry)][seed % palettes[groupForEntry(entry)].length];
  };
  const assetUrl = (path) => path.startsWith("/") ? new URL(`..${path}`, document.baseURI).href : new URL(path, document.baseURI).href;
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const newPixelIcon = (entry, size = 12, className = "vm-recognition-pixel") => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.className = className;
    canvas.setAttribute("aria-hidden", "true");
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;
    const seedText = entry.id;
    let seed = 0;
    for (let i = 0; i < seedText.length; i += 1) seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    const accent = cardAccent(entry);
    const colors = [accent, "#DAFA98", "#83c39a", "#d9e8d0"];
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
    card.dataset.vmType = entryDefinition(entry).type;
    card.dataset.vmRoute = entry.page;
    card.dataset.vmCompletion = entryDefinition(entry).completionCondition.kind;
    card.style.setProperty("--vm-card-accent", cardAccent(entry));
    card.style.left = `${position.x}%`;
    card.style.top = `${position.y}%`;
    card.style.setProperty("--vm-card-rotation", `${position.r}deg`);
    card.style.transform = `rotate(${position.r}deg)`;
    card.style.zIndex = String(position.z);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", label(entry));
    card.setAttribute("aria-expanded", "false");
    card.setAttribute("aria-grabbed", "false");
    const inner = make("div", "vm-card-inner");
    const back = make("div", "vm-card-face vm-card-back");
    back.setAttribute("aria-hidden", "false");
    const backBrand = make("b", "", t("cardBack"));
    const flip = make("span", "vm-card-turn", "↻");
    flip.setAttribute("aria-hidden", "true");
    back.append(backBrand, flip);
    const front = make("div", "vm-card-face vm-card-front");
    front.setAttribute("aria-hidden", "true");
    const image = make("img", "vm-card-picture");
    image.src = assetUrl(entry.thumbnail);
    image.alt = "";
    image.draggable = false;
    image.loading = "lazy";
    const pixel = newPixelIcon(entry, 12, "vm-card-pixel");
    pixel.setAttribute("aria-hidden", "true");
    const copy = make("div", "vm-card-copy");
    const typeLine = make("div", "vm-card-type-line");
    typeLine.append(make("span", "vm-card-category", categoryLabel(primaryCategory(entry))), make("span", "vm-card-kind", kindLabel(entry)));
    copy.append(typeLine);
    copy.append(make("strong", "vm-card-title", label(entry)));
    copy.append(make("p", "vm-card-description", description(entry)));
    copy.append(make("small", "vm-card-reward", t("completion")));
    front.append(image, pixel, copy);
    inner.append(back, front);
    card.append(inner);
    card.addEventListener("click", (event) => {
      if (card.dataset.suppressClick === "1") { card.dataset.suppressClick = "0"; return; }
      const reveal = !card.classList.contains("is-revealed");
      card.classList.toggle("is-revealed", reveal);
      back.setAttribute("aria-hidden", String(reveal));
      front.setAttribute("aria-hidden", String(!reveal));
      card.setAttribute("aria-expanded", String(reveal));
      card.style.transform = `rotate(${state.positions[entry.id].r}deg) scale(${reveal ? 1.035 : 1})`;
      const bounds = floor.getBoundingClientRect();
      const maxX = Math.max(0, (bounds.width - card.offsetWidth) / Math.max(1, bounds.width) * 100);
      const maxY = Math.max(0, (bounds.height - card.offsetHeight) / Math.max(1, bounds.height) * 100);
      state.positions[entry.id].x = Math.min(state.positions[entry.id].x, maxX);
      state.positions[entry.id].y = Math.min(state.positions[entry.id].y, maxY);
      card.style.left = `${state.positions[entry.id].x}%`;
      card.style.top = `${state.positions[entry.id].y}%`;
      if (card.classList.contains("is-revealed")) {
        card.style.zIndex = String(++state.nextZ);
        state.positions[entry.id].z = state.nextZ;
        save();
      }
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (event.key === "Enter" && card.classList.contains("is-revealed")) insertCard(entry.id);
        else card.click();
      }
    });
    return card;
  };

  const render = () => {
    setStaticLabels();
    document.querySelectorAll("[data-vm-points]").forEach((node) => { node.textContent = `${state.points}P`; });
    const visibleOwned = state.owned.filter((id) => contentById.has(id));
    const onFloor = visibleOwned.filter((id) => !Object.values(state.stored).some((ids) => ids.includes(id)));
    by("[data-vm-owned-count]").textContent = cardCount(visibleOwned.length, "owned");
    by("[data-vm-floor-count]").textContent = cardCount(onFloor.length, "floor");
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const cardWidth = cardWidthForViewport();
    const columns = mobile ? 2 : 4;
    const rows = Math.ceil(onFloor.length / columns);
    const baseHeight = mobile ? 360 : 500;
    const floorHeight = Math.max(baseHeight, rows * (cardWidth / cardAspectRatio + 38) + 30);
    floor.style.minHeight = `${floorHeight}px`;
    const floorWidth = floor.getBoundingClientRect().width;
    const maxCardX = Math.max(0, (floorWidth - cardWidth) / Math.max(1,floorWidth) * 100);
    const maxCardY = Math.max(0, (floorHeight - cardWidth / cardAspectRatio) / floorHeight * 100);
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
    if (categories.some((category) => category.id === selectedTheme)) options.value = selectedTheme;
    renderThemePreview();
    updateShopButtons();
  };

  const unowned = (categoryId = null) => contents.filter((entry) => !state.owned.includes(entry.id) && (!categoryId || groupForEntry(entry) === categoryId));
  const renderThemePreview = () => {
    const preview = by("[data-vm-theme-preview]");
    if (!preview) return;
    const categoryId = by("[data-vm-theme]").value;
    const candidates = unowned(categoryId);
    preview.replaceChildren();
    preview.append(make("strong", "vm-pack-preview-title", t("included")));
    if (!candidates.length) {
      preview.append(make("p", "vm-pack-preview-empty", t("allOwned")));
      return;
    }
    const list = make("ul", "vm-pack-preview-list");
    candidates.forEach((entry) => {
      const row = make("li", "");
      row.append(make("span", "vm-pack-preview-kind", kindLabel(entry)), make("span", "vm-pack-preview-name", label(entry)));
      list.append(row);
    });
    preview.append(list);
  };
  const updateShopButtons = () => {
    const available = unowned();
    const themeAvailable = unowned(by("[data-vm-theme]").value);
    by("[data-vm-buy-theme]").disabled = themeAvailable.length === 0 || packBusy;
    by("[data-vm-buy-standard]").disabled = packBusy || state.points < 40 || available.length === 0;
  };

  const addCard = (entry) => {
    if (state.owned.includes(entry.id)) return false;
    state.owned.push(entry.id);
    state.positions[entry.id] = { x:6 + safeRandom() * 72, y:8 + safeRandom() * 48, r:(safeRandom() - .5) * 22, z:++state.nextZ };
    save(); render();
    setStatus(t("packGet", { name:label(entry) }));
    return true;
  };

  let packBusy = false;
  const purchase = async (categoryId = null) => {
    if (packBusy) return;
    if (!categoryId && state.points < 40) { setStatus(t("insufficient")); return; }
    const pool = unowned(categoryId);
    if (!pool.length) { setStatus(categoryId ? t("allOwned") : t("packEmpty")); return; }
    const entry = pool[Math.floor(safeRandom() * pool.length)];
    packBusy = true;
    const pack = root.querySelector(`[data-vm-pack="${categoryId ? "theme" : "standard"}"]`);
    pack?.classList.add("is-opening");
    if (!categoryId) state.points -= 40;
    state.owned.push(entry.id);
    state.positions[entry.id] = { x:5 + safeRandom() * 74, y:8 + safeRandom() * 55, r:(safeRandom() - .5) * 24, z:++state.nextZ };
    save(); render();
    setStatus(t("standardOpening"));
    await wait(680);
    pack?.classList.remove("is-opening");
    packBusy = false;
    updateShopButtons();
    setStatus(t("packGet", { name:label(entry) }));
  };

  const arrange = () => {
    const floorIds = state.owned.filter((id) => !Object.values(state.stored).some((ids) => ids.includes(id)));
    if (!floorIds.length) { setStatus(t("noCards")); return; }
    const dialog = by("[data-vm-confirm]");
    if (dialog?.showModal) { dialog.showModal(); return; }
    if (!window.confirm(`${t("autoConfirm")}\n\n${t("autoExplain")}`)) return;
    arrangeCards(floorIds);
  };

  const arrangeCards = (floorIds = state.owned.filter((id) => !Object.values(state.stored).some((ids) => ids.includes(id)))) => {
    if (!floorIds.length) return;
    floor.classList.add("is-auto-arranging");
    const columns = window.matchMedia("(max-width: 680px)").matches ? 2 : 4;
    const bounds = floor.getBoundingClientRect();
    const cardWidth = cardWidthForViewport();
    const cardHeight = cardWidth / cardAspectRatio;
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
    if (!entry || groupForEntry(entry) !== categoryId) return false;
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
      const cardWidth = cardWidthForViewport();
      const cardHeight = cardWidth / cardAspectRatio;
      state.positions[contentId].x = clamp(((leftPx - bounds.left) / Math.max(1,bounds.width)) * 100, 0, Math.max(0, (bounds.width - cardWidth) / bounds.width * 100));
      state.positions[contentId].y = clamp(((topPx - bounds.top) / Math.max(1,bounds.height)) * 100, 0, Math.max(0, (bounds.height - cardHeight) / bounds.height * 100));
    }
    state.positions[contentId].z = ++state.nextZ;
    save(); render(); setStatus(t("returned"));
  };

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const waitForMotion = (ms) => wait(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 24 : ms);
  const completionVisible = (doc, entry) => {
    if (!doc) return false;
    const selectors = entryDefinition(entry).completionCondition.selectors;
    const candidates = selectors.flatMap((selector) => [...doc.querySelectorAll(selector)]);
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
      try { if (completionVisible(iframe.contentDocument, entry)) awardCompletion(entry); }
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
    panel.append(newPixelIcon(entry, 16), make("strong", "", t("start")), make("p", "vm-recognition-dots", t("scanHint")), make("span", "vm-recognition-progress"));
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
    void frame.offsetWidth;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => overlay.classList.add("is-zoomed"));
    await wait(reducedMotion ? 30 : 650);
  };

  const insertCard = async (contentId, flightCard = null) => {
    if (activeContent || !state.owned.includes(contentId)) { flightCard?.remove(); return; }
    const entry = contentById.get(contentId);
    if (!entry) { flightCard?.remove(); return; }
    const card = floor.querySelector(`[data-vm-card="${CSS.escape(contentId)}"]`);
    if (!card) { flightCard?.remove(); return; }
    activeContent = entry;
    document.body.classList.remove("vm-is-dragging");
    const machineOutOfView = (() => {
      const rect = machine.getBoundingClientRect();
      return rect.top >= window.innerHeight || rect.bottom <= 0;
    })();
    let clone = flightCard;
    const createFlightCard = () => {
      if (clone) {
        const computed = window.getComputedStyle(clone);
        const currentWidth = Number.parseFloat(computed.width) || clone.offsetWidth;
        const currentHeight = Number.parseFloat(computed.height) || clone.offsetHeight;
        clone.style.width = `${currentWidth}px`;
        clone.style.height = `${currentHeight}px`;
        clone.classList.remove("vm-drag-preview", "is-dragging");
        clone.classList.add("vm-insert-animation", "is-revealed");
      } else {
        const rect = card.getBoundingClientRect();
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        clone = card.cloneNode(true);
        clone.classList.add("vm-insert-animation", "is-revealed");
        clone.style.left = `${rect.left + rect.width / 2 - width / 2}px`;
        clone.style.top = `${rect.top + rect.height / 2 - height / 2}px`;
        clone.style.width = `${width}px`;
        clone.style.height = `${height}px`;
        clone.style.transform = `rotate(${state.positions[contentId].r}deg)`;
        document.body.append(clone);
      }
      card.style.visibility = "hidden";
      return clone;
    };
    createFlightCard();
    const cardWidth = clone.offsetWidth;
    const cardHeight = clone.offsetHeight;
    if (machineOutOfView) {
      requestAnimationFrame(() => {
        clone.style.left = `${Math.max(8, window.innerWidth / 2 - cardWidth / 2)}px`;
        clone.style.top = `${Math.max(8, window.innerHeight - cardHeight - 28)}px`;
        clone.style.transform = "rotate(0deg) translateY(-8px) scale(.96)";
      });
      await waitForMotion(420);
      machine.scrollIntoView({ behavior:"smooth", block:"center" });
      await waitForMotion(650);
    }
    const slotRect = slot.getBoundingClientRect();
    const centerX = slotRect.left + slotRect.width / 2;
    const centerY = slotRect.top + slotRect.height / 2;
    const slotCenterLeft = centerX - cardWidth / 2;
    const slotCenterTop = centerY - cardHeight / 2;
    requestAnimationFrame(() => {
      clone.style.left = `${slotCenterLeft}px`;
      clone.style.top = `${slotCenterTop}px`;
      clone.style.transform = "rotate(90deg)";
    });
    await waitForMotion(520);
    const slotThickness = clamp((Math.max(8, slotRect.height) * .72) / Math.max(1, cardWidth), .08, .24);
    clone.style.transform = `scaleY(${slotThickness}) rotate(90deg)`;
    await waitForMotion(230);
    clone.style.top = `${slotCenterTop - Math.min(5, slotRect.height * .22)}px`;
    clone.style.transform = `scaleY(${slotThickness * .28}) rotate(90deg)`;
    clone.style.opacity = ".12";
    await waitForMotion(260);
    clone.remove();
    card.style.visibility = "";
    machineTray.classList.remove("is-drop-target");
    const crtRect = crt.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    await zoomIntoCRT(crtRect);
    showRecognition(entry);
    await wait(900);
    screen.replaceChildren();
    const ready = make("div", "vm-recognition");
    ready.append(newPixelIcon(entry, 16), make("strong", "", t("ready")), make("h2", "", label(entry)), make("p", "", t("startContent")));
    screen.append(ready);
    await wait(1450);
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
      overlay.classList.add("is-returning");
      overlay.classList.remove("is-zoomed");
      await waitForMotion(620);
      overlay.hidden = true;
      overlay.classList.remove("is-returning");
      const chip = make("div", "vm-eject-chip");
      chip.setAttribute("aria-hidden", "true");
      if (previous) chip.append(newPixelIcon(previous, 10, "vm-eject-chip-icon"));
      const slotRect = slot.getBoundingClientRect();
      const chipWidth = 84;
      chip.style.left = `${slotRect.left + slotRect.width / 2 - chipWidth / 2}px`;
      chip.style.top = `${slotRect.top + Math.min(4, slotRect.height * .2)}px`;
      document.body.append(chip);
      await waitForMotion(820); chip.remove();
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
    const dragCard = card.cloneNode(true);
    const startsRevealed = card.classList.contains("is-revealed");
    dragCard.classList.remove("vm-insert-animation");
    dragCard.classList.add("vm-drag-preview", "is-dragging");
    if (startsRevealed) dragCard.classList.add("is-revealed", "is-lifting");
    else dragCard.classList.remove("is-revealed");
    dragCard.querySelector(".vm-card-front")?.setAttribute("aria-hidden", String(!startsRevealed));
    dragCard.querySelector(".vm-card-back")?.setAttribute("aria-hidden", String(startsRevealed));
    dragCard.style.position = "fixed";
    dragCard.style.left = "0px";
    dragCard.style.top = "0px";
    const initialWidth = card.offsetWidth;
    const initialHeight = card.offsetHeight;
    dragCard.style.width = `${initialWidth}px`;
    dragCard.style.height = `${initialHeight}px`;
    dragCard.style.transform = `rotate(${state.positions[contentId].r}deg)`;
    dragCard.style.zIndex = "20000";
    document.body.append(dragCard);
    const initialLeft = rect.left + rect.width / 2 - initialWidth / 2;
    const initialTop = rect.top + rect.height / 2 - initialHeight / 2;
    dragCard.style.left = `${initialLeft}px`;
    dragCard.style.top = `${initialTop}px`;
    card.style.visibility = "hidden";
    card.setAttribute("aria-grabbed", "true");
    try { card.setPointerCapture(event.pointerId); } catch { /* Mouse-like pointers may not support capture. */ }
    card.style.zIndex = String(++state.nextZ);
    state.positions[contentId].z = state.nextZ;
    dragging = {
      card, dragCard, contentId, startX:event.clientX, startY:event.clientY,
      anchorX:clamp((event.clientX - initialLeft) / Math.max(1, initialWidth), 0, 1),
      anchorY:clamp((event.clientY - initialTop) / Math.max(1, initialHeight), 0, 1),
      left:initialLeft, top:initialTop, moved:false, lifted:startsRevealed, origin:{ ...state.positions[contentId] }
    };
    document.body.classList.add("vm-is-dragging");
  });

  window.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragging.startX;
    const dy = event.clientY - dragging.startY;
    if (Math.abs(dx) + Math.abs(dy) > 5) {
      dragging.moved = true;
      if (!dragging.lifted) {
        dragging.lifted = true;
        const size = cardLiftSize();
        dragging.dragCard.classList.add("is-lifting", "is-revealed");
        dragging.dragCard.querySelector(".vm-card-front")?.setAttribute("aria-hidden", "false");
        dragging.dragCard.querySelector(".vm-card-back")?.setAttribute("aria-hidden", "true");
        dragging.dragCard.style.width = `${size.width}px`;
        dragging.dragCard.style.height = `${size.height}px`;
        dragging.dragCard.style.transform = "rotate(0deg) translateY(-8px) scale(1.015)";
      }
    }
    const lift = event.pointerType === "touch" ? 44 : 0;
    dragging.left = event.clientX - dragging.dragCard.offsetWidth * dragging.anchorX;
    dragging.top = event.clientY - dragging.dragCard.offsetHeight * dragging.anchorY - lift;
    dragging.dragCard.style.left = `${dragging.left}px`;
    dragging.dragCard.style.top = `${dragging.top}px`;
    if (event.clientY > window.innerHeight - 64) window.scrollBy(0, 18);
    else if (event.clientY < 48) window.scrollBy(0, -18);
    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    const machineRect = machine.getBoundingClientRect();
    const lockerRect = lockers.getBoundingClientRect();
    mobileTray.hidden = !(isMobile && (machineRect.bottom < 0 || machineRect.top > window.innerHeight));
    mobileLockerTray.hidden = !(isMobile && (lockerRect.bottom < 0 || lockerRect.top > window.innerHeight));
    mobileTray.setAttribute("aria-hidden", String(mobileTray.hidden));
    mobileLockerTray.setAttribute("aria-hidden", String(mobileLockerTray.hidden));
    mobileTray.classList.toggle("is-drop-target", Boolean(isMobile && !mobileTray.hidden && event.clientX >= mobileTray.getBoundingClientRect().left && event.clientX <= mobileTray.getBoundingClientRect().right && event.clientY >= mobileTray.getBoundingClientRect().top && event.clientY <= mobileTray.getBoundingClientRect().bottom));
    const hoverTarget = document.elementFromPoint(event.clientX, event.clientY);
    machineTray.classList.toggle("is-drop-target", Boolean(hoverTarget?.closest("[data-vm-insert-tray]")));
  });

  window.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    const current = dragging;
    const cardWidth = current.dragCard.offsetWidth;
    const cardHeight = current.dragCard.offsetHeight;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const locker = target?.closest("[data-vm-locker]");
    const tempLocker = target?.closest("[data-vm-temp-locker]");
    const onMachineTray = Boolean(target?.closest("[data-vm-insert-tray]"));
    const trayRect = mobileTray.getBoundingClientRect();
    const overTray = window.matchMedia("(max-width: 680px)").matches && !mobileTray.hidden && document.body.classList.contains("vm-is-dragging") && event.clientX >= trayRect.left && event.clientX <= trayRect.right && event.clientY >= trayRect.top && event.clientY <= trayRect.bottom;
    const shouldInsert = overTray || onMachineTray;
    current.left = event.clientX - current.dragCard.offsetWidth * current.anchorX;
    current.top = event.clientY - current.dragCard.offsetHeight * current.anchorY - (event.pointerType === "touch" ? 44 : 0);
    if (shouldInsert) {
      current.dragCard.style.left = `${current.left}px`;
      current.dragCard.style.top = `${current.top}px`;
    } else {
      current.dragCard.remove();
    }
    current.card.style.visibility = "";
    current.card.setAttribute("aria-grabbed", "false");
    if (!current.moved) {
      current.dragCard.remove();
      state.positions[current.contentId].z = state.nextZ;
      save();
      dragging = null;
      document.body.classList.remove("vm-is-dragging");
      mobileTray.hidden = true;
      mobileLockerTray.hidden = true;
      return;
    }
    current.card.dataset.suppressClick = "1";
    window.setTimeout(() => { if (current.card.dataset.suppressClick === "1") current.card.dataset.suppressClick = "0"; }, 250);
    const bounds = floor.getBoundingClientRect();
    const inFloor = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    const left = clamp(current.left - bounds.left, 0, Math.max(0, bounds.width - cardWidth));
    const top = clamp(current.top - bounds.top, 0, Math.max(0, bounds.height - cardHeight));
    if (shouldInsert) {
      state.positions[current.contentId].x = bounds.width ? left / bounds.width * 100 : current.origin.x;
      state.positions[current.contentId].y = bounds.height ? top / bounds.height * 100 : current.origin.y;
      save(); render();
      insertCard(current.contentId, current.dragCard);
    } else if ((locker && locker.dataset.vmLocker) || (tempLocker && tempLocker.dataset.vmTempLocker)) {
      const groupId = locker?.dataset.vmLocker || tempLocker?.dataset.vmTempLocker;
      const accepted = categoryDrop(groupId, current.contentId);
      if (!accepted) {
        state.positions[current.contentId] = current.origin;
        setStatus(wrongLockerMessage());
        render();
      }
    } else if (inFloor) {
      state.positions[current.contentId].x = bounds.width ? left / bounds.width * 100 : 0;
      state.positions[current.contentId].y = bounds.height ? top / bounds.height * 100 : 0;
      state.positions[current.contentId].z = state.nextZ;
      save(); render();
    } else {
      state.positions[current.contentId] = current.origin;
      render();
    }
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.hidden = true;
    mobileLockerTray.hidden = true;
    mobileTray.setAttribute("aria-hidden", "true");
    mobileLockerTray.setAttribute("aria-hidden", "true");
    machineTray.classList.remove("is-drop-target");
  });
  window.addEventListener("pointercancel", () => {
    if (!dragging) return;
    dragging.dragCard.remove();
    dragging.card.style.visibility = "";
    dragging.card.setAttribute("aria-grabbed", "false");
    state.positions[dragging.contentId] = dragging.origin;
    save();
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.hidden = true;
    mobileLockerTray.hidden = true;
    mobileTray.setAttribute("aria-hidden", "true");
    mobileLockerTray.setAttribute("aria-hidden", "true");
    machineTray.classList.remove("is-drop-target");
    render();
  });

  root.addEventListener("click", (event) => {
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
  by("[data-vm-auto-cancel]").addEventListener("click", () => autoDialog?.close("cancel"));
  by("[data-vm-auto-confirm]").addEventListener("click", () => autoDialog?.close("confirm"));
  autoDialog?.addEventListener("close", () => { if (autoDialog.returnValue === "confirm") arrangeCards(); });
  by("[data-vm-buy-standard]").addEventListener("click", () => purchase());
  by("[data-vm-buy-theme]").addEventListener("click", () => purchase(by("[data-vm-theme]").value));
  by("[data-vm-theme]").addEventListener("change", () => { renderThemePreview(); updateShopButtons(); });
  by("[data-vm-eject]").addEventListener("click", eject);
  window.addEventListener("resize", () => { if (!dragging && !activeContent) render(); });
  mobileTray.addEventListener("dragover", (event) => event.preventDefault());
  mobileTray.setAttribute("aria-hidden", "true");
  mobileLockerTray.setAttribute("aria-hidden", "true");
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
