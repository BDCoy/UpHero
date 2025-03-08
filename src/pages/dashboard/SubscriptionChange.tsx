import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from '../../lib/store';

const PLANS = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '$0',
    period: '/14 days',
    features: ['Basic profile analysis', '3 AI proposals', 'Community support'],
    description: 'Perfect for trying out our features'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: [
      'Advanced profile optimization',
      'Unlimited AI proposals',
      'Priority support',
      'Custom training',
      'Analytics dashboard'
    ],
    description: 'Most popular for freelancers',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro',
      'White-label reports',
      'API access',
      'Dedicated success manager',
      'Custom integrations',
      'Team collaboration'
    ],
    description: 'Best for agencies and teams'
  }
];

export function SubscriptionChange() {
  const navigate = useNavigate();
  const currentPlan = 'pro'; // This would come from your user's profile

  const handlePlanChange = async (planId: string) => {
    try {
      // Here you would implement the actual plan change logic
      // For now, we'll just show a success message
      toast.success('Plan updated successfully!');
      navigate('/dashboard/settings');
    } catch (error) {
      toast.error('Failed to update plan. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-upwork-gray">Change Subscription</h2>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Choose the plan that best fits your needs
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/settings')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan;
          
          return (
            <div
              key={plan.id}
              className={`relative rounded-lg border ${
                plan.popular
                  ? 'border-upwork-green shadow-lg scale-105 z-10'
                  : 'border-upwork-gray-lighter'
              } bg-white overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <div className="inline-flex items-center rounded-full bg-upwork-green px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-upwork-gray">{plan.name}</h3>
                <p className="mt-1 text-sm text-upwork-gray-light">{plan.description}</p>
                
                <div className="mt-4">
                  <span className="text-3xl font-bold text-upwork-gray">{plan.price}</span>
                  <span className="text-upwork-gray-light">{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-upwork-green flex-shrink-0" />
                      <span className="ml-3 text-sm text-upwork-gray-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={isCurrentPlan ? 'outline' : 'primary'}
                    className="w-full"
                    disabled={isCurrentPlan}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Switch to ' + plan.name}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg bg-upwork-background p-6">
        <h3 className="text-lg font-medium text-upwork-gray">Need help choosing?</h3>
        <p className="mt-2 text-sm text-upwork-gray-light">
          Our team is here to help you find the perfect plan for your needs. Contact us at{' '}
          <a href="mailto:support@uphero.io" className="text-upwork-green hover:text-upwork-green-dark">
            support@uphero.io
          </a>
        </p>
      </div>
    </div>
  );
}