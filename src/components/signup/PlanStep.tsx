import React from 'react';
import { useFormik } from 'formik';
import { Button } from '../Button';
import { signupValidationSchemas } from '../../lib/validation';

const PLANS = [
  { 
    id: 'free',
    name: 'Free Trial',
    price: '$0',
    period: '/14 days',
    features: ['Basic profile analysis', '3 AI proposals', 'Community support']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: ['Advanced profile optimization', 'Unlimited AI proposals', 'Priority support', 'Custom training']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: ['White-label reports', 'API access', 'Dedicated success manager', 'Custom integrations']
  }
];

interface PlanStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: {
    planType: 'free' | 'pro' | 'enterprise';
  };
  isLoading?: boolean;
}

export function PlanStep({ onNext, onBack, initialData, isLoading = false }: PlanStepProps) {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.plan,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-upwork-gray mb-4">
          Choose Your Plan
        </label>
        <div className="space-y-4">
          {PLANS.map((plan) => (
            <label
              key={plan.id}
              className={`relative flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-upwork-background transition-colors duration-200 ${
                formik.values.planType === plan.id
                  ? 'border-upwork-green bg-upwork-background'
                  : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="planType"
                  value={plan.id}
                  checked={formik.values.planType === plan.id}
                  onChange={() => formik.setFieldValue('planType', plan.id)}
                  className="h-4 w-4 text-upwork-green focus:ring-upwork-green border-gray-300"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-upwork-gray">
                    {plan.name}
                  </span>
                  <span className="block text-sm text-upwork-gray-light">
                    {plan.price}{plan.period}
                  </span>
                </div>
              </div>
              <ul className="mt-2 ml-7 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-xs text-upwork-gray-light">
                    • {feature}
                  </li>
                ))}
              </ul>
            </label>
          ))}
        </div>
        {formik.touched.planType && formik.errors.planType && (
          <p className="mt-2 text-sm text-red-600">{formik.errors.planType}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting || isLoading}>
          {isLoading ? 'Completing signup...' : 'Complete Sign Up'}
        </Button>
      </div>
    </form>
  );
}