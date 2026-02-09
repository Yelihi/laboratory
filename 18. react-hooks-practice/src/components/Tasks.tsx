import { useReducer } from "react";
import { taskReducer, TaskState } from "../stores/tasks/taskReducer";

import { Task, Priority } from "../stores/tasks/taskTypes";
import {
  addTask,
  toggleCompleted,
  updatePriority,
  deleteTask,
  updateTotalTaskCount,
  updateProgressTaskCount,
  updateHighPriorityTaskCount,
  updateMediumPriorityTaskCount,
  updateLowPriorityTaskCount,
} from "../stores/tasks/taskActions";

import { TaskInput } from "./TaskInput";
import { TaskItem } from "./TaskItem";
import { TaskStats } from "./TaskStats";

const initialState: TaskState = {
  tasks: [],
};

export const Tasks = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const addTaskDispatch = (task: Task) => {
    dispatch(addTask(task));
  };

  const toggleCompletedDispatch = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const updatePriorityDispatch = ({
    id,
    priority,
  }: {
    id: number;
    priority: Priority;
  }) => {
    dispatch(updatePriority({ id, priority }));
  };

  const deleteTaskDispatch = (id: number) => {
    dispatch(deleteTask(id));
  };

  const totalCounts = {
    totalTaskCount: updateTotalTaskCount(tasks.tasks),
    progressTaskCount: updateProgressTaskCount(tasks.tasks),
    highPriorityTaskCount: updateHighPriorityTaskCount(tasks.tasks),
    mediumPriorityTaskCount: updateMediumPriorityTaskCount(tasks.tasks),
    lowPriorityTaskCount: updateLowPriorityTaskCount(tasks.tasks),
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* 헤더 */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            ✨ 업무 관리 시스템
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            효율적으로 업무를 관리하고 추적하세요
          </p>
        </div>

        {/* 1. TaskStats - 통계 대시보드 */}
        <TaskStats {...totalCounts} />

        {/* 2. TaskInput - 업무 추가 */}
        <TaskInput addTaskDispatch={addTaskDispatch} />

        {/* 3. TaskItems - 업무 목록 */}
        <div className='w-full max-w-5xl mx-auto'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              📋 업무 목록
            </h2>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              총 {tasks.tasks.length}개의 업무
            </span>
          </div>

          {tasks.tasks.length === 0 ? (
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-16 text-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-24 w-24 mx-auto text-gray-400 dark:text-gray-600 mb-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                />
              </svg>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                아직 업무가 없습니다
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                위의 입력 필드에서 새로운 업무를 추가해보세요!
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {tasks.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  toggleCompletedDispatch={toggleCompletedDispatch}
                  updatePriorityDispatch={updatePriorityDispatch}
                  deleteTaskDispatch={deleteTaskDispatch}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
