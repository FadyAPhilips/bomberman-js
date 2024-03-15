import ENTITY_CLASSES from "../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../enums/ENTITY_SUBTYPES";
import COMPONENTS from "../enums/COMPONENTS";
import assetsMap from "../gameData/assets.json";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const EntityList = [
  {
    class: ENTITY_CLASSES.PC,
    subtype: ENTITY_SUBTYPES.PLAYER1,
    components: [
      COMPONENTS.PLACE,
      COMPONENTS.MOVEMENT,
      COMPONENTS.BOUNDING,
      COMPONENTS.ANIMATION,
    ],
    [COMPONENTS.MOVEMENT]: {
      acceleration: { x: 2, y: 2 },
      maxVel: { x: 8, y: 8 },
    },
    [COMPONENTS.PLACE]: {
      pos: { x: 5, y: 4 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
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
  },
  {
    class: ENTITY_CLASSES.ITEM,
    subtype: ENTITY_SUBTYPES.COIN,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 21, y: 16 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
    [COMPONENTS.ANIMATION]: {
      statesList: {
        DEFAULT: "default",
      },
      assetsList: {
        default: assets.coin,
      },
    },
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 1, y: 1 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 1, y: 2 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 1, y: 3 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 2, y: 1 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 25, y: 20 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 8, y: 4 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 8, y: 6 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING, COMPONENTS.ANIMATION],
    [COMPONENTS.PLACE]: {
      pos: { x: 10, y: 4 },
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
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [
      COMPONENTS.PLACE,
      COMPONENTS.BOUNDING,
      COMPONENTS.LIFESPAN,
      COMPONENTS.ANIMATION,
    ],
    [COMPONENTS.PLACE]: {
      pos: { x: 17, y: 10 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
    [COMPONENTS.LIFESPAN]: { birthFrame: 0, lifespan: 600 },
    [COMPONENTS.ANIMATION]: {
      statesList: {
        DEFAULT: "default",
      },
      assetsList: {
        default: assets.block,
      },
    },
  },
];

export default EntityList;
