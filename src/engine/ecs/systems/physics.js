import Logger from "../../../devTools/logger";
import COMPONENTS from "../../../enums/COMPONENTS";

class Physics {
  static getOverlap(entity1, entity2, currentPosition) {
    const ent1Center = currentPosition;
    const ent2Center = entity2.getComponent(COMPONENTS.PLACE).position;

    const deltaX = Math.abs(ent1Center.x - ent2Center.x);
    const deltaY = Math.abs(ent1Center.y - ent2Center.y);

    const entity1Bounding = entity1.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity2Bounding = entity2.getComponent(COMPONENTS.BOUNDING).bounding;

    const overlapX = entity1Bounding.x / 2 + entity2Bounding.x / 2 - deltaX;
    const overlapY = entity1Bounding.y / 2 + entity2Bounding.y / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static levelEdgeCollision(
    entity,
    levelWidth,
    levelHeight,
    gridCellSize,
    currentPosition
  ) {
    const levelWidthPix = levelWidth * gridCellSize;
    const levelHeightPix = levelHeight * gridCellSize;

    const entity1Bounding = entity.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity1Pos = currentPosition;
    const entity1Movement = entity.getComponent(COMPONENTS.MOVEMENT);
    const entity1Vel = { ...entity1Movement.velocity };

    if (entity1Pos.x - entity1Bounding.x / 2 < 0) {
      entity1Pos.x = entity1Bounding.x / 2;
      entity1Vel.x = 0;
    } else if (entity1Pos.x + entity1Bounding.x / 2 > levelWidthPix) {
      entity1Pos.x = levelWidthPix - entity1Bounding.x / 2;
      entity1Vel.x = 0;
    }

    if (entity1Pos.y - entity1Bounding.y / 2 < 0) {
      entity1Pos.y = entity1Bounding.y / 2;
      entity1Vel.y = 0;
    } else if (entity1Pos.y + entity1Bounding.y / 2 > levelHeightPix) {
      entity1Pos.y = levelHeightPix - entity1Bounding.y / 2;
      entity1Vel.y = 0;
    }

    if (
      entity1Movement.velocity.x !== entity1Vel.x ||
      entity1Movement.velocity.y !== entity1Vel.y
    ) {
      entity1Movement.velocity = entity1Vel;
    }

    return entity1Pos;
  }

  static wallCollision(entity1, entity2, currentPosition, overlap) {
    const entity1Bounding = entity1.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity2Bounding = entity2.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity1Place = entity1.getComponent(COMPONENTS.PLACE);
    const entity2Place = entity2.getComponent(COMPONENTS.PLACE);
    const entity1Vel = entity1.getComponent(COMPONENTS.MOVEMENT).velocity;
    let newPos = { ...currentPosition };

    if (overlap.x < overlap.y) {
      if (entity1Vel.x > 0 && entity2Place.position.x > newPos.x) {
        newPos.x =
          entity2Place.position.x -
          entity2Bounding.x / 2 -
          entity1Bounding.x / 2;
        entity1.getComponent(COMPONENTS.MOVEMENT).velocity = {
          x: 0,
          y: entity1Vel.y,
        };
      } else if (entity1Vel.x < 0 && entity2Place.position.x < newPos.x) {
        newPos.x =
          entity2Place.position.x +
          entity2Bounding.x / 2 +
          entity1Bounding.x / 2;
        entity1.getComponent(COMPONENTS.MOVEMENT).velocity = {
          x: 0,
          y: entity1Vel.y,
        };
      }
    } else if (overlap.x > overlap.y) {
      if (entity1Vel.y > 0 && entity2Place.position.y > newPos.y) {
        newPos.y =
          entity2Place.position.y -
          entity2Bounding.y / 2 -
          entity1Bounding.y / 2;
        entity1.getComponent(COMPONENTS.MOVEMENT).velocity = {
          x: entity1Vel.x,
          y: 0,
        };
      } else if (entity1Vel.y < 0 && entity2Place.position.y < newPos.y) {
        newPos.y =
          entity2Place.position.y +
          entity2Bounding.y / 2 +
          entity1Bounding.y / 2;
        entity1.getComponent(COMPONENTS.MOVEMENT).velocity = {
          x: entity1Vel.x,
          y: 0,
        };
      }
    }

    return newPos;
  }
}
export default Physics;
