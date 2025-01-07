import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";

import {
  ChangePasswordSliceStateType,
  ChangePasswordActionType,
  ChangePasswordSuccessActionType,
  ChangePasswordFailureActionType,
} from "@lib/slices/auth/login/changePassword.types";

const initState: ChangePasswordSliceStateType = {
  changePasswordFetchStatus: FetchStatusEnum.IDLE,
  changePasswordError: undefined,
  changePasswordResponse: undefined,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    changePassword: (state, _action: ChangePasswordActionType) => {
      state.changePasswordFetchStatus = FetchStatusEnum.FETCHING;
      state.changePasswordError = "";
    },
    changePasswordSuccess: (state, action: ChangePasswordSuccessActionType) => {
      state.changePasswordFetchStatus = FetchStatusEnum.SUCCESS;
      state.changePasswordResponse = action.payload.response;
    },
    changePasswordFailure: (state, action: ChangePasswordFailureActionType) => {
      state.changePasswordFetchStatus = FetchStatusEnum.FAILURE;
      state.changePasswordError = action.payload.error;
    },

    resetChangePassword: () => {
      return initState;
    },

    logout: () => {},
  },
});

export const changePasswordActions = changePasswordSlice.actions;
export const changePasswordReducer = changePasswordSlice.reducer;
