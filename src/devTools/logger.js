class Logger {
  static #loggerState = {
    Controls: false,
    Collisions: true,
    GameFrame: true,
  };

  static log(type, message) {
    if (Logger.#loggerState[type]) {
      console.log(message);
    }
  }

  static toggleLoggerState(setting) {
    const newState = { ...Logger.#loggerState };
    newState[setting] = !newState[setting];
    Logger.#loggerState = newState;
  }

  static get loggerState() {
    return { ...Logger.#loggerState };
  }
}

export default Logger;
