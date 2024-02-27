import COMPONENTS from "../../../enums/COMPONENTS";

class Camera {
  static followBoxCamera(
    entity,
    window,
    camera,
    levelWidth,
    levelHeight,
    gridCellSize
  ) {
    const entityPoxX = entity.getComponent(COMPONENTS.PLACE).position.x;
    const entityPoxY = entity.getComponent(COMPONENTS.PLACE).position.y;
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
      //move down
      cameraPosY = entityPoxY - window.height + window.height / 3;
    } else if (entityPoxY < cameraPosY + window.height / 3) {
      //move up
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
