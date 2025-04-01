import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { STEPS } from './signup/SignUpSteps';
import { Logo } from './ui/Logo';

interface SignUpLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function SignUpLayout({ children, currentStep, totalSteps }: SignUpLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-upwork-background to-upwork-background-alt flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Link
              to="/"
              className="p-2 text-upwork-gray-light hover:text-upwork-gray hover:bg-upwork-background rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-upwork-gray">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-upwork-gray-light">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-upwork-green hover:text-upwork-green-dark">
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
                          ? 'bg-upwork-green text-white'
                          : index < currentStep - 1
                          ? 'bg-upwork-green-light text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className="mt-2 text-xs font-medium text-upwork-gray-light">{step.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-upwork-green rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}