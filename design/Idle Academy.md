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

- [[Research]] — the first gathering skill, and the template every later
  skill copies. Produces [[Notes]].

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

| Resource   | Produced by  | Status                                  |
| ---------- | ------------ | --------------------------------------- |
| [[Notes]]  | [[Research]] | Implemented                             |
| Sketches   | —            | Proposed: output of a higher Research tier |
