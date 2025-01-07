import { Response } from "@services/type";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { MenuActionType } from "@lib/slices/menu/menu.type";
import { MenuResponse } from "@lib/services/menu/menu.service.type";
import { menuService } from "@lib/services/menu/menu.service";
import { menuActions } from "@lib/slices/menu/menu.slice";

function* menuSaga(action: MenuActionType) {
  try {
    const response: Response<MenuResponse> = yield call(
      menuService.menu,
      action.payload.request
    );
    console.log("Menu saga response", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      menuActions.menuFetchSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    //console.log("errorMessage",errorMessage)
    yield put(
      menuActions.menuFetchFailure({
        error: errorMessage || "Menu fetch failed",
      })
    );
  } finally {
  }
}

export function* menuWatcherSaga() {
  yield takeLatest(menuActions.menu.type, menuSaga);
}
