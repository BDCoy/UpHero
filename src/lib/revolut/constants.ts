import { SubscriptionPlan } from "./types";

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
