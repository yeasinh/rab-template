import { BaseActionType } from "@lib/action.type";
import {
  GetSearchBarResponse,
  GetSearchBarRequest,
} from "@lib/services/searchBar/searchBar.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface SearchBarSliceStateType {
  getSearchBarFetchStatus: FetchStatusEnum;
  getSearchBarFetchError?: string;
  getSearchBarResponse?: GetSearchBarResponse;
}

export interface GetSearchBarActionType extends BaseActionType {
  payload: {
    request: GetSearchBarRequest;
  };
}

export interface GetSearchBarSuccessActionType extends BaseActionType {
  payload: {
    response: GetSearchBarResponse;
  };
}

export interface GetSearchBarFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
