---
tags:
  - design
  - index
---

# Idle Academy

Text-based idle game. Skilling, crafting and levelling.

> [!abstract] The pillar
> A character **pursuing careers**. Pick a path, master its skills, earn
> the titles that come with them, then pursue another. **Idle and
> minimal** throughout — the game should never demand attention it has
> not earned.

> [!info] Status
> Only one skill exists so far: [[Research]].

## Design notes

- [[Opening]] — the critical path a new player walks, and the shortest
  route to a playable build.
- [[Open Questions]] — every undecided thing, in one place.
- [[Crafting]] — crafting is a skill, not a separate system.
- [[Mining]] — the second skill. Copper, in Arjunia.
- [[Skill Model]] — the anatomy of a skill tick.
- [[Jobs]] — the quest board, Job Titles and their buffs.
- [[Core Loop]] — how time, resources, hunts and money feed each other.
- [[Hunt]] — stages and the hunting ground that pays out.
- [[Geography]] — the world's canonical places. Cities and stations are
  fixed; shops and inns may be invented.
- [[Locations]] — the Travel tab, and how places are revealed.
- [[Stennard]] — the starting town.
- [[Apartment]] — the player's room, its own tab, and its furniture.
- [[Combat]] — how a stage is cleared. Not designed.
- [[Character]] — who the player is, and the Character tab.
- [[Research]] — the first skill category, and its tier ladder.
- [[Study]] — tier 1 of [[Research]]. Produces [[Notes]].
- [[Notes]] — the tier-1 resource.
- [[Quid]] — the currency. Earned mainly by selling, which is not yet
  designed.
- [[Save System]] — how progress persists, and its limits.
- [[Icons]] — the tab icon set, and the rules it is drawn against.
- [[Settings]] — the Settings tab: the theme control, and test tools.

## Screen layout

Six tabs today, **all six in a single row**, mobile-first:

```
Character | Skill | Inventory | Hunt | Travel | Settings
```

Each tab is a **square** carrying **an icon and no text**. The names above
are the tabs' accessible names, not painted labels — see [[Icons]].

> [!note] The names are full words again
> They were abbreviated to **Char** and **Inv** to fit a painted label.
> Nothing is painted now, so the constraint is gone and a screen reader
> gets the real word.

> [!important] The square gives before the tap target does
> Six squares plus their gaps do not fit at 48px on a 320px-wide phone. The
> tab keeps a 48px minimum height and goes slightly taller than wide there.
> Losing the square beats losing the tap target.

> [!note] The label survives as the accessible name
> Dropping the text means every tab would otherwise announce as an unnamed
> button, so `label` in `CONFIG.tabs` becomes each button's `aria-label`. A
> locked tab still appends its suffix. This is the opposite of the
> notification dot, which is deliberately silent — the difference is that a
> dot is an alert, and a tab is a destination.

> [!info] The Labour Exchange does not get a tab
> It is a **location page** reached through Travel, with a **quest
> tracker** along the bottom of the screen for quick access — see [[Jobs]].
> That is the general pattern: often-used features get a location page and
> a shortcut, not a tab.

> [!info] The Apartment is not a tab, for now
> It follows the same pattern: a **location page** reached through Travel.
> The tab bar stays at six. **Revisit after playtesting** — what earns a
> tab is a question for someone who has actually played it.

### The quest tracker

A **thin line at the very bottom of the screen**, present across tabs:
small text, one quest's progress, tapped to open the Labour Exchange. See
[[Jobs]].

> [!warning] Not implemented

| Tab           | State  | Holds                                        |
| ------------- | ------ | -------------------------------------------- |
| **Character** | Open   | [[Character]] — Name                         |
| **Skill**     | Open   | Skills by category. Only [[Research]] so far |
| **Inventory** | Open   | Empty                                        |
| **Hunt**      | Locked | Empty                                        |
| **Travel**    | Open   | Locations — see [[Locations]]                |
| **Settings**  | Open   | Theme, then Test tools — see [[Settings]]    |

> [!important] A locked tab still shows itself
> **Hunt** is locked but still shows its lantern and still announces as
> "Hunt", rather than hiding behind `???`. The player is meant to know a
> hunt exists and is not yet available. This is the opposite of a
> locked skill, which hides its name — the difference is deliberate:
> a section is a promise, a skill is a surprise.
>
> The locked tab is dashed, dimmed and disabled, so it cannot be opened or
> focused, and arrow-key navigation skips it.

> [!danger] No unlock rule exists yet
> `unlocked` in `CONFIG.tabs` is a static flag that nothing in the game
> flips, exactly as with skills.

### Flavour text

Every **section** and **skill name** carries a short **flavour line
underneath** — one or two lines, no more. Atmosphere, not instruction.

> [!warning] Not implemented

### Notification dots

A small **filled circle in the top-right corner of a button**, marking
something that needs attention. It is a general pattern for buttons, not
only tabs.

| Where        | Lit when                                    |
| ------------ | ------------------------------------------- |
| **Hunt** tab | At least **4 hours** of [[Hunt]] income has accrued |

> [!note] Four hours is the right sort of threshold
> With a 24-hour cap, lighting at 4 hours means the dot appears after a
> sixth of the bank has filled, leaving 20 hours before anything is
> wasted. Early enough to be useful, late enough not to nag. The value
> belongs in `CONFIG` so it can be retuned.

> [!important] No text equivalent — a decision, not an oversight
> The dot carries no label, `aria-label` or visually hidden text. It is a
> notification alert of the kind every mobile user already reads at a
> glance, and the designer has ruled that sufficient. **Do not add text
> alternatives to it.**
>
> The dot element itself should still be `aria-hidden` so assistive
> technology does not announce an empty element or stray glyph — that is
> keeping it silent, not labelling it.

> [!warning] Not implemented
> Nothing in the game can raise a notification yet. This lands with the
> Hunt tab, not before.

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
- Icons are inline SVG taking their colour from the theme, so light and
  dark need no icon work. See [[Icons]].
- Offline progress is part of the design: both income streams accrue while
  the game is closed, capped at 24 hours, collected by tapping. See
  [[Core Loop]]. Not implemented yet.

## Resources

| Resource   | Produced by | Status              |
| ---------- | ----------- | ------------------- |
| [[Notes]]  | [[Study]]   | Reachable           |
| Sketches   | Sketch      | Behind a locked skill |
| Blueprints | Draft       | Behind a locked skill |
| Treatises  | Theorise    | Behind a locked skill |

Nothing consumes any of them yet.

[[Mining]] adds metals: **copper**, then zinc, tin and iron. They are
mined as usable metal, not ore — smelting is abstracted into the tick.

The currency is **[[Quid]]**. Nothing earns or spends it, so it is not in
the config yet.

## Planned

- **Copy/paste save export and import** — see [[Save System]]. Needed
  because Safari deletes site storage after 7 days of not visiting.
