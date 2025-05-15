import React from 'react';
import { CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Set up your professional profile with your expertise and services.",
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Connect with Clients",
      description: "Browse opportunities and connect with potential clients seeking your skills.",
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Start Working",
      description: "Begin collaborating on projects and earning through our secure platform.",
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />
    }
  ];

  return (
   <section className="bg-[#f7f8fa] py-14 border-b border-[#e5e6ea]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-1 max-w-xl">
            <h2 className="text-2xl font-bold mb-7 text-[#42354e]">How it works</h2>
            <ol className="space-y-7 mb-6">
              <li className="flex gap-4">
                <span className="font-bold text-[#5b21b6] text-2xl">1</span>
                <div>
                  <div className="font-semibold">Find the right creators</div>
                  <div className="text-[#6f6290] text-sm">Filter creators by demographics, interests, or lifestyle, and invite the ones who best match your needs. Make your brief public and let creators apply.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#5b21b6] text-2xl">2</span>
                <div>
                  <div className="font-semibold">Customise your order</div>
                  <div className="text-[#6f6290] text-sm">Select your video details, choose editing, and customize your brief yourself or leave it to the creator.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-[#5b21b6] text-2xl">3</span>
                <div>
                  <div className="font-semibold">Your videos are ready!</div>
                  <div className="text-[#6f6290] text-sm">Sit back and relax. Your creator will deliver your video in just 7-12 days after receiving your product, if you choose to ship it.</div>
                </div>
              </li>
            </ol>
            <a href="#get-started" className="inline-block bg-[#5b21b6] hover:bg-[#9b6074] text-white font-semibold px-7 py-3 rounded-full text-base shadow transition-colors">Get started</a>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src="https://billo.app/wp-content/uploads/2025/05/want-a-quick-demo-of-billo-no-border-1024x822.webp" alt="how it works" className="rounded-xl w-full max-w-xs shadow-lg object-cover"/>
          </div>
        </div>
      </section>
  );
};

export default HowItWorks;