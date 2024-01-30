import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import level from "../../gameData/level.json";

export const levelState = createSlice({
  name: "level",
  initialState: {
    gridSizeX: Math.max(...level.map((item) => item.pos.x)),
    gridSizeY: Math.max(...level.map((item) => item.pos.y)),
    entityList: level,
  },
  reducers: {
    setGridSize: (state, action) => {
      state.gridSizeX = action.payload.gridSizeX;
      state.gridSizeY = action.payload.gridSizeY;
    },
    setEntities: (state, action) => {
      console.log("in state");
      state.entityList = action.payload;
    },
  },
});

export const { setGridSize, setEntities } = levelState.actions;

export default levelState.reducer;
