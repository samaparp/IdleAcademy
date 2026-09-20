---
tags:
  - design
  - system
status: being designed
---

# Core Loop

How [[Idle Academy]] spends and rewards the player's time.

> [!abstract] The loop
> Time goes in at the **Skill** tab, money comes out at the **Hunt** tab,
> and money buys back time.

```
Study (time)  →  Notes and other research outputs
                      ↓ spent to prepare
                 Clear a Hunt stage
                      ↓ permanently raises
                 Quid income per stage cleared
                      ↓ buys
                 Upgrades and unlocks
                      ↓ let you reach
                 The next Hunt stage
```

## The two income streams

| Source    | Rate           | Earned while offline |
| --------- | -------------- | -------------------- |
| **Skill** | Per tick       | Yes                  |
| **Hunt**  | Per **minute** | Yes                  |

- **Skill** income is the resource the running skill produces — [[Notes]]
  from [[Study]], and so on. One skill runs at a time (see [[Character]]),
  so only that skill earns.
- **Hunt** income is **[[Quid]]**, paid per minute. It is **passive**: it
  accrues alongside whatever skill is running, rather than competing for
  the single activity slot. A cleared district pays a retainer whether or
  not the [[Character]] is in the library.
- Hunt income is **tiered by the furthest stage cleared** — the AFK Arena
  model. Clearing a stage raises the rate permanently.

## Offline progress

> [!important] Baked into the design
> Both streams accrue while the game is closed.
>
> - Cap: **24 hours**.
> - Collected by **tapping a button**, not granted silently on load.

> [!warning] Not implemented, not fully designed
> `lastPlayed` exists in the save to support this. The collection button,
> the screen it lives on, and what the player sees when they return are all
> still to be designed.
>
> The engine today uses `requestAnimationFrame`, which the browser pauses
> when the page is hidden, so nothing accrues while closed. That is the
> current implementation, not the intended design.

> [!danger] Safari evicts storage after 7 days
> Offline accrual makes this worse: a save now represents days of banked
> income, not just a level. The copy/paste export in [[Save System]] moves
> from nice-to-have to the thing that protects real progress.

## Hunt stages

> [!question] Being designed
> - **What gates a stage?** The cheapest version that works: a stage costs
>   research outputs to attempt, optionally with a skill-level requirement.
>   No separate power stat — the gate *is* the preparation. A richer
>   version adds equipment from the **Inv** tab as a second axis, so
>   [[Quid]] buys reductions in that cost.
> - **How many stages, and do they group by location?** This decides
>   whether **Travel** is a menu or a progression of its own.
> - Clearing a stage is proposed as **instant and deterministic**: meet the
>   requirements, clear it. No combat simulation, no random failure — the
>   time was already paid in the Skill tab, and repeating a failed tap is
>   not gameplay.

## Open questions

> [!question] Undecided
> - **What does "skill upgrades" mean?** Levelling as it already works, or
>   spending resources to improve a skill's rate?
> - **Does the 24-hour cap apply per stream or to the whole session away?**
> - **What if no skill was running when the player left?** Presumably hunt
>   income accrues and skill income does not — so the last thing you tap
>   before closing the game matters.
> - Does the speed multiplier in Test tools apply to offline accrual when
>   testing it?
