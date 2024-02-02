import { createSlice } from "@reduxjs/toolkit";

export const InputsState = createSlice({
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

export const { setInputToTrue, setInputToFalse } = InputsState.actions;

export default InputsState.reducer;
