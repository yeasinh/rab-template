import { publicationService } from "@lib/services/publication/publication.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { EditPublicationActionType } from "./publication.type";
import { PublicationType } from "@lib/services/publication/publication.service.type";
import { publicationActions } from "./publication.slice";

function* editPublicationSaga(action: EditPublicationActionType) {
  try {
    const response: Response<PublicationType> = yield call(
      publicationService.editPublication,
      action.payload.request
    );
    console.log("Edit publication saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      publicationActions.editPublicationFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      publicationActions.editPublicationFetchFailure({
        error: errorMessage || "Edit publication failed",
      })
    );
  } finally {
  }
}

export function* editPublicationWatcherSaga() {
  yield takeLatest(
    publicationActions.editPublicationFetch.type,
    editPublicationSaga
  );
}
