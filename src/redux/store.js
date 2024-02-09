import { configureStore } from "@reduxjs/toolkit";

import levelReducer from "./slices/levelDataSlice";
import inputsReducer from "./slices/inputsSlice";
import cameraReducer from "./slices/cameraSlice";
import pauseReducer from "./slices/pauseSlice";
import DevSettingReducer from "./slices/DevToolsSettingsSlice";

export default configureStore({
  reducer: {
    levelState: levelReducer,
    inputsState: inputsReducer,
    cameraState: cameraReducer,
    pauseState: pauseReducer,
    DevSettingState: DevSettingReducer,
  },
});
