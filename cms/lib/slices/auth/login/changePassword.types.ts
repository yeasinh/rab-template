import { BaseActionType } from "@lib/action.type";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@services/auth/auth.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface ChangePasswordSliceStateType {
  changePasswordFetchStatus: FetchStatusEnum;
  changePasswordError?: string;
  changePasswordResponse?: ChangePasswordResponse;
}

export interface ChangePasswordActionType extends BaseActionType {
  payload: {
    request: ChangePasswordRequest;
  };
}

export interface ChangePasswordSuccessActionType extends BaseActionType {
  payload: {
    response: ChangePasswordResponse;
  };
}

export interface ChangePasswordFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export type RefreshTokenActionType = PayloadAction;
