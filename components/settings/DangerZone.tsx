import React from 'react';
import { Button } from '../ui/Button';

interface DangerZoneProps {
  onDeleteAccount: () => void;
}

export function DangerZone({ onDeleteAccount }: DangerZoneProps) {
  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
      <div className="mt-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-red-800">Delete Account</p>
              <p className="text-sm text-red-700">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 w-full sm:w-auto"
              onClick={onDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}