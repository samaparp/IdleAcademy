/*
 * skills/gathering.js — the gathering-skill behaviour.
 *
 * Every skill in the Research ladder ticks the same way: XP into the skill,
 * one unit into its resource. They differ only in their CONFIG entry, so one
 * implementation is registered once per skill rather than copied.
 *
 * A skill that needs different behaviour gets its own module and replaces
 * its entry in Skills.registry.
 */

function createGatheringSkill(skillConfig) {
  return {
    config: skillConfig,

    // Called once per tick while the skill is active.
    tick(state) {
      const progress = state.skills[this.config.id];
      const levelsGained = Leveling.addXp(this.config, progress, this.config.xpPerTick);

      // Resources keep accruing at max level; XP does not.
      State.addResource(this.config.resourceId, this.config.resourcePerTick);

      return { levelsGained };
    },
  };
}

const Skills = {
  registry: {},

  get(id) {
    return this.registry[id];
  },

  // Config order is display order.
  all() {
    return Object.keys(CONFIG.skills).map((id) => this.registry[id]);
  },

  inCategory(categoryId) {
    return this.all().filter((skill) => skill.config.categoryId === categoryId);
  },

  /*
   * Unlocking is not designed yet: the flag is static config, so nothing in
   * the game can flip it. Routing every check through here means an unlock
   * rule can be added in one place later.
   */
  isUnlocked(skillConfig) {
    return skillConfig.unlocked === true;
  },
};

for (const [id, skillConfig] of Object.entries(CONFIG.skills)) {
  Skills.registry[id] = createGatheringSkill(skillConfig);
}
