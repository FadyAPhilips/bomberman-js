class Component_Lifespan {
  constructor(params) {
    this._birthFrame = params.birthFrame;
    this._lifespan = params.lifespan;
  }

  get everything() {
    return {
      birthFrame: this._birthFrame,
      lifespan: this._lifespan,
    };
  }

  get birthFrame() {
    return this._birthFrame;
  }

  get lifespan() {
    return this._lifespan;
  }

  checkLifeTime(currentFrame) {
    return this._lifespan - (currentFrame - this._birthFrame);
  }
}

export default Component_Lifespan;
