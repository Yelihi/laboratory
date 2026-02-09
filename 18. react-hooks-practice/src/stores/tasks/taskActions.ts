// action creators

import { type, Action, Task, Priority } from "./taskTypes";

/**
 * @description 새로운 업무 추가
 * @param {Task} task - 추가할 업무 정보
 */
export const addTask = (task: Task): Action => {
  return { type: type.ADD_TASK, payload: task };
};

/**
 * @description 특정 업무의 완료 toggle
 * @param {number} id - 완료 상태를 변경할 업무의 ID
 */
export const toggleCompleted = (id: number): Action => {
  return { type: type.TOGGLE_TASK, payload: id };
};

/**
 * @description 특정 업무에 대한 우선순위
 * @param {number} id - 우선순위를 변경할 업무의 ID
 */
export const updatePriority = ({
  id,
  priority,
}: {
  id: number;
  priority: Priority;
}): Action => {
  return { type: type.UPDATE_PRIORITY, payload: { id, priority } };
};

/**
 * @description 특정 업무 삭제
 * @param {number} id - 삭제할 업무의 ID
 */
export const deleteTask = (id: number): Action => {
  return { type: type.DELETE_TASK, payload: id };
};

/**
 * @description 총 갯수 계산 creators
 */

export const updateTotalTaskCount = (tasks: Task[]): number => {
  return tasks.length;
};

export const updateProgressTaskCount = (tasks: Task[]) => {
  return tasks.filter((task) => !task.completed).length;
};

export const updateCompletedTaskCount = (tasks: Task[]) => {
  return tasks.filter((task) => task.completed).length;
};

export const updateLowPriorityTaskCount = (tasks: Task[]) => {
  return tasks.filter((task) => task.priority === "Low").length;
};

export const updateMediumPriorityTaskCount = (tasks: Task[]) => {
  return tasks.filter((task) => task.priority === "Medium").length;
};

export const updateHighPriorityTaskCount = (tasks: Task[]) => {
  return tasks.filter((task) => task.priority === "High").length;
};
