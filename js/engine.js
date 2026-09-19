/*
 * engine.js — the tick loop.
 *
 * Driven by requestAnimationFrame, which browsers pause when the tab is
 * hidden or the page is closed. Combined with the maxFrameMs clamp this
 * gives the intended behaviour: NO progress while closed or backgrounded.
 *
 * Only one activity runs at a time. Speed multipliers scale real elapsed
 * time, so x10 simply means ten ticks per real second.
 */

const Engine = {
  activeSkillId: null,
  speed: CONFIG.testTools.defaultSpeed,
  accumulator: 0,   // ms of (scaled) time banked towards the next tick
  lastFrame: 0,
  frameId: null,
  onTick: null,     // set by ui.js

  start() {
    if (this.frameId !== null) return;
    this.lastFrame = performance.now();
    this.frameId = requestAnimationFrame(this.frame.bind(this));
  },

  stop() {
    if (this.frameId === null) return;
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  },

  isActive(skillId) {
    return this.activeSkillId === skillId;
  },

  toggleSkill(skillId) {
    if (this.activeSkillId === skillId) {
      this.activeSkillId = null;
    } else {
      this.activeSkillId = skillId;
    }
    this.accumulator = 0;
    this.lastFrame = performance.now();
    return this.activeSkillId === skillId;
  },

  setSpeed(multiplier) {
    this.speed = multiplier;
  },

  // Progress towards the next tick, 0..1 — used by the button indicator.
  tickProgress() {
    if (!this.activeSkillId) return 0;
    const skill = Skills.get(this.activeSkillId);
    return Math.min(this.accumulator / skill.config.tickMs, 1);
  },

  // Discard banked time (e.g. after returning from a hidden tab).
  resetTiming() {
    this.lastFrame = performance.now();
  },

  frame(now) {
    const elapsed = Math.min(now - this.lastFrame, CONFIG.engine.maxFrameMs);
    this.lastFrame = now;

    let ticked = 0;

    if (this.activeSkillId) {
      const skill = Skills.get(this.activeSkillId);
      this.accumulator += elapsed * this.speed;

      let ticks = Math.floor(this.accumulator / skill.config.tickMs);
      if (ticks > CONFIG.engine.maxTicksPerFrame) {
        ticks = CONFIG.engine.maxTicksPerFrame;
        this.accumulator = 0;
      } else {
        this.accumulator -= ticks * skill.config.tickMs;
      }

      for (let i = 0; i < ticks; i++) {
        skill.tick(State.current);
        ticked++;
      }
    }

    if (this.onTick) this.onTick(ticked);

    this.frameId = requestAnimationFrame(this.frame.bind(this));
  },
};
