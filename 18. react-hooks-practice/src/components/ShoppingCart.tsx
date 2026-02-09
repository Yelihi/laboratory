import { useReducer } from "react";

interface ShoppingItem {
  id: number;
  name: string;
  price: number;
}

interface ShoppingCartState {
  items: ShoppingItem[];
  totalPrice: number;
  totalQty: number;
}

type Action =
  | { type: "ADD_ITEM"; payload: ShoppingItem }
  | { type: "REMOVE_ITEM"; payload: number };

const initialState: ShoppingCartState = {
  items: [],
  totalPrice: 0,
  totalQty: 0,
};

const shoppingCartReducer = (state: ShoppingCartState, action: Action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems = [...state.items, action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice + action.payload.price,
        totalQty: state.totalQty + 1,
      };
    }
    case "REMOVE_ITEM":
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (!removedItem) {
        alert("해당 상품을 찾을 수 없습니다.");
        return state;
      }

      const newItems = state.items.filter((item) => item.id !== action.payload);

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - removedItem.price,
        totalQty: state.totalQty - 1,
      };
    default: {
      return state;
    }
  }
};

export const ShoppingCart = () => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  const addRandomItem = () => {
    const createdRandomItem = {
      id: Math.floor(Math.random() * 10000),
      name: `상품 ${Math.floor(Math.random() * 10000)}`,
      price: Math.floor(Math.random() * 10000),
    };
    dispatch({ type: "ADD_ITEM", payload: createdRandomItem });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        <h3>상품 목록</h3>
      </div>
      <div>
        <h3>총 가격: ${state.totalPrice}</h3>
        <h3>총 수량: {state.totalQty}</h3>
      </div>
      <div
        role='button'
        onClick={addRandomItem}
        className='flex justify-center items-center p-3 w-full border rounded-lg border-red-300 hover:border-red-500 hover:shadow-md transition-all cursor-pointer'
      >
        랜덤 아이템 추가
      </div>
      <ul className='w-full list-none flex flex-col gap-3'>
        {state.items.map((item) => {
          return (
            <li
              key={item.id}
              className='w-full flex justify-start items-center p-3 gap-3 border-b border-gray-200'
            >
              <p className='text-base font-medium text-gray-900 dark:text-white'>
                {item.name}
              </p>
              <p className='text-base font-medium text-gray-900 dark:text-white'>
                ${item.price}
              </p>
              <button onClick={() => removeItem(item.id)}>상품 삭제</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
