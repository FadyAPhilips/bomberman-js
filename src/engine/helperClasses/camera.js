class Camera {
  static followBoxCamera(
    ent,
    window,
    camera,
    levelWidth,
    levelHeight,
    gridCellSize
  ) {
    let entity = JSON.parse(JSON.stringify(ent));

    const entityPoxX = entity.pos.x;
    const entityPoxY = entity.pos.y;
    let cameraPosX = camera.x;
    let cameraPosY = camera.y;

    const levelWidthPix = levelWidth * gridCellSize;
    const levelHeightPix = levelHeight * gridCellSize;

    if (entityPoxX > window.width + cameraPosX - window.width / 3) {
      //move right
      cameraPosX = entityPoxX - window.width + window.width / 3;
    } else if (entityPoxX < cameraPosX + window.width / 3) {
      //move left
      cameraPosX = entityPoxX - window.width / 3;
    }

    if (entityPoxY > window.height + cameraPosY - window.height / 3) {
      cameraPosY = entityPoxY - window.height + window.height / 3;
    } else if (entityPoxY < cameraPosY + window.height / 3) {
      cameraPosY = entityPoxY - window.height / 3;
    }

    if (cameraPosX < 0) {
      cameraPosX = 0;
    } else if (cameraPosX > levelWidthPix - window.width) {
      cameraPosX = levelWidthPix - window.width;
    }
    if (cameraPosY < 0) {
      cameraPosY = 0;
    } else if (cameraPosY > levelHeightPix - window.height) {
      cameraPosY = levelHeightPix - window.height;
    }
    return [cameraPosX, cameraPosY];
  }
}

export default Camera;
