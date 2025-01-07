import { BaseActionType } from "@lib/action.type";
import {
  MenuRequest,
  MenuResponse,
} from "@lib/services/menu/menu.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface MenuSliceStateType {
  menuFetchStatus: FetchStatusEnum;
  menuFetchError?: string;
  menuResponse?: MenuResponse;
}

export interface MenuActionType extends BaseActionType {
  payload: {
    request: MenuRequest;
  };
}

export interface MenuSuccessActionType extends BaseActionType {
  payload: {
    response: MenuResponse;
  };
}

export interface MenuFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
