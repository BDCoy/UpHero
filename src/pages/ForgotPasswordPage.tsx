import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { supabase } from "../lib/supabase";
import { toast } from "@/lib/store";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(
          values.email.trim().toLowerCase(),
          {
            redirectTo: window.location.origin + "/reset-password",
          }
        );
        if (error) {
          if (error.message.includes("Email rate limit exceeded")) {
            throw new Error("Too many attempts. Please try again later.");
          }
          throw error;
        }
        setSubmitted(true);
        toast.success("Password Reset Email Sent Successfully");
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error(`Reset password error: ${error} `);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (submitted) {
    return (
      <AuthLayout>
        <div className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
          <div
            className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <CheckCircle className="w-16 h-16 text-upwork-green mx-auto mb-4" />
              <h2
                className="text-center text-3xl font-extrabold text-upwork-gray"
                style={{ animationDelay: "150ms" }}
              >
                Check your email
              </h2>
              <p
                className="mt-2 text-center text-sm text-upwork-gray-light"
                style={{ animationDelay: "200ms" }}
              >
                We've sent a password reset link to {formik.values.email}
              </p>
              <div
                className="mt-8 text-center"
                style={{ animationDelay: "250ms" }}
              >
                <Link
                  to="/signin"
                  className="text-upwork-green hover:text-upwork-green-dark"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
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
            Enter your email address and we'll send you a link to reset your
            password
          </p>

          <div
            className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "250ms" }}
          >
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting}
                >
                  Send reset link
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
                    to="/signin"
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
    </AuthLayout>
  );
}
