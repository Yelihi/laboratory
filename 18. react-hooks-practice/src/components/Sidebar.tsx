import { Link, useLocation } from "react-router-dom";
import { SettingPanel } from "./SettingPanel";

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className='lg:col-span-1'>
      <div className='sticky top-24 space-y-6'>
        {/* 정보 카드 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
            <span className='text-xl'>ℹ️</span>
            정보
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
            React Hooks를 학습하기 위한 실습 프로젝트입니다.
          </p>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
              <span className='text-green-500'>✅</span>
              <span>useState</span>
            </div>
            <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
              <span className='text-green-500'>✅</span>
              <span>useReducer</span>
            </div>
            <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
              <span className='text-green-500'>✅</span>
              <span>useRef</span>
            </div>
            <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400'>
              <span className='text-green-500'>✅</span>
              <span>useContext</span>
            </div>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
            <span className='text-xl'>🔗</span>
            빠른 링크
          </h3>
          <nav className='space-y-2'>
            <Link
              to='/'
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              → 홈
            </Link>
            <Link
              to='/about'
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/about")
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              → 소개
            </Link>
          </nav>
        </div>

        {/* 설정 패널 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
            <span className='text-xl'>⚙️</span>
            설정
          </h3>
          <SettingPanel />
        </div>

        {/* 통계 카드 */}
        <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-md border border-blue-200 dark:border-blue-700 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
            <span className='text-xl'>📊</span>
            프로젝트 통계
          </h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                컴포넌트
              </span>
              <span className='text-lg font-bold text-blue-600 dark:text-blue-400'>
                12+
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                훅
              </span>
              <span className='text-lg font-bold text-purple-600 dark:text-purple-400'>
                8+
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                페이지
              </span>
              <span className='text-lg font-bold text-green-600 dark:text-green-400'>
                2+
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
