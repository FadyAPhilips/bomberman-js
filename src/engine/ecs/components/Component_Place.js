import gameConfig from "../../../gameData/gameConfig.json";
const config = JSON.parse(JSON.stringify(gameConfig))[0];

class Component_Place {
  constructor(params) {
    this._pos = {
      x: params.newPos
        ? params.newPos.x
        : (params.pos.x - 1) * config.gridCellSize,
      y: params.newPos
        ? params.newPos.y
        : (params.pos.y - 1) * config.gridCellSize,
    };
    this._prevPos = params.prevPos
      ? params.prevPos
      : {
          x: (params.pos.x - 1) * config.gridCellSize,
          y: (params.pos.y - 1) * config.gridCellSize,
        };
    this._size = params.size ? params.size : { x: 64, y: 64 };
  }

  get everything() {
    return {
      newPos: this._pos,
      prevPos: this._prevPos,
      size: this._size,
    };
  }

  get size() {
    return this._size;
  }

  get position() {
    return this._pos;
  }

  get gridPosition() {
    const gridPosition = {
      x: Math.floor(this._pos.x / config.gridCellSize) + 1,
      y: Math.floor(this._pos.y / config.gridCellSize) + 1,
    };
    return gridPosition;
  }

  get prevPosition() {
    return this._prevPos;
  }

  set prevPosition(newPos) {
    this._prevPos = newPos;
  }

  set position(newPos) {
    const currentP = { ...this._pos };
    this.prevPosition = currentP;
    this._pos = newPos;
  }
}

export default Component_Place;
