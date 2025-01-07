import { quickContactService } from "@lib/services/quickContact/quickContact.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { EditQuickContactActionType } from "./quickContact.type";
import { QuickContactType } from "@lib/services/quickContact/quickContact.service.type";
import { quickContactActions } from "./quickContact.slice";

function* editQuickContactSaga(action: EditQuickContactActionType) {
  try {
    const response: Response<QuickContactType> = yield call(
      quickContactService.editQuickContact,
      action.payload.request
    );
    console.log("Edit quick contact saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      quickContactActions.editQuickContactFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      quickContactActions.editQuickContactFetchFailure({
        error: errorMessage || "Edit quick contact failed",
      })
    );
  } finally {
  }
}

export function* editQuickContactWatcherSaga() {
  yield takeLatest(
    quickContactActions.editQuickContactFetch.type,
    editQuickContactSaga
  );
}
