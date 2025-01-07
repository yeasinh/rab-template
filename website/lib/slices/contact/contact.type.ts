import { BaseActionType } from "@lib/action.type";
import {
  GetContactResponse,
  GetContactRequest,
} from "@lib/services/contact/contact.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface ContactSliceStateType {
  getContactFetchStatus: FetchStatusEnum;
  getContactFetchError?: string;
  getContactResponse?: GetContactResponse;
}

export interface GetContactActionType extends BaseActionType {
  payload: {
    request: GetContactRequest;
  };
}

export interface GetContactSuccessActionType extends BaseActionType {
  payload: {
    response: GetContactResponse;
  };
}

export interface GetContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
