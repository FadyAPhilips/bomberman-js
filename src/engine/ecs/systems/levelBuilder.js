import COMPONENTS from "../../../enums/COMPONENTS";
import ENTITY_CLASSES from "../../../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../../../enums/ENTITY_SUBTYPES";
import SOUNDS from "../../../enums/SOUNDS";
import assetsMap from "../../../gameData/assets.json";
import EntityManager from "./EntityManager";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

class LevelBuilder {
  static spawnPlayer1(x, y) {
    return {
      class: ENTITY_CLASSES.PC,
      subtype: ENTITY_SUBTYPES.PLAYER1,
      components: [
        COMPONENTS.PLACE,
        COMPONENTS.MOVEMENT,
        COMPONENTS.BOUNDING,
        COMPONENTS.ANIMATION,
        COMPONENTS.STATUS,
      ],
      [COMPONENTS.MOVEMENT]: {
        acceleration: { x: 2, y: 2 },
        maxVel: { x: 8, y: 8 },
      },
      [COMPONENTS.PLACE]: {
        pos: { x: x, y: y },
        size: { x: 64, y: 64 },
      },
      [COMPONENTS.BOUNDING]: { x: 50, y: 50 },
      [COMPONENTS.ANIMATION]: {
        statesList: {
          DEFAULT: "default",
          JUMPING: "jumping",
          RUN: "run",
        },
        assetsList: {
          default: assets.player,
          jumping: assets.playerJump,
          run: assets.playerRun,
        },
      },
      [COMPONENTS.STATUS]: {
        bombSize: 2,
      },
    };
  }

  static block_wall(x, y) {
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

  static block_brick(x, y) {
    return {
      class: ENTITY_CLASSES.BLOCK,
      subtype: ENTITY_SUBTYPES.BRICKS,
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
          default: assets.bricks,
        },
      },
    };
  }

  static item_coin(x, y) {
    return {
      class: ENTITY_CLASSES.ITEM,
      subtype: ENTITY_SUBTYPES.COIN,
      components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
      [COMPONENTS.PLACE]: {
        pos: { x: x, y: y },
        size: { x: 64, y: 64 },
      },
      [COMPONENTS.BOUNDING]: { x: 60, y: 60 },
      [COMPONENTS.ANIMATION]: {
        statesList: {
          DEFAULT: "default",
        },
        assetsList: {
          default: assets.coin,
        },
      },
    };
  }
}

export default LevelBuilder;
