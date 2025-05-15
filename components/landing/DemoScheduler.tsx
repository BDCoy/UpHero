import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const DemoScheduler: React.FC = () => {
  return (
    <section className="bg-white py-16 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 max-w-4xl">
        <div className="flex-1 mx-auto text-center md:text-left">
          <h3 className="font-bold text-lg mb-2 text-[#42354e]">Want a quick demo of Sensei?</h3>
          <p className="mb-4 text-[#6f6290]">If you're curious about Sensei, let's hop on a brief demo call. I'll show you how to quickly find the right creators and get videos tailored to your brand.</p>
          <a href="#schedule" className="inline-block bg-[#5b21b6] hover:bg-[#9b6074] text-white font-semibold px-7 py-3 rounded-full text-base shadow transition-colors">Schedule a demo</a>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://ext.same-assets.com/2921571504/3561037935.svg" alt="calendar demo" className="h-32 w-auto" />
        </div>
      </div>
    </section>
  );
};

export default DemoScheduler;