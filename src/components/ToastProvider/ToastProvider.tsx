import {
  PropsWithChildren,
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  useRef,
} from "react";
import { ToastData, ToastVariant } from "../../sharedTypesAndConstants";

function useToastSetup() {
  const [toasts, setToasts] = useState<readonly ToastData[]>([]);

  // The Set isn't moved outside the hook, because then that makes the hook have
  // weird singleton behavior
  const prevIdsRef = useRef<Set<string> | null>(null);
  if (prevIdsRef.current === null) {
    prevIdsRef.current = new Set();
  }

  const addToast = useCallback((variant: ToastVariant, text: string) => {
    if (text.length === 0 || prevIdsRef.current === null) return;
    const prevToastIds = prevIdsRef.current;

    let newId: string;
    do {
      newId = String(Math.random()).slice(2);
    } while (prevToastIds.has(newId));

    const newToast = { variant, text, id: newId };
    prevToastIds.add(newId);
    setToasts((currentToasts) => [...currentToasts, newToast]);
  }, []);

  const dismissToast = useCallback((toastIndex: number) => {
    setToasts((currentToasts) => {
      const removed = currentToasts.filter((_, index) => index !== toastIndex);
      return removed.length < currentToasts.length ? removed : currentToasts;
    });
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // useMemo doesn't guarantee a 100% stable identity, even with an empty
  // dependency array, which is why useCallback is being used together with it
  const updateMethods = useMemo(() => {
    return { addToast, dismissToast, dismissAll } as const;
  }, []);

  return { toasts, updateMethods } as const;
}

type UpdateMethods = ReturnType<typeof useToastSetup>["updateMethods"];
const UpdatersContext = createContext<null | UpdateMethods>(null);
const DataContext = createContext<null | readonly ToastData[]>(null);

function assertContext<T>(
  value: T | null,
  hookName?: string
): asserts value is T {
  if (value !== null) return;
  throw new Error(
    `Context hook ${hookName ?? "Unknown hook"} is missing a value.` +
      " Please make sure that the provider component has been added to the application."
  );
}

export function useToastUpdaters() {
  const contextValue = useContext(UpdatersContext);
  assertContext(contextValue, useToastUpdaters.name);
  return contextValue;
}

export function useToasts() {
  const contextValue = useContext(DataContext);
  assertContext(contextValue, useToasts.name);
  return contextValue;
}

export default function ToastProvider({ children }: PropsWithChildren) {
  const { toasts, updateMethods } = useToastSetup();

  return (
    <DataContext.Provider value={toasts}>
      <UpdatersContext.Provider value={updateMethods}>
        {children}
      </UpdatersContext.Provider>
    </DataContext.Provider>
  );
}
