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
| [[Stennard]]  | Stennard      | Market, workshop, guild, apothecary | Starting location |
| The mine      | Elsewhere     | Mining                         | Unrevealed |

## Travel

- **No cost.** Deliberately, to keep it simple.
- Travelling does not consume a turn, a tick, or anything else.

> [!question] Two questions that decide the architecture
> **Does hunting require being there?** A hunting ground pays out over
> time, including offline. If income only accrues while the player is
> standing in that location, then walking to the market to sell something
> stops the money. If it does not, then "travel" is only a menu and the
> hunting ground is a standing arrangement. **The second is simpler and
> almost certainly what is wanted**, but it needs saying.
>
> **Are skills tied to locations?** Mining happens at the mine. Does
> Mining therefore only appear in the Skill tab while the player is at the
> mine, and does travelling away stop it? That would collide with the
> offline rule, where the skill left running keeps ticking while the game
> is closed. The alternative is that reaching a location **unlocks** its
> skill permanently, and the skill is then available anywhere.

## Tavern

> [!todo] Marked for possible future design
> A drinking establishment is wanted but has no purpose yet. See the
> naming note in [[Stennard]] for what 1888 would actually call one.
