/*
 * ui.js — all DOM reading/writing. No game rules live here.
 *
 * The render pass runs every frame but only touches the DOM when a value
 * actually changed, so high speed multipliers stay cheap.
 */

const UI = {
  el: {},
  cache: {},
  resetArmed: false,
  resetTimer: null,

  init() {
    this.el = {
      skillTitle: document.getElementById('skill-title'),
      levelValue: document.getElementById('skill-level'),
      maxLevel: document.getElementById('skill-max-level'),
      actionButton: document.getElementById('skill-action'),
      actionLabel: document.getElementById('skill-action-label'),
      tickFill: document.getElementById('skill-tick-fill'),
      xpFill: document.getElementById('skill-xp-fill'),
      xpText: document.getElementById('skill-xp-text'),
      resourceName: document.getElementById('resource-name'),
      resourceValue: document.getElementById('resource-value'),
      speedButtons: document.getElementById('speed-buttons'),
      resetButton: document.getElementById('reset-button'),
      saveNotice: document.getElementById('save-notice'),
    };

    const skill = CONFIG.skills.research;
    this.el.skillTitle.textContent = skill.name;
    this.el.actionLabel.textContent = skill.buttonLabel;
    this.el.maxLevel.textContent = String(skill.maxLevel);
    this.el.resourceName.textContent = CONFIG.resources[skill.resourceId].name;

    this.el.actionButton.addEventListener('click', () => {
      const active = Engine.toggleSkill(skill.id);
      this.setActionState(active);
      Save.save(State.current);
    });

    this.buildSpeedButtons();
    this.bindReset();

    Engine.onTick = () => this.render();
    this.setActionState(false);
    this.render(true);
  },

  buildSpeedButtons() {
    for (const speed of CONFIG.testTools.speeds) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'speed-button';
      button.textContent = '×' + speed;
      button.dataset.speed = String(speed);
      button.addEventListener('click', () => {
        Engine.setSpeed(speed);
        this.updateSpeedButtons();
      });
      this.el.speedButtons.appendChild(button);
    }
    this.updateSpeedButtons();
  },

  updateSpeedButtons() {
    for (const button of this.el.speedButtons.children) {
      const selected = Number(button.dataset.speed) === Engine.speed;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
  },

  bindReset() {
    this.el.resetButton.addEventListener('click', () => {
      if (!this.resetArmed) {
        this.resetArmed = true;
        this.el.resetButton.textContent = 'Tap again to confirm';
        this.el.resetButton.classList.add('is-armed');
        this.resetTimer = setTimeout(
          () => this.disarmReset(),
          CONFIG.testTools.resetConfirmMs
        );
        return;
      }
      this.disarmReset();
      Game.reset();
    });
  },

  disarmReset() {
    clearTimeout(this.resetTimer);
    this.resetTimer = null;
    this.resetArmed = false;
    this.el.resetButton.textContent = 'Reset save';
    this.el.resetButton.classList.remove('is-armed');
  },

  setActionState(active) {
    this.el.actionButton.classList.toggle('is-active', active);
    this.el.actionButton.setAttribute('aria-pressed', String(active));
    this.el.actionButton.dataset.state = active ? 'stop' : 'start';
  },

  showSaveNotice(message) {
    this.el.saveNotice.textContent = message;
    this.el.saveNotice.hidden = !message;
  },

  format(n) {
    return Math.floor(n).toLocaleString();
  },

  set(key, node, value) {
    if (this.cache[key] === value) return;
    this.cache[key] = value;
    node.textContent = value;
  },

  setWidth(key, node, ratio) {
    const pct = (Math.max(0, Math.min(ratio, 1)) * 100).toFixed(1) + '%';
    if (this.cache[key] === pct) return;
    this.cache[key] = pct;
    node.style.width = pct;
  },

  render() {
    const skill = CONFIG.skills.research;
    const progress = State.getSkill(skill.id);
    const maxed = Leveling.isMaxLevel(skill, progress.level);
    const needed = Leveling.xpForNextLevel(skill, progress.level);

    this.set('level', this.el.levelValue, String(progress.level));
    this.set(
      'resource',
      this.el.resourceValue,
      this.format(State.getResource(skill.resourceId))
    );

    if (maxed) {
      this.set('xpText', this.el.xpText, 'Max level — XP stopped');
      this.setWidth('xpFill', this.el.xpFill, 1);
    } else {
      this.set(
        'xpText',
        this.el.xpText,
        this.format(progress.xp) + ' / ' + this.format(needed) + ' XP'
      );
      this.setWidth('xpFill', this.el.xpFill, progress.xp / needed);
    }

    this.setWidth('tickFill', this.el.tickFill, Engine.tickProgress());
  },
};
