(() => {
  const root = document.querySelector("[data-archetype-test]");
  if (!root) return;

  const config = window.MOA_ARCHETYPE_TESTS?.[root.dataset.archetypeTest];
  if (!config) return;
  const tr = (text) => window.MOA_I18N?.t(text) || text;
  const localizedQuizUrl = (url) => `https://molgga.com/${window.MOA_I18N?.language || "ko"}/${new URL(url, location.href).pathname.split("/").pop().replace(/\.html$/, "")}`;
  const resultLabel = config.resultLabel || (root.dataset.archetypeTest === "past-life" ? "나의 전생 캐릭터" : "나의 결과 유형");

  const progress = root.querySelector("[data-quiz-progress]");
  const progressText = root.querySelector("[data-quiz-progress-text]");
  const stage = root.querySelector("[data-quiz-stage]");
  const backButton = root.querySelector("[data-quiz-back]");
  const error = root.querySelector("[data-quiz-error]");
  const result = root.querySelector("[data-quiz-result]");
  const answers = Array(config.questions.length).fill(null);
  let current = 0;
  let moving = false;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const splitResultSentences = (text) => {
    const normalized = String(text).replace(/\s+/gu, " ").trim();
    return normalized.match(/[^.!?。！？]+(?:[.!?。！？]+|$)/gu)?.map((sentence) => sentence.trim()).filter(Boolean) || (normalized ? [normalized] : []);
  };
  const renderResultSentences = (text) => splitResultSentences(text).map((sentence) => `<span class="result-sentence">${escapeHtml(sentence)}</span>`).join("");
  const renderResultBullets = (text) => `<ul class="archetype-result-card__summary">${splitResultSentences(text).map((sentence) => `<li>${escapeHtml(sentence)}</li>`).join("")}</ul>`;
  const addChoiceScores = (scores, entries) => {
    entries.forEach((entry) => {
      const id = typeof entry === "string" ? entry : entry.id;
      const weight = typeof entry === "string" ? 1 : Number(entry.weight);
      const normalization = scoreMultipliers[id] || 1;
      if (Object.prototype.hasOwnProperty.call(scores, id) && Number.isFinite(weight) && weight > 0) scores[id] += weight * normalization;
    });
  };
  // Balance profiles with different numbers of answer opportunities. Rounded integer scales preserve exact ties.
  const scoreMultipliers = (() => {
    if (!config.balanceResultExposure) return {};
    const opportunities = Object.fromEntries(Object.keys(config.profiles).map((id) => [id, 0]));
    config.questions.forEach((question) => {
      question.choices.forEach((choice) => {
        choice.scores.forEach((entry) => {
          const id = typeof entry === "string" ? entry : entry.id;
          const weight = typeof entry === "string" ? 1 : Number(entry.weight);
          if (Object.hasOwn(opportunities, id) && Number.isFinite(weight) && weight > 0) {
            opportunities[id] += weight / question.choices.length;
          }
        });
      });
    });
    const values = Object.values(opportunities).filter((value) => value > 0);
    const averageOpportunity = values.reduce((total, value) => total + value, 0) / values.length;
    return Object.fromEntries(Object.entries(opportunities).map(([id, value]) => [
      id,
      value > 0 ? Math.round(1_000_000 * Math.pow(averageOpportunity / value, 0.95)) : 1
    ]));
  })();
  const stableTieIndex = (contentId, answerIndexes, candidateCount) => {
    const pattern = `${contentId}:${answerIndexes.join(",")}`;
    let hash = 0x811c9dc5;
    for (let index = 0; index < pattern.length; index += 1) {
      hash ^= pattern.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0) % candidateCount;
  };

  const renderQuestion = (animate = false, focusPrompt = true) => {
    const question = config.questions[current];
    progress.max = config.questions.length;
    progress.value = current + 1;
    progress.setAttribute("aria-valuetext", `${current + 1} / ${config.questions.length} ${tr("문항")}`);
    progressText.textContent = `${current + 1} / ${config.questions.length}`;
    backButton.disabled = current === 0;
    backButton.hidden = current === 0;
    error.textContent = "";

    stage.innerHTML = `<fieldset class="archetype-question"><legend class="archetype-question__prompt" tabindex="-1">${current + 1}. ${escapeHtml(tr(question.prompt))}</legend><div class="archetype-question__choices">${question.choices.map((choice, index) => `<button class="choice-button${answers[current] === index ? " is-selected" : ""}" type="button" data-choice="${index}" aria-pressed="${answers[current] === index}"><span class="choice-button__number">0${index + 1}</span><span>${escapeHtml(tr(choice.text))}</span></button>`).join("")}</div></fieldset>`;
    if (animate) {
      stage.classList.remove("archetype-stage--leaving");
      stage.classList.add("archetype-stage--entering");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => stage.classList.remove("archetype-stage--entering")));
    }
    if (focusPrompt) stage.querySelector("legend").focus({ preventScroll: true });

    stage.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        answers[current] = Number(button.dataset.choice);
        stage.querySelectorAll("[data-choice]").forEach((option) => {
          const selected = option === button;
          option.classList.toggle("is-selected", selected);
          option.setAttribute("aria-pressed", String(selected));
        });
        error.textContent = "";
        move(1);
      });
    });
  };

  const showResult = (focusResult = true) => {
    const scores = Object.fromEntries(Object.keys(config.profiles).map((key) => [key, 0]));
    answers.forEach((answerIndex, questionIndex) => {
      addChoiceScores(scores, config.questions[questionIndex].choices[answerIndex].scores);
    });
    const highScore = Math.max(...Object.values(scores));
    const tied = Object.keys(scores).filter((key) => scores[key] === highScore);
    // A stable hash keeps repeated answers reproducible while distributing exact-score ties
    // without coupling the winner to the order of questions or result profiles.
    const winner = tied[stableTieIndex(root.dataset.archetypeTest, answers, tied.length)];
    const profile = config.profiles[winner];
    const imagePath = profile.image || profile.imageFile;
    const imageCredit = config.imageCredits?.[winner];
    const compatNames = (ids) => ids.map((id) => tr(config.profiles[id].name)).join(" · ");
    const extraContent = profile.details?.length
      ? `<div class="result-detail-grid archetype-result-card__details">${profile.details.map((item) => `<article class="result-detail-card"><h3 class="result-detail-card__label">${item.icon ? `<img class="result-detail-icon" src="../image/result-icons/${escapeHtml(item.icon)}.png" alt="" aria-hidden="true">` : ""}${escapeHtml(tr(item.title).replace(/\s*[\p{Extended_Pictographic}\uFE0F\u200D]+/gu, "").trim())}</h3><p class="result-detail-card__text">${renderResultSentences(tr(item.text))}</p></article>`).join("")}</div>`
      : `<div class="result-detail-grid archetype-result-card__details"><article class="result-detail-card"><h3 class="result-detail-card__label">${escapeHtml(tr("찰떡 궁합"))}</h3><p class="result-detail-card__text result-detail-card__text--featured"><strong>${escapeHtml(compatNames(profile.good))}</strong></p></article><article class="result-detail-card"><h3 class="result-detail-card__label">${escapeHtml(tr("서로 알아가면 좋은 유형"))}</h3><p class="result-detail-card__text result-detail-card__text--featured"><strong>${escapeHtml(compatNames(profile.tricky))}</strong></p></article></div>`;

    root.querySelector("[data-quiz-navigation]").hidden = true;
    root.querySelector("[data-quiz-progress-wrap]").hidden = true;
    stage.hidden = true;
    result.style.setProperty("--result-accent", profile.color);
    result.innerHTML = `<article class="archetype-result-card"><div class="archetype-result-card__top"><span class="archetype-result-card__brand">molgga PLAY · ${escapeHtml(tr(config.title))}</span>${imagePath ? `<img class="archetype-result-card__image" src="${escapeHtml(imagePath)}" alt="${escapeHtml(tr(profile.name))} ${escapeHtml(tr("content.result.imageAlt"))}" loading="lazy" onload="this.nextElementSibling.hidden=true" onerror="this.hidden=true"> <span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>${imageCredit ? `<p class="image-credit">${escapeHtml(tr("이미지 출처:"))} <a href="${escapeHtml(imageCredit.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.artist)}</a> · <a href="${escapeHtml(imageCredit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.license)}</a></p>` : ""}` : `<span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>`}<p class="archetype-result-card__label">${escapeHtml(tr(resultLabel))}</p><h3 tabindex="-1">${escapeHtml(tr(profile.name))}</h3><p class="archetype-result-card__catchphrase">${escapeHtml(tr(profile.catchphrase))}</p></div><div class="archetype-result-card__body">${renderResultBullets(tr(profile.description))}${extraContent}</div></article><div class="result-actions"><button class="button button-small" type="button" data-quiz-restart>${escapeHtml(tr("다시 해보기"))}</button><button class="button button-small button-quiet" type="button" data-quiz-share>${escapeHtml(tr("결과 공유"))}</button></div><p class="share-status" role="status" aria-live="polite" data-quiz-share-status></p>`;
    result.hidden = false;
    window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, root.dataset.archetypeTest);
    if (focusResult) result.querySelector("h3").focus({ preventScroll: true });
    result.querySelector("[data-quiz-restart]").addEventListener("click", () => {
      answers.fill(null);
      current = 0;
      result.hidden = true;
      stage.hidden = false;
      root.querySelector("[data-quiz-navigation]").hidden = false;
      root.querySelector("[data-quiz-progress-wrap]").hidden = false;
      renderQuestion(true);
    });
    result.querySelector("[data-quiz-share]").addEventListener("click", () => {
      const status = result.querySelector("[data-quiz-share-status]");
      const url = localizedQuizUrl(config.url);
      const shareQuestion = tr(config.sharePrompt || config.title);
      const resultName = tr(profile.name);
      const resultDescription = `${tr(profile.catchphrase)} ${tr(profile.shareDescription)}`;
      const resultLine = `${shareQuestion} [${resultName}]`;
      const shareText = `${resultLine}\n${resultDescription}\n---------------------------------------------------\n${tr("나도 테스트 해보고 싶다면?")}\n${url}`;
      status.textContent = "";
      window.MOLGGA_SHARE?.open({ title: resultLine, description: resultDescription, imageUrl: imagePath, buttonTitle: tr("나도 테스트하기"), text: shareText, url });
    });
  };

  const move = (direction) => {
    if (moving) return;
    if (direction < 0 && current === 0) return;
    moving = true;
    stage.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    stage.classList.add("archetype-stage--leaving");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160;
    window.setTimeout(() => {
      if (direction > 0 && current === config.questions.length - 1) {
        showResult();
        moving = false;
        return;
      }
      current += direction;
      renderQuestion(true);
      moving = false;
    }, delay);
  };

  backButton.addEventListener("click", () => move(-1));
  const translationsReady = window.MOA_I18N?.ready;
  if (translationsReady && typeof translationsReady.then === "function") translationsReady.then(() => renderQuestion());
  else renderQuestion();
  window.i18next?.on("languageChanged", () => {
    if (result.hidden) renderQuestion(false, false);
    else showResult(false);
  });
})();
