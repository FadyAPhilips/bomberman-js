import { createSlice } from "@reduxjs/toolkit";
import CONTROLS from "../../gameData/controlsMap";

const initialControls = {};

Object.values(CONTROLS).forEach((control) => {
  initialControls[control] = { state: false, switch: true };
});

export const inputsState = createSlice({
  name: "controls",
  initialState: initialControls,
  reducers: {
    setInputToTrue: (state, action) => {
      state[action.payload].state = true;
    },
    setInputToFalse: (state, action) => {
      state[action.payload].state = false;
    },
    resetInputSwitch: (state, action) => {
      state[action.payload].switch = true;
    },
    setInputSwitch: (state, action) => {
      state[action.payload].switch = false;
    },
  },
});

export const {
  setInputToTrue,
  setInputToFalse,
  setInputSwitch,
  resetInputSwitch,
} = inputsState.actions;

export default inputsState.reducer;
