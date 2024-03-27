import ENTITY_CLASSES from "../enums/ENTITY_CLASSES";
import ENTITY_SUBTYPES from "../enums/ENTITY_SUBTYPES";
import COMPONENTS from "../enums/COMPONENTS";
import assetsMap from "../gameData/assets.json";

import LevelBuilder from "../engine/ecs/systems/levelBuilder";

const assets = JSON.parse(JSON.stringify(assetsMap))[0];

const generatePerimeterBlock = () => {
  const blocksArray = [];
  for (let y = 1; y <= 15; y++) {
    blocksArray.push(LevelBuilder.block_wall(1, y));
    blocksArray.push(LevelBuilder.block_wall(25, y));
  }
  for (let x = 2; x < 25; x++) {
    blocksArray.push(LevelBuilder.block_wall(x, 1));
    blocksArray.push(LevelBuilder.block_wall(x, 15));
  }
  return blocksArray;
};

const generateStructureBlocks = () => {
  const blocksArray = [];
  for (let x = 3; x < 25; x += 2) {
    for (let y = 3; y < 15; y += 2) {
      blocksArray.push(LevelBuilder.block_wall(x, y));
    }
  }
  return blocksArray;
};

const EntityList = [
  //players
  LevelBuilder.spawnPlayer1(2, 2),

  //Items
  LevelBuilder.item_coin(19, 10),

  //blocks
  LevelBuilder.block_brick(3, 6),
  LevelBuilder.block_brick(6, 6),
  LevelBuilder.block_brick(7, 6),
  LevelBuilder.block_brick(8, 6),
];

EntityList.push(...generatePerimeterBlock());
EntityList.push(...generateStructureBlocks());

export default EntityList;
