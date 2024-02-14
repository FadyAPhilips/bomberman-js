class Component_Bounding {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getBounding() {
    return { x: this.x, y: this.y };
  }
}

export default Component_Bounding;
