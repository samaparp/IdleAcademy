---
tags:
  - design
  - system
status: being designed
---

# Skill Model

The anatomy of one skill tick. [[Study]] uses the simplest possible form
of it; later skills use more of it. See [[Crafting]] for why crafting is
just a skill.

## What a tick can have

| Field              | Meaning                                          | Used by |
| ------------------ | ------------------------------------------------ | ------- |
| **Tick length**    | How long one attempt takes                       | All     |
| **Inputs**         | Items **consumed** per tick                      | Crafting |
| **Output**         | What it produces                                 | All     |
| **XP**             | Granted per tick                                 | All     |
| **Success chance** | Percentage. A failed tick produces nothing       | Later skills |
| **Multiplier**     | Accumulated buffs, multiplied into the output    | Later skills |
| **Preserve chance**| Percentage chance the inputs are **not** consumed | Later skills |

[[Study]] has tick length, output and XP, and nothing else. A skill that
does not declare the others behaves as though success is 100%, the
multiplier is 1, and nothing is preserved.

## Running out of materials

A crafting skill stops when its inputs run out.

> [!important] QOL: show when it will run dry
> The UI shows an **estimated time until the skill runs out of materials
> and switches itself off**, so the player can decide whether to leave it
> running before closing the game.
>
> With a preserve chance in play this is an **estimate**, not a promise —
> the real figure drifts with the rolls. It must be **shown as
> approximate** ("~12 min"), never as an exact countdown, or it will look
> like a bug the first time it is wrong.

## Open questions

> [!question] Order of operations — has to be settled once, for all skills
> A tick with inputs, a success roll and a preserve roll can resolve in
> several orders, and they give different games:
> - **Does a failed tick still consume its inputs?** In most games it
>   does, and that is the cost of failure. If it does not, failure costs
>   only time.
> - **Can a tick fail and still preserve?** If the two rolls are
>   independent, yes. If preserve only applies on success, no.
> - Is the multiplier applied to the output **before or after** anything
>   rounds?

> [!question] How do buffs stack?
> "Accumulated buffs multiplied to output" needs one rule: do several
> buffs **add up and then multiply once** (+10% and +20% becomes x1.3), or
> **multiply together** (x1.1 x 1.2 = x1.32)? The difference compounds
> badly over a whole game, so it should be decided before there are
> several buffs.

> [!danger] Success chance breaks determinism
> Everything in the game so far is deterministic, including [[Combat]] by
> explicit decision. A percentage success chance introduces **randomness
> into skills**, and skills resolve **offline**.
>
> That means 24 hours away is resolved by rolling thousands of times that
> the player never sees. Rolling honestly is cheap and fine — but the
> player cannot verify it, and a run of bad luck is indistinguishable
> from a bug.
>
> Worth deciding deliberately: **roll every tick**, or **use the expected
> value for offline** and roll only while the player is watching.
