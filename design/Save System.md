---
tags:
  - design
  - system
status: partly implemented
---

# Save System

How [[Idle Academy]] persists progress.

> [!abstract] Summary
> The save lives in the browser's `localStorage`, on one device, in one
> browser. It is never uploaded anywhere.

## Implemented

- Autosaves every 5 seconds, and again when the page is hidden or closed.
- Every read and write is wrapped in `try/catch`; if storage is unavailable
  the game still runs, unsaved, and says so at the top of the screen.
- The save carries a **version number** and a **`lastPlayed` timestamp**.
- Migrations run on load, one version step at a time. Version 1 → 2 renamed
  the Meditation skill to Research and the Insight resource to [[Notes]];
  version 2 → 3 renamed that skill again to [[Study]], once Research became
  the name of the category; version 3 → 4 added the character's name.
- Tuning lives in `js/config.js` under `CONFIG.save`.

> [!warning] Not implemented
> **Offline progress.** `lastPlayed` exists so it *can* be built later.
> Nothing accrues while the page is closed or backgrounded.

## Constraints

The save is scoped to one browser, on one device, for one site:

- Safari on an iPad and Safari on a phone hold **separate saves**. There is
  no sync — iCloud syncs bookmarks and tabs, not site data.
- Different browsers on the same device are separate saves.
- Different origins are separate saves, so the GitHub Pages copy and any
  preview build do not share progress.
- Clearing website data wipes it, as does the Reset button in Test tools.

> [!danger] Safari evicts storage after 7 days
> iOS and macOS Safari delete script-writable storage for sites the player
> has not visited in **7 days**. A save left untouched for a week can simply
> be gone. This is the main reason the export/import plan below exists.
>
> Storage is scoped to the whole domain, not the path — a second project at
> another path on the same domain shares the same storage box. The key is
> namespaced (`idleacademy.save`) so nothing collides, but a future project
> using a generic key would.

## To-do: copy/paste export and import

> [!todo] Planned, not implemented
> A way to move a save between devices and to survive Safari's eviction,
> without a server. GitHub Pages serves static files only, so real cloud
> saves are out of scope.

**Export**
- A button produces the whole save as a single line of text.
- Copies to the clipboard on tap, and also shows it in a selectable field so
  the player can copy it by hand if the clipboard call is refused.

**Import**
- The player pastes a string into a field and confirms.
- The string is validated before anything is overwritten; a malformed or
  unreadable string changes nothing and says why.
- Importing **replaces** the current save, so it needs the same two-tap
  confirmation the reset button uses.

**Format**
- The save JSON, encoded so it survives being pasted through chat apps and
  autocorrect, prefixed with a short tag that identifies it, e.g. `IA1:…`.
- The prefix carries the format version, so a later change can still read an
  older exported string.
- Imported saves run through the same migrations as a stored save.

> [!question] Open
> - Where do these buttons live — inside **Test tools**, or a **Save**
>   section of their own that a normal player is meant to find?
> - Readable JSON (easy to hand-edit while designing) or an encoded blob
>   (harder to corrupt, harder to cheat)?
