import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  LogoAndTitleSliceStateType,
  GetLogoAndTitleActionType,
  GetLogoAndTitleSuccessActionType,
  GetLogoAndTitleFailureActionType,
} from "./logoAndTitle.type";

const initState: LogoAndTitleSliceStateType = {
  getLogoAndTitleFetchStatus: FetchStatusEnum.IDLE,
  getLogoAndTitleFetchError: undefined,
  getLogoAndTitleResponse: undefined,
};

const logoAndTitleSlice = createSlice({
  name: "logoAndTitle",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getLogoAndTitleFetch: (state, _action: GetLogoAndTitleActionType) => {
      state.getLogoAndTitleFetchStatus = FetchStatusEnum.FETCHING;
      state.getLogoAndTitleFetchError = "";
    },
    getLogoAndTitleFetchSuccess: (
      state,
      action: GetLogoAndTitleSuccessActionType
    ) => {
      state.getLogoAndTitleFetchStatus = FetchStatusEnum.SUCCESS;
      state.getLogoAndTitleResponse = action.payload.response;
    },
    getLogoAndTitleFetchFailure: (
      state,
      action: GetLogoAndTitleFailureActionType
    ) => {
      state.getLogoAndTitleFetchStatus = FetchStatusEnum.FAILURE;
      state.getLogoAndTitleFetchError = action.payload.error;
    },

    resetLogoAndTitle: () => {
      return initState;
    },
  },
});

export const logoAndTitleActions = logoAndTitleSlice.actions;
export const logoAndTitleReducer = logoAndTitleSlice.reducer;
