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

  static decelerate(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    let newV = entity.movement.velocity;

    if (newV.x > 0) {
      newV.x -= 1;
      if (newV.x < 0) {
        newV.x = 0;
      }
    } else {
      newV.x += 1;
      if (newV.x > 0) {
        newV.x = 0;
      }
    }

    if (newV.y > 0) {
      newV.y -= 1;
      if (newV.y < 0) {
        newV.y = 0;
      }
    } else {
      newV.y += 1;
      if (newV.y > 0) {
        newV.y = 0;
      }
    }

    entity.movement.velocity = newV;

    return entity;
  }

  static moveRight(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldV = entity.movement.velocity.x;
    let newV = oldV + entity.movement.acceleration.x;

    if (Math.abs(newV) > entity.movement.maxVel.x) {
      newV = entity.movement.maxVel.x;
    }

    entity.movement.velocity.x = newV;
    return entity;
  }

  static moveLeft(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldV = entity.movement.velocity.x;
    let newV = oldV - entity.movement.acceleration.x;

    if (Math.abs(newV) > entity.movement.maxVel.x) {
      newV = entity.movement.maxVel.x * -1;
    }

    entity.movement.velocity.x = newV;
    return entity;
  }

  static moveUp(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldV = entity.movement.velocity.y;
    let newV = oldV - entity.movement.acceleration.y;

    if (Math.abs(newV) > entity.movement.maxVel.y) {
      newV = entity.movement.maxVel.y * -1;
    }

    entity.movement.velocity.y = newV;
    return entity;
  }

  static moveDown(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldV = entity.movement.velocity.y;
    let newV = oldV + entity.movement.acceleration.y;

    if (Math.abs(newV) > entity.movement.maxVel.y) {
      newV = entity.movement.maxVel.y;
    }

    entity.movement.velocity.y = newV;
    return entity;
  }
}

export default Component_Movement;
