import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Default = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* 헤더 */}
      <header className='sticky top-0 z-50 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* 로고 */}
            <div className='flex items-center gap-3'>
              <div className='text-2xl'>📚</div>
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                React Hooks Practice
              </h1>
            </div>

            {/* 네비게이션 */}
            <nav className='hidden md:flex items-center gap-6'>
              <Link
                to='/'
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Home
              </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <div className='md:hidden'>
              <button
                type='button'
                className='p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                aria-label='메뉴 열기'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* 메인 콘텐츠 */}
          <div className='lg:col-span-3'>{children}</div>

          {/* 사이드바 */}
          <Sidebar />
        </div>
      </main>

      {/* 푸터 */}
      <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              © 2024 React Hooks Practice. 학습 목적 프로젝트입니다.
            </p>
            <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
              <a
                href='#'
                className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              >
                GitHub
              </a>
              <a
                href='#'
                className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
              >
                문서
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
