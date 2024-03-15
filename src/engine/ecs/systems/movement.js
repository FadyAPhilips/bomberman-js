import Logger from "../../../devTools/logger";
import COMPONENTS from "../../../enums/COMPONENTS";

class Movement {
  static decelerate(entity, currentPosition) {
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

    const newPosition = currentPosition;
    newPosition.x += eMovement.velocity.x;

    newPosition.y += eMovement.velocity.y;
    return newPosition;
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
