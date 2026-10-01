(() => {
  const languageLabels = { ko: "한국어", en: "English (US)", ja: "日本語", zh: "简体中文" };
  const languageTags = { ko: "ko-KR", en: "en-US", ja: "ja", zh: "zh-CN" };
  const pathParts = window.location.pathname.split("/");
  const routeIndex = pathParts.findIndex((part, index) => index > 0 && Object.hasOwn(languageLabels, part));
  const initialLanguage = routeIndex >= 0 ? pathParts[routeIndex] : "ko";
  const normalizeKey = (value) => String(value || "").trim().replace(/\s+/g, " ");

  if (!window.i18next || !window.i18nextHttpBackend) {
    console.error("i18next failed to load; the page will remain in Korean.");
    return;
  }

  const translate = (key, options = {}) => window.i18next.t(normalizeKey(key), {
    ...options,
    defaultValue: options.defaultValue ?? normalizeKey(key)
  });

  const elementsWithin = (root, selector) => [
    ...(root?.matches?.(selector) ? [root] : []),
    ...(root?.querySelectorAll ? [...root.querySelectorAll(selector)] : [])
  ];

  const translateDeclaredAttributes = (root) => {
    elementsWithin(root, "[data-i18n-attr]").forEach((element) => {
      element.getAttribute("data-i18n-attr").split(";").forEach((entry) => {
        const separator = entry.indexOf(":");
        if (separator < 1) return;
        const attribute = entry.slice(0, separator).trim();
        const key = entry.slice(separator + 1).trim();
        if (attribute && key) element.setAttribute(attribute, translate(key));
      });
    });

    elementsWithin(root, "[placeholder], [aria-label], [title]").forEach((element) => {
      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const savedKey = `data-i18n-${attribute}`;
        const original = element.getAttribute(savedKey) || normalizeKey(element.getAttribute(attribute));
        if (!window.i18next.exists(original)) return;
        if (!element.hasAttribute(savedKey)) element.setAttribute(savedKey, original);
        element.setAttribute(attribute, translate(original));
      });
    });
  };

  const translateTree = (root = document.body) => {
    if (!root || !window.i18next.isInitialized) return;

    elementsWithin(root, "[data-i18n]").forEach((element) => {
      element.textContent = translate(element.getAttribute("data-i18n"));
    });
    translateDeclaredAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-i18n]")) return;
      const source = node.nodeValue || "";
      const key = normalizeKey(source);
      if (!key || !window.i18next.exists(key)) return;
      const translated = translate(key);
      if (translated === key) return;

      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      const span = document.createElement("span");
      span.setAttribute("data-i18n", key);
      span.textContent = translated;
      node.replaceWith(document.createTextNode(leading), span, document.createTextNode(trailing));
    });
  };

  const updateMetadata = () => {
    const language = window.i18next.resolvedLanguage || window.i18next.language || initialLanguage;
    const localeSlug = languageLabels[language] ? language : "ko";
    document.documentElement.lang = languageTags[localeSlug];
    translateTree(document.head);
    translateTree(document.body);
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.value = localeSlug;
      select.setAttribute("aria-label", translate("nav.language"));
    });
  };

  const updateLanguageRoutes = (language) => {
    const nextParts = window.location.pathname.split("/");
    const index = nextParts.findIndex((part, partIndex) => partIndex > 0 && Object.hasOwn(languageLabels, part));
    if (index < 0) return;
    nextParts[index] = language;
    const nextPath = nextParts.join("/");
    window.history.pushState({}, "", `${nextPath}${window.location.search}${window.location.hash}`);

    const routeFor = (locale) => `${window.location.origin}${nextPath.replace(`/${language}/`, `/${locale}/`).replace(/\/$/, "/")}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = routeFor(language);
    const openGraphUrl = document.querySelector('meta[property="og:url"]');
    if (openGraphUrl) openGraphUrl.content = routeFor(language);
    const alternates = { "ko-KR": "ko", "en-US": "en", ja: "ja", "zh-CN": "zh", "x-default": "ko" };
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
      const targetLanguage = alternates[link.hreflang];
      if (targetLanguage) link.href = routeFor(targetLanguage);
    });
  };

  const initialize = () => window.i18next
    .use(window.i18nextHttpBackend)
    .init({
      lng: initialLanguage,
      fallbackLng: "ko",
      supportedLngs: Object.keys(languageLabels),
      load: "languageOnly",
      ns: ["translation"],
      defaultNS: "translation",
      keySeparator: false,
      interpolation: { escapeValue: false },
      backend: { loadPath: "/{{lng}}.json?v=20261001-3", maxRetries: 1, retryTimeout: 350 }
    })
    .then(updateMetadata)
    .catch((error) => {
      console.error("Could not load the page translations.", error);
      updateMetadata();
    });

  const ready = initialize();

  window.MOA_I18N = {
    get language() { return window.i18next.resolvedLanguage || window.i18next.language || initialLanguage; },
    t: translate,
    ready,
    translateTree
  };

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-language-select]")) return;
    const nextLanguage = event.target.value;
    if (!Object.hasOwn(languageLabels, nextLanguage)) return;
    window.i18next.changeLanguage(nextLanguage).then(() => {
      updateMetadata();
      updateLanguageRoutes(nextLanguage);
    }).catch((error) => console.error("Could not change the page language.", error));
  });

  window.addEventListener("popstate", () => {
    const routeLanguage = window.location.pathname.split("/").find((part) => Object.hasOwn(languageLabels, part));
    if (!routeLanguage || routeLanguage === window.i18next.resolvedLanguage) return;
    window.i18next.changeLanguage(routeLanguage).then(updateMetadata);
  });

  new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest("[data-i18n]")) return;
      translateTree(node.parentElement);
    }
    else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
  }))).observe(document.documentElement, { childList: true, subtree: true });
})();
