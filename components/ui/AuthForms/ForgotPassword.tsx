"use client";

import Link from "next/link";
import { requestPasswordUpdate } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../Button";
import { ArrowLeft } from "lucide-react";

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  redirectMethod,
  disableButton,
}: ForgotPasswordProps) {
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };

  return (
    <div
      className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8 animate-fade-down animate-once animate-duration-500"
      style={{ animationDelay: "100ms" }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="text-center text-3xl font-extrabold text-upwork-gray animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "150ms" }}
        >
          Reset your password
        </h2>
        <p
          className="mt-2 text-center text-sm text-upwork-gray-light animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "200ms" }}
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>

        <div
          className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "250ms" }}
        >
          <form
            noValidate={true}
            className="space-y-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-upwork-gray"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                loading={isSubmitting}
                disabled={disableButton}
              >
                Send Email
              </Button>
            </div>
          </form>

          <div
            className="mt-6 animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative">
              <div className="flex justify-center">
                <Link
                  href="/signin/password_signin"
                  className="inline-flex items-center text-sm text-upwork-green hover:text-upwork-green-dark"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
