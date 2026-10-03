window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["hobby-discovery"] = {
  title: "hobbyDiscovery.quizTitle",
  resultLabel: "hobbyDiscovery.resultLabel",
  eyebrow: "hobbyDiscovery.eyebrow",
  sharePrompt: "hobbyDiscovery.sharePrompt",
  estimatedMinutes: 3,
  balanceResultExposure: true,
  url: "https://molgga.com/hobby-discovery-test.html",
  questions: [
    { prompt: "hobbyDiscovery.question.1", choices: [
      { text: "hobbyDiscovery.answer.1.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.1.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.1.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.1.observer", scores: ["observer"] }
    ] },
    { prompt: "hobbyDiscovery.question.2", choices: [
      { text: "hobbyDiscovery.answer.2.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.2.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.2.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.2.maker", scores: ["maker"] }
    ] },
    { prompt: "hobbyDiscovery.question.3", choices: [
      { text: "hobbyDiscovery.answer.3.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.3.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.3.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.3.puzzler", scores: ["puzzler"] }
    ] },
    { prompt: "hobbyDiscovery.question.4", choices: [
      { text: "hobbyDiscovery.answer.4.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.4.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.4.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.4.grower", scores: ["grower"] }
    ] },
    { prompt: "hobbyDiscovery.question.5", choices: [
      { text: "hobbyDiscovery.answer.5.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.5.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.5.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.5.flavor", scores: ["flavor"] }
    ] },
    { prompt: "hobbyDiscovery.question.6", choices: [
      { text: "hobbyDiscovery.answer.6.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.6.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.6.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.6.puzzler", scores: ["puzzler"] }
    ] },
    { prompt: "hobbyDiscovery.question.7", choices: [
      { text: "hobbyDiscovery.answer.7.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.7.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.7.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.7.flavor", scores: ["flavor"] }
    ] },
    { prompt: "hobbyDiscovery.question.8", choices: [
      { text: "hobbyDiscovery.answer.8.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.8.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.8.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.8.observer", scores: ["observer"] }
    ] },
    { prompt: "hobbyDiscovery.question.9", choices: [
      { text: "hobbyDiscovery.answer.9.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.9.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.9.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.9.grower", scores: ["grower"] }
    ] },
    { prompt: "hobbyDiscovery.question.10", choices: [
      { text: "hobbyDiscovery.answer.10.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.10.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.10.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.10.maker", scores: ["maker"] }
    ] },
    { prompt: "hobbyDiscovery.question.11", choices: [
      { text: "hobbyDiscovery.answer.11.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.11.observer", scores: ["observer"] },
      { text: "hobbyDiscovery.answer.11.grower", scores: ["grower"] },
      { text: "hobbyDiscovery.answer.11.flavor", scores: ["flavor"] }
    ] },
    { prompt: "hobbyDiscovery.question.12", choices: [
      { text: "hobbyDiscovery.answer.12.flavor", scores: ["flavor"] },
      { text: "hobbyDiscovery.answer.12.puzzler", scores: ["puzzler"] },
      { text: "hobbyDiscovery.answer.12.maker", scores: ["maker"] },
      { text: "hobbyDiscovery.answer.12.observer", scores: ["observer"] }
    ] }
  ],
  profiles: {
    maker: {
      name: "hobbyDiscovery.result.maker.name",
      image: "../image/tests/hobby-discovery/maker.jpg",
      imageAlt: "hobbyDiscovery.result.maker.imageAlt",
      color: "#d56b4d",
      catchphrase: "hobbyDiscovery.result.maker.catchphrase",
      description: "hobbyDiscovery.result.maker.description",
      shareDescription: "hobbyDiscovery.result.maker.shareDescription",
      details: [
        { title: "hobbyDiscovery.detail.goodTitle", text: "hobbyDiscovery.result.maker.good" },
        { title: "hobbyDiscovery.detail.firstStepTitle", text: "hobbyDiscovery.result.maker.firstStep" }
      ]
    },
    grower: {
      name: "hobbyDiscovery.result.grower.name",
      image: "../image/tests/hobby-discovery/grower.jpg",
      imageAlt: "hobbyDiscovery.result.grower.imageAlt",
      color: "#7588c5",
      catchphrase: "hobbyDiscovery.result.grower.catchphrase",
      description: "hobbyDiscovery.result.grower.description",
      shareDescription: "hobbyDiscovery.result.grower.shareDescription",
      details: [
        { title: "hobbyDiscovery.detail.goodTitle", text: "hobbyDiscovery.result.grower.good" },
        { title: "hobbyDiscovery.detail.firstStepTitle", text: "hobbyDiscovery.result.grower.firstStep" }
      ]
    },
    flavor: {
      name: "hobbyDiscovery.result.flavor.name",
      image: "../image/tests/hobby-discovery/flavor.jpg",
      imageAlt: "hobbyDiscovery.result.flavor.imageAlt",
      color: "#d65362",
      catchphrase: "hobbyDiscovery.result.flavor.catchphrase",
      description: "hobbyDiscovery.result.flavor.description",
      shareDescription: "hobbyDiscovery.result.flavor.shareDescription",
      details: [
        { title: "hobbyDiscovery.detail.goodTitle", text: "hobbyDiscovery.result.flavor.good" },
        { title: "hobbyDiscovery.detail.firstStepTitle", text: "hobbyDiscovery.result.flavor.firstStep" }
      ]
    },
    observer: {
      name: "hobbyDiscovery.result.observer.name",
      image: "../image/tests/hobby-discovery/observer.jpg",
      imageAlt: "hobbyDiscovery.result.observer.imageAlt",
      color: "#596ca0",
      catchphrase: "hobbyDiscovery.result.observer.catchphrase",
      description: "hobbyDiscovery.result.observer.description",
      shareDescription: "hobbyDiscovery.result.observer.shareDescription",
      details: [
        { title: "hobbyDiscovery.detail.goodTitle", text: "hobbyDiscovery.result.observer.good" },
        { title: "hobbyDiscovery.detail.firstStepTitle", text: "hobbyDiscovery.result.observer.firstStep" }
      ]
    },
    puzzler: {
      name: "hobbyDiscovery.result.puzzler.name",
      image: "../image/tests/hobby-discovery/puzzler.jpg",
      imageAlt: "hobbyDiscovery.result.puzzler.imageAlt",
      color: "#5464a8",
      catchphrase: "hobbyDiscovery.result.puzzler.catchphrase",
      description: "hobbyDiscovery.result.puzzler.description",
      shareDescription: "hobbyDiscovery.result.puzzler.shareDescription",
      details: [
        { title: "hobbyDiscovery.detail.goodTitle", text: "hobbyDiscovery.result.puzzler.good" },
        { title: "hobbyDiscovery.detail.firstStepTitle", text: "hobbyDiscovery.result.puzzler.firstStep" }
      ]
    }
  }
};
