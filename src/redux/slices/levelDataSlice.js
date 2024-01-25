import { createSlice } from "@reduxjs/toolkit";

export const levelState = createSlice({
  name: "level",
  initialState: {
    gridSizeX: 0,
    gridSizeY: 0,
    entityList: [],
  },
  reducers: {
    setLevel: (state, action) => {
      state.gridSizeX = action.payload.gridSizeX;
      state.gridSizeY = action.payload.gridSizeY;
      state.entityList = action.payload.entityList;
    },
  },
});

export const { setLevel } = levelState.actions;

export default levelState.reducer;
