import { useCallback, useRef, useState } from "react";
import { ToastData, ToastVariant } from "../sharedTypesAndConstants";

export default function useToasts() {
  const [toasts, setToasts] = useState<readonly ToastData[]>([]);
  const prevIdsRef = useRef<string[]>([]);

  const addToast = useCallback((variant: ToastVariant, text: string) => {
    if (text.length === 0) return;

    const prevIds = prevIdsRef.current;
    let newId = String(Math.random());

    while (prevIds.includes(newId)) {
      newId = String(Math.random());
    }

    const newToast = { variant, text, id: newId };
    prevIds.push(newId);
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  const dismissToast = useCallback((toastIndex: number) => {
    setToasts((prevToasts) => {
      const removed = prevToasts.filter((_, index) => index !== toastIndex);
      return removed.length < prevToasts.length ? removed : prevToasts;
    });
  }, []);

  return { toasts, addToast, dismissToast } as const;
}
