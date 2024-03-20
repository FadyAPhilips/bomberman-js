class Component_Status {
  constructor(params) {
    this._bombSize = params.bombSize ? params.bombSize : 1;
  }

  get everything() {
    return {
      bombSize: this._bombSize,
    };
  }

  get bombSize() {
    return this._bombSize;
  }

  set bombSize(newSize) {
    this._bombSize = newSize;
  }
}

export default Component_Status;
