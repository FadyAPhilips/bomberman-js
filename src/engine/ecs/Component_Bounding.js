class Component_Bounding {
  constructor(params) {
    this._x = params.x ? params.x : 64;
    this._y = params.y ? params.y : 64;
  }

  get everything() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  get bounding() {
    return { x: this._x, y: this._y };
  }
}

export default Component_Bounding;
