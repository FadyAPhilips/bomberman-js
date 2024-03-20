import ENTITY_CLASSES from "../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../enums/ENTITY_SUBTYPES";
import COMPONENTS from "../enums/COMPONENTS";
import assetsMap from "../gameData/assets.json";

import LevelBuilder from "../engine/ecs/systems/levelBuilder";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const generatePerimeterBlock = () => {
  const blocksArray = [];
  for (let y = 1; y <= 15; y++) {
    blocksArray.push(LevelBuilder.returnWallBlockRaw(1, y));
    blocksArray.push(LevelBuilder.returnWallBlockRaw(25, y));
  }
  for (let x = 2; x < 25; x++) {
    blocksArray.push(LevelBuilder.returnWallBlockRaw(x, 1));
    blocksArray.push(LevelBuilder.returnWallBlockRaw(x, 15));
  }
  return blocksArray;
};

const generateStructureBlocks = () => {
  const blocksArray = [];
  for (let x = 3; x < 25; x += 2) {
    for (let y = 3; y < 15; y += 2) {
      blocksArray.push(LevelBuilder.returnWallBlockRaw(x, y));
    }
  }
  return blocksArray;
};

const EntityList = [
  //players
  {
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
      pos: { x: 5, y: 4 },
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
      bombSize: 3,
    },
  },
  //Items
  {
    class: ENTITY_CLASSES.ITEM,
    subtype: ENTITY_SUBTYPES.COIN,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 20, y: 10 },
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
  },

  LevelBuilder.returnBrickBlock(6, 6),
  LevelBuilder.returnBrickBlock(7, 6),
  LevelBuilder.returnBrickBlock(8, 6),
  //Level Blocks
];

EntityList.push(...generatePerimeterBlock());
EntityList.push(...generateStructureBlocks());

export default EntityList;
