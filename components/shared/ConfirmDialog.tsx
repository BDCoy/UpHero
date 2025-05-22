import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";


interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning";
  confirmInput?: {
    value: string;
    placeholder: string;
    expectedValue: string;
    onChange?: (val: string) => void;
  };
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
  variant = "warning",
  confirmInput,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      button: "bg-red-600 text-white hover:bg-red-700",
      icon: "bg-red-100 text-red-600",
      focus: "focus:ring-red-500 focus:border-red-500",
    },
    warning: {
      button: "bg-yellow-600 text-white hover:bg-yellow-700",
      icon: "bg-yellow-100 text-yellow-600",
      focus: "focus:ring-yellow-500 focus:border-yellow-500",
    },
  }[variant];

  const isDisabled =
    isLoading ||
    (confirmInput &&
      confirmInput.value !== confirmInput.expectedValue);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onCancel}
      />

      {/* Dialog Panel */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all sm:mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-full ${variantStyles.icon}`}
          >
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-2">
          <h3
            id="confirm-dialog-title"
            className="text-lg font-semibold text-upwork-gray"
          >
            {title}
          </h3>
          <p className="text-sm text-upwork-gray-light">{description}</p>
        </div>

        {/* Optional Confirm Input */}
        {confirmInput && (
          <div className="mt-4 text-left">
            <label
              htmlFor="confirm-input"
              className="block text-sm font-medium text-upwork-gray"
            >
              Please type{" "}
              <span className="font-semibold">
                {confirmInput.expectedValue}
              </span>{" "}
              to confirm
            </label>
            <input
              id="confirm-input"
              type="text"
              placeholder={confirmInput.placeholder}
              value={confirmInput.value}
              onChange={(e) =>
                confirmInput.onChange?.(e.target.value)
              }
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-upwork-gray placeholder-upwork-gray-light border-upwork-gray-lighter focus:outline-none ${variantStyles.focus}`}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row-reverse sm:justify-center">
          <Button
            className={`w-full sm:w-auto ${variantStyles.button}`}
            onClick={onConfirm}
            disabled={isDisabled}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
