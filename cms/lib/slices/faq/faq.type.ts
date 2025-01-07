import { BaseActionType } from "@lib/action.type";
import {
  GetFaqResponseType,
  GetFaqRequestType,
  CreateFaqRequestType,
  EditFaqRequestType,
  DeleteFaqRequestType,
  FaqType,
} from "@lib/services/faq/faq.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface FaqSliceStateType {
  getFaqFetchStatus: FetchStatusEnum;
  getFaqFetchError?: string;
  getFaqResponse?: GetFaqResponseType;
  createFaqFetchStatus: FetchStatusEnum;
  createFaqFetchError?: string;
  createFaqResponse?: FaqType;
  editFaqFetchStatus: FetchStatusEnum;
  editFaqFetchError?: string;
  editFaqResponse?: FaqType;
  deleteFaqFetchStatus: FetchStatusEnum;
  deleteFaqFetchError?: string;
  deleteFaqResponse?: FaqType;
}

export interface GetFaqActionType extends BaseActionType {
  payload: {
    request: GetFaqRequestType;
  };
}

export interface GetFaqSuccessActionType extends BaseActionType {
  payload: {
    response: GetFaqResponseType;
  };
}

export interface GetFaqFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface CreateFaqActionType extends BaseActionType {
  payload: {
    request: CreateFaqRequestType;
  };
}

export interface CreateFaqSuccessActionType extends BaseActionType {
  payload: {
    response: FaqType;
  };
}

export interface CreateFaqFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface EditFaqActionType extends BaseActionType {
  payload: {
    request: EditFaqRequestType;
  };
}

export interface EditFaqSuccessActionType extends BaseActionType {
  payload: {
    response: FaqType;
  };
}

export interface EditFaqFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface DeleteFaqActionType extends BaseActionType {
  payload: {
    request: DeleteFaqRequestType;
  };
}

export interface DeleteFaqSuccessActionType extends BaseActionType {
  payload: {
    response: FaqType;
  };
}

export interface DeleteFaqFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
