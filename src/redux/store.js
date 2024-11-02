// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import userSlice from "./userSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key to store the persisted state
  version: 1, // Versioning for migration purposes
  storage, // Storage method, using local storage
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  user: userSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoring specific redux-persist actions for serializability
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export the store
export const persistor = persistStore(store); // Exporting the persistor
export default store;
