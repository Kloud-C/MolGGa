window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["spending-habits"] = {
  answerPositionPolicy: "balanced",
  title: "소비 습관 테스트",
  resultLabel: "나의 소비 습관 유형",
  eyebrow: "molgga PLAY · 소비 습관",
  estimatedMinutes: 3,
  url: "https://molgga.com/spending-habits-test.html",
  questions: [
    { prompt: "월급이나 용돈이 들어오면 가장 먼저 하는 일은?", choices: [
      { text: "저축할 금액부터 따로 챙겨 둔다", scores: ["frugal"] },
      { text: "기다렸던 경험이나 갖고 싶던 물건을 산다", scores: ["flex"] },
      { text: "예산을 항목별로 나눠 이번 달 계획을 세운다", scores: ["planned"] },
      { text: "눈에 들어온 것부터 기분 좋게 결제한다", scores: ["impulse"] }
    ] },
    { prompt: "필요한 물건을 살 때 나는 보통…", choices: [
      { text: "마음에 들면 오래 고민하지 않고 바로 산다", scores: ["impulse"] },
      { text: "여러 곳의 가격과 후기, 할인 혜택을 비교한다", scores: ["frugal"] },
      { text: "오래 쓸 수 있고 만족감이 큰 제품을 고른다", scores: ["flex"] },
      { text: "정해 둔 예산과 구매 목록에 있는지 확인한다", scores: ["planned"] }
    ] },
    { prompt: "이번 달 예산이 예상보다 빠듯해졌다면?", choices: [
      { text: "일단 필요한 걸 사고 다음 달에 맞춰 본다", scores: ["impulse"] },
      { text: "꼭 필요하지 않은 지출을 줄이고 다음 기회를 기다린다", scores: ["frugal"] },
      { text: "가치 있다고 느끼는 경험에는 예산을 더 쓸 수 있다", scores: ["flex"] },
      { text: "항목별 금액을 조정해 남은 기간 계획을 다시 세운다", scores: ["planned"] }
    ] },
    { prompt: "‘오늘만 특가’라는 문구를 보면 어떤가요?", choices: [
      { text: "평소 눈여겨본 좋은 제품이면 기분 좋게 장만한다", scores: ["flex"] },
      { text: "구매 계획에 있었는지와 이번 달 예산을 확인한다", scores: ["planned"] },
      { text: "놓치면 아쉬울 것 같아 서둘러 결제할 때가 많다", scores: ["impulse"] },
      { text: "평소 가격과 비교하고 꼭 필요한 경우에만 산다", scores: ["frugal"] }
    ] },
    { prompt: "내 소비 내역을 돌아보는 방식은?", choices: [
      { text: "예산 항목별로 계획과 실제 금액을 비교한다", scores: ["planned"] },
      { text: "꼼꼼히 기록하기보다 필요할 때 잔액을 확인한다", scores: ["impulse"] },
      { text: "작은 지출도 살펴보고 아낄 방법을 찾는다", scores: ["frugal"] },
      { text: "기억에 남는 경험이나 만족스러운 소비를 떠올린다", scores: ["flex"] }
    ] },
    { prompt: "갑자기 예상하지 못한 지출이 생기면?", choices: [
      { text: "문제를 편하게 해결할 수 있다면 비용을 더 쓸 수 있다", scores: ["flex"] },
      { text: "다른 항목을 조정해 전체 계획을 다시 맞춘다", scores: ["planned"] },
      { text: "일단 결제한 뒤 나중에 어떻게 할지 생각한다", scores: ["impulse"] },
      { text: "비상금이나 여유 자금에서 해결하고 원인을 살핀다", scores: ["frugal"] }
    ] },
    { prompt: "저축 목표를 세울 때 더 가까운 방식은?", choices: [
      { text: "목표 금액을 기간별로 나눠 자동이체와 함께 관리한다", scores: ["planned"] },
      { text: "마음에 드는 목표가 생길 때마다 그때그때 시작한다", scores: ["impulse"] },
      { text: "작은 금액이라도 꾸준히 모으는 것을 우선한다", scores: ["frugal"] },
      { text: "여행이나 취미처럼 기대되는 목표를 위해 모은다", scores: ["flex"] }
    ] },
    { prompt: "친구와 외식이나 나들이를 정할 때 나는…", choices: [
      { text: "부담 없는 가격대에서 만족도 높은 곳을 찾는다", scores: ["frugal"] },
      { text: "특별한 날이라면 기억에 남을 경험을 고르고 싶다", scores: ["flex"] },
      { text: "이번 달 약속이나 여가 예산을 먼저 확인한다", scores: ["planned"] },
      { text: "당일 분위기와 기분에 따라 즉석에서 정하는 편이다", scores: ["impulse"] }
    ] },
    { prompt: "온라인 장바구니에 담아 둔 물건은 보통 어떻게 하나요?", choices: [
      { text: "더 저렴한 곳이 있는지 살펴보고 필요한 것만 남긴다", scores: ["frugal"] },
      { text: "오래 원했던 물건이라면 만족을 위해 구매한다", scores: ["flex"] },
      { text: "구매 목록과 예산을 확인한 뒤 살 시기를 정한다", scores: ["planned"] },
      { text: "마음이 바뀌기 전에 한 번에 주문하는 경우가 많다", scores: ["impulse"] }
    ] },
    { prompt: "돈을 잘 쓰고 있다고 느끼는 순간은?", choices: [
      { text: "세운 계획을 지키면서 목표에 한 걸음 다가갔을 때", scores: ["planned"] },
      { text: "지금 원하던 것을 망설임 없이 즐겼을 때", scores: ["impulse"] },
      { text: "필요한 것을 합리적인 가격에 사고 여유 자금도 남겼을 때", scores: ["frugal"] },
      { text: "소중한 사람이나 나를 위한 경험이 오래 기억에 남을 때", scores: ["flex"] }
    ] }
  ],
  profiles: {
    frugal: {
      name: "짠테크형 · 알뜰한 실속파", emoji: "🌱", image: "../image/spending-habits/frugal-saver.png", color: "#318d69",
      catchphrase: "작은 차이를 모아, 나에게 필요한 여유를 만들어요.",
      description: "가격과 필요를 꼼꼼히 살피고, 작은 절약도 꾸준히 이어가는 편이에요. 합리적인 선택에서 만족을 느끼며 미래를 위한 여유를 차근차근 쌓아갑니다.", shareDescription: "resultShare.spending-habits.frugal",
      details: [
        { title: "잘하는 점 🌿", icon: "leaf", text: "지출을 살펴보고 더 나은 선택을 찾는 힘이 있어요. 계획적으로 모은 여유 자금은 예상하지 못한 상황이나 중요한 목표에 도움이 됩니다." },
        { title: "작은 균형 팁 💡", icon: "bulb", text: "아끼는 일만큼 지금의 만족도 소중해요. 꼭 필요한 즐거움에는 미리 작은 예산을 정해 두면 절약과 경험을 함께 챙길 수 있어요." }
      ]
    },
    flex: {
      name: "플렉스형 · 경험을 즐기는 소비자", emoji: "✨", image: "../image/spending-habits/flex-spender.png", color: "#b7833d",
      catchphrase: "돈으로 바꾼 좋은 경험은 오래 기억에 남아요.",
      description: "가격만큼이나 만족감과 경험의 가치를 중요하게 여겨요. 나와 소중한 사람을 위한 소비에서 기쁨을 얻고, 의미 있다고 느끼는 순간을 아끼지 않는 편입니다.", shareDescription: "resultShare.spending-habits.flex",
      details: [
        { title: "잘하는 점 🌟", icon: "star", text: "무엇이 나에게 기쁨과 가치를 주는지 잘 알아요. 만족도 높은 경험에 집중하면 소비가 좋은 추억과 동기가 될 수 있습니다." },
        { title: "작은 균형 팁 💡", icon: "bulb", text: "큰 지출을 하기 전에 이번 달 여유 금액을 확인해 보세요. 즐거움을 위한 예산을 먼저 정하면 마음 편하게 경험을 누릴 수 있어요." }
      ]
    },
    planned: {
      name: "계획소비형 · 예산을 설계하는 소비자", emoji: "📒", image: "../image/spending-habits/planned-spender.png", color: "#4d8290",
      catchphrase: "미리 세운 계획이 마음 편한 선택을 도와줘요.",
      description: "예산과 우선순위를 정해 두고 그 안에서 소비하는 편이에요. 목표를 작은 단계로 나누고 진행 상황을 살펴서, 필요한 지출과 미래 준비를 균형 있게 챙깁니다.", shareDescription: "resultShare.spending-habits.planned",
      details: [
        { title: "잘하는 점 🧭", icon: "compass", text: "무엇을 위해 돈을 쓰는지 분명하게 알고 있어요. 예산을 나눠 관리하면 목표에 필요한 준비를 꾸준히 이어갈 수 있습니다." },
        { title: "작은 균형 팁 💡", icon: "bulb", text: "계획은 상황에 따라 조금 바뀌어도 괜찮아요. 즐거운 즉흥 지출을 위한 여유 항목을 두면 계획을 지키면서 유연함도 얻을 수 있어요." }
      ]
    },
    impulse: {
      name: "충동소비형 · 마음에 솔직한 즉흥파", emoji: "🎈", image: "../image/spending-habits/impulse-spender.png", color: "#bd7180",
      catchphrase: "마음이 끌리는 순간을 놓치고 싶지 않아요.",
      description: "지금 느끼는 설렘과 필요에 솔직하게 반응하는 편이에요. 새로운 물건이나 경험을 빠르게 즐길 수 있지만, 예상보다 지출이 커질 때도 있어요.", shareDescription: "resultShare.spending-habits.impulse",
      details: [
        { title: "잘하는 점 🎉", icon: "celebration", text: "좋아하는 것을 발견하고 바로 즐기는 추진력이 있어요. 새로운 경험을 시작하는 데 망설임이 적고, 순간의 기쁨을 잘 알아차립니다." },
        { title: "작은 균형 팁 💡", icon: "bulb", text: "큰 금액은 장바구니에 담아 하루 뒤 다시 확인해 보세요. 월간 자유 예산을 정해 두면 즉흥적인 즐거움도 부담을 줄이며 이어갈 수 있어요." }
      ]
    }
  }
};
