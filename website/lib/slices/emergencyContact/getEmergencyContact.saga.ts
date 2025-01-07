import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { emergencyContactActions } from "./emergencyContact.slice";
import { emergencyContactService } from "@lib/services/emergencyContact/emergencyContact.service";
import { GetEmergencyContactResponse } from "@lib/services/emergencyContact/emergencyContact.service.type";
import { GetEmergencyContactActionType } from "./emergencyContact.type";

function* getEmergencyContactSaga(action: GetEmergencyContactActionType) {
  try {
    const response: Response<GetEmergencyContactResponse> = yield call(
      emergencyContactService.getEmergencyContact,
      action.payload.request
    );
    console.log("Get Lemergency contacts saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      emergencyContactActions.getEmergencyContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      emergencyContactActions.getEmergencyContactFetchFailure({
        error: errorMessage || "Get emergency contacts failed",
      })
    );
  } finally {
  }
}

export function* getEmergencyContactWatcherSaga() {
  yield takeLatest(
    emergencyContactActions.getEmergencyContactFetch.type,
    getEmergencyContactSaga
  );
}
