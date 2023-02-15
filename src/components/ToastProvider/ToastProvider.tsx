import {
  createContext,
  useState,
  useRef,
  PropsWithChildren,
  memo,
  useMemo,
  useContext,
} from "react";
import { ToastData, ToastVariant } from "../../sharedTypesAndConstants";

function useToastSetup() {
  const [toasts, setToasts] = useState<readonly ToastData[]>([]);
  const prevIdsRef = useRef<string[]>([]);

  const updateMethods = useMemo(() => {
    const addToast = (variant: ToastVariant, text: string) => {
      if (text.length === 0) return;

      const prevIds = prevIdsRef.current;
      let newId = String(Math.random());
      while (prevIds.includes(newId)) {
        newId = String(Math.random());
      }

      const newToast = { variant, text, id: newId };
      prevIds.push(newId);
      setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const dismissToast = (toastIndex: number) => {
      setToasts((prevToasts) => {
        const removed = prevToasts.filter((_, index) => index !== toastIndex);
        return removed.length < prevToasts.length ? removed : prevToasts;
      });
    };

    return { addToast, dismissToast } as const;
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
