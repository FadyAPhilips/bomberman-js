import { configureStore } from "@reduxjs/toolkit";

import levelReducer from "./slices/levelDataSlice";
import inputsReducer from "./slices/inputsSlice";
import cameraReducer from "./slices/cameraSlice";

export default configureStore({
  reducer: {
    levelState: levelReducer,
    inputsState: inputsReducer,
    cameraState: cameraReducer,
  },
});
