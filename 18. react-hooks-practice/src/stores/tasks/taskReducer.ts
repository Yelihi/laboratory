import { Task, Action, type } from "./taskTypes";

// 총 갯수나, 진행중 혹은 우선순위를 나타내는 수치들은 사실 tasks 내에서 반환되는 결과값이기에 별도의 상태로 관리하지는 않습니다.
export interface TaskState {
  tasks: Task[];
}

export const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case type.ADD_TASK: {
      // 빈 문자열 체크
      if (action.payload.title.length === 0) {
        alert("Task title is required");
        return state;
      }

      const newTasks = [...state.tasks, action.payload];

      return {
        ...state,
        tasks: newTasks,
      };
    }
    case type.TOGGLE_TASK: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case type.UPDATE_PRIORITY: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, priority: action.payload.priority }
          : task
      );

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case type.DELETE_TASK: {
      const newTasks = state.tasks.filter((task) => task.id !== action.payload);

      return {
        ...state,
        tasks: newTasks,
      };
    }
    default: {
      return state;
    }
  }
};
