window.MOA_ARCHETYPE_TESTS = window.MOA_ARCHETYPE_TESTS || {};
window.MOA_ARCHETYPE_TESTS["fantasy-shop"] = {
  storyMode: true,
  title: "shopStory.title",
  sharePrompt: "shopStory.sharePrompt",
  eyebrow: "shopStory.eyebrow",
  estimatedMinutes: 4,
  resultLabel: "shopStory.resultLabel",
  url: "https://molgga.com/fantasy-shop-test.html",
  story: {
    startTitle: "shopStory.startTitle",
    intro: ["shopStory.intro.1", "shopStory.intro.2", "shopStory.intro.3"],
    startButton: "shopStory.startButton",
    startImage: "../image/tests/fantasy-shop/start.webp",
    startImageAlt: "shopStory.startImageAlt",
    previousButton: "shopStory.previousButton",
    resultNameTemplate: "shopStory.resultNameTemplate",
    locations: {
      road: "shopStory.location.road",
      square: "shopStory.location.square",
      bookshop: "shopStory.location.bookshop",
      forest: "shopStory.location.forest"
    }
  },
  questions: [
    { title: "shopStory.scene.1.title", situation: "shopStory.scene.1.situation", prompt: "shopStory.scene.1.prompt", image: "../image/tests/fantasy-shop/scene-01-location.webp", imageAlt: "shopStory.scene.1.imageAlt", choices: [
      { text: "shopStory.scene.1.choice.a", reaction: "shopStory.scene.1.reaction.a", locationId: "road", scores: [{ id: "inn", weight: 1 }, { id: "general-store", weight: 1 }] },
      { text: "shopStory.scene.1.choice.b", reaction: "shopStory.scene.1.reaction.b", locationId: "square", scores: [{ id: "general-store", weight: 1 }, { id: "tea-shop", weight: 1 }] },
      { text: "shopStory.scene.1.choice.c", reaction: "shopStory.scene.1.reaction.c", locationId: "bookshop", scores: [{ id: "magic-tool-shop", weight: 1 }, { id: "repair-workshop", weight: 1 }] },
      { text: "shopStory.scene.1.choice.d", reaction: "shopStory.scene.1.reaction.d", locationId: "forest", scores: [{ id: "herb-shop", weight: 1 }, { id: "tea-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.2.title", situation: "shopStory.scene.2.situation", prompt: "shopStory.scene.2.prompt", image: "../image/tests/fantasy-shop/scene-02-left-behind.webp", imageAlt: "shopStory.scene.2.imageAlt", choices: [
      { text: "shopStory.scene.2.choice.a", reaction: "shopStory.scene.2.reaction.a", scores: [{ id: "inn", weight: 2 }, { id: "tea-shop", weight: 1 }] },
      { text: "shopStory.scene.2.choice.b", reaction: "shopStory.scene.2.reaction.b", scores: [{ id: "general-store", weight: 2 }, { id: "magic-tool-shop", weight: 1 }] },
      { text: "shopStory.scene.2.choice.c", reaction: "shopStory.scene.2.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }, { id: "general-store", weight: 1 }] },
      { text: "shopStory.scene.2.choice.d", reaction: "shopStory.scene.2.reaction.d", scores: [{ id: "herb-shop", weight: 2 }, { id: "tea-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.3.title", situation: "shopStory.scene.3.situation", prompt: "shopStory.scene.3.prompt", image: "../image/tests/fantasy-shop/scene-03-market.webp", imageAlt: "shopStory.scene.3.imageAlt", choices: [
      { text: "shopStory.scene.3.choice.a", reaction: "shopStory.scene.3.reaction.a", scores: [{ id: "tea-shop", weight: 2 }, { id: "inn", weight: 1 }] },
      { text: "shopStory.scene.3.choice.b", reaction: "shopStory.scene.3.reaction.b", scores: [{ id: "general-store", weight: 2 }] },
      { text: "shopStory.scene.3.choice.c", reaction: "shopStory.scene.3.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }] },
      { text: "shopStory.scene.3.choice.d", reaction: "shopStory.scene.3.reaction.d", scores: [{ id: "herb-shop", weight: 2 }, { id: "magic-tool-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.4.title", situation: "shopStory.scene.4.situation", prompt: "shopStory.scene.4.prompt", image: "../image/tests/fantasy-shop/scene-04-small-magic.webp", imageAlt: "shopStory.scene.4.imageAlt", choices: [
      { text: "shopStory.scene.4.choice.a", reaction: "shopStory.scene.4.reaction.a", scores: [{ id: "tea-shop", weight: 2 }, { id: "inn", weight: 1 }] },
      { text: "shopStory.scene.4.choice.b", reaction: "shopStory.scene.4.reaction.b", scores: [{ id: "magic-tool-shop", weight: 2 }, { id: "general-store", weight: 1 }] },
      { text: "shopStory.scene.4.choice.c", reaction: "shopStory.scene.4.reaction.c", scores: [{ id: "magic-tool-shop", weight: 2 }, { id: "repair-workshop", weight: 1 }] },
      { text: "shopStory.scene.4.choice.d", reaction: "shopStory.scene.4.reaction.d", scores: [{ id: "herb-shop", weight: 2 }, { id: "magic-tool-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.5.title", situation: "shopStory.scene.5.situation", prompt: "shopStory.scene.5.prompt", image: "../image/tests/fantasy-shop/scene-05-first-visitor.webp", imageAlt: "shopStory.scene.5.imageAlt", choices: [
      { text: "shopStory.scene.5.choice.a", reaction: "shopStory.scene.5.reaction.a", scores: [{ id: "tea-shop", weight: 2 }, { id: "inn", weight: 1 }] },
      { text: "shopStory.scene.5.choice.b", reaction: "shopStory.scene.5.reaction.b", scores: [{ id: "general-store", weight: 2 }, { id: "inn", weight: 1 }] },
      { text: "shopStory.scene.5.choice.c", reaction: "shopStory.scene.5.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }] },
      { text: "shopStory.scene.5.choice.d", reaction: "shopStory.scene.5.reaction.d", scores: [{ id: "inn", weight: 2 }, { id: "tea-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.6.title", situation: "shopStory.scene.6.situation", prompt: "shopStory.scene.6.prompt", image: "../image/tests/fantasy-shop/scene-06-sign.webp", imageAlt: "shopStory.scene.6.imageAlt", choices: [
      { text: "shopStory.scene.6.choice.a", reaction: "shopStory.scene.6.reaction.a", scores: [{ id: "inn", weight: 2 }, { id: "tea-shop", weight: 1 }] },
      { text: "shopStory.scene.6.choice.b", reaction: "shopStory.scene.6.reaction.b", scores: [{ id: "magic-tool-shop", weight: 2 }, { id: "general-store", weight: 1 }] },
      { text: "shopStory.scene.6.choice.c", reaction: "shopStory.scene.6.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }] },
      { text: "shopStory.scene.6.choice.d", reaction: "shopStory.scene.6.reaction.d", scores: [{ id: "herb-shop", weight: 2 }, { id: "magic-tool-shop", weight: 1 }] }
    ] },
    { title: "shopStory.scene.7.title", situation: "shopStory.scene.7.situation", prompt: "shopStory.scene.7.prompt", image: "../image/tests/fantasy-shop/scene-07-closing.webp", imageAlt: "shopStory.scene.7.imageAlt", choices: [
      { text: "shopStory.scene.7.choice.a", reaction: "shopStory.scene.7.reaction.a", scores: [{ id: "inn", weight: 1 }, { id: "tea-shop", weight: 2 }] },
      { text: "shopStory.scene.7.choice.b", reaction: "shopStory.scene.7.reaction.b", scores: [{ id: "general-store", weight: 2 }] },
      { text: "shopStory.scene.7.choice.c", reaction: "shopStory.scene.7.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }, { id: "magic-tool-shop", weight: 1 }] },
      { text: "shopStory.scene.7.choice.d", reaction: "shopStory.scene.7.reaction.d", scores: [{ id: "herb-shop", weight: 2 }] }
    ] },
    { title: "shopStory.scene.8.title", situation: "shopStory.scene.8.situation", prompt: "shopStory.scene.8.prompt", image: "../image/tests/fantasy-shop/scene-08-returning-visitor.webp", imageAlt: "shopStory.scene.8.imageAlt", choices: [
      { text: "shopStory.scene.8.choice.a", reaction: "shopStory.scene.8.reaction.a", scores: [{ id: "inn", weight: 2 }, { id: "tea-shop", weight: 1 }] },
      { text: "shopStory.scene.8.choice.b", reaction: "shopStory.scene.8.reaction.b", scores: [{ id: "general-store", weight: 2 }] },
      { text: "shopStory.scene.8.choice.c", reaction: "shopStory.scene.8.reaction.c", scores: [{ id: "repair-workshop", weight: 2 }, { id: "general-store", weight: 1 }] },
      { text: "shopStory.scene.8.choice.d", reaction: "shopStory.scene.8.reaction.d", scores: [{ id: "general-store", weight: 2 }] }
    ] }
  ],
  profiles: {
    inn: {
      name: "shopStory.profile.inn.name", imageFile: "../image/tests/fantasy-shop/inn.webp", color: "#b7774e",
      catchphrase: "shopStory.profile.inn.catchphrase", description: "shopStory.profile.inn.description", shareDescription: "shopStory.profile.inn.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.inn.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.inn.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.inn.scenery" }
      ]
    },
    "general-store": {
      name: "shopStory.profile.generalStore.name", imageFile: "../image/tests/fantasy-shop/general-store.webp", color: "#8d9a58",
      catchphrase: "shopStory.profile.generalStore.catchphrase", description: "shopStory.profile.generalStore.description", shareDescription: "shopStory.profile.generalStore.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.generalStore.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.generalStore.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.generalStore.scenery" }
      ]
    },
    "repair-workshop": {
      name: "shopStory.profile.repairWorkshop.name", imageFile: "../image/tests/fantasy-shop/repair-workshop.webp", color: "#9b6d4b",
      catchphrase: "shopStory.profile.repairWorkshop.catchphrase", description: "shopStory.profile.repairWorkshop.description", shareDescription: "shopStory.profile.repairWorkshop.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.repairWorkshop.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.repairWorkshop.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.repairWorkshop.scenery" }
      ]
    },
    "herb-shop": {
      name: "shopStory.profile.herbShop.name", imageFile: "../image/tests/fantasy-shop/herb-shop.webp", color: "#658352",
      catchphrase: "shopStory.profile.herbShop.catchphrase", description: "shopStory.profile.herbShop.description", shareDescription: "shopStory.profile.herbShop.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.herbShop.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.herbShop.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.herbShop.scenery" }
      ]
    },
    "magic-tool-shop": {
      name: "shopStory.profile.magicToolShop.name", imageFile: "../image/tests/fantasy-shop/magic-tool-shop.webp", color: "#7a70a5",
      catchphrase: "shopStory.profile.magicToolShop.catchphrase", description: "shopStory.profile.magicToolShop.description", shareDescription: "shopStory.profile.magicToolShop.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.magicToolShop.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.magicToolShop.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.magicToolShop.scenery" }
      ]
    },
    "tea-shop": {
      name: "shopStory.profile.teaShop.name", imageFile: "../image/tests/fantasy-shop/tea-shop.webp", color: "#779276",
      catchphrase: "shopStory.profile.teaShop.catchphrase", description: "shopStory.profile.teaShop.description", shareDescription: "shopStory.profile.teaShop.shareDescription",
      details: [
        { title: "shopStory.detail.offering", text: "shopStory.profile.teaShop.offering" },
        { title: "shopStory.detail.regular", text: "shopStory.profile.teaShop.regular" },
        { title: "shopStory.detail.scenery", text: "shopStory.profile.teaShop.scenery" }
      ]
    }
  }
};
