import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../Button';
import { signupValidationSchemas } from '../../lib/validation';
import { Eye, EyeOff } from 'lucide-react';

interface AccountStepProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  initialData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  };
  isLoading?: boolean;
  onGoogleSignIn?: () => void;
  error?: string | null;
}

export function AccountStep({
  onNext,
  initialData,
  isLoading = false,
  onGoogleSignIn,
  error,
}: AccountStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Common input styles
  const baseInputClass =
    'appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green';
  const getInputClass = (touched: boolean | undefined, errorMsg: string | undefined) =>
    `${baseInputClass} border ${touched && errorMsg ? 'border-red-300' : 'border-upwork-gray-lighter'}`;

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: signupValidationSchemas.account,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 animate-fade-down animate-once animate-duration-500"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-upwork-gray">
          Full Name
        </label>
        <div className="mt-1">
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={formik.values.fullName}
            onChange={(e) => {
              const capitalizedName = e.target.value
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());
              formik.setFieldValue('fullName', capitalizedName);
            }}
            onBlur={formik.handleBlur}
            className={getInputClass(formik.touched.fullName, formik.errors.fullName)}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.fullName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-upwork-gray">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            {...formik.getFieldProps('email')}
            type="email"
            autoComplete="email"
            className={getInputClass(formik.touched.email, formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-upwork-gray">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            {...formik.getFieldProps('password')}
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className={`${getInputClass(formik.touched.password, formik.errors.password)} pr-10`}
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
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-upwork-gray">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            {...formik.getFieldProps('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className={`${getInputClass(formik.touched.confirmPassword, formik.errors.confirmPassword)} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-upwork-gray-light hover:text-upwork-gray"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {/* Next Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formik.isValid || formik.isSubmitting}
      >
        {isLoading ? 'Creating account...' : 'Next'}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-upwork-gray-lighter" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-upwork-gray-light">Or continue with</span>
        </div>
      </div>

      {/* Google Sign-In Button */}
      <button
        type="button"
        onClick={onGoogleSignIn}
        disabled={isLoading}
        className="w-full inline-flex justify-center items-center py-2 px-4 border border-upwork-gray-lighter rounded-md shadow-sm bg-white text-sm font-medium text-upwork-gray hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        Sign up with Google
      </button>
    </form>
  );
}
