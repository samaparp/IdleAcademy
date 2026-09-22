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

The theme id lands in `data-theme` on the root element — and it is
**always** `light` or `dark`, never absent.

> [!important] Auto is resolved in JavaScript, not by a media query
> "Auto" is a real third state in the save, but it is turned into a
> concrete light or dark **before it reaches CSS**. That is what lets
> `css/main.css` hold **one copy of each palette**.
>
> The alternative — letting a `prefers-color-scheme` query handle auto —
> forces the dark values to be written twice, once for the query and once
> for a forced dark, and the two copies drift apart the first time a
> colour is tweaked.
>
> Because the media query no longer does it for free, `js/ui.js` listens
> for system changes and re-resolves while the setting is auto, so a phone
> flipping to dark at sunset still works.

> [!important] It is applied before the body paints
> `index.html` resolves and sets the attribute in an inline script in the
> head. Without it the page renders one way and then flips on every single
> load. This is why `js/config.js` loads in the head rather than with the
> other scripts.

> [!note] The address bar follows too
> There is one `theme-color` tag, and `js/ui.js` sets it from the live
> value of `--bg` after each change. Media-scoped `theme-color` tags cannot
> work once the player can force a theme the phone disagrees with, and
> reading the value back out of the stylesheet avoids keeping a second copy
> of the palette in JavaScript.

> [!note] If scripts never load
> The page falls back to the light palette on `:root` rather than following
> the system. The whole game is JavaScript, so this is not a case worth
> designing around.

## Test tools

Speed multipliers and a reset that needs a second tap to confirm. See
`CONFIG.testTools`. Unchanged by the theme work, except that its speed
buttons and the theme buttons now share one segmented-control style rather
than having a class each.

## Open

- [ ] **Does anything else belong in Settings?** Save export and import is
	the obvious candidate — see [[Save System]] and [[Open Questions]].
