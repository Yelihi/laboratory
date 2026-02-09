export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export const type = {
  ADD_TOAST: "ADD_TOAST" as const,
  REMOVE_TOAST: "REMOVE_TOAST" as const,
};

export type Action =
  | { type: typeof type.ADD_TOAST; payload: Toast }
  | { type: typeof type.REMOVE_TOAST; payload: number };
