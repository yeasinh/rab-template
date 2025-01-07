import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { mediaActions } from "./media.slice";
import { GetMediaActionType } from "./media.type";
import { mediaService } from "@lib/services/media/media.service";
import { GetMediaResponseType } from "@lib/services/media/media.service.type";

function* getMediaSaga(action: GetMediaActionType) {
  try {
    const response: Response<GetMediaResponseType> = yield call(
      mediaService.getMedia,
      action.payload.request
    );
    console.log("Get media saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      mediaActions.getMediaFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      mediaActions.getMediaFetchFailure({
        error: errorMessage || "Get media failed",
      })
    );
  } finally {
  }
}

export function* getMediaWatcherSaga() {
  yield takeLatest(mediaActions.getMediaFetch.type, getMediaSaga);
}
