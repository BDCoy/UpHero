import { ArrowRight, Award, Globe, Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/Button";

export const About = () => {
  return (
    <section className="py-12 sm:py-24 lg:py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-upwork-gray">
            Empowering Freelancers Worldwide
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-upwork-gray-light max-w-3xl mx-auto">
            Our mission is to help freelancers succeed in the digital economy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4">
              <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-upwork-green to-upwork-green-light"></div>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                  <Users className="h-8 w-8 text-upwork-green mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-upwork-gray">
                    Global Community
                  </h3>
                  <p className="mt-2 text-upwork-gray-light">
                    10,000+ freelancers from over 100 countries
                  </p>
                </div>
                <div className="bg-gradient-to-br from-upwork-green to-upwork-green-light rounded-2xl shadow-lg p-6 text-white transform hover:-translate-y-1 transition duration-300">
                  <Rocket className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Rapid Growth</h3>
                  <p className="mt-2 text-white/90">
                    150% year-over-year growth
                  </p>
                </div>
              </div>
              <div className="space-y-6 sm:pt-12 ">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition duration-300">
                  <Globe className="h-8 w-8 text-upwork-green mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-upwork-gray">
                    Platform Support
                  </h3>
                  <p className="mt-2 text-upwork-gray-light">
                    Compatible with major freelance platforms
                  </p>
                </div>
                <div className="bg-gradient-to-br from-upwork-green to-upwork-green-light rounded-2xl shadow-lg p-6 text-white transform hover:-translate-y-1 transition duration-300">
                  <Award className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Success Rate</h3>
                  <p className="mt-2 text-white/90">
                    85% client satisfaction rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-upwork-gray mb-4">
                  Our Story
                </h3>
                <p className="text-upwork-gray-light leading-relaxed text-base sm:text-lg">
                  Founded in 2025, UpHero emerged from a simple observation:
                  talented freelancers often struggle to stand out in an
                  increasingly competitive market. Our team of former successful
                  freelancers and AI experts came together to create a platform
                  that leverages artificial intelligence to help freelancers
                  optimize their profiles, craft winning proposals, and build
                  successful careers.
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-upwork-gray mb-4">
                  Our Mission
                </h3>
                <p className="text-upwork-gray-light leading-relaxed text-base sm:text-lg">
                  We're on a mission to democratize success in the freelance
                  economy. By combining AI technology with human expertise, we
                  help freelancers of all experience levels compete effectively
                  and build sustainable careers on platforms like Upwork.
                </p>
              </div>
              <div className="pt-6 ">
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
    </section>
  );
};
