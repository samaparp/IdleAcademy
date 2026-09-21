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
| **Multiplier**     | Accumulated buffs, multiplied into the output    | **Always on** |
| **Preserve chance**| Percentage chance the inputs are **not** consumed | Later skills |

[[Study]] has tick length, output and XP, and nothing else. A skill that
does not declare the others behaves as though success is 100% and nothing
is preserved.

> [!important] The multiplier is not a skill setting
> It is **always applied**, and it does not live in `CONFIG.skills`. It is
> the product of whatever buffs the [[Character]] has accumulated that act
> on that skill — from Titles, furniture, equipment and anything else.
>
> The character currently has no buffs, so it resolves to **x1**.
>
> This needs a resolver — one function that answers "what is the
> multiplier for this skill right now", reading character state rather
> than config. Every buff source registers with it, so no skill ever
> hardcodes a bonus.

## Settled rules

> [!info] These apply to every skill, not per skill
> - **A failed tick consumes its inputs.** Failure costs materials, not
>   just time.
> - **Buffs are multiplicative.** +10% and +20% give **x1.32**, not x1.30.
> - **Offline rolls honestly**, tick by tick. No expected-value shortcut.

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

> [!question] Undecided
> - **Can a tick fail and still preserve its inputs?** If the two rolls
>   are independent, yes. If preserve only applies to a successful tick,
>   no. A failed tick consumes inputs either way.
> - Is the multiplier applied **before or after** any rounding of the
>   output?

> [!note] Offline rolls honestly, and it is cheap
> Measured: **86,400 ticks resolve in ~22 ms** with two rolls, the
> multiplier, XP and level-up checks in the loop. A 100 ms tick over 24
> hours — 864,000 ticks — took ~25 ms. That is a server CPU, but the
> margin against a half-second budget is roughly twentyfold.
>
> The one way to lose that margin is **allocating an object per tick**.
> Keep the loop to plain numbers and it stays trivial.
