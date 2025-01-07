import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { menuWatcherSaga } from "./slices/menu/menu.saga";
import { getEmergencyContactWatcherSaga } from "./slices/emergencyContact/getEmergencyContact.saga";
import { getLogoAndTitleWatcherSaga } from "./slices/logoAndTitle/getLogoAndTitle.saga";
import { getSearchBarWatcherSaga } from "./slices/searchBar/getSearchBar.saga";
import { getLinkTitleWatcherSaga } from "./slices/link/linkTitle.saga";
import { getLinkItemWatcherSaga } from "./slices/link/linkItem.saga";
import { getContactWatcherSaga } from "./slices/contact/getContact.saga";
import { getActivityWatcherSaga } from "./slices/activity/getActivity.saga";
import { getMediaWatcherSaga } from "./slices/media/getMedia.saga";
import { getOpinionWatcherSaga } from "./slices/opinion/getOpinion.saga";
import { createOpinionWatcherSaga } from "./slices/opinion/createOpinion.saga";
import { deleteOpinionWatcherSaga } from "./slices/opinion/deleteOpinion.saga";
import { editOpinionWatcherSaga } from "./slices/opinion/editOpinion.saga";
import {
  searchMemberWatcherSaga,
  searchMobileAppFeatureWatcherSaga,
  searchNocWatcherSaga,
  searchObjectiveWatcherSaga,
  searchOverviewWatcherSaga,
} from "./slices/search/search.saga";
import { createQuickContactWatcherSaga } from "./slices/quickContact/createQuickContact.saga";
import { deleteQuickContactWatcherSaga } from "./slices/quickContact/deleteQuickContact.saga";
import { editQuickContactWatcherSaga } from "./slices/quickContact/editQuickContact.saga";
import { getQuickContactWatcherSaga } from "./slices/quickContact/getQuickContact.saga";
import { getBannerWatcherSaga } from "./slices/banner/getBanner.saga";

export const rootSagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    searchOverviewWatcherSaga(),
    searchObjectiveWatcherSaga(),
    searchMobileAppFeatureWatcherSaga(),
    searchMemberWatcherSaga(),
    searchNocWatcherSaga(),
    menuWatcherSaga(),
    getEmergencyContactWatcherSaga(),
    getLogoAndTitleWatcherSaga(),
    getSearchBarWatcherSaga(),
    getLinkTitleWatcherSaga(),
    getLinkItemWatcherSaga(),
    getContactWatcherSaga(),
    getActivityWatcherSaga(),
    getMediaWatcherSaga(),
    getBannerWatcherSaga(),
    getQuickContactWatcherSaga(),
    createQuickContactWatcherSaga(),
    editQuickContactWatcherSaga(),
    deleteQuickContactWatcherSaga(),
    getOpinionWatcherSaga(),
    createOpinionWatcherSaga(),
    editOpinionWatcherSaga(),
    deleteOpinionWatcherSaga(),
  ]);
}
