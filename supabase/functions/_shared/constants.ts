import { SubscriptionPlan } from "./interfaces.ts";

// API URLs
export const sandboxApiUrl = "https://sandbox-merchant.revolut.com/api";
export const prodApiUrl = "https://merchant.revolut.com/api";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    period: "/3 days",
    features: [
      "3 Profile Analyses",
      "10 Proposals / Month",
      "5 ATS Scans / Month",
      "3 Cover Letters / Month",
      "15 Client Responses / Month",
      "Email Support",
    ],
  },
  {
    id: "freelancer",
    name: "Freelancer",
    price: 12,
    period: "/month",
    features: [
      "10 Profile Analyses",
      "50 Proposals / Month",
      "20 ATS Scans / Month",
      "10 Cover Letters / Month",
      "50 Client Responses / Month",
      "Personalized Training",
      "Email Support",
      "Community Access",
    ],
  },
  {
    id: "freelancer_pro",
    name: "Freelancer Pro",
    price: 25,
    period: "/month",
    features: [
      "50 Profile Analyses",
      "250 Proposals / Month",
      "100 ATS Scans / Month",
      "50 Cover Letters / Month",
      "100 Client Responses / Month",
      "Personalized Training",
      "Priority Support",
      "Exclusive Community",
    ],
    popular: true,
  },
  {
    id: "freelancer_agency",
    name: "Freelancer Agency",
    price: 58,
    period: "/month",
    features: [
      "100 Profile Analyses",
      "1500 Proposals / Month",
      "500 ATS Scans / Month",
      "200 Cover Letters / Month",
      "200 Client Responses / Month",
      "Personalized Training",
      "1-on-1 Support",
      "Elite Community",
    ],
  },
];