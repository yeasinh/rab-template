import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { contactActions } from "./contact.slice";
import { GetContactActionType } from "./contact.type";
import { contactService } from "@lib/services/contact/contact.service";
import { GetContactResponse } from "@lib/services/contact/contact.service.type";

function* getContactSaga(action: GetContactActionType) {
  try {
    const response: Response<GetContactResponse> = yield call(
      contactService.getContact,
      action.payload.request
    );
    console.log("Get contact saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      contactActions.getContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      contactActions.getContactFetchFailure({
        error: errorMessage || "Get contact failed",
      })
    );
  } finally {
  }
}

export function* getContactWatcherSaga() {
  yield takeLatest(contactActions.getContactFetch.type, getContactSaga);
}
