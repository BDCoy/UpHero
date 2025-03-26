import { useState } from "react";
import { useFormik } from "formik";

import { signupValidationSchemas } from "../../lib/validation";

import { PlanSelection } from "./PlanSelection";
import { CheckoutSummary } from "./CheckoutSummary";
import { SUBSCRIPTION_PLANS } from "@/lib/revolut/constants";
import { RevolutCheckoutProvider } from "@/lib/RevolutCheckoutContext";
import { PLAN_IDS } from "@/lib/revolut";
import { toast } from "@/lib/store";

import type { SignupFormData } from "@lib/validation";

interface PlanStepProps {
  onNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
  initialData: {
    planType: PLAN_IDS;
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
    onSubmit: () => setIsCheckoutVisible(true),
  });

  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.id === formik.values.planType
  );

  const handlePaymentSuccess = () => {
    toast.info(`Processing payment for plan: ${selectedPlan?.name}`);
    onNext(formik.values);
  };
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {!isCheckoutVisible ? (
        <PlanSelection
          formik={formik}
          setIsCheckoutVisible={setIsCheckoutVisible}
          onBack={onBack}
        />
      ) : (
        <RevolutCheckoutProvider
          selectedPlan={selectedPlan?.id || "free"}
          handlePaymentSuccess={handlePaymentSuccess}
        >
          <CheckoutSummary
            selectedPlan={selectedPlan}
            isLoading={isLoading}
            setIsCheckoutVisible={setIsCheckoutVisible}
          />
        </RevolutCheckoutProvider>
      )}
    </form>
  );
}
