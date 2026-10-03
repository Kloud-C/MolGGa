# Existing content audit baseline

Reviewed: 2026-10-03
Status: complete; the current baseline covers all 16 active entries, and existing catalog copy is frozen by default under [the site quality framework](site-quality-framework.md#콘텐츠-기준선과-재검토-범위).

## Scope

The baseline covers the 16 active entries in `assets/js/content-registry.js`: Korean source copy and the English, Japanese, and Simplified Chinese versions of their cards, titles, descriptions, questions, answer choices, results, share copy, story reactions, and supporting metadata. It includes inline World Cup candidate names and descriptions, plus related result assets and registered counts. General navigation and policy pages are covered by the normal integration and localization checks, not by this content freeze.

| Content ID | Type | Current source size |
| --- | --- | --- |
| `weekend` | World Cup | 50 activities; 16- or 32-entry bracket |
| `late-night-food` | World Cup | 50 dishes; 16- or 32-entry bracket |
| `month-stay` | World Cup | 50 places; 16- or 32-entry bracket |
| `animal-test` | Quiz | 10 questions, 6 results |
| `mbti` | Quiz | 20 questions, 16 results |
| `teto-egen` | Quiz | 12 questions, 8 results |
| `attachment-style` | Quiz | 16 questions, 4 results |
| `past-life` | Quiz | 25 questions, 20 results |
| `spending-habits` | Quiz | 10 questions, 4 results |
| `travel-role` | Quiz | 9 questions, 8 results |
| `romance-style` | Quiz | 15 questions, 12 results |
| `fantasy-class` | Quiz | 8 questions, 8 results |
| `fantasy-shop` | Story quiz | 8 scenes, 6 results |
| `night-train` | Story quiz | 8 scenes, 4 choices per scene, 6 results |
| `rest-style` | Quiz | 7 questions, 5 choices, 5 results |
| `hobby-discovery` | Quiz | 12 questions, 4 choices, 5 results |

## Findings resolved

- The README described the weekend World Cup as drawing from 32 activities, while the live data and registry contain 50. The documentation now describes the 50-item pool and its supported bracket sizes.
- Legacy locale entries still said the Past Life quiz had 30 questions, despite the current 25-question definition. The retained entries now use the current 25-question count in all four locales. The same old descriptions also understated the weekend activity pool; their values now reflect the current 50-item pool.
- The Chinese English-residue detector previously scanned locale JSON but not the inline World Cup data. The integration audit now checks Chinese candidate names and descriptions too.

No unresolved P1 or P2 content-count, translation-key, result-linkage, or reachability issue was found in this review.

## Initial verification record (2026-10-01)

- `node scripts/audit-integrations.mjs`: passed 15,008 checks across 72 localized pages, content discovery, result recommendations, SEO, World Cup data/API links, quiz data and assets.
- `node scripts/audit-result-distributions.mjs`: all outcomes across the 10 registered quiz/story contents were reachable; none fell below the 3% floor. Exact enumeration was used where feasible and a fixed 2,000,000-case sample for Past Life and Romance Style.
- Lowest observed result shares: Past Life `market` 3.184%; Romance Style `observer` 5.648%. Both sampled results remain above the 3% target.
- `git diff --check`: passed.

## 2026-10-02 delta verification

- Added the `night-train` entry after checking its eight-scene flow, four choices per scene, six localized outcomes, image mappings, and deterministic scoring.
- `node scripts/audit-integrations.mjs`: passed 16,552 checks across 76 localized pages, content discovery, result recommendations, localized SEO, World Cup data/APIs, archetype data/assets, sitemap, redirects, and D1 documentation.
- `node scripts/audit-result-distributions.mjs`: all outcomes across the 11 registered quiz/story contents were reachable; none fell below 3%. `night-train` was exhaustively checked across 65,536 answer combinations; all six outcomes appeared, with an observed range of 4.182%–33.907%.
- `git diff --check`: passed.

## 2026-10-02 month-stay verification

- Added `month-stay` with 50 places, localized names and descriptions, 16- and 32-entry brackets, result and share templates, four localized pages, sitemap entries, and 50 matching generated 800×600 JPEG assets.
- Each start uniformly samples the requested number of distinct candidates from all 50, shuffles the bracket order, and restarts with a fresh draw. The elimination flow yields 15 selections for 16 entries and 31 for 32; scoring-distribution analysis does not apply to this World Cup.
- `node scripts/audit-integrations.mjs`: passed 17,644 checks across 80 localized pages, discovery, localized SEO, World Cup data and APIs, archetype data, assets, sitemap, redirects, and D1 docs.
- `git diff --check`: passed.

## 2026-10-02 content-page navigation and explainer review

- Rechecked all 14 active content routes in Korean, English, Japanese, and Simplified Chinese (56 page/locale combinations) for the shared `Home / content name` breadcrumb and repeated start/help copy.
- The missing breadcrumb separator was isolated to the four month-stay pages and has been corrected with the shared markup now documented in `docs/ui-guidelines.md`.
- The late-night World Cup had three help cards repeating bracket and selection details already visible in the game controls, plus ranking/privacy details repeated by the page note. The guide now follows the concise World Cup pattern and retains its food and health disclaimer.
- `node scripts/audit-integrations.mjs`: passed 17,603 checks across 80 localized pages, content discovery and recommendations, localized SEO, World Cup data/APIs, archetype data, assets, sitemap, redirects, and D1 docs.
- Breadcrumb scan: all 56 content page/locale combinations show the separator. `git diff --check`: passed.

## Reopening this baseline

- Do not manually reread or rewrite these unchanged content entries during unrelated reviews or routine integration checks.
- Reopen only when the user directly asks to review or change a named entry, asks for a full catalog review, or asks to add new content. A targeted request reopens only the named entry and its connected locales and surfaces; a full-review request reopens all entries.
- For new content, complete the same source, four-locale, result, share, metadata, asset, and score-reachability checks before adding its ID, counts, date, findings, and verification to this file.
- Record later content reviews as dated deltas below rather than repeating the full report.

## Review history

- 2026-10-01: completed the initial 12-entry baseline; corrected stale weekend and Past Life counts, extended Chinese residual scanning to inline World Cup text, and verified all result distributions.
- 2026-10-02: added `night-train` to the baseline after integration checks, an exact outcome-distribution review, and confirmation of its four-locale page and asset mapping.
- 2026-10-02: added `month-stay` after the four-locale content, bracket flow, share templates, route metadata, and 50-image integration checks.
- 2026-10-03: replaced all five `hobby-discovery` result comics, checked the new scenes against result guidance and image anatomy, and synchronized cache-versioned paths and image guidelines.
- 2026-10-03: rewrote all 12 `hobby-discovery` prompts and 48 choices in four locales as everyday preference questions, reducing direct hobby cues while preserving the scoring map and answer-position balance.

## 2026-10-02 rest-style content

- Added `rest-style` as a seven-question, five-choice archetype quiz with five outcomes: quiet, movement, connection, immersion, and novelty. Each outcome is represented once in every question, all five outcomes are reachable, and exact-score ties use the shared deterministic resolver.
- Added matching Korean, English, Japanese, and Simplified Chinese page copy, quiz strings, metadata, share copy, and result guidance. The copy frames results as lighthearted preferences rather than a diagnosis.
- Added five square 2×2 cartoon result illustrations and linked the quiet-recharge image as the content-discovery thumbnail. Each comic presents four clear everyday scenes with no text or speech bubbles.
- Registered the content in the shared explorer, content-start allow-list, and sitemap. The original review was limited to manual source, locale, result mapping, image-path, and route inspection; automated integration and score-distribution audits were added later.

## 2026-10-03 hobby-discovery and quiz-order verification

- Added `hobby-discovery` as a 12-question quiz with four choices per question and five results: hands-on making, growing, flavor experiments, observation records, and puzzle design. Each choice maps to one result. Every result appears 9–10 times overall, 1–3 times in each answer position, never repeats in the same position on consecutive questions, and has a unique choice order per question.
- Added Korean, English, Japanese, and Simplified Chinese page copy, questions, choices, result descriptions, share copy, image alternatives, card metadata, and service/privacy disclosures. Results are playful suggestions, not diagnoses. Each result has a dialogue-free four-panel cartoon with its own person, palette, setting, and drawing treatment.
- Registered the quiz in the content explorer, start-count allow-list, sitemap, and shared archetype engine. Added audit checks for question count, four-locale key coverage, image mappings, and answer-position balance. The result-distribution audit now includes both `rest-style` and `hobby-discovery`.
- The site and image guides now require varied answer positions and repeatable checks for future quizzes.
- `node scripts/audit-integrations.mjs`: passed 19,989 checks across 88 localized pages, content discovery and recommendations, localized SEO, World Cup data/APIs, archetype data, assets, sitemap, redirects, and D1 docs.
- `node scripts/audit-result-distributions.mjs`: all 13 registered quiz/story contents had no result below the 3% floor and no unreachable outcomes. `hobby-discovery` used a fixed 2,000,000-case sample from 16,777,216 possible answer combinations; all five results appeared, with an observed range of 18.494%–22.247% and a tie rate of 12.458%.
- Answer-position audit: each result appears 9–10 times overall and 1–3 times per position; no result repeats its position on consecutive questions, and all 12 question orders are unique. `git diff --check`: passed.

## 2026-10-03 hobby-discovery image refresh

- Replaced all five hobby result comics with newly generated, lighter flat-cartoon scenes and removed the prior image files. The new scenes show: folding and using a cardboard desk organizer (maker), planting and watching a seed sprout (grower), tasting a berry-yogurt combination (flavor), recording cloud changes (observer), and a friend solving a shape-pattern puzzle (puzzler).
- Matched the scene progression to each result's catchphrase, description, and first-step suggestion; reviewed all panels for character continuity, hand/arm count and attachment, object orientation, and composition. Updated localized image alt text to describe the new scenes.
- Published the new assets with versioned filenames to refresh browser/CDN caches; synchronized profile and discovery-card image paths, image documentation, and the image-generation checklist.

## 2026-10-03 hobby-discovery question wording

- Rewrote the 12 question prompts and 48 answer choices in Korean, English, Japanese, and Simplified Chinese to ask about everyday preferences, reactions, and ways of approaching situations instead of naming the matching hobby or its signature materials.
- Kept all answer-to-result score mappings, choice order, and per-position distribution unchanged; only localized display text changed.
- `node scripts/audit-integrations.mjs`: passed 19,989 checks across 88 localized pages; locale keys and hobby answer-position rules remain valid. `git diff --check`: passed. Score-distribution analysis was not needed because scoring did not change.
