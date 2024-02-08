let counter = 1;

class Physics {
  static getOverlap(entity1, entity2) {
    // console.log(entity1.pos.centerY);
    const deltaX = Math.abs(entity1.pos.centerX - entity2.pos.centerX);
    const deltaY = Math.abs(entity1.pos.centerY - entity2.pos.centerY);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static getPrevOverlap(entity1, entity2) {
    const deltaX = Math.abs(entity1.pos.prevCenterX - entity2.pos.prevCenterX);
    const deltaY = Math.abs(entity1.pos.prevCenterY - entity2.pos.prevCenterY);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX < 0 ? 0 : overlapX, y: overlapY < 0 ? 0 : overlapY };
  }

  static wallCollision(entity1, entity2, overlap) {
    let entity1Copy = JSON.parse(JSON.stringify(entity1));
    const prevOverlap = this.getPrevOverlap(entity1, entity2);

    if (prevOverlap.y > 0) {
      entity1.movement.velocity.y = 0;
      entity1.movement.acceleration.y = 0;
      if (entity1Copy.pos.prevY < entity1Copy.pos.y) {
        entity1Copy.pos.y -= overlap.y;
        console.log("from top");
      } else if (entity1Copy.pos.prevY > entity1Copy.pos.y) {
        entity1Copy.pos.y += overlap.y;
        console.log("from bottom");
      }
      entity1Copy.pos.prevY = entity1Copy.pos.y;
    }

    if (prevOverlap.x > 0) {
      entity1.movement.velocity.x = 0;
      entity1.movement.acceleration.x = 0;
      if (entity1Copy.pos.prevX < entity1Copy.pos.x) {
        entity1Copy.pos.x -= overlap.x;
        console.log("from left");
      } else if (entity1Copy.pos.prevX > entity1Copy.pos.x) {
        entity1Copy.pos.x += overlap.x;
        console.log("from right");
      }
      entity1Copy.pos.prevX = entity1Copy.pos.x;
    }

    return entity1Copy;
  }
}
export default Physics;
