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
- Carries the **notification dot** when something needs attention — see
  [[Idle Academy]].

> [!note] Period alternative for "job offers"
> **Situations vacant** was the standard Victorian newspaper heading for
> job listings. More flavour, less clarity — worth knowing it exists.

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
> - **Is the Labour Exchange a tab or a venue?** It is described as a tab,
>   but the tab bar is a fixed 2x3 grid of six. A seventh breaks the
>   layout. The alternative is a venue inside **Travel**.
> - **Does a collect quest consume the items**, or only check that they
>   are there?
> - Do quests repeat, expire, or complete once?
> - What the Fledgling Writer buff actually does.
