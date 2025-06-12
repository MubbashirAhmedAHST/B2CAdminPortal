// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { authSliceReducer } from "./reducers/AuthSlicers";
// import { yourSliceReducer } from "./slices/yourSlice"; // your reducers

const persistConfig = {
  key: "newProjectRoot",
  storage,
};

const rootReducer = combineReducers({
  auth:authSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important for redux-persist
    }),
});

export const persistor = persistStore(store);
