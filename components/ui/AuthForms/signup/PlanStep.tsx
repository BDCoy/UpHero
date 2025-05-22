import { createClient } from "@/utils/supabase/client";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import type { SignupFormData } from "@lib/validation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import PricingSection from "./PricingSection";

interface PlanStepProps {
  onNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
  initialData: SignupFormData;
  isLoading?: boolean;
}

export function PlanStep({ onNext, onBack, initialData }: PlanStepProps) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);

  const getData = async () => {
    const [user, products, subscription] = await Promise.all([
      getUser(supabase),
      getProducts(supabase),
      getSubscription(supabase),
    ]);
    setUser(user);
    setProducts(products);
    setSubscription(subscription);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (subscription) {
      if (subscription.status === "active") {
        onNext(initialData);
      }
    }
  }, [subscription]);

  return (
    <PricingSection
      user={user}
      onBack={onBack}
      products={products ?? []}
      subscription={subscription}
    />
  );
}
