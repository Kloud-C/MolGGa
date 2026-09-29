window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["travel-role"] = {
  title: "travelRole.title",
  sharePrompt: "travelRole.sharePrompt",
  eyebrow: "molgga PLAY · 친구 여행 테스트",
  estimatedMinutes: 2,
  resultLabel: "travelRole.resultLabel",
  url: "https://molgga.com/travel-role-test.html",
  // Give a modest 1.5x boost only to unmistakable foodie/photo-taking evidence.
  questions: [
    { prompt: "travelRole.question.1", choices: [
      { text: "travelRole.question.1.a", scores: ["planner", "budget-keeper"] },
      { text: "travelRole.question.1.b", scores: ["free-spirit", "mood-maker"] }
    ] },
    { prompt: "travelRole.question.2", choices: [
      { text: "travelRole.question.2.a", scores: [{ id: "foodie", weight: 1.5 }, "budget-keeper"] },
      { text: "travelRole.question.2.b", scores: ["navigator"] }
    ] },
    { prompt: "travelRole.question.3", choices: [
      { text: "travelRole.question.3.a", scores: ["navigator"] },
      { text: "travelRole.question.3.b", scores: ["mood-maker", "free-spirit"] }
    ] },
    { prompt: "travelRole.question.4", choices: [
      { text: "travelRole.question.4.a", scores: [{ id: "photographer", weight: 1.5 }, "caregiver"] },
      { text: "travelRole.question.4.b", scores: ["mood-maker", "caregiver"] }
    ] },
    { prompt: "travelRole.question.5", choices: [
      { text: "travelRole.question.5.a", scores: ["caregiver"] },
      { text: "travelRole.question.5.b", scores: ["planner", "caregiver"] }
    ] },
    { prompt: "travelRole.question.6", choices: [
      { text: "travelRole.question.6.a", scores: ["budget-keeper", "planner"] },
      { text: "travelRole.question.6.b", scores: [{ id: "foodie", weight: 1.5 }, "caregiver"] }
    ] },
    { prompt: "travelRole.question.7", choices: [
      { text: "travelRole.question.7.a", scores: ["planner", "navigator"] },
      { text: "travelRole.question.7.b", scores: ["mood-maker", "free-spirit"] }
    ] },
    { prompt: "travelRole.question.8", choices: [
      { text: "travelRole.question.8.a", scores: ["free-spirit", "photographer"] },
      { text: "travelRole.question.8.b", scores: ["navigator", "foodie"] }
    ] },
    { prompt: "travelRole.question.9", choices: [
      { text: "travelRole.question.9.a", scores: [{ id: "photographer", weight: 1.5 }, "mood-maker"] },
      { text: "travelRole.question.9.b", scores: ["planner", "budget-keeper"] }
    ] }
  ],
  profiles: {
    planner: { name: "travelRole.profile.planner.name", imageFile: "../image/tests/travel-role-test/planner.png", color: "#3d8f70", catchphrase: "travelRole.profile.planner.catchphrase", description: "travelRole.profile.planner.description", shareDescription: "resultShare.travel-role.planner", good: ["navigator", "budget-keeper"], tricky: ["free-spirit", "foodie"] },
    navigator: { name: "travelRole.profile.navigator.name", imageFile: "../image/tests/travel-role-test/navigator.png", color: "#438a9b", catchphrase: "travelRole.profile.navigator.catchphrase", description: "travelRole.profile.navigator.description", shareDescription: "resultShare.travel-role.navigator", good: ["planner", "photographer"], tricky: ["mood-maker", "free-spirit"] },
    foodie: { name: "travelRole.profile.foodie.name", imageFile: "../image/tests/travel-role-test/food-scout.png", color: "#c47a42", catchphrase: "travelRole.profile.foodie.catchphrase", description: "travelRole.profile.foodie.description", shareDescription: "resultShare.travel-role.foodie", good: ["photographer", "mood-maker"], tricky: ["budget-keeper", "navigator"] },
    photographer: { name: "travelRole.profile.photographer.name", imageFile: "../image/tests/travel-role-test/photographer.png", color: "#8275a9", catchphrase: "travelRole.profile.photographer.catchphrase", description: "travelRole.profile.photographer.description", shareDescription: "resultShare.travel-role.photographer", good: ["foodie", "free-spirit"], tricky: ["planner", "budget-keeper"] },
    "mood-maker": { name: "travelRole.profile.mood-maker.name", imageFile: "../image/tests/travel-role-test/mood-maker.png", color: "#c46b75", catchphrase: "travelRole.profile.mood-maker.catchphrase", description: "travelRole.profile.mood-maker.description", shareDescription: "resultShare.travel-role.mood-maker", good: ["caregiver", "foodie"], tricky: ["navigator", "planner"] },
    "budget-keeper": { name: "travelRole.profile.budget-keeper.name", imageFile: "../image/tests/travel-role-test/budget-keeper.png", color: "#668e57", catchphrase: "travelRole.profile.budget-keeper.catchphrase", description: "travelRole.profile.budget-keeper.description", shareDescription: "resultShare.travel-role.budget-keeper", good: ["planner", "navigator"], tricky: ["free-spirit", "foodie"] },
    caregiver: { name: "travelRole.profile.caregiver.name", imageFile: "../image/tests/travel-role-test/caregiver.png", color: "#c27660", catchphrase: "travelRole.profile.caregiver.catchphrase", description: "travelRole.profile.caregiver.description", shareDescription: "resultShare.travel-role.caregiver", good: ["mood-maker", "planner"], tricky: ["free-spirit", "photographer"] },
    "free-spirit": { name: "travelRole.profile.free-spirit.name", imageFile: "../image/tests/travel-role-test/free-spirit.png", color: "#4c91a1", catchphrase: "travelRole.profile.free-spirit.catchphrase", description: "travelRole.profile.free-spirit.description", shareDescription: "resultShare.travel-role.free-spirit", good: ["photographer", "mood-maker"], tricky: ["planner", "budget-keeper"] }
  }
};
