import { useReducer } from "react";
import { toastReducer, ToastState } from "./toastReducer";
import { ToastContext } from "../../contexts/ToastContext";

const initialState: ToastState = {
  toasts: [],
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};
