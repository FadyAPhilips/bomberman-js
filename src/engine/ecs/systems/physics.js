import Logger from "../../../devTools/logger";
import COMPONENTS from "../../../enums/COMPONENTS";

class Physics {
  static getCenterPosition(entity) {
    const entityPlace = entity.getComponent(COMPONENTS.PLACE);

    const centerX = entityPlace.position.x + entityPlace.size.x / 2;
    const centerY = entityPlace.position.y + entityPlace.size.y / 2;

    return { x: centerX, y: centerY };
  }

  static getPreCenterPosition(entity) {
    const entityPlace = entity.getComponent(COMPONENTS.PLACE);

    const centerX = entityPlace.prevPosition.x + entityPlace.size.x / 2;
    const centerY = entityPlace.prevPosition.y + entityPlace.size.y / 2;

    return { x: centerX, y: centerY };
  }

  static getOverlap(entity1, entity2) {
    const ent1Center = this.getCenterPosition(entity1);
    const ent2Center = this.getCenterPosition(entity2);

    const deltaX = Math.abs(ent1Center.x - ent2Center.x);
    const deltaY = Math.abs(ent1Center.y - ent2Center.y);

    const entity1Bounding = entity1.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity2Bounding = entity2.getComponent(COMPONENTS.BOUNDING).bounding;

    const overlapX = entity1Bounding.x / 2 + entity2Bounding.x / 2 - deltaX;
    const overlapY = entity1Bounding.y / 2 + entity2Bounding.y / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static getPrevOverlap(entity1, entity2) {
    const ent1Center = this.getPreCenterPosition(entity1);
    const ent2Center = this.getPreCenterPosition(entity2);

    const deltaX = Math.abs(ent1Center.x - ent2Center.x);
    const deltaY = Math.abs(ent1Center.y - ent2Center.y);

    const entity1Bounding = entity1.getComponent(COMPONENTS.BOUNDING).bounding;
    const entity2Bounding = entity2.getComponent(COMPONENTS.BOUNDING).bounding;

    const overlapX = entity1Bounding.x / 2 + entity2Bounding.x / 2 - deltaX;
    const overlapY = entity1Bounding.y / 2 + entity2Bounding.y / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static wallCollision(entity1, entity2, overlap) {
    const prevOverlap = this.getPrevOverlap(entity1, entity2);
    const entity1Place = entity1.getComponent(COMPONENTS.PLACE);

    const entity1Pos = { ...entity1Place.position };

    console.log("before", entity1Pos);

    if (prevOverlap.x > 0) {
      if (entity1Place.prevPosition.x < entity1Pos.x) {
        entity1Pos.x -= overlap.x;
        Logger.log("CollisionsDirection", "from left");
      } else if (entity1Place.prevPosition.x > entity1Pos.x) {
        entity1Pos.x += overlap.x;
        Logger.log("CollisionsDirection", "from right");
      }
    }
    if (prevOverlap.y > 0) {
      if (entity1Place.prevPosition.y < entity1Pos.y) {
        entity1Pos.y -= overlap.y;
        Logger.log("CollisionsDirection", "from top");
      } else if (entity1Place.prevPosition.y > entity1Pos.y) {
        entity1Pos.y += overlap.y;
        Logger.log("CollisionsDirection", "from bottom");
      }
    }

    entity1Place.position = entity1Pos;

    console.log("after", entity1Pos);

    // return entity1Copy;
  }
}
export default Physics;
