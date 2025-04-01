import { ArrowRight, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/Button";

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-upwork-background" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-upwork-background to-upwork-background-alt opacity-70" />
      
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-upwork-background text-upwork-green ring-1 ring-upwork-green/10 animate__animated animate__fadeIn">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">
                Trusted by 10,000+ Top-Rated Upwork Freelancers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-upwork-gray tracking-tight animate__animated animate__fadeIn animate__delay-1s">
              <span className="block">Transform Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-upwork-green to-upwork-green-light">
                Upwork Success Story
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-upwork-gray-light leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
              Use AI-powered analysis, smart proposals, and expert training to
              become a top-rated Upwork freelancer. Stand out from the competition and win more clients.
            </p>

            {/* Call-to-Action Button */}
            <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10 animate__animated animate__fadeIn animate__delay-3s">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Secondary Text */}
            <div className="mt-12 flex justify-center space-x-6 text-sm text-upwork-gray-light animate__animated animate__fadeIn animate__delay-4s">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-upwork-green mr-2" />
                3-day free trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
