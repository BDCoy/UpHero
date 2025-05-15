import React from "react";

const SUPPORTED_COUNTRIES = [
  {
    icon: "https://ext.same-assets.com/2921571504/1743763944.svg",
    label: "United States",
  },
  {
    icon: "https://ext.same-assets.com/2921571504/1354271685.svg",
    label: "Canada",
  },
  {
    icon: "https://ext.same-assets.com/2921571504/395157150.svg",
    label: "United Kingdom",
  },
  {
    icon: "https://ext.same-assets.com/2921571504/1443725800.svg",
    label: "Australia",
  },
];

const PARTNER_LOGOS = [
  "https://ext.same-assets.com/2921571504/1762150431.webp",
  "https://ext.same-assets.com/2921571504/4052644499.webp",
  "https://ext.same-assets.com/2921571504/3299751621.webp",
  "https://ext.same-assets.com/2921571504/2940000656.webp",
  "https://ext.same-assets.com/2921571504/2512851337.webp",
];

const DEMO_VIDEOS = [
  "https://images.pexels.com/photos/7676399/pexels-photo-7676399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/32070496/pexels-photo-32070496/free-photo-of-home-podcast-recording-in-cozy-setting.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/12433027/pexels-photo-12433027.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/18015232/pexels-photo-18015232/free-photo-of-a-man-holding-a-camera-and-a-tripod.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#f7f8fa] pt-40 pb-20 border-b border-[#e5e6ea] overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Countries */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SUPPORTED_COUNTRIES.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-[#e5e6ea] shadow-sm text-sm font-medium transform hover:scale-105 transition-transform"
            >
              <img src={c.icon} alt={c.label} className="h-5 w-5" />
              <span>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Title & subtitle */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-[#42354e] max-w-4xl mx-auto animate-fade-up">
          Excel on paid social with{" "}
          <span className="text-[#5b21b6] relative">
            authentic creator videos
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 358 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5C75.5 4 151.5 4 225.5 4C299.5 4 150 4 356 4"
                stroke="#5b21b6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl mx-auto text-[#6f6290] animate-fade-up animate-delay-150">
          200,000+ videos created. 22,000 brands served. You too can match with
          our talented creators and get authentic videos optimized for social
          ads performance.
        </p>

        {/* CTA */}
        <a
          href="#signup"
          className="inline-block bg-[#5b21b6] hover:bg-[#4a1d96] text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-all duration-300 hover:scale-105 transform hover:shadow-xl mb-16 animate-fade-up animate-delay-300"
        >
          Start creating videos
        </a>

        {/* Video grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full mx-auto">
          {DEMO_VIDEOS.map((image, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 aspect-[9/16] group"
            >
              <img
                src={image}
                alt="Creator content"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">
                  Watch video
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner logos */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <p className="text-center text-sm text-[#6f6290] mb-8">
          Trusted by leading brands worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PARTNER_LOGOS.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="brand logo"
              className="h-8 md:h-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
