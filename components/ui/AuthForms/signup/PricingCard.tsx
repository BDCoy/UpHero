import React from "react";
import { Star } from "lucide-react";
import { Tables } from "@/types_db";

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
type BillingInterval = "lifetime" | "year" | "month";

interface PricingCardProps {
  product: ProductWithPrices;
  price: Price;
  formattedPrice: string;
  billingInterval: BillingInterval;
  isPopular: boolean;
  isFree: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  product,
  price,
  formattedPrice,
  billingInterval,
  isPopular,
  isFree,
  isSelected,
  onSelect,
}) => {
  // Extract and clean the features string if it exists
  const extractFeatures = (featuresString: string | undefined) => {
    if (!featuresString || typeof featuresString !== "string") {
      return []; // Return empty array if features string is not available or not a string
    }

    // Clean the features string by removing "features:" and extra characters
    const cleanedString = featuresString
      .replace(/^features:\s*\[/, "[") // Remove "features:" prefix
      .replace(/,\s*]$/, "]"); // Remove any trailing commas before closing bracket

    // Try to parse the cleaned string as JSON
    let features = [];
    try {
      features = JSON.parse(cleanedString); // Parse the cleaned string into an array
    } catch (error) {
      console.error("Error parsing features:", error);
      return []; // Return empty array if JSON parsing fails
    }

    return features;
  };

  const features = extractFeatures(product.metadata?.features);

  return (
    <label
      className={`relative flex flex-col p-6 border rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-200 ${
        isSelected
          ? "border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50"
          : "border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 right-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </div>
        </div>
      )}

      <div className="flex items-start">
        <input
          type="radio"
          name="planType"
          value={price.id}
          checked={isSelected}
          onChange={onSelect}
          className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 border-gray-300"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-gray-800">
                  {formattedPrice}
                </span>
                <span className="ml-1 text-gray-500">/{billingInterval}</span>
              </div>
            </div>
          </div>

          {isFree && product.prices && product.prices.length > 1 && (
            <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="text-sm text-orange-700">
                Start with a <strong>Free Trial</strong>. After{" "}
                {price.trial_period_days || 3} days, you&apos;ll be
                automatically charged{" "}
                <strong>
                  {product.prices.find(
                    (p) => p.interval === billingInterval && p.unit_amount > 0
                  )?.unit_amount
                    ? (product.prices.find(
                        (p) =>
                          p.interval === billingInterval && p.unit_amount > 0
                      )?.unit_amount || 0) / 100
                    : "9.99"}
                  $
                </strong>{" "}
                for the {product.name} Plan unless you cancel.
              </p>
            </div>
          )}

          <p className="mt-2 text-sm text-gray-600">{product.description}</p>

          <ul className="mt-4 space-y-2">
            {features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </label>
  );
};

export default PricingCard;
