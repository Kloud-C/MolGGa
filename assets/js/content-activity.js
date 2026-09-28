(() => {
  const registry = window.MOLGGA_CONTENT_REGISTRY;
  if (!registry) return;

  const storageKey = "molgga.contentActivity.v1";
  const maximumRecentItems = 8;
  const contentIds = new Set(registry.contents.map((content) => content.id));
  const byPage = new Map(registry.contents.map((content) => [content.page.replace(/\.html$/i, ""), content]));

  const emptyState = () => ({ recent: [], favorites: [] });
  const normalize = (value) => {
    if (!value || typeof value !== "object") return emptyState();
    const recent = [];
    const seenRecent = new Set();
    for (const entry of Array.isArray(value.recent) ? value.recent : []) {
      if (!entry || !contentIds.has(entry.id) || !Number.isFinite(entry.viewedAt) || seenRecent.has(entry.id)) continue;
      seenRecent.add(entry.id);
      recent.push({ id: entry.id, viewedAt: entry.viewedAt });
    }
    recent.sort((a, b) => b.viewedAt - a.viewedAt);
    return {
      recent: recent.slice(0, maximumRecentItems),
      favorites: [...new Set((Array.isArray(value.favorites) ? value.favorites : []).filter((id) => contentIds.has(id)))]
    };
  };

  const read = () => {
    try {
      return normalize(JSON.parse(window.localStorage.getItem(storageKey) || "null"));
    } catch {
      return emptyState();
    }
  };

  let state = read();
  const notify = () => window.dispatchEvent(new Event("molgga:content-activity-change"));
  const save = () => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch { /* Storage may be unavailable or full; browsing still works. */ }
    notify();
  };

  const api = {
    getState() {
      return { recent: state.recent.map((entry) => ({ ...entry })), favorites: [...state.favorites] };
    },
    isFavorite(id) {
      return state.favorites.includes(id);
    },
    toggleFavorite(id) {
      if (!contentIds.has(id)) return false;
      state = normalize({
        ...state,
        favorites: state.favorites.includes(id)
          ? state.favorites.filter((favoriteId) => favoriteId !== id)
          : [...state.favorites, id]
      });
      save();
      return state.favorites.includes(id);
    },
    clearRecent() {
      if (!state.recent.length) return;
      state = { ...state, recent: [] };
      save();
    }
  };

  window.MOLGGA_CONTENT_ACTIVITY = api;
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey) return;
    try {
      state = normalize(JSON.parse(event.newValue || "null"));
    } catch {
      state = emptyState();
    }
    notify();
  });

  const pageName = window.location.pathname.split("/").pop().replace(/\.html$/i, "");
  const content = byPage.get(pageName);
  if (content) {
    state = normalize({
      ...state,
      recent: [{ id: content.id, viewedAt: Date.now() }, ...state.recent.filter((entry) => entry.id !== content.id)]
    });
    state.recent = state.recent.slice(0, maximumRecentItems);
    save();
  }
})();
