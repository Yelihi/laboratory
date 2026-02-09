import { useContext } from "react";

// 이게 최선일지..
import { LanguageContext } from "../contexts/LanguageContext";

export const ContentCard = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className='rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
          {language === "ko" ? "뉴스 읽기." : "Read News."}
        </h2>
      </div>
    </div>
  );
};
