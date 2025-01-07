import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  LinkItemSliceStateType,
  GetLinkItemActionType,
  GetLinkItemSuccessActionType,
  GetLinkItemFailureActionType,
} from "./linkItem.type";

const initState: LinkItemSliceStateType = {
  getLinkItemFetchStatus: FetchStatusEnum.IDLE,
  getLinkItemFetchError: undefined,
  getLinkItemResponse: undefined,
};

const linkItemSlice = createSlice({
  name: "linkItem",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getLinkItemFetch: (state, _action: GetLinkItemActionType) => {
      state.getLinkItemFetchStatus = FetchStatusEnum.FETCHING;
      state.getLinkItemFetchError = "";
    },
    getLinkItemFetchSuccess: (state, action: GetLinkItemSuccessActionType) => {
      state.getLinkItemFetchStatus = FetchStatusEnum.SUCCESS;
      state.getLinkItemResponse = action.payload.response;
    },
    getLinkItemFetchFailure: (state, action: GetLinkItemFailureActionType) => {
      state.getLinkItemFetchStatus = FetchStatusEnum.FAILURE;
      state.getLinkItemFetchError = action.payload.error;
    },

    resetLinkItem: () => {
      return initState;
    },
  },
});

export const linkItemActions = linkItemSlice.actions;
export const linkItemReducer = linkItemSlice.reducer;
