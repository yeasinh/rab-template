import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { quickContactActions } from "./quickContact.slice";
import { GetQuickContactActionType } from "./quickContact.type";
import { quickContactService } from "@lib/services/quickContact/quickContact.service";
import { GetQuickContactResponseType } from "@lib/services/quickContact/quickContact.service.type";

function* getQuickContactSaga(action: GetQuickContactActionType) {
  try {
    const response: Response<GetQuickContactResponseType> = yield call(
      quickContactService.getQuickContact,
      action.payload.request
    );
    console.log("Get quick contact saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      quickContactActions.getQuickContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quickContactActions.getQuickContactFetchFailure({
        error: errorMessage || "Get quick contact failed",
      })
    );
  } finally {
  }
}

export function* getQuickContactWatcherSaga() {
  yield takeLatest(
    quickContactActions.getQuickContactFetch.type,
    getQuickContactSaga
  );
}
