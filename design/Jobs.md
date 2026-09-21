---
tags:
  - design
  - system
status: being designed
---

# Jobs and Titles

> [!abstract] Summary
> The **Labour Exchange** posts **job offers**. Completing one grants
> [[Quid]] and a **Title**. Titles give **permanent buffs**. The player
> picks which Title is **displayed**, purely for flavour.

> [!info] Terminology
> In conversation the designer says **"quests"** and **"the quest board"**.
> Both mean this system. In the game it is the **Labour Exchange**, and
> what it posts are **job offers**.
>
> The Labour Exchange **is** the guild floated earlier for [[Stennard]] —
> one thing, not two.

## The Labour Exchange

- Unlocked by **default** — one of the three things available at the start.
- A real Victorian institution for matching people to work, which is why
  the name fits.
- **Not a tab.** It is a **location** in [[Locations]], opening to its own
  page. See the quest tracker below for how the player gets to it quickly.
- The page is headed **"Situations Vacant"** — the standard Victorian
  newspaper heading for job listings.

## The quest tracker

> [!important] A thin line at the very bottom of the screen
> - **One quest at a time**, shown as a slim progress line with small text.
> - When several are active, it shows the one **closest to completion**.
> - **Tapping it opens the Labour Exchange page.**
> - Deliberately minimal — it is a wayfinding aid, not a panel.
>
> This replaces the idea of a permanent Labour Exchange tab. Quests are
> returned to constantly, but a tracker gives them presence without
> spending a tab on them.

> [!question] Undecided
> - What the tracker shows when **no quest is active** — hidden, or a
>   prompt to go and take one.
> - Whether it sits above or below the safe-area inset on a phone. It must
>   clear the home indicator either way.

## Quest types

| Type        | Checked how                                  | Can it be bought? |
| ----------- | -------------------------------------------- | ----------------- |
| **Collect** | Inventory check. Does not care how obtained  | **Yes**           |
| **Craft**   | Counted **at the moment of crafting**, not from inventory | **No** |
| **Hunt**    | Kill count                                   | No                |

> [!important] Craft and hunt need counters, collect does not
> A **collect** quest reads the inventory, so it needs no bookkeeping.
>
> **Craft** and **hunt** quests count events as they happen, so each needs
> a **running total stored in the save**. Crafting ten and selling them all
> still completes a craft quest; buying ten completes nothing.

## Quest fields

Every quest has six:

| Field                 | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| **Name**              | What it is called                              |
| **Flavour text**      | Description and explanation, 1-2 lines         |
| **Giver**             | Who posted it — e.g. the Writer's Union        |
| **Condition**         | Collect x, craft y, or hunt z                  |
| **Rewards**           | [[Quid]], Titles, unlocks                      |
| **Unlock condition**  | **Hidden.** What makes the quest appear        |

> [!note] The giver is not the board
> The **Labour Exchange** is the venue. The **giver** is whoever posted the
> job — the Writer's Union, a private client, a society. One board, many
> givers.

## Completion and claiming

> [!important] Rewards are claimed manually
> A completed quest is **not** paid out automatically. The player taps a
> **claim button**.

| Type        | When it completes                                      |
| ----------- | ------------------------------------------------------ |
| **Craft**   | The moment the counter is met — **completed forever**  |
| **Hunt**    | The moment the counter is met — **completed forever**  |
| **Collect** | **Checked at the instant Claim is tapped**             |

> [!important] Collect quests are "hand over", not "collect"
> A collect quest **consumes the items**, which is why it checks the
> inventory at the moment of claiming rather than banking a completion.
>
> So if the player gathers 30 [[Notes]], then sells or spends them before
> claiming, **the quest is not complete** and they must gather them again.
>
> **The flavour text must say so.** The wording is *hand over thirty
> notes*, never *collect thirty notes* — the language is what tells the
> player the items are going away. This is a writing rule, not just a
> mechanical one.

> [!note] A collect quest can become un-ready
> Craft and hunt completions are permanent once earned. A collect quest's
> readiness **comes and goes** with the contents of the inventory, so
> anything that reacts to "ready to claim" — the notification dot, the
> tracker — has to handle it switching back off.

## Visibility

> [!important] Quests are hidden until unlocked
> A quest whose unlock condition is unmet is **not shown at all** — the
> same rule as [[Locations]], not the `???` rule used for skill tiers.
>
> When one unlocks, the Labour Exchange raises the **notification dot**.

## Titles

- Earned by completing job offers.
- **Buffs are permanent** once the Title is earned.
- The Character tab's Title field is a **list of unlocked Titles**; the
  player switches which is displayed. **Cosmetic only** — buffs come from
  owning a Title, not from showing it.

> [!note] Room for active buffs later
> Buffs may eventually come in two kinds: **passive**, always on once
> unlocked, and **active**, where only one may be selected at a time.
> **Only passive is planned right now**, but the data should not assume
> passive is the only kind.

## The first quest

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| Name         | Compiling notes into a cosmic-horror novella (working)   |
| Giver        | The Writer's Union                                       |
| Condition    | **Collect 30 [[Notes]]**                                 |
| Rewards      | Some [[Quid]], and the Title **Fledgling Writer**        |
| Unlock       | Available at the start                                   |

> [!note] Genre, not name-dropping
> The cosmic-horror flavour is a **genre** nod. Lovecraft is not
> referenced by name, and was born in 1890. **Arthur Machen** was writing
> in exactly this decade if a period-real touchstone is ever wanted.

## Open questions

> [!question] Undecided
> - Do quests repeat, expire, or complete once?
> - What the Fledgling Writer buff actually does.
