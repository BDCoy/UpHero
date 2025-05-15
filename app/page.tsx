import Link from "next/link";
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow page-transition">
        <div className="min-h-screen bg-[#f7f8fa] text-[#42354e] font-sans">
          <Hero />
          <Features />
          <CreatorShowcase />
          <ComparisonSection />
          <BusinessCards />
          <Testimonials />
          <HowItWorks />
          <DemoScheduler />
        </div>
      </main>
      <Footer />
    </div>
  );
}