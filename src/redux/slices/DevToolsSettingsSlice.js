import { createSlice } from "@reduxjs/toolkit";
import Logger from "../../devTools/logger";

export const DevSettingState = createSlice({
  name: "settings",
  initialState: {
    logger: Logger.loggerState,
    devSetting: {
      borderToggle: false,
      gameGridToggle: false,
      HUDBorderToggle: false,
      HideHUD: false,
      collisionsToggle: true,
    },
  },
  reducers: {
    toggleDevSetting: (state, action) => {
      state.devSetting[action.payload] = !state.devSetting[action.payload];
    },
    toggleLoggerSetting: (state, action) => {
      state.logger[action.payload] = !state.logger[action.payload];
    },
  },
});

export const { toggleDevSetting, toggleLoggerSetting } =
  DevSettingState.actions;

export default DevSettingState.reducer;
