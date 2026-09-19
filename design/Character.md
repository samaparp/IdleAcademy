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

> [!question] Open
> Nothing else is designed for this tab. Condition, equipment and whatever
> else a Hunter carries are all undecided.
