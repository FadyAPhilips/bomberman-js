class Component_Place {
  constructor(params) {
    this.pos = params.pos;
    this.prevPos = params.pos;
    this.size = params.size ? params.size : { x: 64, y: 64 };
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
