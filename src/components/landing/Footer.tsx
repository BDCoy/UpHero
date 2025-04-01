import { Link } from "react-router-dom";

interface Props {
  scrollToSection: (sectionId: string) => void;
}
export const Footer: React.FC<Props> = ({ scrollToSection }) => {
  return (
    <footer className="bg-upwork-gray">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  Testimonials
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-upwork-gray-lighter uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/privacy"
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-base text-upwork-gray-light hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-upwork-gray-lighter/20 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-base text-upwork-gray-light">
              © 2025 UpHero. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
