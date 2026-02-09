// entity
export interface Course {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type Action =
  | { type: typeof type.ADD_COURSE; payload: Course }
  | { type: typeof type.REMOVE; payload: number }
  | { type: typeof type.INCREMENT; payload: number }
  | { type: typeof type.DECREMENT; payload: number };

// action 관리
export const type = {
  ADD_COURSE: "ADD_COURSE" as const,
  REMOVE: "REMOVE" as const,
  INCREMENT: "INCREASE" as const,
  DECREMENT: "DECREMENT" as const,
};
