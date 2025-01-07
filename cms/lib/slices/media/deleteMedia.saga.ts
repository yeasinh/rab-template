import { mediaService } from "@lib/services/media/media.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { DeleteMediaActionType } from "./media.type";
import { MediaType } from "@lib/services/media/media.service.type";
import { mediaActions } from "./media.slice";

function* deleteMediaSaga(action: DeleteMediaActionType) {
  try {
    const response: Response<MediaType> = yield call(
      mediaService.deleteMedia,
      action.payload.request
    );
    console.log("Delete media saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      mediaActions.deleteMediaFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      mediaActions.deleteMediaFetchFailure({
        error: errorMessage || "Delete media failed",
      })
    );
  } finally {
  }
}

export function* deleteMediaWatcherSaga() {
  yield takeLatest(mediaActions.deleteMediaFetch.type, deleteMediaSaga);
}
