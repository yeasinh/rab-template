import { authService } from "@services/auth/auth.service";
import { ForgotPasswordResponse } from "@services/auth/auth.service.type";
import { Response } from "@services/type";
import { call, put, takeLatest } from "redux-saga/effects";
import { forgotPasswordActions } from "./forgotPassword.slice";
import { ForgotPasswordActionType } from "./forgotPassword.types";

function* forgotPasswordSaga(action: ForgotPasswordActionType) {
  try {
    const response: Response<ForgotPasswordResponse> = yield call(
      authService.forgotPassword,
      action.payload.request
    );
    console.log("Forgot password saga response:", response);
    if (response?.data == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    yield put(
      forgotPasswordActions.forgotPasswordSuccess({
        response: response?.data,
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      forgotPasswordActions.forgotPasswordFailure({
        error: errorMessage || "Forgot password failed",
      })
    );
  } finally {
  }
}

export function* forgotPasswordWatcherSaga() {
  yield takeLatest(
    forgotPasswordActions.forgotPassword.type,
    forgotPasswordSaga
  );
}
