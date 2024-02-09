import { createSlice } from "@reduxjs/toolkit";

export const DevSettingState = createSlice({
  name: "settings",
  initialState: {
    logger: {},
    devSetting: {
      borderToggle: false,
      gameGridToggle: false,
    },
  },
  reducers: {
    toggleDevSetting: (state, action) => {
      state.devSetting[action.payload] = !state.devSetting[action.payload];
    },
  },
});

export const { toggleDevSetting } = DevSettingState.actions;

export default DevSettingState.reducer;
