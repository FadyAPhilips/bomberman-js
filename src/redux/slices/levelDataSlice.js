import { createSlice } from "@reduxjs/toolkit";
import level2 from "../../gameData/level2.js";
import level1 from "../../gameData/level1.js";
import gameConfig from "../../gameData/gameConfig.json";

import ClassEntity from "../../engine/ecs/Entity";
import ECS_COMPONENTS from "../../enums/COMPONENTS";
import ENTITY_CLASSES from "../../enums/ENTITY_CLASSES";

const config = JSON.parse(JSON.stringify(gameConfig))[0];

let xPositions = config.minGridSize.x;
let yPositions = config.minGridSize.y;
const entityList = {};
Object.values(ENTITY_CLASSES).forEach((element) => {
  entityList[element] = [];
});

//Load Level
level1.forEach((e) => {
  //Creates all Entity Class Instances
  const entity = new ClassEntity(e.class, e.subtype);
  e.components.forEach((component) => {
    const newComponent = new component(e[component]);
    entity.addComponent(newComponent);
  });

  //pushing entities into their respective list in entityList
  entityList[entity.class].push(entity.toPlainObject());

  //get Max Grid Size
  const entityPosition = entity.getComponent(ECS_COMPONENTS.PLACE).gridPosition;

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
    loadLevelFromFile: (state, action) => {
      //construct entityList
      const entityList = {};
      Object.values(ENTITY_CLASSES).forEach((element) => {
        entityList[element] = [];
      });

      //Load Level
      action.payload.forEach((e) => {
        //Creates all Entity Class Instances
        const entity = new ClassEntity(e.class, e.subtype);
        e.components.forEach((component) => {
          const newComponent = new component(e[component]);
          entity.addComponent(newComponent);
        });

        //pushing entities into their respective list in entityList
        entityList[entity.class].push(entity.toPlainObject());

        //get Max Grid Size
        const entityPosition = entity.getComponent(
          ECS_COMPONENTS.PLACE
        ).gridPosition;

        if (entityPosition.x > xPositions) {
          xPositions = entityPosition.x;
        }
        if (entityPosition.y > yPositions) {
          yPositions = entityPosition.y;
        }
      });

      state.entityList = entityList;
    },
  },
});

export const { setGridSize, setEntities, loadLevelFromFile } =
  levelState.actions;

export default levelState.reducer;
