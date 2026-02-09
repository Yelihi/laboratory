import { useReducer } from "react";

// 좌석 entity 정의
interface Seat {
  id: number;
  selected: boolean;
  price: number;
  // 원래라면 각 좌석 당 할인률을 나타내는 속성이 필요할 수 있지만 지금 과제에서는 일단 무시
}

interface TicketState {
  seats: Seat[];
  totalAmount: number;
  adjustedVIP: boolean;
}

type ACTION_TYPES =
  | { type: "TOGGLE_SEAT"; payload: Seat }
  | { type: "TOGGLE_VIP" };

const initialState: TicketState = {
  seats: [
    { id: 1, selected: false, price: 10000 },
    { id: 2, selected: false, price: 10000 },
    { id: 3, selected: false, price: 10000 },
    { id: 4, selected: false, price: 10000 },
    { id: 5, selected: false, price: 10000 },
  ],
  totalAmount: 0,
  adjustedVIP: false,
};

/**
 * @description 미리 합의된 사항으로 선택된 좌석의 수의 제한과 할인률
 * 프로젝트성이라면 domain 으로 분류
 */
const MAX_SELECTED_SEATS = 4;
const VIP_DISCOUNT_RATE = 0.8;

const ticketReducer = (state: TicketState, action: ACTION_TYPES) => {
  /**
   * @description 좌석 배열의 총 가격을 계산하는 함수
   * @param seats 좌석 배열
   * @returns 좌석 배열의 총 가격
   */
  const getTotalAmount = (seats: Seat[], discountRate: number): number => {
    // 선택된 좌석만 가격을 계산
    return (
      seats.reduce((acc, seat) => acc + (seat.selected ? seat.price : 0), 0) *
      discountRate
    );
  };

  switch (action.type) {
    case "TOGGLE_SEAT": {
      const clickedSeat = state.seats.find(
        (seat) => seat.id === action.payload.id
      );
      const selectedSeatCount = state.seats.filter(
        (seat) => seat.selected
      ).length;
      const isTryingToSelect = clickedSeat?.selected === false;
      const isMaxSeatsReached = selectedSeatCount >= MAX_SELECTED_SEATS;

      // 만일 선택된 자석이 총 4좌석이라면 좌석 선택을 더 이상 할 수 없도록 한다.
      if (isTryingToSelect && isMaxSeatsReached) {
        alert("최대 선택 좌석수를 초과하셨습니다.");
        return state;
      }

      const newSeats = state.seats.map((seat) =>
        seat.id !== action.payload.id
          ? seat
          : { ...seat, selected: !seat.selected }
      );
      const totalAmount = state.adjustedVIP
        ? getTotalAmount(newSeats, VIP_DISCOUNT_RATE)
        : getTotalAmount(newSeats, 1);

      return {
        ...state,
        seats: newSeats,
        totalAmount: totalAmount,
      };
    }
    case "TOGGLE_VIP": {
      const newAdjustedVIPState = !state.adjustedVIP;

      const newTotalAmount = newAdjustedVIPState
        ? getTotalAmount(state.seats, VIP_DISCOUNT_RATE)
        : getTotalAmount(state.seats, 1);

      return {
        ...state,
        adjustedVIP: newAdjustedVIPState,
        totalAmount: newTotalAmount,
      };
    }
    default: {
      return state;
    }
  }
};

export const Ticket = () => {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const selectSpecificSeat = (seat: Seat) => () => {
    dispatch({ type: "TOGGLE_SEAT", payload: seat });
  };

  const toggleVIPDiscount = () => {
    dispatch({ type: "TOGGLE_VIP" });
  };

  const isSeatSelected = (seatId: number) => {
    return state.seats.find((seat) => seat.id === seatId)?.selected ?? false;
  };

  const selectedSeats = state.seats.filter((seat) => seat.selected);

  const selectedSeatCount = selectedSeats.length;
  const selectedSeatNames = selectedSeats
    .map((seat) => `A${seat.id}`)
    .join(", ");

  return (
    <div className='max-w-2xl mx-auto mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-600'>
      {/* 헤더 */}
      <div className='text-center mb-8'>
        <div className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          🎬 스마트 티켓 예매 시스템
        </div>
      </div>

      {/* 회원 등급 전환 */}
      <div className='mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-semibold text-gray-900 dark:text-white'>
            👤 {state.adjustedVIP ? "VIP 회원" : "일반 회원"}
          </span>
          <button
            onClick={toggleVIPDiscount}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              state.adjustedVIP
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            }`}
          >
            {state.adjustedVIP ? "일반 회원으로 전환" : "VIP 등급 전환"}
          </button>
        </div>
        {state.adjustedVIP && (
          <p className='mt-2 text-sm text-purple-600 dark:text-purple-400'>
            20% 할인 적용 중
          </p>
        )}
      </div>

      {/* 좌석 선택 */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          좌석 선택 (최대 {MAX_SELECTED_SEATS}석):
        </h3>
        <div className='flex gap-3 flex-wrap'>
          {initialState.seats.map((seat) => {
            const selected = isSeatSelected(seat.id);
            return (
              <button
                key={seat.id}
                onClick={selectSpecificSeat(seat)}
                disabled={!selected && selectedSeatCount >= MAX_SELECTED_SEATS}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selected
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                } ${
                  !selected && selectedSeatCount >= MAX_SELECTED_SEATS
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                A{seat.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* 구분선 */}
      <div className='border-t-2 border-dashed border-gray-300 dark:border-gray-600 my-6'></div>

      {/* 선택 정보 */}
      <div className='space-y-3 mb-6'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600 dark:text-gray-400'>선택된 좌석:</span>
          <span className='font-semibold text-gray-900 dark:text-white'>
            {selectedSeatNames || "없음"}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600 dark:text-gray-400'>사용자 등급:</span>
          <span className='font-semibold text-gray-900 dark:text-white'>
            {state.adjustedVIP ? "VIP (20% 할인 적용 중)" : "일반 회원"}
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className='border-t-2 border-dashed border-gray-300 dark:border-gray-600 my-6'></div>

      {/* 최종 결제 금액 */}
      <div className='bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-semibold text-gray-900 dark:text-white'>
            최종 결제 금액:
          </span>
          <span className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
            {state.totalAmount.toLocaleString()}원
          </span>
        </div>
        {state.seats.length > 0 && (
          <div className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            {selectedSeatCount}석 × 10,000원
            {state.adjustedVIP && " × 0.8 (VIP 할인)"} ={" "}
            {state.totalAmount.toLocaleString()}원
          </div>
        )}
      </div>
    </div>
  );
};
