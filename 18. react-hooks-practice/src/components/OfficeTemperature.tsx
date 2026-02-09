import { useReducer, useState } from "react";

interface OfficeTemperatureState {
  temperature: number;
  humidity: number;
}

type Action =
  | { type: "SET_TEMPERATURE"; payload: number }
  | { type: "SET_HUMIDITY"; payload: number };

const initialState: OfficeTemperatureState = {
  temperature: 22,
  humidity: 45,
};

const officeTemperatureReducer = (
  state: OfficeTemperatureState,
  action: Action
) => {
  switch (action.type) {
    case "SET_TEMPERATURE": {
      return { ...state, temperature: action.payload };
    }
    case "SET_HUMIDITY": {
      return { ...state, humidity: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const OfficeTemperature = () => {
  const [state, dispatch] = useReducer(officeTemperatureReducer, initialState);
  const [temperatureInput, setTemperatureInput] = useState<number>(25);
  const [humidityInput, setHumidityInput] = useState<number>(50);

  const handleSetTemperature = () => {
    dispatch({ type: "SET_TEMPERATURE", payload: temperatureInput });
  };

  const handleSetHumidity = () => {
    dispatch({ type: "SET_HUMIDITY", payload: humidityInput });
  };

  return (
    <div className='max-w-2xl mx-auto mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600'>
      {/* 헤더 */}
      <div className='text-center mb-8'>
        <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          🏢 SMART OFFICE 제어 시스템
        </div>
      </div>

      {/* 현재 온도/습도 표시 */}
      <div className='mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg'>
        <div className='flex justify-center items-center gap-8'>
          <div className='text-center'>
            <div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
              현재 온도
            </div>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {state.temperature}°C
            </div>
          </div>
          <div className='text-gray-400 dark:text-gray-500 text-2xl'>|</div>
          <div className='text-center'>
            <div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
              현재 습도
            </div>
            <div className='text-2xl font-bold text-gray-900 dark:text-white'>
              {state.humidity}%
            </div>
          </div>
        </div>
      </div>

      {/* 온도 설정 */}
      <div className='mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
        <div className='flex gap-3 items-center'>
          <input
            type='number'
            value={temperatureInput}
            onChange={(e) => setTemperatureInput(Number(e.target.value))}
            placeholder='온도 입력'
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <button
            onClick={handleSetTemperature}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap'
          >
            온도 설정 버튼
          </button>
        </div>
      </div>

      {/* 습도 설정 */}
      <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
        <div className='flex gap-3 items-center'>
          <input
            type='number'
            value={humidityInput}
            onChange={(e) => setHumidityInput(Number(e.target.value))}
            placeholder='습도 입력'
            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <button
            onClick={handleSetHumidity}
            className='px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap'
          >
            습도 설정 버튼
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeTemperature;
