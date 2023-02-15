import { ToastData } from "../../sharedTypesAndConstants";
import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

type Props = {
  toasts: readonly ToastData[];
  onDismiss?: (toastIndex: number) => void;
};

export default function ToastShelf({ toasts, onDismiss }: Props) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, variant, text }, index) => {
        const dismiss =
          typeof onDismiss === "function" ? () => onDismiss(index) : undefined;

        return (
          <li key={id} className={styles.toastWrapper}>
            <Toast variant={variant} onDismiss={dismiss}>
              {text}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}
