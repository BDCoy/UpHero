"use client";


import { updatePassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../Button";

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
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
          Create new password
        </h2>
        <p
          className="mt-2 text-center text-sm text-upwork-gray-light animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "200ms" }}
        >
          Please enter your new password below
        </p>

        <div
          className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "250ms" }}
        >
          <form
            className="space-y-6"
            noValidate={true}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-upwork-gray"
              >
                New password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-upwork-gray"
              >
                Confirm new password
              </label>
              <div className="mt-1 relative">
                <input
                  id="passwordConfirm"
                  placeholder="Password"
                  name="passwordConfirm"
                  autoComplete="current-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button loading={isSubmitting} type="submit" className="w-full">
                Reset password
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
