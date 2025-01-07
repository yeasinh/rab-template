import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { GetActivityActionType } from "./activity.type";
import { activityActions } from "./activity.slice";
import { activityService } from "@lib/services/activity/activity.service";
import { GetActivityResponseType } from "@lib/services/activity/activity.service.type";

function* getActivitySaga(action: GetActivityActionType) {
  try {
    const response: Response<GetActivityResponseType> = yield call(
      activityService.getActivity,
      action.payload.request
    );
    console.log("Get activity saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      activityActions.getActivityFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      activityActions.getActivityFetchFailure({
        error: errorMessage || "Get activity failed",
      })
    );
  } finally {
  }
}

export function* getActivityWatcherSaga() {
  yield takeLatest(activityActions.getActivityFetch.type, getActivitySaga);
}
