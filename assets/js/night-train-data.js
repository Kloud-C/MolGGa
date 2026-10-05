window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};

const nightTrainChoice = (text, reaction, resultId, weight = 1) => ({
  text,
  reaction,
  scores: [{ id: resultId, weight }]
});

window.MOA_ARCHETYPE_TESTS["night-train"] = {
  answerPositionPolicy: "balanced",
  storyMode: true,
  title: "nightTrain.title",
  sharePrompt: "nightTrain.sharePrompt",
  eyebrow: "nightTrain.eyebrow",
  estimatedMinutes: 4,
  resultLabel: "nightTrain.resultLabel",
  url: "https://molgga.com/ko/night-train-test.html",
  balanceResultExposure: true,
  story: {
    showFinalReactionInResult: true,
    startTitle: "nightTrain.startTitle",
    intro: ["nightTrain.intro.1", "nightTrain.intro.2", "nightTrain.intro.3"],
    startButton: "nightTrain.startButton",
    startImage: "../image/tests/night-train/start.webp",
    startImageAlt: "nightTrain.startImageAlt",
    previousButton: "nightTrain.previousButton",
    resultNameTemplate: "nightTrain.resultNameTemplate",
    resultImageAlt: "nightTrain.resultImageAlt"
  },
  questions: [
    {
      title: "nightTrain.scene.1.title",
      situation: "nightTrain.scene.1.situation",
      prompt: "nightTrain.scene.1.prompt",
      image: "../image/tests/night-train/scene-01.webp",
      imageAlt: "nightTrain.scene.1.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.1.choice.b", "nightTrain.scene.1.reaction.b", "clock"),
        nightTrainChoice("nightTrain.scene.1.choice.c", "nightTrain.scene.1.reaction.c", "market"),
        nightTrainChoice("nightTrain.scene.1.choice.d", "nightTrain.scene.1.reaction.d", "greenhouse"),
        nightTrainChoice("nightTrain.scene.1.choice.a", "nightTrain.scene.1.reaction.a", "harbor")
      ]
    },
    {
      title: "nightTrain.scene.2.title",
      situation: "nightTrain.scene.2.situation",
      prompt: "nightTrain.scene.2.prompt",
      image: "../image/tests/night-train/scene-02.webp",
      imageAlt: "nightTrain.scene.2.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.2.choice.c", "nightTrain.scene.2.reaction.c", "market"),
        nightTrainChoice("nightTrain.scene.2.choice.d", "nightTrain.scene.2.reaction.d", "snow"),
        nightTrainChoice("nightTrain.scene.2.choice.a", "nightTrain.scene.2.reaction.a", "harbor"),
        nightTrainChoice("nightTrain.scene.2.choice.b", "nightTrain.scene.2.reaction.b", "forest")
      ]
    },
    {
      title: "nightTrain.scene.3.title",
      situation: "nightTrain.scene.3.situation",
      prompt: "nightTrain.scene.3.prompt",
      image: "../image/tests/night-train/scene-03.webp",
      imageAlt: "nightTrain.scene.3.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.3.choice.d", "nightTrain.scene.3.reaction.d", "greenhouse"),
        nightTrainChoice("nightTrain.scene.3.choice.a", "nightTrain.scene.3.reaction.a", "harbor"),
        nightTrainChoice("nightTrain.scene.3.choice.b", "nightTrain.scene.3.reaction.b", "forest"),
        nightTrainChoice("nightTrain.scene.3.choice.c", "nightTrain.scene.3.reaction.c", "market")
      ]
    },
    {
      title: "nightTrain.scene.4.title",
      situation: "nightTrain.scene.4.situation",
      prompt: "nightTrain.scene.4.prompt",
      image: "../image/tests/night-train/scene-04.webp",
      imageAlt: "nightTrain.scene.4.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.4.choice.a", "nightTrain.scene.4.reaction.a", "snow"),
        nightTrainChoice("nightTrain.scene.4.choice.b", "nightTrain.scene.4.reaction.b", "greenhouse"),
        nightTrainChoice("nightTrain.scene.4.choice.c", "nightTrain.scene.4.reaction.c", "market"),
        nightTrainChoice("nightTrain.scene.4.choice.d", "nightTrain.scene.4.reaction.d", "harbor")
      ]
    },
    {
      title: "nightTrain.scene.5.title",
      situation: "nightTrain.scene.5.situation",
      prompt: "nightTrain.scene.5.prompt",
      image: "../image/tests/night-train/scene-05.webp",
      imageAlt: "nightTrain.scene.5.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.5.choice.a", "nightTrain.scene.5.reaction.a", "forest"),
        nightTrainChoice("nightTrain.scene.5.choice.b", "nightTrain.scene.5.reaction.b", "clock"),
        nightTrainChoice("nightTrain.scene.5.choice.c", "nightTrain.scene.5.reaction.c", "market"),
        nightTrainChoice("nightTrain.scene.5.choice.d", "nightTrain.scene.5.reaction.d", "greenhouse")
      ]
    },
    {
      title: "nightTrain.scene.6.title",
      situation: "nightTrain.scene.6.situation",
      prompt: "nightTrain.scene.6.prompt",
      image: "../image/tests/night-train/scene-06.webp",
      imageAlt: "nightTrain.scene.6.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.6.choice.a", "nightTrain.scene.6.reaction.a", "forest"),
        nightTrainChoice("nightTrain.scene.6.choice.b", "nightTrain.scene.6.reaction.b", "market"),
        nightTrainChoice("nightTrain.scene.6.choice.c", "nightTrain.scene.6.reaction.c", "clock"),
        nightTrainChoice("nightTrain.scene.6.choice.d", "nightTrain.scene.6.reaction.d", "snow")
      ]
    },
    {
      title: "nightTrain.scene.7.title",
      situation: "nightTrain.scene.7.situation",
      prompt: "nightTrain.scene.7.prompt",
      image: "../image/tests/night-train/scene-07.webp",
      imageAlt: "nightTrain.scene.7.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.7.choice.c", "nightTrain.scene.7.reaction.c", "market"),
        nightTrainChoice("nightTrain.scene.7.choice.d", "nightTrain.scene.7.reaction.d", "clock"),
        nightTrainChoice("nightTrain.scene.7.choice.a", "nightTrain.scene.7.reaction.a", "snow"),
        nightTrainChoice("nightTrain.scene.7.choice.b", "nightTrain.scene.7.reaction.b", "forest")
      ]
    },
    {
      title: "nightTrain.scene.8.title",
      situation: "nightTrain.scene.8.situation",
      prompt: "nightTrain.scene.8.prompt",
      image: "../image/tests/night-train/scene-08.webp",
      imageAlt: "nightTrain.scene.8.imageAlt",
      choices: [
        nightTrainChoice("nightTrain.scene.8.choice.a", "nightTrain.scene.8.reaction.a", "harbor", 2),
        nightTrainChoice("nightTrain.scene.8.choice.b", "nightTrain.scene.8.reaction.b", "forest", 2),
        nightTrainChoice("nightTrain.scene.8.choice.c", "nightTrain.scene.8.reaction.c", "market", 2),
        nightTrainChoice("nightTrain.scene.8.choice.d", "nightTrain.scene.8.reaction.d", "clock", 2)
      ]
    }
  ],
  profiles: {
    harbor: {
      name: "nightTrain.result.harbor.name",
      imageFile: "../image/tests/night-train/result-harbor.webp",
      imageAlt: "nightTrain.result.harbor.imageAlt",
      color: "#527d8d",
      catchphrase: "nightTrain.result.harbor.catchphrase",
      description: "nightTrain.result.harbor.description",
      shareDescription: "nightTrain.result.harbor.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.harbor.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.harbor.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.harbor.afterArrival" }
      ]
    },
    forest: {
      name: "nightTrain.result.forest.name",
      imageFile: "../image/tests/night-train/result-forest.webp",
      imageAlt: "nightTrain.result.forest.imageAlt",
      color: "#637d61",
      catchphrase: "nightTrain.result.forest.catchphrase",
      description: "nightTrain.result.forest.description",
      shareDescription: "nightTrain.result.forest.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.forest.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.forest.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.forest.afterArrival" }
      ]
    },
    market: {
      name: "nightTrain.result.market.name",
      imageFile: "../image/tests/night-train/result-market.webp",
      imageAlt: "nightTrain.result.market.imageAlt",
      color: "#a56f42",
      catchphrase: "nightTrain.result.market.catchphrase",
      description: "nightTrain.result.market.description",
      shareDescription: "nightTrain.result.market.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.market.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.market.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.market.afterArrival" }
      ]
    },
    snow: {
      name: "nightTrain.result.snow.name",
      imageFile: "../image/tests/night-train/result-snow.webp",
      imageAlt: "nightTrain.result.snow.imageAlt",
      color: "#66849a",
      catchphrase: "nightTrain.result.snow.catchphrase",
      description: "nightTrain.result.snow.description",
      shareDescription: "nightTrain.result.snow.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.snow.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.snow.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.snow.afterArrival" }
      ]
    },
    greenhouse: {
      name: "nightTrain.result.greenhouse.name",
      imageFile: "../image/tests/night-train/result-greenhouse.webp",
      imageAlt: "nightTrain.result.greenhouse.imageAlt",
      color: "#6d906d",
      catchphrase: "nightTrain.result.greenhouse.catchphrase",
      description: "nightTrain.result.greenhouse.description",
      shareDescription: "nightTrain.result.greenhouse.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.greenhouse.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.greenhouse.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.greenhouse.afterArrival" }
      ]
    },
    clock: {
      name: "nightTrain.result.clock.name",
      imageFile: "../image/tests/night-train/result-clock.webp",
      imageAlt: "nightTrain.result.clock.imageAlt",
      color: "#8a705c",
      catchphrase: "nightTrain.result.clock.catchphrase",
      description: "nightTrain.result.clock.description",
      shareDescription: "nightTrain.result.clock.shareDescription",
      details: [
        { title: "nightTrain.detail.station", text: "nightTrain.result.clock.station" },
        { title: "nightTrain.detail.people", text: "nightTrain.result.clock.people" },
        { title: "nightTrain.detail.afterArrival", text: "nightTrain.result.clock.afterArrival" }
      ]
    }
  }
};
