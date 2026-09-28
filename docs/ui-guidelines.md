# molgga UI guidelines

This document is the shared implementation template for new and updated pages. For site-wide priorities and the complete before/after review sequence, see [site-quality-framework.md](site-quality-framework.md). Keep page layouts consistent by using the existing classes in `assets/css/styles.css`; add a new component only when the current patterns do not fit.

## Starting templates

- For a standard informational or form page, follow the structure in `ko/contact.html` or `ko/about.html`.
- For a multi-question quiz with one question shown at a time, follow `ko/mbti.html` and its shared behavior in `assets/js/app.js`.
- For a choice-based personality result, follow `ko/spending-habits-test.html` and the result-card renderer in `assets/js/archetype-test.js`.
- For a tournament, follow `ko/worldcup.html` or `ko/late-night-worldcup.html` and reuse `assets/js/worldcup.js`.
- Build the Korean structure first, then keep the same component order and class names in `en/`, `ja/`, and `zh/`. Add each page to the sitemap and the relevant navigation/content list when appropriate.
- Prefer these existing templates over copying markup from a screenshot or introducing page-specific inline CSS.

## Quiz content template

Keep the same reading order across quiz pages while allowing the subject matter and result details to stay distinct:

1. **Intro:** a short category eyebrow, one inviting title, and a two-sentence maximum hook that helps the visitor picture the experience.
2. **Question area:** one question at a time, a visible `N / total` progress count, a plain question prompt, and consistently styled answer cards.
3. **Result:** result label, image (when the quiz has a result image set), name, short catchphrase, concise explanation, and any quiz-specific detail cards. Use the shared `archetype-test.js` renderer for archetype quizzes.
4. **Actions:** restart and share controls in the same order and with the shared button styles.

- Center the result hero presentation (brand label, result image, result label, title, and catchphrase) within its card on every quiz. Keep longer explanatory copy and detail cards left-aligned for comfortable reading.

The template defines hierarchy and behavior, not identical wording or identical result content. Keep each result description specific to its type. Prefer a short opening summary followed by a few useful, distinct details; avoid repeating the same generic paragraph across every result.

### Promotional copy

- Lead with a relatable question, choice, or feeling that makes someone curious to try the content. Examples: “이상형 월드컵: 오늘 땡기는 야식은?” or “연애할 때, 사람들과 소통할 때. 나는 어떤 유형일까?”
- Keep question counts, menu counts, round counts, and estimated duration out of page titles and promotional introductions. The UI already shows progress and round choices where that information helps someone play.
- Explain the experience in plain language rather than listing internal data: tell the visitor what they can choose or discover, then let the interaction reveal the result.
- Keep factual counts in reference/about material when they help describe what the site contains; do not repeat them in every teaser, card, and page header.
- Keep the category eyebrow short (for example, `molgga PLAY · 야식 월드컵`). Do not use it as a second metadata row.

### Question wording and progress

- Store only the question sentence in each quiz data file. Do not hard-code question numbers, “last question” labels, or progress status into the prompt.
- The shared archetype renderer adds the live question number from the current index. Its number must always match the visible `N / total` progress value; the final-question state must be derived from the actual final index, never from a fixed question number.
- Keep prompts direct and conversational. Use one question per prompt, and avoid “마지막 질문!” unless the renderer derives that label at the true end (the default is to omit it).
- When a quiz's question count changes, check the live progress denominator and any explicit duration or counts in the explanatory content where they are genuinely useful.
- Translate changed source prompts and labels in all supported languages (`ko`, `en`, `ja`, `zh`); do not let missing translation keys fall back to Korean on localized pages.

### Result-image template

- Store generated quiz result images under `image/tests/<quiz-id>/` and use stable, descriptive filenames based on result IDs, such as `avoidant.png`.
- Connect each result profile to its local asset with the `image` or `imageFile` field in its data file. If an image fails to load, use a generated neutral icon or hide the image cleanly; do not fall back to emoji.
- Match the visible subject to the result copy: a result described as a person with a human role (merchant, guide, healer, musician) should visibly include that person; animal and fantasy-creature results should show the named creature.
- Keep the image, result title, catchphrase, and explanation about the same subject. Use realistic photography with restrained fantasy details when the content calls for it; avoid extra visual clutter, incorrect anatomy, and scenes that contradict the description.
- Images contain no embedded text or logos. Give decorative inline icons empty alt text and keep meaningful result images descriptive.
- Keep a consistent photographic quality within one result family, while varying people, setting, framing, and lighting so the set does not look like one repeated scene.
- Document each new image folder and its filename-to-result mapping in `image/README.md`.

