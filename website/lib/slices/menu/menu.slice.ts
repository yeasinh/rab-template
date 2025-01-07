import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  MenuActionType,
  MenuFailureActionType,
  MenuSliceStateType,
  MenuSuccessActionType,
} from "./menu.type";

const initState: MenuSliceStateType = {
  menuFetchStatus: FetchStatusEnum.IDLE,
  menuFetchError: undefined,
  menuResponse: undefined,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    menu: (state, _action: MenuActionType) => {
      state.menuFetchStatus = FetchStatusEnum.FETCHING;
      state.menuFetchError = "";
    },
    menuFetchSuccess: (state, action: MenuSuccessActionType) => {
      state.menuFetchStatus = FetchStatusEnum.SUCCESS;
      state.menuResponse = action.payload.response;
    },
    menuFetchFailure: (state, action: MenuFailureActionType) => {
      state.menuFetchStatus = FetchStatusEnum.FAILURE;
      state.menuFetchError = action.payload.error;
    },
    resetMenu: () => {
      return initState;
    },
  },
});

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
