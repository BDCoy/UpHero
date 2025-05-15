import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "This platform has transformed how we manage our digital presence. The analytics and automation features have saved us countless hours.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    content: "The ease of use and powerful features make this the perfect solution for growing businesses. Customer support has been exceptional.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    company: "StyleHub",
    content: "We've seen a 40% increase in customer engagement since implementing this platform. The ROI has been incredible.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-14 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#42354e]">See how brands are winning with UGC Sensei</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto">
          {[
            {
              brand: 'Intelligence Media',
              quote: "We immediately published the first ad variations with UGC Sensei's recommended structure, we didn't edit anything, and it already worked better than our previous ads. Our ROAS was better and acquisition costs went down. We were able to scale larger because of that.",
              author: 'Jorens, CEO',
              stats: ['+120% increase in sales', '+200% boost in net profit'],
              logo: 'https://ext.same-assets.com/2921571504/3204013589.svg',
              caseLink: '#intelligence-media',
            },
            {
              brand: 'Bickster',
              quote: "UGC Sensei's been great for us! I've had clients in the past that don't have any video and they're expecting something fast. I'm not a video producer, but I can tap UGC Sensei and get 10 videos for a grand and now we've got our starting toolkit.",
              author: 'Pat, Head of Growth',
              stats: ['+500% CPI drop', '+2.5x lower CPA'],
              logo: 'https://ext.same-assets.com/2921571504/2764260946.svg',
              caseLink: '#bickster',
            },
            {
              brand: 'Adore Me',
              quote: "UGC Sensei creators perform really well in general. Over the past several years, many of our top ads on TikTok have been from UGC Sensei instead of the influencers we discover ourselves. We're impressed by the high-quality content from UGC Sensei creators.",
              author: 'Kayla, Marketing Associate',
              stats: ['+15% higher CTR', '+8% lower CPA'],
              logo: 'https://ext.same-assets.com/2921571504/338780589.svg',
              caseLink: '#adore-me',
            },
            {
              brand: 'Pineapple Products',
              quote: "Presenting real, everyday people to our customers has made a huge difference. The amount of people interacting with us and looking to purchase our product from these videos has gone up from somewhere between 30% and 50% in the past couple months.",
              author: 'Shaun, Brand Reputation Manager',
              stats: ['+10.75% ROI', '+5% conversion rates'],
              logo: 'https://ext.same-assets.com/2921571504/3291970631.svg',
              caseLink: '#pineapple',
            },
          ].map((t, idx) => (
            <div key={t.brand} className="flex flex-col bg-[#f7f8fa] rounded-2xl shadow p-6 md:w-1/2 lg:w-1/4 mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <img src={t.logo} alt={t.brand} className="h-8" />
                <span className="font-semibold text-sm">{t.brand}</span>
              </div>
              <div className="italic text-[#6f6290] text-sm mb-3">"{t.quote}"</div>
              <div className="text-xs mb-2 text-[#42354e]">{t.author}</div>
              <ul className="mb-3 text-xs text-[#5b21b6] font-semibold">
                {t.stats.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <a href={t.caseLink} className="text-[#5b21b6] text-xs underline font-medium mt-auto">Read full case study</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;