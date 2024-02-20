import gameConfig from "../../gameData/gameConfig.json";
const config = JSON.parse(JSON.stringify(gameConfig))[0];

class Component_Place {
  #pos;
  #prevPos;
  #size;

  constructor(params) {
    this.#pos = {
      x: (params.pos.x - 1) * config.gridCellSize,
      y: (params.pos.y - 1) * config.gridCellSize,
    };
    this.#prevPos = params.prevPos
      ? params.prevPos
      : {
          x: (params.pos.x - 1) * config.gridCellSize,
          y: (params.pos.y - 1) * config.gridCellSize,
        };
    this.#size = params.size ? params.size : { x: 64, y: 64 };
  }

  getEverything() {
    return {
      pos: this.getGridPosition(),
      prevPos: this.#prevPos,
      size: this.#size,
    };
  }

  getSize() {
    return this.#size;
  }

  getPosition() {
    return this.#pos;
  }

  getGridPosition() {
    const gridPosition = {
      x: Math.floor(this.#pos.x / config.gridCellSize) + 1,
      y: Math.floor(this.#pos.y / config.gridCellSize) + 1,
    };
    return gridPosition;
  }

  getPrevPosition() {
    return this.#prevPos;
  }

  updatePosition(x, y) {
    this.#prevPos = this.#pos;
    this.#pos.x = x;
    this.#pos.y = y;
  }
}

export default Component_Place;
