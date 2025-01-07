import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetBannerActionType } from "./banner.type";
import { bannerActions } from "./banner.slice";
import { bannerService } from "@lib/services/banner/banner.service";
import { GetBannerResponseType } from "@lib/services/banner/banner.service.type";

function* getBannerSaga(action: GetBannerActionType) {
  try {
    const response: Response<GetBannerResponseType> = yield call(
      bannerService.getBanner,
      action.payload.request
    );
    console.log("Get banner saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      bannerActions.getBannerFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      bannerActions.getBannerFetchFailure({
        error: errorMessage || "Get banner failed",
      })
    );
  } finally {
  }
}

export function* getBannerWatcherSaga() {
  yield takeLatest(bannerActions.getBannerFetch.type, getBannerSaga);
}
