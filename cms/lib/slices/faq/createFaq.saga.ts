import { faqService } from "@lib/services/faq/faq.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateFaqActionType } from "./faq.type";
import { FaqType } from "@lib/services/faq/faq.service.type";
import { faqActions } from "./faq.slice";

function* createFaqSaga(action: CreateFaqActionType) {
  try {
    const response: Response<FaqType> = yield call(
      faqService.createFaq,
      action.payload.request
    );
    console.log("Create faq saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      faqActions.createFaqFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqActions.createFaqFetchFailure({
        error: errorMessage || "Create faq failed",
      })
    );
  } finally {
  }
}

export function* createFaqWatcherSaga() {
  yield takeLatest(faqActions.createFaqFetch.type, createFaqSaga);
}
