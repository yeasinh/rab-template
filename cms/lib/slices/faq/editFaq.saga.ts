import { faqService } from "@lib/services/faq/faq.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { EditFaqActionType } from "./faq.type";
import { FaqType } from "@lib/services/faq/faq.service.type";
import { faqActions } from "./faq.slice";

function* editFaqSaga(action: EditFaqActionType) {
  try {
    const response: Response<FaqType> = yield call(
      faqService.editFaq,
      action.payload.request
    );
    console.log("Edit faq saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      faqActions.editFaqFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqActions.editFaqFetchFailure({
        error: errorMessage || "Edit faq failed",
      })
    );
  } finally {
  }
}

export function* editFaqWatcherSaga() {
  yield takeLatest(faqActions.editFaqFetch.type, editFaqSaga);
}
