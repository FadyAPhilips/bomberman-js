class Component_Place {
  constructor(pos, size = { x: 64, y: 64 }) {
    this.pos = pos;
    this.prevPos = pos;
    this.size = size;
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
