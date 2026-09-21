---
tags:
  - design
  - system
status: being designed
---

# Locations

The **Travel** tab: a list of places to go. Each holds venues, hunting
grounds, or both.

> [!abstract] Summary
> The player starts in [[Stennard]]. Travel is **free** — no cost in time,
> money or anything else. Further locations are **hidden until revealed**.

## Revealing locations

> [!important] Hidden, not locked
> An undiscovered location is **not shown at all** — no name, no greyed-out
> row, nothing. Finding one is a surprise.
>
> This is a third visibility rule, distinct from the other two:
>
> | Thing            | When unavailable                       |
> | ---------------- | -------------------------------------- |
> | Tab (e.g. Hunt)  | Shown, named, disabled                 |
> | Skill tier       | Shown as `???`, count visible          |
> | **Location**     | **Not shown at all**                   |
>
> A tab is a promise, a skill is a surprise you know is coming, a location
> is a surprise you do not.

## Known locations

| Location      | Region        | Holds                          | State     |
| ------------- | ------------- | ------------------------------ | --------- |
| **Apartment** | Stennard      | The player's room              | **Unlocked by default** |
| [[Stennard]]  | Stennard      | Market, workshop, guild, apothecary | Revealed later |
| The mine      | Elsewhere     | Mining                         | Unrevealed. **On the critical path** — see [[Opening]] |

## Travel

- **No cost.** Deliberately, to keep it simple.
- Travelling does not consume a turn, a tick, or anything else.

> [!important] Travel is a menu, not a place you stand
> **Neither hunting nor skilling requires being at a location.** A hunting
> ground keeps paying and a skill keeps ticking wherever the player is, and
> whether or not the game is open.
>
> So travelling somewhere never interrupts anything. Walking to the market
> to sell does not stop the money coming in.

> [!note] Which means there is no "current location" to enforce
> Nothing in the game reads where the player is standing. A displayed
> "you are in Stennard" is **flavour**, and it gates nothing.
>
> What genuinely has to be saved is **which locations have been revealed** —
> that is real state, and it is what the unlock rules below read.

## Locations as unlock requirements

> [!important] The first concrete unlock rule
> **Revealing a location can be a requirement for unlocking a skill.**
> Reaching the mine is what makes Mining available.
>
> Once unlocked, the skill is available **anywhere** — the location was the
> key, not the workplace.
>
> This is the first piece of the unlock system to be pinned down. Until
> now every `unlocked` flag has been static config with nothing able to
> flip it. `Skills.isUnlocked()` is the seam that rule goes through, and
> it will need to read **state** — the revealed-locations list — rather
> than config alone.

> [!question] How is the mine revealed?
> [[Opening]] has the player travel there in the first few minutes, but
> locations are hidden until revealed. Buying the pickaxe, a guild
> mission, or something else — undecided.

## Tavern

> [!todo] Marked for possible future design
> A drinking establishment is wanted but has no purpose yet. See the
> naming note in [[Stennard]] for what 1888 would actually call one.
