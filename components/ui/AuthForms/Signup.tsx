"use client";
import { useState, useEffect, useRef } from "react";
import { AccountStep } from "./signup/AccountStep";
import { ContactStep } from "./signup/ContactStep";
import { GoalsStep } from "./signup/GoalsStep";
import { PlanStep } from "./signup/PlanStep";
import type { SignupFormData } from "@lib/validation";

import { Mail, Phone, Target, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const STEPS = [
  { id: "account", icon: Mail, label: "Account" },
  { id: "contact", icon: Phone, label: "Contact" },
  { id: "goals", icon: Target, label: "Goals" },
  { id: "plan", icon: CreditCard, label: "Plan" },
] as const;

export default function SignUp() {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    country: "",
    city: "",
    goals: [],
  });
  const searchParams = useSearchParams();
  const isGoogleSignupVerified = searchParams.get("verified");
  const hasExecuted = useRef(false);

  useEffect(() => {
    const handleGoogleSignUp = async () => {
      if (!isGoogleSignupVerified || hasExecuted.current) return;
      hasExecuted.current = true;

      try {
        setIsLoading(true);
        setError(null);
        const user = await signUpGoogleUser(true);
        if (!user) throw new Error("Failed to create account");
        setCurrentStep((prev) => prev + 1);
      } catch (err) {
        console.error("Google sign-in error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to sign in with Google"
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleSignUp();
  }, [isGoogleSignupVerified]);

  useEffect(() => {
    const validateSignupStatus = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          setValidating(false);
          return;
        }

        if (!user) {
          setValidating(false);
          return;
        }

        // Check profile status
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("signup_completed, current_signup_step")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (profile?.signup_completed) {
          router.push("/dashboard");
        } else {
          setCurrentStep(profile?.current_signup_step || 1);
          setValidating(false);
        }
      } catch (err) {
        console.error("Error validating signup status:", err);
        setValidating(false);
      }
    };

    validateSignupStatus();
  }, [router, supabase]);

  const signUpGoogleUser = async (verified: boolean = false) => {
    try {
      if (!verified) {
        // Step 1: Initiate Google OAuth login
        const { error: authError } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin + "/signup?verified=true",
            scopes: "openid email profile",
          },
        });

        if (authError) throw authError;
      }

      // Step 2: Wait for session with retry logic
      let user = null;
      let retries = 0;
      const maxRetries = 5;
      const retryDelay = 500; // milliseconds

      while (retries < maxRetries && !user) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        user = session?.user;

        if (!user) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          retries++;
        }
      }

      if (!user) {
        throw new Error("Failed to retrieve user session after Google sign-in");
      }

      console.log("Google Sign-In Successful:", user);

      // Step 3: Extract and normalize user metadata
      const userId = user.id;
      const userEmail = user.email!;
      const userName =
        user.user_metadata?.name || user.user_metadata?.full_name || userEmail;

      // Step 4: Check for existing profile using efficient query
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) throw profileError;

      // Step 5: Create profile if missing
      if (!profile) {
        console.log("Creating new profile for Google user...");

        const { error: upsertError } = await supabase.from("users").upsert(
          {
            id: userId,
            full_name: userName,
            email: userEmail,
            current_signup_step: 2,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "id",
          }
        );

        if (upsertError) throw upsertError;
        console.log("New profile created for Google user");
      } else {
        throw new Error("User profile already exists please sign in");
      }

      return user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await signUpGoogleUser();
      if (!user) throw new Error("Failed to create account");
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async (stepData: Partial<SignupFormData>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    try {
      setError(null);
      setIsLoading(true);

      if (currentStep === 1) {
        // Create auth user on first step
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: updatedData.email,
            password: updatedData.password,
          }
        );

        if (authError) throw authError;

        if (authData.user) {
          // Initialize profile
          const { error: profileError } = await supabase
            .from("users")
            .update({
              full_name: updatedData.fullName,
              current_signup_step: 2,
            })
            .eq("id", authData.user.id);

          if (profileError) throw profileError;
        }
      } else {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("No authenticated user found");

        // Update profile based on current step
        const updateData =
          currentStep === 2
            ? {
                phone: updatedData.phone,
                country: updatedData.country,
                city: updatedData.city,
                current_signup_step: 3,
              }
            : currentStep === 3
            ? {
                goals: updatedData.goals,
                current_signup_step: 4,
              }
            : {
                signup_completed: true,
                current_signup_step: 5,
              };

        const { error: updateError } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", user.id);

        if (updateError) throw updateError;

        // Handle completion
        if (currentStep === 4) {
          toast({
            title: "Payment success!",
            description: "Your payment was processed",
            variant: "success",
          });
          router.push("/payment-success");
        }
      }

      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      console.error("Error in signup flow:", err);

      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = async () => {
    const previousStep = currentStep - 1;
    if (previousStep < 1) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error: updateError } = await supabase
          .from("users")
          .update({
            current_signup_step: previousStep,
          })
          .eq("id", user.id);

        if (updateError) throw updateError;
      }

      setCurrentStep(previousStep);
    } catch (err) {
      console.error("Error updating signup step:", err);
    }
  };

  const getCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            onNext={handleNext}
            initialData={{
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
              fullName: formData.fullName,
            }}
            isLoading={isLoading}
            onGoogleSignIn={handleGoogleSignIn}
            error={error}
          />
        );
      case 2:
        return (
          <ContactStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={{
              phone: formData.phone,
              country: formData.country,
              city: formData.city,
            }}
          />
        );
      case 3:
        return (
          <GoalsStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={{
              goals: formData.goals,
            }}
          />
        );
      case 4:
        return (
          <PlanStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div
          className="text-center mb-8 animate-fade-down animate-once animate-duration-500"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-3xl font-extrabold text-upwork-gray">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-upwork-gray-light">
            Already have an account?{" "}
            <Link
              href="/signin/password_signin"
              className="font-medium text-upwork-green hover:text-upwork-green-dark"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Progress Bar */}
          <div
            className="bg-upwork-background px-8 py-6 border-b border-upwork-background-alt animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex justify-between items-center w-full">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      index === currentStep - 1
                        ? "bg-upwork-green text-white"
                        : index < currentStep - 1
                        ? "bg-upwork-green-light text-white"
                        : "bg-upwork-background-alt text-upwork-gray-light"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-xs font-medium text-upwork-gray-light">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-1.5 bg-upwork-background-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-upwork-green rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="px-8 py-6 animate-fade-down animate-once animate-duration-500"
            style={{ animationDelay: "300ms" }}
          >
            {getCurrentStep()}
          </div>
        </div>
      </div>
    </main>
  );
}
