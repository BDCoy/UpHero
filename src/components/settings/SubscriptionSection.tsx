import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

interface SubscriptionSectionProps {
  onCancelSubscription: () => void;
}

export function SubscriptionSection({ onCancelSubscription }: SubscriptionSectionProps) {
  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h3 className="text-lg font-medium text-upwork-gray">Subscription Management</h3>
      <div className="mt-4">
        <div className="rounded-lg border border-upwork-gray-lighter bg-white p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-upwork-gray">Current Plan: Pro</p>
              <p className="text-sm text-upwork-gray-light">Billed monthly</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={onCancelSubscription}
              >
                Cancel Subscription
              </Button>
              <Link to="/dashboard/settings/subscription/change">
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}