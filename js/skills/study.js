/*
 * skills/study.js — the Study skill (tier 1 of the Research category).
 *
 * A skill module owns one thing: what happens on a tick. All numbers come
 * from CONFIG.skills.<id>. Add a new skill by copying this shape and
 * registering it in Skills.registry (js/skills/index is not needed while
 * scripts are loaded in order from index.html).
 */

const StudySkill = {
  config: CONFIG.skills.study,

  // Called once per tick while the skill is active.
  // Returns a small summary the UI can react to.
  tick(state) {
    const progress = state.skills[this.config.id];
    const levelsGained = Leveling.addXp(this.config, progress, this.config.xpPerTick);

    // Resource keeps accruing at max level; XP does not.
    State.addResource(this.config.resourceId, this.config.resourcePerTick);

    return { levelsGained };
  },
};

const Skills = {
  registry: {
    study: StudySkill,
  },

  get(id) {
    return this.registry[id];
  },
};
