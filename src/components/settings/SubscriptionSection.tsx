import { Link } from "react-router-dom";
import { Button } from "../Button";
import { RevolutSubscription, SUBSCRIPTION_PLANS } from "@/lib/revolut";

interface SubscriptionSectionProps {
  subscription: RevolutSubscription | null;
  onCancelSubscription: (id: string) => void;
  onReactivateSubscription: (id: string) => void;
  loading: boolean;
}

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export function SubscriptionSection({
  subscription,
  onCancelSubscription,
  onReactivateSubscription,
  loading,
}: SubscriptionSectionProps) {
  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.id === subscription?.selected_plan
  );

  if (loading) {
    return <div>Loading subscription...</div>;
  }

  let isExpired = false;
  let nextBillingDate: string | null = null;
  const isCancelled = subscription?.state === "cancelled";

  if (subscription?.metadata?.endDate) {
    const endDate = new Date(subscription.metadata.endDate);
    const currentDate = new Date();
    isExpired = endDate.getTime() < currentDate.getTime();

    nextBillingDate = endDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h3 className="text-lg font-semibold text-upwork-gray">
        Subscription Management
      </h3>

      {selectedPlan && subscription ? (
        <div className="mt-6">
          <div className="bg-white rounded-lg border border-upwork-gray-lighter p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-upwork-gray">
                  Current Plan:{" "}
                  <span className="font-semibold">{selectedPlan.name}</span>
                </p>
                <p className="text-sm text-upwork-gray-light">
                  Price:{" "}
                  <span className="font-semibold">${selectedPlan.price}</span>{" "}
                  {subscription.currency} {selectedPlan.period}
                </p>

                {/* Next Billing Date */}
                {nextBillingDate && !isExpired && !isCancelled && (
                  <p className="text-sm text-upwork-gray-light mt-2">
                    <span className="font-semibold">Next Billing Date:</span>{" "}
                    {nextBillingDate}
                  </p>
                )}

                {/* Subscription State Badge */}
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      subscription.state === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : subscription.state === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {capitalize(subscription.state)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
                {/* Cancel/Reactivate Buttons */}
                {!isCancelled && !isExpired && (
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => onCancelSubscription(subscription.id)}
                  >
                    Cancel Subscription
                  </Button>
                )}
                {isCancelled && !isExpired && (
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => onReactivateSubscription(subscription.id)}
                  >
                    Reactivate
                  </Button>
                )}

                {/* Change Plan Button */}
                <Link to="/dashboard/settings/subscription/upgrade">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {isExpired ? "Choose a Plan" : "Upgrade Plan"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex justify-between items-center gap-4">
          <p className="text-sm text-upwork-gray-light">
            No active subscription found.
          </p>
          <Link to="/dashboard/settings/subscription/upgrade">
            <Button variant="outline" className="w-full sm:w-auto">
              Choose a Plan
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
