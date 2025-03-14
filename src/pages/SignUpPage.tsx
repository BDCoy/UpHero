import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@lib/supabase";
import { AuthLayout } from "@components/AuthLayout";
import { AccountStep } from "@components/signup/AccountStep";
import { ContactStep } from "@components/signup/ContactStep";
import { GoalsStep } from "@components/signup/GoalsStep";
import { PlanStep } from "@components/signup/PlanStep";
import { Loader2 } from "lucide-react";
import type { SignupFormData } from "@lib/validation";
import { STEPS } from "@components/signup/SignUpSteps";
import { toast } from "@/lib/store";

export function SignUpPage() {
  const navigate = useNavigate();
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
    planType: "pro",
  });

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
          .from("profiles")
          .select("signup_completed, current_signup_step")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (profile?.signup_completed) {
          navigate("/dashboard");
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
  }, [navigate]);

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
            .from("profiles")
            .insert({
              id: authData.user.id,
              email: updatedData.email,
              full_name: updatedData.fullName,
              current_signup_step: 2,
            });

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
                plan_type: updatedData.planType,
                signup_completed: true,
              };

        const { error: updateError } = await supabase
          .from("profiles")
          .update(updateData)
          .eq("id", user.id);

        if (updateError) throw updateError;

        // Handle completion
        if (currentStep === 4) {
          toast.success(`Payment successful`);
          navigate("/dashboard");
        }
      }

      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      console.error("Error in signup flow:", err);
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
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
          .from("profiles")
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
            initialData={{
              planType: formData.planType,
            }}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  if (validating) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-upwork-gray-light animate-spin" />
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-upwork-gray">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-upwork-gray-light">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-upwork-green hover:text-upwork-green-dark"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-upwork-background px-8 py-6 border-b border-upwork-background-alt">
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
            <div className="px-8 py-6">{getCurrentStep()}</div>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
