import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { faqActions } from "./faq.slice";
import { GetFaqActionType } from "./faq.type";
import { faqService } from "@lib/services/faq/faq.service";
import { GetFaqResponseType } from "@lib/services/faq/faq.service.type";

function* getFaqSaga(action: GetFaqActionType) {
  try {
    const response: Response<GetFaqResponseType> = yield call(
      faqService.getFaq,
      action.payload.request
    );
    console.log("Get faq saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      faqActions.getFaqFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      faqActions.getFaqFetchFailure({
        error: errorMessage || "Get faq failed",
      })
    );
  } finally {
  }
}

export function* getFaqWatcherSaga() {
  yield takeLatest(faqActions.getFaqFetch.type, getFaqSaga);
}
