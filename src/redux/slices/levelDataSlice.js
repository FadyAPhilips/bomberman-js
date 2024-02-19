import { createSlice } from "@reduxjs/toolkit";
import level from "../../gameData/level.json";
import level2 from "../../gameData/level2.js";
import gameConfig from "../../gameData/gameConfig.json";

import ClassEntity from "../../engine/ecs/Entity";
import ECS_COMPONENTS from "../../enums/COMPONENTS";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";

const config = JSON.parse(JSON.stringify(gameConfig))[0];

const newEntities = level.map((e) => {
  let newEntity = JSON.parse(JSON.stringify(e));
  let newX = (newEntity.pos.x - 1) * config.gridCellSize;
  let newY = (newEntity.pos.y - 1) * config.gridCellSize;
  newEntity.pos.x = newX;
  newEntity.pos.y = newY;
  newEntity.pos.prevX = newX;
  newEntity.pos.prevY = newY;

  return newEntity;
});

let xPositions = config.minGridSize.x;
let yPositions = config.minGridSize.x;
const entityList = {};
Object.values(ENTITY_CLASSES).forEach((element) => {
  entityList[element] = [];
});
//Load Level
level2.forEach((e) => {
  //Creates all Entity Class Instances
  const entity = new ClassEntity(e.class, e.subtype);
  e.components.forEach((component) => {
    const newComponent = new component(e[component]);
    entity.addComponent(newComponent);
  });

  //pushing entities into their respective list in entityList
  entityList[entity.getClass()].push(entity);

  //get Max Grid Size
  const entityPosition = entity
    .getComponent(ECS_COMPONENTS.PLACE)
    .getPosition();

  if (entityPosition.x > xPositions) {
    xPositions = entityPosition.x;
  }
  if (entityPosition.y > yPositions) {
    yPositions = entityPosition.y;
  }
});

export const levelState = createSlice({
  name: "level",
  initialState: {
    gridSizeX: xPositions,
    gridSizeY: yPositions,
    // entityList: newEntities,
    entityList: entityList,
  },
  reducers: {
    setGridSize: (state, action) => {
      state.gridSizeX = action.payload.gridSizeX;
      state.gridSizeY = action.payload.gridSizeY;
    },
    setEntities: (state, action) => {
      state.entityList = action.payload;
    },
  },
});

export const { setGridSize, setEntities } = levelState.actions;

export default levelState.reducer;
