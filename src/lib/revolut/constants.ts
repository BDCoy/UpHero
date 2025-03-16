import { SubscriptionPlan } from "./types";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    period: "/3 days",
    features: [
      "Basic profile analysis",
      "3 AI-generated proposals",
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
      "Analytics dashboard",
      "Premium templates",
    ],
    popular: true
  },
  {
    id: "pro_3months",
    name: "Pro Plan (3 Months)",
    price: 45,
    period: "/3 months",
    features: [
      "Everything in Pro Plan",
      "Save 13% vs monthly",
      "Priority feature access",
      "Advanced analytics",
      "Dedicated success manager",
      "Custom API access",
    ],
  },
  
];