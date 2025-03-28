import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { supabase } from "../lib/supabase";
import { toast } from "@/lib/store";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!isTokenValid) {
        toast.error("Invalid or expired reset token");
        navigate("/forgot-password");
        return;
      }

      try {
        const { error } = await supabase.auth.updateUser({
          password: values.password,
        });

        if (error) throw error;

        toast.success("Password updated successfully");
        setSubmitted(true);
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error("Failed to reset password, please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const setupSession = async () => {
      try {
        // Get tokens from URL hash
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (!accessToken || !refreshToken) {
          throw new Error("Invalid or missing tokens");
        }

        // Set up the session with Supabase
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) throw error;
        if (!data.session) throw new Error("No session established");

        setIsTokenValid(true);
      } catch (error) {
        console.error("Session setup error:", error);
        toast.error("Invalid or expired reset token");
        navigate("/forgot-password");
      }
    };

    setupSession();
  }, [searchParams, navigate]);

  if (submitted) {
    return (
      <AuthLayout>
        <div
          className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8 animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "100ms" }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div
              className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 animate-fade-down animate-once animate-duration-500"
              style={{ animationDelay: "100ms" }}
            >
              <CheckCircle className="w-16 h-16 text-upwork-green mx-auto mb-4" />
              <h2
                className="text-center text-3xl font-extrabold text-upwork-gray animate-fade-down animate-once animate-duration-500"
                style={{ animationDelay: "150ms" }}
              >
                Password reset successful
              </h2>
              <p
                className="mt-2 text-center text-sm text-upwork-gray-light animate-fade-down animate-once animate-duration-500"
                style={{ animationDelay: "200ms" }}
              >
                Your password has been reset successfully
              </p>
              <div
                className="mt-8 text-center animate-fade-down animate-once animate-duration-500"
                style={{ animationDelay: "250ms" }}
              >
                <Link
                  to="/signin"
                  className="text-upwork-green hover:text-upwork-green-dark"
                >
                  <Button>Sign in with new password</Button>
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
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
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
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
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
