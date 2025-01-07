import { BaseActionType } from "@lib/action.type";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@services/auth/auth.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface ForgotPasswordSliceStateType {
  forgotPasswordFetchStatus: FetchStatusEnum;
  forgotPasswordError?: string;
  forgotPasswordResponse?: ForgotPasswordResponse;
}

export interface ForgotPasswordActionType extends BaseActionType {
  payload: {
    request: ForgotPasswordRequest;
  };
}

export interface ForgotPasswordSuccessActionType extends BaseActionType {
  payload: {
    response: ForgotPasswordResponse;
  };
}

export interface ForgotPasswordFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export type RefreshTokenActionType = PayloadAction;
