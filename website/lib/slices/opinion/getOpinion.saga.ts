import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { opinionActions } from "./opinion.slice";
import { GetOpinionActionType } from "./opinion.type";
import { opinionService } from "@lib/services/opinion/opinion.service";
import { GetOpinionResponseType } from "@lib/services/opinion/opinion.service.type";

function* getOpinionSaga(action: GetOpinionActionType) {
  try {
    const response: Response<GetOpinionResponseType> = yield call(
      opinionService.getOpinion,
      action.payload.request
    );
    console.log("Get opinion saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      opinionActions.getOpinionFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      opinionActions.getOpinionFetchFailure({
        error: errorMessage || "Get opinion failed",
      })
    );
  } finally {
  }
}

export function* getOpinionWatcherSaga() {
  yield takeLatest(opinionActions.getOpinionFetch.type, getOpinionSaga);
}
