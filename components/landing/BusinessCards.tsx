import React from 'react';
import { Building2, Users2, Briefcase } from 'lucide-react';

const BusinessCards: React.FC = () => {
  const cards = [
    {
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      title: "Enterprise Solutions",
      description: "Tailored solutions for large organizations with complex needs and scalable infrastructure requirements."
    },
    {
      icon: <Users2 className="w-8 h-8 text-indigo-600" />,
      title: "Team Collaboration",
      description: "Powerful tools for teams to work together seamlessly across departments and locations."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      title: "Business Growth",
      description: "Strategic features designed to accelerate your business growth and market presence."
    }
  ];

  return (
    <section className="bg-[#f7f8fa] py-14 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#42354e] ">On-demand videos for every business</h2>
        <p className="text-center mb-10 max-w-3xl mx-auto text-lg">Flexible video creation that scales with your needs, no matter your size or industry.</p>
        <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
          {/* For Brands */}
          <div className="bg-white rounded-2xl p-8 flex-1 flex flex-col items-center shadow-md">
            <img src="https://ext.same-assets.com/2921571504/2445797720.svg" alt="brands" className="h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">For brands</h3>
            <p className="text-[#6f6290] text-base mb-4 text-center">Get scroll-stopping videos, ready to use and optimized for TikTok and Meta. Choose from a variety of creators and templates, test different styles, and find your winning formula.</p>
            <a href="#brands-learn" className="inline-flex gap-2 items-center text-[#5b21b6] font-semibold hover:underline">Learn more <img src="https://ext.same-assets.com/2921571504/2274204440.svg" alt="arrow" className="h-5"/></a>
          </div>
          {/* For Agencies */}
          <div className="bg-white rounded-2xl p-8 flex-1 flex flex-col items-center shadow-md">
            <img src="https://ext.same-assets.com/2921571504/2445797720.svg" alt="agencies" className="h-10 mb-3" />
            <h3 className="font-semibold text-lg mb-1">For agencies</h3>
            <p className="text-[#6f6290] text-base mb-4 text-center">Save time, money, and resources with UGC Sensei's streamlined video production platform. Access a vast network of creators, manage projects effortlessly, and deliver stunning results to your clients.</p>
            <a href="#agencies-learn" className="inline-flex gap-2 items-center text-[#5b21b6] font-semibold hover:underline">Learn more <img src="https://ext.same-assets.com/2921571504/2274204440.svg" alt="arrow" className="h-5"/></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCards;