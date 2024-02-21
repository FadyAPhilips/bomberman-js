import { createSlice } from "@reduxjs/toolkit";
import CONTROLS from "../../gameData/controlsMap";

const initialControls = {};

Object.values(CONTROLS).forEach((control) => {
  initialControls[control] = false;
});

export const inputsState = createSlice({
  name: "controls",
  initialState: initialControls,
  reducers: {
    setInputToTrue: (state, action) => {
      console.log(action.payload);
      state[action.payload] = true;
    },
    setInputToFalse: (state, action) => {
      state[action.payload] = false;
    },
  },
});

export const { setInputToTrue, setInputToFalse } = inputsState.actions;

export default inputsState.reducer;
