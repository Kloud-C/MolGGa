const isNewContent = (createdAt, now = new Date()) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(createdAt || "");
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const createdDay = Date.UTC(year, month - 1, day);
  const parsedDay = new Date(createdDay);
  if (parsedDay.getUTCFullYear() !== year || parsedDay.getUTCMonth() !== month - 1 || parsedDay.getUTCDate() !== day) return false;
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const ageInDays = (today - createdDay) / 86400000;
  return ageInDays >= 0 && ageInDays < 3;
};

(async () => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  const mount = document.querySelector("[data-content-browser]");
  const grid = document.querySelector("[data-category-list]");
  if (!registry || !mount || !grid) return;

  const translationsReady = window.MOA_I18N?.ready;
  if (!translationsReady || typeof translationsReady.then !== "function") return;
  await translationsReady;

  const storageKey = "molgga.contentViewMode";
  const allowedViews = ["grid", "compact", "list"];
  const translate = (key, options) => window.MOA_I18N?.t(key, { ...options, defaultValue: "" }) ?? "";
  const activity = window.MOLGGA_CONTENT_ACTIVITY;
  const cardsById = new Map();
  const popularityCounts = new Map();
  let popularityStatus = "loading";
  let hasUserChosenSort = false;

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
    const newBadge = make("span", "category-card__new-badge", translate("contentBadge.new"));
    newBadge.dataset.contentNewBadge = "true";
    newBadge.hidden = true;
    const headingText = make("span", "", translate(content.titleKey));
    headingText.dataset.i18n = content.titleKey;
    heading.append(newBadge, headingText);
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

  const filtersDisclosure = document.createElement("details");
  filtersDisclosure.className = "content-browser__filters";
  const filtersSummary = document.createElement("summary");
  filtersSummary.className = "content-browser__filters-summary";
  const filtersSummaryText = make("span", "content-browser__filters-label", translate("contentBrowser.filters.toggle"));
  const filtersActiveCount = make("span", "content-browser__filters-count");
  filtersActiveCount.hidden = true;
  const filtersChevron = make("span", "content-browser__filters-chevron", "⌄");
  filtersChevron.setAttribute("aria-hidden", "true");
  filtersSummary.append(filtersSummaryText, filtersActiveCount, filtersChevron);

  const filterGrid = make("div", "content-browser__filter-grid");
  const topicGroup = document.createElement("fieldset");
  topicGroup.className = "content-browser__filter-group";
  const topicLegend = make("legend", "content-browser__field-label", translate("contentBrowser.filters.topic"));
  const topicChoices = make("div", "content-browser__filter-choices");
  topicGroup.append(topicLegend, topicChoices);
  const topicInputs = new Map();
  registry.categories.forEach((category) => {
    const label = make("label", "content-browser__check-option");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = category.id;
    input.dataset.topicFilter = category.id;
    const labelText = make("span", "content-browser__check-label", translate(category.labelKey));
    labelText.dataset.filterLabelKey = category.labelKey;
    const count = registry.contents.filter((content) => content.categoryIds.includes(category.id)).length;
    const countText = make("span", "content-browser__check-count", translate("contentBrowser.filters.count", { count }));
    countText.setAttribute("aria-hidden", "true");
    label.append(input, labelText, countText);
    topicChoices.append(label);
    topicInputs.set(category.id, input);
  });

  const formatGroup = document.createElement("fieldset");
  formatGroup.className = "content-browser__filter-group";
  const formatLegend = make("legend", "content-browser__field-label", translate("contentBrowser.filters.format"));
  const formatChoices = make("div", "content-browser__filter-choices content-browser__filter-choices--formats");
  formatGroup.append(formatLegend, formatChoices);
  const formatIds = ["worldcup", "quiz", "story"];
  const formatInputs = new Map();
  formatIds.forEach((formatId) => {
    const label = make("label", "content-browser__check-option");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = formatId;
    input.dataset.formatFilter = formatId;
    const labelKey = `contentBrowser.format.${formatId}`;
    const labelText = make("span", "content-browser__check-label", translate(labelKey));
    labelText.dataset.filterLabelKey = labelKey;
    const count = registry.contents.filter((content) => content.formatId === formatId).length;
    const countText = make("span", "content-browser__check-count", translate("contentBrowser.filters.count", { count }));
    countText.setAttribute("aria-hidden", "true");
    label.append(input, labelText, countText);
    formatChoices.append(label);
    formatInputs.set(formatId, input);
  });
  filterGrid.append(topicGroup, formatGroup);

  const sortLabel = make("label", "content-browser__sort");
  sortLabel.append(make("span", "content-browser__field-label", translate("contentBrowser.sort.label")));
  const sortSelect = document.createElement("select");
  sortSelect.setAttribute("aria-label", translate("contentBrowser.sort.label"));
  sortLabel.append(sortSelect);
  const sortOptions = [
    ["popular", "contentBrowser.sort.popular"],
    ["latest", "contentBrowser.sort.latest"]
  ];
  const refreshSortOptions = () => {
    const previous = sortSelect.value || "latest";
    sortSelect.replaceChildren(...sortOptions.map(([value, key]) => {
      const option = document.createElement("option");
      option.value = value;
      option.disabled = value === "popular" && popularityStatus !== "ready";
      option.textContent = value === "popular" && popularityStatus !== "ready"
        ? translate(popularityStatus === "loading" ? "contentBrowser.sort.popularLoading" : "contentBrowser.sort.popularUnavailable")
        : translate(key);
      return option;
    }));
    sortSelect.value = sortOptions.some(([value]) => value === previous) && !(previous === "popular" && popularityStatus !== "ready")
      ? previous
      : "latest";
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

  const viewControl = make("div", "content-browser__control");
  const viewControlLabel = make("span", "content-browser__field-label", translate("contentBrowser.view.label"));
  viewControlLabel.dataset.controlLabelKey = "contentBrowser.view.label";
  viewControl.append(viewControlLabel, viewGroup);
  const scopeControl = make("div", "content-browser__control");
  const scopeControlLabel = make("span", "content-browser__field-label", translate("contentActivity.scope.label"));
  scopeControlLabel.dataset.controlLabelKey = "contentActivity.scope.label";
  scopeControl.append(scopeControlLabel, scopeGroup);
  const clearRecent = make("button", "button button-small button-quiet content-browser__clear-recent", translate("contentActivity.recent.clear"));
  clearRecent.type = "button";
  clearRecent.dataset.contentClearRecent = "true";
  const controlRow = make("div", "content-browser__control-row");
  controlRow.append(sortLabel, viewControl, scopeControl);
  const filterActions = make("div", "content-browser__filter-actions");
  filterActions.append(clearRecent);
  const reset = make("button", "button button-small button-quiet content-browser__reset", translate("contentBrowser.results.reset"));
  reset.type = "button";
  reset.dataset.contentReset = "true";
  filterActions.append(reset);
  const filterPanel = make("div", "content-browser__filter-panel");
  filterPanel.append(filterGrid, controlRow, filterActions);
  filtersDisclosure.append(filtersSummary, filterPanel);

  const toolbar = make("div", "content-browser__toolbar");
  toolbar.append(searchLabel, filtersDisclosure);
  const status = make("p", "content-browser__status");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const suggestions = make("section", "content-browser__suggestions");
  suggestions.setAttribute("aria-labelledby", "content-suggestions-title");
  const suggestionsHeading = make("h3", "content-browser__suggestions-title", translate("contentActivity.suggestions.title"));
  suggestionsHeading.id = "content-suggestions-title";
  const suggestionsList = make("div", "content-browser__suggestions-list");
  suggestions.append(suggestionsHeading, suggestionsList);
  mount.replaceChildren(toolbar, status, suggestions);

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
  const selectedTopicIds = () => [...topicInputs].filter(([, input]) => input.checked).map(([id]) => id);
  const selectedFormatIds = () => [...formatInputs].filter(([, input]) => input.checked).map(([id]) => id);
  const refreshFilterSummary = () => {
    const activeCount = selectedTopicIds().length + selectedFormatIds().length + Number(activeScope !== "all");
    filtersActiveCount.hidden = activeCount === 0;
    filtersActiveCount.textContent = translate("contentBrowser.filters.active", { count: activeCount });
    filtersSummary.setAttribute("aria-label", activeCount
      ? `${translate("contentBrowser.filters.toggle")}, ${translate("contentBrowser.filters.active", { count: activeCount })}`
      : translate("contentBrowser.filters.toggle"));
  };
  const refreshScopeButtons = () => {
    const { favorites, recent } = activityState();
    scopeButtons.forEach((button, scope) => {
      const count = scope === "favorites" ? favorites.length : scope === "recent" ? recent.length : null;
      const key = scope === "all" ? "contentActivity.scope.all" : `contentActivity.scope.${scope}`;
      button.textContent = translate(key, count === null ? undefined : { count });
      button.setAttribute("aria-pressed", String(scope === activeScope));
      button.disabled = scope !== "all" && count === 0;
    });
    clearRecent.hidden = recent.length === 0;
  };
  const refreshFilterLabels = () => {
    filterPanel.querySelectorAll("[data-filter-label-key]").forEach((element) => {
      element.textContent = translate(element.dataset.filterLabelKey);
    });
    topicLegend.textContent = translate("contentBrowser.filters.topic");
    formatLegend.textContent = translate("contentBrowser.filters.format");
    filtersSummaryText.textContent = translate("contentBrowser.filters.toggle");
    clearRecent.textContent = translate("contentActivity.recent.clear");
    reset.textContent = translate("contentBrowser.results.reset");
    sortLabel.querySelector(".content-browser__field-label").textContent = translate("contentBrowser.sort.label");
    viewControlLabel.textContent = translate("contentBrowser.view.label");
    scopeControlLabel.textContent = translate("contentActivity.scope.label");
    const updateCounts = (inputs, getCount) => inputs.forEach((input, id) => {
      const count = input.closest(".content-browser__check-option")?.querySelector(".content-browser__check-count");
      if (count) count.textContent = translate("contentBrowser.filters.count", { count: getCount(id) });
    });
    updateCounts(topicInputs, (id) => registry.contents.filter((content) => content.categoryIds.includes(id)).length);
    updateCounts(formatInputs, (id) => registry.contents.filter((content) => content.formatId === id).length);
    refreshFilterSummary();
    refreshScopeButtons();
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

  const renderSuggestions = (query, selectedTopics, selectedFormats) => {
    suggestionsList.replaceChildren();
    const terms = query.split(/[\s,·/]+/).map((term) => term.trim()).filter(Boolean);
    const candidates = registry.contents.map((content, index) => {
      const categoryText = content.categoryIds.map((id) => registry.categories.find((entry) => entry.id === id)).filter(Boolean).map(getTranslatedCategory).join(" ");
      const formatText = translate(`contentBrowser.format.${content.formatId}`);
      const tagText = content.tagIds.map((id) => translate(`tag.${id}`)).join(" ");
      const fields = [translatedTitle(content), translate(content.descriptionKey), categoryText, formatText, tagText, ...content.tagIds].map((text) => text.toLocaleLowerCase());
      const queryScore = terms.reduce((score, term) => score + (fields.some((field) => field.includes(term.toLocaleLowerCase())) ? 1 : 0), 0);
      const topicScore = selectedTopics.some((id) => content.categoryIds.includes(id)) ? 2 : 0;
      const formatScore = selectedFormats.includes(content.formatId) ? 2 : 0;
      return { content, score: queryScore + topicScore + formatScore, index };
    }).filter(({ score }) => score > 0)
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
    const selectedTopics = selectedTopicIds();
    const selectedFormats = selectedFormatIds();
    const { favorites, recent } = activityState();
    if ((activeScope === "favorites" && favorites.length === 0) || (activeScope === "recent" && recent.length === 0)) {
      activeScope = "all";
    }
    const allowedIds = activeScope === "favorites" ? new Set(favorites) : activeScope === "recent" ? new Set(recent.map((entry) => entry.id)) : null;
    let visibleCount = 0;
    const now = new Date();
    const orderedContents = registry.contents.map((content, index) => {
      const isNew = isNewContent(content.createdAt, now);
      return { content, index, isNew };
    });
    const pinNewFirst = (a, b) => Number(b.isNew) - Number(a.isNew)
      || (a.isNew && b.isNew ? Date.parse(b.content.createdAt) - Date.parse(a.content.createdAt) : 0);
    if (sortSelect.value === "popular" && popularityStatus === "ready") {
      orderedContents.sort((a, b) => (popularityCounts.get(b.content.id) || 0) - (popularityCounts.get(a.content.id) || 0) || a.index - b.index);
    } else if (sortSelect.value === "latest") {
      orderedContents.sort((a, b) => pinNewFirst(a, b) || Date.parse(b.content.createdAt || "") - Date.parse(a.content.createdAt || "") || a.index - b.index);
    } else {
      orderedContents.sort((a, b) => pinNewFirst(a, b) || a.index - b.index);
    }
    const orderedCards = orderedContents
      .map(({ content }) => cardsById.get(content.id))
      .filter(Boolean);
    const currentCards = [...grid.children];
    const orderChanged = orderedCards.length !== currentCards.length
      || orderedCards.some((card, index) => card !== currentCards[index]);
    if (orderChanged) {
      const fragment = document.createDocumentFragment();
      orderedCards.forEach((card) => fragment.append(card));
      grid.append(fragment);
    }
    orderedContents.forEach(({ content, isNew }) => {
      const card = cardsById.get(content.id);
      if (!card) return;
      const badge = card.querySelector("[data-content-new-badge]");
      if (badge) {
        badge.textContent = translate("contentBadge.new");
        badge.hidden = !isNew;
      }
      const categoryText = content.categoryIds.map((id) => registry.categories.find((entry) => entry.id === id)).filter(Boolean).map(getTranslatedCategory).join(" ");
      const formatText = translate(`contentBrowser.format.${content.formatId}`);
      const tagText = content.tagIds.map((id) => translate(`tag.${id}`)).join(" ");
      const searchableText = [translate(content.titleKey), translate(content.descriptionKey), categoryText, formatText, tagText, ...content.tagIds].join(" ").toLocaleLowerCase();
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.some((id) => content.categoryIds.includes(id));
      const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(content.formatId);
      const matchesSearch = !query || searchableText.includes(query);
      const matchesScope = !allowedIds || allowedIds.has(content.id);
      card.hidden = !(matchesTopic && matchesFormat && matchesSearch && matchesScope);
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
    const hasActiveFilters = selectedTopics.length > 0 || selectedFormats.length > 0 || activeScope !== "all" || query.length > 0;
    reset.hidden = !hasActiveFilters;
    refreshFilterSummary();
    refreshScopeButtons();
    renderSuggestions(query, selectedTopics, selectedFormats);
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

  refreshFilterLabels();
  refreshSortOptions();
  updateCards();
  search.addEventListener("input", updateCards);
  topicGroup.addEventListener("change", updateCards);
  formatGroup.addEventListener("change", updateCards);
  sortSelect.addEventListener("change", () => {
    hasUserChosenSort = true;
    updateCards();
  });
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
      topicInputs.forEach((input) => { input.checked = false; });
      formatInputs.forEach((input) => { input.checked = false; });
      sortSelect.value = popularityStatus === "ready" ? "popular" : "latest";
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
  start.addEventListener("click", () => {
    if (!activePreview) return;
    fetch("/api/content-start", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contentId: activePreview.id }),
      credentials: "omit",
      cache: "no-store",
      keepalive: true
    }).catch(() => { /* Popularity is best-effort and never blocks starting content. */ });
  });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

  const refreshLabels = () => {
    search.placeholder = translate("contentBrowser.search.placeholder");
    search.setAttribute("aria-label", translate("contentBrowser.search.label"));
    sortSelect.setAttribute("aria-label", translate("contentBrowser.sort.label"));
    viewGroup.setAttribute("aria-label", translate("contentBrowser.view.label"));
    scopeGroup.setAttribute("aria-label", translate("contentActivity.scope.label"));
    suggestionsHeading.textContent = translate("contentActivity.suggestions.title");
    toolbar.querySelector(".content-browser__search .content-browser__field-label").textContent = translate("contentBrowser.search.label");
    viewButtons.forEach((button, mode) => { button.textContent = translate(viewLabels[mode]); });
    refreshFilterLabels();
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
    refreshSortOptions();
    updateCards();
  };
  dialog.addEventListener("close", () => { activePreview = null; });
  if (window.i18next?.on) {
    window.i18next.on("initialized", refreshLabels);
    window.i18next.on("languageChanged", refreshLabels);
  }
  window.addEventListener("molgga:content-activity-change", updateCards);

  fetch("/api/content-starts", { credentials: "omit", cache: "no-store", headers: { accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("content_start_counts_unavailable");
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.counts)) throw new Error("invalid_content_start_counts");
      data.counts.forEach(({ contentId, starts }) => {
        if (typeof contentId === "string" && Number.isSafeInteger(starts) && starts >= 0) popularityCounts.set(contentId, starts);
      });
      popularityStatus = "ready";
      const currentSort = sortSelect.value;
      refreshSortOptions();
      if (!hasUserChosenSort && currentSort === "latest") sortSelect.value = "popular";
      updateCards();
    })
    .catch(() => {
      popularityStatus = "unavailable";
      refreshSortOptions();
      updateCards();
    });
})();
