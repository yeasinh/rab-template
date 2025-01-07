import { BaseActionType } from "@lib/action.type";
import {
  GetLinkItemResponse,
  GetLinkItemRequest,
} from "@lib/services/link/link.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface LinkItemSliceStateType {
  getLinkItemFetchStatus: FetchStatusEnum;
  getLinkItemFetchError?: string;
  getLinkItemResponse?: GetLinkItemResponse;
}

export interface GetLinkItemActionType extends BaseActionType {
  payload: {
    request: GetLinkItemRequest;
  };
}

export interface GetLinkItemSuccessActionType extends BaseActionType {
  payload: {
    response: GetLinkItemResponse;
  };
}

export interface GetLinkItemFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
