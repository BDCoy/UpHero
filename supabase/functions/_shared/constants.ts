import { SubscriptionPlan } from "./interfaces.ts";

// API URLs
export const sandboxApiUrl = "https://sandbox-merchant.revolut.com/api";
export const prodApiUrl = "https://merchant.revolut.com/api";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    period: "/month",
    features: [
      "Basic profile analysis",
      "3 AI-generated proposals per month",
      "Limited CV Builder access",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 18,
    period: "/month",
    features: [
      "Advanced profile optimization",
      "Unlimited AI proposals",
      "Priority support",
      "Custom training",
    ],
    popular: true,
  },
  {
    id: "pro_3months",
    name: "Pro Plan (3 Months)",
    price: 45,
    period: "/3 months",
    features: [
      "Advanced profile optimization",
      "Unlimited AI proposals",
      "Priority support",
      "Custom training",
    ],
  },
];
