import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  OpinionSliceStateType,
  GetOpinionActionType,
  GetOpinionSuccessActionType,
  GetOpinionFailureActionType,
  CreateOpinionActionType,
  CreateOpinionFailureActionType,
  CreateOpinionSuccessActionType,
  DeleteOpinionActionType,
  DeleteOpinionFailureActionType,
  DeleteOpinionSuccessActionType,
  EditOpinionActionType,
  EditOpinionFailureActionType,
  EditOpinionSuccessActionType,
} from "./opinion.type";

const initState: OpinionSliceStateType = {
  getOpinionFetchStatus: FetchStatusEnum.IDLE,
  getOpinionFetchError: undefined,
  getOpinionResponse: undefined,
  createOpinionFetchStatus: FetchStatusEnum.IDLE,
  createOpinionFetchError: undefined,
  createOpinionResponse: undefined,
  editOpinionFetchStatus: FetchStatusEnum.IDLE,
  editOpinionFetchError: undefined,
  editOpinionResponse: undefined,
  deleteOpinionFetchStatus: FetchStatusEnum.IDLE,
  deleteOpinionFetchError: undefined,
  deleteOpinionResponse: undefined,
};

const opinionSlice = createSlice({
  name: "opinion",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getOpinionFetch: (state, _action: GetOpinionActionType) => {
      state.getOpinionFetchStatus = FetchStatusEnum.FETCHING;
      state.getOpinionFetchError = "";
    },
    getOpinionFetchSuccess: (state, action: GetOpinionSuccessActionType) => {
      state.getOpinionFetchStatus = FetchStatusEnum.SUCCESS;
      state.getOpinionResponse = action.payload.response;
    },
    getOpinionFetchFailure: (state, action: GetOpinionFailureActionType) => {
      state.getOpinionFetchStatus = FetchStatusEnum.FAILURE;
      state.getOpinionFetchError = action.payload.error;
    },

    createOpinionFetch: (state, _action: CreateOpinionActionType) => {
      state.createOpinionFetchStatus = FetchStatusEnum.FETCHING;
      state.createOpinionFetchError = "";
    },
    createOpinionFetchSuccess: (
      state,
      action: CreateOpinionSuccessActionType
    ) => {
      state.createOpinionFetchStatus = FetchStatusEnum.SUCCESS;
      state.createOpinionResponse = action.payload.response;
    },
    createOpinionFetchFailure: (
      state,
      action: CreateOpinionFailureActionType
    ) => {
      state.createOpinionFetchStatus = FetchStatusEnum.FAILURE;
      state.createOpinionFetchError = action.payload.error;
    },

    editOpinionFetch: (state, _action: EditOpinionActionType) => {
      state.editOpinionFetchStatus = FetchStatusEnum.FETCHING;
      state.editOpinionFetchError = "";
    },
    editOpinionFetchSuccess: (state, action: EditOpinionSuccessActionType) => {
      state.editOpinionFetchStatus = FetchStatusEnum.SUCCESS;
      state.editOpinionResponse = action.payload.response;
    },
    editOpinionFetchFailure: (state, action: EditOpinionFailureActionType) => {
      state.editOpinionFetchStatus = FetchStatusEnum.FAILURE;
      state.editOpinionFetchError = action.payload.error;
    },

    deleteOpinionFetch: (state, _action: DeleteOpinionActionType) => {
      state.deleteOpinionFetchStatus = FetchStatusEnum.FETCHING;
      state.deleteOpinionFetchError = "";
    },
    deleteOpinionFetchSuccess: (
      state,
      action: DeleteOpinionSuccessActionType
    ) => {
      state.deleteOpinionFetchStatus = FetchStatusEnum.SUCCESS;
      state.deleteOpinionResponse = action.payload.response;
    },
    deleteOpinionFetchFailure: (
      state,
      action: DeleteOpinionFailureActionType
    ) => {
      state.deleteOpinionFetchStatus = FetchStatusEnum.FAILURE;
      state.deleteOpinionFetchError = action.payload.error;
    },

    resetOpinion: () => {
      return initState;
    },
  },
});

export const opinionActions = opinionSlice.actions;
export const opinionReducer = opinionSlice.reducer;
