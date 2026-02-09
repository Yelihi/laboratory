import { useReducer, useState } from "react";

interface CafeState {
  rice: number;
}

type Action = { type: "COOK_RICE"; payload: number } | { type: "SERVE_RICE" };

const initialState: CafeState = {
  rice: 10,
};

const cafeReducer = (state: CafeState, action: Action) => {
  switch (action.type) {
    case "COOK_RICE": {
      return { ...state, rice: state.rice + action.payload };
    }
    case "SERVE_RICE": {
      if (state.rice <= 0) {
        alert("더 이상 밥을 제공할 수 없습니다.");
        return state;
      }

      return { ...state, rice: state.rice - 1 };
    }
    default: {
      return state;
    }
  }
};

export const Cafeteria = () => {
  const [state, dispatch] = useReducer(cafeReducer, initialState);
  const [cookAmount, setCookAmount] = useState<number>(1);

  const handleCookRice = () => {
    if (cookAmount > 0) {
      dispatch({ type: "COOK_RICE", payload: cookAmount });
      setCookAmount(1);
    }
  };

  const handleServeRice = () => {
    dispatch({ type: "SERVE_RICE" });
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
        식당 관리 시스템
      </h2>

      {/* 현재 밥 개수 표시 */}
      <div className='mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg text-center'>
        <div className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
          현재 보유 중인 밥
        </div>
        <div className='text-4xl font-bold text-primary-600 dark:text-primary-400'>
          {state.rice} 개
        </div>
      </div>

      {/* 밥 요리 섹션 */}
      <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          밥 요리하기
        </h3>
        <div className='flex gap-2'>
          <input
            type='number'
            min='1'
            value={cookAmount}
            onChange={(e) => setCookAmount(parseInt(e.target.value) || 1)}
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <button
            onClick={handleCookRice}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
          >
            요리하기
          </button>
        </div>
      </div>

      {/* 밥 제공 섹션 */}
      <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          밥 제공하기
        </h3>
        <button
          onClick={handleServeRice}
          disabled={state.rice <= 0}
          className='w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors'
        >
          배식하기
        </button>
        {state.rice <= 0 && (
          <p className='mt-2 text-sm text-red-600 dark:text-red-400 text-center'>
            더 이상 밥을 제공할 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
