import React from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { useAuth } from '../lib/AuthProvider';
import { ArrowRight, CheckCircle, FileSearch, FileSpreadsheet, BookOpen, Target, BrainCircuit, Award, Star, Users, Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '@/lib/revolut';

const features = [
  {
    icon: FileSearch,
    title: 'Smart Profile Analysis',
    description: 'Our AI-powered analyzer scans your Upwork profile, identifies weak spots, and provides actionable recommendations to stand out from competitors.',
    benefits: [
      'Keyword optimization for better visibility',
      'Portfolio presentation analysis',
      'Rate positioning recommendations',
      'Success rate improvement tips'
    ]
  },
  {
    icon: BrainCircuit,
    title: 'AI Proposal Generator',
    description: 'Generate highly personalized proposals that resonate with clients using our advanced AI technology trained on successful Upwork bids.',
    benefits: [
      'Client-specific customization',
      'Success rate analysis',
      'Competitive differentiation',
      'Tone and style optimization'
    ]
  },
  {
    icon: FileSpreadsheet,
    title: 'Cover Letter Builder',
    description: 'Create professional, Upwork-optimized cover letters that highlight your expertise and increase your hiring potential.',
    benefits: [
      'ATS-friendly templates',
      'Skill-based customization',
      'Automatic formatting',
      'PDF export capability'
    ]
  },
  {
    icon: BookOpen,
    title: 'Personalized Training',
    description: 'Access custom-tailored training modules and expert advice to enhance your freelancing success on Upwork.',
    benefits: [
      'Industry-specific guidance',
      'Proposal writing workshops',
      'Client communication tips',
      'Success story analysis'
    ]
  }
];

const stats = [
  { number: '93%', label: 'Profile Improvement' },
  { number: '75%', label: 'Higher Response Rate' },
  { number: '2.5x', label: 'More Interviews' },
  { number: '85%', label: 'Client Satisfaction' }
];


export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-upwork-background to-white">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden" id="home">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-upwork-background to-upwork-background-alt opacity-70" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-upwork-background-alt to-transparent opacity-30" />
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-upwork-background text-upwork-green ring-1 ring-upwork-green/10">
                <Award className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Trusted by 10,000+ Top-Rated Upwork Freelancers</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-upwork-gray tracking-tight">
                <span className="block">Transform Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-upwork-green to-upwork-green-light">
                  Upwork Success Story
                </span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-upwork-gray-light leading-relaxed">
                Use AI-powered analysis, smart proposals, and expert training to become a top-rated Upwork freelancer. Stand out from the competition and win more clients.
              </p>
              <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex justify-center space-x-6 text-sm text-upwork-gray-light">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-upwork-green mr-2" />
                  3-day free trial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-white py-16" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-extrabold text-upwork-green">{stat.number}</div>
                <div className="mt-2 text-sm text-upwork-gray-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-upwork-gray sm:text-4xl">
              Comprehensive Tools for Upwork Excellence
            </h2>
            <p className="mt-4 text-xl text-upwork-gray-light">
              Everything you need to analyze, optimize, and succeed on Upwork
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-upwork-green to-upwork-green-light rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <div className="relative bg-white p-8 rounded-lg shadow-lg ring-1 ring-gray-100/50">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-upwork-green to-upwork-green-light text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-upwork-gray">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-upwork-gray-light leading-relaxed">{feature.description}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-upwork-green mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-upwork-gray-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-upwork-background" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-upwork-gray sm:text-4xl">
              Choose Your Success Path
            </h2>
            <p className="mt-4 text-xl text-upwork-gray-light">
              Start with a free trial, then choose the plan that fits your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-b from-upwork-green to-upwork-green-dark text-white shadow-xl scale-105 z-10'
                    : 'bg-white'
                }`}
              >
                <div className="p-8">
                  {plan.popular && (
                    <div className="absolute top-0 right-6 -translate-y-1/2">
                      <div className="inline-flex items-center rounded-full bg-upwork-green-dark px-4 py-1 text-sm font-semibold text-white">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-upwork-gray'}`}>
                      {plan.name}
                    </h3>
                    {plan.popular && <Star className="h-6 w-6 text-yellow-300" />}
                  </div>
                  <p className={`mt-4 text-sm ${plan.popular ? 'text-white/90' : 'text-upwork-gray-light'}`}>
                    {plan?.description}
                  </p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold">{plan.price}$</span>
                    <span className={`ml-1 text-lg ${plan.popular ? 'text-white/90' : 'text-upwork-gray-light'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <Link to="/signup">
                    <Button
                      className={`mt-8 w-full ${
                        plan.popular
                          ? 'bg-white text-upwork-green hover:bg-upwork-background'
                          : ''
                      }`}
                      variant={plan.popular ? 'secondary' : 'primary'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className={`px-8 pb-8 ${plan.popular ? 'border-t border-white/20' : 'border-t border-upwork-background'}`}>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className={`flex-shrink-0 h-5 w-5 ${
                          plan.popular ? 'text-white/80' : 'text-upwork-green'
                        }`} />
                        <span className={`ml-3 text-sm ${plan.popular ? 'text-white/90' : 'text-upwork-gray-light'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-upwork-gray sm:text-4xl">
              Empowering Freelancers Worldwide
            </h2>
            <p className="mt-4 text-xl text-upwork-gray-light">
              Our mission is to help freelancers succeed in the digital economy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-upwork-green to-upwork-green-light"></div>
              </div>
              <div className="relative grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                    <Users className="h-8 w-8 text-upwork-green mb-3" />
                    <h3 className="text-lg font-semibold text-upwork-gray">Global Community</h3>
                    <p className="mt-2 text-upwork-gray-light">10,000+ freelancers from over 100 countries</p>
                  </div>
                  <div className="bg-gradient-to-br from-upwork-green to-upwork-green-light rounded-2xl shadow-lg p-6 text-white transform hover:-translate-y-1 transition duration-300">
                    <Rocket className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-lg font-semibold">Rapid Growth</h3>
                    <p className="mt-2 text-white/90">150% year-over-year growth</p>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                    <Globe className="h-8 w-8 text-upwork-green mb-3" />
                    <h3 className="text-lg font-semibold text-upwork-gray">Platform Support</h3>
                    <p className="mt-2 text-upwork-gray-light">Compatible with major freelance platforms</p>
                  </div>
                  <div className="bg-gradient-to-br from-upwork-green to-upwork-green-light rounded-2xl shadow-lg p-6 text-white transform hover:-translate-y-1 transition duration-300">
                    <Award className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-lg font-semibold">Success Rate</h3>
                    <p className="mt-2 text-white/90">85% client satisfaction rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-upwork-gray mb-4">Our Story</h3>
                  <p className="text-upwork-gray-light leading-relaxed">
                    Founded in 2025, UpHero emerged from a simple observation: talented freelancers often struggle to stand out in an increasingly competitive market. Our team of former successful freelancers and AI experts came together to create a platform that leverages artificial intelligence to help freelancers optimize their profiles, craft winning proposals, and build successful careers.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-upwork-gray mb-4">Our Mission</h3>
                  <p className="text-upwork-gray-light leading-relaxed">
                    We're on a mission to democratize success in the freelance economy. By combining AI technology with human expertise, we help freelancers of all experience levels compete effectively and build sustainable careers on platforms like Upwork.
                  </p>
                </div>
                <div className="pt-6">
                  <Link to="/signup">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-upwork-green to-upwork-green-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Transform Your Upwork Career?
            </h2>
            <p className="mt-4 text-xl text-white/90">
              Join thousands of successful freelancers who have elevated their Upwork presence
            </p>
            <div className="mt-8">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-upwork-green">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}