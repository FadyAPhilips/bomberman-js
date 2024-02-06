import { createSlice } from "@reduxjs/toolkit";

export const pauseState = createSlice({
  name: "pause",
  initialState: { pauseStatus: false, pauseToggler: true },
  reducers: {
    togglePause: (state) => {
      state.pauseStatus = !state.pauseStatus;
      state.pauseToggler = false;
      console.log(state.pauseStatus);
    },
    resetToggler: (state) => {
      state.pauseToggler = true;
    },
  },
});

export const { togglePause, resetToggler } = pauseState.actions;

export default pauseState.reducer;
