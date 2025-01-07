import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { SearchActionType } from "./search.type";
import {
  SearchMemberResult,
  SearchMobileAppFeatureResult,
  SearchNocResult,
  SearchObjectiveResult,
  SearchOverviewResult,
} from "@lib/services/search/search.service.type";
import { searchService } from "@lib/services/search/search.service";
import { searchActions } from "./search.slice";

function* searchOverviewSaga(action: SearchActionType) {
  try {
    const response: Response<SearchOverviewResult> = yield call(
      searchService.searchOverview,
      action.payload.request
    );
    console.log("Search saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchActions.searchOverviewFetchSuccess({
        response: response?.data,
        path: "/pages/about",
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchActions.searchFetchFailure({
        error: errorMessage || "Search failed",
      })
    );
  } finally {
  }
}

function* searchObjectiveSaga(action: SearchActionType) {
  try {
    const response: Response<SearchObjectiveResult> = yield call(
      searchService.searchObjective,
      action.payload.request
    );
    console.log("Search saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchActions.searchObjectiveFetchSuccess({
        response: response?.data,
        path: "/pages/about",
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchActions.searchFetchFailure({
        error: errorMessage || "Search failed",
      })
    );
  } finally {
  }
}

function* searchMobileAppFeatureSaga(action: SearchActionType) {
  try {
    const response: Response<SearchMobileAppFeatureResult> = yield call(
      searchService.searchMobileAppFeature,
      action.payload.request
    );
    console.log("Search saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchActions.searchMobileAppFeatureFetchSuccess({
        response: response?.data,
        path: "/pages/home",
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchActions.searchFetchFailure({
        error: errorMessage || "Search failed",
      })
    );
  } finally {
  }
}

function* searchMemberSaga(action: SearchActionType) {
  try {
    const response: Response<SearchMemberResult> = yield call(
      searchService.searchMember,
      action.payload.request
    );
    console.log("Search saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchActions.searchMemberFetchSuccess({
        response: response?.data,
        path: "/pages/about",
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchActions.searchFetchFailure({
        error: errorMessage || "Search failed",
      })
    );
  } finally {
  }
}

function* searchNocSaga(action: SearchActionType) {
  try {
    const response: Response<SearchNocResult> = yield call(
      searchService.searchNoc,
      action.payload.request
    );
    console.log("Search saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      searchActions.searchNocFetchSuccess({
        response: response?.data,
        path: "/pages/noc",
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      searchActions.searchFetchFailure({
        error: errorMessage || "Search failed",
      })
    );
  } finally {
  }
}

export function* searchOverviewWatcherSaga() {
  yield takeLatest(searchActions.searchFetch.type, searchOverviewSaga);
}

export function* searchObjectiveWatcherSaga() {
  yield takeLatest(searchActions.searchFetch.type, searchObjectiveSaga);
}

export function* searchMobileAppFeatureWatcherSaga() {
  yield takeLatest(searchActions.searchFetch.type, searchMobileAppFeatureSaga);
}

export function* searchMemberWatcherSaga() {
  yield takeLatest(searchActions.searchFetch.type, searchMemberSaga);
}

export function* searchNocWatcherSaga() {
  yield takeLatest(searchActions.searchFetch.type, searchNocSaga);
}
