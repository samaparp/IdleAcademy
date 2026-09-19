---
tags:
  - design
  - skill
skill-id: research
status: implemented
---

# Research

The first **gathering skill** in [[Idle Academy]], and the template every
later skill copies. A single toggled activity that grants XP and [[Notes]]
once per second.

> [!abstract] Summary
> Tap **Research** to start. Every tick grants **+10 XP** and **+1 Note**.
> Tap again to stop. Levels 1 to 100.

## Activity

- One button, labelled **Research**.
- The button is a **toggle**: tap to start, tap again to stop.
- While active it runs **one tick per second**.
- Per tick:
	- `+10 XP`
	- `+1 Note`

## Levelling

- Levels **1 to 100**.
- XP required to go from level `L` to `L + 1` is `L × 10`.
	- Level 1 → 2: 10 XP
	- Level 2 → 3: 20 XP
	- Level 3 → 4: 30 XP
	- Level 99 → 100: 990 XP
- Total XP from level 1 to level 100: **49,500 XP**.
- At 10 XP per tick that is **4,950 ticks**, i.e. 4,950 seconds (~1 h 22 min)
  of unbroken research at ×1 speed.
- Excess XP from a tick **carries over** into the next level.

> [!important] At max level
> At level 100 the skill **stops gaining XP**. **Notes keep accruing** at the
> same rate, so researching at max level is still useful.

## UI

The Research screen shows:

- Skill title.
- Level display (current level, out of the 100 maximum).
- **Research** button with a visible **tick progress indicator** — a fill that
  sweeps across the button once per tick, so the player can see the tick
  landing.
- XP bar with **`current / needed XP`** text underneath.
- Notes display.

At max level the XP bar reads full and the text reads `Max level — XP stopped`.

## Tuning

All of the numbers above live in `js/config.js` under `CONFIG.skills.research`
and can be changed without touching game logic:

| Config key        | Meaning                     | Value    |
| ----------------- | --------------------------- | -------- |
| `tickMs`          | Tick length in milliseconds | `1000`   |
| `xpPerTick`       | XP granted per tick         | `10`     |
| `resourcePerTick` | Notes granted per tick      | `1`      |
| `maxLevel`        | Highest reachable level     | `100`    |
| `xpForNextLevel`  | XP from level `L` to `L + 1`| `L × 10` |

## Open questions

> [!question] Higher Research tiers
> The intent is for Research to have **higher tiers that yield higher-tier
> resources** (Notes → Sketches → …). **Not designed or implemented.**
> Undecided:
> - Are tiers **actions inside the Research skill** (one skill, several
>   buttons, each gated by level) or **separate skills**?
> - Do higher tiers **replace** lower ones, or does the player keep wanting
>   Notes because later systems consume them?
> - Do higher tiers grant more XP per tick, take longer per tick, or both?
>
> The current 1-to-100 curve was set before tiers were on the table and will
> likely need rebalancing once they are.

> [!question] Button verb
> The button reads **Research**, matching the skill name. **Study**, **Read**
> or **Take notes** are alternatives if the noun-as-verb reads oddly in play.

## History

- Renamed from **Meditation** (skill) and **Insight** (resource) when the
  world theme became a steampunk academy. Saves from before the rename are
  migrated automatically (save version 1 → 2).
