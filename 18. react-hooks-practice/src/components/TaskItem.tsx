import { Task, Priority } from "../stores/tasks/taskTypes";

interface TaskItemProps {
  task: Task;
  toggleCompletedDispatch: (id: number) => void;
  updatePriorityDispatch: ({
    id,
    priority,
  }: {
    id: number;
    priority: Priority;
  }) => void;
  deleteTaskDispatch: (id: number) => void;
}

const priorityOptions: Priority[] = ["Low", "Medium", "High"];

const getPriorityStyles = (priority: Priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  }
};

export const TaskItem = ({
  task,
  toggleCompletedDispatch,
  updatePriorityDispatch,
  deleteTaskDispatch,
}: TaskItemProps) => {
  const isCompleted = task.completed;

  return (
    <div
      className={`group relative w-full p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 ${
        isCompleted ? "opacity-70 bg-gray-50 dark:bg-gray-900/50" : ""
      }`}
    >
      <div className='flex items-center gap-4'>
        {/* 체크박스 */}
        <div className='relative flex items-center'>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => toggleCompletedDispatch(task.id)}
            className='w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all duration-200 checked:bg-blue-600 checked:border-blue-600 hover:border-blue-500'
          />
        </div>

        {/* 작업 제목 */}
        <div className='flex-1 min-w-0'>
          <span
            className={`text-lg font-medium text-gray-900 dark:text-white transition-all duration-200 ${
              isCompleted
                ? "line-through text-gray-400 dark:text-gray-500 italic"
                : ""
            }`}
          >
            {task.title}
          </span>
        </div>

        {/* 우선순위 배지 */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold border-2 whitespace-nowrap ${getPriorityStyles(
            task.priority
          )}`}
        >
          {task.priority}
        </div>

        {/* 우선순위 선택 */}
        <select
          value={task.priority}
          onChange={(e) =>
            updatePriorityDispatch({
              id: task.id,
              priority: e.target.value as Priority,
            })
          }
          className='px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%3E")] bg-[length:20px_20px] bg-[right_0.75rem_center] bg-no-repeat pr-10'
        >
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        {/* 삭제 버튼 */}
        <button
          onClick={() => deleteTaskDispatch(task.id)}
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center gap-2 group/button'
          aria-label='작업 삭제'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 group-hover/button:rotate-90 transition-transform duration-200'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
          <span className='hidden sm:inline'>삭제</span>
        </button>
      </div>
    </div>
  );
};
