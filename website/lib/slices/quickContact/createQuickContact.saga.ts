import { quickContactService } from "@lib/services/quickContact/quickContact.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateQuickContactActionType } from "./quickContact.type";
import { QuickContactType } from "@lib/services/quickContact/quickContact.service.type";
import { quickContactActions } from "./quickContact.slice";

function* createQuickContactSaga(action: CreateQuickContactActionType) {
  try {
    const response: Response<QuickContactType> = yield call(
      quickContactService.createQuickContact,
      action.payload.request
    );
    console.log("Create quick contact saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      quickContactActions.createQuickContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quickContactActions.createQuickContactFetchFailure({
        error: errorMessage || "Create quick contact failed",
      })
    );
  } finally {
  }
}

export function* createQuickContactWatcherSaga() {
  yield takeLatest(
    quickContactActions.createQuickContactFetch.type,
    createQuickContactSaga
  );
}
