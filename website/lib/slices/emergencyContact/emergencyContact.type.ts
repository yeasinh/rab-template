import { BaseActionType } from "@lib/action.type";
import {
  GetEmergencyContactResponse,
  GetEmergencyContactRequest,
} from "@lib/services/emergencyContact/emergencyContact.service.type";
import { FetchStatusEnum } from "@services/fetch.type";

export interface EmergencyContactSliceStateType {
  getEmergencyContactFetchStatus: FetchStatusEnum;
  getEmergencyContactFetchError?: string;
  getEmergencyContactResponse?: GetEmergencyContactResponse;
}

export interface GetEmergencyContactActionType extends BaseActionType {
  payload: {
    request: GetEmergencyContactRequest;
  };
}

export interface GetEmergencyContactSuccessActionType extends BaseActionType {
  payload: {
    response: GetEmergencyContactResponse;
  };
}

export interface GetEmergencyContactFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

//export type RefreshTokenActionType = PayloadAction;
