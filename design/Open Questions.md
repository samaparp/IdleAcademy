---
tags:
  - design
  - index
---

# Open Questions

Everything undecided in [[Idle Academy]], in one place. Grouped by **what
it blocks**, not by topic.

> [!info] How to use this
> Each note still holds its own questions in context. This is the index —
> when something is decided, answer it in the note **and** delete it from
> here, or the two drift apart.

---

## 1. Blocks the next playable build

These sit directly on the [[Opening]] chain. Nothing past Study can be
built without them.

- [ ] **The Writing skill's recipe** — how many [[Notes]] per tick, and
	what it produces. Crafting is a skill, so this is tick length, input
	cost and output.
- [ ] **Are crafting inputs consumed at the start or end of a tick?** See
	[[Crafting]]. Matters because partial ticks are discarded on switch.
- [ ] **What does the first job offer pay?** Enough for the next tools, so
	the tool price sets it.
- [ ] **What does the market sell first?** Access is granted by the first
	job offer — see [[Jobs]].
- [ ] **What the Penny-a-liner title buffs.**
- [ ] **What is the first tool, what does it cost, and what does it
	unlock?** The chain says a pickaxe.
- [ ] **How is the mine revealed?** Its location is settled — Arjunia,
	near but outside Rupina. What puts it on the map is not.
- [ ] **What exactly unlocks Mining** — tool equipped, mine revealed, or
	both.
- [ ] **Must a tool stay equipped** to keep its skill working, or is
	equipping it once enough?
- [ ] **Do tools wear out**, or are they permanent once bought?
- [ ] **Mining itself**: tick length, XP, what it yields.

## 2. The economy

Nothing can be priced until these are answered. See [[Quid]].

- [ ] **What can be sold** — research outputs, hunt materials, both?
- [ ] **What sets a price?** Fixed per item, or do prices move?
- [ ] **What else spends quid** besides furniture and tools?
- [ ] **How is quid displayed** — `1,240 quid`, `£1,240`, or abbreviated?
	Never both symbol and slang together.
- [ ] **Do shillings and pence ever appear**, or is a pound the smallest
	unit the player ever sees?

## 3. Unlock rules

The single biggest structural gap: **nothing in the game can unlock
anything**. Every `unlocked` flag is static config.

- [ ] **How each [[Research]] tier unlocks** — a level below, a resource
	spent, a job offer, or a location.
- [ ] **What unlocks the Hunt tab.**
- [ ] **What reveals each location.**
- [ ] Whether a locked skill ever **hints** at what it is, or stays `???`
	until it opens.

## 4. Systems named but not designed

- [ ] **[[Combat]]** — everything except "deterministic simulation".
- [ ] **Crafting** — recipes, durations, where each is done.
- [ ] **The market** — buying and selling.
- [ ] **Equipment** — how many slots, what they hold, whether items have
	stats. See [[Character]].
- [ ] **Titles** — what the Fledgling Writer buff does, and what other
	Titles exist. See [[Jobs]].
- [ ] **Furniture upgrades** — cost, effect, how many levels. See
	[[Apartment]].
- [ ] **Hunt loot tables** — what each stage drops. This is where the
	economy actually lives.
- [ ] **Save export/import** — planned in [[Save System]], not built.

## 5. Overlaps to resolve

- [ ] **Home workbench vs the Stennard workshop.** Same question for the
	home laboratory vs the apothecary. Redundant, or tiers?
- [ ] **Does [[Study]] stay useful** once Sketch opens, or does tier 1
	become dead content?
- [ ] **One hunting ground at a time?** Assumed yes, never stated.

## 6. UI and presentation

- [ ] **Is offline skill progress shown?** It is granted, not claimed, but
	a "while you were away" summary is information worth giving. A pop-up
	is specified for the return — confirm it covers skill gains too.
- [ ] **What the quest tracker shows when no quest is active** — hidden,
	or a prompt.
- [ ] **Where the save export buttons live** — Test tools, or somewhere a
	normal player would find them. [[Settings]] now has a place for real
	player settings, which makes this answerable.
- [ ] **Which tabs earn their place.** Deferred deliberately until after
	playtesting.
- [ ] Whether anything **other than the Hunt tab** raises a notification
	dot.
- [ ] **Does anything other than the tab bar get an icon?** Resources,
	skills and locations are all text today. See [[Icons]].

## 7. Tuning

Deliberately last: none of it matters until the systems exist.

- [ ] **The XP curve.** `L × 10` to level 100 is ~1 h 22 min of unbroken
	play at ×1 — set when there was one skill and one action.
- [ ] **Research tiers 2 to 4** carry placeholder numbers copied from
	[[Study]].
- [ ] **Tick lengths** for a "lengthy skill", which is mentioned but not
	specified.

## 8. Parked

- [ ] **The tavern / public house.** Wanted, no purpose yet.
- [ ] **Active Title buffs** — only passive is planned; the data should
	not assume passive is the only kind.

---

## Known constraints, already decided

Not questions — things that constrain implementation and are easy to
forget.

> [!danger] Safari deletes site storage after 7 days
> A save that banks 24 hours of offline income can simply vanish. This is
> what makes the export/import plan in [[Save System]] matter.

> [!danger] Offline resolution must step through level-ups
> Per-tick gains will change with level, so it can never be
> `ticks x per-tick gain`. See [[Core Loop]].

> [!important] A bottom bar must clear the phone's home indicator
> The quest tracker sits at the very bottom of the screen and has to
> respect `safe-area-inset-bottom`, or iOS swipe gestures hijack it.

> [!important] Partial ticks carry across being away, and nowhere else
> Stopping or switching a skill discards the remainder deliberately.
> See [[Core Loop]].
