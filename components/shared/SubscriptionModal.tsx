import { CreditCard, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    router.push("/dashboard/new-subscription");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-auto rounded-2xl bg-white shadow-2xl p-6 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-upwork-gray-light hover:text-upwork-gray transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-upwork-background text-upwork-green flex items-center justify-center">
            <CreditCard className="h-6 w-6" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-upwork-gray">
            Subscription Required
          </h2>
          <p className="mt-2 text-sm text-upwork-gray-light">
            Your subscription is inactive or you&apos;ve reached your usage limit.
            Please upgrade your plan.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button onClick={handleUpgrade} className="w-full sm:w-auto">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
