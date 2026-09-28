(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const mount = document.querySelector("[data-content-browser]");
  const grid = document.querySelector("[data-category-list]");
  if (!registry || !mount || !grid) return;

  const storageKey = "molgga.contentViewMode";
  const allowedViews = ["grid", "compact", "list"];
  const translate = (key, options) => window.MOA_I18N?.t(key, options) || key;
  const activity = window.MOLGGA_CONTENT_ACTIVITY;
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
    label.dataset.i18n = content.cardLabelKey || registry.categories.find((category) => content.categoryIds.includes(category.id))?.labelKey || "contentBrowser.card.category";
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
    const topLine = make("div", "category-card__topline");
    const favorite = make("button", "content-favorite-button", "☆");
    favorite.type = "button";
    favorite.dataset.contentFavorite = content.id;
    favorite.setAttribute("aria-pressed", "false");
    topLine.append(label, favorite);
    const metrics = make("p", "category-card__metrics");
    metrics.setAttribute("aria-label", translate("contentBrowser.metrics.label"));
    metrics.dataset.contentMetrics = content.id;
    card.append(icon, topLine, heading, description, metrics, link);
    return card;
  };

  registry.contents.forEach((content) => {
    const card = makeCard(content);
    card.dataset.contentId = content.id;
    card.dataset.category = content.categoryIds[0];
    card.dataset.categoryIds = content.categoryIds.join(" ");
    card.dataset.tagIds = content.tagIds.join(" ");
    cardsById.set(content.id, card);
    grid.append(card);
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

  const sortLabel = make("label", "content-browser__sort");
  sortLabel.append(make("span", "content-browser__field-label", translate("contentBrowser.sort.label")));
  const sortSelect = document.createElement("select");
  sortSelect.setAttribute("aria-label", translate("contentBrowser.sort.label"));
  sortLabel.append(sortSelect);
  const sortOptions = [
    ["catalog", "contentBrowser.sort.catalog"],
    ["latest", "contentBrowser.sort.latest"]
  ];
  const refreshSortOptions = () => {
    const previous = sortSelect.value || "catalog";
    sortSelect.replaceChildren(...sortOptions.map(([value, key]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = translate(key);
      return option;
    }));
    sortSelect.value = sortOptions.some(([value]) => value === previous) ? previous : "catalog";
  };
  refreshSortOptions();

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

  const scopeGroup = make("div", "content-browser__scope");
  scopeGroup.setAttribute("role", "group");
  scopeGroup.setAttribute("aria-label", translate("contentActivity.scope.label"));
  const scopeButtons = new Map();
  ["all", "favorites", "recent"].forEach((scope) => {
    const button = make("button", "content-browser__scope-button");
    button.type = "button";
    button.dataset.contentScope = scope;
    button.setAttribute("aria-pressed", String(scope === "all"));
    scopeGroup.append(button);
    scopeButtons.set(scope, button);
  });

  const toolbar = make("div", "content-browser__toolbar");
  toolbar.append(searchLabel, categoryLabel, sortLabel, viewGroup);
  const status = make("p", "content-browser__status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const reset = make("button", "button button-small button-quiet content-browser__reset", translate("contentBrowser.results.reset"));
  reset.type = "button";
  reset.dataset.contentReset = "true";

  const recentSection = make("section", "content-browser__recent");
  recentSection.setAttribute("aria-labelledby", "recent-content-title");
  const recentHeading = make("h3", "content-browser__recent-title", translate("contentActivity.recent.title"));
  recentHeading.id = "recent-content-title";
  const clearRecent = make("button", "button button-small button-quiet content-browser__clear-recent", translate("contentActivity.recent.clear"));
  clearRecent.type = "button";
  clearRecent.dataset.contentClearRecent = "true";
  const recentHeader = make("div", "content-browser__recent-header");
  recentHeader.append(recentHeading, clearRecent);
  const recentList = make("div", "content-browser__recent-list");
  recentSection.append(recentHeader, recentList);

  const suggestions = make("section", "content-browser__suggestions");
  suggestions.setAttribute("aria-labelledby", "content-suggestions-title");
  const suggestionsHeading = make("h3", "content-browser__suggestions-title", translate("contentActivity.suggestions.title"));
  suggestionsHeading.id = "content-suggestions-title";
  const suggestionsList = make("div", "content-browser__suggestions-list");
  suggestions.append(suggestionsHeading, suggestionsList);
  mount.replaceChildren(toolbar, scopeGroup, recentSection, status, suggestions, reset);

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
  let activeScope = "all";
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

  const activityState = () => activity?.getState?.() || { recent: [], favorites: [] };
  const translatedTitle = (content) => translate(content.titleKey);
  const refreshFavoriteButtons = () => {
    const favorites = new Set(activityState().favorites);
    cardsById.forEach((card, id) => {
      const content = registry.contents.find((entry) => entry.id === id);
      const button = card.querySelector("[data-content-favorite]");
      if (!button || !content) return;
      const selected = favorites.has(id);
      const label = translate(selected ? "contentActivity.favorite.remove" : "contentActivity.favorite.add", { title: translatedTitle(content) });
      button.textContent = selected ? "★" : "☆";
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", label);
      button.title = label;
    });
  };

  const renderRecent = () => {
    const { recent, favorites } = activityState();
    recentList.replaceChildren();
    recent.forEach((entry) => {
      const content = registry.contents.find((candidate) => candidate.id === entry.id);
      if (!content) return;
      const link = make("a", "content-browser__recent-link", translatedTitle(content));
      link.href = content.page;
      link.dataset.contentStart = content.id;
      recentList.append(link);
    });
    recentSection.hidden = !recent.length || search.value.trim() !== "" || categorySelect.value !== "all" || activeScope !== "all";
    clearRecent.hidden = !recent.length;
    scopeButtons.forEach((button, scope) => {
      const count = scope === "favorites" ? favorites.length : scope === "recent" ? recent.length : null;
      const key = scope === "all" ? "contentActivity.scope.all" : `contentActivity.scope.${scope}`;
      button.textContent = translate(key, count === null ? undefined : { count });
      button.setAttribute("aria-pressed", String(scope === activeScope));
    });
  };

  const renderSuggestions = (query, selectedCategory) => {
    suggestionsList.replaceChildren();
    const terms = query.split(/[\s,·/]+/).map((term) => term.trim()).filter(Boolean);
    const candidates = registry.contents.map((content, index) => {
      const categoryText = content.categoryIds.map((id) => registry.categories.find((entry) => entry.id === id)).filter(Boolean).map(getTranslatedCategory).join(" ");
      const tagText = content.tagIds.map((id) => translate(`tag.${id}`)).join(" ");
      const fields = [translatedTitle(content), translate(content.descriptionKey), categoryText, tagText, ...content.tagIds].map((text) => text.toLocaleLowerCase());
      const queryScore = terms.reduce((score, term) => score + (fields.some((field) => field.includes(term.toLocaleLowerCase())) ? 1 : 0), 0);
      const categoryScore = selectedCategory !== "all" && content.categoryIds.includes(selectedCategory) ? 2 : 0;
      return { content, score: queryScore + categoryScore, index };
    }).filter(({ content, score }) => score > 0 && !(selectedCategory !== "all" && !content.categoryIds.includes(selectedCategory)))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 3);
    candidates.forEach(({ content }) => {
      const item = make("article", "content-browser__suggestion");
      const title = make("h4", "", translatedTitle(content));
      const link = make("a", "button button-small button-quiet", translate("contentActivity.suggestions.open"));
      link.href = content.page;
      link.dataset.contentStart = content.id;
      item.append(title, link);
      suggestionsList.append(item);
    });
    suggestions.hidden = candidates.length === 0;
  };

  const updateCards = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedCategory = categorySelect.value || "all";
    const { favorites, recent } = activityState();
    const allowedIds = activeScope === "favorites" ? new Set(favorites) : activeScope === "recent" ? new Set(recent.map((entry) => entry.id)) : null;
    let visibleCount = 0;
    const orderedContents = registry.contents.map((content, index) => ({ content, index }));
    if (sortSelect.value === "latest") {
      orderedContents.sort((a, b) => Date.parse(b.content.createdAt || "") - Date.parse(a.content.createdAt || "") || a.index - b.index);
    }
    orderedContents.forEach(({ content }) => {
      const card = cardsById.get(content.id);
      if (!card) return;
      grid.append(card);
      const categoryText = content.categoryIds.map((id) => registry.categories.find((entry) => entry.id === id)).filter(Boolean).map(getTranslatedCategory).join(" ");
      const tagText = content.tagIds.map((id) => translate(`tag.${id}`)).join(" ");
      const searchableText = [translate(content.titleKey), translate(content.descriptionKey), categoryText, tagText, ...content.tagIds].join(" ").toLocaleLowerCase();
      const matchesCategory = selectedCategory === "all" || content.categoryIds.includes(selectedCategory);
      const matchesSearch = !query || searchableText.includes(query);
      const matchesScope = !allowedIds || allowedIds.has(content.id);
      card.hidden = !(matchesCategory && matchesSearch && matchesScope);
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
      : activeScope === "favorites" && favorites.length === 0
        ? translate("contentActivity.empty.favorites")
        : activeScope === "recent" && recent.length === 0
          ? translate("contentActivity.empty.recent")
          : translate("contentBrowser.results.empty");
    status.classList.toggle("content-browser__status--empty", visibleCount === 0);
    reset.hidden = visibleCount > 0;
    renderRecent();
    renderSuggestions(query, selectedCategory);
    refreshFavoriteButtons();
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
  refreshSortOptions();
  updateCards();
  search.addEventListener("input", updateCards);
  categorySelect.addEventListener("change", updateCards);
  sortSelect.addEventListener("change", updateCards);
  scopeGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-content-scope]");
    if (!button || !scopeButtons.has(button.dataset.contentScope)) return;
    activeScope = button.dataset.contentScope;
    updateCards();
  });
  viewGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-mode]");
    if (!button || !allowedViews.includes(button.dataset.viewMode)) return;
    activeView = button.dataset.viewMode;
    try { window.localStorage.setItem(storageKey, activeView); } catch { /* Preference is optional. */ }
    updateCards();
  });
  mount.addEventListener("click", (event) => {
    if (event.target.closest("[data-content-reset]")) {
      search.value = "";
      categorySelect.value = "all";
      sortSelect.value = "catalog";
      activeScope = "all";
      updateCards();
      search.focus();
      return;
    }
    if (event.target.closest("[data-content-clear-recent]")) {
      activity?.clearRecent?.();
      updateCards();
      return;
    }
    const link = event.target.closest("a[data-content-start]");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const content = registry.contents.find((entry) => entry.id === link.dataset.contentStart);
    if (!content) return;
    event.preventDefault();
    openPreview(content);
  });
  grid.addEventListener("click", (event) => {
    const favorite = event.target.closest("[data-content-favorite]");
    if (favorite) {
      event.preventDefault();
      activity?.toggleFavorite?.(favorite.dataset.contentFavorite);
      updateCards();
      return;
    }
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
    sortSelect.setAttribute("aria-label", translate("contentBrowser.sort.label"));
    viewGroup.setAttribute("aria-label", translate("contentBrowser.view.label"));
    scopeGroup.setAttribute("aria-label", translate("contentActivity.scope.label"));
    recentHeading.textContent = translate("contentActivity.recent.title");
    clearRecent.textContent = translate("contentActivity.recent.clear");
    suggestionsHeading.textContent = translate("contentActivity.suggestions.title");
    toolbar.querySelector(".content-browser__search .content-browser__field-label").textContent = translate("contentBrowser.search.label");
    toolbar.querySelector(".content-browser__category .content-browser__field-label").textContent = translate("contentBrowser.category.label");
    toolbar.querySelector(".content-browser__sort .content-browser__field-label").textContent = translate("contentBrowser.sort.label");
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
    refreshSortOptions();
    updateCards();
  };
  dialog.addEventListener("close", () => { activePreview = null; });
  if (window.i18next?.on) {
    window.i18next.on("initialized", refreshLabels);
    window.i18next.on("languageChanged", refreshLabels);
  }
  window.addEventListener("molgga:content-activity-change", updateCards);
})();
