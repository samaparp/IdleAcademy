/*
 * ui.js — all DOM reading/writing. No game rules live here.
 *
 * The skill list is built from CONFIG at boot, so adding a skill to the
 * config is enough to make it appear. The render pass runs every frame but
 * only touches the DOM when a value actually changed, so high speed
 * multipliers stay cheap.
 */

const UI = {
  el: {},
  cards: {},      // skill id -> its elements
  cache: {},
  resetArmed: false,
  resetTimer: null,

  init() {
    this.el = {
      tabs: document.getElementById('tabs'),
      skillList: document.getElementById('skill-list'),
      nameValue: document.getElementById('character-name'),
      nameDisplay: document.getElementById('name-display'),
      nameEdit: document.getElementById('name-edit'),
      nameInput: document.getElementById('name-input'),
      nameEditButton: document.getElementById('name-edit-button'),
      nameSaveButton: document.getElementById('name-save-button'),
      nameCancelButton: document.getElementById('name-cancel-button'),
      speedButtons: document.getElementById('speed-buttons'),
      resetButton: document.getElementById('reset-button'),
      saveNotice: document.getElementById('save-notice'),
    };

    this.el.nameInput.maxLength = CONFIG.character.maxNameLength;

    this.buildTabs();
    this.buildSkillList();
    this.bindName();
    this.buildSpeedButtons();
    this.bindReset();

    Engine.onTick = () => this.render();
    this.render();
  },

  /* ---- Tabs ------------------------------------------------------------ */

  /*
   * Tabs are built from CONFIG.tabs, three per row. A locked tab keeps its
   * real label — the player is meant to know the section exists — but is
   * disabled, so it cannot be opened or focused.
   */
  buildTabs() {
    for (const tab of CONFIG.tabs) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tab';
      button.id = 'tab-' + tab.id;
      button.textContent = tab.label;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', tab.panelId);
      button.setAttribute('aria-selected', 'false');
      button.tabIndex = -1;

      if (tab.unlocked) {
        button.addEventListener('click', () => this.selectTab(tab.id));
        button.addEventListener('keydown', (event) => this.onTabKey(event, tab.id));
      } else {
        button.disabled = true;
        button.classList.add('tab--locked');
        button.setAttribute('aria-label', tab.label + CONFIG.ui.lockedTabSuffix);
      }

      this.el.tabs.appendChild(button);
    }

    this.selectTab(CONFIG.defaultTabId);
  },

  // Arrow keys move between the tabs that can actually be opened.
  onTabKey(event, fromId) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();

    const open = CONFIG.tabs.filter((tab) => tab.unlocked);
    const index = open.findIndex((tab) => tab.id === fromId);
    const next = open[(index + step + open.length) % open.length];

    this.selectTab(next.id);
    document.getElementById('tab-' + next.id).focus();
  },

  selectTab(tabId) {
    for (const tab of CONFIG.tabs) {
      const selected = tab.unlocked && tab.id === tabId;
      const button = document.getElementById('tab-' + tab.id);
      button.setAttribute('aria-selected', String(selected));
      button.classList.toggle('is-selected', selected);
      if (tab.unlocked) button.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.panelId).hidden = !selected;
    }
  },

  /* ---- Character name -------------------------------------------------- */

  bindName() {
    this.el.nameEditButton.addEventListener('click', () => this.startEditingName());
    this.el.nameSaveButton.addEventListener('click', () => this.commitName());
    this.el.nameCancelButton.addEventListener('click', () => this.stopEditingName());

    this.el.nameInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== 'Escape') return;
      // Committing moves focus to the edit button; without this the key's
      // default action then activates that button and reopens the editor.
      event.preventDefault();
      if (event.key === 'Enter') this.commitName();
      else this.stopEditingName();
    });
  },

  startEditingName() {
    this.el.nameInput.value = State.getName();
    this.el.nameDisplay.hidden = true;
    this.el.nameEdit.hidden = false;
    this.el.nameInput.focus();
    this.el.nameInput.select();
  },

  stopEditingName() {
    this.el.nameEdit.hidden = true;
    this.el.nameDisplay.hidden = false;
    this.el.nameEditButton.focus();
  },

  commitName() {
    // An empty or whitespace-only name falls back to the default rather
    // than leaving the field blank.
    State.setName(this.el.nameInput.value);
    Save.save(State.current);
    this.stopEditingName();
    this.render();
  },

  /* ---- Skill list ------------------------------------------------------ */

  buildSkillList() {
    for (const category of Object.values(CONFIG.categories)) {
      const skills = Skills.inCategory(category.id);
      const unlockedCount = skills.filter((s) => Skills.isUnlocked(s.config)).length;

      const heading = document.createElement('h2');
      heading.className = 'category';
      heading.textContent = category.name;

      const count = document.createElement('span');
      count.className = 'category__count';
      count.textContent = unlockedCount + ' / ' + skills.length + ' unlocked';
      heading.appendChild(count);

      this.el.skillList.appendChild(heading);

      for (const skill of skills) {
        this.el.skillList.appendChild(
          Skills.isUnlocked(skill.config)
            ? this.buildSkillCard(skill.config)
            : this.buildLockedCard()
        );
      }
    }
  },

  buildSkillCard(skillConfig) {
    const card = document.createElement('section');
    card.className = 'card skill';
    card.dataset.skill = skillConfig.id;

    card.innerHTML = [
      '<div class="skill__head">',
      '  <h3 class="skill__title"></h3>',
      '  <p class="skill__level">Level <span class="skill__level-value">1</span>',
      '    <span class="skill__level-max">/ <span class="skill__level-cap"></span></span></p>',
      '</div>',
      '<button type="button" class="action" aria-pressed="false">',
      '  <span class="action__fill" aria-hidden="true"></span>',
      '  <span class="action__label"></span>',
      '</button>',
      '<div class="xp">',
      '  <div class="bar"><div class="bar__fill"></div></div>',
      '  <p class="xp__text"></p>',
      '</div>',
      '<div class="resource">',
      '  <span class="resource__name"></span>',
      '  <span class="resource__value">0</span>',
      '</div>',
    ].join('\n');

    const el = {
      card,
      title: card.querySelector('.skill__title'),
      level: card.querySelector('.skill__level-value'),
      levelCap: card.querySelector('.skill__level-cap'),
      button: card.querySelector('.action'),
      label: card.querySelector('.action__label'),
      tickFill: card.querySelector('.action__fill'),
      xpFill: card.querySelector('.bar__fill'),
      xpText: card.querySelector('.xp__text'),
      resourceName: card.querySelector('.resource__name'),
      resourceValue: card.querySelector('.resource__value'),
    };

    el.title.textContent = skillConfig.name;
    el.levelCap.textContent = String(skillConfig.maxLevel);
    el.resourceName.textContent = CONFIG.resources[skillConfig.resourceId].name;
    el.button.addEventListener('click', () => {
      // Only one skill runs at a time: starting this one stops whatever was
      // running, which the render pass then reflects on every card.
      Engine.toggleSkill(skillConfig.id);
      Save.save(State.current);
      this.render();
    });

    this.cards[skillConfig.id] = el;
    return card;
  },

  buildLockedCard() {
    const card = document.createElement('section');
    card.className = 'card skill skill--locked';
    card.innerHTML = [
      '<div class="skill__head">',
      '  <h3 class="skill__title"></h3>',
      '  <p class="skill__lock"></p>',
      '</div>',
    ].join('\n');
    card.querySelector('.skill__title').textContent = CONFIG.ui.lockedSkillName;
    card.querySelector('.skill__lock').textContent = CONFIG.ui.lockedSkillLabel;
    return card;
  },

  /* ---- Test tools ------------------------------------------------------ */

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

  showSaveNotice(message) {
    this.el.saveNotice.textContent = message;
    this.el.saveNotice.hidden = !message;
  },

  /* ---- Rendering ------------------------------------------------------- */

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
    this.set('name', this.el.nameValue, State.getName());

    for (const [id, el] of Object.entries(this.cards)) {
      const skillConfig = CONFIG.skills[id];
      const progress = State.getSkill(id);
      const active = Engine.isActive(id);
      const maxed = Leveling.isMaxLevel(skillConfig, progress.level);

      this.set(id + '.level', el.level, String(progress.level));
      this.set(
        id + '.resource',
        el.resourceValue,
        this.format(State.getResource(skillConfig.resourceId))
      );
      this.set(
        id + '.label',
        el.label,
        active ? skillConfig.buttonLabelActive : skillConfig.buttonLabel
      );

      if (this.cache[id + '.active'] !== active) {
        this.cache[id + '.active'] = active;
        el.button.classList.toggle('is-active', active);
        el.button.setAttribute('aria-pressed', String(active));
      }

      if (maxed) {
        this.set(id + '.xpText', el.xpText, 'Max level — XP stopped');
        this.setWidth(id + '.xpFill', el.xpFill, 1);
      } else {
        const needed = Leveling.xpForNextLevel(skillConfig, progress.level);
        this.set(
          id + '.xpText',
          el.xpText,
          this.format(progress.xp) + ' / ' + this.format(needed) + ' XP'
        );
        this.setWidth(id + '.xpFill', el.xpFill, progress.xp / needed);
      }

      this.setWidth(id + '.tickFill', el.tickFill, active ? Engine.tickProgress() : 0);
    }
  },
};