### Teto/Egen result imagery

- All eight result images must look like believable photographs and show a person in a scene that matches the result title and description.
- Make the four Teto results visually decisive: assertive leadership, practical protection, composed independence, and direct expression. Make the four Egen results visibly warm: thoughtful care, attentive empathy, carefree independence, and lively social energy.
- Distinguish results through the subject's expression, posture, action, lighting, and setting. Avoid reusing one generic smiling portrait for several types.
- Keep generated images free of text and logos, use the profile ID as the image filename, and verify the image URL cache token when replacing a file at an existing URL.

## Page structure

- Use the shared header, centered `.wrap`, `.page-main`, `.article`, breadcrumb, `.article-header`, content panels, and footer used by the localized pages.
- Keep the main reading column between roughly 790 and 860 px on desktop. Let it shrink fluidly on smaller screens with a consistent 20–24 px side gutter.
- Use `.article-header` for a page title and short introduction, `.content-panel` for an interactive block, and `.info-card` for supporting explanations.
- Keep headings, panels, controls, and footer content inside the same centered content column. Do not set page-specific fixed widths for common components.

## Type and spacing

- Body copy uses the shared 16 px base size, muted body color, and comfortable line height from the global stylesheet.
- Use the existing responsive `clamp()` scales for headings. Long Korean headings should wrap at word boundaries; avoid oversized fixed font sizes.
- Use one clear title per page. Use the small uppercase/letter-spaced `.eyebrow-text` only for short category metadata.
- Use consistent panel padding and radii from `.article-header`, `.content-panel`, and `.info-card`. Reduce spacing at the existing 600 px breakpoint rather than adding one-off mobile dimensions.
- Text inside buttons and other controls must be vertically centered, readable, and short enough to scan. Avoid explanatory counts or sentences in choice labels when a short action label works.

## Controls and selection states

- Every button must use `.button`, `.choice-button`, `.quiz-step-choice`, or `.worldcup-bracket-choice`; do not leave native default button appearance in the UI.
- Primary actions use `.button`. Secondary actions use `.button.button-quiet`.
- Mutually exclusive choices must visibly show the selected state and set `aria-pressed` or the checked form state. Keep focus-visible outlines and a comfortable tap target (at least 44 px for actions; compact header controls follow the shared header sizing).
- Center short bracket labels in `.worldcup-bracket-choice`; use one column on narrow phones and two columns when space allows.
- World Cup pages offer 16강/32강 choices when the content pool supports them. Keep the available bracket buttons in sync with `availableBrackets` and the number of unique items; hide unsupported sizes and never fill a bracket with duplicate choices.
- Quiz answer labels use `.quiz-step-choice`: radio/checkbox indicator and label text align on the vertical center, multi-line text remains left-aligned, and the full card is clickable.

## Responsive behavior

- Check layouts at narrow phone widths, typical phone widths, tablet widths, and desktop widths.
- Avoid horizontal scrolling, clipped labels, stretched controls, and text touching panel edges. Use `minmax(0, 1fr)`, `min-width: 0`, and wrapping where needed.
- Keep button labels and navigation controls on screen; allow action groups to wrap or stack on small screens.
- Preserve content hierarchy on mobile. Reduce type and padding modestly; do not simply scale the entire desktop page down.

## Localization and cache updates

