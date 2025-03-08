import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../Button';

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning';
  confirmInput?: {
    value: string;
    placeholder: string;
    expectedValue: string;
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
  variant = 'warning',
  confirmInput
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          button: 'border-red-300 bg-red-600 text-white hover:bg-red-700',
          icon: 'bg-red-100 text-red-600'
        };
      default:
        return {
          button: 'border-yellow-300 bg-yellow-600 text-white hover:bg-yellow-700',
          icon: 'bg-yellow-100 text-yellow-600'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-upwork-gray bg-opacity-75 transition-opacity" />
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 sm:mx-auto overflow-hidden shadow-xl transform transition-all">
        <div className="p-6">
          <div className="flex items-start">
            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${styles.icon}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-upwork-gray">{title}</h3>
            <div className="mt-2">
              <p className="text-sm text-upwork-gray-light">{description}</p>
              {confirmInput && (
                <div className="mt-4">
                  <label htmlFor="confirm" className="block text-sm font-medium text-upwork-gray">
                    Please type <span className="font-semibold">{confirmInput.expectedValue}</span> to confirm
                  </label>
                  <input
                    type="text"
                    id="confirm"
                    value={confirmInput.value}
                    onChange={(e) => confirmInput.placeholder = e.target.value}
                    className="mt-1 block w-full rounded-md border-upwork-gray-lighter px-3 py-2 text-upwork-gray placeholder-upwork-gray-light focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row-reverse sm:gap-3">
            <Button
              variant="outline"
              className={`w-full ${styles.button}`}
              onClick={onConfirm}
              disabled={isLoading || (confirmInput && confirmInput.value !== confirmInput.expectedValue)}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </Button>
            <Button
              variant="outline"
              className="mt-3 w-full sm:mt-0"
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