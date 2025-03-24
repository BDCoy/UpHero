/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
// Assuming these are correctly imported from your utils
import RevolutCheckout, {
  getRevolutPayOrderIdURLParam,
} from "@revolut/checkout";
import { PLAN_IDS, RevolutOrder, RevolutSubscription } from "./revolut/types";
import { RevolutPaymentsModuleInstance } from "@revolut/checkout";
import { createPaymentRequest, setupRevolutCheckout } from "./revolut/checkout";
import { supabase } from "./supabase";
import { ENVIRONMENT } from "@/env";
import {
  getLatestPendingSubscription,
  modifySubscriptionStatus,
  registerSubscription,
  verifyPaymentStatus,
} from "./revolut/subscriptions";
import { SUBSCRIPTION_PLANS } from "./revolut/constants";
import calculateEndDate from "@/utils/calculateEndDate";
import { initiateOrder } from "./revolut/api";
import { PaymentRequestPaymentMethod } from "@revolut/checkout/types/types";
import { toast } from "./store";

// Context types
interface RevolutCheckoutContextType {
  handlePayWithCard: (event: { preventDefault: () => void }) => void;
  revolutPayRef: React.RefObject<HTMLDivElement>;
  paymentAppleRequestRef: React.RefObject<HTMLDivElement>;
  paymentGoogleRequestRef: React.RefObject<HTMLDivElement>;
}

// Create context
const RevolutCheckoutContext = createContext<RevolutCheckoutContextType | null>(
  null
);

