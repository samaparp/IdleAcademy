---
tags:
  - design
  - category
category-id: research
status: partly implemented
---

# Research

The first **skill category** in [[Idle Academy]]. Its skills form a tier
ladder: each tier is a separate skill with its own level 1-100 and its own
output resource.

> [!abstract] Summary
> Skill names are **verbs**, so the button reads as the gerund while the
> skill is running: **Study** becomes **Studying**.

## The ladder

| Tier | Skill        | Running    | Produces   | State    |
| ---- | ------------ | ---------- | ---------- | -------- |
| 1    | [[Study]]    | Studying   | [[Notes]]  | Unlocked |
| 2    | Sketch       | Sketching  | Sketches   | Locked   |
| 3    | Draft        | Drafting   | Blueprints | Locked   |
| 4    | Theorise     | Theorising | Treatises  | Locked   |

## Locked skills

A locked skill is **visible but anonymous**. Its card shows `???` and a
**Locked** chip, with no button, no level and no resource — so the player
can see that Research holds four skills and that three are still closed,
without learning what they are. The category heading carries the count
(`1 / 4 unlocked`).

> [!danger] Nothing can unlock them yet
> Unlock rules are **not designed** for these tiers. The flag is static
> config (`unlocked: true/false`) and nothing in the game flips it, so
> tiers 2 to 4 stay locked permanently until a rule exists.
> `Skills.isUnlocked()` is the single place that rule will go.
>
> One ingredient is now known: **revealing a location can be a requirement
> for unlocking a skill** — see [[Locations]]. Whether the Research ladder
> uses that, or gates on levels and resources instead, is still open.

> [!warning] Placeholder tuning
> Tiers 2 to 4 carry **the same numbers as [[Study]]** — 1 second per tick,
> 10 XP, 1 resource. They are unreachable, and inventing a curve for them
> would look like a balance decision that has not been made.

> [!note] Why the ladder reads this way
> You scribble what you read, then draw what you scribbled, then make it
> buildable, then publish. Each rung is a more finished artefact than the
> one below it.

> [!question] Open
> - **How each tier unlocks.** A level in the tier below, a quantity of its
>   resource spent, or something else entirely.
> - Whether lower tiers stay worth running once a higher one is available.
> - Whether every tier uses the same tick length and XP rate, or slower
>   ticks for richer output.
> - Whether a locked skill should ever hint at what it is, or stay `???`
>   until the moment it opens.
