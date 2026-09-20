---
tags:
  - design
  - system
status: not designed
---

# Combat

How a [[Hunt]] stage is cleared.

> [!warning] Not designed
> To be discussed. This note records only what has been decided so far, so
> that nothing else gets built on assumptions.

## Decided

- Clearing a stage is a **simulation** — it plays out, rather than
  resolving in one hidden step.
- It is **deterministic**. No random rolls: the same preparation against
  the same stage always produces the same outcome.

> [!note] Why deterministic matters
> The player can tell whether they are ready before committing, so a failed
> attempt is information rather than bad luck, and repeating a tap is never
> the correct play. It also means a stage's requirements can be shown
> honestly in the UI.

## Not decided

Everything else: what the [[Character]] brings to a fight, what a stage
brings against him, whether the research outputs ([[Notes]] and the rest)
are spent as preparation, how the simulation is presented, and what
failure costs.
