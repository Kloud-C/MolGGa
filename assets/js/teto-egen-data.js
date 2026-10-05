window.MOA_ARCHETYPE_TESTS = {
  "teto-egen": {
  answerPositionPolicy: "balanced",
    title: "테토/에겐 테스트",
    eyebrow: "molgga PLAY · 테토/에겐",
    estimatedMinutes: 3,
    balanceResultExposure: true,
    url: "https://molgga.com/teto-egen-test.html",
    questions: [
      { prompt: "약속 장소를 정할 때 나는…", choices: [
        { text: "서로 편한 선택지를 물어보고 함께 고른다", scores: [{ id: "egen-care", weight: 3 }, { id: "egen-empathy", weight: 2 }] },
        { text: "가고 싶은 곳을 먼저 정해 시원하게 제안한다", scores: [{ id: "teto-leader", weight: 3 }, { id: "teto-bold", weight: 2 }] }
      ] },
      { prompt: "상대의 답장이 늦을 때 나는…", choices: [
        { text: "하던 일에 집중하고 내 리듬을 유지한다", scores: [{ id: "teto-cool", weight: 3 }, { id: "egen-free", weight: 2 }] },
        { text: "바쁜가 보다 하고 짧게 안부를 남긴다", scores: [{ id: "teto-guard", weight: 3 }, { id: "egen-mood", weight: 2 }] }
      ] },
      { prompt: "친구가 고민을 털어놓으면 먼저…", choices: [
        { text: "지금 할 수 있는 해결책을 같이 찾는다", scores: [{ id: "teto-leader", weight: 3 }, { id: "teto-bold", weight: 2 }] },
        { text: "충분히 들어주고 어떤 기분인지 살핀다", scores: [{ id: "egen-empathy", weight: 3 }, { id: "egen-care", weight: 2 }] }
      ] },
      { prompt: "처음 가는 모임에서는…", choices: [
        { text: "먼저 말을 걸고 자연스럽게 분위기를 연다", scores: [{ id: "teto-leader", weight: 3 }, { id: "egen-mood", weight: 2 }] },
        { text: "편한 사람과 천천히 대화를 시작한다", scores: [{ id: "teto-cool", weight: 3 }, { id: "egen-free", weight: 2 }] }
      ] },
      { prompt: "칭찬을 들으면 더 자연스러운 반응은?", choices: [
        { text: "상대의 좋은 점도 바로 찾아 돌려준다", scores: [{ id: "egen-care", weight: 3 }, { id: "egen-mood", weight: 2 }] },
        { text: "고맙다고 말하고 자신 있게 받아들인다", scores: [{ id: "teto-bold", weight: 3 }, { id: "teto-cool", weight: 2 }] }
      ] },
      { prompt: "의견이 부딪히면 나는…", choices: [
        { text: "내 생각을 분명하게 말하고 접점을 찾는다", scores: [{ id: "teto-bold", weight: 3 }, { id: "teto-cool", weight: 2 }] },
        { text: "잠깐 생각한 뒤 서로의 마음을 살핀다", scores: [{ id: "egen-empathy", weight: 3 }, { id: "teto-guard", weight: 2 }] }
      ] },
      { prompt: "기다리던 주말 계획이 취소되면…", choices: [
        { text: "함께할 사람의 기분부터 챙겨 새로 정한다", scores: [{ id: "teto-guard", weight: 3 }, { id: "egen-care", weight: 2 }] },
        { text: "바로 다른 장소나 활동을 제안한다", scores: [{ id: "teto-leader", weight: 3 }, { id: "egen-free", weight: 2 }] }
      ] },
      { prompt: "호감 있는 사람에게 연락할 때 나는…", choices: [
        { text: "전에 나눈 이야기를 기억해 다정하게 말을 건다", scores: [{ id: "egen-empathy", weight: 3 }, { id: "egen-care", weight: 2 }] },
        { text: "보고 싶다고 솔직하게 먼저 말한다", scores: [{ id: "teto-bold", weight: 3 }, { id: "teto-leader", weight: 2 }] }
      ] },
      { prompt: "여럿이 함께 무언가를 정할 때 내 역할은?", choices: [
        { text: "선택지를 좁히고 다음 행동을 정리한다", scores: [{ id: "teto-leader", weight: 3 }, { id: "teto-guard", weight: 2 }] },
        { text: "모두가 편하게 참여하도록 분위기를 띄운다", scores: [{ id: "egen-mood", weight: 3 }, { id: "egen-care", weight: 2 }] }
      ] },
      { prompt: "하루를 마치고 지쳤을 때 필요한 시간은?", choices: [
        { text: "혼자 조용히 쉬며 머리를 식히는 시간", scores: [{ id: "teto-cool", weight: 3 }, { id: "egen-free", weight: 2 }] },
        { text: "편한 사람과 가볍게 마음을 나누는 시간", scores: [{ id: "teto-guard", weight: 3 }, { id: "egen-empathy", weight: 2 }] }
      ] },
      { prompt: "좋아하는 마음을 표현하는 방식은?", choices: [
        { text: "필요한 순간 먼저 움직여 행동으로 보여준다", scores: [{ id: "teto-guard", weight: 3 }, { id: "teto-bold", weight: 2 }] },
        { text: "말과 작은 표현으로 자주 전해준다", scores: [{ id: "egen-care", weight: 3 }, { id: "egen-mood", weight: 2 }] }
      ] },
      { prompt: "새로운 일을 시작할 때 나는…", choices: [
        { text: "주변 반응과 내 마음을 살피며 시작한다", scores: [{ id: "egen-empathy", weight: 3 }, { id: "egen-mood", weight: 2 }] },
        { text: "내 방식대로 먼저 해보고 자유롭게 방향을 잡는다", scores: [{ id: "teto-cool", weight: 3 }, { id: "egen-free", weight: 2 }] }
      ] }
    ],
    profiles: {
      "teto-leader": { image: "../image/tests/teto-egen/teto-leader-v20260927-6.jpg", name: "돌격대장 테토", emoji: "🚀", color: "#23866a", catchphrase: "생각이 생기면, 망설임보다 실행!", description: "원하는 게 생기면 먼저 제안하고 길을 열어요. 결정이 필요한 순간에 중심을 잡아주는 편이에요. 가끔은 속도가 빠를 수 있으니 상대의 의견도 한 번 물어보면 더 멋진 리더가 됩니다.", shareDescription: "resultShare.teto-egen.teto-leader", good: ["teto-guard", "egen-mood"], tricky: ["teto-cool", "egen-empathy"] },
      "teto-guard": { image: "../image/tests/teto-egen/teto-guard-v20260927-6.jpg", name: "든든수호 테토", emoji: "🛡️", color: "#397b96", catchphrase: "말보다 먼저 움직이는 믿음직한 편!", description: "가까운 사람이 곤란할 때 현실적인 도움을 건네요. 약속을 지키고 필요한 일을 챙겨 신뢰를 쌓아요. 혼자 다 해결하려 하기보다 도움을 나누면 관계도 한결 편안해집니다.", shareDescription: "resultShare.teto-egen.teto-guard", good: ["egen-care", "teto-leader"], tricky: ["egen-free", "teto-bold"] },
      "teto-cool": { image: "../image/tests/teto-egen/teto-cool-v20260927-6.jpg", name: "마이웨이 쿨테토", emoji: "🧊", color: "#5b7798", catchphrase: "차분한 페이스로 내 길을 가는 사람!", description: "감정에 휩쓸리기보다 한 걸음 떨어져 상황을 바라봐요. 혼자만의 시간과 각자의 영역을 중요하게 여깁니다. 마음이 잘 전해지도록 가끔은 생각을 말로 꺼내보세요.", shareDescription: "resultShare.teto-egen.teto-cool", good: ["egen-free", "teto-bold"], tricky: ["egen-mood", "teto-leader"] },
      "teto-bold": { image: "../image/tests/teto-egen/teto-bold-v20260927-6.jpg", name: "직진불도저 테토", emoji: "🔥", color: "#d16b45", catchphrase: "좋으면 좋다고, 마음도 목표도 직진!", description: "좋아하는 마음과 의견을 숨기지 않고 분명하게 표현해요. 망설이는 시간을 줄이고 바로 행동하는 게 매력입니다. 상대의 속도까지 확인하면 솔직함이 더 다정하게 전달돼요.", shareDescription: "resultShare.teto-egen.teto-bold", good: ["egen-empathy", "teto-cool"], tricky: ["teto-guard", "egen-free"] },
      "egen-care": { image: "../image/tests/teto-egen/egen-care-v20260927-6.jpg", name: "말랑다정 에겐", emoji: "🌷", color: "#c36a87", catchphrase: "작은 마음까지 다정하게 건네는 타입!", description: "상대가 편안하도록 말투와 분위기를 부드럽게 살펴요. 고마움과 애정을 작은 표현으로 자주 전합니다. 배려를 주는 만큼 본인의 바람도 편하게 말해보세요.", shareDescription: "resultShare.teto-egen.egen-care", good: ["teto-guard", "egen-mood"], tricky: ["teto-cool", "teto-bold"] },
      "egen-empathy": { image: "../image/tests/teto-egen/egen-empathy-v20260927-6.jpg", name: "레이더공감 에겐", emoji: "🌙", color: "#7864a8", catchphrase: "말하지 않은 마음도 한 번 더 살펴봐요!", description: "표정과 말투의 작은 변화를 잘 알아차리는 편이에요. 바로 조언하기보다 충분히 들어주는 순간에 강점이 있어요. 모든 기분을 책임지려 하지 말고 내 마음도 함께 챙겨주세요.", shareDescription: "resultShare.teto-egen.egen-empathy", good: ["teto-bold", "teto-guard"], tricky: ["teto-leader", "egen-free"] },
      "egen-free": { image: "../image/tests/teto-egen/egen-free-v20260927-6.jpg", name: "자유영혼 에겐", emoji: "🕊️", color: "#4d9b91", catchphrase: "다정하지만 나만의 리듬도 확실하게!", description: "혼자 충전하는 시간과 새로운 경험을 모두 좋아해요. 정해진 틀보다 그날의 기분에 맞춰 움직일 때 매력이 살아납니다. 약속이 바뀔 수 있다면 미리 한마디 나누는 게 서로에게 편해요.", shareDescription: "resultShare.teto-egen.egen-free", good: ["teto-cool", "teto-leader"], tricky: ["teto-guard", "egen-empathy"] },
      "egen-mood": { image: "../image/tests/teto-egen/egen-mood-v20260927-6.jpg", name: "분위기요정 에겐", emoji: "✨", color: "#b18435", catchphrase: "어색함을 설렘으로 바꾸는 매력!", description: "따뜻한 리액션과 센스로 대화에 생기를 더해요. 좋은 순간을 함께 나누고 기억에 남는 분위기를 만드는 데 능숙합니다. 가끔은 모두를 즐겁게 하려 애쓰기보다 내 컨디션부터 확인해도 괜찮아요.", shareDescription: "resultShare.teto-egen.egen-mood", good: ["teto-leader", "egen-care"], tricky: ["teto-cool", "teto-bold"] }
    }
  }
};
