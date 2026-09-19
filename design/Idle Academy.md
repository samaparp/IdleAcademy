---
tags:
  - design
  - index
---

# Idle Academy

Text-based mage idle game. Skilling, crafting and levelling. No graphics.

> [!info] Status
> Only one skill exists so far: [[Meditation]].

## Design notes

- [[Meditation]] — the first skill, and the template every later skill copies.

## Game-wide rules

- Plain HTML, CSS and JavaScript. No framework, no build step; the game is
  served straight from GitHub Pages.
- All tuning values live in `js/config.js`. Design notes describe intent;
  `js/config.js` holds the authoritative numbers.
- Mobile-first: the game is played on a phone.
- Progress accrues only while the page is open and in the foreground.

> [!warning] Placeholder names
> Resource names are placeholders until named properly. Currently:
> **Insight** (produced by [[Meditation]]).
