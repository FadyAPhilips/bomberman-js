import { configureStore } from "@reduxjs/toolkit";

import levelReducer from "./slices/levelDataSlice";

export default configureStore({
  reducer: {
    levelState: levelReducer,
  },
});
