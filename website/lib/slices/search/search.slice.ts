import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  SearchActionType,
  SearchFailureActionType,
  SearchMemberSuccessActionType,
  SearchMobileAppFeatureSuccessActionType,
  SearchNocSuccessActionType,
  SearchObjectiveSuccessActionType,
  SearchOverviewSuccessActionType,
  SearchSliceStateType,
} from "./search.type";

const initState: SearchSliceStateType = {
  searchFetchStatus: FetchStatusEnum.IDLE,
  searchFetchError: undefined,
  searchOverviewResponse: undefined,
  searchObjectiveResponse: undefined,
  searchMobileAppFeatureResponse: undefined,
  searchMemberResponse: undefined,
  searchNocResponse: undefined,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),
    searchFetch: (state, _action: SearchActionType) => {
      state.searchFetchStatus = FetchStatusEnum.FETCHING;
      state.searchFetchError = "";
    },
    searchOverviewFetchSuccess: (
      state,
      action: SearchOverviewSuccessActionType
    ) => {
      state.searchFetchStatus = FetchStatusEnum.SUCCESS;
      state.searchOverviewResponse = action.payload.response;
      console.log(action.payload);
      state.searchOverviewResponse.path = action.payload.path;
    },
    searchObjectiveFetchSuccess: (
      state,
      action: SearchObjectiveSuccessActionType
    ) => {
      state.searchFetchStatus = FetchStatusEnum.SUCCESS;
      state.searchObjectiveResponse = action.payload.response;
      console.log(action.payload);
      state.searchObjectiveResponse.path = action.payload.path;
    },
    searchMobileAppFeatureFetchSuccess: (
      state,
      action: SearchMobileAppFeatureSuccessActionType
    ) => {
      state.searchFetchStatus = FetchStatusEnum.SUCCESS;
      state.searchMobileAppFeatureResponse = action.payload.response;
      console.log(action.payload);
      state.searchMobileAppFeatureResponse.path = action.payload.path;
    },
    searchMemberFetchSuccess: (
      state,
      action: SearchMemberSuccessActionType
    ) => {
      state.searchFetchStatus = FetchStatusEnum.SUCCESS;
      state.searchMemberResponse = action.payload.response;
      console.log(action.payload);
      state.searchMemberResponse.path = action.payload.path;
    },
    searchNocFetchSuccess: (state, action: SearchNocSuccessActionType) => {
      state.searchFetchStatus = FetchStatusEnum.SUCCESS;
      state.searchNocResponse = action.payload.response;
      console.log(action.payload);
      state.searchNocResponse.path = action.payload.path;
    },
    searchFetchFailure: (state, action: SearchFailureActionType) => {
      state.searchFetchStatus = FetchStatusEnum.FAILURE;
      state.searchFetchError = action.payload.error;
    },
    resetState: () => {
      return initState;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
