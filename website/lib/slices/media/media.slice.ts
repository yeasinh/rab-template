import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  MediaSliceStateType,
  GetMediaActionType,
  GetMediaSuccessActionType,
  GetMediaFailureActionType,
} from "./media.type";

const initState: MediaSliceStateType = {
  getMediaFetchStatus: FetchStatusEnum.IDLE,
  getMediaFetchError: undefined,
  getMediaResponse: undefined,
};

const mediaSlice = createSlice({
  name: "media",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getMediaFetch: (state, _action: GetMediaActionType) => {
      state.getMediaFetchStatus = FetchStatusEnum.FETCHING;
      state.getMediaFetchError = "";
    },
    getMediaFetchSuccess: (state, action: GetMediaSuccessActionType) => {
      state.getMediaFetchStatus = FetchStatusEnum.SUCCESS;
      state.getMediaResponse = action.payload.response;
    },
    getMediaFetchFailure: (state, action: GetMediaFailureActionType) => {
      state.getMediaFetchStatus = FetchStatusEnum.FAILURE;
      state.getMediaFetchError = action.payload.error;
    },

    resetMedia: () => {
      return initState;
    },
  },
});

export const mediaActions = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
