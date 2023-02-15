import { useCallback, useRef, useState } from "react";
import { ToastData, ToastVariant } from "../typesAndConstants";

export default function useToasts() {
  const [toasts, setToasts] = useState<readonly ToastData[]>([]);
  const prevIdsRef = useRef<string[]>([]);

  const addToast = useCallback((variant: ToastVariant, text = "") => {
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
    setToasts((prevToasts) =>
      prevToasts.filter((_, index) => index !== toastIndex)
    );
  }, []);

  return { toasts, addToast, dismissToast } as const;
}
