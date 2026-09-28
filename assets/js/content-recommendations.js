(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  if (!registry) return;

  const translate = (key) => window.MOA_I18N?.t(key) || key;
  const textElement = (tag, key, className) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.dataset.i18n = key;
    element.textContent = translate(key);
    return element;
  };

  window.MOLGGA_CONTENT_RECOMMENDATIONS = {
    mount(result, currentId) {
      const current = registry.contents.find((content) => content.id === currentId);
      if (!result || !current) return;
      result.querySelector("[data-related-content]")?.remove();

      const recommendations = registry.contents
        .filter((content) => content.id !== current.id)
        .map((content, index) => {
          const sharedCategories = content.categoryIds.filter((id) => current.categoryIds.includes(id)).length;
          const sharedTags = content.tagIds.filter((id) => current.tagIds.includes(id)).length;
          return { content, score: sharedCategories * 2 + sharedTags, index };
        })
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .slice(0, 3)
        .map(({ content }) => content);
      if (!recommendations.length) return;

      const section = document.createElement("section");
      section.className = "related-content";
      section.dataset.relatedContent = "";
      section.setAttribute("aria-labelledby", `related-content-title-${current.id}`);
      const heading = textElement("h2", "contentBrowser.recommendations.title", "related-content__title");
      heading.id = `related-content-title-${current.id}`;
      const description = textElement("p", "contentBrowser.recommendations.description", "related-content__description");
      const list = document.createElement("div");
      list.className = "related-content__grid";
      recommendations.forEach((content) => {
        const card = document.createElement("article");
        card.className = "related-content__card";
        const image = document.createElement("img");
        image.src = content.thumbnail;
        image.alt = "";
        image.loading = "lazy";
        const title = textElement("h3", content.titleKey);
        const copy = textElement("p", content.descriptionKey);
        const link = document.createElement("a");
        link.className = "button button-small button-quiet";
        link.href = content.page;
        link.append(textElement("span", "contentBrowser.recommendations.start"));
        card.append(image, title, copy, link);
        list.append(card);
      });
      section.append(heading, description, list);
      result.append(section);
      window.MOA_I18N?.translateTree(section);
    }
  };
})();
