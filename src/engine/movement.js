class Component_Movement {
  static updatePosition(ent) {
    const oldX = ent.pos.X;
    const oldY = ent.pos.Y;
    const newX = oldX + ent.velocity.X;
    const newY = oldY + ent.velocity.Y;
    return [newX, newY];
  }

  static moveRight(ent) {
    const oldV = ent.velocity.X;
    const newV = oldV + ent.acc.X;
    // return newx;
  }

  static moveLeft(ent) {
    // const oldx = ent.pos.x;
    // const newx = oldx + ent.speedx;
    // return newx;
  }

  static moveUp(ent) {
    // const oldx = ent.pos.x;
    // const newx = oldx + ent.speedx;
    // return newx;
  }

  static moveDown(ent) {
    // const oldx = ent.pos.x;
    // const newx = oldx + ent.speedx;
    // return newx;
  }
}

export default Component_Movement;
