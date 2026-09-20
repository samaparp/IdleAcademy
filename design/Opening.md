---
tags:
  - design
  - system
status: being designed
---

# Opening

The first few minutes of [[Idle Academy]] — the chain a new player walks
before the game opens up.

> [!abstract] The critical path
> ```
> Study  →  Notes
>        →  assemble into something sellable
>        →  sell it at the market          →  Quid
>        →  buy a pickaxe                  →  Inventory
>        →  equip it as a tool             →  Character
>        →  travel to the mine             →  Locations
>        →  unlock Mining
> ```

## What this tells us

> [!important] This is the vertical slice
> The chain names **everything a playable game needs**, and nothing more:
>
> | Step        | System                          | State             |
> | ----------- | ------------------------------- | ----------------- |
> | Study       | [[Study]] skill                 | **Built**         |
> | Assemble    | Crafting                        | Not designed      |
> | Sell        | Market — see [[Quid]]           | Not designed      |
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
> - **Can anything be sold anywhere**, or only at the market?
