import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createFaqWatcherSaga } from "./slices/faq/createFaq.saga";
import { deleteFaqWatcherSaga } from "./slices/faq/deleteFaq.saga";
import { editFaqWatcherSaga } from "./slices/faq/editFaq.saga";
import { getFaqWatcherSaga } from "./slices/faq/getFaq.saga";
import { createPublicationWatcherSaga } from "./slices/publication/createPublication.saga";
import { deletePublicationWatcherSaga } from "./slices/publication/deletePublication.saga";
import { editPublicationWatcherSaga } from "./slices/publication/editPublication.saga";
import { getPublicationWatcherSaga } from "./slices/publication/getPublication.saga";
import { changePasswordWatcherSaga } from "./slices/auth/login/changePassword.saga";
import { forgotPasswordWatcherSaga } from "./slices/auth/login/forgotPassword.saga";
import { loginWatcherSaga } from "./slices/auth/login/login.saga";
import { logoutWatcherSaga } from "./slices/auth/login/logout.saga";
import { createMediaWatcherSaga } from "./slices/media/createMedia.saga";
import { deleteMediaWatcherSaga } from "./slices/media/deleteMedia.saga";
import { editMediaWatcherSaga } from "./slices/media/editMedia.saga";
import { getMediaWatcherSaga } from "./slices/media/getMedia.saga";

export const rootSagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    logoutWatcherSaga(),

    forgotPasswordWatcherSaga(),
    changePasswordWatcherSaga(),

    getMediaWatcherSaga(),
    createMediaWatcherSaga(),
    editMediaWatcherSaga(),
    deleteMediaWatcherSaga(),

    getPublicationWatcherSaga(),
    createPublicationWatcherSaga(),
    editPublicationWatcherSaga(),
    deletePublicationWatcherSaga(),

    getFaqWatcherSaga(),
    createFaqWatcherSaga(),
    editFaqWatcherSaga(),
    deleteFaqWatcherSaga(),
  ]);
}
