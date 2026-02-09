import { useRef } from "react";
import { Task } from "../stores/tasks/taskTypes";

interface TaskInputProps {
  addTaskDispatch: (task: Task) => void;
}

export const TaskInput = ({ addTaskDispatch }: TaskInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const requestAddTask = () => {
    if (inputRef.current === null) return;

    const newTask: Task = {
      id: Math.floor(Math.random() * 10000),
      title: inputRef.current.value,
      priority: "Low",
      completed: false,
    };

    addTaskDispatch(newTask);
    // 네트워크 요청 자체는 아니기 때문에, useTransition 같은 경우는 고려하지 않는다.
    inputRef.current.value = "";
  };

  const enterButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      requestAddTask();
    }
  };

  return (
    <section className='w-full max-w-3xl mx-auto mb-8'>
      <div className='relative group'>
        {/* 입력 필드 */}
        <div className='relative'>
          <input
            ref={inputRef}
            type='text'
            placeholder='새로운 업무를 작성해주세요...'
            onKeyDown={enterButton}
            className='w-full px-6 py-4 pl-14 pr-32 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500'
          />

          {/* 아이콘 (왼쪽) */}
          <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors'>
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
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </div>

          {/* 버튼 (오른쪽) */}
          <button
            onClick={requestAddTask}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700'
          >
            <span className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4v16m8-8H4'
                />
              </svg>
              추가
            </span>
          </button>
        </div>

        {/* 힌트 텍스트 */}
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Enter 키를 눌러 빠르게 추가할 수 있습니다
        </p>
      </div>
    </section>
  );
};
