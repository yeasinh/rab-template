import { BaseActionType } from "@lib/action.type";
import {
  GetMediaResponseType,
  GetMediaRequestType,
  CreateMediaRequestType,
  EditMediaRequestType,
  DeleteMediaRequestType,
  MediaType,
} from "@lib/services/media/media.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface MediaSliceStateType {
  getMediaFetchStatus: FetchStatusEnum;
  getMediaFetchError?: string;
  getMediaResponse?: GetMediaResponseType;
  createMediaFetchStatus: FetchStatusEnum;
  createMediaFetchError?: string;
  createMediaResponse?: MediaType;
  editMediaFetchStatus: FetchStatusEnum;
  editMediaFetchError?: string;
  editMediaResponse?: MediaType;
  deleteMediaFetchStatus: FetchStatusEnum;
  deleteMediaFetchError?: string;
  deleteMediaResponse?: MediaType;
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

export interface CreateMediaActionType extends BaseActionType {
  payload: {
    request: CreateMediaRequestType;
  };
}

export interface CreateMediaSuccessActionType extends BaseActionType {
  payload: {
    response: MediaType;
  };
}

export interface CreateMediaFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface EditMediaActionType extends BaseActionType {
  payload: {
    request: EditMediaRequestType;
  };
}

export interface EditMediaSuccessActionType extends BaseActionType {
  payload: {
    response: MediaType;
  };
}

export interface EditMediaFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface DeleteMediaActionType extends BaseActionType {
  payload: {
    request: DeleteMediaRequestType;
  };
}

export interface DeleteMediaSuccessActionType extends BaseActionType {
  payload: {
    response: MediaType;
  };
}

export interface DeleteMediaFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
