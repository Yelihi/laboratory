import { createContext } from "react";

interface LanguageContextValue {
  language: string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: "ko",
});
