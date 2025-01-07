import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  QuickContactSliceStateType,
  GetQuickContactActionType,
  GetQuickContactSuccessActionType,
  GetQuickContactFailureActionType,
  CreateQuickContactActionType,
  CreateQuickContactFailureActionType,
  CreateQuickContactSuccessActionType,
  DeleteQuickContactActionType,
  DeleteQuickContactFailureActionType,
  DeleteQuickContactSuccessActionType,
  EditQuickContactActionType,
  EditQuickContactFailureActionType,
  EditQuickContactSuccessActionType,
} from "./quickContact.type";

const initState: QuickContactSliceStateType = {
  getQuickContactFetchStatus: FetchStatusEnum.IDLE,
  getQuickContactFetchError: undefined,
  getQuickContactResponse: undefined,
  createQuickContactFetchStatus: FetchStatusEnum.IDLE,
  createQuickContactFetchError: undefined,
  createQuickContactResponse: undefined,
  editQuickContactFetchStatus: FetchStatusEnum.IDLE,
  editQuickContactFetchError: undefined,
  editQuickContactResponse: undefined,
  deleteQuickContactFetchStatus: FetchStatusEnum.IDLE,
  deleteQuickContactFetchError: undefined,
  deleteQuickContactResponse: undefined,
};

const quickContactSlice = createSlice({
  name: "quickContact",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getQuickContactFetch: (state, _action: GetQuickContactActionType) => {
      state.getQuickContactFetchStatus = FetchStatusEnum.FETCHING;
      state.getQuickContactFetchError = "";
    },
    getQuickContactFetchSuccess: (
      state,
      action: GetQuickContactSuccessActionType
    ) => {
      state.getQuickContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.getQuickContactResponse = action.payload.response;
    },
    getQuickContactFetchFailure: (
      state,
      action: GetQuickContactFailureActionType
    ) => {
      state.getQuickContactFetchStatus = FetchStatusEnum.FAILURE;
      state.getQuickContactFetchError = action.payload.error;
    },

    createQuickContactFetch: (state, _action: CreateQuickContactActionType) => {
      state.createQuickContactFetchStatus = FetchStatusEnum.FETCHING;
      state.createQuickContactFetchError = "";
    },
    createQuickContactFetchSuccess: (
      state,
      action: CreateQuickContactSuccessActionType
    ) => {
      state.createQuickContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.createQuickContactResponse = action.payload.response;
    },
    createQuickContactFetchFailure: (
      state,
      action: CreateQuickContactFailureActionType
    ) => {
      state.createQuickContactFetchStatus = FetchStatusEnum.FAILURE;
      state.createQuickContactFetchError = action.payload.error;
    },

    editQuickContactFetch: (state, _action: EditQuickContactActionType) => {
      state.editQuickContactFetchStatus = FetchStatusEnum.FETCHING;
      state.editQuickContactFetchError = "";
    },
    editQuickContactFetchSuccess: (
      state,
      action: EditQuickContactSuccessActionType
    ) => {
      state.editQuickContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.editQuickContactResponse = action.payload.response;
    },
    editQuickContactFetchFailure: (
      state,
      action: EditQuickContactFailureActionType
    ) => {
      state.editQuickContactFetchStatus = FetchStatusEnum.FAILURE;
      state.editQuickContactFetchError = action.payload.error;
    },

    deleteQuickContactFetch: (state, _action: DeleteQuickContactActionType) => {
      state.deleteQuickContactFetchStatus = FetchStatusEnum.FETCHING;
      state.deleteQuickContactFetchError = "";
    },
    deleteQuickContactFetchSuccess: (
      state,
      action: DeleteQuickContactSuccessActionType
    ) => {
      state.deleteQuickContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.deleteQuickContactResponse = action.payload.response;
    },
    deleteQuickContactFetchFailure: (
      state,
      action: DeleteQuickContactFailureActionType
    ) => {
      state.deleteQuickContactFetchStatus = FetchStatusEnum.FAILURE;
      state.deleteQuickContactFetchError = action.payload.error;
    },

    resetQuickContact: () => {
      return initState;
    },
  },
});

export const quickContactActions = quickContactSlice.actions;
export const quickContactReducer = quickContactSlice.reducer;
