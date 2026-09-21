---
tags:
  - design
  - system
status: being designed
---

# Crafting

> [!important] Crafting is a skill
> Not a separate system. A crafting skill sits in the Skill tab alongside
> [[Study]], ticks like any other, earns XP, levels, competes for the
> **one activity slot**, and accrues offline.
>
> "Craft" and "skill" are interchangeable — [[Study]] produces [[Notes]],
> Writing consumes Notes and produces manuscripts. Both are skills.

## What this changes in the engine

Every skill so far is a **pure producer**: a tick grants a resource out of
nothing. A crafting skill **consumes inputs**, which the engine has no
concept of yet.

> [!danger] Three consequences, all load-bearing
> 1. **A tick can fail.** If the inputs are not there, the tick cannot
>    complete. The skill must stop — and the UI has to say why, rather
>    than appearing to run while producing nothing.
> 2. **Offline resolution is capped by inputs, not just by time.** Twenty
>    four hours away with 100 [[Notes]] in hand does not produce 86,400
>    manuscripts. Offline has to resolve
>    `min(ticks from time, ticks the inputs allow)`.
> 3. **The offline pop-up has to explain a shortfall.** "You ran out of
>    Notes after two hours" is the difference between a player trusting
>    the game and thinking it ate their time.

> [!note] What it does not change
> Ticks, XP, levelling, the one-activity rule and partial-tick carry-over
> all work exactly as they do now. A crafting skill is a normal skill with
> a cost per tick.

## Later skills carry more

[[Study]] is the simplest possible skill. Later ones add a success
chance, a multiplier from accumulated buffs, and a chance to preserve
materials — see [[Skill Model]] for the full anatomy of a tick.

## Open questions

> [!question] Undecided
> - **Are inputs consumed at the start or the end of a tick?** It decides
>   what happens if the player switches skills mid-tick — and partial
>   ticks are discarded on switch, so consuming up front would destroy
>   the materials for nothing.
> - **Does the output rate scale with level**, the input cost fall, or
>   both?
> - Can one skill have **several recipes**, or is it one skill per output?
