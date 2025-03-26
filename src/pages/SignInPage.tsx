import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import { AuthLayout } from "@components/AuthLayout";
import { supabase } from "@lib/supabase";
import { toast } from "@lib/store";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/lib/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function SignInPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-gray-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
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
              Don't have an account?{" "}
              <Link
                to="/signup"
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
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setIsLoading(true);
                try {
                  const { data, error } =
                    await supabase.auth.signInWithPassword({
                      email: values.email,
                      password: values.password,
                    });
                  if (error) throw error;

                  if (data.user) {
                    const { data: profile } = await supabase
                      .from("profiles")
                      .select("signup_completed, current_signup_step")
                      .eq("id", data.user.id)
                      .single();

                    if (profile?.signup_completed) {
                      toast.success("Successfully signed in!");
                      navigate("/dashboard");
                    } else {
                      navigate("/signup");
                    }
                  }
                } catch (error) {
                  console.error("Sign in error:", error);
                  toast.error(
                    error instanceof Error ? error.message : "Failed to sign in"
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {() => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-upwork-gray"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
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
                      <Field
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
                      <Field
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
                        to="/forgot-password"
                        className="font-medium text-upwork-green hover:text-upwork-green-dark"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Signing in...
                        </div>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Divider and Social Sign In */}
            <div
              className="mt-6 animate-fade-down animate-once animate-duration-500"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-upwork-gray-lighter" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-upwork-gray-light">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-upwork-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-upwork-gray-light hover:bg-upwork-background"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
