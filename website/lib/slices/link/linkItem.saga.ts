import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { linkItemActions } from "./linkItem.slice";
import { GetLinkItemActionType } from "./linkItem.type";
import { linkService } from "@lib/services/link/link.service";
import {
  GetLinkItemResponse,
  LinkItem,
} from "@lib/services/link/link.service.type";

function* getLinkItemSaga(action: GetLinkItemActionType) {
  try {
    const response: Response<GetLinkItemResponse> = yield call(
      linkService.getLinkItem,
      action.payload.request
    );
    console.log("Get link item saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      linkItemActions.getLinkItemFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      linkItemActions.getLinkItemFetchFailure({
        error: errorMessage || "Get link item failed",
      })
    );
  } finally {
  }
}

export function* getLinkItemWatcherSaga() {
  yield takeLatest(linkItemActions.getLinkItemFetch.type, getLinkItemSaga);
}
