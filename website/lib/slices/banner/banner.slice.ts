import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  BannerSliceStateType,
  GetBannerActionType,
  GetBannerSuccessActionType,
  GetBannerFailureActionType,
} from "./banner.type";

const initState: BannerSliceStateType = {
  getBannerFetchStatus: FetchStatusEnum.IDLE,
  getBannerFetchError: undefined,
  getBannerResponse: undefined,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getBannerFetch: (state, _action: GetBannerActionType) => {
      state.getBannerFetchStatus = FetchStatusEnum.FETCHING;
      state.getBannerFetchError = "";
    },
    getBannerFetchSuccess: (state, action: GetBannerSuccessActionType) => {
      state.getBannerFetchStatus = FetchStatusEnum.SUCCESS;
      state.getBannerResponse = action.payload.response;
    },
    getBannerFetchFailure: (state, action: GetBannerFailureActionType) => {
      state.getBannerFetchStatus = FetchStatusEnum.FAILURE;
      state.getBannerFetchError = action.payload.error;
    },

    resetBanner: () => {
      return initState;
    },
  },
});

export const bannerActions = bannerSlice.actions;
export const bannerReducer = bannerSlice.reducer;
