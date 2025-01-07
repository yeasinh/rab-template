import { BaseActionType } from "@lib/action.type";
import {
  GetPublicationResponseType,
  GetPublicationRequestType,
  CreatePublicationRequestType,
  EditPublicationRequestType,
  DeletePublicationRequestType,
  PublicationType,
} from "@lib/services/publication/publication.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface PublicationSliceStateType {
  getPublicationFetchStatus: FetchStatusEnum;
  getPublicationFetchError?: string;
  getPublicationResponse?: GetPublicationResponseType;
  createPublicationFetchStatus: FetchStatusEnum;
  createPublicationFetchError?: string;
  createPublicationResponse?: PublicationType;
  editPublicationFetchStatus: FetchStatusEnum;
  editPublicationFetchError?: string;
  editPublicationResponse?: PublicationType;
  deletePublicationFetchStatus: FetchStatusEnum;
  deletePublicationFetchError?: string;
  deletePublicationResponse?: PublicationType;
}

export interface GetPublicationActionType extends BaseActionType {
  payload: {
    request: GetPublicationRequestType;
  };
}

export interface GetPublicationSuccessActionType extends BaseActionType {
  payload: {
    response: GetPublicationResponseType;
  };
}

export interface GetPublicationFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface CreatePublicationActionType extends BaseActionType {
  payload: {
    request: CreatePublicationRequestType;
  };
}

export interface CreatePublicationSuccessActionType extends BaseActionType {
  payload: {
    response: PublicationType;
  };
}

export interface CreatePublicationFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface EditPublicationActionType extends BaseActionType {
  payload: {
    request: EditPublicationRequestType;
  };
}

export interface EditPublicationSuccessActionType extends BaseActionType {
  payload: {
    response: PublicationType;
  };
}

export interface EditPublicationFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export interface DeletePublicationActionType extends BaseActionType {
  payload: {
    request: DeletePublicationRequestType;
  };
}

export interface DeletePublicationSuccessActionType extends BaseActionType {
  payload: {
    response: PublicationType;
  };
}

export interface DeletePublicationFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
