import Logger from "../../../devTools/logger";
import COMPONENTS from "../../../enums/COMPONENTS";

class Movement {
  static updatePosition(ent) {
    let entity = JSON.parse(JSON.stringify(ent));

    const oldX = entity.pos.x;
    const oldY = entity.pos.y;
    // const newX = oldX + entity.movement.velocity.x + (entity.overlapX || 0);
    // const newY = oldY + entity.movement.velocity.y + (entity.overlapY || 0);

    // const newX = entity.overlapX
    //   ? oldX + entity.overlapX
    //   : oldX + entity.movement.velocity.x;

    let newX;
    let newY;

    if (entity.overlapX) {
      newX = oldX + entity.overlapX;
      entity.movement.velocity.x = 0;
    } else {
      newX = oldX + entity.movement.velocity.x;
    }

    if (entity.overlapY) {
      newY = oldY + entity.overlapY;
      entity.movement.velocity.y = 0;
    } else {
      newY = oldY + entity.movement.velocity.y;
    }

    // const newY = entity.overlapY
    //   ? oldY + entity.overlapY
    //   : oldY + entity.movement.velocity.y;

    entity.overlapX = 0;
    entity.overlapY = 0;

    entity.pos.x = newX;
    entity.pos.y = newY;
    entity.pos.prevX = oldX;
    entity.pos.prevY = oldY;

    return entity;
  }

  static decelerate(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
    let newV = { ...eMovement.velocity };

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
    eMovement.velocity = newV;
    const newPosition = { ...entity.getComponent(COMPONENTS.PLACE).position };
    newPosition.x += eMovement.velocity.x;

    newPosition.y += eMovement.velocity.y;
    entity.getComponent(COMPONENTS.PLACE).position = newPosition;
    console.log("===============================================");
  }

  static moveRight(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
    let oldV = { ...eMovement.velocity };
    const newXV = oldV.x + eMovement.acceleration.x;
    eMovement.velocity = { x: newXV, y: oldV.y };

    // const newPosition = { ...entity.getComponent(COMPONENTS.PLACE).position };
    // newPosition.x += eMovement.velocity.x;
    // newPosition.y += eMovement.velocity.y;

    // return newPosition;
  }

  static moveLeft(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
    let oldV = { ...eMovement.velocity };
    const newXV = oldV.x - eMovement.acceleration.x;
    eMovement.velocity = { x: newXV, y: oldV.y };

    // const newPosition = entity.getComponent(COMPONENTS.PLACE).position;
    // newPosition.x += eMovement.velocity.x;
    // newPosition.y += eMovement.velocity.y;

    // return newPosition;
  }

  static moveUp(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
    let oldV = { ...eMovement.velocity };
    const newYV = oldV.y - eMovement.acceleration.y;
    eMovement.velocity = { x: oldV.x, y: newYV };

    // const newPosition = entity.getComponent(COMPONENTS.PLACE).position;
    // newPosition.x += eMovement.velocity.x;
    // newPosition.y += eMovement.velocity.y;

    // return newPosition;
  }

  static moveDown(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
    let oldV = { ...eMovement.velocity };
    const newYV = oldV.y + eMovement.acceleration.y;
    eMovement.velocity = { x: oldV.x, y: newYV };

    // const newPosition = entity.getComponent(COMPONENTS.PLACE).position;
    // newPosition.x += eMovement.velocity.x;
    // newPosition.y += eMovement.velocity.y;

    // return newPosition;
  }
}

export default Movement;
