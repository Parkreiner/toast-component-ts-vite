import { FunctionComponent, PropsWithChildren } from "react";
import { ToastVariant } from "../../sharedTypesAndConstants";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./Toast.module.css";

import {
  IconProps,
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

type VariantInfo = {
  // The I must be capitalized to make working with dynamic components possible
  IconComponent: FunctionComponent<IconProps>;
  accessibilityPrefix: string;
};

const variantInfo = {
  notice: {
    IconComponent: Info,
    accessibilityPrefix: "Notice",
  },
  warning: {
    IconComponent: AlertTriangle,
    accessibilityPrefix: "Warning",
  },
  success: {
    IconComponent: CheckCircle,
    accessibilityPrefix: "Success",
  },
  error: {
    IconComponent: AlertOctagon,
    accessibilityPrefix: "Alert",
  },
} as const satisfies Record<ToastVariant, VariantInfo>;

type Props = PropsWithChildren<{
  variant: ToastVariant;
  onDismiss: () => void;
}>;

export default function Toast({ children, variant, onDismiss }: Props) {
  const { IconComponent, accessibilityPrefix } = variantInfo[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconComponent size={24} />
      </div>

      <p className={styles.content}>
        <VisuallyHidden>{accessibilityPrefix}: </VisuallyHidden>
        {children}
      </p>

      <button
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}
