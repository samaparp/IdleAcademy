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

> [!info] Tiers are separate skills
> **Decided:** higher research tiers are **separate skills**, each with its
> own level 1-100 and its own output resource — not extra actions inside one
> skill. This skill is **tier 1** and produces [[Notes]].

> [!question] Tier 1 needs a real name
> "Research" is the name of the *category*, not of this skill. The tier-1
> skill needs a name of its own before tier 2 arrives. **Undecided.**

> [!question] Structural, not yet decided
> - **Can two skills run at once?** The engine currently runs exactly one
>   activity at a time. With separate tier skills this becomes a real
>   choice: one activity across the whole game, or one per skill in
>   parallel.
> - **How does tier 2 unlock?** A level in tier 1, a quantity of [[Notes]]
>   spent, or something else.
> - **Does tier 1 stay useful?** If tier 2 strictly beats it, nothing is
>   produced at tier 1 after the switch and it becomes dead content.
> - **Navigation.** One screen holds one skill today. Several skills need a
>   way to move between them.
> - **The curve.** `L × 10` to level 100 is ~1 h 22 min of unbroken play at
>   ×1. That was set for a single skill with a single action and will likely
>   need rebalancing once there is a ladder of them.

## History

- Renamed from **Meditation** (skill) and **Insight** (resource) when the
  world theme became a steampunk academy. Saves from before the rename are
  migrated automatically (save version 1 → 2).
