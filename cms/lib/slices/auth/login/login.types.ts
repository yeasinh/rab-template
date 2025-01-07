import { BaseActionType } from "@lib/action.type";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, LoginResponse } from "@services/auth/auth.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface LoginSliceStateType {
  loginFetchStatus: FetchStatusEnum;
  loginError?: string;
  loginResponse?: LoginResponse;
  isLogin: boolean;
  user?: LoginResponse;
}

export interface LoginActionType extends BaseActionType {
  payload: {
    request: LoginRequest;
  };
}

export interface LoginSuccessActionType extends BaseActionType {
  payload: {
    response: LoginResponse;
  };
}

export interface LoginFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export type RefreshTokenActionType = PayloadAction;
