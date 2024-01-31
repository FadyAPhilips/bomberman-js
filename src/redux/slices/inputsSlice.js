import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialInputState = {
  KeyD: false,
  KeyA: false,
  KeyS: false,
  KeyW: false,
  Space: false,
};

export const InputsState = createSlice({
  name: "level",
  initialState: initialInputState,
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
