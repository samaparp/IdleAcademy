---
tags:
  - design
---

# Icons

A single set of **monochrome line icons**, used for the tab bar. Drawn as
inline SVG, not images: they are code, they scale, and they take their
colour from the theme.

> [!abstract] One set, one hand
> What makes a set read as a set is not the subjects — it is the grid, the
> stroke and the corner treatment being identical across every icon. Every
> new icon is drawn against the rules below, or it does not go in.

## The rules

| Rule            | Value                                             |
| --------------- | ------------------------------------------------- |
| **Canvas**      | 24 x 24 viewBox                                   |
| **Live area**   | 20 x 20 — nothing touches the outer 2 units       |
| **Stroke**      | 1 unit, round cap, round join                     |
| **Fill**        | None, ever. Every icon is outline only            |
| **Colour**      | `currentColor` only                               |
| **Geometry**    | Straight segments and circular arcs. No freehand curves |
| **Subject**     | One object per icon. No scenes, no composition    |
| **Register**    | Victorian instrument, not fantasy                 |

> [!important] 1 unit is the floor, for a device reason
> At a 24px render one stroke unit is one CSS pixel. Below that, a stroke
> cannot land on a whole device pixel on a 1x display and renders as a grey
> smear rather than a line — so the set would look different on a phone and
> on a desktop. Thinner is not available.

## Colour is not in the icons

No icon carries a colour value. Every path is `currentColor`, so an icon
inherits whatever the element around it is already using — `--text` in a
resting tab, `--accent-text` in the selected one, dimmed on a locked one.
Light and dark mode need no icon work at all.

This is also why there is no icon palette to maintain. There is one
stylesheet, and the icons follow it.

## Where the values live

`CONFIG.icons` holds the stroke weight and the tab icon scale. `js/ui.js`
pushes them onto the root element as custom properties at boot, because
CSS cannot read `CONFIG`. The stylesheet carries the same values as
fallbacks, which only take effect if the scripts fail to load.

The tab icon is sized as a **share of the tab**, not in pixels, because the
tab is already square and already scales with the screen. A fixed pixel
size would leave the icon lost on a large phone and cramped on a small one.

> [!note] Enlarging the icon thickens the stroke
> `strokeWidth` is in viewBox units, so it scales with everything else: at
> a 34px render a 1-unit stroke is about 1.4 CSS pixels, not 1. That keeps
> the drawing identical, only bigger. Holding the stroke at an optical 1px
> while the icon grows is possible — drop `strokeWidth` to roughly 0.7 —
> but it makes the set read wiry rather than minimal.

Retuning the whole set is a one-line edit in `js/config.js`.

## The sprite

Every symbol lives in one inline `svg` at the top of `index.html`, and a
tab references it with `use`. Inline rather than an external sprite file
because the game must open from `file://`, where a fetched sprite is
blocked.

Adding an icon means adding a `symbol` to that sprite and pointing
something at its id.

## The current set

Six, one per tab. See [[Idle Academy]] for the tab bar itself.

| Tab          | Icon                                    |
| ------------ | --------------------------------------- |
| **Char**     | A head and shoulders                    |
| **Skill**    | A magnifying glass                      |
| **Inv**      | A satchel                               |
| **Hunt**     | A lantern                               |
| **Travel**   | A compass                               |
| **Settings** | Three sliders                           |

> [!note] The lantern was the hard one
> It has been drawn three times. First pass: a narrow body carried visibly
> less ink than the satchel and the compass beside it, so the whole row
> looked uneven, and the interior detail turned to mush at tab size.
> Widened, and the flame enlarged to a single clear diamond. Third pass:
> taller overall, with a **deeper base section** — the gap between the body
> and the foot was too shallow to read as a lantern's base.
>
> **An icon that needs more detail than its neighbours to read is the wrong
> drawing, not a case for more detail.**
>
> The first two passes also broke the live-area rule: the handle's arc
> reached y = 1.5, half a unit outside it. Fixed in the third.

## Open

- [ ] **Does anything other than the tab bar get an icon?** Resources,
	skills and locations are all text today. See [[Open Questions]].
