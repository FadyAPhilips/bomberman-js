class Component_Place {
  constructor() {
    this.pos;
    this.prevPos;
    this.size;
  }

  getSize() {
    return this.size;
  }

  getPosition() {
    return this.pos;
  }

  getPrevPosition() {
    return this.prevPos;
  }

  updatePosition(x, y) {
    this.prevPos = this.pos;
    this.pos.x = x;
    this.pos.y = y;
  }
}

export default Component_Place;
