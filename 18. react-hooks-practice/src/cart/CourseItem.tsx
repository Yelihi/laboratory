import { Course } from "./store/courseTypes";

interface CourseItemProps {
  course: Course;
  onRemoveCourse: () => void;
  onIncrementCourse: () => void;
  onDecrementCourse: () => void;
}

export const CourseItem = ({
  course,
  onRemoveCourse,
  onIncrementCourse,
  onDecrementCourse,
}: CourseItemProps) => {
  return (
    <div className='py-4 border-b border-gray-200 dark:border-gray-700'>
      <div className='flex items-start justify-between mb-3'>
        <div className='flex-1'>
          <div className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>
            • {course.name}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            {course.price.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={onIncrementCourse}
          className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors'
        >
          [+]
        </button>
        <span className='w-8 text-center font-semibold text-gray-900 dark:text-white'>
          {course.quantity}
        </span>
        <button
          onClick={onDecrementCourse}
          className='px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded transition-colors'
        >
          [-]
        </button>
        <button
          onClick={onRemoveCourse}
          className='ml-auto px-4 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors'
        >
          [삭제]
        </button>
      </div>
    </div>
  );
};
