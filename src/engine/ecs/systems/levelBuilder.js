import COMPONENTS from "../../../enums/COMPONENTS";
import ENTITY_CLASSES from "../../../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../../../enums/ENTITY_SUBTYPES";
import SOUNDS from "../../../enums/SOUNDS";
import assetsMap from "../../../gameData/assets.json";
import EntityManager from "./EntityManager";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

class LevelBuilder {
  static returnWallBlockRaw(x, y) {
    return {
      class: ENTITY_CLASSES.BLOCK,
      subtype: ENTITY_SUBTYPES.WALL_BLOCK,
      components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
      [COMPONENTS.PLACE]: {
        pos: { x: x, y: y },
        size: { x: 64, y: 64 },
      },
      [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
      [COMPONENTS.ANIMATION]: {
        statesList: {
          DEFAULT: "default",
        },
        assetsList: {
          default: assets.block,
        },
      },
    };
  }
}

export default LevelBuilder;
