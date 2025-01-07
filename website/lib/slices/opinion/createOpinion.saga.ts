import { opinionService } from "@lib/services/opinion/opinion.service";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateOpinionActionType } from "./opinion.type";
import { OpinionType } from "@lib/services/opinion/opinion.service.type";
import { opinionActions } from "./opinion.slice";

function* createOpinionSaga(action: CreateOpinionActionType) {
  try {
    const response: Response<OpinionType> = yield call(
      opinionService.createOpinion,
      action.payload.request
    );
    console.log("Create opinion saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      opinionActions.createOpinionFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      opinionActions.createOpinionFetchFailure({
        error: errorMessage || "Create opinion failed",
      })
    );
  } finally {
  }
}

export function* createOpinionWatcherSaga() {
  yield takeLatest(opinionActions.createOpinionFetch.type, createOpinionSaga);
}
