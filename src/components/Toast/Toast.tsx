import { FunctionComponent, PropsWithChildren } from "react";
import { ToastVariant } from "../../typesAndConstants";
import {
  IconProps,
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";
import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
} as const satisfies Record<ToastVariant, FunctionComponent<IconProps>>;

type Props = PropsWithChildren<{
  variant: ToastVariant;
  onDismiss?: () => void;
}>;

export default function Toast({ children, variant, onDismiss }: Props) {
  const IconComponent = ICONS_BY_VARIANT[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconComponent size={24} />
      </div>

      <p className={styles.content}>{children}</p>

      {typeof onDismiss === "function" && (
        <button className={styles.closeButton} onClick={onDismiss}>
          <X size={24} />
          <VisuallyHidden>Dismiss message</VisuallyHidden>
        </button>
      )}
    </div>
  );
}
