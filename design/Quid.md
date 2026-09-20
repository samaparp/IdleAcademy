---
tags:
  - design
  - resource
resource-id: quid
status: not implemented
---

# Quid

The currency of [[Idle Academy]].

> [!warning] Not implemented
> Nothing produces or spends quid yet, so it is **not in the config**. It
> will be added when something earns it — a resource with no source and no
> sink would be dead weight in `js/config.js`.

## What it is

**Quid** is slang for the pound sterling — Victorian Britain ran on
pre-decimal £sd, where £1 = 20 shillings = 240 pence. Quid sits at the top
of that structure, so smaller denominations (shillings, pence) remain
available later without contradicting anything.

> [!important] Quid is invariant in the plural
> **"20 quid"**, never "20 quids". Any UI text or formatter must not append
> an `s`. This is the one thing about the word that is easy to get wrong.

> [!note] Why slang, deliberately
> The rest of the game's vocabulary is scholarly — Study, Notes,
> Blueprints, Treatises. **Quid is a street word.** The contrast is the
> point: the [[Character]] is a scholar by method and a working man by
> trade, and he gets paid in the money people actually name out loud.

## Open questions

## Where quid comes from

> [!important] Primarily from selling
> **Selling things is the main source of quid.** A [[Hunt]] also pays some,
> but the hunt's real yield is materials, not money.

> [!warning] Selling is barely designed
> Selling happens at the **market in [[Stennard]]**, which is open from the
> start. That is all that is settled. What can be sold, at what price, and
> whether prices move are all open, and the economy hangs off the answers.

> [!question] Undecided
> - **What can be sold** — research outputs, hunt materials, both?
> - **What spends it?** Equipment, unlocking skills, and materials are all
>   possible; none are designed.
> - **How is it displayed?** Plain (`1,240 quid`), symbol-first (`£1,240`),
>   or abbreviated. Symbol and slang together (`£1,240 quid`) would be
>   wrong — pick one.
> - **Do smaller denominations ever appear?** If prices need finer
>   granularity than a pound, the period answer is shillings and pence,
>   stored as one integer count of pence and formatted for display.
