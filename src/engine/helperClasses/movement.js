import Logger from "../../devTools/logger";
import Entity from "../ecs/Entity";
import Component_Movement from "../ecs/Entity";
import COMPONENTS from "../../enums/COMPONENTS";

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

  static moveRight(entity) {
    const eMovement = entity.getComponent(COMPONENTS.MOVEMENT);
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

export default Movement;
