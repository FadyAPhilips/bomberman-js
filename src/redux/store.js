import { configureStore } from "@reduxjs/toolkit";

import levelReducer from "./slices/levelDataSlice";
import inputsReducer from "./slices/inputsSlice";

export default configureStore({
  reducer: {
    levelState: levelReducer,
    InputsState: inputsReducer,
  },
});
