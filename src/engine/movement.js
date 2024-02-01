class Component_Movement {
  static updatePosition(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldX = entity.pos.x;
    const oldY = entity.pos.y;
    const newX = oldX + entity.movement.velocity.x;
    const newY = oldY + entity.movement.velocity.y;

    entity.pos.x = newX;
    entity.pos.y = newY;

    return entity;
  }

  static moveRight(ent) {
    const oldV = ent.movement.velocity.x;
    const newV = oldV + ent.movement.acceleration.x;
    return newV;
  }

  static moveLeft(ent) {
    const oldV = ent.movement.velocity.x;
    const newV = oldV - ent.movement.acceleration.x;
    return newV;
  }

  static moveUp(ent) {
    const oldV = ent.movement.velocity.y;
    const newV = oldV + ent.movement.acceleration.y;
    return newV;
  }

  static moveDown(ent) {
    const oldV = ent.movement.velocity.y;
    const newV = oldV - ent.movement.acceleration.y;
    return newV;
  }
}

export default Component_Movement;
