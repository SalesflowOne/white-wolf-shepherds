import { forwardRef } from "react";

export const fieldInputCls =
  "w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors";

export function inputStateCls(hasError: boolean) {
  return hasError
    ? `${fieldInputCls} border-destructive focus:border-destructive focus:ring-destructive/20`
    : `${fieldInputCls} border-input focus:border-accent focus:ring-ring/20`;
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (props: {
    id: string;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

/** Accessible labelled field wrapper with required marker, hint and inline error. */
export function Field({ id, label, required, error, hint, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-destructive" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {children({
        id,
        className: inputStateCls(Boolean(error)),
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const CharCount = forwardRef<
  HTMLParagraphElement,
  { value: string; max: number; className?: string }
>(({ value, max, className }, ref) => (
  <p ref={ref} className={`mt-1.5 text-right text-xs text-muted-foreground ${className ?? ""}`}>
    {value.length}/{max}
  </p>
));
CharCount.displayName = "CharCount";
