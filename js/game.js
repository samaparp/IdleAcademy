/*
 * game.js — boot, autosave and lifecycle wiring.
 */

const Game = {
  autosaveTimer: null,

  start() {
    const loaded = Save.load();
    State.current = State.normalize(loaded);

    if (!loaded && Save.lastError) {
      UI.showSaveNotice('Saving is unavailable in this browser. Progress will be lost on reload.');
    }

    UI.init();
    Engine.start();
    this.startAutosave();
    this.bindLifecycle();
  },

  startAutosave() {
    clearInterval(this.autosaveTimer);
    this.autosaveTimer = setInterval(
      () => Save.save(State.current),
      CONFIG.save.autosaveMs
    );
  },

  bindLifecycle() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Leaving: bank the current state. The loop is paused by the browser,
        // so nothing accrues while hidden.
        Save.save(State.current);
      } else {
        // Returning: drop any stale frame timestamp so no time is credited
        // for the period the page was hidden.
        Engine.resetTiming();
      }
    });

    window.addEventListener('pagehide', () => Save.save(State.current));
  },

  reset() {
    Save.clear();
    State.current = State.createNew();
    Engine.activeSkillId = null;
    Engine.accumulator = 0;
    Engine.resetTiming();
    UI.cache = {};
    UI.setActionState(false);
    // A reset returns the theme to the default along with everything else.
    UI.applyTheme();
    UI.updateThemeButtons();
    UI.render();
    Save.save(State.current);
  },
};

window.addEventListener('DOMContentLoaded', () => Game.start());
