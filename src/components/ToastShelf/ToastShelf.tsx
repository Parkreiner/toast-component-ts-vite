import { ToastData } from "../../sharedTypesAndConstants";
import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

type Props = {
  toasts: readonly ToastData[];
  onDismiss: (toastIndex: number) => void;
};

export default function ToastShelf({ toasts, onDismiss }: Props) {
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map(({ id, variant, text }, index) => {
        return (
          <li key={id} className={styles.toastWrapper}>
            <Toast variant={variant} onDismiss={() => onDismiss(index)}>
              {text}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}
