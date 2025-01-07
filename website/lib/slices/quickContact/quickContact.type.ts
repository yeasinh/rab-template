import { BaseActionType } from "@lib/action.type";
import {
  GetQuickContactResponseType,
  GetQuickContactRequestType,
  CreateQuickContactRequestType,
  EditQuickContactRequestType,
  DeleteQuickContactRequestType,
  QuickContactType,
} from "@lib/services/quickContact/quickContact.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface QuickContactSliceStateType {
  getQuickContactFetchStatus: FetchStatusEnum;
  getQuickContactFetchError?: string;
  getQuickContactResponse?: GetQuickContactResponseType;
  createQuickContactFetchStatus: FetchStatusEnum;
  createQuickContactFetchError?: string;
  createQuickContactResponse?: QuickContactType;
  editQuickContactFetchStatus: FetchStatusEnum;
  editQuickContactFetchError?: string;
  editQuickContactResponse?: QuickContactType;
  deleteQuickContactFetchStatus: FetchStatusEnum;
  deleteQuickContactFetchError?: string;
  deleteQuickContactResponse?: QuickContactType;
}

export interface GetQuickContactActionType extends BaseActionType {
  payload: {
    request: GetQuickContactRequestType;
  };
}

export interface GetQuickContactSuccessActionType extends BaseActionType {
  payload: {
    response: GetQuickContactResponseType;
  };
}

export interface GetQuickContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface CreateQuickContactActionType extends BaseActionType {
  payload: {
    request: CreateQuickContactRequestType;
  };
}

export interface CreateQuickContactSuccessActionType extends BaseActionType {
  payload: {
    response: QuickContactType;
  };
}

export interface CreateQuickContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface EditQuickContactActionType extends BaseActionType {
  payload: {
    request: EditQuickContactRequestType;
  };
}

export interface EditQuickContactSuccessActionType extends BaseActionType {
  payload: {
    response: QuickContactType;
  };
}

export interface EditQuickContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface DeleteQuickContactActionType extends BaseActionType {
  payload: {
    request: DeleteQuickContactRequestType;
  };
}

export interface DeleteQuickContactSuccessActionType extends BaseActionType {
  payload: {
    response: QuickContactType;
  };
}

export interface DeleteQuickContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
