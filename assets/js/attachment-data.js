window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["attachment-style"] = {
  title: "애착 유형 테스트",
  eyebrow: "molgga PLAY · 애착 유형",
  estimatedMinutes: 4,
  url: "https://molgga.com/attachment-test.html",
  questions: [
    { prompt: "가까운 사람이 평소보다 답장이 늦으면 나는…", choices: [
      { text: "상황이 있겠거니 하고 하던 일을 이어간다", scores: ["secure"] },
      { text: "혹시 마음이 달라졌나 여러 가능성을 떠올린다", scores: ["anxious"] }
    ] },
    { prompt: "관계에서 서운한 일이 생기면 먼저…", choices: [
      { text: "상대와 차분히 이야기해 서로의 생각을 맞춘다", scores: ["secure"] },
      { text: "혼자 정리할 시간이 생길 때까지 말을 아낀다", scores: ["avoidant"] }
    ] },
    { prompt: "마음을 나누는 대화가 깊어질 때 더 가까운 반응은?", choices: [
      { text: "상대가 나를 어떻게 생각하는지 확인하고 싶어진다", scores: ["anxious"] },
      { text: "감정에 깊이 들어가기보다 화제를 바꾸고 싶어진다", scores: ["avoidant"] }
    ] },
    { prompt: "연인이 혼자만의 시간을 원한다고 하면 나는…", choices: [
      { text: "서로의 시간이 필요할 수 있다고 받아들인다", scores: ["secure"] },
      { text: "나와 거리를 두려는 건 아닌지 신경이 쓰인다", scores: ["fearful"] }
    ] },
    { prompt: "관계가 가까워질수록 내 안에서 자주 드는 마음은?", choices: [
      { text: "나만 더 좋아하게 될까 봐 확신을 얻고 싶다", scores: ["anxious"] },
      { text: "기대가 커지면 상처받을까 봐 한발 물러선다", scores: ["fearful"] }
    ] },
    { prompt: "힘든 일이 있을 때 가까운 사람에게 나는…", choices: [
      { text: "필요한 도움을 구체적으로 말하고 의지한다", scores: ["secure"] },
      { text: "기대고 싶으면서도 막상 마음을 열기는 조심스럽다", scores: ["fearful"] }
    ] },
    { prompt: "상대가 바쁜 시기에 연락이 줄어들면 나는…", choices: [
      { text: "바쁜 시기가 지나면 다시 이야기할 수 있다고 생각한다", scores: ["secure"] },
      { text: "관계가 멀어질까 걱정돼 더 자주 확인하고 싶다", scores: ["anxious"] }
    ] },
    { prompt: "의견 차이가 생겼을 때 마음이 편한 대화는?", choices: [
      { text: "혼자 생각을 정리한 뒤 내가 할 수 있는 부분부터 해결한다", scores: ["avoidant"] },
      { text: "말하고 싶지만 거절당할까 봐 속마음을 감춘다", scores: ["fearful"] }
    ] },
    { prompt: "다툰 뒤 먼저 연락하기 망설여질 때 나는…", choices: [
      { text: "상대가 먼저 다가올 때까지 감정을 닫아 둔다", scores: ["avoidant"] },
      { text: "불편한 상태를 견디기 어려워 바로 확인하고 싶다", scores: ["anxious"] }
    ] },
    { prompt: "좋아하는 마음을 전할 때 더 자연스러운 방식은?", choices: [
      { text: "고마움과 애정을 말과 행동으로 편하게 표현한다", scores: ["secure"] },
      { text: "표현한 뒤 상대가 같은 마음인지 자주 확인한다", scores: ["anxious"] }
    ] },
    { prompt: "가까운 사람에게 실망했을 때 나는…", choices: [
      { text: "마음을 풀고 싶지만 다시 믿어도 될지 망설인다", scores: ["fearful"] },
      { text: "기대하지 않는 편이 낫다고 생각하며 거리를 둔다", scores: ["avoidant"] }
    ] },
    { prompt: "연인이나 친구에게 부탁할 일이 생기면…", choices: [
      { text: "필요한 점을 말하고 서로 가능한 방법을 찾는다", scores: ["secure"] },
      { text: "부담을 줄까 봐 웬만하면 혼자 해결하려 한다", scores: ["avoidant"] }
    ] },
    { prompt: "상대의 말투가 평소와 다르게 느껴지면…", choices: [
      { text: "괜찮다고 생각하며 혼자 하던 일에 집중한다", scores: ["avoidant"] },
      { text: "묻고 싶지만 반응이 두려워 혼자 마음을 살핀다", scores: ["fearful"] }
    ] },
    { prompt: "상대가 나를 도와주겠다고 하면 나는…", choices: [
      { text: "고맙게 받아들이고 필요하면 도움을 나눈다", scores: ["secure"] },
      { text: "고맙지만 속마음까지 드러내는 건 조금 어렵다", scores: ["fearful"] }
    ] },
    { prompt: "상대가 혼자 쉬고 싶다고 말하면 나는…", choices: [
      { text: "각자 쉬는 시간이 관계에도 필요하다고 여긴다", scores: ["avoidant"] },
      { text: "내가 뭔가 잘못했는지 확인하고 싶어진다", scores: ["anxious"] }
    ] },
    { prompt: "누군가와 가까워지고 싶을 때 내 마음은…", choices: [
      { text: "상대의 반응이 걱정돼도 먼저 확인하고 다가간다", scores: ["anxious"] },
      { text: "다가가고 싶다가도 상처받을까 봐 물러선다", scores: ["fearful"] }
    ] }
  ],
  profiles: {
    secure: { image: "../image/tests/attachment-style/secure.jpg",
      name: "안정형 · 편안한 연결자", emoji: "🤝", color: "#318d69",
      catchphrase: "가까움도 나다움도 함께 지켜요.",
      description: "마음을 나누면서도 서로의 차이와 시간을 존중하는 편이에요. 서운함이 생기면 대화로 풀어가고, 필요할 때 도움을 주고받으려 해요.",
      details: [
        { title: "연애할 때 💌", icon: "heart", text: "애정과 고마움을 자연스럽게 표현해요. 갈등이 있어도 관계를 단정하기보다 함께 풀 방법을 찾습니다." },
        { title: "인간관계에서 🌿", icon: "leaf", text: "친밀함과 각자의 생활을 균형 있게 이어가요. 부탁하거나 도움을 받는 일을 관계의 일부로 여겨요." },
        { title: "잘 맞는 대화 🗣️", icon: "speech", text: "서로의 마음과 바라는 점을 솔직하게 나누는 대화에서 편안함을 느껴요." }
      ]
    },
    avoidant: { image: "../image/tests/attachment-style/avoidant.jpg",
      name: "회피형 · 나만의 페이스", emoji: "🐢", color: "#397b96",
      catchphrase: "혼자 정리할 시간이 있어야 마음도 편해요.",
      description: "감정이 복잡할 때 혼자 생각을 정리하고 자기 리듬을 지키려는 편이에요. 가까운 관계에서도 독립성과 개인 공간이 중요할 수 있어요.",
      details: [
        { title: "연애할 때 💌", icon: "heart", text: "마음이 있어도 표현을 서두르지 않을 수 있어요. 부담을 느끼면 잠시 거리를 두고 차분해진 뒤 이야기하는 편입니다." },
        { title: "인간관계에서 🌿", icon: "leaf", text: "스스로 해결하는 데 익숙하고 사적인 시간을 소중히 여겨요. 상대에게 필요한 거리를 말로 알려주면 오해를 줄일 수 있어요." },
        { title: "잘 맞는 대화 🗣️", icon: "speech", text: "생각을 정리할 시간을 서로 인정하고, 준비가 되었을 때 구체적으로 이야기하는 방식이 편해요." }
      ]
    },
    anxious: { image: "../image/tests/attachment-style/anxious.jpg",
      name: "불안형 · 마음 확인 레이더", emoji: "💌", color: "#b86b82",
      catchphrase: "소중한 관계일수록 마음을 자주 확인하고 싶어요.",
      description: "관계를 중요하게 여겨 상대의 반응과 분위기 변화에 민감할 수 있어요. 확신이 줄어들면 마음을 확인하고 안심을 얻고 싶어지는 편이에요.",
      details: [
        { title: "연애할 때 💌", icon: "heart", text: "애정 표현과 꾸준한 연락에서 안정감을 느껴요. 걱정이 커질 때는 추측을 키우기보다 원하는 연락이나 표현을 구체적으로 말해보세요." },
        { title: "인간관계에서 🌿", icon: "leaf", text: "친구의 기분과 관계의 온도를 세심하게 살펴요. 상대의 모든 반응을 혼자 책임질 필요는 없다는 점도 기억해 주세요." },
        { title: "잘 맞는 대화 🗣️", icon: "speech", text: "연락이나 약속에서 서로 기대하는 바를 미리 맞추고, 안심이 필요한 순간을 부드럽게 나누는 대화가 도움이 돼요." }
      ]
    },
    fearful: { image: "../image/tests/attachment-style/fearful.jpg",
      name: "혼란형 · 가까움과 조심 사이", emoji: "🌗", color: "#7864a8",
      catchphrase: "다가가고 싶은 마음과 지키고 싶은 마음이 함께해요.",
      description: "친밀해지고 싶은 마음과 상처를 피하고 싶은 마음이 함께 들 수 있어요. 상대를 믿고 싶으면서도 마음을 여는 순간에는 신중해지는 편이에요.",
      details: [
        { title: "연애할 때 💌", icon: "heart", text: "상대가 다가오면 반갑다가도 부담스럽고, 거리가 생기면 다시 가까워지고 싶을 수 있어요. 내게 편안한 속도를 알아가는 게 도움이 됩니다." },
        { title: "인간관계에서 🌿", icon: "leaf", text: "관계의 작은 변화도 크게 느껴질 수 있어요. 안전하다고 느끼는 사람과 천천히 신뢰를 쌓아가도 괜찮아요." },
        { title: "잘 맞는 대화 🗣️", icon: "speech", text: "마음을 열 준비가 되는 속도를 존중하고, 약속과 경계를 차분히 확인할 수 있는 대화가 편안함을 줘요." }
      ]
    }
  }
};
