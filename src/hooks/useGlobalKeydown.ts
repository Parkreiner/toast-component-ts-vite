import { useEffect } from "react";

export default function useGlobalKeydown(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== key) return;
      callback();
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);
}
