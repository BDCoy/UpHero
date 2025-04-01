import React from "react";
import { FormikProps } from "formik";
import { Button } from "@components/ui/Button";
import { SUBSCRIPTION_PLANS } from "@/lib/revolut/constants";
import { Clock, Star } from "lucide-react";
import { PLAN_IDS } from "@/lib/revolut";

interface PlanSelectionProps {
  formik: FormikProps<{
    planType: PLAN_IDS;
  }>;
  setIsCheckoutVisible: (visible: boolean) => void;
  onBack: () => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({
  formik,
  setIsCheckoutVisible,
  onBack,
}) => {
  const isSubmitDisabled = !formik.values.planType || !formik.isValid;

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Limited Time Offer - Save up to 50%
        </div>
        <h2 className="text-2xl font-bold text-upwork-gray">
          Choose Your Plan
        </h2>
        <p className="mt-2 text-upwork-gray-light">
          Unlock your freelancing potential today
        </p>
      </div>

      <div className="space-y-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentPlan = formik.values.planType === plan.id;
          const isFree = plan.id === "free";

          return (
            <label
              key={plan.id}
              className={`relative flex flex-col p-6 border rounded-xl cursor-pointer hover:border-upwork-green hover:bg-upwork-background transition-all duration-200 ${
                isCurrentPlan
                  ? "border-upwork-green bg-upwork-background ring-2 ring-upwork-green ring-opacity-50"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-upwork-green text-white text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <input
                  type="radio"
                  name="planType"
                  value={plan.id}
                  checked={isCurrentPlan}
                  onChange={() => {
                    formik.setFieldValue("planType", plan.id);
                    setIsCheckoutVisible(false);
                  }}
                  className="h-4 w-4 mt-1 text-upwork-green focus:ring-upwork-green border-gray-300"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-upwork-gray">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-bold text-upwork-gray">
                          ${plan.price}
                        </span>
                        <span className="ml-1 text-upwork-gray-light">
                          {plan.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isFree && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
                      <p className="text-sm text-orange-700">
                        Start with a <strong>Free Trial</strong>. After 3 days,
                        you'll be automatically charged{" "}
                        <strong>{SUBSCRIPTION_PLANS[1].price}$</strong> for the{" "}
                        {SUBSCRIPTION_PLANS[1].name} Plan unless you cancel.
                      </p>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-upwork-green flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 text-sm text-upwork-gray-light">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex bottom-0 pt-6 mt-6 border-t border-upwork-background bg-white">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full mr-2"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          className="w-full ml-2"
          disabled={isSubmitDisabled}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
