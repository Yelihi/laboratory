import { Toast, Action, type } from "./toastTypes";

export interface ToastState {
  toasts: Toast[];
}

export const toastReducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case type.ADD_TOAST: {
      const newToasts = [...state.toasts, action.payload];

      return {
        ...state,
        toasts: newToasts,
      };
    }
    case type.REMOVE_TOAST: {
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );

      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      return state;
    }
  }
};
