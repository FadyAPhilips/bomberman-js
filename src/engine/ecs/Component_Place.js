import gameConfig from "../../gameData/gameConfig.json";
const config = JSON.parse(JSON.stringify(gameConfig))[0];

class Component_Place {
  #pos;
  #prevPos;
  #size;

  // * config.gridCellSize;

  constructor(params) {
    this.#pos = {
      x: (params.pos.x - 1) * config.gridCellSize,
      y: (params.pos.y - 1) * config.gridCellSize,
    };
    this.#prevPos = params.pos;
    this.#size = params.size ? params.size : { x: 64, y: 64 };
  }

  getSize() {
    return this.#size;
  }

  getPosition() {
    return this.#pos;
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
