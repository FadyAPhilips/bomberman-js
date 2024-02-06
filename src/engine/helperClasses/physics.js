class Physics {
  static getOverlap(ent1, ent2) {
    let entity1 = JSON.parse(JSON.stringify(ent1));
    let entity2 = JSON.parse(JSON.stringify(ent2));

    const deltaX = Math.abs(entity1.pos.centerX - entity2.pos.centerX);
    const deltaY = Math.abs(entity1.pos.centerY - entity2.pos.centerY);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX, y: overlapY };
  }

  static getPrevOverlap(ent1, ent2) {
    let entity1 = JSON.parse(JSON.stringify(ent1));
    let entity2 = JSON.parse(JSON.stringify(ent2));

    const deltaX = Math.abs(entity1.pos.prevCenterX - entity2.pos.prevCenterX);
    const deltaY = Math.abs(entity1.pos.prevCenterY - entity2.pos.prevCenterY);

    const overlapX =
      entity1.bounding.hitBoxX / 2 + entity2.bounding.hitBoxX / 2 - deltaX;
    const overlapY =
      entity1.bounding.hitBoxY / 2 + entity2.bounding.hitBoxY / 2 - deltaY;

    return { x: overlapX, y: overlapY };
  }
}
export default Physics;
