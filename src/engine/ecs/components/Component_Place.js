import gameConfig from "../../../gameData/gameConfig.json";
const config = JSON.parse(JSON.stringify(gameConfig))[0];

class Component_Place {
  constructor(params) {
    this._size = params.size ? params.size : { x: 64, y: 64 };
    this._pos = {
      x: params.newPos
        ? params.newPos.x
        : (params.pos.x - 1) * config.gridCellSize + this._size.x / 2,
      y: params.newPos
        ? params.newPos.y
        : (params.pos.y - 1) * config.gridCellSize + this._size.x / 2,
    };
    this._prevPos = params.prevPos
      ? params.prevPos
      : {
          x: params.pos.x,
          y: params.pos.y,
        };
    this._directionX = params.directionX ? params.directionX : 1;
  }

  get everything() {
    return {
      newPos: this._pos,
      prevPos: this._prevPos,
      size: this._size,
      directionX: this._directionX,
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

  get edgePosition() {
    return {
      x: this._pos.x - this._size.x / 2,
      y: this._pos.y - this._size.y / 2,
    };
  }

  get prevPosition() {
    return this._prevPos;
  }

  set prevPosition(newPos) {
    this._prevPos = newPos;
  }

  set position(newPos) {
    const currentP = { ...this._pos };
    this._prevPos = currentP;
    this._pos = newPos;
  }

  get directionX() {
    return this._directionX;
  }

  set directionX(newDir) {
    this._directionX = newDir;
  }
}

export default Component_Place;
