import { ENVIRONMENT } from "@/env";
import { supabase } from "../supabase";
import { PLAN_IDS, RevolutOrder } from "./types";
import { User } from "@supabase/supabase-js";

export const initiateOrder = async (
  amount: number,
  currency: string,
  user: User,
  metadata: {
    selectedPlan: PLAN_IDS;
    endDate: string;
    email?: string;
    user_id?: string;
  },
  isManual: boolean = false
): Promise<RevolutOrder> => {
  try {
    const isProd = ENVIRONMENT.isProduction;
    const orderData = {
      amount,
      currency,
      user,
      metadata,
      isManual,
      environment: isProd ? "production" : "development",
    };

    const { data, error } = await supabase.functions.invoke(
      "create-order", // Changed edge function name here
      {
        body: orderData,
      }
    );

    if (error) {
      throw new Error(error);
    }

    return data.order;
  } catch (error) {
    console.error("Error initiating Revolut order:", error);
    throw new Error("Failed to initiate Revolut order");
  }
};
