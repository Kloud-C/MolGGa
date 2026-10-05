window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["rest-style"] = {
  answerPositionPolicy: "balanced",
  title: "restStyle.quizTitle",
  resultLabel: "restStyle.resultLabel",
  eyebrow: "restStyle.eyebrow",
  sharePrompt: "restStyle.sharePrompt",
  estimatedMinutes: 2,
  url: "https://molgga.com/rest-style-test.html",
  questions: [
    { prompt: "restStyle.question.1", choices: [
      { text: "restStyle.answer.1.movement", scores: ["movement"] },
      { text: "restStyle.answer.1.connection", scores: ["connection"] },
      { text: "restStyle.answer.1.immersion", scores: ["immersion"] },
      { text: "restStyle.answer.1.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.1.quiet", scores: ["quiet"] }
    ] },
    { prompt: "restStyle.question.2", choices: [
      { text: "restStyle.answer.2.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.2.movement", scores: ["movement"] },
      { text: "restStyle.answer.2.connection", scores: ["connection"] },
      { text: "restStyle.answer.2.immersion", scores: ["immersion"] },
      { text: "restStyle.answer.2.novelty", scores: ["novelty"] }
    ] },
    { prompt: "restStyle.question.3", choices: [
      { text: "restStyle.answer.3.immersion", scores: ["immersion"] },
      { text: "restStyle.answer.3.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.3.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.3.movement", scores: ["movement"] },
      { text: "restStyle.answer.3.connection", scores: ["connection"] }
    ] },
    { prompt: "restStyle.question.4", choices: [
      { text: "restStyle.answer.4.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.4.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.4.movement", scores: ["movement"] },
      { text: "restStyle.answer.4.connection", scores: ["connection"] },
      { text: "restStyle.answer.4.immersion", scores: ["immersion"] }
    ] },
    { prompt: "restStyle.question.5", choices: [
      { text: "restStyle.answer.5.connection", scores: ["connection"] },
      { text: "restStyle.answer.5.immersion", scores: ["immersion"] },
      { text: "restStyle.answer.5.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.5.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.5.movement", scores: ["movement"] }
    ] },
    { prompt: "restStyle.question.6", choices: [
      { text: "restStyle.answer.6.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.6.movement", scores: ["movement"] },
      { text: "restStyle.answer.6.immersion", scores: ["immersion"] },
      { text: "restStyle.answer.6.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.6.connection", scores: ["connection"] }
    ] },
    { prompt: "restStyle.question.7", choices: [
      { text: "restStyle.answer.7.novelty", scores: ["novelty"] },
      { text: "restStyle.answer.7.connection", scores: ["connection"] },
      { text: "restStyle.answer.7.movement", scores: ["movement"] },
      { text: "restStyle.answer.7.quiet", scores: ["quiet"] },
      { text: "restStyle.answer.7.immersion", scores: ["immersion"] }
    ] }
  ],
  profiles: {
    quiet: {
      name: "restStyle.result.quiet.name", image: "../image/tests/rest-style/quiet-charge.png", color: "#527c65",
      catchphrase: "restStyle.result.quiet.catchphrase",
      description: "restStyle.result.quiet.description",
      shareDescription: "restStyle.shareSuffix",
      details: [
        { title: "restStyle.detail.goodTitle", text: "restStyle.result.quiet.good" },
        { title: "restStyle.detail.planTitle", text: "restStyle.result.quiet.plan" }
      ]
    },
    movement: {
      name: "restStyle.result.movement.name", image: "../image/tests/rest-style/movement-reset.png", color: "#438570",
      catchphrase: "restStyle.result.movement.catchphrase",
      description: "restStyle.result.movement.description",
      shareDescription: "restStyle.shareSuffix",
      details: [
        { title: "restStyle.detail.goodTitle", text: "restStyle.result.movement.good" },
        { title: "restStyle.detail.planTitle", text: "restStyle.result.movement.plan" }
      ]
    },
    connection: {
      name: "restStyle.result.connection.name", image: "../image/tests/rest-style/social-connection.png", color: "#b66f65",
      catchphrase: "restStyle.result.connection.catchphrase",
      description: "restStyle.result.connection.description",
      shareDescription: "restStyle.shareSuffix",
      details: [
        { title: "restStyle.detail.goodTitle", text: "restStyle.result.connection.good" },
        { title: "restStyle.detail.planTitle", text: "restStyle.result.connection.plan" }
      ]
    },
    immersion: {
      name: "restStyle.result.immersion.name", image: "../image/tests/rest-style/focused-hobby.png", color: "#657a9b",
      catchphrase: "restStyle.result.immersion.catchphrase",
      description: "restStyle.result.immersion.description",
      shareDescription: "restStyle.shareSuffix",
      details: [
        { title: "restStyle.detail.goodTitle", text: "restStyle.result.immersion.good" },
        { title: "restStyle.detail.planTitle", text: "restStyle.result.immersion.plan" }
      ]
    },
    novelty: {
      name: "restStyle.result.novelty.name", image: "../image/tests/rest-style/new-discovery.png", color: "#a78045",
      catchphrase: "restStyle.result.novelty.catchphrase",
      description: "restStyle.result.novelty.description",
      shareDescription: "restStyle.shareSuffix",
      details: [
        { title: "restStyle.detail.goodTitle", text: "restStyle.result.novelty.good" },
        { title: "restStyle.detail.planTitle", text: "restStyle.result.novelty.plan" }
      ]
    }
  }
};
