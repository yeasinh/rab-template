import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  FaqSliceStateType,
  GetFaqActionType,
  GetFaqSuccessActionType,
  GetFaqFailureActionType,
  CreateFaqActionType,
  CreateFaqFailureActionType,
  CreateFaqSuccessActionType,
  DeleteFaqActionType,
  DeleteFaqFailureActionType,
  DeleteFaqSuccessActionType,
  EditFaqActionType,
  EditFaqFailureActionType,
  EditFaqSuccessActionType,
} from "./faq.type";

const initState: FaqSliceStateType = {
  getFaqFetchStatus: FetchStatusEnum.IDLE,
  getFaqFetchError: undefined,
  getFaqResponse: undefined,
  createFaqFetchStatus: FetchStatusEnum.IDLE,
  createFaqFetchError: undefined,
  createFaqResponse: undefined,
  editFaqFetchStatus: FetchStatusEnum.IDLE,
  editFaqFetchError: undefined,
  editFaqResponse: undefined,
  deleteFaqFetchStatus: FetchStatusEnum.IDLE,
  deleteFaqFetchError: undefined,
  deleteFaqResponse: undefined,
};

const faqSlice = createSlice({
  name: "faq",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getFaqFetch: (state, _action: GetFaqActionType) => {
      state.getFaqFetchStatus = FetchStatusEnum.FETCHING;
      state.getFaqFetchError = "";
    },
    getFaqFetchSuccess: (state, action: GetFaqSuccessActionType) => {
      state.getFaqFetchStatus = FetchStatusEnum.SUCCESS;
      state.getFaqResponse = action.payload.response;
    },
    getFaqFetchFailure: (state, action: GetFaqFailureActionType) => {
      state.getFaqFetchStatus = FetchStatusEnum.FAILURE;
      state.getFaqFetchError = action.payload.error;
    },

    createFaqFetch: (state, _action: CreateFaqActionType) => {
      state.createFaqFetchStatus = FetchStatusEnum.FETCHING;
      state.createFaqFetchError = "";
    },
    createFaqFetchSuccess: (state, action: CreateFaqSuccessActionType) => {
      state.createFaqFetchStatus = FetchStatusEnum.SUCCESS;
      state.createFaqResponse = action.payload.response;
    },
    createFaqFetchFailure: (state, action: CreateFaqFailureActionType) => {
      state.createFaqFetchStatus = FetchStatusEnum.FAILURE;
      state.createFaqFetchError = action.payload.error;
    },

    editFaqFetch: (state, _action: EditFaqActionType) => {
      state.editFaqFetchStatus = FetchStatusEnum.FETCHING;
      state.editFaqFetchError = "";
    },
    editFaqFetchSuccess: (state, action: EditFaqSuccessActionType) => {
      state.editFaqFetchStatus = FetchStatusEnum.SUCCESS;
      state.editFaqResponse = action.payload.response;
    },
    editFaqFetchFailure: (state, action: EditFaqFailureActionType) => {
      state.editFaqFetchStatus = FetchStatusEnum.FAILURE;
      state.editFaqFetchError = action.payload.error;
    },

    deleteFaqFetch: (state, _action: DeleteFaqActionType) => {
      state.deleteFaqFetchStatus = FetchStatusEnum.FETCHING;
      state.deleteFaqFetchError = "";
    },
    deleteFaqFetchSuccess: (state, action: DeleteFaqSuccessActionType) => {
      state.deleteFaqFetchStatus = FetchStatusEnum.SUCCESS;
      state.deleteFaqResponse = action.payload.response;
    },
    deleteFaqFetchFailure: (state, action: DeleteFaqFailureActionType) => {
      state.deleteFaqFetchStatus = FetchStatusEnum.FAILURE;
      state.deleteFaqFetchError = action.payload.error;
    },

    resetFaq: () => {
      return initState;
    },
  },
});

export const faqActions = faqSlice.actions;
export const faqReducer = faqSlice.reducer;
