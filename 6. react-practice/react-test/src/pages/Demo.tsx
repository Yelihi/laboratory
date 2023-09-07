import { useReducer } from "react";

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: "increment" | "decrement";
}

function reducer(state: State, action: Action) {
  const { type } = action;
  const { count, error } = state;

  switch (type) {
    case "increment": {
      const newCount = count + 1;
      const hasError = count > 5;
      return {
        ...state,
        count: hasError ? count : newCount,
        error: hasError ? "Maximum reached" : null,
      };
    }
    case "decrement": {
      const newCount = count - 1;
      const hasError = count < 0;
      return {
        ...state,
        count: hasError ? count : newCount,
        error: hasError ? "Minimum reached" : null,
      };
    }
    default:
      return state;
  }
}

const defaultState = {
  count: 0,
  error: null,
};

export default function Demo() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <>
      <div></div>
    </>
  );
}
