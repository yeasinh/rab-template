import { BaseActionType } from "@lib/action.type";
import {
  GetOpinionResponseType,
  GetOpinionRequestType,
  CreateOpinionRequestType,
  EditOpinionRequestType,
  DeleteOpinionRequestType,
  OpinionType,
} from "@lib/services/opinion/opinion.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface OpinionSliceStateType {
  getOpinionFetchStatus: FetchStatusEnum;
  getOpinionFetchError?: string;
  getOpinionResponse?: GetOpinionResponseType;
  createOpinionFetchStatus: FetchStatusEnum;
  createOpinionFetchError?: string;
  createOpinionResponse?: OpinionType;
  editOpinionFetchStatus: FetchStatusEnum;
  editOpinionFetchError?: string;
  editOpinionResponse?: OpinionType;
  deleteOpinionFetchStatus: FetchStatusEnum;
  deleteOpinionFetchError?: string;
  deleteOpinionResponse?: OpinionType;
}

export interface GetOpinionActionType extends BaseActionType {
  payload: {
    request: GetOpinionRequestType;
  };
}

export interface GetOpinionSuccessActionType extends BaseActionType {
  payload: {
    response: GetOpinionResponseType;
  };
}

export interface GetOpinionFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface CreateOpinionActionType extends BaseActionType {
  payload: {
    request: CreateOpinionRequestType;
  };
}

export interface CreateOpinionSuccessActionType extends BaseActionType {
  payload: {
    response: OpinionType;
  };
}

export interface CreateOpinionFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface EditOpinionActionType extends BaseActionType {
  payload: {
    request: EditOpinionRequestType;
  };
}

export interface EditOpinionSuccessActionType extends BaseActionType {
  payload: {
    response: OpinionType;
  };
}

export interface EditOpinionFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface DeleteOpinionActionType extends BaseActionType {
  payload: {
    request: DeleteOpinionRequestType;
  };
}

export interface DeleteOpinionSuccessActionType extends BaseActionType {
  payload: {
    response: OpinionType;
  };
}

export interface DeleteOpinionFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
