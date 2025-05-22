import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTourStore } from "@/lib/store/tour";

export function TourModal() {
  const { isActive, currentStep, steps, nextStep, previousStep, skipTour } =
    useTourStore();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const targetElement = document.getElementById(steps[currentStep].target);
      if (targetElement && modalRef.current) {
        const targetRect = targetElement.getBoundingClientRect();
        const modalRect = modalRef.current.getBoundingClientRect();

        // Position the modal next to the target element
        let top = 20;
        let left = targetRect.right + 20; // 20px gap

        // Adjust if modal would go off screen
        if (left + modalRect.width > window.innerWidth) {
          left = targetRect.left - modalRect.width - 20;
        }
        if (top + modalRect.height > window.innerHeight) {
          top = window.innerHeight - modalRect.height - 20;
        }

        modalRef.current.style.top = `${top}px`;
        modalRef.current.style.left = `${left}px`;

        // Highlight the target element
        targetElement.classList.add(
          "ring-2",
          "ring-upwork-green",
          "ring-offset-2"
        );

        return () => {
          targetElement.classList.remove(
            "ring-2",
            "ring-upwork-green",
            "ring-offset-2"
          );
        };
      }
    }
  }, [isActive, currentStep, steps]);

  if (!isActive) return null;

  const currentTourStep = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed z-50 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-upwork-gray">
            {currentTourStep.title}
          </h3>
          <button
            onClick={() => skipTour()}
            className="text-upwork-gray-light hover:text-upwork-gray transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-upwork-gray-light">{currentTourStep.content}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => previousStep()}
              disabled={isFirstStep}
              size="sm"
            >
              Back
            </Button>
            <Button
              onClick={() => (isLastStep ? skipTour() : nextStep())}
              size="sm"
            >
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
          <button
            onClick={() => skipTour()}
            className="text-sm text-upwork-gray-light hover:text-upwork-gray transition-colors"
          >
            Skip tour
          </button>
        </div>
      </div>
    </>
  );
}
