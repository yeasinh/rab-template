import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  SearchBarSliceStateType,
  GetSearchBarActionType,
  GetSearchBarSuccessActionType,
  GetSearchBarFailureActionType,
} from "./searchBar.type";

const initState: SearchBarSliceStateType = {
  getSearchBarFetchStatus: FetchStatusEnum.IDLE,
  getSearchBarFetchError: undefined,
  getSearchBarResponse: undefined,
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getSearchBarFetch: (state, _action: GetSearchBarActionType) => {
      state.getSearchBarFetchStatus = FetchStatusEnum.FETCHING;
      state.getSearchBarFetchError = "";
    },
    getSearchBarFetchSuccess: (
      state,
      action: GetSearchBarSuccessActionType
    ) => {
      state.getSearchBarFetchStatus = FetchStatusEnum.SUCCESS;
      state.getSearchBarResponse = action.payload.response;
    },
    getSearchBarFetchFailure: (
      state,
      action: GetSearchBarFailureActionType
    ) => {
      state.getSearchBarFetchStatus = FetchStatusEnum.FAILURE;
      state.getSearchBarFetchError = action.payload.error;
    },

    resetSearchBar: () => {
      return initState;
    },
  },
});

export const searchBarActions = searchBarSlice.actions;
export const searchBarReducer = searchBarSlice.reducer;