- Keep structure and component classes the same across `ko/`, `en/`, `ja/`, and `zh/` pages. Translate visible labels through the existing dictionaries when shared scripts provide translations.
- Load translation resources through i18next and i18next-http-backend from the root locale JSON files (`ko.json`, `en.json`, `ja.json`, `zh.json`). Pin CDN versions, use `data-i18n` for visible text, and use `data-i18n-attr` for translated metadata attributes.
- Use readable namespaced keys such as `nav.contact` for new copy. Legacy Korean sentence keys remain only for existing content compatibility; do not add new literal-sentence keys. Keep `keySeparator: false` while legacy keys are present.
- Keep the active language, `<html lang>`, page title and descriptions, canonical URL, Open Graph URL, and language alternates in sync when the language selector changes. Add a new language only after its translation JSON and localized static metadata are complete and reviewed.
- Localize each page's static `<title>`, description, Open Graph title/description, and Twitter title/description in its HTML file; crawlers and link previews may read these before client-side translation runs. Keep Korean descriptions within Naver's 80-character guidance.
- Use the same extensionless public route in canonical URLs, every `hreflang`, `og:url`, the sitemap, and tournament share links. The source files may still end in `.html`; that is an implementation detail, not the preferred public URL.
- When changing shared CSS or JavaScript, add or increment its `?v=...` cache token in every HTML page that loads it, including currently unversioned references.
- Compare corresponding language pages for matching sections, controls, and accessible labels before publishing.

## Review checklist for each page change

1. Confirm all panels and controls align to the shared content column.
2. Confirm buttons have a designed shape, centered label, visible hover/focus/selected/disabled state, and no browser-default rendering.
3. Check heading scale, line breaks, and body readability at phone and desktop widths.
4. Check form labels, radio/checkbox alignment, tap target size, and error-state spacing.
5. Check translated pages use the same component structure and fit their longer/shorter labels.
6. Check cache tokens for changed CSS/JS and inspect `git diff --check` before commit.
7. For quizzes, compare at least an early, middle, and final question: question number must match progress, and no prompt may claim to be final early.
8. For result families, confirm every configured image path exists and that missing images still have the intended fallback.
9. For the home explorer, confirm search matches translated titles, descriptions, categories and tags; category filters use the registry; empty states can be cleared; all view buttons expose the selected state; and preview Start/Cancel work by keyboard and pointer.
10. For result recommendations, confirm the current content is excluded, recommendations follow category/tag overlap, links remain in the active locale, and localized text fits each card.
11. Check explorer and recommendation layouts at narrow phone, phone, tablet and desktop widths. Compact mode may use more columns, but card text and controls must remain readable and touchable.
12. Check the favorite toggle's label and pressed state, empty favorite/recent states, recent-history clearing, and cross-tab storage refresh. Verify that only registered content IDs and timestamps are persisted and that no quiz answers or results enter local storage.

## Integration and behavior checklist

- Before adding or changing a World Cup, update `assets/js/worldcup-data.js` and `functions/_shared/worldcup-config.js` together. Game IDs, unique item IDs, and bracket sizes must match exactly; every displayed item needs all four locale names/details and an existing image.
- Keep the HTML game ID and bracket buttons in every locale aligned with the shared data. Only offer brackets supported by the unique item pool, and confirm a run finishes with exactly `bracket size - 1` choices and one winner.
- For rankings, check the vote route, ranking route, `MOLGGA_DB` binding, and `migrations/0001_worldcup_votes.sql` together. The migration command must name the same D1 database documented for the Pages binding. Test accepted and rejected requests locally with a mock D1 binding; do not write test votes to production.
- Keep anonymous vote payloads limited to the winner item, game, bracket size, and an opaque id. Never send individual choices or personal data. Require an exact same-origin `Origin` header to reject cross-site and originless browser requests; this check is a request safeguard, not authentication or spam protection.
- Configure a separate Cloudflare rate-limiting rule for `/api/worldcup-vote` after deployment. Choose a threshold that limits automated bursts without blocking people sharing a network, and confirm expected requests still work. Keep the privacy notice accurate about hosting providers processing network information.
- For archetype quizzes, verify every score ID and compatibility ID exists in that quiz's profiles, the stated question count matches the data, and every configured result image exists. Derive progress and final-question state from the data length rather than embedding a question number in copy.
- Before publishing, run `node scripts/audit-integrations.mjs` and `node scripts/audit-result-distributions.mjs` from the repository root, then run `git diff --check`. The integration audit checks the common content registry against localized home cards, source data, translations and assets, plus page/reference parity, clean canonical/alternate/OG/sitemap routes, analytics tags, World Cup data/API synchronization, quiz result references, API validation behavior, and D1 documentation. The distribution audit checks which quiz outcomes can be reached and how often they appear under exhaustive enumeration or a fixed sample.
- A local audit does not prove the production D1 write path. Check the deployed ranking read endpoint separately, and never submit synthetic production votes just to test it.
