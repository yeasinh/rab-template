import { opinionService } from "@lib/services/opinion/opinion.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { EditOpinionActionType } from "./opinion.type";
import { OpinionType } from "@lib/services/opinion/opinion.service.type";
import { opinionActions } from "./opinion.slice";

function* editOpinionSaga(action: EditOpinionActionType) {
  try {
    const response: Response<OpinionType> = yield call(
      opinionService.editOpinion,
      action.payload.request
    );
    console.log("Edit opinion saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      opinionActions.editOpinionFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      opinionActions.editOpinionFetchFailure({
        error: errorMessage || "Edit opinion failed",
      })
    );
  } finally {
  }
}

export function* editOpinionWatcherSaga() {
  yield takeLatest(opinionActions.editOpinionFetch.type, editOpinionSaga);
}
