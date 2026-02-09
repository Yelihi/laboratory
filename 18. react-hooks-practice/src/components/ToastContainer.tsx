import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

// actions
import { removeToast } from "@/stores/toast/toastActions";

export const ToastContainer = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("ToastContainer must be used within a ToastProvider");
  }

  const { state, dispatch } = context;

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1000 }}>
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            position: "relative",
            margin: "10px",
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {toast.message}
          <button onClick={() => dispatch(removeToast(toast.id))}>X</button>
        </div>
      ))}
    </div>
  );
};
