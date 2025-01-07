import { BaseActionType } from "@lib/action.type";
import {
  GetMediaResponseType,
  GetMediaRequestType,
  MediaType,
} from "@lib/services/media/media.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface MediaSliceStateType {
  getMediaFetchStatus: FetchStatusEnum;
  getMediaFetchError?: string;
  getMediaResponse?: GetMediaResponseType;
}

export interface GetMediaActionType extends BaseActionType {
  payload: {
    request: GetMediaRequestType;
  };
}

export interface GetMediaSuccessActionType extends BaseActionType {
  payload: {
    response: GetMediaResponseType;
  };
}

export interface GetMediaFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
