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

Hunt income accrues **per minute, continuously, online and offline**, from
the moment it was last claimed. It stops after **24 hours** and is collected
by **tapping a button**.

> [!note] The claim button is Hunt's alone
> Skill income works differently: it is granted tick by tick and never
> claimed. See [[Core Loop]].

### What a hunting ground pays

A hunting ground yields **several types of resource**, decided by the stage
— not a single currency. It also pays **some [[Quid]]**, but that is not
where the money mainly comes from: **[[Quid]] is earned primarily by
selling things.**

### The claim button

- Shows the **accrued time** on or beside it, so the player can see how
  much is waiting without doing arithmetic.
- **Changes colour when full** — the 24-hour cap reached, and further time
  is being wasted.
- **Disabled below one minute** of accrual: there is nothing worth
  claiming, and the button should say so rather than pay out nothing.

### Switching hunting grounds

Switching **auto-claims** whatever is banked first. Nothing is lost, and
the player is never punished for changing their mind mid-accrual.

## Open questions

The claim button lives in the **Hunt tab**. A player busy skilling would
never see it fill, so the Hunt tab carries a **notification dot** once at
least **4 hours** have accrued — see [[Idle Academy]].

> [!question] Undecided
> - **One hunting ground at a time?** Everything so far assumes yes, but it
>   has not been stated.
> - **Does travelling to a location cost anything** — time, quid, an
>   unlock — or is it a free menu once the location is known?
> - Whether anything **other than the Hunt tab** should ever raise a dot.
