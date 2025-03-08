import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { AuthLayout } from '@components/AuthLayout';
import { supabase } from '@lib/supabase';
import { toast } from '@lib/store';
import { Loader2 } from 'lucide-react';

export function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Check if signup is completed
        const { data: profile } = await supabase
          .from('profiles')
          .select('signup_completed, current_signup_step')
          .eq('id', data.user.id)
          .single();

        if (profile?.signup_completed) {
          toast.success('Successfully signed in!');
          navigate('/dashboard');
        } else {
          // Redirect to the appropriate signup step
          navigate('/signup');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-upwork-gray">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-upwork-gray-light">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-upwork-green hover:text-upwork-green-dark">
                Sign up
              </Link>
            </p>
          </div>

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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-upwork-gray">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-upwork-gray-lighter rounded-md shadow-sm placeholder-upwork-gray-light focus:outline-none focus:ring-upwork-green focus:border-upwork-green"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-upwork-green focus:ring-upwork-green border-upwork-gray-lighter rounded"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-upwork-gray">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-upwork-green hover:text-upwork-green-dark">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
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