class Component_Bounding {
  #x;
  #y;

  constructor(params) {
    this.#x = params.x ? params.x : 64;
    this.#y = params.y ? params.y : 64;
  }

  getEverything() {
    return {
      x: this.#x,
      y: this.#y,
    };
  }

  getBounding() {
    return { x: this.#x, y: this.#y };
  }
}

export default Component_Bounding;
