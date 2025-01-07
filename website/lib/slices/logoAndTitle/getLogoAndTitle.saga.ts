import { Response } from "@services/type";
import { GetLogoAndTitleResponse } from "@lib/services/logoAndTitle/logoAndTitle.service.type";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoAndTitleActions } from "./logoAndTitle.slice";
import { GetLogoAndTitleActionType } from "./logoAndTitle.type";
import { logoAndTitleService } from "@lib/services/logoAndTitle/logoAndTitle.service";

function* getLogoAndTitleSaga(action: GetLogoAndTitleActionType) {
  try {
    const response: Response<GetLogoAndTitleResponse> = yield call(
      logoAndTitleService.getLogoAndTitle,
      action.payload.request
    );
    console.log("Get logo and title saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      logoAndTitleActions.getLogoAndTitleFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      logoAndTitleActions.getLogoAndTitleFetchFailure({
        error: errorMessage || "Get logo and title failed",
      })
    );
  } finally {
  }
}

export function* getLogoAndTitleWatcherSaga() {
  yield takeLatest(
    logoAndTitleActions.getLogoAndTitleFetch.type,
    getLogoAndTitleSaga
  );
}
