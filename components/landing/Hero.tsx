import React from 'react';

const SUPPORTED_COUNTRIES = [
  {icon: "https://ext.same-assets.com/2921571504/1743763944.svg", label: "United States"},
  {icon: "https://ext.same-assets.com/2921571504/1354271685.svg", label: "Canada"},
  {icon: "https://ext.same-assets.com/2921571504/395157150.svg", label: "United Kingdom"},
  {icon: "https://ext.same-assets.com/2921571504/1443725800.svg", label: "Australia"},
];

const PARTNER_LOGOS = [
  'https://ext.same-assets.com/2921571504/1762150431.webp',
  'https://ext.same-assets.com/2921571504/4052644499.webp',
  'https://ext.same-assets.com/2921571504/3299751621.webp',
  'https://ext.same-assets.com/2921571504/2940000656.webp',
  'https://ext.same-assets.com/2921571504/2512851337.webp',
];

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#f7f8fa] pt-16 pb-10 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Countries */}
        <div className="flex gap-2 mb-6">
          {SUPPORTED_COUNTRIES.map((c) => (
            <div key={c.label} className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-[#e5e6ea] shadow-sm text-sm font-medium">
              <img src={c.icon} alt={c.label} className="h-5 w-5" />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
        
        {/* Title & subtitle */}
        <h1 className="text-[2.3rem] sm:text-4xl font-extrabold leading-tight mb-2 text-[#42354e]">
          Excel on paid social with <span className="text-[#5b21b6]">authentic creator videos</span>
        </h1>
        <p className="mb-6 max-w-xl text-lg mx-auto">
          200,000+ videos created. 22,000 brands served. You too can match with our talented creators and get authentic videos optimized for social ads performance.
        </p>
        
        {/* CTA */}
        <a
          href="#signup"
          className="inline-block bg-[#5b21b6] hover:bg-[#9b6074] text-white font-semibold px-7 py-3 rounded-full text-base shadow transition-colors mb-8"
        >
          Sign up for free
        </a>
        
        {/* Video placeholders */}
        <div className="flex justify-center gap-5 mt-4 max-w-3xl w-full">
          {[1,2,3,4].map((_, i) => (
            <div key={i} className="h-52 w-32 bg-gray-300 rounded-2xl shadow-lg"></div>
          ))}
        </div>
      </div>
      
      {/* Partner logos */}
      <div className="max-w-6xl mx-auto px-4 mt-12 flex flex-wrap justify-center items-center gap-8">
        {PARTNER_LOGOS.map((logo, idx) => (
          <img key={idx} src={logo} alt="brand logo" className="h-8 grayscale opacity-70" />
        ))}
      </div>
    </section>
  );
};

export default Hero;