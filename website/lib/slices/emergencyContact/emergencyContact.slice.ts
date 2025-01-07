import { createSlice } from "@reduxjs/toolkit";
import { FetchStatusEnum } from "@services/fetch.type";
import {
  EmergencyContactSliceStateType,
  GetEmergencyContactActionType,
  GetEmergencyContactSuccessActionType,
  GetEmergencyContactFailureActionType,
} from "./emergencyContact.type";

const initState: EmergencyContactSliceStateType = {
  getEmergencyContactFetchStatus: FetchStatusEnum.IDLE,
  getEmergencyContactFetchError: undefined,
  getEmergencyContactResponse: undefined,
};

const emergencyContactSlice = createSlice({
  name: "emergencyContact",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getEmergencyContactFetch: (
      state,
      _action: GetEmergencyContactActionType
    ) => {
      state.getEmergencyContactFetchStatus = FetchStatusEnum.FETCHING;
      state.getEmergencyContactFetchError = "";
    },
    getEmergencyContactFetchSuccess: (
      state,
      action: GetEmergencyContactSuccessActionType
    ) => {
      state.getEmergencyContactFetchStatus = FetchStatusEnum.SUCCESS;
      state.getEmergencyContactResponse = action.payload.response;
    },
    getEmergencyContactFetchFailure: (
      state,
      action: GetEmergencyContactFailureActionType
    ) => {
      state.getEmergencyContactFetchStatus = FetchStatusEnum.FAILURE;
      state.getEmergencyContactFetchError = action.payload.error;
    },

    resetEmergencyContact: () => {
      return initState;
    },
  },
});

export const emergencyContactActions = emergencyContactSlice.actions;
export const emergencyContactReducer = emergencyContactSlice.reducer;
