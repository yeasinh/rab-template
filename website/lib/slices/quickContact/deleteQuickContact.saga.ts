import { quickContactService } from "@lib/services/quickContact/quickContact.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { DeleteQuickContactActionType } from "./quickContact.type";
import { QuickContactType } from "@lib/services/quickContact/quickContact.service.type";
import { quickContactActions } from "./quickContact.slice";

function* deleteQuickContactSaga(action: DeleteQuickContactActionType) {
  try {
    const response: Response<QuickContactType> = yield call(
      quickContactService.deleteQuickContact,
      action.payload.request
    );
    console.log("Delete quick contact saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      quickContactActions.deleteQuickContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quickContactActions.deleteQuickContactFetchFailure({
        error: errorMessage || "Delete quick contact failed",
      })
    );
  } finally {
  }
}

export function* deleteQuickContactWatcherSaga() {
  yield takeLatest(
    quickContactActions.deleteQuickContactFetch.type,
    deleteQuickContactSaga
  );
}
