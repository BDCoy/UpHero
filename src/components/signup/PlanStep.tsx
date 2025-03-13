import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "../Button";
import { signupValidationSchemas } from "../../lib/validation";
import { CheckCircle, CreditCard } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    period: "/month",
    features: [
      "Basic profile analysis",
      "3 AI-generated proposals per month",
      "Limited CV Builder access",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 15,
    period: "/month",
    features: [
      "Advanced profile optimization",
      "Unlimited AI proposals",
      "Priority support",
      "Custom training",
    ],
  },
  {
    id: "pro_3months",
    name: "Pro Plan (3 Months)",
    price: 36, // Discounted rate for 3 months
    period: "/3 months",
    features: [
      "Advanced profile optimization",
      "Unlimited AI proposals",
      "Priority support",
      "Custom training",
    ],
  },
];

interface PlanStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: {
    planType: "free" | "pro" | "pro_3months";
  };
  isLoading?: boolean;
}

export function PlanStep({
  onNext,
  onBack,
  initialData,
  isLoading = false,
}: PlanStepProps) {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.plan,
    onSubmit: (values) => {
      setIsCheckoutVisible(true);
    },
  });

  const selectedPlan = PLANS.find((plan) => plan.id === formik.values.planType);

  const handlePayment = () => {
    // Here you would integrate with your payment provider
    console.log("Processing payment for plan:", selectedPlan);
    onNext(formik.values);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {!isCheckoutVisible ? (
        <div>
          <label className="block text-sm font-medium text-upwork-gray mb-4">
            Choose Your Plan
          </label>
          <div className="space-y-4">
            {PLANS.map((plan) => {
              const isCurrentPlan = formik.values.planType === plan.id;

              return (
                <label
                  key={plan.id}
                  className={`relative flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-upwork-background transition-colors duration-200 ${
                    isCurrentPlan
                      ? "border-upwork-green bg-upwork-background"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="planType"
                      value={plan.id}
                      checked={isCurrentPlan}
                      onChange={() => {
                        formik.setFieldValue("planType", plan.id);
                        setIsCheckoutVisible(false);
                      }}
                      className="h-4 w-4 text-upwork-green focus:ring-upwork-green border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-upwork-gray">
                        {plan.name}
                      </span>
                      <span className="block text-sm text-upwork-gray-light">
                        ${plan.price}
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  <ul className="mt-2 ml-7 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-upwork-gray-light"
                      >
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </label>
              );
            })}
          </div>
          {formik.touched.planType && formik.errors.planType && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.planType}
            </p>
          )}

          <div className="flex bottom-0 pt-6 mt-6 border-t border-upwork-background bg-white">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full mr-2"
            >
              Back
            </Button>
            <Button type="submit" className="w-full ml-2">
              Continue Signup
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-6">
            <div className="bg-upwork-background rounded-lg p-6">
              <h3 className="text-lg font-semibold text-upwork-gray mb-4">
                Checkout Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-upwork-gray">{selectedPlan?.name}</span>
                  <span className="text-upwork-gray font-semibold">
                    ${selectedPlan?.price}
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-upwork-gray">
                    Included Features:
                  </h4>
                  <ul className="list-disc list-inside text-upwork-gray-light mt-2">
                    {selectedPlan?.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-upwork-gray-lighter pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-upwork-gray font-semibold">
                      Total
                    </span>
                    <span className="text-upwork-gray font-semibold">
                      ${selectedPlan?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Plan Warning */}
              {selectedPlan?.id === "free" && (
                <p className="mt-4 text-sm text-orange-600 bg-orange-100 p-2 rounded-lg">
                  You are starting with a <strong>Free Plan</strong>. After **3
                  days**, you will be automatically charged **$${PLANS[1].price}
                  /month** for the Pro Plan unless you cancel.
                </p>
              )}

              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handlePayment}
                  className="w-full flex items-center justify-center"
                  disabled={isLoading}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {isLoading ? "Processing..." : "Complete Payment"}
                </Button>
                <p className="text-xs text-upwork-gray-light text-center mt-2">
                  Secure payment powered by Revolut
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCheckoutVisible(false)}
              >
                Back to Plans
              </Button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
