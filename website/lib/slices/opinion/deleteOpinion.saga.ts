import { opinionService } from "@lib/services/opinion/opinion.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { DeleteOpinionActionType } from "./opinion.type";
import { OpinionType } from "@lib/services/opinion/opinion.service.type";
import { opinionActions } from "./opinion.slice";

function* deleteOpinionSaga(action: DeleteOpinionActionType) {
  try {
    const response: Response<OpinionType> = yield call(
      opinionService.deleteOpinion,
      action.payload.request
    );
    console.log("Delete opinion saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      opinionActions.deleteOpinionFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      opinionActions.deleteOpinionFetchFailure({
        error: errorMessage || "Delete opinion failed",
      })
    );
  } finally {
  }
}

export function* deleteOpinionWatcherSaga() {
  yield takeLatest(opinionActions.deleteOpinionFetch.type, deleteOpinionSaga);
}
