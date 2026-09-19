---
tags:
  - design
  - index
---

# Idle Academy

Text-based mage idle game. Skilling, crafting and levelling. No graphics.

> [!info] Status
> Only one skill exists so far: [[Research]].

## Design notes

- [[Research]] — the tier-1 gathering skill, and the template every later
  skill copies. Produces [[Notes]]. Needs a name of its own.
- [[Notes]] — the tier-1 resource.
- [[Save System]] — how progress persists, and its limits.

## Skill ladder

> [!info] Tiers are separate skills
> Research tiers are **separate skills**, each with its own level 1-100 and
> its own output resource — not extra actions inside one skill. "Research"
> is the category; each tier is a skill within it.

| Tier | Skill              | Produces   | Status                 |
| ---- | ------------------ | ---------- | ---------------------- |
| 1    | [[Research]]       | [[Notes]]  | Implemented, unnamed   |
| 2    | *unnamed*          | *undecided*| Proposed               |

## World

> [!question] Steampunk academy — being designed
> The setting is a **steampunk academy**. Still undecided: how magic and
> machinery relate, and the tone (whimsical / scholarly / grim). Naming so
> far leans **scholarly**: Research, Notes, Sketches.

## Game-wide rules

- Plain HTML, CSS and JavaScript. No framework, no build step; the game is
  served straight from GitHub Pages.
- All tuning values live in `js/config.js`. Design notes describe intent;
  `js/config.js` holds the authoritative numbers.
- Mobile-first: the game is played on a phone.
- Progress accrues only while the page is open and in the foreground.

## Resources

| Resource  | Produced by  | Status      |
| --------- | ------------ | ----------- |
| [[Notes]] | [[Research]] | Implemented |

Nothing consumes [[Notes]] yet.

## Planned

- **Copy/paste save export and import** — see [[Save System]]. Needed
  because Safari deletes site storage after 7 days of not visiting.
