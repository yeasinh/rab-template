import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { publicationActions } from "./publication.slice";
import { GetPublicationActionType } from "./publication.type";
import { publicationService } from "@lib/services/publication/publication.service";
import { GetPublicationResponseType } from "@lib/services/publication/publication.service.type";

function* getPublicationSaga(action: GetPublicationActionType) {
  try {
    const response: Response<GetPublicationResponseType> = yield call(
      publicationService.getPublication,
      action.payload.request
    );
    console.log("Get publication saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      publicationActions.getPublicationFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      publicationActions.getPublicationFetchFailure({
        error: errorMessage || "Get publication failed",
      })
    );
  } finally {
  }
}

export function* getPublicationWatcherSaga() {
  yield takeLatest(
    publicationActions.getPublicationFetch.type,
    getPublicationSaga
  );
}
