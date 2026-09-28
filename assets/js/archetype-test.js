(() => {
  const root = document.querySelector("[data-archetype-test]");
  if (!root) return;

  const config = window.MOA_ARCHETYPE_TESTS?.[root.dataset.archetypeTest];
  if (!config) return;
  const tr = (text) => window.MOA_I18N?.t(text) || text;
  const localizedQuizUrl = (url) => `https://molgga.com/${window.MOA_I18N?.language || "ko"}/${new URL(url, location.href).pathname.split("/").pop()}`;
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

  const renderQuestion = (animate = false) => {
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
    stage.querySelector("legend").focus({ preventScroll: true });

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

  const showResult = () => {
    const scores = Object.fromEntries(Object.keys(config.profiles).map((key) => [key, 0]));
    answers.forEach((answerIndex, questionIndex) => {
      config.questions[questionIndex].choices[answerIndex].scores.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(scores, key)) scores[key] += 1;
      });
    });
    const highScore = Math.max(...Object.values(scores));
    const tied = Object.keys(scores).filter((key) => scores[key] === highScore);
    // Resolve ties from the full answer pattern so the same answers always
    // produce the same result without favoring the final few questions.
    // Hash the complete answer pattern without 32-bit bitwise truncation. The
    // mixed-radix step also handles questions that offer more than two choices.
    const answerSeed = answers.reduce((seed, answer, index) => (
      seed * config.questions[index].choices.length + answer
    ) % tied.length, 0);
    const winner = tied[answerSeed];
    const profile = config.profiles[winner];
    const imagePath = profile.image || profile.imageFile;
    const imageCredit = config.imageCredits?.[winner];
    const compatNames = (ids) => ids.map((id) => tr(config.profiles[id].name)).join(" · ");
    const extraContent = profile.details?.length
      ? `<div class="info-grid archetype-result-card__details">${profile.details.map((item) => `<article class="info-card"><h3>${item.icon ? `<img class="result-detail-icon" src="../image/result-icons/${escapeHtml(item.icon)}.png" alt="" aria-hidden="true">` : ""}${escapeHtml(tr(item.title).replace(/\s*[\p{Extended_Pictographic}\uFE0F\u200D]+/gu, "").trim())}</h3><p>${escapeHtml(tr(item.text))}</p></article>`).join("")}</div>`
      : `<div class="archetype-result-card__compat"><div><span>${escapeHtml(tr("찰떡 궁합"))}</span><strong>${escapeHtml(compatNames(profile.good))}</strong></div><div><span>${escapeHtml(tr("서로 알아가면 좋은 유형"))}</span><strong>${escapeHtml(compatNames(profile.tricky))}</strong></div></div>`;

    root.querySelector("[data-quiz-navigation]").hidden = true;
    root.querySelector("[data-quiz-progress-wrap]").hidden = true;
    stage.hidden = true;
    result.style.setProperty("--result-accent", profile.color);
    result.innerHTML = `<article class="archetype-result-card"><div class="archetype-result-card__top"><span class="archetype-result-card__brand">molgga PLAY · ${escapeHtml(tr(config.title))}</span>${imagePath ? `<img class="archetype-result-card__image" src="${escapeHtml(imagePath)}" alt="${escapeHtml(tr(profile.name))} 결과 이미지" loading="lazy" onload="this.nextElementSibling.hidden=true" onerror="this.hidden=true"> <span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>${imageCredit ? `<p class="image-credit">${escapeHtml(tr("이미지 출처:"))} <a href="${escapeHtml(imageCredit.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.artist)}</a> · <a href="${escapeHtml(imageCredit.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(imageCredit.license)}</a></p>` : ""}` : `<span class="archetype-result-card__emoji" aria-hidden="true"><img src="../image/result-icons/puzzle.png" alt="" aria-hidden="true"></span>`}<p class="archetype-result-card__label">${escapeHtml(tr(resultLabel))}</p><h3 tabindex="-1">${escapeHtml(tr(profile.name))}</h3><p class="archetype-result-card__catchphrase">${escapeHtml(tr(profile.catchphrase))}</p></div><div class="archetype-result-card__body"><p>${escapeHtml(tr(profile.description))}</p>${extraContent}</div></article><div class="result-actions"><button class="button button-small" type="button" data-quiz-restart>${escapeHtml(tr("다시 해보기"))}</button><button class="button button-small button-quiet" type="button" data-quiz-share>${escapeHtml(tr("결과 공유"))}</button></div><p class="share-status" role="status" aria-live="polite" data-quiz-share-status></p>`;
    result.hidden = false;
    window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, root.dataset.archetypeTest);
    result.querySelector("h3").focus({ preventScroll: true });
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
      const shareText = `${tr(profile.name)} · ${tr(profile.catchphrase)}\n---------------------------------------------------\n${tr("나도 테스트 해보고 싶다면?")}\n${url}`;
      status.textContent = "";
      window.MOLGGA_SHARE?.open({ title: tr(profile.name), description: tr(profile.catchphrase), text: shareText, url });
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
  renderQuestion();
})();
