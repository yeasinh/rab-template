import { publicationService } from "@lib/services/publication/publication.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreatePublicationActionType } from "./publication.type";
import { PublicationType } from "@lib/services/publication/publication.service.type";
import { publicationActions } from "./publication.slice";

function* createPublicationSaga(action: CreatePublicationActionType) {
  try {
    const response: Response<PublicationType> = yield call(
      publicationService.createPublication,
      action.payload.request
    );
    console.log("Create publication saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      publicationActions.createPublicationFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      publicationActions.createPublicationFetchFailure({
        error: errorMessage || "Create publication failed",
      })
    );
  } finally {
  }
}

export function* createPublicationWatcherSaga() {
  yield takeLatest(
    publicationActions.createPublicationFetch.type,
    createPublicationSaga
  );
}
