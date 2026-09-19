/*
 * config.js — ALL tuning values live here.
 *
 * Game logic never hardcodes numbers; it reads them from this file.
 * Rebalancing should only ever require editing this file.
 */

const CONFIG = {
  /* ---- Engine ---------------------------------------------------------- */
  engine: {
    // Largest real-time step a single frame may consume, in ms.
    // Keeps a backgrounded/stalled tab from "catching up" on return.
    maxFrameMs: 250,
    // Hard safety cap on ticks processed in one frame (speed multipliers).
    maxTicksPerFrame: 1000,
  },

  /* ---- Save system ----------------------------------------------------- */
  save: {
    storageKey: 'idleacademy.save',
    version: 3,
    autosaveMs: 5000,
  },

  /* ---- Resources ------------------------------------------------------- */
  // Notes is the tier-1 Research output. Higher Research tiers are planned
  // to yield higher-tier resources; not designed or implemented yet.
  resources: {
    notes: { id: 'notes', name: 'Notes' },
  },

  /* ---- Skill categories ------------------------------------------------ */
  // The Skill tab groups skills by category. Research is the first category.
  // Its skills are a tier ladder: Study -> Sketch -> Draft -> Theorise.
  // Only Study exists; see design/Research.md.
  categories: {
    research: { id: 'research', name: 'Research' },
  },

  /* ---- Skills ---------------------------------------------------------- */
  skills: {
    study: {
      id: 'study',
      name: 'Study',
      categoryId: 'research',
      // Skill names are verbs; the button reads as the gerund while running.
      buttonLabel: 'Study',
      buttonLabelActive: 'Studying',
      // Length of one tick in ms at speed x1.
      tickMs: 1000,
      // Gains applied on every tick.
      xpPerTick: 10,
      resourceId: 'notes',
      resourcePerTick: 1,
      // Levelling.
      startLevel: 1,
      maxLevel: 100,
      // XP required to go from `level` to `level + 1`.
      // level * 10  ->  10, 20, 30, ... ; total to level 100 = 49,500 XP.
      xpForNextLevel: (level) => level * 10,
    },
  },

  /* ---- Test tools ------------------------------------------------------ */
  testTools: {
    speeds: [1, 10, 100],
    defaultSpeed: 1,
    // How long the reset button stays in "tap again to confirm" state (ms).
    resetConfirmMs: 4000,
  },
};
