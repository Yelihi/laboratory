interface TaskStatsProps {
  totalTaskCount: number;
  progressTaskCount: number;
  highPriorityTaskCount: number;
  mediumPriorityTaskCount: number;
  lowPriorityTaskCount: number;
}

export const TaskStats = ({
  totalTaskCount,
  progressTaskCount,
  highPriorityTaskCount,
  mediumPriorityTaskCount,
  lowPriorityTaskCount,
}: TaskStatsProps) => {
  const completedTaskCount = totalTaskCount - progressTaskCount;
  const completionRate =
    totalTaskCount > 0
      ? Math.round((completedTaskCount / totalTaskCount) * 100)
      : 0;

  return (
    <div className='w-full max-w-6xl mx-auto mb-8'>
      {/* 헤더 */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          📊 업무 통계 대시보드
        </h2>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          현재 업무 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* 전체 업무 카드 */}
        <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>전체 업무</div>
          <div className='text-4xl font-bold'>{totalTaskCount}</div>
        </div>

        {/* 진행중 업무 카드 */}
        <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>진행중 업무</div>
          <div className='text-4xl font-bold'>{progressTaskCount}</div>
        </div>

        {/* 완료율 카드 */}
        <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>완료율</div>
          <div className='text-4xl font-bold'>{completionRate}%</div>
          <div className='text-xs opacity-75 mt-1'>
            {completedTaskCount} / {totalTaskCount} 완료
          </div>
        </div>

        {/* 우선순위 높은 업무 카드 */}
        <div className='bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>
            높은 우선순위
          </div>
          <div className='text-4xl font-bold'>{highPriorityTaskCount}</div>
        </div>

        {/* 우선순위 중간 업무 카드 */}
        <div className='bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>
            중간 우선순위
          </div>
          <div className='text-4xl font-bold'>{mediumPriorityTaskCount}</div>
        </div>

        {/* 우선순위 낮은 업무 카드 */}
        <div className='bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-white/20 rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>
          <div className='text-sm font-medium opacity-90 mb-1'>
            낮은 우선순위
          </div>
          <div className='text-4xl font-bold'>{lowPriorityTaskCount}</div>
        </div>
      </div>

      {/* 진행률 바 */}
      {totalTaskCount > 0 && (
        <div className='mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-lg font-semibold text-gray-900 dark:text-white'>
              전체 진행률
            </span>
            <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
              {completionRate}%
            </span>
          </div>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out shadow-inner'
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400'>
            <span>완료: {completedTaskCount}개</span>
            <span>진행중: {progressTaskCount}개</span>
          </div>
        </div>
      )}
    </div>
  );
};
