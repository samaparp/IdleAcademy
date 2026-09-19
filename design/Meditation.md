---
tags:
  - design
  - skill
skill-id: meditation
status: implemented
---

# Meditation

The first skill in [[Idle Academy]]. A single toggled activity that grants XP
and a resource once per second.

> [!abstract] Summary
> Tap **Meditate** to start. Every tick grants **+10 XP** and **+1 Insight**.
> Tap again to stop. Levels 1 to 100.

## Activity

- One button, labelled **Meditate**.
- The button is a **toggle**: tap to start, tap again to stop.
- While active it runs **one tick per second**.
- Per tick:
	- `+10 XP`
	- `+1 Insight`

> [!note] Insight is a placeholder
> **Insight** is a placeholder resource name and will be renamed once the
> resource economy is designed.

## Levelling

- Levels **1 to 100**.
- XP required to go from level `L` to `L + 1` is `L × 10`.
	- Level 1 → 2: 10 XP
	- Level 2 → 3: 20 XP
	- Level 3 → 4: 30 XP
	- Level 99 → 100: 990 XP
- Total XP from level 1 to level 100: **49,500 XP**.
- At 10 XP per tick that is **4,950 ticks**, i.e. 4,950 seconds (~1 h 22 min)
  of unbroken meditation at ×1 speed.
- Excess XP from a tick **carries over** into the next level.

> [!important] At max level
> At level 100 the skill **stops gaining XP**. **Insight keeps accruing** at
> the same rate, so meditating at max level is still useful.

## UI

The Meditation screen shows:

- Skill title.
- Level display (current level, out of the 100 maximum).
- **Meditate** button with a visible **tick progress indicator** — a fill that
  sweeps across the button once per tick, so the player can see the tick
  landing.
- XP bar with **`current / needed XP`** text underneath.
- Insight display.

At max level the XP bar reads full and the text reads `Max level — XP stopped`.

## Tuning

All of the numbers above live in `js/config.js` under
`CONFIG.skills.meditation` and can be changed without touching game logic:

| Config key         | Meaning                          | Value          |
| ------------------ | -------------------------------- | -------------- |
| `tickMs`           | Tick length in milliseconds      | `1000`         |
| `xpPerTick`        | XP granted per tick              | `10`           |
| `resourcePerTick`  | Insight granted per tick         | `1`            |
| `maxLevel`         | Highest reachable level          | `100`          |
| `xpForNextLevel`   | XP from level `L` to `L + 1`     | `L × 10`       |

> [!tip] Keep this note in sync
> When the spec changes, update this note **and** `js/config.js` together.
