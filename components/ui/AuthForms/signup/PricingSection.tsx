import React, { useState } from "react";
import { Clock } from "lucide-react";
import PricingCard from "./PricingCard";
import { formatCurrency } from "@/utils/formatters";
import { getStripe } from "@/utils/stripe/client";
import { getErrorRedirect } from "@/utils/helpers";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types_db";
import { Button } from "../../Button";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  onBack: () => void;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

const PricingSection: React.FC<Props> = ({
  onBack,
  user,
  products,
  subscription,
}: Props) => {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/signin/signup");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  const getPopularProduct = () => {
    // Find a product with metadata.popular = true, or return the middle product if there are 3 or more
    const popular = products.find(
      (product) =>
        product.metadata && Boolean(product.metadata.popular) === true
    );
    if (popular) return popular.id;

    return products.length >= 3 ? products[1].id : null;
  };

  const popularProductId = getPopularProduct();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Limited Time Offer - Save up to 50%
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Choose Your Plan</h2>
        <p className="mt-2 text-gray-600">
          Unlock your freelancing potential today
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative self-center bg-gray-100 rounded-lg p-0.5 flex border border-gray-200">
          {intervals.includes("month") && (
            <button
              onClick={() => setBillingInterval("month")}
              type="button"
              className={`${
                billingInterval === "month"
                  ? "relative bg-white border-gray-200 shadow-sm text-gray-800"
                  : "text-gray-500"
              } rounded-md m-1 py-2 px-6 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            >
              Monthly billing
            </button>
          )}
          {intervals.includes("year") && (
            <button
              onClick={() => setBillingInterval("year")}
              type="button"
              className={`${
                billingInterval === "year"
                  ? "relative bg-white border-gray-200 shadow-sm text-gray-800"
                  : "text-gray-500"
              } rounded-md m-1 py-2 px-6 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            >
              Yearly billing
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
        {products
          .map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            return { product, price };
          })
          // Filter out products without a price for the billingInterval
          .filter(({ price }) => price !== undefined && price !== null)
          // Sort by unit_amount ascending (lowest to highest)
          .sort(
            (a, b) => (a.price!.unit_amount || 0) - (b.price!.unit_amount || 0)
          )
          // Now map to JSX
          .map(({ product, price }) => {
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price!.currency!,
              minimumFractionDigits: 0,
            }).format((price!.unit_amount || 0) / 100);

            const isPopular = product.id === popularProductId;
            const isFree = price!.unit_amount === 0;

            return (
              <PricingCard
                key={product.id}
                product={product}
                price={price}
                formattedPrice={priceString}
                billingInterval={billingInterval}
                isPopular={isPopular}
                isFree={isFree}
                isSelected={selectedPrice?.id === price!.id}
                onSelect={() => setSelectedPrice(price!)}
              />
            );
          })}
      </div>

      <div className="pt-6 mt-6 border-t ">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!selectedPrice}
            onClick={() => selectedPrice && handleStripeCheckout(selectedPrice)}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
