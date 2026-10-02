(() => {
  const categories = [
    { id: "taste", labelKey: "category.taste" },
    { id: "personality", labelKey: "category.personality" },
    { id: "relationships", labelKey: "category.relationships" },
    { id: "fantasy", labelKey: "category.fantasy" }
  ];

  const contents = [
    {
      id: "weekend",
      createdAt: "2026-09-25",
      cardLabelKey: "content.weekend.cardLabel",
      type: "worldcup",
      formatId: "worldcup",
      categoryIds: ["taste"],
      tagIds: ["weekend", "leisure", "preference"],
      titleKey: "이상형 월드컵: 내가 원하는 주말",
      descriptionKey: "다양한 주말 활동을 비교해 가장 끌리는 활동을 골라보세요.",
      page: "worldcup.html",
      thumbnail: "/image/home-categories/weekend.jpg",
      source: { kind: "worldcup", id: "weekend" },
      metrics: { candidateCount: 50, choiceCount: 2, availableBrackets: [16, 32], estimatedMinutesByBracket: { 16: 3, 32: 5 } }
    },
    {
      id: "late-night-food",
      createdAt: "2026-09-26",
      cardLabelKey: "content.late-night-food.cardLabel",
      type: "worldcup",
      formatId: "worldcup",
      categoryIds: ["taste"],
      tagIds: ["late-night", "food", "preference"],
      titleKey: "이상형 월드컵: 오늘 땡기는 야식은?",
      descriptionKey: "다양한 야식 메뉴에서 가장 끌리는 음식을 골라보세요.",
      page: "late-night-worldcup.html",
      thumbnail: "/image/home-categories/late-night-food.jpg",
      source: { kind: "worldcup", id: "late-night-food" },
      metrics: { candidateCount: 50, choiceCount: 2, availableBrackets: [16, 32], estimatedMinutesByBracket: { 16: 3, 32: 5 } }
    },
    {
      id: "animal-test",
      createdAt: "2026-09-25",
      cardLabelKey: "content.animal-test.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["personality"],
      tagIds: ["personality", "animal", "fun"],
      titleKey: "동물상 테스트",
      descriptionKey: "질문에 답하고 나와 어울리는 동물 캐릭터를 찾아보세요.",
      page: "animal-test.html",
      thumbnail: "/image/home-categories/animal-test.jpg",
      source: { kind: "legacy-form", formId: "animal-quiz" },
      metrics: { questionCount: 10, choicesPerQuestion: 4, resultCount: 6, estimatedMinutes: 2 }
    },
    {
      id: "mbti",
      createdAt: "2026-09-25",
      cardLabelKey: "content.mbti.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["personality"],
      tagIds: ["personality", "mbti", "self-reflection"],
      titleKey: "MBTI 콘텐츠",
      descriptionKey: "질문에 답해 나의 MBTI를 알아보세요. (공식 MBTI 검사는 아닙니다.)",
      page: "mbti.html",
      thumbnail: "/image/home-categories/mbti.jpg",
      source: { kind: "legacy-form", formId: "mbti-quiz" },
      metrics: { questionCount: 20, choicesPerQuestion: 2, resultCount: 16, estimatedMinutes: 4 }
    },
    {
      id: "teto-egen",
      createdAt: "2026-09-26",
      cardLabelKey: "content.teto-egen.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["relationships"],
      tagIds: ["personality", "relationships", "communication"],
      titleKey: "테토/에겐 테스트",
      descriptionKey: "질문에 답하고 나의 테토/에겐 스타일을 알아보세요.",
      page: "teto-egen-test.html",
      thumbnail: "/image/home-categories/teto-egen.jpg",
      source: { kind: "archetype", id: "teto-egen" },
      metrics: { questionCount: 12, choicesPerQuestion: 2, resultCount: 8, estimatedMinutes: 3 }
    },
    {
      id: "attachment-style",
      createdAt: "2026-09-26",
      cardLabelKey: "content.attachment-style.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["relationships"],
      tagIds: ["relationships", "dating", "communication"],
      titleKey: "애착 유형 테스트",
      descriptionKey: "연애나 인간관계에서 나는 어떤 유형인지 알아보세요.",
      page: "attachment-test.html",
      thumbnail: "/image/home-categories/attachment.jpg",
      source: { kind: "archetype", id: "attachment-style" },
      metrics: { questionCount: 16, choicesPerQuestion: 2, resultCount: 4, estimatedMinutes: 4 }
    },
    {
      id: "past-life",
      createdAt: "2026-09-26",
      cardLabelKey: "content.past-life.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["fantasy"],
      tagIds: ["fantasy", "fun", "personality"],
      titleKey: "전생 테스트: 나는 전생에 뭐였을까?",
      descriptionKey: "나는 전생에 어떤 모습이었을까요?",
      page: "past-life-test.html",
      thumbnail: "/image/home-categories/past-life.jpg",
      source: { kind: "archetype", id: "past-life" },
      metrics: { questionCount: 25, choicesPerQuestion: 2, resultCount: 20, estimatedMinutes: 4 }
    },
    {
      id: "spending-habits",
      createdAt: "2026-09-26",
      cardLabelKey: "content.spending-habits.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["taste"],
      tagIds: ["lifestyle", "money", "habits"],
      titleKey: "왜 내 지갑엔 돈이 없지?",
      descriptionKey: "질문에 답하고 나의 소비 스타일을 알아보세요.",
      page: "spending-habits-test.html",
      thumbnail: "/image/home-categories/spending-habits.jpg",
      source: { kind: "archetype", id: "spending-habits" },
      metrics: { questionCount: 10, choicesPerQuestion: 4, resultCount: 4, estimatedMinutes: 3 }
    },
    {
      id: "travel-role",
      createdAt: "2026-09-29",
      cardLabelKey: "content.travel-role.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["relationships"],
      tagIds: ["travel", "friends", "group-trip", "personality"],
      titleKey: "travelRole.title",
      descriptionKey: "travelRole.description",
      page: "travel-role-test.html",
      thumbnail: "/image/tests/travel-role-test/planner.png",
      source: { kind: "archetype", id: "travel-role" },
      metrics: { questionCount: 9, choicesPerQuestion: 2, resultCount: 8, estimatedMinutes: 2 }
    },
    {
      id: "romance-style",
      createdAt: "2026-09-29",
      cardLabelKey: "content.romance-style.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["relationships"],
      tagIds: ["relationships", "dating", "communication", "self-reflection"],
      titleKey: "romanceStyle.title",
      descriptionKey: "romanceStyle.description",
      page: "romance-style-test.html",
      thumbnail: "/image/tests/romance-style/direct.jpg",
      source: { kind: "archetype", id: "romance-style" },
      metrics: { questionCount: 15, choicesPerQuestion: 3, resultCount: 12, estimatedMinutes: 4 }
    },
    {
      id: "fantasy-class",
      createdAt: "2026-09-30",
      cardLabelKey: "content.fantasy-class.cardLabel",
      type: "quiz",
      formatId: "quiz",
      categoryIds: ["fantasy"],
      tagIds: ["fantasy", "fun", "personality"],
      titleKey: "fantasyClass.title",
      descriptionKey: "fantasyClass.description",
      page: "fantasy-class-test.html",
      thumbnail: "/image/home-categories/fantasy-class.jpg",
      source: { kind: "archetype", id: "fantasy-class" },
      metrics: { questionCount: 8, choicesPerQuestion: 4, resultCount: 8, estimatedMinutes: 2 }
    },
    {
      id: "fantasy-shop",
      createdAt: "2026-10-01",
      cardLabelKey: "content.fantasy-shop.cardLabel",
      type: "quiz",
      formatId: "story",
      categoryIds: ["fantasy"],
      tagIds: ["fantasy", "fun", "lifestyle"],
      titleKey: "shopStory.title",
      descriptionKey: "shopStory.description",
      page: "fantasy-shop-test.html",
      thumbnail: "/image/tests/fantasy-shop/start.webp",
      source: { kind: "archetype", id: "fantasy-shop" },
      metrics: { questionCount: 8, choicesPerQuestion: 4, resultCount: 6, estimatedMinutes: 4 }
    },
    {
      id: "night-train",
      createdAt: "2026-10-01",
      cardLabelKey: "content.night-train.cardLabel",
      type: "quiz",
      formatId: "story",
      categoryIds: ["fantasy"],
      tagIds: ["fantasy", "fun", "lifestyle"],
      titleKey: "nightTrain.title",
      descriptionKey: "nightTrain.description",
      page: "night-train-test.html",
      thumbnail: "/image/tests/night-train/start.webp",
      source: { kind: "archetype", id: "night-train" },
      metrics: { questionCount: 8, choicesPerQuestion: 4, resultCount: 6, estimatedMinutes: 4 }
    },
    {
      id: "month-stay",
      createdAt: "2026-10-02",
      cardLabelKey: "content.month-stay.cardLabel",
      type: "worldcup",
      formatId: "worldcup",
      categoryIds: ["taste"],
      tagIds: ["travel", "leisure", "preference"],
      titleKey: "content.month-stay.title",
      descriptionKey: "content.month-stay.description",
      page: "month-stay-worldcup.html",
      thumbnail: "/image/worldcup/month-stay/jeju-stone-house.jpg",
      source: { kind: "worldcup", id: "month-stay" },
      metrics: { candidateCount: 50, choiceCount: 2, availableBrackets: [16, 32], estimatedMinutesByBracket: { 16: 3, 32: 5 } }
    }
  ];

  const deepFreeze = (value) => {
    Object.values(value).forEach((child) => {
      if (child && typeof child === "object" && !Object.isFrozen(child)) deepFreeze(child);
    });
    return Object.freeze(value);
  };

  window.MOLGGA_CONTENT_REGISTRY = deepFreeze({ schemaVersion: 1, categories, contents });
})();
