import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";

import {
  LoginSliceStateType,
  LoginActionType,
  LoginSuccessActionType,
  LoginFailureActionType,
} from "@lib/slices/auth/login/login.types";

const initState: LoginSliceStateType = {
  loginFetchStatus: FetchStatusEnum.IDLE,
  loginError: undefined,
  loginResponse: undefined,

  user: undefined,
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    login: (state, _action: LoginActionType) => {
      state.loginFetchStatus = FetchStatusEnum.FETCHING;
      state.loginError = "";
    },
    loginSuccess: (state, action: LoginSuccessActionType) => {
      state.loginFetchStatus = FetchStatusEnum.SUCCESS;
      state.isLogin = true;
      state.user = action.payload.response as any;
      state.loginResponse = action.payload.response;
    },
    loginFailure: (state, action: LoginFailureActionType) => {
      state.loginFetchStatus = FetchStatusEnum.FAILURE;
      state.loginError = action.payload.error;
      state.isLogin = false;
    },

    resetLogin: () => {
      return initState;
    },

    logout: () => {},
  },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
