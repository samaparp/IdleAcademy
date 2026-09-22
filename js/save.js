/*
 * save.js — localStorage persistence.
 *
 * Every save/load is wrapped in try/catch: private-mode browsers and full
 * quotas throw, and the game must keep running when they do.
 * The save carries a version number and a lastPlayed timestamp. The
 * timestamp exists for FUTURE offline progress — offline progress is NOT
 * implemented, and no progress accrues while the page is closed.
 */

const Save = {
  lastError: null,

  save(state) {
    state.version = CONFIG.save.version;
    state.lastPlayed = Date.now();
    try {
      localStorage.setItem(CONFIG.save.storageKey, JSON.stringify(state));
      this.lastError = null;
      return true;
    } catch (err) {
      this.lastError = err;
      console.warn('[save] could not write save:', err);
      return false;
    }
  },

  load() {
    let raw = null;
    try {
      raw = localStorage.getItem(CONFIG.save.storageKey);
    } catch (err) {
      this.lastError = err;
      console.warn('[save] could not read save:', err);
      return null;
    }

    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      return this.migrate(parsed);
    } catch (err) {
      this.lastError = err;
      console.warn('[save] save was corrupt, ignoring it:', err);
      return null;
    }
  },

  /*
   * Bring an older save up to CONFIG.save.version.
   * Each step migrates one version forward, in order.
   */
  migrate(parsed) {
    if (!parsed || typeof parsed !== 'object') return null;
    let version = Number(parsed.version) || 0;

    // v1 -> v2: the Meditation skill was renamed to Research and its
    // Insight resource to Notes.
    if (version < 2) {
      if (parsed.skills && parsed.skills.meditation && !parsed.skills.research) {
        parsed.skills.research = parsed.skills.meditation;
        delete parsed.skills.meditation;
      }
      if (parsed.resources && 'insight' in parsed.resources && !('notes' in parsed.resources)) {
        parsed.resources.notes = parsed.resources.insight;
        delete parsed.resources.insight;
      }
      version = 2;
    }

    // v2 -> v3: Research became the name of the category, and the tier-1
    // skill was named Study.
    if (version < 3) {
      if (parsed.skills && parsed.skills.research && !parsed.skills.study) {
        parsed.skills.study = parsed.skills.research;
        delete parsed.skills.research;
      }
      version = 3;
    }

    // v3 -> v4: the character gained a name, and the Research ladder gained
    // its three locked skills.
    if (version < 4) {
      if (!parsed.character || typeof parsed.character.name !== 'string') {
        parsed.character = { name: CONFIG.character.defaultName };
      }
      version = 4;
    }

    // v4 -> v5: the player gained a theme setting. Existing players keep
    // the behaviour they already had, which is following the system.
    if (version < 5) {
      if (!parsed.settings || typeof parsed.settings !== 'object') {
        parsed.settings = {};
      }
      if (typeof parsed.settings.theme !== 'string') {
        parsed.settings.theme = CONFIG.theme.default;
      }
      version = 5;
    }

    parsed.version = version;

    if (version > CONFIG.save.version) {
      console.warn('[save] save is from a newer version, loading as-is');
    }
    return parsed;
  },

  clear() {
    try {
      localStorage.removeItem(CONFIG.save.storageKey);
      return true;
    } catch (err) {
      this.lastError = err;
      console.warn('[save] could not clear save:', err);
      return false;
    }
  },
};
