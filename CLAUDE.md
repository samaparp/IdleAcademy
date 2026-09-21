# Idle Academy — project rules

Text-based idle game: a Victorian monster hunter who studies his quarry.
Skilling, crafting, levelling. No graphics.

> **The pillar.** The game represents **a character pursuing careers**.
> The player picks a path, masters skills, and takes the titles that go
> with them. It is **idle** and **minimal** throughout — no graphics, no
> busywork, no mechanic that demands attention rather than earning it.
> When a design choice is unclear, the one that keeps it idle and minimal
> is usually right.

## Roles

- **The user is the game designer.** Claude's role is implementation.
- Build what is specified — nothing more.
- **Do not invent mechanics, skills, resources, or systems that were not
  asked for.** This includes "obvious" idle-game staples (prestige,
  upgrade shops, multiple simultaneous activities, achievements).
  Offline progress and a combat system ARE part of the design — see
  `design/` — but neither is implemented, and neither gets built until
  asked for.
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
	- **Notification dots**: a small filled circle in the top-right corner
	  of a button, for anything needing attention. A shared pattern, not a
	  one-off. It carries **no text equivalent** — that is the designer's
	  decision, so do not add one; mark the dot `aria-hidden` so nothing
	  announces an empty element. Thresholds live in `CONFIG`.
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

Two income streams, with **different mechanisms** and **different clocks**.
They are not variations of one system.

- The skill cap measures **away time** — from the page closing to it being
  reopened.
- The hunt cap measures **time since the last claim**, which keeps running
  while the player is sitting in the game.

**Skill — ticks, granted directly.**
- A skill grants its resource and XP every time its tick timer completes,
  whether or not the player is watching.
- Offline resolution takes the time away, caps it at **24 hours**, and
  resolves it into ticks. **It must step through level-ups, not multiply**
  — per-tick gains will change with level, so a flat multiplication would
  short-change the player for levelling.
- **Partial ticks carry over across being away, and nowhere else.** The
  part-finished tick is saved when the page closes and the away time is
  added to it, so a long tick is not lost by closing the game.
  **Stopping a skill, or switching to another, resets the timer** and
  discards the partial tick. That is deliberate, not an oversight: do not
  "fix" it by saving per-skill progress.
- Whichever skill was running when the page closed is the one that keeps
  ticking.
- **No claim button.** Skill gains are not claimed.
- On return, a **pop-up** reports what was earned while away.

**Hunt — accrues per minute, claimed.**
- Accrues from the moment it was **last claimed**, online and offline alike.
- Stops after **24 hours**.
- Collected by **tapping a button**, never granted silently. The button
  shows the **accrued time**, **changes colour when full** at 24 hours, and
  is **disabled below one minute** of accrual.
- Switching hunting grounds **auto-claims** whatever is banked first.

**Offline rolls honestly**, tick by tick — no expected-value shortcut.
Measured at ~22 ms for 86,400 ticks, so the only way to lose that headroom
is allocating an object per tick. Keep the loop to plain numbers.

**Buffs are multiplicative** (+10% and +20% give x1.32). A **failed tick
still consumes its inputs**. **Failure and preservation are independent
rolls** — a tick can fail and still preserve. The output **multiplier is
always on**, calculated per skill from the character's accumulated buffs
rather than hardcoded in `CONFIG.skills`, and **output is always a whole
number**. See `design/Skill Model.md`.

**Neither is implemented.** `lastPlayed` exists to support the skill side.

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
- **`design/Open Questions.md` is the index of everything undecided.**
  When the designer answers something, update **both** in the same commit:
  write the answer into the topic note, and **delete the item** from the
  index. When a new question appears, add it to both.
  An index that drifts is worse than no index, because it is trusted.
- Open Questions is grouped by **what it blocks**, not by topic. New items
  go in the group that matches what they hold up.

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
