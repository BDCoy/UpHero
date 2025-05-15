import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    brand: "Intelligence Media",
    quote:
      "We immediately published the first ad variations with Sensei's recommended structure, we didn't edit anything, and it already worked better than our previous ads. Our ROAS was better and acquisition costs went down. We were able to scale larger because of that.",
    author: "Jorens, CEO",
    stats: ["+120% increase in sales", "+200% boost in net profit"],
    logo: "https://ext.same-assets.com/2921571504/2764260946.svg",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    caseLink: "#intelligence-media",
  },
  {
    brand: "Bickster",
    quote:
      "Sensei's been great for us! I've had clients in the past that don't have any video and they're expecting something fast. I'm not a video producer, but I can tap Sensei and get 10 videos for a grand and now we've got our starting toolkit.",
    author: "Pat, Head of Growth",
    stats: ["+500% CPI drop", "+2.5x lower CPA"],
    logo: "https://ext.same-assets.com/2921571504/2764260946.svg",
    image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
    caseLink: "#bickster",
  },
  {
    brand: "Adore Me",
    quote:
      "Sensei creators perform really well in general. Over the past several years, many of our top ads on TikTok have been from Sensei instead of the influencers we discover ourselves. We're impressed by the high-quality content from Sensei creators.",
    author: "Kayla, Marketing Associate",
    stats: ["+15% higher CTR", "+8% lower CPA"],
    logo: "https://ext.same-assets.com/2921571504/2764260946.svg",
    image: "https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg",
    caseLink: "#adore-me",
  },
  {
    brand: "Pineapple Products",
    quote:
      "Presenting real, everyday people to our customers has made a huge difference. The amount of people interacting with us and looking to purchase our product from these videos has gone up from somewhere between 30% and 50% in the past couple months.",
    author: "Shaun, Brand Reputation Manager",
    stats: ["+10.75% ROI", "+5% conversion rates"],
    logo: "https://ext.same-assets.com/2921571504/2764260946.svg",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    caseLink: "#pineapple",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-20 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#42354e]">
          See how brands are winning with Sensei
        </h2>
        <p className="text-center text-[#6f6290] mb-16 max-w-2xl mx-auto">
          Join thousands of successful brands who have transformed their social
          media presence with authentic creator content
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.brand}
              className="bg-[#f7f8fa] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative mb-6">
                <img
                  src={t.image}
                  alt={t.brand}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src={t.logo}
                  alt={`${t.brand} logo`}
                  className="absolute -bottom-4 left-4 h-8 bg-white rounded-full p-1 shadow-md"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-[#42354e]">
                    {t.brand}
                  </h3>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#5b21b6] text-[#5b21b6]"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm text-[#6f6290] italic">
                  "{t.quote}"
                </blockquote>

                <div className="pt-4 border-t border-[#e5e6ea]">
                  <p className="text-sm font-medium text-[#42354e] mb-2">
                    {t.author}
                  </p>
                  <ul className="space-y-1">
                    {t.stats.map((stat, i) => (
                      <li
                        key={i}
                        className="text-xs font-semibold text-[#5b21b6] flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5b21b6]"></span>
                        {stat}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={t.caseLink}
                  className="inline-block text-sm text-[#5b21b6] hover:text-[#4a1d96] font-medium mt-4 hover:underline"
                >
                  Read full case study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
