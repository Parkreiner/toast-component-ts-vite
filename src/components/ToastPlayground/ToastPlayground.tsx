import { useId, useState } from "react";
import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import useToasts from "../../hooks/useToasts";
import { TOAST_VARIANTS, ToastVariant } from "../../sharedTypesAndConstants";
import ToastShelf from "../ToastShelf";

export default function ToastPlayground() {
  const { toasts, addToast, dismissToast } = useToasts();
  const [messageDraft, setMessageDraft] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<ToastVariant>(
    TOAST_VARIANTS[0]
  );

  const hookId = useId();
  const textAreaId = `${hookId}-textarea`;

  const radioButtons = TOAST_VARIANTS.map((variantType, index) => {
    const inputId = `${hookId}-variant-${variantType}`;
    const displayName =
      variantType.slice(0, 1).toUpperCase() +
      variantType.slice(1).toLowerCase();

    return (
      <label key={index} htmlFor={inputId}>
        <input
          id={inputId}
          type="radio"
          name="variant"
          checked={variantType === selectedVariant}
          onChange={() => setSelectedVariant(variantType)}
          value={variantType}
        />
        {displayName}
      </label>
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageDraft === "") return;

    setMessageDraft("");
    setSelectedVariant(TOAST_VARIANTS[0]);
    addToast(selectedVariant, messageDraft);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} onDismiss={dismissToast} />

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
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
