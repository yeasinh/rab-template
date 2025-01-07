import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  ActivitySliceStateType,
  GetActivityActionType,
  GetActivitySuccessActionType,
  GetActivityFailureActionType,
} from "./activity.type";

const initState: ActivitySliceStateType = {
  getActivityFetchStatus: FetchStatusEnum.IDLE,
  getActivityFetchError: undefined,
  getActivityResponse: undefined,
};

const activitySlice = createSlice({
  name: "activity",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getActivityFetch: (state, _action: GetActivityActionType) => {
      state.getActivityFetchStatus = FetchStatusEnum.FETCHING;
      state.getActivityFetchError = "";
    },
    getActivityFetchSuccess: (state, action: GetActivitySuccessActionType) => {
      state.getActivityFetchStatus = FetchStatusEnum.SUCCESS;
      state.getActivityResponse = action.payload.response;
    },
    getActivityFetchFailure: (state, action: GetActivityFailureActionType) => {
      state.getActivityFetchStatus = FetchStatusEnum.FAILURE;
      state.getActivityFetchError = action.payload.error;
    },

    resetActivity: () => {
      return initState;
    },
  },
});

export const activityActions = activitySlice.actions;
export const activityReducer = activitySlice.reducer;
