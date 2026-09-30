(() => {
  const root = document.querySelector("[data-archetype-test]");
  if (!root) return;

  const config = window.MOA_ARCHETYPE_TESTS?.[root.dataset.archetypeTest];
  if (!config) return;
  const tr = (text, options) => window.MOA_I18N?.t(text, options) || text;
  const localizedQuizUrl = (url) => `https://molgga.com/${window.MOA_I18N?.language || "ko"}/${new URL(url, location.href).pathname.split("/").pop().replace(/\.html$/, "")}`;
  const resultLabel = config.resultLabel || (root.dataset.archetypeTest === "past-life" ? "나의 전생 캐릭터" : "나의 결과 유형");

  const progressWrap = root.querySelector("[data-quiz-progress-wrap]");
  const progress = root.querySelector("[data-quiz-progress]");
  const progressText = root.querySelector("[data-quiz-progress-text]");
  const stage = root.querySelector("[data-quiz-stage]");
  const backButton = root.querySelector("[data-quiz-back]");
  const navigation = root.querySelector("[data-quiz-navigation]");
  const error = root.querySelector("[data-quiz-error]");
  const result = root.querySelector("[data-quiz-result]");
  const answers = Array(config.questions.length).fill(null);
  const storyMode = Boolean(config.storyMode);
  const preloadedStoryImages = new Set();
  let current = storyMode ? -1 : 0;
  let moving = false;
  let storyContinueButton = null;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const splitResultSentences = (text) => {
    const normalized = String(text).replace(/\s+/gu, " ").trim();
    return normalized.match(/[^.!?。！？]+(?:[.!?。！？]+|$)/gu)?.map((sentence) => sentence.trim()).filter(Boolean) || (normalized ? [normalized] : []);
  };
  const renderResultSentences = (text) => splitResultSentences(text).map((sentence) => `<span class="result-sentence">${escapeHtml(sentence)}</span>`).join("");
  const renderResultBullets = (text) => `<ul class="archetype-result-card__summary">${splitResultSentences(text).map((sentence) => `<li>${escapeHtml(sentence)}</li>`).join("")}</ul>`;
  const preloadImage = (source) => {
    if (!source || preloadedStoryImages.has(source)) return;
    preloadedStoryImages.add(source);
    const image = new Image();
    image.decoding = "async";
    image.src = source;
  };
  const preloadNextStoryImage = () => {
    if (!storyMode) return;
    preloadImage(current < 0 ? config.questions[0]?.image : config.questions[current + 1]?.image);
  };
  const attachStoryImageBehavior = () => {
    const image = stage.querySelector("[data-story-image]");
    if (!image) return;
    image.addEventListener("load", preloadNextStoryImage, { once: true });
    image.addEventListener("error", () => {
      image.hidden = true;
      image.closest(".story-scene__media")?.classList.add("story-scene__media--unavailable");
      preloadNextStoryImage();
    }, { once: true });
  };
  const renderStoryIntro = () => {
    if (!storyMode) return;
    current = -1;
    progressWrap.hidden = true;
    navigation.hidden = true;
    backButton.hidden = true;
    error.textContent = "";
    stage.hidden = false;
    stage.innerHTML = `<section class="story-intro"><figure class="story-scene__media"><img data-story-image src="${escapeHtml(config.story.startImage)}" alt="${escapeHtml(tr(config.story.startImageAlt))}" width="1600" height="900" decoding="async" fetchpriority="high"></figure><h2 class="story-intro__title">${escapeHtml(tr(config.story.startTitle))}</h2><div class="story-intro__copy">${config.story.intro.map((paragraph) => `<p>${escapeHtml(tr(paragraph))}</p>`).join("")}</div><button class="button" type="button" data-story-start>${escapeHtml(tr(config.story.startButton))}</button></section>`;
    attachStoryImageBehavior();
    stage.querySelector("[data-story-start]").addEventListener("click", () => {
      current = 0;
      progressWrap.hidden = false;
      navigation.hidden = false;
      renderQuestion(true);
    });
  };
  const renderStoryFeedback = () => {
    if (!storyMode) return;
    const feedback = stage.querySelector("[data-story-feedback]");
    const choice = config.questions[current]?.choices[answers[current]];
    if (!feedback || !choice) {
      feedback?.replaceChildren();
      return;
    }
    feedback.innerHTML = `<section class="story-feedback" role="status" aria-live="polite"><h3>${escapeHtml(tr(config.story.selectedAnswerLabel))}</h3><p class="story-feedback__answer">${escapeHtml(tr(choice.text))}</p><p class="story-feedback__reaction">${escapeHtml(tr(choice.reaction))}</p></section>`;
  };
  const updateStoryNavigation = () => {
    if (!storyMode || !storyContinueButton) return;
    backButton.textContent = tr(config.story.previousButton);
    backButton.hidden = current === 0;
    storyContinueButton.textContent = tr(config.story.continueButton);
    storyContinueButton.disabled = answers[current] === null;
  };
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

    if (storyMode) {
      stage.innerHTML = `<section class="story-scene"><figure class="story-scene__media"><img data-story-image src="${escapeHtml(question.image)}" alt="${escapeHtml(tr(question.imageAlt))}" width="1600" height="900" loading="eager" decoding="async"></figure><h2 class="story-scene__title" tabindex="-1">${escapeHtml(tr(question.title))}</h2><p class="story-scene__situation">${escapeHtml(tr(question.situation))}</p><fieldset class="archetype-question"><legend class="archetype-question__prompt">${escapeHtml(tr(question.prompt))}</legend><div class="archetype-question__choices">${question.choices.map((choice, index) => `<button class="choice-button${answers[current] === index ? " is-selected" : ""}" type="button" data-choice="${index}" aria-pressed="${answers[current] === index}"><span class="choice-button__number">0${index + 1}</span><span>${escapeHtml(tr(choice.text))}</span></button>`).join("")}</div></fieldset><div data-story-feedback></div></section>`;
      attachStoryImageBehavior();
      navigation.hidden = false;
      storyContinueButton = navigation.querySelector("[data-story-continue]");
      if (!storyContinueButton) {
        storyContinueButton = document.createElement("button");
        storyContinueButton.className = "button";
        storyContinueButton.type = "button";
        storyContinueButton.dataset.storyContinue = "";
        navigation.append(storyContinueButton);
      }
      if (storyContinueButton.dataset.storyBound !== "true") {
        storyContinueButton.addEventListener("click", () => move(1));
        storyContinueButton.dataset.storyBound = "true";
      }
      renderStoryFeedback();
      updateStoryNavigation();
    } else {
      stage.innerHTML = `<fieldset class="archetype-question"><legend class="archetype-question__prompt" tabindex="-1">${current + 1}. ${escapeHtml(tr(question.prompt))}</legend><div class="archetype-question__choices">${question.choices.map((choice, index) => `<button class="choice-button${answers[current] === index ? " is-selected" : ""}" type="button" data-choice="${index}" aria-pressed="${answers[current] === index}"><span class="choice-button__number">0${index + 1}</span><span>${escapeHtml(tr(choice.text))}</span></button>`).join("")}</div></fieldset>`;
    }
    if (animate) {
      stage.classList.remove("archetype-stage--leaving");
      stage.classList.add("archetype-stage--entering");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => stage.classList.remove("archetype-stage--entering")));
    }
    if (focusPrompt) (storyMode ? stage.querySelector(".story-scene__title") : stage.querySelector("legend")).focus({ preventScroll: true });

    stage.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        answers[current] = Number(button.dataset.choice);
        stage.querySelectorAll("[data-choice]").forEach((option) => {
          const selected = option === button;
          option.classList.toggle("is-selected", selected);
          option.setAttribute("aria-pressed", String(selected));
        });
        error.textContent = "";
        if (storyMode) {
          renderStoryFeedback();
          updateStoryNavigation();
        } else {
          move(1);
        }
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
    const locationId = storyMode ? config.questions[0].choices[answers[0]].locationId : null;
    const locationName = storyMode ? tr(config.story.locations[locationId]) : "";
    const displayName = storyMode
      ? tr(config.story.resultNameTemplate, { location: locationName, shop: tr(profile.name) })
      : tr(profile.name);
    const imagePath = profile.image || profile.imageFile;
    const resultImageAlt = storyMode
      ? `${displayName} ${tr("shopStory.resultImageAlt")}`
      : `${tr(profile.name)} ${tr("content.result.imageAlt")}`;
    const imageCredit = config.imageCredits?.[winner];
    const compatNames = (ids) => ids.map((id) => tr(config.profiles[id].name)).join(" · ");
    const extraContent = profile.details?.length
      ? `<div class="result-detail-grid archetype-result-card__details">${profile.details.map((item) => `<article class="result-detail-card"><h3 class="result-detail-card__label">${item.icon ? `<img class="result-detail-icon" src="../image/result-icons/${escapeHtml(item.icon)}.png" alt="" aria-hidden="true">` : ""}${escapeHtml(tr(item.title).replace(/\s*[\p{Extended_Pictographic}\uFE0F\u200D]+/gu, "").trim())}</h3><p class="result-detail-card__text">${renderResultSentences(tr(item.text))}</p></article>`).join("")}</div>`
      : `<div class="result-detail-grid archetype-result-card__details"><article class="result-detail-card"><h3 class="result-detail-card__label">${escapeHtml(tr("찰떡 궁합"))}</h3><p class="result-detail-card__text result-detail-card__text--featured"><strong>${escapeHtml(compatNames(profile.good))}</strong></p></article><article class="result-detail-card"><h3 class="result-detail-card__label">${escapeHtml(tr("서로 알아가면 좋은 유형"))}</h3><p class="result-detail-card__text result-detail-card__text--featured"><strong>${escapeHtml(compatNames(profile.tricky))}</strong></p></article></div>`;

    root.querySelector("[data-quiz-navigation]").hidden = true;
    root.querySelector("[data-quiz-progress-wrap]").hidden = true;
    stage.hidden = true;
    result.style.setProperty("--result-accent", profile.color);
    result.innerHTML = `<article class="archetype-result-card"><div class="archetype-result-card__top"><span class="archetype-result-card__brand">molgga PLAY · ${escapeHtml(tr(config.title))}</span>${imagePath ? `<img class="archetype-result-card__image" src="${escapeHtml(imagePath)}" alt="${escapeHtml(resultImageAlt)}" loading="lazy" onload="this.nextElementSibling.hidden=true" onerror="this.hidden=true"> <span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>${imageCredit ? `<p class="image-credit">${escapeHtml(tr("이미지 출처:"))} <a href="${escapeHtml(imageCredit.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.artist)}</a> · <a href="${escapeHtml(imageCredit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.license)}</a></p>` : ""}` : `<span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>`}<p class="archetype-result-card__label">${escapeHtml(tr(resultLabel))}</p><h3 tabindex="-1">${escapeHtml(displayName)}</h3><p class="archetype-result-card__catchphrase">${escapeHtml(tr(profile.catchphrase))}</p></div><div class="archetype-result-card__body">${renderResultBullets(tr(profile.description))}${extraContent}</div></article><div class="result-actions"><button class="button button-small" type="button" data-quiz-restart>${escapeHtml(tr("다시 해보기"))}</button><button class="button button-small button-quiet" type="button" data-quiz-share>${escapeHtml(tr("결과 공유"))}</button></div><p class="share-status" role="status" aria-live="polite" data-quiz-share-status></p>`;
    result.hidden = false;
    window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, root.dataset.archetypeTest);
    if (focusResult) result.querySelector("h3").focus({ preventScroll: true });
    result.querySelector("[data-quiz-restart]").addEventListener("click", () => {
      answers.fill(null);
      result.hidden = true;
      stage.hidden = false;
      if (storyMode) {
        renderStoryIntro();
      } else {
        current = 0;
        root.querySelector("[data-quiz-navigation]").hidden = false;
        root.querySelector("[data-quiz-progress-wrap]").hidden = false;
        renderQuestion(true);
      }
    });
    result.querySelector("[data-quiz-share]").addEventListener("click", () => {
      const status = result.querySelector("[data-quiz-share-status]");
      const url = localizedQuizUrl(config.url);
      const shareQuestion = tr(config.sharePrompt || config.title);
      const resultName = displayName;
      const resultDescription = `${tr(profile.catchphrase)} ${tr(profile.shareDescription)}`;
      const resultLine = `${shareQuestion} [${resultName}]`;
      const shareText = `${resultLine}\n${resultDescription}\n---------------------------------------------------\n${tr("나도 테스트 해보고 싶다면?")}\n${url}`;
      status.textContent = "";
      window.MOLGGA_SHARE?.open({ title: resultLine, description: resultDescription, imageUrl: imagePath, buttonTitle: tr("나도 테스트하기"), text: shareText, url });
    });
  };

  const move = (direction) => {
    if (moving) return;
    if (storyMode && direction > 0 && answers[current] === null) return;
    if (direction < 0 && current <= 0) return;
    moving = true;
    stage.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    navigation.querySelectorAll("button").forEach((button) => { button.disabled = true; });
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
  const initialRender = () => storyMode ? renderStoryIntro() : renderQuestion();
  if (translationsReady && typeof translationsReady.then === "function") translationsReady.then(initialRender);
  else initialRender();
  window.i18next?.on("languageChanged", () => {
    if (result.hidden) {
      if (storyMode && current < 0) renderStoryIntro();
      else renderQuestion(false, false);
    }
    else showResult(false);
  });
})();
