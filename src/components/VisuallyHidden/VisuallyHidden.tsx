import { useState, useEffect } from "react";

import styles from "./VisuallyHidden.module.css";

type Props = React.ComponentPropsWithRef<"span">;

export default function VisuallyHidden({
  children,
  className = "",
  ...delegated
}: Props) {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Alt") {
        setForceShow(true);
      }
    };

    const handleKeyUp = () => {
      setForceShow(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (forceShow) {
    return <span className={styles.showWrapper}>{children}</span>;
  }

  return (
    <span className={`${className} ${styles.wrapper}`} {...delegated}>
      {children}
    </span>
  );
}
