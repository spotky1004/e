import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

import resource from "./resource";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  resource,
});

export default persistReducer(persistConfig, rootReducer) as typeof rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
