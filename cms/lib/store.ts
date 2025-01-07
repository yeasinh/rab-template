import rootReducer from "@lib/root.reducer";

import {
  configureStore,
  Middleware as ReduxMiddleware,
} from "@reduxjs/toolkit";

import { rootSaga, rootSagaMiddleware } from "./root.saga";

import { SagaMiddleware } from "redux-saga";
import { loggerMiddleware } from "@lib/middlewares/logger.middleware";

import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: Array<SagaMiddleware | ReduxMiddleware> = [
  rootSagaMiddleware,
  loggerMiddleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(middleware),
});

rootSagaMiddleware.run(rootSaga);

export type AppStoreType = typeof store;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
