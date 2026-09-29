(() => {
  const root = document.querySelector("[data-worldcup-game]");
  if (!root) return;
  const gameId = root.dataset.worldcupGame;
  const config = window.MOLGGA_WORLDCUPS?.[gameId];
  if (!config) return;

  const language = window.MOA_I18N?.language || document.documentElement.lang.slice(0, 2) || "ko";
  const tr = (value) => window.MOA_I18N?.t(value) || value;
  const localize = (value) => typeof value === "string" ? tr(value) : (value?.[language] || value?.ko || "");
  const formatShareText = (resultLine, url) => `${resultLine}\n---------------------------------------------------\n${tr("나도 테스트 해보고 싶다면?")}\n${url}`;
  const startPanel = root.querySelector("[data-worldcup-start]");
  const gamePanel = root.querySelector("[data-worldcup-playing]");
  const bracketChoices = [...root.querySelectorAll("[data-bracket-size]")];
  const startButton = root.querySelector("[data-worldcup-begin]");
  const options = root.querySelector("[data-worldcup-options]");
  const roundLabel = root.querySelector("[data-worldcup-round]");
  const matchCount = root.querySelector("[data-worldcup-count]");
  const progress = root.querySelector("[data-worldcup-progress]");
  const backButton = root.querySelector("[data-worldcup-back]");
  const result = root.querySelector("[data-worldcup-result]");
  const status = root.querySelector("[data-worldcup-status]");
  if (!startPanel || !gamePanel || !options || !result || !status) return;
  options.classList.add("worldcup-option-grid");

  let bracketSize = config.availableBrackets[config.availableBrackets.length - 1];
  let round = [];
  let winners = [];
  let matchIndex = 0;
  let matchesPlayed = 0;
  let totalMatches = 0;
  let history = [];
  let moving = false;
  let finished = false;

  const shuffle = (items) => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const roundTitle = (size) => tr(({ 32: "32강", 16: "16강", 8: "8강", 4: "4강", 2: "결승" })[size] || "월드컵");
  const pageUrl = () => `https://molgga.com/${language}/${config.page.replace(/\.html$/, "")}`;
  let fallbackVotes = {};
  const currentItems = () => config.items;
  const showStart = () => {
    startPanel.hidden = false;
    gamePanel.hidden = true;
    bracketChoices.forEach((button) => {
      const selected = Number(button.dataset.bracketSize) === bracketSize;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  bracketChoices.forEach((button) => {
    const size = Number(button.dataset.bracketSize);
    const available = config.availableBrackets.includes(size) && config.items.length >= size;
    button.hidden = !available;
    button.disabled = !available;
    button.addEventListener("click", () => {
      if (!available) return;
      bracketSize = size;
      bracketChoices.forEach((choice) => {
        const selected = Number(choice.dataset.bracketSize) === bracketSize;
        choice.classList.toggle("is-selected", selected);
        choice.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  const renderMatch = (animate = false) => {
    const left = round[matchIndex * 2];
    const right = round[matchIndex * 2 + 1];
    roundLabel.textContent = roundTitle(round.length);
    matchCount.textContent = `${matchesPlayed + 1} / ${totalMatches}`;
    progress.max = totalMatches;
    progress.value = matchesPlayed;
    progress.setAttribute("aria-valuetext", `${matchesPlayed} / ${totalMatches}`);
    backButton.disabled = history.length === 0 || moving;
    backButton.hidden = history.length === 0;
    options.replaceChildren();
    [left, right].forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button worldcup-choice";
      const photo = document.createElement("img");
      photo.className = "worldcup-choice__image";
      photo.src = item.image;
      photo.alt = `${localize(item.name)} ${tr("선택지 사진")}`;
      photo.loading = "lazy";
      photo.addEventListener("error", () => { photo.hidden = true; });
      const name = document.createElement("strong");
      name.textContent = localize(item.name);
      button.append(photo, name);
      const detailText = localize(item.detail);
      if (detailText) {
        const detail = document.createElement("span");
        detail.textContent = detailText;
        button.append(detail);
      }
      button.addEventListener("click", () => choose(item));
      options.append(button);
    });
    if (animate) {
      options.classList.remove("archetype-stage--leaving");
      options.classList.add("archetype-stage--entering");
      requestAnimationFrame(() => requestAnimationFrame(() => options.classList.remove("archetype-stage--entering")));
    }
  };

  const localRanking = () => Object.entries(fallbackVotes)
    .map(([itemId, wins]) => ({ itemId, wins: Number(wins) || 0 }))
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 10);

  const renderRanking = (items, source, error = false) => {
    const panel = result.querySelector("[data-worldcup-ranking]");
    if (!panel) return;
    const caption = panel.querySelector("[data-worldcup-ranking-note]");
    caption.textContent = source === "global"
      ? tr("전체 참가자의 완주 결과를 집계한 인기 순위예요.")
      : tr("전체 랭킹을 불러오지 못해 이 탭에서 완주한 기록만 보여요.");
    if (error && source === "global") caption.textContent += ` ${tr("이번 결과 저장에 실패해 순위에 반영되지 않았을 수 있어요.")}`;
    const list = panel.querySelector("[data-worldcup-ranking-list]");
    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement("li");
      empty.className = "worldcup-ranking__empty";
      empty.textContent = tr("아직 집계된 결과가 없어요. 첫 우승 항목을 남겨보세요!");
      list.append(empty);
      return;
    }
    const visibleEntries = items
      .map((entry) => ({ entry, item: currentItems().find((candidate) => candidate.id === entry.itemId) }))
      .filter(({ item }) => item)
      .slice(0, 10);
    visibleEntries.forEach(({ entry, item }, index) => {
      const row = document.createElement("li");
      row.className = "worldcup-ranking__item";
      const rank = document.createElement("span");
      rank.className = "worldcup-ranking__rank";
      rank.textContent = String(index + 1).padStart(2, "0");
      const photo = document.createElement("img");
      photo.className = "worldcup-ranking__image";
      photo.src = item.image;
      photo.alt = "";
      photo.loading = "lazy";
      photo.addEventListener("error", () => { photo.hidden = true; });
      const name = document.createElement("strong");
      name.textContent = localize(item.name);
      const wins = document.createElement("span");
      wins.className = "worldcup-ranking__votes";
      wins.textContent = `${entry.wins.toLocaleString()} ${tr("회 우승")}`;
      row.append(rank, photo, name, wins);
      list.append(row);
    });
  };

  const loadRanking = async (voteId, winner) => {
    let saveFailed = false;
    if (voteId && winner) {
      fallbackVotes[winner.id] = (Number(fallbackVotes[winner.id]) || 0) + 1;
      try {
        const response = await fetch("/api/worldcup-vote", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ gameId, itemId: winner.id, bracketSize, voteId })
        });
        saveFailed = !response.ok;
      } catch { saveFailed = true; }
    }
    try {
      const response = await fetch(`/api/worldcup-rankings?gameId=${encodeURIComponent(gameId)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("ranking unavailable");
      const data = await response.json();
      renderRanking(data.items || [], "global", saveFailed);
    } catch {
      renderRanking(localRanking(), "local");
    }
  };

  const makeId = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const showWinner = (winner) => {
    finished = true;
    options.hidden = true;
    roundLabel.textContent = tr("최종 우승");
    matchCount.textContent = `${totalMatches} / ${totalMatches} ${tr("완료")}`;
    progress.value = totalMatches;
    backButton.disabled = history.length === 0;
    // A completed result is already submitted to the shared ranking. Keep
    // back navigation available during play, but do not let it revise a vote
    // after the result has been counted.
    backButton.hidden = true;
    result.hidden = false;
    result.replaceChildren();

    const card = document.createElement("article");
    card.className = "archetype-result-card";
    const top = document.createElement("div");
    top.className = "archetype-result-card__top worldcup-result-card__top";
    const brand = document.createElement("span");
    brand.className = "archetype-result-card__brand";
    brand.textContent = `molgga PLAY · ${localize(config.title)}`;
    const photo = document.createElement("img");
    photo.className = "archetype-result-card__image worldcup-result-image";
    photo.src = winner.image;
    photo.alt = `${localize(winner.name)} ${tr("우승 항목 사진")}`;
    const label = document.createElement("p");
    label.className = "archetype-result-card__label";
    label.textContent = tr("나의 최종 선택");
    const heading = document.createElement("h3");
    heading.tabIndex = -1;
    heading.textContent = localize(winner.name);
    const catchphrase = document.createElement("p");
    catchphrase.className = "archetype-result-card__catchphrase";
    catchphrase.textContent = localize(winner.detail);
    top.append(brand, photo, label, heading, catchphrase);
    const body = document.createElement("div");
    body.className = "archetype-result-card__body";
    const note = document.createElement("p");
    note.textContent = tr("무작위로 뽑힌 선택지로 진행한 월드컵에서 가장 마지막까지 선택된 항목이에요.");
    body.append(note);
    card.append(top, body);
    result.append(card);

    const actions = document.createElement("div");
    actions.className = "result-actions";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "button button-small";
    retry.textContent = tr("다시 해보기");
    retry.addEventListener("click", reset);
    const share = document.createElement("button");
    share.type = "button";
    share.className = "button button-small button-quiet";
    share.textContent = tr("결과 공유");
    share.addEventListener("click", () => window.MOLGGA_SHARE?.open({
      title: `${localize(config.title)} [${localize(winner.name)}]`,
      description: localize(winner.detail),
      imageUrl: winner.image,
      buttonTitle: tr("나도 월드컵 해보기"),
      text: formatShareText(tr("이번 월드컵 최종 우승은 [") + localize(winner.name) + tr("] !!"), pageUrl()),
      url: pageUrl()
    }));
    actions.append(retry, share);
    result.append(actions);

    const ranking = document.createElement("section");
    ranking.className = "worldcup-ranking";
    ranking.dataset.worldcupRanking = "";
    const title = document.createElement("h3");
    title.textContent = tr("인기 랭킹");
    const caption = document.createElement("p");
    caption.className = "worldcup-ranking__note";
    caption.dataset.worldcupRankingNote = "";
    const list = document.createElement("ol");
    list.className = "worldcup-ranking__list";
    list.dataset.worldcupRankingList = "";
    ranking.append(title, caption, list);
    result.append(ranking);
    loadRanking(makeId(), winner);
    window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, root.dataset.worldcupGame);
  };

  const choose = (item) => {
    if (finished || moving) return;
    moving = true;
    history.push({ round: [...round], winners: [...winners], matchIndex, matchesPlayed });
    backButton.disabled = true;
    winners.push(item);
    options.classList.add("archetype-stage--leaving");
    window.setTimeout(() => {
      matchesPlayed += 1;
      matchIndex += 1;
      if (matchIndex < round.length / 2) {
        renderMatch(true);
        moving = false;
        return;
      }
      if (winners.length === 1) {
        moving = false;
        showWinner(winners[0]);
        return;
      }
      round = winners;
      winners = [];
      matchIndex = 0;
      renderMatch(true);
      moving = false;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
  };

  function reset() {
    moving = false;
    finished = false;
    round = [];
    winners = [];
    matchIndex = 0;
    matchesPlayed = 0;
    totalMatches = 0;
    history = [];
    result.hidden = true;
    result.replaceChildren();
    options.replaceChildren();
    options.hidden = false;
    status.textContent = "";
    showStart();
    root.querySelector("[data-worldcup-start-title]")?.focus({ preventScroll: true });
  }

  backButton.addEventListener("click", () => {
    if (moving || !history.length) return;
    const previous = history.pop();
    round = previous.round;
    winners = previous.winners;
    matchIndex = previous.matchIndex;
    matchesPlayed = previous.matchesPlayed;
    finished = false;
    result.hidden = true;
    result.replaceChildren();
    options.hidden = false;
    renderMatch(true);
  });

  startButton?.addEventListener("click", () => {
    if (!config.availableBrackets.includes(bracketSize) || config.items.length < bracketSize) {
      status.textContent = tr("진행할 선택지 수가 부족해요.");
      return;
    }
    const selected = shuffle(config.items).slice(0, bracketSize);
    round = shuffle(selected);
    winners = [];
    history = [];
    matchIndex = 0;
    matchesPlayed = 0;
    totalMatches = bracketSize - 1;
    finished = false;
    moving = false;
    startPanel.hidden = true;
    gamePanel.hidden = false;
    result.hidden = true;
    result.replaceChildren();
    options.hidden = false;
    status.textContent = "";
    renderMatch();
    root.querySelector("[data-worldcup-heading]")?.focus({ preventScroll: true });
  });

  showStart();
})();
