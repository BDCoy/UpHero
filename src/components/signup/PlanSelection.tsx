import React from "react";
import { useFormik } from "formik";
import { Button } from "../Button";
import { SUBSCRIPTION_PLANS } from "@/lib/revolut/constants";

interface PlanSelectionProps {
  formik: ReturnType<typeof useFormik>;
  setIsCheckoutVisible: (visible: boolean) => void;
  onBack: () => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({ formik, setIsCheckoutVisible, onBack }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-upwork-gray mb-4">Choose Your Plan</label>
      <div className="space-y-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrentPlan = formik.values.planType === plan.id;

          return (
            <label
              key={plan.id}
              className={`relative flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-upwork-background transition-colors duration-200 ${
                isCurrentPlan ? "border-upwork-green bg-upwork-background" : "border-gray-300"
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
                  <span className="block text-sm font-medium text-upwork-gray">{plan.name}</span>
                  <span className="block text-sm text-upwork-gray-light">${plan.price}{plan.period}</span>
                </div>
              </div>
              <ul className="mt-2 ml-7 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-xs text-upwork-gray-light">• {feature}</li>
                ))}
              </ul>
            </label>
          );
        })}
      </div>

      {formik.touched.planType && formik.errors.planType && (
        <p className="mt-2 text-sm text-red-600">{formik.errors.planType}</p>
      )}

      <div className="flex bottom-0 pt-6 mt-6 border-t border-upwork-background bg-white">
        <Button type="button" variant="outline" onClick={onBack} className="w-full mr-2">Back</Button>
        <Button type="submit" className="w-full ml-2">Continue Signup</Button>
      </div>
    </div>
  );
};
