"use client";

import { useEffect, useState } from "react";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/Button";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleDashboardNavigation = () => {
    router.push("/dashboard");
  };

  // Trigger the animation on component mount
  useEffect(() => {
    // Set visibility to true after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthLayout>
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-upwork-background">
        <div
          className={`
            bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center
            transform transition-all duration-300 ease-out
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          {/* Success icon */}
          <CheckCircle className="w-16 h-16 text-upwork-green mx-auto mb-4" />

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-upwork-gray mb-2">
            Payment Confirmed!
          </h2>

          {/* Description */}
          <p className="text-sm text-upwork-gray-light mb-6 my-4">
            Your payment has been processed successfully. Thank you for your
            purchase.
          </p>

          {/* Button */}
          <Button
            type="button"
            className="w-full"
            onClick={handleDashboardNavigation}
          >
            Go to Dashboard
          </Button>
        </div>
      </main>
    </AuthLayout>
  );
}
