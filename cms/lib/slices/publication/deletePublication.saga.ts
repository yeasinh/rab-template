import { publicationService } from "@lib/services/publication/publication.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { DeletePublicationActionType } from "./publication.type";
import { PublicationType } from "@lib/services/publication/publication.service.type";
import { publicationActions } from "./publication.slice";

function* deletePublicationSaga(action: DeletePublicationActionType) {
  try {
    const response: Response<PublicationType> = yield call(
      publicationService.deletePublication,
      action.payload.request
    );
    console.log("Delete publication saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      publicationActions.deletePublicationFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      publicationActions.deletePublicationFetchFailure({
        error: errorMessage || "Delete publication failed",
      })
    );
  } finally {
  }
}

export function* deletePublicationWatcherSaga() {
  yield takeLatest(
    publicationActions.deletePublicationFetch.type,
    deletePublicationSaga
  );
}
