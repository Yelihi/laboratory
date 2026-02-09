import { type, Action, Course } from "./courseTypes";

/**
 * @description 새로운 강의 추가
 * @param {Course} course - 추가할 강의 정보
 */
export const addCourse = (course: Course): Action => {
  return { type: type.ADD_COURSE, payload: course };
};

/**
 * @description 강의 삭제
 * @param {number} id - 삭제할 강의의 ID
 */
export const removeCourse = (id: number): Action => {
  return { type: type.REMOVE, payload: id };
};

/**
 * @description 특정 강의의 수량 증가
 * @param {number} id - 수량을 증가할 강의의 ID
 */
export const incrementCourse = (id: number): Action => {
  return { type: type.INCREMENT, payload: id };
};

/**
 * @description 특정 강의의 수량 감소
 * @param {number} id - 수량을 감소할 강의의 ID
 */
export const decrementCourse = (id: number): Action => {
  return { type: type.DECREMENT, payload: id };
};
