/*
 * leveling.js — generic XP/level maths, shared by every skill.
 * Pure functions: no state, no DOM. All numbers come from a skill config.
 */

const Leveling = {
  // XP needed to advance from `level` to `level + 1`.
  // Returns Infinity at (and above) max level, so XP can never be spent.
  xpForNextLevel(skillConfig, level) {
    if (level >= skillConfig.maxLevel) return Infinity;
    return skillConfig.xpForNextLevel(level);
  },

  isMaxLevel(skillConfig, level) {
    return level >= skillConfig.maxLevel;
  },

  // Total XP required to go from the skill's start level to `level`.
  totalXpToLevel(skillConfig, level) {
    let total = 0;
    for (let l = skillConfig.startLevel; l < level; l++) {
      total += skillConfig.xpForNextLevel(l);
    }
    return total;
  },

  /*
   * Add XP to a { level, xp } progress object, applying as many level-ups as
   * the amount allows. Excess XP carries over into the next level.
   * At max level XP is discarded (the skill stops gaining XP).
   * Returns the number of levels gained.
   */
  addXp(skillConfig, progress, amount) {
    if (this.isMaxLevel(skillConfig, progress.level)) {
      progress.xp = 0;
      return 0;
    }

    progress.xp += amount;
    let gained = 0;

    while (!this.isMaxLevel(skillConfig, progress.level)) {
      const needed = this.xpForNextLevel(skillConfig, progress.level);
      if (progress.xp < needed) break;
      progress.xp -= needed;
      progress.level++;
      gained++;
    }

    if (this.isMaxLevel(skillConfig, progress.level)) progress.xp = 0;
    return gained;
  },
};
