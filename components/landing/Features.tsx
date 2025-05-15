import React from 'react';

const FEATURES = [
  {
    title: 'Content people trust',
    desc: 'Build trust with content from real people that feels natural and connects with your audience.',
    icon: 'https://ext.same-assets.com/2921571504/3927218253.svg',
  },
  {
    title: 'Effortless production',
    desc: 'No studio shoots, no long timelines. Just authentic creator videos, delivered fast and ready to use.',
    icon: 'https://ext.same-assets.com/2921571504/840275654.svg',
  },
  {
    title: 'Video ads that convert',
    desc: 'Get engaging video ads that grab attention, drive clicks, and boost sales on TikTok and Meta.',
    icon: 'https://ext.same-assets.com/2921571504/4092180743.svg',
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-white py-12 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-3 text-[#42354e]">
          More clicks, more sales, zero hassle
        </h2>
        <p className="text-center mb-9 max-w-2xl mx-auto text-lg">
          Find the right creators, order videos, and manage your content – all in one place.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center bg-[#f7f8fa] rounded-2xl py-8 px-4 shadow-sm">
              <img src={f.icon} alt="icon" className="h-12 mb-5" />
              <h3 className="font-semibold text-lg mb-2 text-[#42354e]">{f.title}</h3>
              <p className="text-sm text-[#6f6290]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;