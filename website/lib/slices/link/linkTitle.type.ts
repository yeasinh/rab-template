import { BaseActionType } from "@lib/action.type";
import {
  GetLinkTitleResponse,
  GetLinkTitleRequest,
} from "@lib/services/link/link.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface LinkTitleSliceStateType {
  getLinkTitleFetchStatus: FetchStatusEnum;
  getLinkTitleFetchError?: string;
  getLinkTitleResponse?: GetLinkTitleResponse;
}

export interface GetLinkTitleActionType extends BaseActionType {
  payload: {
    request: GetLinkTitleRequest;
  };
}

export interface GetLinkTitleSuccessActionType extends BaseActionType {
  payload: {
    response: GetLinkTitleResponse;
  };
}

export interface GetLinkTitleFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
