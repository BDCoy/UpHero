
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CreatorShowcase from '@/components/landing/CreatorShowcase';
import ComparisonSection from '@/components/landing/ComparisonSection';
import BusinessCards from '@/components/landing/BusinessCards';
import Testimonials from '@/components/landing/Testimonials';
import HowItWorks from '@/components/landing/HowItWorks';
import DemoScheduler from '@/components/landing/DemoScheduler';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen bg-[#f7f8fa] text-[#42354e] font-sans">
          <section id="home">
            <Hero />
          </section>
          <section id="features">
            <Features />
          </section>
          <section id="creators">
            <CreatorShowcase />
          </section>
          <section id="services">
            <ComparisonSection />
          </section>
          <BusinessCards />
          <section id="success">
            <Testimonials />
          </section>
          <HowItWorks />
          <DemoScheduler />
        </div>
      </main>
      <Footer />
    </div>
  );
}