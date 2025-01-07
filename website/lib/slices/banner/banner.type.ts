import { BaseActionType } from "@lib/action.type";
import {
  GetBannerResponseType,
  GetBannerRequestType,
} from "@lib/services/banner/banner.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface BannerSliceStateType {
  getBannerFetchStatus: FetchStatusEnum;
  getBannerFetchError?: string;
  getBannerResponse?: GetBannerResponseType;
}

export interface GetBannerActionType extends BaseActionType {
  payload: {
    request: GetBannerRequestType;
  };
}

export interface GetBannerSuccessActionType extends BaseActionType {
  payload: {
    response: GetBannerResponseType;
  };
}

export interface GetBannerFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
