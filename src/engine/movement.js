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
    return newV;
  }

  static moveLeft(ent) {
    const oldV = ent.velocity.X;
    const newV = oldV - ent.acc.X;
    return newV;
  }

  static moveUp(ent) {
    const oldV = ent.velocity.Y;
    const newV = oldV + ent.acc.Y;
    return newV;
  }

  static moveDown(ent) {
    const oldV = ent.velocity.Y;
    const newV = oldV - ent.acc.Y;
    return newV;
  }
}

export default Component_Movement;
