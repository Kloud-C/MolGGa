(() => {
  const tr = (text) => window.MOA_I18N?.t(text) || text;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const renderResultSentences = (text) => {
    const normalized = String(text).replace(/\s+/gu, " ").trim();
    const sentences = normalized.match(/[^.!?。！？]+(?:[.!?。！？]+|$)/gu)?.map((sentence) => sentence.trim()).filter(Boolean) || [normalized];
    return sentences.map((sentence) => `<span class="result-sentence">${escapeHtml(sentence)}</span>`).join("");
  };
  const prepareQuestionValidation = (form) => {
    form.noValidate = true;
    form.addEventListener("change", (event) => {
      const field = event.target.closest(".field-question");
      if (!field || !field.querySelector('input[type="radio"]:checked')) return;
      field.classList.remove("field-question--error");
      field.removeAttribute("aria-invalid");
      field.querySelector(".question-error")?.remove();
    });
    return () => {
      let firstMissing = null;
      form.querySelectorAll(".field-question").forEach((field) => {
        const missing = !field.querySelector('input[type="radio"]:checked');
        field.classList.toggle("field-question--error", missing);
        if (missing) {
          field.setAttribute("aria-invalid", "true");
          if (!field.querySelector(".question-error")) {
            const message = document.createElement("p");
            message.className = "question-error";
            message.setAttribute("role", "alert");
            message.textContent = "이 항목을 체크하지 않았습니다.";
            field.append(message);
          }
          firstMissing ||= field;
        } else {
          field.removeAttribute("aria-invalid");
          field.querySelector(".question-error")?.remove();
        }
      });
      if (!firstMissing) return true;
      firstMissing.querySelector('input[type="radio"]').focus({ preventScroll: true });
      firstMissing.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    };
  };

  const formatShareText = (resultLine, url) => `${resultLine}\n---------------------------------------------------\n${tr("나도 테스트 해보고 싶다면?")}\n${url}`;
  const publicPageUrl = (page) => `https://molgga.com/${window.MOA_I18N?.language || "ko"}/${page}`;

  // Shared one-question-at-a-time flow for the classic radio-button quizzes.
  const setupSteppedForm = (form) => {
    const questions = [...form.querySelectorAll(".field-question")];
    const submit = form.querySelector('button[type="submit"]');
    if (!questions.length || !submit) return { reset() {} };
    let current = 0;
    const progressWrap = document.createElement("div");
    progressWrap.className = "archetype-progress";
    progressWrap.innerHTML = `<div class="progress-row"><span>${tr("나의 선택")}</span><span data-flow-count></span></div><progress data-flow-progress aria-label="${tr("테스트 진행 상황")}"></progress>`;
    const stage = document.createElement("div");
    stage.className = "archetype-stage";
    stage.setAttribute("aria-live", "polite");
    const navigation = document.createElement("div");
    navigation.className = "archetype-navigation";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "button button-quiet";
    back.textContent = tr("← 이전");
    const firstQuestion = questions[0];
    firstQuestion.before(progressWrap, stage);
    questions.forEach((question) => stage.append(question));
    const error = form.querySelector(".form-message");
    if (error) error.before(navigation);
    navigation.append(back, submit);
    submit.hidden = true;
    questions.forEach((question, index) => {
      question.classList.add("quiz-step-question");
      question.querySelectorAll(".radio-line").forEach((choice) => choice.classList.add("quiz-step-choice"));
      question.hidden = index !== 0;
    });

    const render = (animate = false) => {
      const question = questions[current];
      question.hidden = false;
      questions.forEach((item, index) => { if (index !== current) item.hidden = true; });
      const progress = progressWrap.querySelector("[data-flow-progress]");
      progress.max = questions.length;
      progress.value = current + 1;
      progressWrap.querySelector("[data-flow-count]").textContent = `${current + 1} / ${questions.length}`;
      back.disabled = current === 0;
      back.hidden = current === 0;
      if (animate) {
        stage.classList.remove("archetype-stage--leaving");
        stage.classList.add("archetype-stage--entering");
        requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove("archetype-stage--entering")));
      }
    };
    let moving = false;
    const move = (direction) => {
      if (moving) return;
      if (direction < 0 && current === 0) return;
      moving = true;
      stage.classList.add("archetype-stage--leaving");
      window.setTimeout(() => {
        if (direction > 0 && current === questions.length - 1) {
          moving = false;
          form.requestSubmit();
          return;
        }
        current += direction;
        render(true);
        moving = false;
        stage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 160);
    };
    form.addEventListener("change", (event) => {
      const question = event.target.closest(".field-question");
      if (!question) return;
      question.classList.remove("field-question--error");
      question.removeAttribute("aria-invalid");
      question.querySelector(".question-error")?.remove();
      if (question !== questions[current] || !question.querySelector('input[type="radio"]:checked')) return;
      move(1);
    });
    back.addEventListener("click", () => move(-1));
    render();
    return {
      reset() {
        current = 0;
        questions.forEach((question) => {
          question.classList.remove("field-question--error");
          question.removeAttribute("aria-invalid");
          question.querySelector(".question-error")?.remove();
        });
        render();
      }
    };
  };

  const animalForm = document.querySelector("#animal-quiz");
  if (animalForm) {
    const validateQuestions = prepareQuestionValidation(animalForm);
    const questionFlow = setupSteppedForm(animalForm);
    const profiles = {
      dog: { name: "강아지형", image: "../image/tests/animal-test/dog.jpg", text: "정이 많고 함께하는 시간을 소중히 여기는 다정한 분위기예요.", love: "좋아하는 사람에게 자주 마음을 표현하고 함께하는 추억을 쌓아요.", work: "팀의 분위기를 부드럽게 만들고 서로 협력하도록 돕는 편이에요." },
      cat: { name: "고양이형", image: "../image/tests/animal-test/cat.jpg", text: "자기만의 리듬과 취향이 분명한 차분한 분위기예요.", love: "서두르기보다 편안함과 신뢰가 쌓일 때 마음을 열어요.", work: "혼자 집중할 시간이 주어지면 꼼꼼하게 결과물을 완성해요." },
      fox: { name: "여우형", image: "../image/tests/animal-test/fox.jpg", text: "호기심이 많고 상황을 재치 있게 살피는 영리한 분위기예요.", love: "센스 있는 대화와 새로운 경험을 함께하는 관계를 좋아해요.", work: "복잡한 일에서 다른 방법을 찾아내고 아이디어를 보태요." },
      otter: { name: "수달형", image: "../image/tests/animal-test/otter.jpg", text: "새로운 재미를 발견하고 주변에 활기를 전하는 분위기예요.", love: "함께 웃고 다양한 데이트를 즐기는 관계에서 빛나요.", work: "변화가 있는 환경에서 아이디어를 내고 빠르게 시도해요." },
      deer: { name: "사슴형", image: "../image/tests/animal-test/deer.jpg", text: "상대의 마음을 잘 살피고 섬세하게 배려하는 분위기예요.", love: "작은 마음 씀씀이와 안정적인 대화에서 애정을 느껴요.", work: "놓치기 쉬운 부분을 챙기고 주변을 세심하게 도와요." },
      bear: { name: "곰형", image: "../image/tests/animal-test/bear.jpg", text: "느긋하고 든든하며 편안함을 나누는 분위기예요.", love: "화려한 이벤트보다 함께하는 편안한 일상을 좋아해요.", work: "꾸준하고 안정적으로 맡은 일을 마무리해 신뢰를 얻어요." }
    };
    const result = document.querySelector("#animal-result");
    let lastWinner = null;
    const renderResult = (winner) => {
      const profile = profiles[winner];
      result.innerHTML = `<article class="archetype-result-card"><div class="archetype-result-card__top"><span class="archetype-result-card__brand">${escapeHtml(tr("molgga PLAY · 동물상 테스트"))}</span><img class="archetype-result-card__image" src="${escapeHtml(profile.image)}" alt="${escapeHtml(tr(profile.name))} ${escapeHtml(tr("content.result.imageAlt"))}" loading="lazy"><p class="archetype-result-card__label">${escapeHtml(tr("나의 동물 캐릭터"))}</p><h3 tabindex="-1">${escapeHtml(tr(profile.name))}</h3><p class="archetype-result-card__catchphrase">${escapeHtml(tr(profile.text))}</p></div><div class="archetype-result-card__body"><div class="info-grid"><article class="info-card"><h3><img class="result-detail-icon" src="../image/result-icons/heart.png" alt="" aria-hidden="true">${escapeHtml(tr("animal.result.datingMode"))}</h3><p>${renderResultSentences(tr(profile.love))}</p></article><article class="info-card"><h3><img class="result-detail-icon" src="../image/result-icons/puzzle.png" alt="" aria-hidden="true">${escapeHtml(tr("animal.result.atWork"))}</h3><p>${renderResultSentences(tr(profile.work))}</p></article></div></div></article><div class="result-actions"><button class="button button-small" type="button" data-retry>${escapeHtml(tr("다시 해보기"))}</button><button class="button button-small button-quiet" type="button" data-share>${escapeHtml(tr("결과 공유"))}</button></div><p class="share-status" role="status" aria-live="polite"></p>`;
      result.querySelector(".archetype-result-card__image").addEventListener("error", (event) => { event.currentTarget.hidden = true; });
      result.querySelector("[data-share]").addEventListener("click", () => {
        const url = publicPageUrl("animal-test.html");
        const sharePrompt = tr("animal.sharePrompt");
        const resultName = tr(profile.name);
        const resultLine = `${sharePrompt} [${resultName}]`;
        window.MOLGGA_SHARE?.open({ title: resultLine, description: tr(profile.text), imageUrl: profile.image, buttonTitle: tr("나도 테스트하기"), text: formatShareText(resultLine, url), url });
      });
      result.querySelector("[data-retry]").addEventListener("click", () => {
        animalForm.reset();
        animalForm.hidden = false;
        questionFlow.reset();
        result.hidden = true;
        lastWinner = null;
        document.querySelector("#animal-error").textContent = "";
        animalForm.querySelector('input[type="radio"]').focus({ preventScroll: true });
      });
    };
    window.i18next?.on("languageChanged", () => {
      if (!result.hidden && lastWinner) renderResult(lastWinner);
    });
    animalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateQuestions()) return;
      const data = new FormData(animalForm);
      const scores = Object.fromEntries(Object.keys(profiles).map((key) => [key, 0]));
      for (let i = 1; i <= 10; i += 1) {
        const answer = data.get(`q${i}`);
        if (!answer) {
          document.querySelector("#animal-error").textContent = "결과를 보려면 열 문항에 모두 답해 주세요.";
          return;
        }
        // Animal answer IDs are ordered as primary then secondary evidence.
        answer.split(",").forEach((key, index) => {
          if (Object.prototype.hasOwnProperty.call(scores, key)) scores[key] += index === 0 ? 2 : 1;
        });
      }
      const highest = Math.max(...Object.values(scores));
      const winners = Object.keys(scores).filter((key) => scores[key] === highest);
      // Keep ties reproducible: the same answer pattern should always return the same playful result.
      const answerIndexes = Array.from({ length: 10 }, (_, index) => {
        const selected = animalForm.querySelector(`input[name="q${index + 1}"]:checked`);
        return [...animalForm.querySelectorAll(`input[name="q${index + 1}"]`)].indexOf(selected);
      });
      const tiePattern = `animal-test:${answerIndexes.join(",")}`;
      let tieHash = 0x811c9dc5;
      for (let index = 0; index < tiePattern.length; index += 1) {
        tieHash ^= tiePattern.charCodeAt(index);
        tieHash = Math.imul(tieHash, 0x01000193);
      }
      const winnerIndex = (tieHash >>> 0) % winners.length;
      const winner = winners[winnerIndex];
      lastWinner = winner;
      renderResult(winner);
      result.hidden = false;
      const contentId = window.MOLGGA_CONTENT_REGISTRY?.contents.find((content) => content.source?.formId === animalForm.id)?.id;
      window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, contentId);
      animalForm.hidden = true;
      document.querySelector("#animal-error").textContent = "";
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  const mbtiForm = document.querySelector("#mbti-quiz");
  if (mbtiForm) {
    const validateQuestions = prepareQuestionValidation(mbtiForm);
    const questionFlow = setupSteppedForm(mbtiForm);
    const axes = [
      { names: ["ei1", "ei2", "ei3", "ei4", "ei5"], a: "E", b: "I", title: "에너지를 얻고 표현하는 방식" },
      { names: ["sn1", "sn2", "sn3", "sn4", "sn5"], a: "S", b: "N", title: "정보를 살피는 방식" },
      { names: ["tf1", "tf2", "tf3", "tf4", "tf5"], a: "T", b: "F", title: "결정을 검토하는 방식" },
      { names: ["jp1", "jp2", "jp3", "jp4", "jp5"], a: "J", b: "P", title: "일정을 다루는 방식" }
    ];
    const typeProfiles = {
      ISTJ: { title: "믿음직한 체크리스트 장인", image: "../image/MBTI image/MBTI：ISTJ.jpg", intro: "말보다 결과로 보여주는 타입. 한 번 맡은 일은 조용히, 그리고 확실하게 끝내요.", daily: "약속 시간보다 조금 일찍 도착하고, 여행 전날 준비물 목록까지 만들어 두는 편이에요.", love: "작은 약속을 기억하고 꾸준히 챙겨요. 거창한 말보다 ‘집 도착하면 연락해’ 같은 행동에 마음이 담겨 있어요.", work: "역할과 기준이 분명할 때 실력이 빛나요. 마지막 숫자 하나까지 다시 확인하는 든든한 마무리 담당이에요." },
      ISFJ: { title: "다정한 생활 매니저", image: "../image/MBTI image/MBTI：ISFJ.jpg", intro: "조용히 주변을 살피다가 필요한 순간 딱 맞는 도움을 건네는 따뜻한 사람이에요.", daily: "친구가 무심코 말한 취향을 기억해 뒀다가 다음에 슬쩍 챙겨줘요. 본인 몫은 마지막에 고르는 경우도 많아요.", love: "상대의 컨디션과 사소한 변화를 잘 알아차려요. ‘오늘 어땠어?’라는 질문에 진심이 꽉 들어 있어요.", work: "빈틈을 메우고 모두가 편하게 일하도록 챙겨요. 티 나지 않는 수고까지 알아봐 주면 힘이 솟아요." },
      INFJ: { title: "조용한 마음 통역사", image: "../image/MBTI image/MBTI：INFJ.jpg", intro: "말의 표면보다 그 안의 마음과 의미를 읽으려는 깊은 생각의 소유자예요.", daily: "좋은 대화 하나를 오래 곱씹고, 사람과 세상을 이해하는 이야기에 빠져들어요.", love: "가벼운 연락보다 진심이 오가는 대화를 원해요. 마음을 열기까지는 천천히지만, 열고 나면 깊게 연결돼요.", work: "일의 목적과 사람에게 미칠 영향을 함께 봐요. 복잡한 상황에서 큰 그림과 다음 방향을 정리하는 데 강해요." },
      INTJ: { title: "미래를 먼저 그리는 설계자", image: "../image/MBTI image/MBTI：INTJ.jpg", intro: "‘더 나은 방법은 없을까?’를 자주 떠올리고 아이디어를 현실적인 계획으로 바꾸는 사람이에요.", daily: "관심 있는 주제는 혼자 깊게 파고들어요. 즉흥 일정도 좋지만, 머릿속에는 이미 효율적인 동선이 그려져 있을 수 있어요.", love: "서로의 독립성과 목표를 존중하는 관계가 잘 맞아요. 마음을 표현하는 방식은 담백해도 진지함은 오래가요.", work: "문제의 구조를 빠르게 잡고 장기 계획을 세워요. 불필요한 절차를 발견하면 개선 아이디어가 바로 떠오릅니다." },
      ISTP: { title: "침착한 해결사", image: "../image/MBTI image/MBTI：ISTP.jpg", intro: "복잡한 설명보다 직접 살펴보고 작동 원리를 알아내는 데 재미를 느끼는 실전형이에요.", daily: "기계가 고장 나면 일단 열어보고, 새로운 취미도 설명서보다 직접 해보며 감을 잡아요.", love: "과한 간섭 없이 각자의 시간을 존중하는 편안한 관계를 좋아해요. 말보다 같이 해주는 행동으로 마음을 보여줘요.", work: "예상치 못한 문제가 생겨도 당황하기보다 해결 방법부터 찾아요. 자율성과 실전 감각을 발휘할 때 빛나요." },
      ISFP: { title: "취향이 선명한 감성 탐험가", image: "../image/MBTI image/MBTI：ISFP.jpg", intro: "지금 이 순간의 분위기와 자기만의 감각을 소중히 여기는 부드러운 자유인이에요.", daily: "마음에 드는 음악·공간·옷을 발견하면 오래 아껴요. 계획표보다 그날의 기분이 좋은 선택을 알려줄 때가 있어요.", love: "함께 있는 순간을 다정하게 채워요. 서로의 취향과 속도를 존중해 주는 사람에게 편안함을 느껴요.", work: "사람과 결과물에 감각을 더해요. 지나친 통제보다 믿고 맡겨줄 때 자기만의 방식으로 완성도를 높여요." },
      INFP: { title: "마음속 세계가 넓은 이야기꾼", image: "../image/MBTI image/MBTI：INFP.jpg", intro: "나만의 가치와 상상력을 지키면서 세상을 조금 더 따뜻하게 바라보는 이상주의자예요.", daily: "노래 한 소절이나 영화 장면에 오래 마음이 머물러요. 머릿속에는 아직 쓰지 않은 이야기와 해보고 싶은 일이 가득해요.", love: "있는 모습 그대로 이해받는 걸 소중히 여겨요. 작은 진심에 크게 감동하고, 마음을 나누는 대화를 좋아해요.", work: "의미 있는 목표를 만나면 몰입력이 커져요. 사람과 아이디어의 가능성을 발견하고 새로운 길을 상상하는 데 강해요." },
      INTP: { title: "호기심으로 굴러가는 아이디어 연구소", image: "../image/MBTI image/MBTI：INTP.jpg", intro: "‘왜?’와 ‘만약에?’가 끊이지 않는 탐구자. 궁금한 주제는 끝까지 파고들어요.", daily: "검색하다가 처음 궁금했던 것보다 세 단계 더 깊은 주제에 도착해 있곤 해요.", love: "생각과 관심사를 자유롭게 주고받는 관계에서 매력을 느껴요. 혼자 충전할 시간도 사랑의 일부예요.", work: "복잡한 개념을 분석하고 독창적인 해결책을 찾아요. 회의의 엉뚱한 질문 하나가 의외의 돌파구가 되기도 해요." },
      ESTP: { title: "일단 해보는 현장 플레이어", image: "../image/MBTI image/MBTI：ESTP.png", intro: "상황을 빠르게 읽고 망설이기보다 직접 움직이며 답을 찾는 에너지 넘치는 사람이에요.", daily: "‘언젠가 해보자’보다 ‘이번 주에 가볼까?’가 익숙해요. 즉흥적인 계획에서 좋은 이야기가 시작되곤 해요.", love: "함께 웃고 움직이는 데이트를 즐겨요. 솔직하고 생생한 표현이 매력 포인트예요.", work: "현장에서 필요한 걸 바로 파악하고 빠르게 대응해요. 변화가 많은 환경에서 존재감이 커져요." },
      ESFP: { title: "분위기를 밝히는 순간 수집가", image: "../image/MBTI image/MBTI：ESFP.png", intro: "사람과 즐거움이 있는 곳에서 반짝이는, 지금을 신나게 살아내는 타입이에요.", daily: "좋은 일이 있으면 같이 나눌 사람부터 떠올려요. 맛있는 것과 재미있는 경험은 혼자보다 함께일 때 더 좋아요.", love: "좋아하는 마음을 숨기기보다 다정하게 표현해요. 함께 웃었던 순간을 둘만의 추억으로 잘 간직합니다.", work: "사람들과 호흡을 맞추고 지루한 분위기에 활기를 더해요. 직접 해보고 반응을 나눌 때 실력이 나와요." },
      ENFP: { title: "가능성을 줍는 아이디어 메이커", image: "../image/MBTI image/MBTI：ENFP.png", intro: "사람과 아이디어 사이의 연결을 발견하면 눈이 반짝이는 호기심 많은 낙관주의자예요.", daily: "새로운 관심사가 생기면 관련 영상과 장소를 한꺼번에 찾아봐요. 친구에게 ‘우리 이거 해보자!’고 먼저 제안하기도 해요.", love: "서로의 꿈을 응원하고 진심을 자주 표현하는 관계를 좋아해요. 함께 새로운 경험을 만드는 데 설렙니다.", work: "브레인스토밍과 협업에서 에너지를 얻어요. 흩어진 아이디어를 이어 가능성 있는 출발점으로 만드는 재주가 있어요." },
      ENTP: { title: "토론을 놀이처럼 즐기는 발명가", image: "../image/MBTI image/MBTI：ENTP.png", intro: "익숙한 답에도 물음표를 붙이고, 생각의 빈틈에서 새로운 가능성을 발견해요.", daily: "재미있는 논쟁은 이기기 위해서라기보다 생각을 넓히는 놀이터예요. 같은 길보다 새로운 루트를 궁리해요.", love: "재치 있는 대화와 서로 자극을 주는 관계에 끌려요. 장난스러운 티키타카 속에 관심을 표현합니다.", work: "막힌 문제를 다른 각도에서 보고 대안을 쏟아내요. 반복 업무보다 변화와 실험이 있는 과제에서 신나요." },
      ESTJ: { title: "일을 앞으로 보내는 추진 대장", image: "../image/MBTI image/MBTI：ESTJ.jpg", intro: "해야 할 일을 파악하면 우선순위를 정하고 실제 결과가 나올 때까지 밀고 가는 실행가예요.", daily: "모임에서 장소와 시간을 정리해 주는 역할을 맡기 쉬워요. 계획이 정해지면 마음도 한결 가벼워집니다.", love: "믿음과 약속을 중요하게 여기고 필요한 일을 챙겨줘요. 함께 목표를 세우고 응원하는 관계를 좋아해요.", work: "역할과 마감을 분명하게 정리해 팀을 움직여요. 책임감 있게 결과를 만드는 리더십이 돋보여요." },
      ESFJ: { title: "사람을 이어주는 다정한 호스트", image: "../image/MBTI image/MBTI：ESFJ.jpg", intro: "누가 어색해하는지, 누가 도움이 필요한지 빠르게 알아차리는 따뜻한 연결자예요.", daily: "모임이 끝난 뒤 모두 잘 들어갔는지 챙기고, 다음 약속을 자연스럽게 잡는 사람일 수 있어요.", love: "마음을 표현하고 서로 챙기는 일상에서 행복을 느껴요. 작은 기념일도 함께 나누면 더 특별해져요.", work: "사람들이 필요한 정보를 놓치지 않도록 연결하고 팀의 분위기를 살펴요. 협업을 매끄럽게 만드는 힘이 있어요." },
      ENFJ: { title: "응원으로 성장을 여는 코치", image: "../image/MBTI image/MBTI：ENFJ.jpg", intro: "사람의 장점을 발견하고 ‘너라면 할 수 있어’라는 말을 행동으로 전하는 격려자예요.", daily: "친구의 목표를 기억해 두었다가 먼저 진행 상황을 물어봐요. 주변의 기쁨을 자기 일처럼 반깁니다.", love: "마음을 솔직하고 따뜻하게 나누며 함께 성장하는 관계를 바라요. 상대가 빛나는 순간을 진심으로 응원해요.", work: "사람들의 의견을 모으고 같은 방향을 바라보게 해요. 팀원 각자의 가능성을 살리는 데 강점이 있어요." },
      ENTJ: { title: "큰 그림을 현실로 만드는 지휘자", image: "../image/MBTI image/MBTI：ENTJ.jpg", intro: "목표가 보이면 전략을 세우고 사람과 자원을 모아 실제 변화로 이어가려는 추진가예요.", daily: "여행도 ‘어디 갈까?’에서 끝나지 않고 일정·이동·예약까지 한 번에 정리할 수 있어요.", love: "서로의 능력과 야심을 존중하는 파트너십을 좋아해요. 함께 미래를 그릴 때 애정이 더 단단해져요.", work: "복잡한 과제를 구조화하고 결정을 미루지 않아요. 더 효율적인 방식을 설계하고 실행을 이끌어요." }
    };
    const result = document.querySelector("#mbti-result");
    let lastSummary = null;
    const renderResult = (summary) => {
      const profile = typeProfiles[summary];
      const iconless = (text) => tr(text).replace(/\s*[\p{Extended_Pictographic}\uFE0F\u200D]+/gu, "").trim();
      result.innerHTML = `<article class="archetype-result-card"><div class="archetype-result-card__top"><span class="archetype-result-card__brand">${escapeHtml(tr("content.mbti.resultBrand"))}</span><img class="archetype-result-card__image" src="${escapeHtml(profile.image)}" alt="MBTI ${summary} ${escapeHtml(tr("content.result.imageAlt"))}" loading="lazy"><p class="archetype-result-card__label">${escapeHtml(tr("당신의 MBTI"))}</p><h3 tabindex="-1">${summary} · ${escapeHtml(tr(profile.title))}</h3><p class="archetype-result-card__catchphrase">${escapeHtml(tr(profile.intro))}</p></div><div class="archetype-result-card__body"><div class="info-grid"><article class="info-card"><h3><img class="result-detail-icon" src="../image/result-icons/sun.png" alt="" aria-hidden="true">${escapeHtml(iconless("평소의 당신 ☀️"))}</h3><p>${renderResultSentences(tr(profile.daily))}</p></article><article class="info-card"><h3><img class="result-detail-icon" src="../image/result-icons/heart.png" alt="" aria-hidden="true">${escapeHtml(iconless("연애 모드 💌"))}</h3><p>${renderResultSentences(tr(profile.love))}</p></article><article class="info-card"><h3><img class="result-detail-icon" src="../image/result-icons/puzzle.png" alt="" aria-hidden="true">${escapeHtml(iconless("일할 때 🧩"))}</h3><p>${renderResultSentences(tr(profile.work))}</p></article></div></div></article><div class="result-actions"><button class="button button-small" type="button" data-retry>${escapeHtml(tr("다시 해보기"))}</button><button class="button button-small button-quiet" type="button" data-share>${escapeHtml(tr("결과 공유"))}</button></div><p class="share-status" role="status" aria-live="polite"></p>`;
      result.querySelector(".archetype-result-card__image").addEventListener("error", (event) => { event.currentTarget.hidden = true; });
      result.querySelector("[data-share]").addEventListener("click", () => {
        const url = publicPageUrl("mbti.html");
        const sharePrompt = tr("mbti.sharePrompt");
        const resultName = `${summary} · ${tr(profile.title)}`;
        const resultLine = `${sharePrompt} [${resultName}]`;
        window.MOLGGA_SHARE?.open({ title: resultLine, description: tr(profile.intro), imageUrl: profile.image, buttonTitle: tr("나도 테스트하기"), text: formatShareText(resultLine, url), url });
      });
      result.querySelector("[data-retry]").addEventListener("click", () => {
        mbtiForm.reset();
        mbtiForm.hidden = false;
        questionFlow.reset();
        result.hidden = true;
        lastSummary = null;
        document.querySelector("#mbti-error").textContent = "";
        mbtiForm.querySelector('input[type="radio"]').focus({ preventScroll: true });
      });
    };
    window.i18next?.on("languageChanged", () => {
      if (!result.hidden && lastSummary) renderResult(lastSummary);
    });
    mbtiForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateQuestions()) return;
      const data = new FormData(mbtiForm);
      for (const axis of axes) {
        const answers = axis.names.map((name) => data.get(name));
        if (answers.some((answer) => !answer)) {
          document.querySelector("#mbti-error").textContent = "결과를 보려면 스무 문항에 모두 답해 주세요.";
          return;
        }
      }
      const summary = axes.map((axis) => {
        const aCount = axis.names.filter((name) => data.get(name) === axis.a).length;
        return aCount >= 3 ? axis.a : axis.b;
      }).join("");
      lastSummary = summary;
      renderResult(summary);
      result.hidden = false;
      const contentId = window.MOLGGA_CONTENT_REGISTRY?.contents.find((content) => content.source?.formId === mbtiForm.id)?.id;
      window.MOLGGA_CONTENT_RECOMMENDATIONS?.mount(result, contentId);
      mbtiForm.hidden = true;
      document.querySelector("#mbti-error").textContent = "";
      result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
