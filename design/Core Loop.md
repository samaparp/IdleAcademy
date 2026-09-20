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

| Source    | Rate           | Accrues from         | Offline |
| --------- | -------------- | -------------------- | ------- |
| **Skill** | Per tick       | When the page closed | Yes     |
| **Hunt**  | Per **minute** | The last claim       | Yes     |

- **Skill** income is the resource the running skill produces — [[Notes]]
  from [[Study]], and so on. One skill runs at a time (see [[Character]]),
  so only that skill earns.
- **Hunt** income is **[[Quid]]**, paid per minute. It is **passive**: it
  accrues alongside whatever skill is running, rather than competing for
  the single activity slot. A cleared district pays a retainer whether or
  not the [[Character]] is in the library.
- Hunt income depends on **which cleared stage the player selects as the
  hunting ground** — not automatically on the furthest one. The choice
  decides the **type and quantity** of what accrues. See [[Hunt]].

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

See [[Hunt]] for stages, locations and the hunting ground, and [[Combat]]
for how a stage is cleared.

> [!info] Settled
> - Stages are grouped by **location**; **Travel** picks the location.
> - Clearing a stage runs a **deterministic simulation** — it plays out,
>   but never rolls dice.
> - Hunt is **not an activity**: it never competes with a skill for the
>   single activity slot.

## Open questions

> [!info] Settled
> - **"Skill upgrades" means levelling and tier unlocks** — reaching higher
>   skill levels and opening the next skill. There is no separate upgrade
>   purchase.
> - **The skill you left running is the one that keeps accumulating.** So
>   the last thing the player taps before closing the game is a real
>   decision, and the UI should make that obvious rather than let them
>   discover it by losing a night.

> [!question] Undecided
> - The two accrual baselines differ — hunt from the last claim, skill from
>   when the page closed. Is that right? If skill also ran from the last
>   claim, a long play session would eat the offline allowance before the
>   player even left.
> - Does the speed multiplier in Test tools apply to offline accrual when
>   testing it?
> - See [[Hunt]] for the open questions on payouts, switching hunting
>   grounds, and claiming.
