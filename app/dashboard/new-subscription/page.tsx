"use client";

import { createClient } from "@/utils/supabase/client";
import {
  getProducts,
  getSubscription,
  getUserDetails,
} from "@/utils/supabase/queries";
import { useCallback, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import PricingSection from "@/components/ui/AuthForms/signup/PricingSection";
import { useRouter } from "next/navigation";

export default function NewSubscription() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);

  const onNext = useCallback(async () => {
    router.push("/dashboard/settings");
  }, [router]);

  const getData = useCallback(async () => {
    try {
      const [userData, productsData, subscriptionData] = await Promise.all([
        getUserDetails(supabase),
        getProducts(supabase),
        getSubscription(supabase),
      ]);

      setUser(userData);
      setSubscription(subscriptionData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (subscription) {
      if (subscription.status === "active") {
        onNext();
      }
    }
  }, [onNext, subscription]);

  const onBack = () => {
    router.push("/dashboard/settings");
  };

  return (
    <div className="bg-white rounded-lg">
      <PricingSection
        user={user}
        onBack={onBack}
        products={products ?? []}
        subscription={subscription}
      />
    </div>
  );
}
