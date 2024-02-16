class Component_Bounding {
  constructor(params) {
    this.x = params.x ? params.x : 64;
    this.y = params.y ? params.y : 64;
  }

  getBounding() {
    return { x: this.x, y: this.y };
  }
}

export default Component_Bounding;
