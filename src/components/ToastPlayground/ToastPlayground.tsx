import { useId, useState } from "react";
import Button from "../Button";
import Toast from "../Toast/Toast";
import styles from "./ToastPlayground.module.css";

const TOAST_VARIANTS = ["notice", "warning", "success", "error"] as const;
type ToastVariant = (typeof TOAST_VARIANTS)[number];

export default function ToastPlayground() {
  const [toastVisible, setToastVisible] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<ToastVariant>(
    TOAST_VARIANTS[0]
  );

  const hookId = useId();
  const textAreaId = `${hookId}-textarea`;

  const radioButtons = TOAST_VARIANTS.map((variantType) => {
    const inputId = `${hookId}-variant-${variantType}`;
    const displayName =
      variantType.slice(0, 1).toUpperCase() +
      variantType.slice(1).toLowerCase();

    return (
      <label htmlFor={inputId}>
        <input
          id={inputId}
          type="radio"
          name="variant"
          checked={variantType === selectedVariant}
          onClick={() => setSelectedVariant(variantType)}
          value={variantType}
        />
        {displayName}
      </label>
    );
  });

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toastVisible && (
        <Toast
          variant={selectedVariant}
          onDismiss={() => setToastVisible(!toastVisible)}
        >
          {messageDraft}
        </Toast>
      )}

      <form
        className={styles.controlsWrapper}
        onSubmit={(e) => {
          e.preventDefault();
          setToastVisible(true);
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor={textAreaId}
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>

          <div className={styles.inputWrapper}>
            <textarea
              id={textAreaId}
              className={styles.messageInput}
              value={messageDraft}
              onChange={(e) => setMessageDraft(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>

          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {radioButtons}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
