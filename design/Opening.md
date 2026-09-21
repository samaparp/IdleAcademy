---
tags:
  - design
  - system
status: being designed
---

# Opening

The first few minutes of [[Idle Academy]] — the chain a new player walks
before the game opens up.

> [!abstract] The critical path — revised
> **Unlocked by default:** [[Study]], one location (the apartment room),
> and the **Labour Exchange** — see [[Jobs]].
>
> ```
> Study  →  Notes
>        →  complete the first job offer      (collect 30 Notes)
>        →  paid in Quid, granted the Title
>          "Fledgling Writer"                 →  Jobs
>        →  the Writer job pays Quid          →  enough for the next tools
>        →  buy tools                         →  Market
>        →  equip                             →  Character
>        →  travel                            →  Locations
>        →  unlock the next skill
> ```

> [!important] The first quid comes from a job, not from selling
> This revises the earlier chain. **Selling is no longer step three** — a
> quest reward is. The market is still needed to *buy* tools, but the
> economy does not have to be designed before the game is playable.

## What this tells us

> [!important] This is the vertical slice
> The chain names **everything a playable game needs**, and nothing more:
>
> | Step        | System                          | State             |
> | ----------- | ------------------------------- | ----------------- |
> | Study       | [[Study]] skill                 | **Built**         |
> | Labour Exchange | [[Jobs]]                    | Not designed      |
> | Title       | [[Jobs]]                        | Not designed      |
> | Buy         | Market                          | Not designed      |
> | Inventory   | Inv tab                         | Empty placeholder |
> | Equip       | Tool slot — see [[Character]]   | Not designed      |
> | Travel      | [[Locations]]                   | Empty placeholder |
> | Unlock      | Unlock rules                    | Not designed      |
>
> Note what is **absent**: no [[Hunt]], no [[Combat]], no higher research
> tiers. The opening deliberately does not need them, so a first playable
> build does not either.

## Assembly comes early, not late

> [!important] The workshop is on the critical path
> Assembling was previously filed as a later system. It is not — it is
> **step two**. Without it there is nothing to sell, and without selling
> there is no [[Quid]], no pickaxe, and no second skill.

> [!question] The first sellable is probably a document, not equipment
> At step two the player has **[[Notes]] and nothing else**. There is no
> ore, no leather, no metal — mining is the thing this chain is trying to
> reach. So the first assembled item cannot be a physical object made from
> materials.
>
> What Notes assemble into is **writing**: a monograph, a paper, a
> pamphlet, a report. The [[Research]] ladder is documents all the way up
> — Notes, Sketches, Blueprints, Treatises — so selling written work is
> the natural first trade.
>
> It also fits the [[Character]] exactly: a scholar with no money sells
> what he knows to buy his first tool. Very 1888, and it means the
> workshop is not needed at step two at all — a **writing desk** is.
>
> **Undecided.** If the first sellable is meant to be a physical object,
> then something has to supply materials before mining exists.

## Open questions

> [!question] Undecided
> - **What is the first assembled item, and where is it assembled?** A
>   desk, the workshop, or somewhere else.
> - **How is the mine revealed?** The chain travels there, but locations
>   are hidden until revealed. Does buying the pickaxe reveal it, does a
>   guild mission, or something else?
> - **What exactly unlocks Mining** — the pickaxe equipped, the mine
>   revealed, or both together?
> - **Must the pickaxe stay equipped to keep mining**, or is equipping it
>   once enough to unlock the skill permanently?
> - **Are tools permanent once bought**, or do they wear out?
> - **When does the market unlock?** Only Study, the apartment and the
>   quest board are available by default, but the chain buys tools. So
>   something has to open the market — the Writer title, a job reward, or
>   revealing [[Stennard]] itself.
