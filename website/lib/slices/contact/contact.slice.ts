import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  ContactSliceStateType,
  GetContactActionType,
  GetContactSuccessActionType,
  GetContactFailureActionType,
} from "./contact.type";

const initState: ContactSliceStateType = {
  getContactFetchStatus: FetchStatusEnum.IDLE,
  getContactFetchError: undefined,
  getContactResponse: undefined,
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getContactFetch: (state, _action: GetContactActionType) => {
      state.getContactFetchStatus = FetchStatusEnum.FETCHING;
      state.getContactFetchError = "";
    },
    getContactFetchSuccess: (state, action: GetContactSuccessActionType) => {
      state.getContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.getContactResponse = action.payload.response;
    },
    getContactFetchFailure: (state, action: GetContactFailureActionType) => {
      state.getContactFetchStatus = FetchStatusEnum.FAILURE;
      state.getContactFetchError = action.payload.error;
    },

    resetContact: () => {
      return initState;
    },
  },
});

export const contactActions = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
