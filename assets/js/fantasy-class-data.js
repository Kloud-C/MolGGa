window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["fantasy-class"] = {
  answerPositionPolicy: "balanced",
  title: "fantasyClass.title",
  sharePrompt: "fantasyClass.sharePrompt",
  eyebrow: "fantasyClass.eyebrow",
  estimatedMinutes: 2,
  resultLabel: "fantasyClass.resultLabel",
  url: "https://molgga.com/fantasy-class-test.html",
  balanceResultExposure: true,
  questions: [
    { prompt: "fantasyClass.question.1", choices: [
      { text: "fantasyClass.question.1.a", scores: [{ id: "warrior", weight: 2 }, "knight"] },
      { text: "fantasyClass.question.1.b", scores: [{ id: "mage", weight: 2 }] },
      { text: "fantasyClass.question.1.c", scores: [{ id: "priest", weight: 2 }, "bard"] },
      { text: "fantasyClass.question.1.d", scores: [{ id: "ranger", weight: 2 }, "rogue"] }
    ] },
    { prompt: "fantasyClass.question.2", choices: [
      { text: "fantasyClass.question.2.d", scores: [{ id: "merchant", weight: 2 }, "bard"] },
      { text: "fantasyClass.question.2.a", scores: [{ id: "ranger", weight: 2 }, { id: "rogue", weight: 2 }] },
      { text: "fantasyClass.question.2.b", scores: [{ id: "mage", weight: 2 }] },
      { text: "fantasyClass.question.2.c", scores: [{ id: "priest", weight: 2 }] }
    ] },
    { prompt: "fantasyClass.question.3", choices: [
      { text: "fantasyClass.question.3.b", scores: [{ id: "mage", weight: 2 }] },
      { text: "fantasyClass.question.3.c", scores: [{ id: "rogue", weight: 2 }, "ranger"] },
      { text: "fantasyClass.question.3.d", scores: [{ id: "bard", weight: 2 }, "merchant"] },
      { text: "fantasyClass.question.3.a", scores: [{ id: "warrior", weight: 2 }, "knight"] }
    ] },
    { prompt: "fantasyClass.question.4", choices: [
      { text: "fantasyClass.question.4.c", scores: [{ id: "priest", weight: 2 }] },
      { text: "fantasyClass.question.4.d", scores: [{ id: "bard", weight: 2 }] },
      { text: "fantasyClass.question.4.a", scores: [{ id: "knight", weight: 2 }, "warrior"] },
      { text: "fantasyClass.question.4.b", scores: [{ id: "ranger", weight: 2 }, "mage"] }
    ] },
    { prompt: "fantasyClass.question.5", choices: [
      { text: "fantasyClass.question.5.c", scores: [{ id: "ranger", weight: 2 }, "rogue"] },
      { text: "fantasyClass.question.5.d", scores: [{ id: "mage", weight: 2 }] },
      { text: "fantasyClass.question.5.a", scores: [{ id: "warrior", weight: 2 }] },
      { text: "fantasyClass.question.5.b", scores: [{ id: "knight", weight: 2 }, "priest"] }
    ] },
    { prompt: "fantasyClass.question.6", choices: [
      { text: "fantasyClass.question.6.b", scores: [{ id: "merchant", weight: 2 }] },
      { text: "fantasyClass.question.6.c", scores: [{ id: "merchant", weight: 2 }] },
      { text: "fantasyClass.question.6.d", scores: [{ id: "rogue", weight: 2 }, "ranger"] },
      { text: "fantasyClass.question.6.a", scores: [{ id: "merchant", weight: 2 }, "warrior"] }
    ] },
    { prompt: "fantasyClass.question.7", choices: [
      { text: "fantasyClass.question.7.d", scores: [{ id: "bard", weight: 2 }] },
      { text: "fantasyClass.question.7.a", scores: [{ id: "warrior", weight: 2 }, "knight"] },
      { text: "fantasyClass.question.7.b", scores: [{ id: "mage", weight: 2 }] },
      { text: "fantasyClass.question.7.c", scores: [{ id: "ranger", weight: 2 }, "rogue"] }
    ] },
    { prompt: "fantasyClass.question.8", choices: [
      { text: "fantasyClass.question.8.a", scores: [{ id: "knight", weight: 2 }, "warrior"] },
      { text: "fantasyClass.question.8.b", scores: [{ id: "priest", weight: 2 }] },
      { text: "fantasyClass.question.8.c", scores: [{ id: "ranger", weight: 2 }, "rogue"] },
      { text: "fantasyClass.question.8.d", scores: [{ id: "bard", weight: 2 }, "merchant"] }
    ] }
  ],
  profiles: {
    warrior: {
      name: "fantasyClass.profile.warrior.name", imageFile: "../image/tests/fantasy-class/warrior.jpg", color: "#b66b4e",
      catchphrase: "fantasyClass.profile.warrior.catchphrase",
      description: "fantasyClass.profile.warrior.description",
      shareDescription: "fantasyClass.profile.warrior.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.warrior.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.warrior.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.warrior.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.warrior.teammate" }
      ]
    },
    knight: {
      name: "fantasyClass.profile.knight.name", imageFile: "../image/tests/fantasy-class/knight.jpg", color: "#687b91",
      catchphrase: "fantasyClass.profile.knight.catchphrase",
      description: "fantasyClass.profile.knight.description",
      shareDescription: "fantasyClass.profile.knight.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.knight.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.knight.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.knight.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.knight.teammate" }
      ]
    },
    mage: {
      name: "fantasyClass.profile.mage.name", imageFile: "../image/tests/fantasy-class/mage.jpg", color: "#7967a3",
      catchphrase: "fantasyClass.profile.mage.catchphrase",
      description: "fantasyClass.profile.mage.description",
      shareDescription: "fantasyClass.profile.mage.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.mage.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.mage.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.mage.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.mage.teammate" }
      ]
    },
    priest: {
      name: "fantasyClass.profile.priest.name", imageFile: "../image/tests/fantasy-class/priest.jpg", color: "#62927f",
      catchphrase: "fantasyClass.profile.priest.catchphrase",
      description: "fantasyClass.profile.priest.description",
      shareDescription: "fantasyClass.profile.priest.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.priest.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.priest.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.priest.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.priest.teammate" }
      ]
    },
    ranger: {
      name: "fantasyClass.profile.ranger.name", imageFile: "../image/tests/fantasy-class/ranger.jpg", color: "#64854f",
      catchphrase: "fantasyClass.profile.ranger.catchphrase",
      description: "fantasyClass.profile.ranger.description",
      shareDescription: "fantasyClass.profile.ranger.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.ranger.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.ranger.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.ranger.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.ranger.teammate" }
      ]
    },
    rogue: {
      name: "fantasyClass.profile.rogue.name", imageFile: "../image/tests/fantasy-class/rogue.jpg", color: "#98754f",
      catchphrase: "fantasyClass.profile.rogue.catchphrase",
      description: "fantasyClass.profile.rogue.description",
      shareDescription: "fantasyClass.profile.rogue.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.rogue.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.rogue.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.rogue.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.rogue.teammate" }
      ]
    },
    merchant: {
      name: "fantasyClass.profile.merchant.name", imageFile: "../image/tests/fantasy-class/merchant.jpg", color: "#bd8a46",
      catchphrase: "fantasyClass.profile.merchant.catchphrase",
      description: "fantasyClass.profile.merchant.description",
      shareDescription: "fantasyClass.profile.merchant.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.merchant.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.merchant.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.merchant.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.merchant.teammate" }
      ]
    },
    bard: {
      name: "fantasyClass.profile.bard.name", imageFile: "../image/tests/fantasy-class/bard.jpg", color: "#a86c84",
      catchphrase: "fantasyClass.profile.bard.catchphrase",
      description: "fantasyClass.profile.bard.description",
      shareDescription: "fantasyClass.profile.bard.shareDescription",
      details: [
        { title: "fantasyClass.detail.gear", text: "fantasyClass.profile.bard.gear" },
        { title: "fantasyClass.detail.skill", text: "fantasyClass.profile.bard.skill" },
        { title: "fantasyClass.detail.role", text: "fantasyClass.profile.bard.role" },
        { title: "fantasyClass.detail.teammate", text: "fantasyClass.profile.bard.teammate" }
      ]
    }
  }
};
