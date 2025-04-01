import React from "react";
import { Button } from "@components/ui/Button";
import { CreditCard, Shield, Clock } from "lucide-react";
import { useRevolutCheckout } from "@/lib/RevolutCheckoutContext";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/lib/revolut";

interface CheckoutSummaryProps {
  selectedPlan?: SubscriptionPlan;
  isLoading: boolean;
  setIsCheckoutVisible: (visible: boolean) => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  selectedPlan,
  isLoading,
  setIsCheckoutVisible,
}) => {
  const {
    handlePayWithCard,
    revolutPayRef,
    paymentGoogleRequestRef,
    paymentAppleRequestRef,
  } = useRevolutCheckout();

  const isFreeplan = selectedPlan?.id === "free";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-6">
          <h3 className="text-xl font-semibold text-upwork-gray">
            Complete Your {isFreeplan ? "Trial" : "Purchase"}
          </h3>
          {!isFreeplan && (
            <div className="flex items-center text-sm text-orange-600">
              <Clock className="mr-1.5 h-4 w-4" />
              Limited time offer
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-upwork-gray font-medium">
                {selectedPlan?.name}
              </span>
              {isFreeplan && (
                <p className="text-sm text-upwork-gray-light mt-1">
                  3-day free trial
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-xl font-semibold text-upwork-gray">
                ${selectedPlan?.price}
              </span>
              <span className="text-upwork-gray-light ml-1">
                {selectedPlan?.period}
              </span>
            </div>
          </div>

          {isFreeplan && (
            <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
              <p className="font-medium">Important Note:</p>
              <p className="mt-1">
                After 3 days, you'll be automatically charged{" "}
                <strong>{SUBSCRIPTION_PLANS[1].price}$</strong> for the{" "}
                {SUBSCRIPTION_PLANS[1].name} Plan unless you cancel.
              </p>
            </div>
          )}

          <div className="rounded-lg bg-upwork-background p-4">
            <h4 className="font-medium text-upwork-gray mb-3">
              Included Features:
            </h4>
            <ul className="space-y-2">
              {selectedPlan?.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-upwork-gray-light"
                >
                  <svg
                    className="h-4 w-4 text-upwork-green mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-upwork-gray">
              Total
            </span>
            <div className="text-right">
              <span className="text-2xl font-bold text-upwork-gray">
                ${selectedPlan?.price}
              </span>
              <span className="text-upwork-gray-light ml-1">
                {selectedPlan?.period}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              onClick={handlePayWithCard}
              className="w-full flex items-center justify-center text-white py-3"
              disabled={isLoading}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isLoading ? "Processing..." : `Pay with Card`}
            </Button>

            {!isFreeplan && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-upwork-gray-light">
                      Or pay with
                    </span>
                  </div>
                </div>

                <div ref={revolutPayRef} className="w-full" />
                <div ref={paymentGoogleRequestRef} className="w-full" />
                <div ref={paymentAppleRequestRef} className="w-full" />
              </>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center text-sm text-upwork-gray-light">
            <Shield className="w-4 h-4 mr-2" />
            Secure payment powered by Revolut
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => setIsCheckoutVisible(false)}
        className="w-full mt-6"
      >
        Back to Plans
      </Button>
    </div>
  );
};
