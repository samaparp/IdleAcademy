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

| Source    | Rate           | How it arrives     | Claimed |
| --------- | -------------- | ------------------ | ------- |
| **Skill** | Per tick       | Granted each tick  | No      |
| **Hunt**  | Per **minute** | Banked until taken | Yes     |

These are **two different mechanisms**, not one system with two rates.

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

> [!danger] Offline resolution must step through level-ups
> **Per-tick gains will change with level** — that mechanic is planned.
> So offline resolution can **never** be `ticks x per-tick gain`: it has to
> walk the ticks, applying level-ups as they happen, or a player who levels
> while away is paid at their old rate for the whole period.
>
> Write it that way from the start. Twenty-four hours of a one-second tick
> is 86,400 iterations, which is trivial for a browser, and a closed-form
> shortcut can replace the loop later if a skill ever ticks fast enough to
> matter.

> [!important] Partial ticks carry over across being away — and nowhere else
> | Case                              | Partial tick |
> | --------------------------------- | ------------ |
> | Close the page mid-tick, come back | **Carried**  |
> | Stop the skill, start it again     | Discarded    |
> | Switch to another skill            | Discarded    |
>
> So the part-finished tick is **saved when the page closes**, and the away
> time is added to it — a fifteen-minute tick is not thrown away by
> shutting the game. Within a session, stopping or switching **resets the
> countdown**, which is deliberate: committing to a long tick is the cost
> of running a long skill.
>
> The engine already zeroes its accumulator when a skill is toggled, which
> is the correct behaviour. The only change needed is persisting that
> accumulator when the page closes.

> [!important] Two different clocks
> The two 24-hour caps do not measure the same thing.
>
> - **Skill** measures **away time** — page closed to page reopened.
> - **Hunt** measures **time since the last claim**, which keeps running
>   while the player is sitting in the game doing something else.

> [!question] Undecided
> - **Is offline skill progress shown to the player?** It is granted rather
>   than claimed, but "you gained 3,400 Notes while away" is information
>   worth giving. Silent or summarised?
> - Does the speed multiplier in Test tools apply to offline resolution
>   when testing it?
> - See [[Hunt]] for the open questions on payouts, switching hunting
>   grounds, and claiming.
