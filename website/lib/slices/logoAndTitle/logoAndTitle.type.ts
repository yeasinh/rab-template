import { BaseActionType } from "@lib/action.type";
import {
  GetLogoAndTitleResponse,
  GetLogoAndTitleRequest,
} from "@lib/services/logoAndTitle/logoAndTitle.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface LogoAndTitleSliceStateType {
  getLogoAndTitleFetchStatus: FetchStatusEnum;
  getLogoAndTitleFetchError?: string;
  getLogoAndTitleResponse?: GetLogoAndTitleResponse;
}

export interface GetLogoAndTitleActionType extends BaseActionType {
  payload: {
    request: GetLogoAndTitleRequest;
  };
}

export interface GetLogoAndTitleSuccessActionType extends BaseActionType {
  payload: {
    response: GetLogoAndTitleResponse;
  };
}

export interface GetLogoAndTitleFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
