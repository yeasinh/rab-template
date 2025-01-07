import { faqService } from "@lib/services/faq/faq.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { DeleteFaqActionType } from "./faq.type";
import { FaqType } from "@lib/services/faq/faq.service.type";
import { faqActions } from "./faq.slice";

function* deleteFaqSaga(action: DeleteFaqActionType) {
  try {
    const response: Response<FaqType> = yield call(
      faqService.deleteFaq,
      action.payload.request
    );
    console.log("Delete faq saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      faqActions.deleteFaqFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqActions.deleteFaqFetchFailure({
        error: errorMessage || "Delete faq failed",
      })
    );
  } finally {
  }
}

export function* deleteFaqWatcherSaga() {
  yield takeLatest(faqActions.deleteFaqFetch.type, deleteFaqSaga);
}
