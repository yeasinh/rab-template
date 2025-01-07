import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  LinkTitleSliceStateType,
  GetLinkTitleActionType,
  GetLinkTitleSuccessActionType,
  GetLinkTitleFailureActionType,
} from "./linkTitle.type";

const initState: LinkTitleSliceStateType = {
  getLinkTitleFetchStatus: FetchStatusEnum.IDLE,
  getLinkTitleFetchError: undefined,
  getLinkTitleResponse: undefined,
};

const linkTitleSlice = createSlice({
  name: "linkTitle",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getLinkTitleFetch: (state, _action: GetLinkTitleActionType) => {
      state.getLinkTitleFetchStatus = FetchStatusEnum.FETCHING;
      state.getLinkTitleFetchError = "";
    },
    getLinkTitleFetchSuccess: (
      state,
      action: GetLinkTitleSuccessActionType
    ) => {
      state.getLinkTitleFetchStatus = FetchStatusEnum.SUCCESS;
      state.getLinkTitleResponse = action.payload.response;
    },
    getLinkTitleFetchFailure: (
      state,
      action: GetLinkTitleFailureActionType
    ) => {
      state.getLinkTitleFetchStatus = FetchStatusEnum.FAILURE;
      state.getLinkTitleFetchError = action.payload.error;
    },

    resetLinkTitle: () => {
      return initState;
    },
  },
});

export const linkTitleActions = linkTitleSlice.actions;
export const linkTitleReducer = linkTitleSlice.reducer;
