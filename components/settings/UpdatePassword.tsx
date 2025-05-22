import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "../ui/Button";
import { toast } from "@/lib/store/toast";
import { createClient } from "@/utils/supabase/client";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export function UpdatePassword() {
  const supabase = createClient();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // First verify the current password by attempting to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: (await supabase.auth.getUser()).data.user?.email || "",
          password: values.currentPassword,
        });

        if (signInError) {
          throw new Error("Current password is incorrect");
        }

        // Update the password
        const { error: updateError } = await supabase.auth.updateUser({
          password: values.newPassword,
        });

        if (updateError) throw updateError;

        toast.success("Password updated successfully");
        resetForm();
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to update password"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-lg font-medium text-upwork-gray mb-6">
        Update Password
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-upwork-gray"
          >
            Current Password
          </label>
          <div className="mt-1 relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              className="block w-full rounded-md border-upwork-gray-lighter px-3 py-2 text-upwork-gray shadow-sm focus:border-upwork-green focus:ring-upwork-green"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-upwork-gray"
          >
            New Password
          </label>
          <div className="mt-1 relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="block w-full rounded-md border-upwork-gray-lighter px-3 py-2 text-upwork-gray shadow-sm focus:border-upwork-green focus:ring-upwork-green"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-upwork-gray"
          >
            Confirm New Password
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="block w-full rounded-md border-upwork-gray-lighter px-3 py-2 text-upwork-gray shadow-sm focus:border-upwork-green focus:ring-upwork-green"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="text-right">
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full sm:w-auto"
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Updating Password...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
