import { createSlice } from "@reduxjs/toolkit";

export const inputsState = createSlice({
  name: "controls",
  initialState: {},
  reducers: {
    setInputToTrue: (state, action) => {
      state[action.payload] = true;
    },
    setInputToFalse: (state, action) => {
      state[action.payload] = false;
    },
  },
});

export const { setInputToTrue, setInputToFalse } = inputsState.actions;

export default inputsState.reducer;
