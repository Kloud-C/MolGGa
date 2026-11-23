(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const root = document.querySelector("[data-vending-machine]");
  if (!registry || !root) return;

  const lang = () => (window.MOA_I18N?.language || document.documentElement.lang || "ko").slice(0, 2);
  const ejectButtonText = () => ({ ko:"카드 꺼내기", en:"Eject card", ja:"カードを取り出す", zh:"取出卡片" }[lang()] || "Eject card");
  const strings = {
    ko: {
      brand:"딸깍 자판기", kicker:"MOLGGA · 심야 카드 골목", title:"밤 골목에서 카드를 찾아보자", intro:"바닥에 놓인 카드를 살펴보고, 마음에 드는 한 장을 자판기에 넣어보자.", points:"보유 포인트", floor:"골목 바닥", floorHint:"카드를 눌러 앞면을 확인하고, 카드와 바구니는 끌어 옮길 수 있다.", auto:"자동 정리", cardBack:"MOLGGA", turnCard:"카드를 뒤집어 내용 보기", insert:"자판기에 넣기", useCard:"이 카드로 시작", tray:"카드를 여기에 놓기", machine:"딸깍 자판기", machineHint:"카드를 초록색 받침에 놓으면 시작된다", screenIdle:"카드 대기 중", screenHint:"골목에서 카드 한 장을 골라보자", slot:"카드 슬롯", trayLabel:"카드 투입구", lockers:"카드 정리함", emptyLocker:"아직 보관한 카드가 없다.", open:"열기", close:"닫기", takeOut:"바닥에 꺼내기", cards:"장", autoConfirm:"카드를 자동 정리하겠습니까?", autoExplain:"지금 배치한 카드 위치가 바뀐다.", cancel:"취소", confirmArrange:"자동 정리", sorted:"바닥의 카드를 가지런히 놓았다.", noCards:"정리할 카드가 없다.", standard:"골목 카드팩", standardDesc:"아직 찾지 못한 카드 한 장이 나온다. 한 팩에 40P가 든다.", buyStandard:"40P로 카드팩 뜯기", theme:"테마 확장팩", themeDesc:"테마와 들어 있는 카드를 확인한 뒤 무료로 구매 흐름을 체험할 수 있다.", buyTheme:"무료 테스트 구매", allOwned:"이 유형의 카드는 모두 찾았다.", insufficient:"포인트가 부족하다.", packEmpty:"새 카드가 남아 있지 않다.", packGet:"새 카드를 찾았다: {{name}}", stored:"정리함에 넣었다.", returned:"골목 바닥에 꺼내놓았다.", start:"카드 인식 중", scanHint:"잠시만 기다려줘", ready:"카드 인식 완료", startContent:"콘텐츠를 불러오는 중이다", eject:"게임칩 빼기", saved:"카드와 포인트는 이 브라우저에 저장된다.", completed:"처음 완료한 콘텐츠다. 20P를 받았다.", completedBefore:"이미 완료한 콘텐츠다.", chooseTheme:"테마를 고르자", count:"보유 카드", floorCount:"바닥에 놓인 카드", folderStored:"정리함에 보관 중", source:"콘텐츠 페이지 열기", shop:"카드팩 상점", closeOverlay:"자판기 닫기", fallback:"이 콘텐츠를 새 탭에서 연다.", backToAlley:"골목으로 돌아왔다.", kindMatch:"월드컵", kindTest:"테스트", kindStory:"이야기", completion:"끝까지 완료하면 20P", included:"팩에 들어 있는 카드", kindPrefix:"콘텐츠", standardOpening:"카드팩을 뜯는 중", lockerHint:"카드를 유형에 맞는 칸에 놓자", dragInsert:"카드를 넣을 곳", dragLocker:"정리함에 넣기"
    },
    en: {
      brand:"Click Card Arcade", kicker:"MOLGGA · THE MIDNIGHT ALLEY", title:"Find a card in the night alley", intro:"Turn over a card on the pavement, then feed the one you like into the machine.", points:"Your points", floor:"Cards on the pavement", floorHint:"Tap a card to reveal it. Drag cards and baskets to move them.", auto:"Arrange cards", cardBack:"MOLGGA", turnCard:"Turn over this card", insert:"Insert into machine", useCard:"Play this card", tray:"Drop a card here", machine:"Click Card Machine", machineHint:"Place a card on the green tray to begin", screenIdle:"CARD WAITING", screenHint:"Pick one card from the alley", slot:"Card slot", trayLabel:"Insert card", lockers:"Card lockers", emptyLocker:"Nothing stored here yet.", open:"Open", close:"Close", takeOut:"Return to floor", cards:"cards", autoConfirm:"Arrange the cards automatically?", autoExplain:"The positions you chose will change.", cancel:"Cancel", confirmArrange:"Arrange cards", sorted:"The cards are lined up on the floor.", noCards:"There are no cards to arrange.", standard:"Alley card pack", standardDesc:"Get one card you have not found yet. Each pack costs 40P.", buyStandard:"Open pack · 40P", theme:"Themed expansion", themeDesc:"Preview its theme and cards, then try the purchase flow for free.", buyTheme:"Try a free purchase", allOwned:"You found every card of this type.", insufficient:"You need more points.", packEmpty:"No new cards remain.", packGet:"New card found: {{name}}", stored:"Card placed in the locker.", returned:"Card returned to the pavement.", start:"Reading card", scanHint:"Just a moment", ready:"Card recognized", startContent:"Loading your content", eject:"Eject game chip", saved:"Cards and points are saved in this browser.", completed:"First completion. You earned 20P.", completedBefore:"This content was already completed.", chooseTheme:"Choose a theme", count:"owned", floorCount:"on the floor", folderStored:"stored", source:"Open content page", shop:"Card pack shop", closeOverlay:"Close machine", fallback:"Opening this content in a new tab.", backToAlley:"Back in the alley.", kindMatch:"Matchup", kindTest:"Quiz", kindStory:"Story", completion:"Earn 20P by completing it", included:"Cards in this pack", kindPrefix:"Content", standardOpening:"Opening the pack", lockerHint:"Place each card in its matching locker", dragInsert:"Drop card to play", dragLocker:"Store in a locker"
    },
    ja: {
      brand:"カード自販機", kicker:"MOLGGA · 深夜のカード路地", title:"夜の路地でカードを探そう", intro:"路地に落ちているカードをめくり、気になる一枚を自販機に入れてみよう。", points:"所持ポイント", floor:"路地のカード", floorHint:"カードを押して表を確認し、カードやバスケットはドラッグで動かせる。", auto:"カードを整える", cardBack:"MOLGGA", turnCard:"カードをめくる", insert:"自販機に入れる", useCard:"このカードで始める", tray:"ここにカードを置く", machine:"カード自販機", machineHint:"緑の受け皿にカードを置くと始まる", screenIdle:"カード待機中", screenHint:"路地でカードを一枚選ぼう", slot:"カードスロット", trayLabel:"カード投入口", lockers:"カード整理箱", emptyLocker:"まだカードはありません。", open:"開く", close:"閉じる", takeOut:"床に戻す", cards:"枚", autoConfirm:"カードを自動で整理しますか？", autoExplain:"今のカードの位置が変わります。", cancel:"キャンセル", confirmArrange:"自動で整理", sorted:"床のカードを並べました。", noCards:"整理するカードがありません。", standard:"路地のカードパック", standardDesc:"まだ見つけていないカードが一枚出る。1パック40P。", buyStandard:"パックを開く · 40P", theme:"テーマ拡張パック", themeDesc:"テーマとカードを確認してから、無料で購入の流れを試せる。", buyTheme:"無料で試す", allOwned:"この種類のカードはすべて見つけました。", insufficient:"ポイントが足りません。", packEmpty:"新しいカードは残っていません。", packGet:"新しいカードを見つけた: {{name}}", stored:"整理箱に入れました。", returned:"路地の床に戻しました。", start:"カードを読み取り中", scanHint:"少々お待ちください", ready:"カード認識完了", startContent:"コンテンツを読み込み中", eject:"ゲームチップを取り出す", saved:"カードとポイントはこのブラウザーに保存されます。", completed:"初回クリア。20Pを獲得しました。", completedBefore:"このコンテンツはクリア済みです。", chooseTheme:"テーマを選ぶ", count:"枚所持", floorCount:"床にある", folderStored:"収納中", source:"コンテンツページを開く", shop:"カードパックショップ", closeOverlay:"自販機を閉じる", fallback:"コンテンツを新しいタブで開きます。", backToAlley:"路地に戻りました。", kindMatch:"対戦", kindTest:"テスト", kindStory:"ストーリー", completion:"最後まで進むと20P", included:"パックに入っているカード", kindPrefix:"種類", standardOpening:"パックを開封中", lockerHint:"カードの種類に合った整理箱に入れよう", dragInsert:"カードを入れる", dragLocker:"整理箱に入れる"
    },
    zh: {
      brand:"卡片贩卖机", kicker:"MOLGGA · 深夜卡片小巷", title:"在夜巷里找一张卡", intro:"翻开地上的卡片，挑一张喜欢的放进贩卖机。", points:"当前积分", floor:"巷子里的卡片", floorHint:"点击卡片查看正面，拖动卡片或篮子即可移动。", auto:"整理卡片", cardBack:"MOLGGA", turnCard:"翻开这张卡", insert:"投入贩卖机", useCard:"用这张卡开始", tray:"把卡放在这里", machine:"卡片贩卖机", machineHint:"把卡放到绿色托盘上即可开始", screenIdle:"等待卡片", screenHint:"从巷子里挑一张卡吧", slot:"卡片插槽", trayLabel:"卡片入口", lockers:"卡片收纳柜", emptyLocker:"这里还没有卡片。", open:"打开", close:"关闭", takeOut:"放回地面", cards:"张", autoConfirm:"要自动整理卡片吗？", autoExplain:"卡片现在的位置会改变。", cancel:"取消", confirmArrange:"自动整理", sorted:"地上的卡片已摆放整齐。", noCards:"没有需要整理的卡片。", standard:"巷子卡包", standardDesc:"随机获得一张尚未找到的卡片。每包40P。", buyStandard:"打开卡包 · 40P", theme:"主题扩展包", themeDesc:"先查看主题和卡片，再免费体验购买流程。", buyTheme:"免费体验购买", allOwned:"这一类卡片都已找到。", insufficient:"积分不足。", packEmpty:"没有新卡了。", packGet:"发现新卡：{{name}}", stored:"已放入收纳柜。", returned:"已放回巷子地面。", start:"正在识别卡片", scanHint:"请稍候", ready:"卡片识别完成", startContent:"正在加载内容", eject:"取出游戏芯片", saved:"卡片和积分保存在此浏览器中。", completed:"首次完成，获得20P。", completedBefore:"此内容已完成过。", chooseTheme:"选择主题", count:"张已拥有", floorCount:"张在地面", folderStored:"已收纳", source:"打开内容页面", shop:"卡包商店", closeOverlay:"关闭贩卖机", fallback:"将在新标签页打开此内容。", backToAlley:"已回到巷子。", kindMatch:"对决", kindTest:"测试", kindStory:"故事", completion:"完成内容可获得20P", included:"卡包内的卡片", kindPrefix:"类型", standardOpening:"正在拆开卡包", lockerHint:"请把卡片放入对应收纳格", dragInsert:"放入贩卖机", dragLocker:"放入收纳柜"
    }
  };
  const basketStrings = {
    ko:{ baskets:"내 바구니", addBasket:"바구니 추가", basketDefault:"바구니 {{n}}", basketName:"바구니 이름", saveBasket:"저장", renameBasket:"이름 바꾸기", deleteBasket:"바구니 삭제", basketEmpty:"아직 카드가 없다.", basketNameRequired:"바구니 이름을 입력해줘.", basketRemoved:"바구니를 삭제했다. 안에 있던 카드는 바닥으로 돌아왔다.", stored:"바구니에 넣었다.", dragBasket:"바구니에 넣기", basketLabel:"바구니 {{name}} · {{count}}/10장", basketDeleteConfirm:"이 바구니를 삭제할까? 안의 카드는 바닥으로 돌아온다.", basketDialogTitle:"바구니 안 카드", basketMax:"최대 10장", basketFull:"바구니가 가득 찼다. 최대 10장까지 넣을 수 있다.", closeBasket:"닫기", basketEmptyHint:"아직 꽂힌 카드가 없다.", basketMoved:"바구니를 옮겼다."},
    en:{baskets:"My baskets", addBasket:"Add basket", basketDefault:"Basket {{n}}", basketName:"Basket name", saveBasket:"Save", renameBasket:"Rename", deleteBasket:"Delete basket", basketEmpty:"No cards here yet.", basketNameRequired:"Enter a basket name.", basketRemoved:"Basket deleted. Its cards are back on the floor.", stored:"Card placed in the basket.", dragBasket:"Store in basket", basketLabel:"Basket {{name}} · {{count}}/10", basketDeleteConfirm:"Delete this basket? Its cards will return to the floor.", basketDialogTitle:"Cards in basket", basketMax:"Up to 10 cards", basketFull:"This basket is full. It can hold up to 10 cards.", closeBasket:"Close", basketEmptyHint:"No cards are slotted in yet.", basketMoved:"Basket moved."},
    ja:{baskets:"マイバスケット", addBasket:"バスケットを追加", basketDefault:"バスケット {{n}}", basketName:"バスケット名", saveBasket:"保存", renameBasket:"名前を変更", deleteBasket:"バスケットを削除", basketEmpty:"カードはまだありません。", basketNameRequired:"バスケット名を入力してください。", basketRemoved:"バスケットを削除しました。カードは床に戻りました。", stored:"バスケットに入れました。", dragBasket:"バスケットに入れる", basketLabel:"{{name}} · {{count}}/10枚", basketDeleteConfirm:"このバスケットを削除しますか？カードは床に戻ります。", basketDialogTitle:"バスケットのカード", basketMax:"最大10枚", basketFull:"バスケットはいっぱいです。10枚まで入れられます。", closeBasket:"閉じる", basketEmptyHint:"カードはまだありません。", basketMoved:"バスケットを移動しました。"},
    zh:{baskets:"我的篮子", addBasket:"添加篮子", basketDefault:"篮子 {{n}}", basketName:"篮子名称", saveBasket:"保存", renameBasket:"重命名", deleteBasket:"删除篮子", basketEmpty:"这里还没有卡片。", basketNameRequired:"请输入篮子名称。", basketRemoved:"篮子已删除，卡片已放回地面。", stored:"已放入篮子。", dragBasket:"放入篮子", basketLabel:"{{name}} · {{count}}/10张", basketDeleteConfirm:"删除这个篮子？里面的卡片会放回地面。", basketDialogTitle:"篮子里的卡片", basketMax:"最多10张", basketFull:"篮子已满，最多可放10张卡片。", closeBasket:"关闭", basketEmptyHint:"还没有插入卡片。", basketMoved:"篮子已移动。"}
  };
  const t = (key, values = {}) => {
    const template = key === "eject" ? ejectButtonText() : (basketStrings[lang()]?.[key] || strings[lang()]?.[key] || basketStrings.ko[key] || strings.ko[key] || key);
    return template.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name] ?? "");
  };
  const returnCardText = () => ({
    ko:"카드를 잡아 골목 바닥의 원래 자리에 돌려놓자.",
    en:"Drag the card back to its place on the alley floor.",
    ja:"カードを路地の元の場所に戻そう。",
    zh:"把卡片拖回巷子地面的原位。"
  }[lang()] || "Drag the card back to its place on the alley floor.");
  const tr = (key, fallback = "") => window.MOA_I18N?.t(key, { defaultValue: fallback }) || fallback || key;
  const contents = registry.contents.filter((entry) => !entry.availableLanguages || entry.availableLanguages.includes(lang()));
  const categories = [
    { id:"matchups", labelKey:"locker.matchups" },
    { id:"tests", labelKey:"locker.tests" },
    { id:"stories", labelKey:"locker.stories" }
  ];
  const contentById = new Map(contents.map((entry) => [entry.id, entry]));
  const starterIds = ["weekend", "mbti", "night-train"].filter((id) => contentById.has(id));
  const storageKey = "molgga.vendingMachine.v4";
  const previousStorageKeys = ["molgga.vendingMachine.v3", "molgga.vendingMachine.v2", "molgga.vendingMachine.v1"];
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const safeRandom = () => Math.random();
  const nextFloorRotation = (previous) => {
    const current = clamp(Number(previous) || 0, -14, 14);
    const turn = 4 + safeRandom() * 6;
    const next = current + (safeRandom() < .5 ? -turn : turn);
    return clamp(next > 14 ? current - turn : next < -14 ? current + turn : next, -14, 14);
  };
  const cardAspectRatio = 0.66;
  const cardWidthForViewport = () => {
    if (window.matchMedia("(max-width: 360px)").matches) return clamp(window.innerWidth * .29, 84, 104);
    if (window.matchMedia("(max-width: 680px)").matches) return clamp(window.innerWidth * .29, 90, 112);
    if (window.matchMedia("(max-width: 900px)").matches) return clamp(window.innerWidth * .12, 112, 132);
    return clamp(window.innerWidth * .1, 112, 140);
  };
  const basketSizeForViewport = () => window.innerWidth <= 360 ? { width:88, height:100 } : window.innerWidth <= 680 ? { width:96, height:108 } : window.innerWidth <= 900 ? { width:104, height:116 } : { width:112, height:124 };
  const defaultBasketPosition = (index) => {
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const columns = mobile ? 2 : 3;
    const column = index % columns;
    const row = Math.floor(index / columns);
    return { x:mobile ? (column ? 57 : 4) : 5 + column * 31, y:6 + row * (mobile ? 25 : 24), r:((index % 5) - 2) * 2, z:100 + index };
  };
  const cardInsets = (width, height, rotation = 0) => {
    const radians = Math.abs(rotation) * Math.PI / 180;
    return {
      x:Math.max(0, (Math.abs(width * Math.cos(radians)) + Math.abs(height * Math.sin(radians)) - width) / 2),
      y:Math.max(0, (Math.abs(height * Math.cos(radians)) + Math.abs(width * Math.sin(radians)) - height) / 2)
    };
  };
  const defaultPositions = { weekend:{x:8,y:22,r:-11,z:1}, mbti:{x:39,y:43,r:7,z:2}, "night-train":{x:70,y:14,r:12,z:3} };
  const groupForEntry = (entry) => entry.type === "worldcup" || entry.formatId === "worldcup" ? "matchups" : entry.formatId === "story" || entry.source?.kind === "story" || entry.source?.kind === "survival" ? "stories" : "tests";
  const groupForId = (id) => groupForEntry(contentById.get(id) || {});

  const normalizeState = (raw) => {
    const validIds = new Set(contents.map((entry) => entry.id));
    const owned = Array.isArray(raw?.owned) ? [...new Set(raw.owned.filter((id) => validIds.has(id)))] : [];
    starterIds.forEach((id) => { if (!owned.includes(id)) owned.push(id); });
    const baskets = [];
    const storedIds = new Set();
    const addNormalizedBasket = (candidate, index, fallbackId) => {
      const id = String(candidate?.id || fallbackId || "").slice(0, 48);
      if (!id || baskets.some((basket) => basket.id === id)) return;
      const cardIds = [...new Set((Array.isArray(candidate?.cards) ? candidate.cards : []).filter((cardId) => owned.includes(cardId) && validIds.has(cardId) && !storedIds.has(cardId)))].slice(0, 10);
      cardIds.forEach((cardId) => storedIds.add(cardId));
      const defaultName = t("basketDefault", { n:index + 1 });
      const name = String(candidate?.name || defaultName).trim().slice(0, 24) || defaultName;
      const fallbackPosition = defaultBasketPosition(index);
      const candidatePosition = candidate?.position || {};
      baskets.push({ id, name, cards:cardIds, position:{ x:clamp(Number.isFinite(candidatePosition.x) ? candidatePosition.x : fallbackPosition.x, 0, 88), y:clamp(Number.isFinite(candidatePosition.y) ? candidatePosition.y : fallbackPosition.y, 0, 78), r:clamp(Number.isFinite(candidatePosition.r) ? candidatePosition.r : fallbackPosition.r, -12, 12), z:Number.isFinite(candidatePosition.z) ? Math.max(0, Math.floor(candidatePosition.z)) : fallbackPosition.z } });
    };
    if (Array.isArray(raw?.baskets)) {
      raw.baskets.forEach((basket, index) => addNormalizedBasket(basket, index, `basket-${index + 1}`));
    } else {
      categories.forEach((category, index) => {
        const legacyIds = [...new Set((Array.isArray(raw?.stored?.[category.id]) ? raw.stored[category.id] : []).filter((id) => owned.includes(id) && validIds.has(id) && !storedIds.has(id)))];
        if (legacyIds.length) {
          const legacyNames = {
            ko:{matchups:"고르는 재미",tests:"나의 성향",stories:"이야기"},
            en:{matchups:"Matchups",tests:"My quizzes",stories:"Stories"},
            ja:{matchups:"対決",tests:"テスト",stories:"ストーリー"},
            zh:{matchups:"对决",tests:"测试",stories:"故事"}
          };
          addNormalizedBasket({ id:`basket-legacy-${category.id}`, name:legacyNames[lang()]?.[category.id] || category.id, cards:legacyIds }, index);
        }
      });
    }
    const positions = {};
    owned.forEach((id, index) => {
      const candidate = raw?.positions?.[id];
      const fallback = defaultPositions[id] || { x: 8 + (index * 29) % 72, y: 8 + (index * 37) % 72, r: ((index % 13) - 6), z:index + 1 };
      positions[id] = {
        x: clamp(Number.isFinite(candidate?.x) ? candidate.x : fallback.x, 0, 94),
        y: clamp(Number.isFinite(candidate?.y) ? candidate.y : fallback.y, 0, 82),
        r: clamp(Number.isFinite(candidate?.r) ? candidate.r : fallback.r, -15, 15),
        z: Number.isFinite(candidate?.z) ? Math.max(0, Math.floor(candidate.z)) : fallback.z
      };
    });
    const maxZ = Math.max(0, ...Object.values(positions).map((position) => position.z));
    return {
      version:4,
      points:Number.isFinite(raw?.points) ? Math.max(0, Math.floor(raw.points)) : 0,
      owned,
      baskets,
      positions,
      completed:[...new Set((Array.isArray(raw?.completed) ? raw.completed : []).filter((id) => validIds.has(id)))],
      nextZ:Math.max(Number.isFinite(raw?.nextZ) ? Math.floor(raw.nextZ) : owned.length + 1, maxZ, ...baskets.map((basket) => basket.position.z))
    };
  };
  const readState = () => {
    try { const saved = localStorage.getItem(storageKey) || previousStorageKeys.map((key) => localStorage.getItem(key)).find(Boolean); return normalizeState(JSON.parse(saved || "null")); }
    catch { return normalizeState(null); }
  };
  let state = readState();
  const storedCardIds = () => new Set(state.baskets.flatMap((basket) => basket.cards));
  const floorCardIds = () => state.owned.filter((id) => !storedCardIds().has(id));
  const basketFloorSpace = () => 0;
  let basketDialog = null;
  let basketDialogBody = null;
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
  const mobileBasketTray = by("[data-vm-mobile-baskets]");
  const basketRail = by("[data-vm-baskets]");
  const autoDialog = by("[data-vm-confirm]");
  const overlay = by("[data-vm-overlay]");
  const frame = by("[data-vm-focus-crt]");
  const screen = by("[data-vm-screen]");
  const status = by("[data-vm-status]");
  let dragging = null;
  let basketMovement = null;
  let activeContent = null;
  let pendingReturn = null;
  let completionObserver = null;
  let activeIframe = null;
  let launchGeneration = 0;
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
  const setStaticLabels = () => {
    const values = [
      ["[data-vm-brand]", "brand"], ["[data-vm-kicker]", "kicker"], ["[data-vm-title]", "title"], ["[data-vm-intro]", "intro"],
      ["[data-vm-points-label]", "points"], ["[data-vm-floor-title]", "floor"], ["[data-vm-floor-hint]", "floorHint"],
      ["[data-vm-auto]", "auto"], ["[data-vm-machine-hint]", "machineHint"], ["[data-vm-screen-idle]", "screenIdle"],
      ["[data-vm-screen-hint]", "screenHint"], ["[data-vm-slot-label]", "slot"], ["[data-vm-tray-label]", "trayLabel"],
      ["[data-vm-mobile-tray-label]", "tray"], ["[data-vm-add-basket]", "addBasket"], ["[data-vm-standard-title]", "standard"],
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
      const insets = cardInsets(card.offsetWidth * 1.035, card.offsetHeight * 1.035, state.positions[entry.id].r);
      const minX = insets.x / Math.max(1,bounds.width) * 100;
      const maxX = Math.max(minX, (bounds.width - card.offsetWidth * 1.035 - insets.x) / Math.max(1,bounds.width) * 100);
      const minY = insets.y / Math.max(1,bounds.height) * 100;
      const maxY = Math.max(minY, (bounds.height - basketFloorSpace() - card.offsetHeight * 1.035 - insets.y) / Math.max(1,bounds.height) * 100);
      state.positions[entry.id].x = clamp(state.positions[entry.id].x, minX, maxX);
      state.positions[entry.id].y = clamp(state.positions[entry.id].y, minY, maxY);
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

  const renderBasket = (basket) => {
    const section = make("section", "vm-basket");
    const size = basketSizeForViewport();
    const floorWidth = Math.max(1, floor.clientWidth);
    const floorHeight = Math.max(1, floor.clientHeight);
    basket.position.x = clamp(basket.position.x, 0, Math.max(0, (floorWidth - size.width) / floorWidth * 100));
    basket.position.y = clamp(basket.position.y, 0, Math.max(0, (floorHeight - size.height) / floorHeight * 100));
    section.dataset.vmBasketTarget = basket.id;
    section.dataset.vmSuppressClick = "0";
    section.style.left = `${basket.position.x}%`;
    section.style.top = `${basket.position.y}%`;
    section.style.width = `${size.width}px`;
    section.style.height = `${size.height}px`;
    section.style.zIndex = String(basket.position.z);
    section.style.setProperty("--vm-basket-rotation", `${basket.position.r}deg`);
    section.classList.toggle("is-full", basket.cards.length >= 10);
    const face = make("button", "vm-basket-face");
    face.type = "button";
    face.dataset.vmOpenBasket = basket.id;
    face.setAttribute("aria-label", t("basketLabel", { name:basket.name, count:basket.cards.length }));
    face.append(make("span", "vm-basket-rim", ""));
    const slots = make("span", "vm-basket-slots");
    basket.cards.forEach((id, index) => {
      const entry = contentById.get(id);
      if (!entry) return;
      const card = make("span", "vm-basket-slot-card");
      card.style.setProperty("--vm-slot-index", String(index));
      card.style.setProperty("--vm-slot-offset", `${(index - (basket.cards.length - 1) / 2) * 9}px`);
      card.style.setProperty("--vm-slot-angle", `${(index - (basket.cards.length - 1) / 2) * 3.1}deg`);
      card.style.setProperty("--vm-slot-accent", cardAccent(entry));
      card.title = label(entry);
      card.setAttribute("aria-hidden", "true");
      slots.append(card);
    });
    face.append(slots, make("strong", "vm-basket-name", basket.name), make("span", "vm-basket-count", `${basket.cards.length}/10`));
    section.append(face);
    section.addEventListener("dragover", (event) => { event.preventDefault(); section.classList.add("is-drop-target"); });
    section.addEventListener("dragleave", (event) => { if (!section.contains(event.relatedTarget)) section.classList.remove("is-drop-target"); });
    return section;
  };

  const ensureBasketDialog = () => {
    if (basketDialog) return basketDialog;
    basketDialog = make("dialog", "vm-basket-dialog");
    basketDialogBody = make("div", "vm-basket-dialog-body");
    basketDialog.append(basketDialogBody);
    basketDialog.addEventListener("click", (event) => {
      if (event.target === basketDialog) basketDialog.close();
      const basketId = basketDialog.dataset.vmBasketDialog || "";
      const takeOut = event.target.closest("[data-vm-take-out]");
      if (takeOut) { const id = takeOut.dataset.vmTakeOut; putOnFloor(id); openBasketDialog(basketId); }
      const rename = event.target.closest("[data-vm-edit-basket]");
      if (rename) {
        if (saveBasketName(basketId)) openBasketDialog(basketId);
      }
      const remove = event.target.closest("[data-vm-delete-basket]");
      if (remove) {
        if (removeBasket(basketId)) basketDialog.close();
      }
      if (event.target.closest("[data-vm-close-basket]")) basketDialog.close();
    });
    basketDialog.addEventListener("keydown", (event) => {
      const input = event.target.closest("[data-vm-basket-name-input]");
      if (input && event.key === "Enter") { event.preventDefault(); basketDialog.querySelector("[data-vm-edit-basket]")?.click(); }
    });
    document.body.append(basketDialog);
    return basketDialog;
  };

  const openBasketDialog = (basketId) => {
    const basket = state.baskets.find((item) => item.id === basketId);
    if (!basket) return;
    const dialog = ensureBasketDialog();
    dialog.dataset.vmBasketDialog = basketId;
    basketDialogBody.replaceChildren();
    const header = make("header", "vm-basket-dialog-head");
    const titleBlock = make("div", "");
    titleBlock.append(make("h2", "", basket.name), make("p", "", `${basket.cards.length}/10 · ${t("basketMax")}`));
    const close = make("button", "vm-basket-dialog-close", "×");
    close.type = "button";
    close.dataset.vmCloseBasket = "1";
    close.setAttribute("aria-label", t("closeBasket"));
    header.append(titleBlock, close);
    const nameRow = make("div", "vm-basket-dialog-name");
    const input = make("input", "vm-basket-name-input");
    input.type = "text";
    input.maxLength = 24;
    input.value = basket.name;
    input.placeholder = t("basketName");
    input.setAttribute("aria-label", t("basketName"));
    input.dataset.vmBasketNameInput = basket.id;
    const rename = make("button", "vm-basket-dialog-button is-primary", t("renameBasket"));
    rename.type = "button";
    rename.dataset.vmEditBasket = basket.id;
    nameRow.append(input, rename);
    const list = make("div", "vm-basket-dialog-list");
    if (!basket.cards.length) list.append(make("p", "vm-basket-empty", t("basketEmptyHint")));
    basket.cards.forEach((id) => {
      const entry = contentById.get(id);
      if (!entry) return;
      const row = make("div", "vm-basket-dialog-card");
      const image = make("img");
      image.src = assetUrl(entry.thumbnail);
      image.alt = "";
      image.loading = "lazy";
      row.append(image, make("strong", "", label(entry)));
      const takeOut = make("button", "vm-basket-dialog-button", t("takeOut"));
      takeOut.type = "button";
      takeOut.dataset.vmTakeOut = id;
      row.append(takeOut);
      list.append(row);
    });
    const footer = make("footer", "vm-basket-dialog-foot");
    const remove = make("button", "vm-basket-dialog-button is-danger", t("deleteBasket"));
    remove.type = "button";
    remove.dataset.vmDeleteBasket = basket.id;
    footer.append(make("span", "", t("basketMax")), remove);
    basketDialogBody.append(header, nameRow, list, footer);
    if (!dialog.open) dialog.showModal();
  };

  const renderMobileBasketTargets = () => {
    mobileBasketTray.replaceChildren(...state.baskets.map((basket) => {
      const button = make("button", "vm-mobile-basket-target", `${basket.name} · ${basket.cards.length}/10`);
      button.type = "button";
      button.dataset.vmTempBasket = basket.id;
      button.setAttribute("aria-label", t("basketLabel", { name:basket.name, count:basket.cards.length }));
      button.classList.toggle("is-full", basket.cards.length >= 10);
      return button;
    }));
    mobileBasketTray.setAttribute("aria-label", t("baskets"));
  };

  const render = () => {
    setStaticLabels();
    document.querySelectorAll("[data-vm-points]").forEach((node) => { node.textContent = `${state.points}P`; });
    const visibleOwned = state.owned.filter((id) => contentById.has(id));
    const storedIds = storedCardIds();
    const onFloor = visibleOwned.filter((id) => !storedIds.has(id));
    const ownedCount = by("[data-vm-owned-count]");
    if (ownedCount) ownedCount.textContent = cardCount(visibleOwned.length, "owned");
    const floorCount = by("[data-vm-floor-count]");
    if (floorCount) floorCount.textContent = cardCount(onFloor.length, "floor");
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const cardWidth = cardWidthForViewport();
    const columns = mobile ? 2 : 4;
    const rows = Math.ceil(onFloor.length / columns);
    const baseHeight = mobile ? 430 : 500;
    const floorHeight = Math.max(baseHeight, rows * (cardWidth / cardAspectRatio + 38) + 30);
    floor.style.minHeight = `${floorHeight}px`;
    const floorWidth = floor.getBoundingClientRect().width;
    const cardElements = onFloor.map((id) => {
      const entry = contentById.get(id);
      const position = state.positions[id];
      if (!entry) return null;
      const cardHeight = cardWidth / cardAspectRatio;
      const insets = cardInsets(cardWidth, cardHeight, position.r);
      const minX = insets.x / Math.max(1,floorWidth) * 100;
      const maxX = Math.max(minX, (floorWidth - cardWidth - insets.x) / Math.max(1,floorWidth) * 100);
      const minY = insets.y / floorHeight * 100;
      const maxY = Math.max(minY, (floorHeight - cardHeight - insets.y) / floorHeight * 100);
      return makeCard(entry, { ...position, x:clamp(position.x,minX,maxX), y:clamp(position.y,minY,maxY) });
    }).filter(Boolean);
    basketRail.replaceChildren(...state.baskets.map(renderBasket));
    renderMobileBasketTargets();
    floor.replaceChildren(...cardElements, basketRail);
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
    const floorIds = floorCardIds();
    if (!floorIds.length) { setStatus(t("noCards")); return; }
    const dialog = by("[data-vm-confirm]");
    if (dialog?.showModal) { dialog.showModal(); return; }
    if (!window.confirm(`${t("autoConfirm")}\n\n${t("autoExplain")}`)) return;
    arrangeCards(floorIds);
  };

  const arrangeCards = (floorIds = floorCardIds()) => {
    if (!floorIds.length) return;
    floor.classList.add("is-auto-arranging");
    const columns = window.matchMedia("(max-width: 680px)").matches ? 2 : 4;
    const bounds = floor.getBoundingClientRect();
    const cardWidth = cardWidthForViewport();
    const cardHeight = cardWidth / cardAspectRatio;
    const rows = Math.ceil(floorIds.length / columns);
    floorIds.forEach((id, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const pos = state.positions[id];
      pos.r = ((index % 5) - 2) * 1.2;
      const insets = cardInsets(cardWidth, cardHeight, pos.r);
      const minX = insets.x / bounds.width * 100;
      const maxX = Math.max(minX, (bounds.width - cardWidth - insets.x) / bounds.width * 100);
      const minY = insets.y / bounds.height * 100;
      const maxY = Math.max(minY, (bounds.height - basketFloorSpace() - cardHeight - insets.y) / bounds.height * 100);
      pos.x = clamp(2 + (col * Math.max(0, maxX - minX - 4)) / Math.max(1, columns - 1), minX, maxX);
      pos.y = clamp(rows < 2 ? Math.min(18, maxY) : 4 + row * (maxY / (rows - 1)), minY, maxY);
      pos.z = ++state.nextZ;
    });
    save(); render();
    floor.classList.add("is-auto-arranging");
    window.setTimeout(() => floor.classList.remove("is-auto-arranging"), 650);
    setStatus(t("sorted"));
  };

  const basketDrop = (basketId, contentId) => {
    const basket = state.baskets.find((item) => item.id === basketId);
    if (!basket || !contentById.has(contentId)) return false;
    if (basket.cards.includes(contentId)) { setStatus(t("stored")); return true; }
    if (basket.cards.length >= 10) { setStatus(t("basketFull")); return false; }
    state.baskets.forEach((item) => { item.cards = item.cards.filter((id) => id !== contentId); });
    basket.cards.push(contentId);
    save(); render();
    setStatus(t("stored"));
    return true;
  };

  const putOnFloor = (contentId, leftPx = null, topPx = null) => {
    state.baskets.forEach((basket) => { basket.cards = basket.cards.filter((id) => id !== contentId); });
    if (leftPx !== null && topPx !== null) {
      const bounds = floor.getBoundingClientRect();
      const cardWidth = cardWidthForViewport();
      const cardHeight = cardWidth / cardAspectRatio;
      const insets = cardInsets(cardWidth, cardHeight, state.positions[contentId].r);
      const minX = insets.x / Math.max(1,bounds.width) * 100;
      const maxX = Math.max(minX, (bounds.width - cardWidth - insets.x) / Math.max(1,bounds.width) * 100);
      const minY = insets.y / Math.max(1,bounds.height) * 100;
      const maxY = Math.max(minY, (bounds.height - cardHeight - insets.y) / Math.max(1,bounds.height) * 100);
      state.positions[contentId].x = clamp(((leftPx - bounds.left) / Math.max(1,bounds.width)) * 100, minX, maxX);
      state.positions[contentId].y = clamp(((topPx - bounds.top) / Math.max(1,bounds.height)) * 100, minY, maxY);
    }
    state.positions[contentId].z = ++state.nextZ;
    save(); render(); setStatus(t("returned"));
  };

  const addBasket = () => {
    const id = `basket-${Date.now().toString(36)}-${Math.floor(safeRandom() * 1e6).toString(36)}`;
    const position = defaultBasketPosition(state.baskets.length);
    position.z = ++state.nextZ;
    const basket = { id, name:t("basketDefault", { n:state.baskets.length + 1 }), cards:[], position };
    state.baskets.push(basket);
    save(); render();
    openBasketDialog(basket.id);
    basketDialog?.querySelector("[data-vm-basket-name-input]")?.focus();
    basketDialog?.querySelector("[data-vm-basket-name-input]")?.select();
  };

  const saveBasketName = (basketId) => {
    const basket = state.baskets.find((item) => item.id === basketId);
    const input = basketDialog?.querySelector(`[data-vm-basket-name-input="${CSS.escape(basketId)}"]`);
    const name = input?.value.trim().slice(0, 24);
    if (!basket || !name) { setStatus(t("basketNameRequired")); input?.focus(); return; }
    basket.name = name;
    save(); render();
    return true;
  };

  const removeBasket = (basketId) => {
    const basket = state.baskets.find((item) => item.id === basketId);
    if (!basket || !window.confirm(t("basketDeleteConfirm"))) return false;
    basket.cards.forEach((id) => { state.positions[id].z = ++state.nextZ; });
    state.baskets = state.baskets.filter((item) => item.id !== basketId);
    save(); render(); setStatus(t("basketRemoved"));
    return true;
  };

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const waitForMotion = (ms) => wait(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 24 : ms);
  const waitForFrameLoad = (iframe, timeoutMs = 15000) => new Promise((resolve) => {
    let settled = false;
    let timeoutId;
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", finish);
    };
    const finish = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };
    const onLoad = () => {
      try { if (iframe.contentWindow?.location.href === "about:blank") return; }
      catch { /* A cross-origin document has completed its navigation. */ }
      finish();
    };
    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", finish);
    timeoutId = window.setTimeout(finish, timeoutMs);
  });
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
        if (!doc || doc.URL === "about:blank") return;
        completionObserver?.disconnect();
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

  const insertCard = async (contentId, flightCard = null, savedPosition = null) => {
    if (activeContent || pendingReturn || !state.owned.includes(contentId)) { flightCard?.remove(); return; }
    const entry = contentById.get(contentId);
    if (!entry) { flightCard?.remove(); return; }
    const card = floor.querySelector(`[data-vm-card="${CSS.escape(contentId)}"]`);
    if (!card) { flightCard?.remove(); return; }
    const launchId = ++launchGeneration;
    const isCurrentLaunch = () => launchGeneration === launchId && activeContent?.id === entry.id;
    const returnOrigin = { ...(savedPosition || state.positions[contentId]) };
    activeContent = entry;
    completionObserver?.disconnect(); completionObserver = null;
    activeIframe?.remove(); activeIframe = null;
    screen.replaceChildren();
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
        clone.classList.remove("vm-drag-preview", "is-dragging", "is-lifting");
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
        clone.style.transform = "rotate(0deg)";
        document.body.append(clone);
      }
      clone.style.transform = "rotate(0deg)";
      clone.querySelector(".vm-card-front")?.setAttribute("aria-hidden", "false");
      clone.querySelector(".vm-card-back")?.setAttribute("aria-hidden", "true");
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
        clone.style.transform = "rotate(0deg) translateY(-8px)";
      });
      await waitForMotion(420);
      if (!isCurrentLaunch()) { clone.remove(); return; }
      machine.scrollIntoView({ behavior:"smooth", block:"center" });
      await waitForMotion(650);
      if (!isCurrentLaunch()) { clone.remove(); return; }
    }
    const slotRect = slot.getBoundingClientRect();
    const centerX = slotRect.left + slotRect.width / 2;
    const slotCenterLeft = centerX - cardWidth / 2;
    const slotCenterTop = slotRect.top + slotRect.height / 2 - 2;
    requestAnimationFrame(() => {
      clone.style.left = `${slotCenterLeft}px`;
      clone.style.top = `${slotCenterTop}px`;
      clone.style.transform = "rotate(0deg)";
    });
    await waitForMotion(520);
    if (!isCurrentLaunch()) { clone.remove(); card.style.visibility = ""; return; }
    const feedWindow = document.createElement("div");
    const feedWidth = Math.max(1, slotRect.width - 4);
    const feedHeight = Math.max(1, slotRect.height - 4);
    feedWindow.className = "vm-slot-feed-window";
    feedWindow.style.left = `${slotRect.left + 2}px`;
    feedWindow.style.top = `${slotRect.top + 2}px`;
    feedWindow.style.width = `${feedWidth}px`;
    feedWindow.style.height = `${feedHeight}px`;
    clone.classList.remove("vm-insert-animation");
    clone.classList.add("vm-slot-feed-card");
    clone.style.left = `${(feedWidth - cardWidth) / 2}px`;
    clone.style.top = `${feedHeight / 2 - 2}px`;
    clone.style.width = `${cardWidth}px`;
    clone.style.height = `${cardHeight}px`;
    clone.style.setProperty("--vm-feed-distance", `-${cardHeight + feedHeight}px`);
    feedWindow.append(clone);
    document.body.append(feedWindow);
    slot.classList.add("is-feeding-card");
    await waitForMotion(120);
    if (!isCurrentLaunch()) { feedWindow.remove(); slot.classList.remove("is-feeding-card"); card.style.visibility = ""; return; }
    clone.classList.add("is-feeding-up");
    await waitForMotion(900);
    if (!isCurrentLaunch()) { feedWindow.remove(); slot.classList.remove("is-feeding-card"); card.style.visibility = ""; return; }
    feedWindow.remove();
    slot.classList.remove("is-feeding-card");
    card.style.visibility = "";
    card.classList.add("is-return-target");
    card.setAttribute("aria-hidden", "true");
    pendingReturn = { contentId, origin:returnOrigin, sourceCard:card, card:null, slotLeft:0, slotTop:0, width:cardWidth, height:cardHeight };
    machineTray.classList.remove("is-drop-target");
    const crtRect = crt.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    showRecognition(entry);
    await zoomIntoCRT(crtRect);
    if (!isCurrentLaunch()) return;
    await wait(900);
    if (!isCurrentLaunch()) return;
    screen.replaceChildren();
    const ready = make("div", "vm-recognition");
    ready.append(newPixelIcon(entry, 16), make("strong", "", t("ready")), make("h2", "", label(entry)), make("p", "", t("startContent")), make("span", "vm-recognition-progress"));
    screen.append(ready);
    await wait(1450);
    if (!isCurrentLaunch()) return;
    const iframe = make("iframe", "vm-embedded-game");
    iframe.title = label(entry);
    iframe.allow = "clipboard-read; clipboard-write; fullscreen";
    iframe.style.visibility = "hidden";
    const frameLoaded = waitForFrameLoad(iframe);
    iframe.src = new URL(entry.page, document.baseURI).href;
    activeIframe = iframe;
    observeCompletion(iframe, entry);
    screen.append(iframe);
    await frameLoaded;
    if (!isCurrentLaunch()) { iframe.remove(); return; }
    screen.replaceChildren(iframe);
    iframe.style.visibility = "";
    by("[data-vm-focus-name]").textContent = label(entry);
    iframe.focus({ preventScroll:true });
  };

  const restoreEjectedCard = () => {
    if (!pendingReturn) return;
    const returned = pendingReturn;
    returned.card?.remove();
    state.positions[returned.contentId] = { ...returned.origin, z:++state.nextZ };
    save();
    pendingReturn = null;
    activeContent = null;
    render();
    setStatus(t("backToAlley"));
    const floorCard = floor.querySelector(`[data-vm-card="${CSS.escape(returned.contentId)}"]`);
    if (floorCard && returned.revealed) floorCard.click();
    floorCard?.focus({ preventScroll:true });
  };

  const startEjectedCardDrag = (event) => {
    if (event.button !== 0 || !pendingReturn?.card?.classList.contains("is-ready") || dragging) return;
    event.preventDefault();
    const card = pendingReturn.card;
    const rect = card.getBoundingClientRect();
    card.classList.add("is-dragging");
    try { card.setPointerCapture(event.pointerId); } catch { /* Keep mouse and touch dragging available. */ }
    dragging = {
      returning:true, card, dragCard:card, contentId:pendingReturn.contentId,
      startX:event.clientX, startY:event.clientY,
      offsetX:event.clientX - rect.left, offsetY:event.clientY - rect.top,
      left:rect.left, top:rect.top, moved:false,
      origin:{ ...pendingReturn.origin }, slotLeft:pendingReturn.slotLeft, slotTop:pendingReturn.slotTop
    };
    document.body.classList.add("vm-is-dragging");
  };

  const eject = async () => {
    if (closePromise) return closePromise;
    launchGeneration += 1;
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
      document.body.style.overflow = "";
      const sourceCard = previous && floor.querySelector(`[data-vm-card="${CSS.escape(previous.id)}"]`);
      if (previous && sourceCard) {
        const slotRect = slot.getBoundingClientRect();
        const size = {
          width:pendingReturn?.width || sourceCard.offsetWidth,
          height:pendingReturn?.height || sourceCard.offsetHeight
        };
        const card = sourceCard.cloneNode(true);
        card.classList.remove("is-return-target", "vm-insert-animation", "vm-drag-preview", "is-dragging", "is-lifting");
        card.classList.add("vm-return-card", "is-revealed", "is-emerging");
        card.style.position = "fixed";
        card.style.width = `${size.width}px`;
        card.style.height = `${size.height}px`;
        card.style.left = `${slotRect.left + slotRect.width / 2 - size.width / 2}px`;
        card.style.top = `${slotRect.top + slotRect.height / 2 - 2}px`;
        card.style.transform = "rotate(0deg)";
        card.style.zIndex = "20001";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", returnCardText());
        card.setAttribute("aria-hidden", "false");
        card.setAttribute("aria-expanded", "true");
        card.setAttribute("aria-grabbed", "false");
        card.querySelector(".vm-card-front")?.setAttribute("aria-hidden", "false");
        card.querySelector(".vm-card-back")?.setAttribute("aria-hidden", "true");
        const inner = card.querySelector(".vm-card-inner");
        if (inner) {
          inner.style.transition = "none";
          inner.style.transform = "rotateX(0deg) rotateY(180deg)";
        }
        card.addEventListener("pointerdown", startEjectedCardDrag);
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            restoreEjectedCard();
          }
        });
        document.body.append(card);
        pendingReturn = {
          contentId:previous.id,
          origin:{ ...(pendingReturn?.origin || state.positions[previous.id]) },
          sourceCard,
          card,
          width:size.width,
          height:size.height,
          revealed:true,
          slotLeft:Number.parseFloat(card.style.left),
          slotTop:Number.parseFloat(card.style.top)
        };
        await waitForMotion(880);
        card.classList.remove("is-emerging");
        card.classList.add("is-ready");
        setStatus(returnCardText());
      }
      activeContent = null;
      closePromise = null;
      if (!pendingReturn) setStatus(t("backToAlley"));
    })();
    return closePromise;
  };

  floor.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const basket = event.target.closest("[data-vm-basket-target]");
    if (basket) {
      const basketId = basket.dataset.vmBasketTarget;
      const saved = state.baskets.find((item) => item.id === basketId);
      if (!saved) return;
      const bounds = floor.getBoundingClientRect();
      const size = basketSizeForViewport();
      const left = saved.position.x / 100 * bounds.width;
      const top = saved.position.y / 100 * bounds.height;
      basketMovement = { element:basket, basketId, startX:event.clientX, startY:event.clientY, offsetX:event.clientX - bounds.left - left, offsetY:event.clientY - bounds.top - top, left, top, width:size.width, height:size.height, moved:false };
      try { basket.setPointerCapture(event.pointerId); } catch { /* Pointer capture is optional. */ }
      return;
    }
    if (event.target.closest("button")) return;
    const card = event.target.closest("[data-vm-card]");
    if (!card) return;
    const contentId = card.dataset.vmCard;
    const rect = card.getBoundingClientRect();
    const origin = { ...state.positions[contentId] };
    const dragCard = card.cloneNode(true);
    dragCard.classList.remove("vm-insert-animation");
    dragCard.classList.add("vm-drag-preview", "is-dragging");
    dragCard.style.position = "fixed";
    dragCard.style.left = "0px";
    dragCard.style.top = "0px";
    const initialWidth = card.offsetWidth;
    const initialHeight = card.offsetHeight;
    dragCard.style.width = `${initialWidth}px`;
    dragCard.style.height = `${initialHeight}px`;
    dragCard.style.transform = window.getComputedStyle(card).transform;
    const sourceInner = card.querySelector(".vm-card-inner");
    const dragInner = dragCard.querySelector(".vm-card-inner");
    if (sourceInner && dragInner) {
      dragInner.style.transition = "none";
      dragInner.style.transform = window.getComputedStyle(sourceInner).transform;
    }
    dragCard.style.zIndex = "20000";
    document.body.append(dragCard);
    const cloneRect = dragCard.getBoundingClientRect();
    const initialLeft = rect.left - cloneRect.left;
    const initialTop = rect.top - cloneRect.top;
    dragCard.style.left = `${initialLeft}px`;
    dragCard.style.top = `${initialTop}px`;
    card.style.visibility = "hidden";
    card.setAttribute("aria-grabbed", "true");
    try { card.setPointerCapture(event.pointerId); } catch { /* Mouse-like pointers may not support capture. */ }
    card.style.zIndex = String(++state.nextZ);
    state.positions[contentId].z = state.nextZ;
    dragging = {
      card, dragCard, contentId, startX:event.clientX, startY:event.clientY,
      offsetX:event.clientX - initialLeft, offsetY:event.clientY - initialTop,
      left:initialLeft, top:initialTop, moved:false, origin
    };
    document.body.classList.add("vm-is-dragging");
  });

  window.addEventListener("pointermove", (event) => {
    if (basketMovement) {
      const current = basketMovement;
      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;
      if (Math.abs(dx) + Math.abs(dy) > 6) current.moved = true;
      if (current.moved) {
        const bounds = floor.getBoundingClientRect();
        current.left = clamp(event.clientX - bounds.left - current.offsetX, 0, Math.max(0, bounds.width - current.width));
        current.top = clamp(event.clientY - bounds.top - current.offsetY, 0, Math.max(0, bounds.height - current.height));
        current.element.style.left = `${current.left}px`;
        current.element.style.top = `${current.top}px`;
        current.element.style.zIndex = String(state.nextZ + 1);
        current.element.classList.add("is-moving");
        event.preventDefault();
      }
      return;
    }
    if (!dragging) return;
    const dx = event.clientX - dragging.startX;
    const dy = event.clientY - dragging.startY;
    if (Math.abs(dx) + Math.abs(dy) > 5) dragging.moved = true;
    const lift = event.pointerType === "touch" ? 44 : 0;
    dragging.left = event.clientX - dragging.offsetX;
    dragging.top = event.clientY - dragging.offsetY - lift;
    dragging.dragCard.style.left = `${dragging.left}px`;
    dragging.dragCard.style.top = `${dragging.top}px`;
    if (event.clientY > window.innerHeight - 64) window.scrollBy(0, 18);
    else if (event.clientY < 48) window.scrollBy(0, -18);
    if (dragging.returning) return;
    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    const machineRect = machine.getBoundingClientRect();
    const basketRect = basketRail.getBoundingClientRect();
    mobileTray.hidden = !(isMobile && (machineRect.bottom < 0 || machineRect.top > window.innerHeight));
    mobileBasketTray.hidden = !(isMobile && state.baskets.length && (basketRect.bottom < 0 || basketRect.top > window.innerHeight));
    mobileTray.setAttribute("aria-hidden", String(mobileTray.hidden));
    mobileBasketTray.setAttribute("aria-hidden", String(mobileBasketTray.hidden));
    mobileTray.classList.toggle("is-drop-target", Boolean(isMobile && !mobileTray.hidden && event.clientX >= mobileTray.getBoundingClientRect().left && event.clientX <= mobileTray.getBoundingClientRect().right && event.clientY >= mobileTray.getBoundingClientRect().top && event.clientY <= mobileTray.getBoundingClientRect().bottom));
    const hoverTarget = document.elementFromPoint(event.clientX, event.clientY);
    machineTray.classList.toggle("is-drop-target", Boolean(hoverTarget?.closest("[data-vm-insert-tray]")));
    basketRail.querySelectorAll("[data-vm-basket-target]").forEach((basket) => basket.classList.toggle("is-drop-target", hoverTarget?.closest("[data-vm-basket-target]") === basket));
    mobileBasketTray.querySelectorAll("[data-vm-temp-basket]").forEach((basket) => basket.classList.toggle("is-drop-target", hoverTarget?.closest("[data-vm-temp-basket]") === basket));
  });

  window.addEventListener("pointerup", (event) => {
    if (basketMovement) {
      const current = basketMovement;
      basketMovement = null;
      current.element.classList.remove("is-moving");
      if (current.moved) {
        const basket = state.baskets.find((item) => item.id === current.basketId);
        const bounds = floor.getBoundingClientRect();
        if (basket) {
          basket.position.x = clamp(current.left / Math.max(1,bounds.width) * 100, 0, Math.max(0, (bounds.width - current.width) / Math.max(1,bounds.width) * 100));
          basket.position.y = clamp(current.top / Math.max(1,bounds.height) * 100, 0, Math.max(0, (bounds.height - current.height) / Math.max(1,bounds.height) * 100));
          basket.position.z = ++state.nextZ;
          save();
        }
        current.element.style.left = `${basket?.position.x ?? 0}%`;
        current.element.style.top = `${basket?.position.y ?? 0}%`;
        current.element.style.zIndex = String(basket?.position.z ?? state.nextZ);
        current.element.dataset.vmSuppressClick = "1";
        window.setTimeout(() => { if (current.element.dataset.vmSuppressClick === "1") current.element.dataset.vmSuppressClick = "0"; }, 250);
        setStatus(t("basketMoved"));
      }
      return;
    }
    if (!dragging) return;
    const current = dragging;
    if (current.returning) {
      const bounds = floor.getBoundingClientRect();
      const inFloor = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      current.card.classList.remove("is-dragging");
      current.card.setAttribute("aria-grabbed", "false");
      if (current.moved && inFloor) {
        restoreEjectedCard();
      } else if (pendingReturn?.card === current.card) {
        current.card.style.left = `${current.slotLeft}px`;
        current.card.style.top = `${current.slotTop}px`;
        setStatus(returnCardText());
      }
      dragging = null;
      document.body.classList.remove("vm-is-dragging");
      mobileTray.hidden = true;
      mobileBasketTray.hidden = true;
      mobileTray.setAttribute("aria-hidden", "true");
      mobileBasketTray.setAttribute("aria-hidden", "true");
      return;
    }
    const cardWidth = current.dragCard.offsetWidth;
    const cardHeight = current.dragCard.offsetHeight;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const basketTarget = target?.closest("[data-vm-basket-target]");
    const tempBasket = target?.closest("[data-vm-temp-basket]");
    const onMachineTray = Boolean(target?.closest("[data-vm-insert-tray]"));
    const trayRect = mobileTray.getBoundingClientRect();
    const overTray = window.matchMedia("(max-width: 680px)").matches && !mobileTray.hidden && document.body.classList.contains("vm-is-dragging") && event.clientX >= trayRect.left && event.clientX <= trayRect.right && event.clientY >= trayRect.top && event.clientY <= trayRect.bottom;
    const shouldInsert = overTray || onMachineTray;
    current.left = event.clientX - current.offsetX;
    current.top = event.clientY - current.offsetY - (event.pointerType === "touch" ? 44 : 0);
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
      mobileBasketTray.hidden = true;
      mobileTray.setAttribute("aria-hidden", "true");
      mobileBasketTray.setAttribute("aria-hidden", "true");
      return;
    }
    current.card.dataset.suppressClick = "1";
    window.setTimeout(() => { if (current.card.dataset.suppressClick === "1") current.card.dataset.suppressClick = "0"; }, 250);
    const bounds = floor.getBoundingClientRect();
    const inFloor = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    const insets = cardInsets(cardWidth, cardHeight, current.origin.r);
    const left = clamp(current.left - bounds.left, insets.x, Math.max(insets.x, bounds.width - cardWidth - insets.x));
    const top = clamp(current.top - bounds.top, insets.y, Math.max(insets.y, bounds.height - basketFloorSpace() - cardHeight - insets.y));
    if (shouldInsert) {
      state.positions[current.contentId] = { ...current.origin, z:++state.nextZ };
      save(); render();
      insertCard(current.contentId, current.dragCard, current.origin);
    } else if ((basketTarget && basketTarget.dataset.vmBasketTarget) || (tempBasket && tempBasket.dataset.vmTempBasket)) {
      const basketId = basketTarget?.dataset.vmBasketTarget || tempBasket?.dataset.vmTempBasket;
      basketDrop(basketId, current.contentId);
    } else if (inFloor) {
      state.positions[current.contentId].x = bounds.width ? left / bounds.width * 100 : 0;
      state.positions[current.contentId].y = bounds.height ? top / bounds.height * 100 : 0;
      state.positions[current.contentId].r = nextFloorRotation(current.origin.r);
      state.positions[current.contentId].z = state.nextZ;
      save(); render();
    } else {
      state.positions[current.contentId] = current.origin;
      render();
    }
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.hidden = true;
      mobileBasketTray.hidden = true;
    mobileTray.setAttribute("aria-hidden", "true");
      mobileBasketTray.setAttribute("aria-hidden", "true");
    machineTray.classList.remove("is-drop-target");
  });
  window.addEventListener("pointercancel", () => {
    if (basketMovement) {
      basketMovement.element.classList.remove("is-moving");
      basketMovement = null;
      render();
      return;
    }
    if (!dragging) return;
    if (dragging.returning) {
      dragging.card.classList.remove("is-dragging");
      dragging.card.style.left = `${dragging.slotLeft}px`;
      dragging.card.style.top = `${dragging.slotTop}px`;
      dragging = null;
      document.body.classList.remove("vm-is-dragging");
      return;
    }
    dragging.dragCard.remove();
    dragging.card.style.visibility = "";
    dragging.card.setAttribute("aria-grabbed", "false");
    state.positions[dragging.contentId] = dragging.origin;
    save();
    dragging = null;
    document.body.classList.remove("vm-is-dragging");
    mobileTray.hidden = true;
    mobileBasketTray.hidden = true;
    mobileTray.setAttribute("aria-hidden", "true");
    mobileBasketTray.setAttribute("aria-hidden", "true");
    machineTray.classList.remove("is-drop-target");
    render();
  });

  root.addEventListener("click", (event) => {
    const basketTarget = event.target.closest("[data-vm-basket-target]");
    if (basketTarget?.dataset.vmSuppressClick === "1") { basketTarget.dataset.vmSuppressClick = "0"; return; }
    const openBasket = event.target.closest("[data-vm-open-basket]") || basketTarget;
    if (openBasket) {
      openBasketDialog(openBasket.dataset.vmOpenBasket || openBasket.dataset.vmBasketTarget);
      return;
    }
    const tempBasket = event.target.closest("[data-vm-temp-basket]");
    if (tempBasket) openBasketDialog(tempBasket.dataset.vmTempBasket);
  });
  by("[data-vm-add-basket]").addEventListener("click", addBasket);
  by("[data-vm-auto]").addEventListener("click", arrange);
  by("[data-vm-auto-cancel]").addEventListener("click", () => autoDialog?.close("cancel"));
  by("[data-vm-auto-confirm]").addEventListener("click", () => autoDialog?.close("confirm"));
  autoDialog?.addEventListener("close", () => { if (autoDialog.returnValue === "confirm") arrangeCards(); });
  by("[data-vm-buy-standard]").addEventListener("click", () => purchase());
  by("[data-vm-buy-theme]").addEventListener("click", () => purchase(by("[data-vm-theme]").value));
  by("[data-vm-theme]").addEventListener("change", () => { renderThemePreview(); updateShopButtons(); });
  by("[data-vm-eject]").addEventListener("click", eject);
  window.addEventListener("resize", () => { if (!dragging && !basketMovement && !activeContent) render(); });
  mobileTray.addEventListener("dragover", (event) => event.preventDefault());
  mobileTray.setAttribute("aria-hidden", "true");
  mobileBasketTray.setAttribute("aria-hidden", "true");
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
