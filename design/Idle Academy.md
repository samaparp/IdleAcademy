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

- [[Research]] — the first skill category, and its tier ladder.
- [[Study]] — tier 1 of [[Research]]. Produces [[Notes]].
- [[Notes]] — the tier-1 resource.
- [[Save System]] — how progress persists, and its limits.

## Screen layout

Three tabs across the top of the page, mobile-first:

| Tab           | Holds                                                          |
| ------------- | -------------------------------------------------------------- |
| **Character** | Nothing designed yet                                            |
| **Skill**     | Skills, grouped by category. The only category is [[Research]]  |
| **Settings**  | Test tools for now                                              |

> [!note] Assumptions
> **Skill** opens by default, because it is the only tab with anything in
> it. Test tools were moved into **Settings** as the obvious home; say if
> they belong somewhere else.

## The player

> [!info] One skill at a time
> The player is a lone **Hunter** — Van Helsing, roughly. One person, one
> pair of hands, so **exactly one skill runs at a time**. Starting a skill
> stops whatever was running.
>
> This is a design commitment, not an implementation detail: it means the
> game is about *choosing* what to work on, not about managing parallel
> production lines.

> [!question] Open
> The original framing was a **mage** academy. "Hunter" reframes the player
> as a monster hunter who studies his quarry. Are these the same character,
> or has the mage framing been dropped?

## Skill ladder

Skill names are **verbs**; the button reads as the gerund while running
(**Study** → **Studying**).

| Category     | Tier | Skill      | Produces    | Status      |
| ------------ | ---- | ---------- | ----------- | ----------- |
| [[Research]] | 1    | [[Study]]  | [[Notes]]   | Implemented |
| [[Research]] | 2    | Sketch     | Sketches    | Named only  |
| [[Research]] | 3    | Draft      | Blueprints  | Named only  |
| [[Research]] | 4    | Theorise   | Treatises   | Named only  |

## Game-wide rules

- Plain HTML, CSS and JavaScript. No framework, no build step; the game is
  served straight from GitHub Pages.
- All tuning values live in `js/config.js`. Design notes describe intent;
  `js/config.js` holds the authoritative numbers.
- Mobile-first: the game is played on a phone.
- Progress accrues only while the page is open and in the foreground.

## Resources

| Resource  | Produced by | Status      |
| --------- | ----------- | ----------- |
| [[Notes]] | [[Study]]   | Implemented |

Nothing consumes [[Notes]] yet.

## Planned

- **Copy/paste save export and import** — see [[Save System]]. Needed
  because Safari deletes site storage after 7 days of not visiting.
