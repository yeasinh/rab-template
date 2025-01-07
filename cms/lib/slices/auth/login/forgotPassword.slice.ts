import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";

import {
  ForgotPasswordSliceStateType,
  ForgotPasswordActionType,
  ForgotPasswordSuccessActionType,
  ForgotPasswordFailureActionType,
} from "@lib/slices/auth/login/forgotPassword.types";

const initState: ForgotPasswordSliceStateType = {
  forgotPasswordFetchStatus: FetchStatusEnum.IDLE,
  forgotPasswordError: undefined,
  forgotPasswordResponse: undefined,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    forgotPassword: (state, _action: ForgotPasswordActionType) => {
      state.forgotPasswordFetchStatus = FetchStatusEnum.FETCHING;
      state.forgotPasswordError = "";
    },
    forgotPasswordSuccess: (state, action: ForgotPasswordSuccessActionType) => {
      state.forgotPasswordFetchStatus = FetchStatusEnum.SUCCESS;
      state.forgotPasswordResponse = action.payload.response;
    },
    forgotPasswordFailure: (state, action: ForgotPasswordFailureActionType) => {
      state.forgotPasswordFetchStatus = FetchStatusEnum.FAILURE;
      state.forgotPasswordError = action.payload.error;
    },

    resetForgotPassword: () => {
      return initState;
    },

    logout: () => {},
  },
});

export const forgotPasswordActions = forgotPasswordSlice.actions;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
