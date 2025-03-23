import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@lib/AuthProvider';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { Layout } from '@components/Layout';
import { DashboardLayout } from '@components/DashboardLayout';
import { ToastContainer } from '@components/Toast';

// Public pages
import { LandingPage } from '@pages/LandingPage';
import { SignUpPage } from '@pages/SignUpPage';
import { SignInPage } from '@pages/SignInPage';
import { ForgotPasswordPage } from '@pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { PrivacyPage } from '@pages/PrivacyPage';
import { TermsPage } from '@pages/TermsPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';

// Dashboard pages (Protected Routes)
import { Dashboard } from '@pages/Dashboard';
import { ProfileAnalysis } from '@pages/dashboard/ProfileAnalysis';
import { CoverLetter } from '@pages/dashboard/CoverLetter';
import { ATSOptimizer } from '@pages/dashboard/ATSOptimizer';
import { ProposalGenerator } from '@pages/dashboard/ProposalGenerator';
import { PersonalizedTraining } from './pages/dashboard/PersonalizedTraining';
import { Settings } from '@pages/dashboard/Settings';
import { SubscriptionChange } from '@pages/dashboard/SubscriptionChange';

// Helper Component for Protected Routes
const ProtectedDashboardRoute = ({ children }: { children: JSX.Element }) => (
  <ProtectedRoute>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<ProtectedDashboardRoute><Dashboard /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/profile-analysis" element={<ProtectedDashboardRoute><ProfileAnalysis /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/cover-letter" element={<ProtectedDashboardRoute><CoverLetter /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/ats-optimizer" element={<ProtectedDashboardRoute><ATSOptimizer /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/proposal-generator" element={<ProtectedDashboardRoute><ProposalGenerator /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/personalized-training" element={<ProtectedDashboardRoute><PersonalizedTraining /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedDashboardRoute><Settings /></ProtectedDashboardRoute>} />
          <Route path="/dashboard/settings/subscription/change" element={<ProtectedDashboardRoute><SubscriptionChange /></ProtectedDashboardRoute>} />

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
