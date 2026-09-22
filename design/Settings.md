---
tags:
  - design
---

# Settings

The Settings tab. Two things live here: a **theme control** the player
owns, and the **test tools**, which are for development.

They are deliberately separate cards. The test tools stay collapsed behind
a summary; the theme control does not, because it is a real setting.

## Theme

Three options, one row: **Auto**, **Light**, **Dark**.

| Option    | Behaviour                                          |
| --------- | -------------------------------------------------- |
| **Auto**  | Follows the phone's own light/dark setting. Default |
| **Light** | Forced light, whatever the phone says              |
| **Dark**  | Forced dark, whatever the phone says               |

The choice is **saved**, and **banked the moment it is tapped** rather than
waiting for the next autosave — a theme the player picked and then lost to
a closed tab would look broken.

> [!note] Auto is not "light"
> Auto removes the override entirely and hands the decision back to
> `prefers-color-scheme`. It is a third state, not a synonym for the
> default appearance.

### How it is applied

The theme id lands in `data-theme` on the root element. `css/main.css`
carries the dark tokens twice: once inside the `prefers-color-scheme`
media query, guarded so a forced light wins, and once for a forced dark.
Editing one copy means editing the other.

> [!important] It is applied before the body paints
> `index.html` reads the saved theme in an inline script in the head and
> sets the attribute there. Without it the page renders in the system theme
> and then flips on every single load. This is why `js/config.js` loads in
> the head rather than with the other scripts.

> [!note] The address bar follows too
> There is one `theme-color` tag, and `js/ui.js` sets it from the live
> value of `--bg` after each change. Media-scoped `theme-color` tags cannot
> work once the player can force a theme the phone disagrees with, and
> reading the value back out of the stylesheet avoids keeping a second copy
> of the palette in JavaScript.

## Test tools

Speed multipliers and a reset that needs a second tap to confirm. See
`CONFIG.testTools`. Unchanged by the theme work, except that its speed
buttons and the theme buttons now share one segmented-control style rather
than having a class each.

## Open

- [ ] **Does anything else belong in Settings?** Save export and import is
	the obvious candidate — see [[Save System]] and [[Open Questions]].
