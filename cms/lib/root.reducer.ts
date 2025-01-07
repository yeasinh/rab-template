import { combineReducers } from "@reduxjs/toolkit";
import { faqReducer } from "./slices/faq/faq.slice";
import { changePasswordReducer } from "./slices/auth/login/changePassword.slice";
import { forgotPasswordReducer } from "./slices/auth/login/forgotPassword.slice";
import { loginReducer } from "./slices/auth/login/login.slice";
import { publicationReducer } from "./slices/publication/publication.slice";
import { sidebarReducer } from "./slices/sidebar/sidebar.slice";
import { mediaReducer } from "./slices/media/media.slice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  changePassword: changePasswordReducer,
  media: mediaReducer,
  publication: publicationReducer,
  faq: faqReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
