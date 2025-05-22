/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-upwork-background" id="home">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-upwork-green/5 to-upwork-green-light/5" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/50 to-transparent" />
      </div>
      
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <div className="lg:pr-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-white/80 backdrop-blur-sm text-upwork-green ring-1 ring-upwork-green/10 animate-fade-down animate-once animate-duration-500">
                <Star className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  Trusted by 10,000+ Top-Rated Freelancers
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-upwork-gray tracking-tight animate-fade-down animate-once animate-duration-500" style={{ animationDelay: "150ms" }}>
                <span className="block">Transform Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-upwork-green to-upwork-green-light">
                  Upwork Success Story
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-6 text-lg sm:text-xl text-upwork-gray-light leading-relaxed animate-fade-down animate-once animate-duration-500" style={{ animationDelay: "200ms" }}>
                Use AI-powered tools to optimize your profile, craft winning proposals, and become a top-rated freelancer. Stand out from the competition and win more clients.
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center animate-fade-down animate-once animate-duration-500" style={{ animationDelay: "250ms" }}>
                <Link href="/signin/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/signin" className="text-upwork-gray-light hover:text-upwork-gray transition-colors">
                  Already have an account? Sign in
                </Link>
              </div>

              {/* Features List */}
              <div className="mt-8 grid grid-cols-2 gap-4 animate-fade-down animate-once animate-duration-500" style={{ animationDelay: "300ms" }}>
                {[
                  "AI Profile Optimization",
                  "Smart Proposal Generator",
                  "ATS-Friendly Templates",
                  "Client Message Assistant"
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-upwork-green mr-2 flex-shrink-0" />
                    <span className="text-sm text-upwork-gray-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="mt-12 lg:mt-0 animate-fade-left animate-once animate-duration-500" style={{ animationDelay: "400ms" }}>
              <div className="relative">
                {/* Main Image */}
                <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Freelancer success"
                    className="w-full h-auto"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-upwork-green/10 to-transparent" />
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-upwork-green/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-upwork-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-upwork-gray">Success Rate</p>
                      <p className="text-2xl font-bold text-upwork-green">85%</p>
                    </div>
                  </div>
                </div>

                {/* Floating Reviews Card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 animate-float" style={{ animationDelay: "200ms" }}>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-upwork-gray-light">
                    "Game changer for my freelance career!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};