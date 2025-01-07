import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  isEnglish: boolean;
}

const initialState: LanguageState = {
  isEnglish: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.isEnglish = !state.isEnglish;
    },
    setLanguage: (state, action: PayloadAction<boolean>) => {
      state.isEnglish = action.payload;
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
