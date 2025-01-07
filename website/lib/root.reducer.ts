import { combineReducers } from "@reduxjs/toolkit";
import { menuReducer } from "./slices/menu/menu.slice";
import { emergencyContactReducer } from "./slices/emergencyContact/emergencyContact.slice";
import { logoAndTitleReducer } from "./slices/logoAndTitle/logoAndTitle.slice";
import { searchBarReducer } from "./slices/searchBar/searchBar.slice";
import { linkItemReducer } from "./slices/link/linkItem.slice";
import { contactReducer } from "./slices/contact/contact.slice";
import { activityReducer } from "./slices/activity/activity.slice";
import { mediaReducer } from "./slices/media/media.slice";
import { opinionReducer } from "./slices/opinion/opinion.slice";
import { searchReducer } from "./slices/search/search.slice";
import { bannerReducer } from "./slices/banner/banner.slice";
import { linkTitleReducer } from "./slices/link/linkTitle.slice";
import { languageReducer } from "./slices/language/language.slice";
import { quickContactReducer } from "./slices/quickContact/quickContact.slice";

const rootReducer = combineReducers({
  language: languageReducer,
  search: searchReducer,
  menu: menuReducer,
  emergencyContact: emergencyContactReducer,
  logoAndTitle: logoAndTitleReducer,
  searchBar: searchBarReducer,
  linkTitle: linkTitleReducer,
  linkItem: linkItemReducer,
  contact: contactReducer,
  activity: activityReducer,
  media: mediaReducer,
  banner: bannerReducer,
  opinion: opinionReducer,
  quickContact: quickContactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
