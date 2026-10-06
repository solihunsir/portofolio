import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="adm-toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="adm-toast"
            style={{
              borderLeft: `4px solid ${
                toast.type === "success"
                  ? "#10b981"
                  : toast.type === "error"
                  ? "#ef4444"
                  : "#38bdf8"
              }`,
            }}
          >
            <i
              className={
                toast.type === "success"
                  ? "ri-checkbox-circle-fill"
                  : toast.type === "error"
                  ? "ri-error-warning-fill"
                  : "ri-information-fill"
              }
              style={{
                color:
                  toast.type === "success"
                    ? "#10b981"
                    : toast.type === "error"
                    ? "#ef4444"
                    : "#38bdf8",
                fontSize: "1.2rem",
              }}
            />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: (msg) => console.log("[Toast fallback]", msg) };
  }
  return context;
}
