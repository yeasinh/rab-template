"use client";

import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { languageActions } from "@lib/slices/language/language.slice";
import { useDispatch, useSelector } from "react-redux";

const LanguageToggleButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const handleClick = () => {
    dispatch(languageActions.toggleLanguage());
  };

  return (
    <button
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
      }}
      onClick={handleClick}
    >
      {isEnglish ? "বাংলা" : "English"}
    </button>
  );
};

export default LanguageToggleButton;
