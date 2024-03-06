import { createSlice } from "@reduxjs/toolkit";

export const gameState = createSlice({
  name: "gameState",
  initialState: {
    pauseStatus: false,
    pauseToggler: true,
    frameCount: 0,
    frameRate: 0,
    time1: Date.now() / 1000,
  },
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
    calculateFrameRate: (state) => {
      const time2 = Date.now() / 1000;
      const deltaTime = time2 - state.time1;
      state.frameRate = Math.round(20 / deltaTime);
      state.time1 = time2;
    },
  },
});

export const { togglePause, resetToggler, incrementFrame, calculateFrameRate } =
  gameState.actions;

export default gameState.reducer;
