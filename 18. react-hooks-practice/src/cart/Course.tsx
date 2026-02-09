import { useReducer, useState } from "react";
import { courseReducer, CourseState } from "./store/courseReducer";
import {
  addCourse,
  removeCourse,
  incrementCourse,
  decrementCourse,
} from "./store/courseActions";
import { CourseItem } from "./CourseItem";

const initialState: CourseState = {
  courses: [],
  totalPrice: 0,
  totalQty: 0,
};

export const Course = () => {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  const [courseName, setCourseName] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<number>(0);

  const addCourseToCart = (name: string, price: number) => {
    if (!name.trim()) {
      alert("강의 이름을 입력해주세요.");
      return;
    }
    if (price <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }

    const newCourse = {
      id: Math.floor(Math.random() * 10000),
      name: name.trim(),
      price,
      quantity: 1,
    };

    dispatch(addCourse(newCourse));
    setCourseName("");
    setCoursePrice(0);
  };

  const handleAddCourse = () => {
    addCourseToCart(courseName, coursePrice);
  };

  const removeCourseFromCart = (id: number) => {
    dispatch(removeCourse(id));
  };

  const incrementCourseQuantity = (id: number) => {
    dispatch(incrementCourse(id));
  };

  const decrementCourseQuantity = (id: number) => {
    dispatch(decrementCourse(id));
  };

  return (
    <div className='max-w-2xl mx-auto mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600'>
      {/* 헤더 */}
      <div className='text-center mb-6'>
        <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          🎓 GEMINI ACADEMY 수강 바구니
        </div>
      </div>

      {/* 강의 추가 섹션 */}
      <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          강의 추가
        </h3>
        <div className='space-y-3'>
          <input
            type='text'
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder='강의 이름을 입력하세요'
            className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <div className='flex gap-3'>
            <input
              type='number'
              value={coursePrice || ""}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              placeholder='가격을 입력하세요'
              min='0'
              className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
            />
            <button
              onClick={handleAddCourse}
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap'
            >
              추가하기
            </button>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className='border-t-2 border-dashed border-gray-300 dark:border-gray-600 mb-6'></div>

      {/* 강의 목록 */}
      <div className='mb-6'>
        {state.courses.length === 0 ? (
          <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
            수강 바구니가 비어있습니다.
          </div>
        ) : (
          state.courses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              onRemoveCourse={() => removeCourseFromCart(course.id)}
              onIncrementCourse={() => incrementCourseQuantity(course.id)}
              onDecrementCourse={() => decrementCourseQuantity(course.id)}
            />
          ))
        )}
      </div>

      {/* 구분선 */}
      {state.courses.length > 0 && (
        <>
          <div className='border-t-2 border-dashed border-gray-300 dark:border-gray-600 mb-6'></div>

          {/* 총계 정보 */}
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-lg font-semibold text-gray-900 dark:text-white'>
                총 강의 수:
              </span>
              <span className='text-lg font-bold text-gray-900 dark:text-white'>
                {state.totalQty}개
              </span>
            </div>
            <div className='flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700'>
              <span className='text-xl font-semibold text-gray-900 dark:text-white'>
                최종 결제 금액:
              </span>
              <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                {state.totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
