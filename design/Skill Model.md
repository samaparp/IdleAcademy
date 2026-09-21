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

> [!important] The multiplier is per skill, but never hardcoded
> It is calculated **separately for each skill** and is **always on**. It
> is not a fixed number in `CONFIG.skills` — it is the product of whatever
> buffs the [[Character]] has accumulated **that act on that skill**, from
> Titles, furniture, equipment and anything else.
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
> - **Failure and preservation are independent rolls.** A tick can fail
>   and still preserve its inputs, or succeed and consume them. The two
>   never gate each other.
> - **Output is always a whole number.** There is no such thing as 1.32
>   notes — the fraction is **carried to the next tick**, not rounded
>   away.

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

## Rounding the multiplied output

Output must be whole. `1 x 1.32` cannot be 1.32 notes, so something has to
give.

> [!question] Under debate
> The proposal on the table is **round at the half**: x1.32 always yields
> 1, x1.6 always yields 2. The alternative floated was **round down**.
>
> **Both have the same flaw**, and it lands hardest exactly where the
> player is most sensitive to it — the early game, where base outputs are
> 1:
>
> | Multiplier | Round half | Floor | What the player sees |
> | ---------- | ---------- | ----- | -------------------- |
> | x1.0       | 1          | 1     | —                    |
> | x1.4       | 1          | 1     | **a +40% buff doing nothing** |
> | x1.6       | 2          | 1     | +60% suddenly worth +100%, or still nothing |
> | x1.99      | 2          | **1** | floor: a +99% buff doing nothing |
>
> A buff that visibly changes no number is worse than no buff. And the
> jump at the threshold overpays — x1.6 paying double is as wrong as
> x1.4 paying nothing.

> [!info] Decided: carry the remainder
> Keep a running fraction per skill. A x1.32 multiplier on a base of 1
> yields **1, 1, 1, 2, 1, 1, 1, 2 …** — exactly 1.32 per tick averaged,
> with every output a whole number.
>
> - **Deterministic.** No stochastic rounding, no RNG, nothing the player
>   cannot verify by watching.
> - **Exact.** Nothing is lost to rounding and nothing is invented.
> - **Visible.** A +32% buff is worth +32%, immediately, rather than
>   nothing until some threshold is crossed.
> - **Already the house pattern** — it is the same accumulator as the
>   partial tick.
>
> **The remainder resets when the skill is interrupted** — stopped or
> switched — exactly as the partial tick does. One rule to remember
> rather than two.
>
> The other expected-value-preserving option was **rolling the fraction**
> — a 32% chance of a second note — rejected because it adds randomness
> where none is needed and makes small numbers feel noisy.

> [!note] What this means for designing buffs
> Because a +5% buff is worth exactly +5%, buffs can be **any size**.
> Under threshold rounding they would have had to come in chunks big
> enough to cross a line, or they would have done nothing at all.

> [!note] Offline rolls honestly, and it is cheap
> Measured: **86,400 ticks resolve in ~22 ms** with two rolls, the
> multiplier, XP and level-up checks in the loop. A 100 ms tick over 24
> hours — 864,000 ticks — took ~25 ms. That is a server CPU, but the
> margin against a half-second budget is roughly twentyfold.
>
> The one way to lose that margin is **allocating an object per tick**.
> Keep the loop to plain numbers and it stays trivial.
