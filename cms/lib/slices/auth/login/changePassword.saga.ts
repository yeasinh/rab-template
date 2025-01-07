import { authService } from "@services/auth/auth.service";
import { ChangePasswordResponse } from "@services/auth/auth.service.type";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { changePasswordActions } from "./changePassword.slice";
import { ChangePasswordActionType } from "./changePassword.types";

function* changePasswordSaga(action: ChangePasswordActionType) {
  try {
    const response: Response<ChangePasswordResponse> = yield call(
      authService.changePassword,
      action.payload.request
    );
    console.log("Change password saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      changePasswordActions.changePasswordSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      changePasswordActions.changePasswordFailure({
        error: errorMessage || "Change password failed",
      })
    );
  } finally {
  }
}

export function* changePasswordWatcherSaga() {
  yield takeLatest(
    changePasswordActions.changePassword.type,
    changePasswordSaga
  );
}
