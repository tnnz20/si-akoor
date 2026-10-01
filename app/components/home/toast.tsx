import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type NotifyFn = (message: string, icon?: string) => void;

const ToastContext = createContext<NotifyFn>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback<NotifyFn>((message, icon = '✓') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message, icon });
    timerRef.current = setTimeout(() => setToast(null), 3600);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
            {toast.icon}
          </span>
          <span>{toast.message}</span>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}
