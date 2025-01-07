import { PayloadAction } from "@reduxjs/toolkit";

export const loggerMiddleware =
  () =>
  (next: any): any =>
  (action: PayloadAction<any>): any => {
    const [reducerName, actionName] = action.type.split("/");

    const times = new Date().toLocaleTimeString();

    // if (environment.isDevelopment) {
    console.info(`[ACTION ${times}]`, `${reducerName}Actions.${actionName}`);
    // }

    next(action);
  };
