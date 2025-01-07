import { mediaService } from "@lib/services/media/media.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { EditMediaActionType } from "./media.type";
import { MediaType } from "@lib/services/media/media.service.type";
import { mediaActions } from "./media.slice";

function* editMediaSaga(action: EditMediaActionType) {
  try {
    const response: Response<MediaType> = yield call(
      mediaService.editMedia,
      action.payload.request
    );
    console.log("Edit media saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      mediaActions.editMediaFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      mediaActions.editMediaFetchFailure({
        error: errorMessage || "Edit media failed",
      })
    );
  } finally {
  }
}

export function* editMediaWatcherSaga() {
  yield takeLatest(mediaActions.editMediaFetch.type, editMediaSaga);
}
