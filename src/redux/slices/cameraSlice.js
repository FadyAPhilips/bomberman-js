import { createSlice } from "@reduxjs/toolkit";

export const cameraState = createSlice({
  name: "camera",
  initialState: {
    type: "follow-box",
    x: 0,
    y: 0,
  },
  reducers: {
    setCameraPosition: (state, action) => {
      state.x = action.payload[0];
      state.y = action.payload[1];
    },
    setCameraType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setCameraPosition, setCameraType } = cameraState.actions;

export default cameraState.reducer;
