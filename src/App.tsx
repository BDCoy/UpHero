import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@lib/AuthProvider';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { Layout } from '@components/Layout';
import { DashboardLayout } from '@components/DashboardLayout';
import { LandingPage } from '@pages/LandingPage';
import { SignUpPage } from '@pages/SignUpPage';
import { SignInPage } from '@pages/SignInPage';
import { ForgotPasswordPage } from '@pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { PrivacyPage } from '@pages/PrivacyPage';
import { TermsPage } from '@pages/TermsPage';
import { Dashboard } from '@pages/Dashboard';
import { ProfileAnalysis } from '@pages/dashboard/ProfileAnalysis';
import { CoverLetter } from '@pages/dashboard/CoverLetter';
import { ATSOptimizer } from '@pages/dashboard/ATSOptimizer';
import { CVBuilder } from '@pages/dashboard/CVBuilder';
import { ProposalGenerator } from '@pages/dashboard/ProposalGenerator';
import { Settings } from '@pages/dashboard/Settings';
import { SubscriptionChange } from '@pages/dashboard/SubscriptionChange';
import { ToastContainer } from '@components/Toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile-analysis"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfileAnalysis />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/cover-letter"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CoverLetter />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ats-optimizer"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ATSOptimizer />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/cv-builder"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CVBuilder />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/proposal-generator"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProposalGenerator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings/subscription/change"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SubscriptionChange />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Public pages with Layout */}
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;