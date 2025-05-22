"use client";

import Link from "next/link";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../Button";

import Separator from "./Separator";
import OauthSignIn from "./OauthSignIn";

interface PasswordSignInProps {
  redirectMethod: string;
}

export default function PasswordSignIn({
  redirectMethod,
}: PasswordSignInProps) {
  const router = redirectMethod === "client" ? useRouter() : null;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div
          className="text-center animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-3xl font-extrabold text-upwork-gray">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-upwork-gray-light">
            Don&apos;t have an account?{" "}
            <Link
              href="/signin/signup"
              className="font-medium text-upwork-green hover:text-upwork-green-dark"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Form Container */}
        <div
          className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "200ms" }}
        >
          <form
            className="space-y-6"
            noValidate={true}
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-upwork-gray"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-upwork-green focus:ring-upwork-green border-upwork-gray-lighter rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-upwork-gray"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/signin/forgot_password"
                  className="font-medium text-upwork-green hover:text-upwork-green-dark"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" loading={isSubmitting}>
                Sign in
              </Button>
            </div>
          </form>

          {/* Divider and Social Sign In */}
          <div
            className="mt-6 animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "300ms" }}
          >
            <Separator text="Or continue with" />
            <OauthSignIn />
          </div>
        </div>
      </div>
    </main>
  );
}
