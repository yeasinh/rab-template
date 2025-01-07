import type { RootState } from "@lib/root.reducer";

export const changePasswordSelector = {
  changePasswordFetchStatus: (state: RootState) =>
    state.changePassword?.changePasswordFetchStatus,
  changePasswordError: (state: RootState) =>
    state.changePassword?.changePasswordError,
  changePasswordResponse: (state: RootState) =>
    state.changePassword?.changePasswordResponse,
};
