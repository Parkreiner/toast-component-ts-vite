export const TOAST_VARIANTS = [
  "notice",
  "warning",
  "success",
  "error",
] as const;

export type ToastVariant = (typeof TOAST_VARIANTS)[number];

export type ToastData = {
  id: string;
  variant: ToastVariant;
  text: string;
};
