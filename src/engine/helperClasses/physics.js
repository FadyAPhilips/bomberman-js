import Logger from "../../devTools/logger";

class Physics {
  static getCenterPosition(entity) {
    const centerX = entity.pos.x + entity.bounding.sizeX / 2;
    const centerY = entity.pos.y + entity.bounding.sizeY / 2;

    return { x: centerX, y: centerY };
  }

  static getOverlap(entity1, entity2) {
    const ent1Center = this.getCenterPosition(entity1);
    const ent2Center = this.getCenterPosition(entity2);

    const deltaX = Math.abs(ent1Center.x - ent2Center.x);
    const deltaY = Math.abs(ent1Center.y - ent2Center.y);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static getPrevOverlap(entity1, entity2) {
    const ent1Center = this.getCenterPosition(entity1);
    const ent2Center = this.getCenterPosition(entity2);

    const deltaX = Math.abs(ent1Center.x - ent2Center.x);
    const deltaY = Math.abs(ent1Center.y - ent2Center.y);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static wallCollision(entity1, entity2, overlap) {
    let entity1Copy = JSON.parse(JSON.stringify(entity1));
    const prevOverlap = this.getPrevOverlap(entity1, entity2);

    if (prevOverlap.x > 0) {
      if (entity1Copy.pos.prevX < entity1Copy.pos.x) {
        entity1Copy.pos.x -= overlap.x;
        // entity1Copy.overlapX = -1 * overlap.x;
        Logger.log("CollisionsDirection", "from left");
      } else if (entity1Copy.pos.prevX > entity1Copy.pos.x) {
        entity1Copy.pos.x += overlap.x;
        // entity1Copy.overlapX = overlap.x;

        Logger.log("CollisionsDirection", "from right");
      }
      // entity1Copy.pos.prevX = entity1Copy.pos.x;
    }
    if (prevOverlap.y > 0) {
      if (entity1Copy.pos.prevY < entity1Copy.pos.y) {
        entity1Copy.pos.y -= overlap.y;
        // entity1Copy.overlapY = -1 * overlap.y;

        Logger.log("CollisionsDirection", "from top");
      } else if (entity1Copy.pos.prevY > entity1Copy.pos.y) {
        entity1Copy.pos.y += overlap.y;
        // entity1Copy.overlapY = overlap.y;

        Logger.log("CollisionsDirection", "from bottom");
      }
      // entity1Copy.pos.prevY = entity1Copy.pos.y;
    }

    return entity1Copy;
  }
}
export default Physics;
