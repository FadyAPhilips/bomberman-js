import ENTITY_CLASSES from "../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../enums/ENTITY_SUBTYPES";
import COMPONENTS from "../enums/COMPONENTS";

const EntityList = [
  {
    class: ENTITY_CLASSES.PC,
    subtype: ENTITY_SUBTYPES.PLAYER1,
    components: [COMPONENTS.PLACE, COMPONENTS.MOVEMENT, COMPONENTS.BOUNDING],
    [COMPONENTS.MOVEMENT]: {
      acceleration: { x: 3, y: 2 },
      maxVel: { x: 8, y: 8 },
    },
    [COMPONENTS.PLACE]: {
      pos: { x: 5, y: 4 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.BRICKS,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING],
    [COMPONENTS.PLACE]: {
      pos: { x: 25, y: 20 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
  },
  {
    class: ENTITY_CLASSES.BLOCK,
    subtype: ENTITY_SUBTYPES.WALL_BLOCK,
    components: [COMPONENTS.PLACE, COMPONENTS.BOUNDING],
    [COMPONENTS.PLACE]: {
      pos: { x: 1, y: 1 },
      size: { x: 64, y: 64 },
    },
    [COMPONENTS.BOUNDING]: { x: 64, y: 64 },
  },
];

export default EntityList;
