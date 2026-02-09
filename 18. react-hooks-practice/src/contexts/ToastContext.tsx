import { createContext, Dispatch } from "react";

import { ToastState } from "../stores/toast/toastReducer";
import { Action } from "../stores/toast/toastTypes";

export interface ToastContextType {
  state: ToastState;
  dispatch: Dispatch<Action>;
}

export const ToastContext = createContext<ToastContextType | null>(null);
