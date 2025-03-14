import React from "react";
import { Button } from "../Button";
import { CreditCard } from "lucide-react";
import { useRevolutCheckout } from "@/lib/RevolutCheckoutContext";
import { SubscriptionPlan } from "@/lib/revolut";

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
  return (
    <div className="rounded-lg p-6 shadow-xs">
      <h3 className="text-lg font-semibold text-upwork-gray mb-5">
        Checkout Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-upwork-gray">{selectedPlan?.name}</span>
          <span className="text-upwork-gray font-semibold">
            ${selectedPlan?.price}
          </span>
        </div>

        <div className="mt-4">
          <h4 className="text-md font-semibold text-upwork-gray">
            Included Features:
          </h4>
          <ul className="list-disc list-inside text-upwork-gray-light mt-2 space-y-1">
            {selectedPlan?.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="border-t border-upwork-gray-lighter pt-4">
          <div className="flex justify-between items-center">
            <span className="text-upwork-gray font-semibold">Total</span>
            <span className="text-upwork-gray font-semibold">
              ${selectedPlan?.price}
            </span>
          </div>
        </div>
      </div>

      {selectedPlan?.id === "free" && (
        <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-md max-w-md mx-auto text-sm text-orange-700">
          You are starting with a <strong>Free Plan</strong>. After{" "}
          <strong>3 days</strong>, you will be automatically charged{" "}
          <strong>$15/month</strong> for the Pro Plan unless you cancel.
        </div>
      )}

      <div className="mt-6">
        <Button
          type="button"
          onClick={handlePayWithCard}
          className="w-full flex items-center justify-center text-white py-2 shadow"
          disabled={isLoading}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {isLoading ? "Processing..." : "Complete Payment"}
        </Button>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-upwork-gray-lighter" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or pay with</span>
          </div>
        </div>

        <div ref={revolutPayRef} className="w-full mt-4" />
        <div ref={paymentGoogleRequestRef} className="w-full mt-4" />
        <div ref={paymentAppleRequestRef} className="w-full mt-4" />

        <p className="text-xs text-upwork-gray text-center mt-2">
          Secure payment powered by{" "}
          <span className="font-semibold text-upwork-gray-dark">Revolut</span>
        </p>
      </div>

      <div className="flex justify-center w-full mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsCheckoutVisible(false)}
          className="px-4 py-2 hover:bg-gray-100 w-full"
        >
          Back to Plans
        </Button>
      </div>
    </div>
  );
};
