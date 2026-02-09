import { Course, Action, type } from "./courseTypes";

export interface CourseState {
  courses: Course[];
  totalPrice: number;
  totalQty: number;
}

export const courseReducer = (
  state: CourseState,
  action: Action
): CourseState => {
  // 총 가격을 계산합니다.
  const updateTotalPrice = (courses: Course[]) => {
    return courses.reduce(
      (total, course) => total + course.price * course.quantity,
      0
    );
  };

  // 총 수량을 계산합니다.
  const updateTotalQty = (courses: Course[]) => {
    return courses.reduce((total, course) => total + course.quantity, 0);
  };
  switch (action.type) {
    // 강의를 추가합니다.
    case type.ADD_COURSE: {
      const newCourses = [...state.courses, action.payload];

      return {
        ...state,
        courses: newCourses,
        totalPrice: updateTotalPrice(newCourses),
        totalQty: updateTotalQty(newCourses),
      };
    }
    // 강의를 삭제합니다.
    case type.REMOVE: {
      const removedCourse = state.courses.find(
        (course) => course.id === action.payload
      );

      if (!removedCourse) {
        alert("해당 강의를 찾을 수 없습니다.");
        return state;
      }
      const newCourses = state.courses.filter(
        (course) => course.id !== action.payload
      );

      return {
        ...state,
        courses: newCourses,
        totalPrice: updateTotalPrice(newCourses),
        totalQty: updateTotalQty(newCourses),
      };
    }
    // 강의의 수량을 증가시킨다.
    case type.INCREMENT: {
      const updatedCourse = state.courses.find(
        (course) => course.id === action.payload
      );

      if (!updatedCourse) {
        alert("해당 강의를 찾을 수 없습니다.");
        return state;
      }

      // 1씩 증가
      const newCourses = state.courses.map((course) =>
        course.id === action.payload
          ? { ...course, quantity: course.quantity + 1 }
          : course
      );

      return {
        ...state,
        courses: newCourses,
        totalPrice: updateTotalPrice(newCourses),
        totalQty: updateTotalQty(newCourses),
      };
    }
    // 강의의 수량을 감소시키되, 1 이하로는 떨어지지 않도록 처리한다.
    case type.DECREMENT: {
      const updatedCourse = state.courses.find(
        (course) => course.id === action.payload
      );

      if (!updatedCourse) {
        alert("해당 강의를 찾을 수 없습니다.");
        return state;
      }

      // 1씩 감소
      const newCourses = state.courses.map((course) =>
        course.id === action.payload
          ? { ...course, quantity: Math.max(course.quantity - 1, 1) }
          : course
      );

      return {
        ...state,
        courses: newCourses,
        totalPrice: updateTotalPrice(newCourses),
        totalQty: updateTotalQty(newCourses),
      };
    }
    default: {
      return state;
    }
  }
};