// Context provider
export const RevolutCheckoutProvider = ({
  children,
  selectedPlan,
  handlePaymentSuccess,
  currentSubscription,
}: {
  children: React.ReactNode;
  selectedPlan: PLAN_IDS;
  handlePaymentSuccess: () => void;
  currentSubscription?: RevolutSubscription | undefined;
}) => {
  const revolutPublicOrderId = getRevolutPayOrderIdURLParam();
  const [order, setOrder] = useState<RevolutOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revolutCheckout, setRevolutCheckout] =
    useState<RevolutPaymentsModuleInstance | null>(null);

  const revolutPayRef = useRef<HTMLDivElement>(null);
  const paymentAppleRequestRef = useRef<HTMLDivElement>(null);
  const paymentGoogleRequestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const checkout = await setupRevolutCheckout();
        setRevolutCheckout(checkout);
        console.log("Revolut checkout initialized successfully");
      } catch (initError) {
        console.error("Failed to initialize Revolut checkout:", initError);
        setError("Failed to initialize payment system. Please try again.");
      }
    };

    initCheckout();
  }, []);

  useEffect(() => {
    const orderId = revolutPublicOrderId || (order && order.id);

    if (!orderId) {
      console.error("Order ID not found.");
      return;
    }

    // Async function to fetch the payment status
    const fetchPaymentStatus = async () => {
      try {
        // Pass the order ID to verifyPaymentStatus function
        const state = await verifyPaymentStatus(orderId);

        // Redirect or set error based on the state
        if (state === "completed") {
          handlePaymentSuccess(); // Trigger payment completion handling
        } else if (state === "failed" || state === "cancelled") {
          setError("Payment failed or cancelled. Please try again."); // Set error message
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setError("An error occurred while fetching payment status.");
      }
    };

    fetchPaymentStatus(); // Call the async function to fetch payment status
  }, [
    handlePaymentSuccess,
    revolutPublicOrderId,
    order?.id,
    revolutCheckout,
    order,
  ]); // Dependencies: handlePayment, orderId, and revolutCheckout

  useEffect(() => {
    const mountPaymentForm = async () => {
      if (!revolutCheckout || selectedPlan === "free" || !revolutPayRef.current)
        return;
      try {
        const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);
        if (!plan) return;

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setError("Please sign in to continue");
          return;
        }
        const metadata = {
          selectedPlan,
          endDate: calculateEndDate(selectedPlan),
          email: user.email,
          user_id: user.id,
        };
        const existingSubscription = await getLatestPendingSubscription(
          selectedPlan
        );
        let newOrder: RevolutOrder;
        if (existingSubscription) {
          console.log("Using existing pending subscription");

          newOrder = {
            id: existingSubscription.revolut_order_id,
            token: existingSubscription.payment_token,
            type: "payment",
            state: "pending",
            created_at: existingSubscription.created_at,
            updated_at: existingSubscription.updated_at,
            amount: existingSubscription.amount,
            currency: "USD",
            capture_mode: "automatic",
            checkout_url: existingSubscription.checkout_url,
            metadata,
            enforce_challenge: "automatic", // Default to "automatic"
            customer: {
              id: user.id,
              email: user.email,
            },
          };
        } else {
          newOrder = await initiateOrder(plan.price, "USD", user, metadata);
          const { error } = await registerSubscription(user.id, newOrder);
          if (error) {
            setError("Error saving info in database");
            return;
          }
        }

        setOrder(newOrder);
        const { revolutPay } = revolutCheckout;

        const paymentOptions = {
          currency: "USD",
          totalAmount: Math.round(plan.price * 100),
          savePaymentMethodForMerchant: true,
          createOrder: async () => {
            try {
              return { publicId: newOrder.token };
            } catch (createOrderError) {
              console.error("Error in createOrder callback:", createOrderError);
              throw createOrderError;
            }
          },
          customer: {
            email: user.email,
          },
        };
        revolutPayRef.current.innerHTML = "";
        revolutPay.mount(revolutPayRef.current, paymentOptions);

        revolutPay.on("payment", async (event) => {
          return await handlePaymentEvent(event.type, newOrder.id);
        });
        initPaymentRequest(newOrder, "googlePay", paymentGoogleRequestRef);
        initPaymentRequest(newOrder, "applePay", paymentAppleRequestRef);
      } catch (error) {
        console.error("Error mounting payment form:", error);
        setError("Failed to initialize payment form. Please try again.");
      }
    };

    const initPaymentRequest = async (
      orderParams: RevolutOrder,
      paymentMethod: PaymentRequestPaymentMethod,
      paymentRequestRef: React.RefObject<HTMLDivElement>
    ) => {
      if (!paymentRequestRef.current || selectedPlan === "free") return;
      paymentRequestRef.current.innerHTML = "";

      try {
        const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);
        if (!plan) return;

        const { instance, method } = await createPaymentRequest(
          paymentRequestRef.current,
          plan.price,
          "USD",
          paymentMethod,
          orderParams,
          handlePaymentEvent
        );

        if (method) {
          instance.render();
        } else {
          instance.destroy();
        }
      } catch (error) {
        console.error("Failed to initialize payment request:", error);
        setError("Failed to initialize payment methods. Please try again.");
      }
    };
    mountPaymentForm();
  }, [revolutCheckout, selectedPlan]);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
    }
  }, [error]);

  const handlePaymentEvent = async (eventType: string, orderId: string) => {
    switch (eventType) {
      case "success": {
        if (currentSubscription) {
          const { error } = await modifySubscriptionStatus(
            currentSubscription.revolut_order_id,
            "cancelled"
          );
          if (error) {
            setError("Error: failed to modify subscription status");
            return;
          }
        }
        const { error } = await modifySubscriptionStatus(orderId, "completed");
        if (error) {
          setError("Error: failed to modify subscription status");
          return;
        }
        handlePaymentSuccess();
        break;
      }
      case "error": {
        const { error: err } = await modifySubscriptionStatus(
          orderId,
          "failed"
        );
        if (err) {
          setError("Error: failed to modify subscription status");
          return;
        }
        break;
      }
      case "cancel":
        setError("Please complete your payment to continue.");
        break;
      default:
        console.log("Unhandled event:", eventType);
    }
  };

  const handlePayWithCard = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Please sign in to continue");
      return;
    }

    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);
    if (!plan) return;

    const metadata = {
      selectedPlan,
      endDate: calculateEndDate(selectedPlan),
      email: user.email,
      user_id: user.id,
    };

    const existingSubscription = await getLatestPendingSubscription(
      selectedPlan
    );
    let newOrder: RevolutOrder;
    if (existingSubscription) {
      console.log("Using existing pending subscription");

      newOrder = {
        id: existingSubscription.revolut_order_id,
        token: existingSubscription.payment_token,
        type: "payment",
        state: "pending",
        created_at: existingSubscription.created_at,
        updated_at: existingSubscription.updated_at,
        amount: existingSubscription.amount,
        currency: "USD",
        capture_mode: "automatic",
        checkout_url: existingSubscription.checkout_url,
        metadata,
        enforce_challenge: "automatic",
        customer: {
          id: user.id,
          email: user.email,
        },
      };
    } else {
      newOrder = await initiateOrder(plan.price, "USD", user, metadata);

      const { error } = await registerSubscription(user.id, newOrder);
      if (error) {
        setError("Error saving info in database");
        return;
      }
    }

    const isProd = ENVIRONMENT.isProduction;
    const mode = isProd ? "prod" : "sandbox";
    const RC = await RevolutCheckout(newOrder.token, mode);

    RC.payWithPopup({
      email: user?.email,
      savePaymentMethodFor: "merchant",
      onSuccess() {
        handlePaymentEvent("success", newOrder.id);
      },
      onError() {
        handlePaymentEvent("error", newOrder.id);
      },
      onCancel() {
        handlePaymentEvent("cancel", newOrder.id);
      },
    });
  };

  return (
    <RevolutCheckoutContext.Provider
      value={{
        handlePayWithCard,
        revolutPayRef,
        paymentAppleRequestRef,
        paymentGoogleRequestRef,
      }}
    >
      {children}
    </RevolutCheckoutContext.Provider>
  );
};

export const useRevolutCheckout = () => {
  const context = useContext(RevolutCheckoutContext);
  if (!context) {
    throw new Error(
      "useRevolutCheckout must be used within a RevolutCheckoutProvider"
    );
  }
  return context;
};
