/*
 * state.js — the in-memory game state and how to create it fresh.
 * Everything persisted lives under State.current; nothing else is saved.
 */

const State = {
  current: null,

  createNew() {
    const state = {
      version: CONFIG.save.version,
      lastPlayed: Date.now(),
      resources: {},
      skills: {},
    };

    for (const id of Object.keys(CONFIG.resources)) {
      state.resources[id] = 0;
    }

    for (const [id, skill] of Object.entries(CONFIG.skills)) {
      state.skills[id] = { level: skill.startLevel, xp: 0 };
    }

    return state;
  },

  /*
   * Fill in anything a loaded save is missing (new skills/resources added
   * after the save was written) and clamp obviously bad values.
   */
  normalize(state) {
    const fresh = this.createNew();
    if (!state || typeof state !== 'object') return fresh;

    const out = fresh;
    out.lastPlayed = Number(state.lastPlayed) || Date.now();

    if (state.resources) {
      for (const id of Object.keys(out.resources)) {
        const value = Number(state.resources[id]);
        if (Number.isFinite(value) && value >= 0) out.resources[id] = value;
      }
    }

    if (state.skills) {
      for (const [id, skillConfig] of Object.entries(CONFIG.skills)) {
        const saved = state.skills[id];
        if (!saved) continue;
        const level = Number(saved.level);
        const xp = Number(saved.xp);
        if (Number.isFinite(level)) {
          out.skills[id].level = Math.min(
            Math.max(Math.floor(level), skillConfig.startLevel),
            skillConfig.maxLevel
          );
        }
        if (Number.isFinite(xp) && xp >= 0) out.skills[id].xp = Math.floor(xp);
        if (Leveling.isMaxLevel(skillConfig, out.skills[id].level)) {
          out.skills[id].xp = 0;
        }
      }
    }

    return out;
  },

  addResource(id, amount) {
    if (!(id in this.current.resources)) this.current.resources[id] = 0;
    this.current.resources[id] += amount;
  },

  getResource(id) {
    return this.current.resources[id] || 0;
  },

  getSkill(id) {
    return this.current.skills[id];
  },
};
