# Existing content audit baseline

Reviewed: 2026-10-02
Status: complete; the current baseline covers all 14 active entries, and existing catalog copy is frozen by default under [the site quality framework](site-quality-framework.md#콘텐츠-기준선과-재검토-범위).

## Scope

The baseline covers the 14 active entries in `assets/js/content-registry.js`: Korean source copy and the English, Japanese, and Simplified Chinese versions of their cards, titles, descriptions, questions, answer choices, results, share copy, story reactions, and supporting metadata. It includes inline World Cup candidate names and descriptions, plus related result assets and registered counts. General navigation and policy pages are covered by the normal integration and localization checks, not by this content freeze.

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

## Reopening this baseline

- Do not manually reread or rewrite these unchanged content entries during unrelated reviews or routine integration checks.
- Reopen only when the user directly asks to review or change a named entry, asks for a full catalog review, or asks to add new content. A targeted request reopens only the named entry and its connected locales and surfaces; a full-review request reopens all entries.
- For new content, complete the same source, four-locale, result, share, metadata, asset, and score-reachability checks before adding its ID, counts, date, findings, and verification to this file.
- Record later content reviews as dated deltas below rather than repeating the full report.

## Review history

- 2026-10-01: completed the initial 12-entry baseline; corrected stale weekend and Past Life counts, extended Chinese residual scanning to inline World Cup text, and verified all result distributions.
- 2026-10-02: added `night-train` to the baseline after integration checks, an exact outcome-distribution review, and confirmation of its four-locale page and asset mapping.
- 2026-10-02: added `month-stay` after the four-locale content, bracket flow, share templates, route metadata, and 50-image integration checks.
