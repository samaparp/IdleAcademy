---
tags:
  - design
  - system
status: being designed
---

# Hunt

The second income stream of [[Idle Academy]], and the reason the
[[Character]] studies at all.

> [!abstract] Summary
> **Hunt is not an activity.** It does not occupy the one-skill-at-a-time
> slot. You clear stages, then pick one cleared stage as your **hunting
> ground**, and it pays out over time whether or not you are playing.

## Stages and locations

- Stages are grouped by **location**. The **Travel** tab selects the
  location; the **Hunt** tab selects the stage within it.
- Clearing a stage is a one-off. Once cleared, it stays cleared.
- A cleared stage becomes **selectable as the hunting ground**.

> [!important] The hunting ground is a choice, not a high-water mark
> AFK Arena ties income to your highest cleared stage automatically. Here
> the player **picks** which cleared stage to hunt, and that choice decides
> **the type and quantity of resources gained**.
>
> This is the better design and it solves a problem the skill ladder still
> has: an early stage that drops something unique stays worth hunting
> forever, so old content does not die the moment new content opens.

> [!question] Consequence worth knowing
> Every stage needs a designed **loot table** — what it yields and how
> fast. The stage count does not matter to the code, which walks a list of
> whatever length. It matters as **content**: each stage is a small design
> job, and the loot tables are where the game's economy actually lives.

## Clearing a stage

- Resolved by a **simulation** — it plays out rather than resolving in a
  single hidden step.
- **Deterministic**: no random rolls. The same attempt with the same
  preparation always gives the same result, so a player can know whether
  they are ready rather than re-tapping to reroll.
- Run by the [[Combat]] system, which is **not yet designed**.

## Income

| Source    | Rate           | Accrues from       |
| --------- | -------------- | ------------------ |
| **Skill** | Per tick       | When the page closed |
| **Hunt**  | Per **minute** | The last claim     |

- Hunt income accrues **continuously, online and offline**, from the moment
  it was last claimed.
- Both streams stop after **24 hours**.
- Collected by **tapping a button**. Nothing is granted silently.
- Skill income is whatever the running skill produces — see [[Core Loop]].

## Open questions

> [!question] Undecided
> - **Does a hunting ground pay [[Quid]], materials, or both?** "Type and
>   quantity of resources" suggests materials; quid was going to be the
>   hunt's payout. Both is plausible — a bounty plus what you carry back.
> - **What happens to banked income when the hunting ground is switched?**
>   Does the unclaimed pile stay, convert, or get lost? A player who
>   switches after 20 hours will care a great deal.
> - **One hunting ground at a time?** Presumably yes, but worth stating.
> - **Does the claim button claim both streams at once**, or one each?
> - **Does travelling to a location cost anything** — time, quid, an
>   unlock — or is it a free menu once the location is known?
