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
    version: 4,
    autosaveMs: 5000,
  },

  /* ---- Character ------------------------------------------------------- */
  character: {
    // PLACEHOLDER starting name, editable in the Character tab.
    defaultName: 'Hunter',
    maxNameLength: 24,
  },

  /* ---- Resources ------------------------------------------------------- */
  // One per rung of the Research ladder.
  resources: {
    notes: { id: 'notes', name: 'Notes' },
    sketches: { id: 'sketches', name: 'Sketches' },
    blueprints: { id: 'blueprints', name: 'Blueprints' },
    treatises: { id: 'treatises', name: 'Treatises' },
  },

  /* ---- Skill categories ------------------------------------------------ */
  // The Skill tab groups skills by category. Research is the first category.
  // Its skills are a tier ladder: Study -> Sketch -> Draft -> Theorise.
  // Only Study exists; see design/Research.md.
  categories: {
    research: { id: 'research', name: 'Research' },
  },

  /* ---- Skills ---------------------------------------------------------- */
  /*
   * Order here is the order they appear in the Skill tab.
   *
   * `unlocked: false` means the skill is visible as a locked, unnamed slot.
   * UNLOCK RULES ARE NOT DESIGNED YET — nothing in the game can flip these
   * flags, so tiers 2 to 4 stay locked until a rule exists.
   *
   * PLACEHOLDER TUNING: tiers 2 to 4 deliberately carry the same numbers as
   * Study. They are unreachable, and inventing a curve for them would look
   * like a balance decision that has not been made.
   */
  skills: {
    study: {
      id: 'study',
      name: 'Study',
      categoryId: 'research',
      unlocked: true,
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

    sketch: {
      id: 'sketch',
      name: 'Sketch',
      categoryId: 'research',
      unlocked: false,
      buttonLabel: 'Sketch',
      buttonLabelActive: 'Sketching',
      tickMs: 1000,
      xpPerTick: 10,
      resourceId: 'sketches',
      resourcePerTick: 1,
      startLevel: 1,
      maxLevel: 100,
      xpForNextLevel: (level) => level * 10,
    },

    draft: {
      id: 'draft',
      name: 'Draft',
      categoryId: 'research',
      unlocked: false,
      buttonLabel: 'Draft',
      buttonLabelActive: 'Drafting',
      tickMs: 1000,
      xpPerTick: 10,
      resourceId: 'blueprints',
      resourcePerTick: 1,
      startLevel: 1,
      maxLevel: 100,
      xpForNextLevel: (level) => level * 10,
    },

    theorise: {
      id: 'theorise',
      name: 'Theorise',
      categoryId: 'research',
      unlocked: false,
      buttonLabel: 'Theorise',
      buttonLabelActive: 'Theorising',
      tickMs: 1000,
      xpPerTick: 10,
      resourceId: 'treatises',
      resourcePerTick: 1,
      startLevel: 1,
      maxLevel: 100,
      xpForNextLevel: (level) => level * 10,
    },
  },

  /* ---- Tabs ------------------------------------------------------------ */
  /*
   * Order here is the order they appear, three per row.
   *
   * A locked tab still shows its real label — unlike a locked skill, which
   * hides its name. The player is meant to know a Hunt exists.
   *
   * UNLOCK RULES ARE NOT DESIGNED: `unlocked` is a static flag that nothing
   * in the game flips.
   */
  // `label` is no longer painted on the tab: it is the accessible name.
  // `iconId` names a <symbol> in the sprite at the top of index.html.
  tabs: [
    { id: 'character', label: 'Char', iconId: 'icon-character', panelId: 'panel-character', unlocked: true },
    { id: 'skill', label: 'Skill', iconId: 'icon-skill', panelId: 'panel-skill', unlocked: true },
    { id: 'inventory', label: 'Inv', iconId: 'icon-inventory', panelId: 'panel-inventory', unlocked: true },
    { id: 'hunt', label: 'Hunt', iconId: 'icon-hunt', panelId: 'panel-hunt', unlocked: false },
    { id: 'travel', label: 'Travel', iconId: 'icon-travel', panelId: 'panel-travel', unlocked: true },
    { id: 'settings', label: 'Settings', iconId: 'icon-settings', panelId: 'panel-settings', unlocked: true },
  ],
  defaultTabId: 'skill',

  /* ---- Icons ----------------------------------------------------------- */
  /*
   * The icon set is one monochrome line system; see design/Icons.md. These
   * values are pushed onto the root element as custom properties at boot,
   * so the whole set retunes from here rather than from the stylesheet.
   *
   * strokeWidth is in viewBox units, and the viewBox is 24, so at a 24px
   * render 1 unit is 1 CSS pixel. Below 1 a stroke cannot land on a whole
   * device pixel on a 1x display and renders as a grey smear, so 1 is the
   * floor rather than a preference.
   */
  icons: {
    strokeWidth: 1,
    tabSizePx: 26,
  },

  /* ---- UI text --------------------------------------------------------- */
  ui: {
    // Shown in place of a locked skill's name and button.
    lockedSkillName: '???',
    lockedSkillLabel: 'Locked',
    // Appended to a locked tab's accessible name.
    lockedTabSuffix: ' (locked)',
  },

  /* ---- Test tools ------------------------------------------------------ */
  testTools: {
    speeds: [1, 10, 100],
    defaultSpeed: 1,
    // How long the reset button stays in "tap again to confirm" state (ms).
    resetConfirmMs: 4000,
  },
};
