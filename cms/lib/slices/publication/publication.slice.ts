import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  PublicationSliceStateType,
  GetPublicationActionType,
  GetPublicationSuccessActionType,
  GetPublicationFailureActionType,
  CreatePublicationActionType,
  CreatePublicationFailureActionType,
  CreatePublicationSuccessActionType,
  DeletePublicationActionType,
  DeletePublicationFailureActionType,
  DeletePublicationSuccessActionType,
  EditPublicationActionType,
  EditPublicationFailureActionType,
  EditPublicationSuccessActionType,
} from "./publication.type";

const initState: PublicationSliceStateType = {
  getPublicationFetchStatus: FetchStatusEnum.IDLE,
  getPublicationFetchError: undefined,
  getPublicationResponse: undefined,
  createPublicationFetchStatus: FetchStatusEnum.IDLE,
  createPublicationFetchError: undefined,
  createPublicationResponse: undefined,
  editPublicationFetchStatus: FetchStatusEnum.IDLE,
  editPublicationFetchError: undefined,
  editPublicationResponse: undefined,
  deletePublicationFetchStatus: FetchStatusEnum.IDLE,
  deletePublicationFetchError: undefined,
  deletePublicationResponse: undefined,
};

const publicationSlice = createSlice({
  name: "publication",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getPublicationFetch: (state, _action: GetPublicationActionType) => {
      state.getPublicationFetchStatus = FetchStatusEnum.FETCHING;
      state.getPublicationFetchError = "";
    },
    getPublicationFetchSuccess: (
      state,
      action: GetPublicationSuccessActionType
    ) => {
      state.getPublicationFetchStatus = FetchStatusEnum.SUCCESS;
      state.getPublicationResponse = action.payload.response;
    },
    getPublicationFetchFailure: (
      state,
      action: GetPublicationFailureActionType
    ) => {
      state.getPublicationFetchStatus = FetchStatusEnum.FAILURE;
      state.getPublicationFetchError = action.payload.error;
    },

    createPublicationFetch: (state, _action: CreatePublicationActionType) => {
      state.createPublicationFetchStatus = FetchStatusEnum.FETCHING;
      state.createPublicationFetchError = "";
    },
    createPublicationFetchSuccess: (
      state,
      action: CreatePublicationSuccessActionType
    ) => {
      state.createPublicationFetchStatus = FetchStatusEnum.SUCCESS;
      state.createPublicationResponse = action.payload.response;
    },
    createPublicationFetchFailure: (
      state,
      action: CreatePublicationFailureActionType
    ) => {
      state.createPublicationFetchStatus = FetchStatusEnum.FAILURE;
      state.createPublicationFetchError = action.payload.error;
    },

    editPublicationFetch: (state, _action: EditPublicationActionType) => {
      state.editPublicationFetchStatus = FetchStatusEnum.FETCHING;
      state.editPublicationFetchError = "";
    },
    editPublicationFetchSuccess: (
      state,
      action: EditPublicationSuccessActionType
    ) => {
      state.editPublicationFetchStatus = FetchStatusEnum.SUCCESS;
      state.editPublicationResponse = action.payload.response;
    },
    editPublicationFetchFailure: (
      state,
      action: EditPublicationFailureActionType
    ) => {
      state.editPublicationFetchStatus = FetchStatusEnum.FAILURE;
      state.editPublicationFetchError = action.payload.error;
    },

    deletePublicationFetch: (state, _action: DeletePublicationActionType) => {
      state.deletePublicationFetchStatus = FetchStatusEnum.FETCHING;
      state.deletePublicationFetchError = "";
    },
    deletePublicationFetchSuccess: (
      state,
      action: DeletePublicationSuccessActionType
    ) => {
      state.deletePublicationFetchStatus = FetchStatusEnum.SUCCESS;
      state.deletePublicationResponse = action.payload.response;
    },
    deletePublicationFetchFailure: (
      state,
      action: DeletePublicationFailureActionType
    ) => {
      state.deletePublicationFetchStatus = FetchStatusEnum.FAILURE;
      state.deletePublicationFetchError = action.payload.error;
    },

    resetPublication: () => {
      return initState;
    },
  },
});

export const publicationActions = publicationSlice.actions;
export const publicationReducer = publicationSlice.reducer;
