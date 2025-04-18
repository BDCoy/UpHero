export interface RevolutOrder {
  id: string;
  token: string;
  type: "payment";
  state:
    | "pending"
    | "processing"
    | "authorised"
    | "completed"
    | "cancelled"
    | "failed";
  created_at: string;
  updated_at: string;
  amount: number;
  currency: string;
  outstanding_amount?: number;
  capture_mode: "automatic" | "manual";
  checkout_url: string;
  metadata: {
    endDate?: string;
    user_id?: string;
    email?: string;
    selectedPlan: string;
  };
  enforce_challenge: "automatic" | "manual";
  customer: {
    id: string;
    email?: string;
  };
}

export interface RevolutSubscription {
  id: string;
  user_id: string;
  revolut_order_id: string;
  payment_token: string;
  amount: number;
  currency: string;
  state: string;
  selected_plan: PLAN_IDS;
  checkout_url: string;
  created_at: string;
  updated_at: string;
  metadata: {
    endDate?: string;
    user_id?: string;
    email?: string;
    selectedPlan: string;
  };
}

export interface SubscriptionPlan {
  id: PLAN_IDS;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  profile_analysis_limit: number;
  cover_letter_limit: number;
  ats_optimizer_limit: number;
  proposal_generator_limit: number;
  client_messages_limit: number;
}

export type PLAN_IDS =
  | "free"
  | "freelancer"
  | "freelancer_pro"
  | "freelancer_agency";
