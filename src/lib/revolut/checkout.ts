import RevolutCheckout from "@revolut/checkout";
import { ENVIRONMENT } from "@/env";
import { RevolutOrder } from "./types";
import {
  PaymentRequestPaymentMethod,
  PaymentsModulePaymentRequestOptions,
} from "@revolut/checkout/types/types";

const REVOLUT_PUBLIC_KEY = ENVIRONMENT.isProduction
  ? import.meta.env.VITE_REVOLUT_PROD_PUBLIC_KEY
  : import.meta.env.VITE_REVOLUT_DEV_PUBLIC_KEY;


export const setupRevolutCheckout = async () => {
  try {
    const mode = ENVIRONMENT.isProduction ? "prod" : "sandbox";
    const checkout = await RevolutCheckout.payments({
      locale: "en",
      mode: mode,
      publicToken: REVOLUT_PUBLIC_KEY,
    });

    console.log("Revolut Checkout initialized successfully");
    return checkout;
  } catch (error) {
    console.error("Error setting up Revolut Checkout:", error);
    throw new Error("Failed to set up Revolut Checkout");
  }
};

export const createPaymentRequest = async (
  target: HTMLElement,
  amount: number,
  currency: string = "USD",
  paymentMethod: PaymentRequestPaymentMethod,
  order: RevolutOrder,
  onEvent: (eventType: string, orderId: string) => void
) => {
  try {
    const isProd = ENVIRONMENT.isProduction;
    const mode = isProd ? "prod" : "sandbox";
    const { paymentRequest } = await RevolutCheckout.payments({
      locale: "en",
      mode,
      publicToken: REVOLUT_PUBLIC_KEY,
    });

    const options: PaymentsModulePaymentRequestOptions = {
      currency,
      amount: Math.round(amount * 100), // Convert to cents
      createOrder: async () => ({ publicId: order.token }),
      onSuccess() {
        console.log("Payment was successful!");
        onEvent("success", order.id);
      },
      onError(error: unknown) {
        console.error("Payment failed:", error);
        onEvent("error", order.id);
      },
      onCancel() {
        console.log("Payment was cancelled.");
        onEvent("cancel", order.id);
      },
      preferredPaymentMethod: paymentMethod,
      savePaymentMethodFor: "merchant",
    };

    const instance = paymentRequest(target, options);
    const method = await instance.canMakePayment();
    return { instance, method };
  } catch (error) {
    console.error("Error creating payment request:", error);
    throw error;
  }
};
