import { useEffect } from "react";

export const useTheme = (isDarkMode: boolean) => {
  useEffect(() => {
    const root = document.documentElement; // html

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // 초기 마운트 시에도 즉시 적용 (FOUC 방지)
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행
};
