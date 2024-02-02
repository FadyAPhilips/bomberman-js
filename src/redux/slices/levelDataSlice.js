import { createSlice } from "@reduxjs/toolkit";
import level from "../../gameData/level.json";
import gameConfig from "../../gameData/gameConfig.json";

const config = JSON.parse(JSON.stringify(gameConfig))[0];

const newEntities = level.map((e) => {
  let newEntity = JSON.parse(JSON.stringify(e));
  let newX = (newEntity.pos.x - 1) * config.gridCellSize;
  let newY = (newEntity.pos.y - 1) * config.gridCellSize;
  newEntity.pos.x = newX;
  newEntity.pos.y = newY;
  return newEntity;
});

export const levelState = createSlice({
  name: "level",
  initialState: {
    gridSizeX: Math.max(...level.map((item) => item.pos.x)),
    gridSizeY: Math.max(...level.map((item) => item.pos.y)),
    entityList: newEntities,
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
