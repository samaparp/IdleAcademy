---
tags:
  - design
  - skill
skill-id: study
status: implemented
---

# Study

**Tier 1** of the [[Research]] category in [[Idle Academy]], and the template every later
skill copies. A single toggled activity that grants XP and [[Notes]]
once per second.

> [!abstract] Summary
> Tap **Study** to start. Every tick grants **+10 XP** and **+1 Note**.
> Tap again to stop. Levels 1 to 100.

## Activity

- One button, labelled **Study**; it reads **Studying** while it runs.
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
  of unbroken study at ×1 speed.
- Excess XP from a tick **carries over** into the next level.

> [!important] At max level
> At level 100 the skill **stops gaining XP**. **Notes keep accruing** at the
> same rate, so studying at max level is still useful.

## UI

Lives in the **Skill** tab, under the **Research** category heading. The
skill card shows:

- Skill title.
- Level display (current level, out of the 100 maximum).
- **Study** button with a visible **tick progress indicator** — a fill that
  sweeps across the button once per tick, so the player can see the tick
  landing.
- XP bar with **`current / needed XP`** text underneath.
- Notes display.

At max level the XP bar reads full and the text reads `Max level — XP stopped`.

## Tuning

All of the numbers above live in `js/config.js` under `CONFIG.skills.study`
and can be changed without touching game logic:

| Config key        | Meaning                     | Value    |
| ----------------- | --------------------------- | -------- |
| `tickMs`          | Tick length in milliseconds | `1000`   |
| `xpPerTick`       | XP granted per tick         | `10`     |
| `resourcePerTick` | Notes granted per tick      | `1`      |
| `maxLevel`        | Highest reachable level     | `100`    |
| `xpForNextLevel`  | XP from level `L` to `L + 1`| `L × 10` |

## Open questions

> [!question] Still open
> - **How does Sketch unlock?** A level in Study, a quantity of
>   [[Notes]] spent, or something else.
> - **Does Study stay useful?** If Sketch strictly beats it, nothing is
>   produced here after the switch and Study becomes dead content.
> - **The curve.** `L × 10` to level 100 is ~1 h 22 min of unbroken play at
>   ×1. That was set for a single skill and will likely need rebalancing now
>   that there is a ladder of four.

## History

- **Meditation** → **Research** → **Study**. "Research" turned out to be
  the name of the category, not of this skill.
- The resource was renamed from the placeholder **Insight** to [[Notes]].
- Saves migrate automatically: version 1 → 2 → 3, so progress made under
  any earlier name is kept.
