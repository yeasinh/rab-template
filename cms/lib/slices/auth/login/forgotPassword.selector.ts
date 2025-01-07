import type { RootState } from "@lib/root.reducer";

export const forgotPasswordSelector = {
  forgotPasswordFetchStatus: (state: RootState) =>
    state.forgotPassword?.forgotPasswordFetchStatus,
  forgotPasswordError: (state: RootState) =>
    state.forgotPassword?.forgotPasswordError,
  forgotPasswordResponse: (state: RootState) =>
    state.forgotPassword?.forgotPasswordResponse,
};
