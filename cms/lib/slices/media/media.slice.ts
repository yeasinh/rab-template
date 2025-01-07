import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  MediaSliceStateType,
  GetMediaActionType,
  GetMediaSuccessActionType,
  GetMediaFailureActionType,
  CreateMediaActionType,
  CreateMediaFailureActionType,
  CreateMediaSuccessActionType,
  DeleteMediaActionType,
  DeleteMediaFailureActionType,
  DeleteMediaSuccessActionType,
  EditMediaActionType,
  EditMediaFailureActionType,
  EditMediaSuccessActionType,
} from "./media.type";

const initState: MediaSliceStateType = {
  getMediaFetchStatus: FetchStatusEnum.IDLE,
  getMediaFetchError: undefined,
  getMediaResponse: undefined,
  createMediaFetchStatus: FetchStatusEnum.IDLE,
  createMediaFetchError: undefined,
  createMediaResponse: undefined,
  editMediaFetchStatus: FetchStatusEnum.IDLE,
  editMediaFetchError: undefined,
  editMediaResponse: undefined,
  deleteMediaFetchStatus: FetchStatusEnum.IDLE,
  deleteMediaFetchError: undefined,
  deleteMediaResponse: undefined,
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

    createMediaFetch: (state, _action: CreateMediaActionType) => {
      state.createMediaFetchStatus = FetchStatusEnum.FETCHING;
      state.createMediaFetchError = "";
    },
    createMediaFetchSuccess: (state, action: CreateMediaSuccessActionType) => {
      state.createMediaFetchStatus = FetchStatusEnum.SUCCESS;
      state.createMediaResponse = action.payload.response;
    },
    createMediaFetchFailure: (state, action: CreateMediaFailureActionType) => {
      state.createMediaFetchStatus = FetchStatusEnum.FAILURE;
      state.createMediaFetchError = action.payload.error;
    },

    editMediaFetch: (state, _action: EditMediaActionType) => {
      state.editMediaFetchStatus = FetchStatusEnum.FETCHING;
      state.editMediaFetchError = "";
    },
    editMediaFetchSuccess: (state, action: EditMediaSuccessActionType) => {
      state.editMediaFetchStatus = FetchStatusEnum.SUCCESS;
      state.editMediaResponse = action.payload.response;
    },
    editMediaFetchFailure: (state, action: EditMediaFailureActionType) => {
      state.editMediaFetchStatus = FetchStatusEnum.FAILURE;
      state.editMediaFetchError = action.payload.error;
    },

    deleteMediaFetch: (state, _action: DeleteMediaActionType) => {
      state.deleteMediaFetchStatus = FetchStatusEnum.FETCHING;
      state.deleteMediaFetchError = "";
    },
    deleteMediaFetchSuccess: (state, action: DeleteMediaSuccessActionType) => {
      state.deleteMediaFetchStatus = FetchStatusEnum.SUCCESS;
      state.deleteMediaResponse = action.payload.response;
    },
    deleteMediaFetchFailure: (state, action: DeleteMediaFailureActionType) => {
      state.deleteMediaFetchStatus = FetchStatusEnum.FAILURE;
      state.deleteMediaFetchError = action.payload.error;
    },

    resetMedia: () => {
      return initState;
    },
  },
});

export const mediaActions = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
