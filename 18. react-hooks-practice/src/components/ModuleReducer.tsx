// [문제의 코드] src/App.jsx - 모든 로직이 한 곳에 섞여 있어 관리가 불가능함
import { useReducer } from "react";

// 액션 타입 정의

// 파일이 분리되어있다 가정하고
// cafeteriaConstants.ts
export const type = {
  ADD_RICE: "ADD_RICE" as const,
  REFILL_SOUP: "REFILL_SOUP" as const,
  CHANGE_MENU: "CHANGE_MENU" as const,
};

// cafeteriaActions.ts
export type Action =
  | { type: typeof type.ADD_RICE; amount: number }
  | { type: typeof type.REFILL_SOUP; amount: number }
  | { type: typeof type.CHANGE_MENU; newMenu: string };

export const addRice = (amount: number): Action => ({
  type: type.ADD_RICE,
  amount,
});
export const refillSoup = (amount: number): Action => ({
  type: type.REFILL_SOUP,
  amount,
});
export const changeMenu = (newMenu: string): Action => ({
  type: type.CHANGE_MENU,
  newMenu,
});

// cafeteriaReducer.ts
interface CafeteriaState {
  rice: number;
  soup: number;
  mainMenu: string;
}

export const cafeteriaReducer = (
  state: CafeteriaState,
  action: Action
): CafeteriaState => {
  switch (action.type) {
    case type.ADD_RICE: {
      return { ...state, rice: state.rice + action.amount };
    }
    case type.REFILL_SOUP: {
      return { ...state, soup: state.soup + action.amount };
    }
    case type.CHANGE_MENU: {
      return { ...state, mainMenu: action.newMenu };
    }
    default: {
      return state;
    }
  }
};

// Cafeteria2.tsx

const initialState: CafeteriaState = {
  rice: 20,
  soup: 30,
  mainMenu: "김치찌개",
};

export default function Cafeteria2() {
  const [state, dispatch] = useReducer(cafeteriaReducer, initialState);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🍱 사내 식당 (리팩토링 전)</h1>
      <p>
        밥: {state.rice} | 국: {state.soup} | 메뉴: {state.mainMenu}
      </p>

      {/* 액션 객체를 매번 직접 타이핑함 (오타 위험 높음) */}
      <button onClick={() => dispatch(addRice(10))}>밥 추가</button>
      <button onClick={() => dispatch(changeMenu("돈까스"))}>메뉴 변경</button>
    </div>
  );
}
