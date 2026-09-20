# Idle Academy — project rules

Text-based mage idle game (skilling, crafting, levelling). No graphics.

## Roles

- **The user is the game designer.** Claude's role is implementation.
- Build what is specified — nothing more.
- **Do not invent mechanics, skills, resources, or systems that were not
  asked for.** This includes "obvious" idle-game staples (prestige, offline
  progress, upgrades, multiple simultaneous activities, achievements).
- When something is undefined: **ask**, or use a **clearly labelled
  placeholder** and say so in the summary.
- Report any assumptions that had to be made.

## Tech constraints

- Plain **HTML, CSS and JavaScript**. No framework, no build step, no
  bundler, no package manager, no TypeScript.
- Must run directly from **GitHub Pages**: `index.html` at the repo root,
  **relative paths only**.
- Scripts are plain `<script>` tags loaded in dependency order (not ES
  modules), so the game also opens from `file://`.
- **Mobile-first.** The user tests on a phone:
	- Tap targets at least 48px tall.
	- Body text at least 16px (prevents mobile zoom-on-focus).
	- Light **and** dark mode via `prefers-color-scheme`.
- Keep code split by concern so new skills can be added later:
  config, game logic, save system, UI.

## Config

- **Every tuning value lives in `js/config.js`.** Tick length, XP per tick,
  resource per tick, XP formula, max level, autosave interval, test-tool
  speeds.
- Game logic must never hardcode a number the designer might want to
  rebalance. Read it from `CONFIG`.

## Save system

- Autosave to **localStorage**, every write and read wrapped in
  **try/catch** (private mode and full quotas throw).
- The save carries a **version number** and a **`lastPlayed` timestamp**.
- Migrations run on load, one version step at a time. Renaming anything the
  save stores means adding a migration, never resetting the player.

## Offline progress

**Offline progress is part of the design.** See [[Core Loop]] in `design/`.

- Both income streams accrue while the game is closed: **skill ticks** (for
  whichever skill was running) and **hunt income per minute**.
- Capped at **24 hours**.
- Collected by **tapping a button**, not granted silently.
- **Not yet implemented, and not yet fully designed.** `lastPlayed` exists
  to support it.

> The engine currently uses `requestAnimationFrame`, which the browser
> pauses when the page is hidden, and clamps elapsed time per frame. That
> means no progress accrues while closed or backgrounded **today**. This is
> an implementation state, NOT a design rule — do not "restore" it as one.

## Test tools

- A collapsible **"Test tools"** section on the page.
- Speed multipliers ×1 / ×10 / ×100 (scale real elapsed time, so ×10 means
  ten ticks per real second).
- A reset button that requires a **second tap to confirm**.

## Design docs

- `design/` holds **Obsidian-compatible Markdown** notes.
- Use `[[wiki links]]` and Obsidian callouts (`> [!note]`). **No HTML.**
- Tabs for list indentation (Obsidian default).
- **Keep the notes updated whenever the spec changes.** A spec change means
  editing the design note *and* `js/config.js` together.

## File structure

```
index.html            Single screen; loads everything in dependency order
css/main.css          Mobile-first styling, light + dark themes
js/config.js          ALL tuning values
js/leveling.js        Generic XP/level maths (pure functions)
js/state.js           In-memory state, new-game defaults, save normalisation
js/save.js            localStorage read/write/migrate/clear
js/skills/            One module per skill; each owns its tick()
js/engine.js          rAF tick loop, active activity, speed multiplier
js/ui.js              All DOM reading/writing
js/game.js            Boot, autosave, page lifecycle
design/               Obsidian design notes
```

## Adding a new skill

1. Add its tuning block to `CONFIG.skills` in `js/config.js`.
2. Add `js/skills/<name>.js` exposing a `tick(state)`, and register it in
   `Skills.registry`.
3. Add its `<script>` tag to `index.html` before `js/engine.js`.
4. Add the markup and wire it in `js/ui.js`.
5. Write the design note in `design/` and link it from `[[Idle Academy]]`.

## Conventions

- Metric units everywhere.
- Minimal to no emoji.
- Comments explain *why*, and flag anything that is a placeholder.
