import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { linkTitleActions } from "./linkTitle.slice";
import { GetLinkTitleActionType } from "./linkTitle.type";
import { linkService } from "@lib/services/link/link.service";
import {
  GetLinkTitleResponse,
  LinkTitle,
} from "@lib/services/link/link.service.type";

function* getLinkTitleSaga(action: GetLinkTitleActionType) {
  try {
    const response: Response<GetLinkTitleResponse> = yield call(
      linkService.getLinkTitle,
      action.payload.request
    );
    console.log("Get link title saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      linkTitleActions.getLinkTitleFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      linkTitleActions.getLinkTitleFetchFailure({
        error: errorMessage || "Get link title failed",
      })
    );
  } finally {
  }
}

export function* getLinkTitleWatcherSaga() {
  yield takeLatest(linkTitleActions.getLinkTitleFetch.type, getLinkTitleSaga);
}
