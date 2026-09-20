---
tags:
  - design
  - system
status: partly implemented
---

# Character

The player in [[Idle Academy]] is a lone **Hunter** — Van Helsing, roughly.
Not a mage: the mage framing was dropped.

> [!info] One skill at a time
> One person, one pair of hands, so **exactly one skill runs at a time**.
> Starting a skill stops whatever was running. This is a design commitment,
> not an implementation detail: the game is about *choosing* what to work
> on, not about managing parallel production lines.

## The Character tab

One field so far.

| Field    | Editable | Notes                                    |
| -------- | -------- | ---------------------------------------- |
| **Name** | Yes      | Pencil button, editable at any time      |

**Name**
- Starts as the placeholder **Hunter** (`CONFIG.character.defaultName`).
- A pencil button opens an inline editor with confirm and cancel buttons;
  Enter confirms, Escape cancels.
- Trimmed, capped at 24 characters (`CONFIG.character.maxNameLength`).
- A blank name falls back to the default rather than being left empty.
- Stored in the save under `character.name`.

## Equipment

The Character tab holds **equipment slots**. The first one known is a
**tool** slot — the pickaxe from [[Opening]] goes there, and equipping it
is part of what unlocks Mining.

> [!warning] Not designed
> One slot is named and nothing else. How many slots there are, what they
> hold, whether equipment has stats, and how it interacts with [[Combat]]
> are all open.

> [!question] Undecided
> - Does a tool have to **stay** equipped to keep its skill working, or
>   does equipping it once unlock permanently?
> - Are tools **permanent**, or do they wear out?
> - Where does equipment live when not equipped — the **Inv** tab,
>   presumably, but the relationship is not stated.
> - Condition, health, and whatever else a Hunter carries into a fight
>   are all still undecided.
