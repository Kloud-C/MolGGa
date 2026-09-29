window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["romance-style"] = {
  title: "romanceStyle.title",
  eyebrow: "molgga PLAY · romanceStyle.eyebrow",
  estimatedMinutes: 4,
  resultLabel: "romanceStyle.resultLabel",
  url: "https://molgga.com/romance-style-test.html",
  questions: [
    { prompt: "romanceStyle.question.1", choices: [
      { text: "romanceStyle.question.1.a", scores: ["direct", "verbal"] },
      { text: "romanceStyle.question.1.b", scores: ["flirt", "observer"] },
      { text: "romanceStyle.question.1.c", scores: ["independent", "steady"] }
    ] },
    { prompt: "romanceStyle.question.2", choices: [
      { text: "romanceStyle.question.2.a", scores: ["direct", "devoted"] },
      { text: "romanceStyle.question.2.b", scores: ["playful", "flirt"] },
      { text: "romanceStyle.question.2.c", scores: ["observer", "realistic"] }
    ] },
    { prompt: "romanceStyle.question.3", choices: [
      { text: "romanceStyle.question.3.a", scores: ["verbal", "observer"] },
      { text: "romanceStyle.question.3.b", scores: ["thrill", "playful"] },
      { text: "romanceStyle.question.3.c", scores: ["steady", "realistic"] }
    ] },
    { prompt: "romanceStyle.question.4", choices: [
      { text: "romanceStyle.question.4.a", scores: ["direct", "mediator"] },
      { text: "romanceStyle.question.4.b", scores: ["independent", "steady"] },
      { text: "romanceStyle.question.4.c", scores: ["observer", "caregiver"] }
    ] },
    { prompt: "romanceStyle.question.5", choices: [
      { text: "romanceStyle.question.5.a", scores: ["verbal", "devoted"] },
      { text: "romanceStyle.question.5.b", scores: ["flirt", "playful"] },
      { text: "romanceStyle.question.5.c", scores: ["caregiver", "steady"] }
    ] },
    { prompt: "romanceStyle.question.6", choices: [
      { text: "romanceStyle.question.6.a", scores: ["mediator", "direct"] },
      { text: "romanceStyle.question.6.b", scores: ["flirt", "observer"] },
      { text: "romanceStyle.question.6.c", scores: ["steady", "independent"] }
    ] },
    { prompt: "romanceStyle.question.7", choices: [
      { text: "romanceStyle.question.7.a", scores: ["mediator", "caregiver"] },
      { text: "romanceStyle.question.7.b", scores: ["independent", "realistic"] },
      { text: "romanceStyle.question.7.c", scores: ["devoted", "direct"] }
    ] },
    { prompt: "romanceStyle.question.8", choices: [
      { text: "romanceStyle.question.8.a", scores: ["realistic", "steady"] },
      { text: "romanceStyle.question.8.b", scores: ["thrill", "independent"] },
      { text: "romanceStyle.question.8.c", scores: ["verbal", "playful"] }
    ] },
    { prompt: "romanceStyle.question.9", choices: [
      { text: "romanceStyle.question.9.a", scores: ["caregiver", "devoted"] },
      { text: "romanceStyle.question.9.b", scores: ["mediator", "observer"] },
      { text: "romanceStyle.question.9.c", scores: ["playful", "thrill"] }
    ] },
    { prompt: "romanceStyle.question.10", choices: [
      { text: "romanceStyle.question.10.a", scores: ["direct", "mediator"] },
      { text: "romanceStyle.question.10.b", scores: ["observer", "realistic"] },
      { text: "romanceStyle.question.10.c", scores: ["playful", "verbal"] }
    ] },
    { prompt: "romanceStyle.question.11", choices: [
      { text: "romanceStyle.question.11.a", scores: ["mediator", "caregiver"] },
      { text: "romanceStyle.question.11.b", scores: ["flirt", "independent"] },
      { text: "romanceStyle.question.11.c", scores: ["devoted", "direct"] }
    ] },
    { prompt: "romanceStyle.question.12", choices: [
      { text: "romanceStyle.question.12.a", scores: ["devoted", "thrill"] },
      { text: "romanceStyle.question.12.b", scores: ["realistic", "steady"] },
      { text: "romanceStyle.question.12.c", scores: ["thrill", "playful"] }
    ] },
    { prompt: "romanceStyle.question.13", choices: [
      { text: "romanceStyle.question.13.a", scores: ["direct", "verbal"] },
      { text: "romanceStyle.question.13.b", scores: ["flirt", "observer"] },
      { text: "romanceStyle.question.13.c", scores: ["caregiver", "observer"] }
    ] },
    { prompt: "romanceStyle.question.14", choices: [
      { text: "romanceStyle.question.14.a", scores: ["thrill", "independent"] },
      { text: "romanceStyle.question.14.b", scores: ["steady", "caregiver"] },
      { text: "romanceStyle.question.14.c", scores: ["verbal", "mediator"] }
    ] },
    { prompt: "romanceStyle.question.15", choices: [
      { text: "romanceStyle.question.15.a", scores: ["realistic", "mediator"] },
      { text: "romanceStyle.question.15.b", scores: ["devoted", "verbal"] },
      { text: "romanceStyle.question.15.c", scores: ["independent", "steady"] }
    ] }
  ],
  profiles: {
    direct: { name: "romanceStyle.profile.direct.name", imageFile: "../image/tests/romance-style/direct.jpg", color: "#bf654c", catchphrase: "romanceStyle.profile.direct.catchphrase", description: "romanceStyle.profile.direct.description", good: ["steady"], tricky: ["flirt"] },
    flirt: { name: "romanceStyle.profile.flirt.name", imageFile: "../image/tests/romance-style/flirt.jpg", color: "#9c6a9d", catchphrase: "romanceStyle.profile.flirt.catchphrase", description: "romanceStyle.profile.flirt.description", good: ["direct"], tricky: ["observer"] },
    observer: { name: "romanceStyle.profile.observer.name", imageFile: "../image/tests/romance-style/observer.jpg", color: "#638391", catchphrase: "romanceStyle.profile.observer.catchphrase", description: "romanceStyle.profile.observer.description", good: ["steady"], tricky: ["direct"] },
    devoted: { name: "romanceStyle.profile.devoted.name", imageFile: "../image/tests/romance-style/devoted.jpg", color: "#c66d83", catchphrase: "romanceStyle.profile.devoted.catchphrase", description: "romanceStyle.profile.devoted.description", good: ["caregiver"], tricky: ["independent"] },
    steady: { name: "romanceStyle.profile.steady.name", imageFile: "../image/tests/romance-style/steady.jpg", color: "#638b68", catchphrase: "romanceStyle.profile.steady.catchphrase", description: "romanceStyle.profile.steady.description", good: ["observer"], tricky: ["thrill"] },
    independent: { name: "romanceStyle.profile.independent.name", imageFile: "../image/tests/romance-style/independent.jpg", color: "#547d9a", catchphrase: "romanceStyle.profile.independent.catchphrase", description: "romanceStyle.profile.independent.description", good: ["steady"], tricky: ["devoted"] },
    verbal: { name: "romanceStyle.profile.verbal.name", imageFile: "../image/tests/romance-style/verbal.jpg", color: "#b47c52", catchphrase: "romanceStyle.profile.verbal.catchphrase", description: "romanceStyle.profile.verbal.description", good: ["mediator"], tricky: ["independent"] },
    caregiver: { name: "romanceStyle.profile.caregiver.name", imageFile: "../image/tests/romance-style/caregiver.jpg", color: "#678b76", catchphrase: "romanceStyle.profile.caregiver.catchphrase", description: "romanceStyle.profile.caregiver.description", good: ["devoted"], tricky: ["realistic"] },
    playful: { name: "romanceStyle.profile.playful.name", imageFile: "../image/tests/romance-style/playful.jpg", color: "#cf8b45", catchphrase: "romanceStyle.profile.playful.catchphrase", description: "romanceStyle.profile.playful.description", good: ["verbal"], tricky: ["observer"] },
    thrill: { name: "romanceStyle.profile.thrill.name", imageFile: "../image/tests/romance-style/thrill-seeker.jpg", color: "#d16c5b", catchphrase: "romanceStyle.profile.thrill.catchphrase", description: "romanceStyle.profile.thrill.description", good: ["independent"], tricky: ["steady"] },
    mediator: { name: "romanceStyle.profile.mediator.name", imageFile: "../image/tests/romance-style/mediator.jpg", color: "#71865e", catchphrase: "romanceStyle.profile.mediator.catchphrase", description: "romanceStyle.profile.mediator.description", good: ["verbal"], tricky: ["direct"] },
    realistic: { name: "romanceStyle.profile.realistic.name", imageFile: "../image/tests/romance-style/realistic.jpg", color: "#647b72", catchphrase: "romanceStyle.profile.realistic.catchphrase", description: "romanceStyle.profile.realistic.description", good: ["steady"], tricky: ["thrill"] }
  }
};
