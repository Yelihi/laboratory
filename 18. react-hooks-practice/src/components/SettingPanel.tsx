import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeButton = () => {
  // Context에서 isDarkMode와 toggleTheme를 직접 destructure
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className='w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg font-medium text-gray-900 dark:text-white hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-95'
    >
      <span className='text-lg'>{isDarkMode ? "☀️" : "🌙"}</span>
      <span>{isDarkMode ? "라이트 모드" : "다크 모드"}</span>
    </button>
  );
};

export const SettingPanel = () => {
  return (
    <section className='space-y-4'>
      <ThemeButton />
      <div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
        <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
          테마를 변경하여 사용자 경험을 개선하세요
        </p>
      </div>
    </section>
  );
};
