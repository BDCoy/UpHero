import { Link } from "react-router-dom";
import { Button } from "@components/ui/Button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section
      className="bg-gradient-to-r from-upwork-green to-upwork-green-light py-12 sm:py-16 lg:py-24"
      id="cta"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Ready to Transform Your Upwork Career?
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of successful freelancers who have elevated their
            Upwork presence.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-upwork-green"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
