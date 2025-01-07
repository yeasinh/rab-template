import type { RootState } from "@lib/root.reducer";

export const loginSelector = {
  loginFetchStatus: (state: RootState) => state.login?.loginFetchStatus,
  loginError: (state: RootState) => state.login?.loginError,
  loginResponse: (state: RootState) => state.login?.loginResponse,
  isLogIn: (state: RootState) => state.login?.isLogin,
  user: (state: RootState) => state.login?.user,
};
