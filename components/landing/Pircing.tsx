
import Link from "next/link";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "../ui/Button";

export const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    period: "/3 days",
    profile_analysis_limit: 3,
    cover_letter_limit: 3,
    ats_optimizer_limit: 5,
    proposal_generator_limit: 10,
    client_messages_limit: 15,
    features: [
      "3 Profile Analyses",
      "10 Proposals / Month",
      "5 ATS Scans / Month",
      "3 Cover Letters / Month",
      "15 Client Responses / Month",
      "Personalized Training",
      "Email Support",
    ],
    popular: false,
  },
  {
    id: "freelancer",
    name: "Freelancer",
    price: 12,
    period: "/month",
    profile_analysis_limit: 10,
    cover_letter_limit: 10,
    ats_optimizer_limit: 20,
    proposal_generator_limit: 50,
    client_messages_limit: 50,
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
    popular: false,
  },
  {
    id: "freelancer_pro",
    name: "Freelancer Pro",
    price: 25,
    period: "/month",
    profile_analysis_limit: 50,
    cover_letter_limit: 50,
    ats_optimizer_limit: 100,
    proposal_generator_limit: 250,
    client_messages_limit: 100,
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
    profile_analysis_limit: 100,
    cover_letter_limit: 200,
    ats_optimizer_limit: 500,
    proposal_generator_limit: 1500,
    client_messages_limit: 200,
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
    popular: false,
  },
];


export const Pircing = () => {
  return (
    <section
      className="py-12 sm:py-16 lg:py-24 bg-upwork-background"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-upwork-gray">
            Choose Your Success Path
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-upwork-gray-light max-w-3xl mx-auto">
            Start with a free trial, then choose the plan that fits your needs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transform transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-upwork-green to-upwork-green-dark text-white shadow-xl scale-105 z-10"
                  : "bg-white hover:scale-105 hover:shadow-lg"
              }`}
            >
              <div className="p-6 sm:p-8">
                {/* Free Trial Badge */}
                {plan.id === "free" && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <div className="inline-flex items-center rounded-full bg-upwork-green-dark px-4 py-1 text-sm font-semibold text-white animate__animated animate__fadeIn animate__delay-200ms">
                      Free Trial
                    </div>
                  </div>
                )}

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2">
                    <div className="inline-flex items-center rounded-full bg-upwork-green-dark px-4 py-1 text-sm font-semibold text-white animate__animated animate__fadeIn animate__delay-400ms">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Name and Rating */}
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-xl sm:text-2xl font-bold ${
                      plan.popular ? "text-white" : "text-upwork-gray"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  {plan.popular && <Star className="h-6 w-6 text-yellow-300" />}
                </div>

                {/* Plan Description */}
                <p
                  className={`mt-4 text-sm sm:text-base ${
                    plan.popular ? "text-white/90" : "text-upwork-gray-light"
                  }`}
                >
                  {plan?.description}
                </p>

                {/* Price and Period */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold">
                    {plan.price}$
                  </span>
                  <span
                    className={`ml-1 text-lg sm:text-xl ${
                      plan.popular ? "text-white/90" : "text-upwork-gray-light"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Get Started Button */}
                <Link href="/signup">
                  <Button
                    className={`mt-8 w-full ${
                      plan.popular
                        ? "bg-white text-upwork-green hover:bg-upwork-background"
                        : ""
                    }`}
                    variant={plan.popular ? "secondary" : "primary"}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div
                className={`px-8 pb-8 ${
                  plan.popular
                    ? "border-t border-white/20"
                    : "border-t border-upwork-background"
                }`}
              >
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start animate__animated animate__fadeIn animate__delay-500ms"
                    >
                      <CheckCircle
                        className={`flex-shrink-0 h-5 w-5 ${
                          plan.popular ? "text-white/80" : "text-upwork-green"
                        }`}
                      />
                      <span
                        className={`ml-3 text-sm sm:text-base ${
                          plan.popular
                            ? "text-white/90"
                            : "text-upwork-gray-light"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
