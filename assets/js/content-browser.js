(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const mount = document.querySelector("[data-content-browser]");
  const grid = document.querySelector("[data-category-list]");
  if (!registry || !mount || !grid) return;

  const storageKey = "molgga.contentViewMode";
  const allowedViews = ["grid", "compact", "list"];
  const translate = (key, options) => window.MOA_I18N?.t(key, options) || key;
  const localPageName = (href) => {
    try { return new URL(href, window.location.href).pathname.split("/").pop(); }
    catch { return ""; }
  };
  const cardsById = new Map();

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const makeCard = (content) => {
    const card = make("article", "category-card");
    const icon = make("span", "card-icon card-icon--image");
    icon.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.className = "card-icon__image";
    image.src = content.thumbnail;
    image.alt = "";
    image.loading = "lazy";
    icon.append(image);
    const label = make("span", "card-label");
    label.dataset.i18n = registry.categories.find((category) => content.categoryIds.includes(category.id))?.labelKey || "contentBrowser.card.category";
    const heading = make("h3");
    const headingText = make("span", "", translate(content.titleKey));
    headingText.dataset.i18n = content.titleKey;
    heading.append(headingText);
    const description = make("p");
    const descriptionText = make("span", "", translate(content.descriptionKey));
    descriptionText.dataset.i18n = content.descriptionKey;
    description.append(descriptionText);
    const link = make("a", "button button-small");
    link.href = content.page;
    link.dataset.contentStart = content.id;
    const actionText = make("span", "", translate(content.type === "worldcup" ? "월드컵 시작" : "테스트하기"));
    actionText.dataset.i18n = content.type === "worldcup" ? "월드컵 시작" : "테스트하기";
    link.append(actionText);
    const arrow = make("span", "", " →");
    arrow.setAttribute("aria-hidden", "true");
    link.append(arrow);
    card.append(icon, label, heading, description, link);
    return card;
  };

  registry.contents.forEach((content) => {
    let card = [...grid.querySelectorAll(".category-card")].find((candidate) => localPageName(candidate.querySelector("a[href]")?.getAttribute("href")) === content.page);
    if (!card) {
      card = makeCard(content);
      grid.append(card);
    }
    card.dataset.contentId = content.id;
    card.dataset.category = content.categoryIds[0];
    card.dataset.categoryIds = content.categoryIds.join(" ");
    card.dataset.tagIds = content.tagIds.join(" ");
    const heading = card.querySelector("h3");
    const description = card.querySelector("p");
    if (heading) {
      let text = heading.querySelector("[data-i18n]");
      if (!text) {
        text = make("span", "", translate(content.titleKey));
        heading.replaceChildren(text);
      }
      text.dataset.i18n = content.titleKey;
    }
    if (description) {
      let text = description.querySelector("[data-i18n]");
      if (!text) {
        text = make("span", "", translate(content.descriptionKey));
        description.replaceChildren(text);
      }
      text.dataset.i18n = content.descriptionKey;
    }
    const link = card.querySelector("a[href]");
    if (link) {
      link.dataset.contentStart = content.id;
      link.href = content.page;
    }
    let metrics = card.querySelector(".category-card__metrics");
    if (!metrics) {
      metrics = make("p", "category-card__metrics");
      metrics.setAttribute("aria-label", translate("contentBrowser.metrics.label"));
      description?.after(metrics);
    }
    metrics.dataset.contentMetrics = content.id;
    cardsById.set(content.id, card);
  });

  const searchLabel = make("label", "content-browser__search");
  searchLabel.append(make("span", "content-browser__field-label", translate("contentBrowser.search.label")));
  const search = document.createElement("input");
  search.type = "search";
  search.autocomplete = "off";
  search.dataset.i18nPlaceholder = "contentBrowser.search.placeholder";
  search.placeholder = translate("contentBrowser.search.placeholder");
  search.setAttribute("aria-label", translate("contentBrowser.search.label"));
  searchLabel.append(search);

  const categoryLabel = make("label", "content-browser__category");
  categoryLabel.append(make("span", "content-browser__field-label", translate("contentBrowser.category.label")));
  const categorySelect = document.createElement("select");
  categorySelect.setAttribute("aria-label", translate("contentBrowser.category.label"));
  categoryLabel.append(categorySelect);

  const viewGroup = make("div", "content-browser__views");
  viewGroup.setAttribute("role", "group");
  viewGroup.setAttribute("aria-label", translate("contentBrowser.view.label"));
  const viewButtons = new Map();
  const viewLabels = { grid: "contentBrowser.view.grid", compact: "contentBrowser.view.compact", list: "contentBrowser.view.list" };
  allowedViews.forEach((mode) => {
    const button = make("button", "content-browser__view-button", translate(viewLabels[mode]));
    button.type = "button";
    button.dataset.viewMode = mode;
    button.setAttribute("aria-pressed", "false");
    viewGroup.append(button);
    viewButtons.set(mode, button);
  });

  const toolbar = make("div", "content-browser__toolbar");
  toolbar.append(searchLabel, categoryLabel, viewGroup);
  const status = make("p", "content-browser__status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const reset = make("button", "button button-small button-quiet content-browser__reset", translate("contentBrowser.results.reset"));
  reset.type = "button";
  reset.dataset.contentReset = "true";
  mount.replaceChildren(toolbar, status, reset);

  const dialog = make("dialog", "content-preview-dialog");
  dialog.setAttribute("aria-labelledby", "content-preview-title");
  dialog.setAttribute("aria-describedby", "content-preview-description");
  const dialogContent = make("div", "content-preview-dialog__content");
  const close = make("button", "content-preview-dialog__close", "×");
  close.type = "button";
  close.setAttribute("aria-label", translate("contentBrowser.preview.close"));
  const dialogEyebrow = make("p", "eyebrow-text", translate("contentBrowser.preview.label"));
  const dialogTitle = make("h2");
  dialogTitle.id = "content-preview-title";
  const dialogDescription = make("p", "content-preview-dialog__description");
  dialogDescription.id = "content-preview-description";
  const dialogMeta = make("ul", "content-preview-dialog__meta");
  const dialogPool = make("p", "content-preview-dialog__pool");
  const dialogActions = make("div", "content-preview-dialog__actions");
  const cancel = make("button", "button button-quiet", translate("contentBrowser.preview.cancel"));
  cancel.type = "button";
  const start = make("a", "button", translate("contentBrowser.preview.start"));
  dialogActions.append(cancel, start);
  dialogContent.append(close, dialogEyebrow, dialogTitle, dialogDescription, dialogMeta, dialogPool, dialogActions);
  dialog.append(dialogContent);
  document.body.append(dialog);

  let activeView = "grid";
  let activePreview = null;
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (allowedViews.includes(saved)) activeView = saved;
  } catch { /* Storage can be unavailable in private browsing. */ }

  const getTranslatedCategory = (category) => translate(category.labelKey);
  const refreshCategoryOptions = () => {
    const previous = categorySelect.value;
    categorySelect.replaceChildren();
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = translate("contentBrowser.category.all");
    categorySelect.append(all);
    registry.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = getTranslatedCategory(category);
      categorySelect.append(option);
    });
    if ([...categorySelect.options].some((option) => option.value === previous)) categorySelect.value = previous;
  };

  const metricText = (content) => {
    const metrics = content.metrics;
    if (content.type === "worldcup") {
      return translate("contentBrowser.metrics.worldcup", {
        rounds: metrics.availableBrackets.join(" / "),
        minutes: `${Math.min(...Object.values(metrics.estimatedMinutesByBracket))}–${Math.max(...Object.values(metrics.estimatedMinutesByBracket))}`
      });
    }
    return translate("contentBrowser.metrics.quiz", {
      count: metrics.questionCount,
      choices: metrics.choicesPerQuestion,
      minutes: metrics.estimatedMinutes
    });
  };

  const updateCards = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedCategory = categorySelect.value || "all";
    let visibleCount = 0;
    registry.contents.forEach((content) => {
      const card = cardsById.get(content.id);
      if (!card) return;
      const categoryText = content.categoryIds.map((id) => registry.categories.find((entry) => entry.id === id)).filter(Boolean).map(getTranslatedCategory).join(" ");
      const tagText = content.tagIds.map((id) => translate(`tag.${id}`)).join(" ");
      const searchableText = [translate(content.titleKey), translate(content.descriptionKey), categoryText, tagText, ...content.tagIds].join(" ").toLocaleLowerCase();
      const matchesCategory = selectedCategory === "all" || content.categoryIds.includes(selectedCategory);
      const matchesSearch = !query || searchableText.includes(query);
      card.hidden = !(matchesCategory && matchesSearch);
      card.classList.toggle("category-card--compact", activeView === "compact");
      if (!card.hidden) visibleCount += 1;
      const metric = card.querySelector("[data-content-metrics]");
      if (metric) metric.textContent = metricText(content);
      const link = card.querySelector("[data-content-start]");
      if (link) link.setAttribute("aria-label", `${translate("contentBrowser.preview.actionLabel")} · ${translate(content.titleKey)}`);
    });
    grid.dataset.view = activeView;
    viewButtons.forEach((button, mode) => button.setAttribute("aria-pressed", String(mode === activeView)));
    status.textContent = visibleCount
      ? translate("contentBrowser.results.count", { count: visibleCount })
      : translate("contentBrowser.results.empty");
    status.classList.toggle("content-browser__status--empty", visibleCount === 0);
    reset.hidden = visibleCount > 0;
  };

  const openPreview = (content) => {
    activePreview = content;
    dialogTitle.textContent = translate(content.titleKey);
    dialogDescription.textContent = translate(content.descriptionKey);
    dialogMeta.replaceChildren();
    const metric = make("li", "", metricText(content));
    dialogMeta.append(metric);
    dialogPool.hidden = content.type !== "worldcup";
    dialogPool.textContent = content.type === "worldcup"
      ? translate("contentBrowser.preview.pool", { count: content.metrics.candidateCount })
      : "";
    start.href = content.page;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else window.location.href = content.page;
    close.focus({ preventScroll: true });
  };

  refreshCategoryOptions();
  updateCards();
  search.addEventListener("input", updateCards);
  categorySelect.addEventListener("change", updateCards);
  viewGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-mode]");
    if (!button || !allowedViews.includes(button.dataset.viewMode)) return;
    activeView = button.dataset.viewMode;
    try { window.localStorage.setItem(storageKey, activeView); } catch { /* Preference is optional. */ }
    updateCards();
  });
  mount.addEventListener("click", (event) => {
    if (!event.target.closest("[data-content-reset]")) return;
    search.value = "";
    categorySelect.value = "all";
    updateCards();
    search.focus();
  });
  grid.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-content-start]");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const content = registry.contents.find((entry) => entry.id === link.dataset.contentStart);
    if (!content) return;
    event.preventDefault();
    openPreview(content);
  });
  [close, cancel].forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  const refreshLabels = () => {
    search.placeholder = translate("contentBrowser.search.placeholder");
    search.setAttribute("aria-label", translate("contentBrowser.search.label"));
    categorySelect.setAttribute("aria-label", translate("contentBrowser.category.label"));
    viewGroup.setAttribute("aria-label", translate("contentBrowser.view.label"));
    toolbar.querySelector(".content-browser__search .content-browser__field-label").textContent = translate("contentBrowser.search.label");
    toolbar.querySelector(".content-browser__category .content-browser__field-label").textContent = translate("contentBrowser.category.label");
    viewButtons.forEach((button, mode) => { button.textContent = translate(viewLabels[mode]); });
    dialogEyebrow.textContent = translate("contentBrowser.preview.label");
    if (activePreview) {
      dialogTitle.textContent = translate(activePreview.titleKey);
      dialogDescription.textContent = translate(activePreview.descriptionKey);
      dialogMeta.firstElementChild.textContent = metricText(activePreview);
      dialogPool.hidden = activePreview.type !== "worldcup";
      dialogPool.textContent = activePreview.type === "worldcup"
        ? translate("contentBrowser.preview.pool", { count: activePreview.metrics.candidateCount })
        : "";
      start.href = activePreview.page;
    }
    close.setAttribute("aria-label", translate("contentBrowser.preview.close"));
    cancel.textContent = translate("contentBrowser.preview.cancel");
    start.textContent = translate("contentBrowser.preview.start");
    reset.textContent = translate("contentBrowser.results.reset");
    refreshCategoryOptions();
    updateCards();
  };
  dialog.addEventListener("close", () => { activePreview = null; });
  if (window.i18next?.on) {
    window.i18next.on("initialized", refreshLabels);
    window.i18next.on("languageChanged", refreshLabels);
  }
})();
