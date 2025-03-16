import { AlertTriangle } from "lucide-react";
import { Button } from "../Button";

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

  // Apply variant-specific colors
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          button: "border-red-300 bg-red-600 text-white hover:bg-red-700",
          icon: "bg-red-100 text-red-600",
        };
      default:
        return {
          button:
            "border-yellow-300 bg-yellow-600 text-white hover:bg-yellow-700",
          icon: "bg-yellow-100 text-yellow-600",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-upwork-gray bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      {/* Dialog Container */}
      <div className="relative mx-4 w-full max-w-md sm:mx-auto overflow-hidden rounded-lg bg-white shadow-xl transform transition-all">
        <div className="p-6 space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${styles.icon}`}
            >
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-upwork-gray">{title}</h3>
            <p className="text-sm text-upwork-gray-light">{description}</p>

            {/* Optional Confirm Input */}
            {confirmInput && (
              <div className="mt-4 text-left">
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-upwork-gray"
                >
                  Please type{" "}
                  <span className="font-semibold">
                    {confirmInput.expectedValue}
                  </span>{" "}
                  to confirm
                </label>
                <input
                  type="text"
                  id="confirm"
                  value={confirmInput.value}
                  onChange={(e) =>
                    confirmInput.onChange
                      ? confirmInput.onChange(e.target.value)
                      : // Fallback if no onChange prop is passed
                        (confirmInput.placeholder = e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border border-upwork-gray-lighter px-3 py-2 text-upwork-gray placeholder-upwork-gray-light focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row-reverse sm:justify-center sm:gap-3">
            <Button
              variant="outline"
              className={`w-full sm:w-auto ${styles.button}`}
              onClick={onConfirm}
              disabled={
                isLoading ||
                (confirmInput &&
                  confirmInput.value !== confirmInput.expectedValue)
              }
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
    </div>
  );
}
