import { authService } from "@services/auth/auth.service";
import { LoginResponse } from "@services/auth/auth.service.type";
import { Response } from "@services/type";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { loginActions } from "./login.slice";
import { LoginActionType } from "./login.types";
import { setToken } from "@lib/utils/action";
// import { RootState } from "@lib/root.reducer";
// import { FetchStatusEnum } from '@lib/services/fetch.type';
// import { redirect } from 'next/navigation';

function* loginSaga(action: LoginActionType) {
  try {
    // const loginFetchStatus = yield select(
    //   (state: RootState) => state.login.loginFetchStatus
    // );
    const response: Response<LoginResponse> = yield call(
      authService.login,
      action.payload.request
    );
    console.log("Login saga response:", response);
    if (response?.data == null || response?.data?.login?.token == null) {
      const { message, error } = response?.errors[0]?.extensions?.originalError;
      throw new Error(message);
    }
    setToken(
      response?.data?.login?.token,
      response?.data?.login?.menus,
      response?.data?.login?.userType,
      response?.data?.login?.id
    );
    yield put(
      loginActions.loginSuccess({
        response: response?.data,
      })
    );
    // if(loginFetchStatus === FetchStatusEnum.SUCCESS){
    // yield redirect('/pages/dashboard');
    // }
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      loginActions.loginFailure({ error: errorMessage || "Login failed" })
    );
  } finally {
  }
}

export function* loginWatcherSaga() {
  yield takeLatest(loginActions.login.type, loginSaga);
}
