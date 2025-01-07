import { BaseActionType } from "@lib/action.type";
import {
  GetActivityResponseType,
  GetActivityRequestType,
} from "@lib/services/activity/activity.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface ActivitySliceStateType {
  getActivityFetchStatus: FetchStatusEnum;
  getActivityFetchError?: string;
  getActivityResponse?: GetActivityResponseType;
}

export interface GetActivityActionType extends BaseActionType {
  payload: {
    request: GetActivityRequestType;
  };
}

export interface GetActivitySuccessActionType extends BaseActionType {
  payload: {
    response: GetActivityResponseType;
  };
}

export interface GetActivityFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
