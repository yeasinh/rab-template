import { mediaService } from "@lib/services/media/media.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateMediaActionType } from "./media.type";
import { MediaType } from "@lib/services/media/media.service.type";
import { mediaActions } from "./media.slice";

function* createMediaSaga(action: CreateMediaActionType) {
  try {
    const response: Response<MediaType> = yield call(
      mediaService.createMedia,
      action.payload.request
    );
    console.log("Create media saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      mediaActions.createMediaFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      mediaActions.createMediaFetchFailure({
        error: errorMessage || "Create media failed",
      })
    );
  } finally {
  }
}

export function* createMediaWatcherSaga() {
  yield takeLatest(mediaActions.createMediaFetch.type, createMediaSaga);
}
