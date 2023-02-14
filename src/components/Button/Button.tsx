import styles from "./Button.module.css";

type Props = React.ComponentPropsWithRef<"button">;

export default function Button({ className = "", ...delegated }: Props) {
  return <button className={`${styles.button} ${className}`} {...delegated} />;
}
