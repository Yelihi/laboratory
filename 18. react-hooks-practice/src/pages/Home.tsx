import { useState } from "react";
import { Default } from "../layout/Default";
import { MainSection } from "../components/MainSection";
import { ContentCard } from "../components/ContentCard";

import { LanguageContext } from "../contexts/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";

import { useTheme } from "../hooks/useTheme";

export const Home = () => {
  // useState로 isDarkMode 상태 관리
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  // toggleTheme 함수: 현재 상태를 반전시킴
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useTheme(isDarkMode);

  // Context value에 상태와 상태 변경 함수 전달
  const themeValue = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <LanguageContext.Provider value={{ language: "en" }}>
      <ThemeContext.Provider value={themeValue}>
        <Default>
          <MainSection>
            <ContentCard />
          </MainSection>
        </Default>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};
