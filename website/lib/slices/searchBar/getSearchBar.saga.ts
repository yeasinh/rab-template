import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { searchBarActions } from "./searchBar.slice";
import { searchBarService } from "@lib/services/searchBar/searchBar.service";
import { GetSearchBarResponse } from "@lib/services/searchBar/searchBar.service.type";
import { GetSearchBarActionType } from "./searchBar.type";

function* getSearchBarSaga(action: GetSearchBarActionType) {
  try {
    const response: Response<GetSearchBarResponse> = yield call(
      searchBarService.getSearchBar,
      action.payload.request
    );
    console.log("Get search bar saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchBarActions.getSearchBarFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchBarActions.getSearchBarFetchFailure({
        error: errorMessage || "Get search bar failed",
      })
    );
  } finally {
  }
}

export function* getSearchBarWatcherSaga() {
  yield takeLatest(searchBarActions.getSearchBarFetch.type, getSearchBarSaga);
}
