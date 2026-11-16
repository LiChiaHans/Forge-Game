# Working on Forge Master

Read `README.md` and the short `docs/PROJECT_CONTEXT.md`; locate functions through `docs/function-index.tsv`. Edit only the relevant `src/js/<system>/` and `src/styles/` files. Avoid loading the complete generated `game.js`, `game.css`, large sprite catalogs or media manifests unless the task needs them.

`src/build-order.json` preserves the order of the original single script and CSS cascade. The source files are fragments assembled into one classic script; they are not separate ES modules. Keep wrappers/adapters and top-level initialization in their current order.

Build with `node tools/build.cjs`; verify with `node tools/check.cjs`. Generated website files are `index.html`, `game.js`, `game.css`. `.build/` is local-only. Update `docs/function-index.tsv` through the builder. Use Git for history instead of copying a whole HTML for each update.

Preserve formal saves, first-point skill rules, asset URLs, and backend isolation. Never submit synthetic QA players or test records to the live leaderboard. Downloadable single-file exports are optional and generated with `node tools/standalone.cjs <output.html>`.
