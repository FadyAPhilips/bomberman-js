import { createSlice } from "@reduxjs/toolkit";

export const gameState = createSlice({
  name: "gameState",
  initialState: { pauseStatus: false, pauseToggler: true, frameCount: 0 },
  reducers: {
    togglePause: (state) => {
      state.pauseStatus = !state.pauseStatus;
      state.pauseToggler = false;
    },
    resetToggler: (state) => {
      state.pauseToggler = true;
    },
    incrementFrame: (state) => {
      state.frameCount++;
    },
  },
});

export const { togglePause, resetToggler, incrementFrame } = gameState.actions;

export default gameState.reducer;
