import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/Button";
import { CheckCircle, ArrowLeft, Star } from "lucide-react";
import { toast } from "../../lib/store";
import {
  getCurrentSubscription,
  PLAN_IDS,
  RevolutSubscription,
  SUBSCRIPTION_PLANS,
} from "@/lib/revolut";
import { useEffect, useState } from "react";
import { RevolutCheckoutProvider } from "@/lib/RevolutCheckoutContext";
import { CheckoutSummary } from "@/components/signup/CheckoutSummary";
import { useAuth } from "@/lib/AuthProvider";

export function SubscriptionChange() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSubscription, setCurrentSubscription] = useState<
    RevolutSubscription | undefined
  >();
  const [currentPlanId, setCurrentPlanId] = useState<PLAN_IDS | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<PLAN_IDS | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const fetchSubscription = async () => {
    setIsLoadingSubscription(true);
    const data = await getCurrentSubscription(user.id);
    if (!data) {
      toast.info("No subscription found");
    } else {
      if (data.state === "completed") {
        setCurrentSubscription(data);
        setCurrentPlanId(data.selected_plan);
      }
    }
    setIsLoadingSubscription(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  // Exclude free trial from selection
  const availablePlans = SUBSCRIPTION_PLANS;

  const handlePlanChange = async (planId: PLAN_IDS) => {
    if (planId === "free") {
      return;
    }
    setSelectedPlanId(planId);
    setIsCheckoutVisible(true);
  };

  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.id === selectedPlanId
  );

  const handlePaymentSuccess = () => {
    toast.info(`Processing payment for plan: ${selectedPlan?.name}`);
    toast.success("Plan updated successfully!");
    navigate("/dashboard/settings");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-upwork-gray">
            Upgrade Your Plan
          </h2>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Review our subscription options and select the one that fuels your
            growth.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center mt-4 md:mt-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Button>
      </div>

      {!isCheckoutVisible ? (
        <div className="py-10">
          <div className="grid grid-cols-1 gap-6  m-auto lg:grid-cols-4">
            {availablePlans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlanId;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-lg border ${
                    plan.popular
                      ? "border-upwork-green shadow-lg scale-105 z-10"
                      : "border-upwork-gray-lighter"
                  } bg-white overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-5 right-2 -translate-y-1/2">
                      <div className="inline-flex items-center rounded-full bg-upwork-green px-2 py-1 text-xs font-semibold text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-upwork-gray">
                      {plan.name}
                    </h3>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-upwork-gray">
                        {plan.price}$
                      </span>
                      <span className="text-upwork-gray-light">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-upwork-green flex-shrink-0" />
                          <span className="ml-3 text-sm text-upwork-gray-light">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button
                        variant={isCurrentPlan ? "outline" : "primary"}
                        className="w-full"
                        disabled={isCurrentPlan || plan.id === "free"}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        {isCurrentPlan
                          ? "Current Plan"
                          : plan.id === "free"
                          ? "Expired"
                          : "Upgrade"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-lg bg-upwork-background p-6">
            <h3 className="text-lg font-medium text-upwork-gray">
              Need help choosing?
            </h3>
            <p className="mt-2 text-sm text-upwork-gray-light">
              Our team is here to help you find the perfect plan for your needs.
              Contact us at{" "}
              <a
                href="mailto:support@uphero.io"
                className="text-upwork-green hover:text-upwork-green-dark"
              >
                support@uphero.io
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="py-10">
          <div className="sm:max-w-xl m-auto">
            <RevolutCheckoutProvider
              selectedPlan={selectedPlanId || "free"}
              handlePaymentSuccess={handlePaymentSuccess}
              currentSubscription={currentSubscription}
            >
              <CheckoutSummary
                selectedPlan={selectedPlan}
                isLoading={isLoadingSubscription}
                setIsCheckoutVisible={setIsCheckoutVisible}
              />
            </RevolutCheckoutProvider>
          </div>
        </div>
      )}
    </div>
  );
}
