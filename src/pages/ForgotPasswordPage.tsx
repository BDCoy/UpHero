import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout>
        <div className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-upwork-gray">
              Check your email
            </h2>
            <p className="mt-2 text-center text-sm text-upwork-gray-light">
              We've sent a password reset link to {email}
            </p>
            <div className="mt-8 text-center">
              <Link to="/signin" className="text-upwork-green hover:text-upwork-green-dark">
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-upwork-gray">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-upwork-gray-light">
            Enter your email address and we'll send you a link to reset your password
          </p>

          <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-upwork-gray">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </div>
            </form>

            <div className="mt-6">
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