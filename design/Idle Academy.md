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

- [[Character]] — who the player is, and the Character tab.
- [[Research]] — the first skill category, and its tier ladder.
- [[Study]] — tier 1 of [[Research]]. Produces [[Notes]].
- [[Notes]] — the tier-1 resource.
- [[Save System]] — how progress persists, and its limits.

## Screen layout

Three tabs across the top of the page, mobile-first:

| Tab           | Holds                                                          |
| ------------- | -------------------------------------------------------------- |
| **Character** | One field: Name, editable via a pencil button                   |
| **Skill**     | Skills, grouped by category. The only category is [[Research]]  |
| **Settings**  | Test tools for now                                              |

> [!note] Assumptions
> **Skill** opens by default. Test tools live in **Settings**.

## The player

The player is a lone **Hunter** — see [[Character]]. The **mage** framing
from the original brief has been **dropped**.

> [!info] One skill at a time
> One person, one pair of hands, so **exactly one skill runs at a time**.
> Starting a skill stops whatever was running.

## Skill ladder

Skill names are **verbs**; the button reads as the gerund while running
(**Study** → **Studying**).

Every skill is **locked until something unlocks it**; only [[Study]] is open
at the start. Locked skills stay visible as anonymous `???` slots, so the
size of a category is never hidden.

| Category     | Tier | Skill     | Produces   | State    |
| ------------ | ---- | --------- | ---------- | -------- |
| [[Research]] | 1    | [[Study]] | [[Notes]]  | Unlocked |
| [[Research]] | 2    | Sketch    | Sketches   | Locked   |
| [[Research]] | 3    | Draft     | Blueprints | Locked   |
| [[Research]] | 4    | Theorise  | Treatises  | Locked   |

> [!danger] No unlock rule exists yet
> Nothing in the game can unlock a skill. See [[Research]].

## Game-wide rules

- Plain HTML, CSS and JavaScript. No framework, no build step; the game is
  served straight from GitHub Pages.
- All tuning values live in `js/config.js`. Design notes describe intent;
  `js/config.js` holds the authoritative numbers.
- Mobile-first: the game is played on a phone.
- Progress accrues only while the page is open and in the foreground.

## Resources

| Resource   | Produced by | Status              |
| ---------- | ----------- | ------------------- |
| [[Notes]]  | [[Study]]   | Reachable           |
| Sketches   | Sketch      | Behind a locked skill |
| Blueprints | Draft       | Behind a locked skill |
| Treatises  | Theorise    | Behind a locked skill |

Nothing consumes any of them yet.

## Planned

- **Copy/paste save export and import** — see [[Save System]]. Needed
  because Safari deletes site storage after 7 days of not visiting.
