import React from 'react';

const CATEGORIES = [
  'Cosmetics & Beauty', 'Apparel & Fashion', 'Apps & Digital Services', 
  'Health & Wellness', 'Children & Family', 'Technology & Gadgets', 
  'Food & Beverage', 'Home & Lifestyle', 'Pets', 'Automotive'
];

const CREATORS = [
  {
    image: "https://ext.same-assets.com/2921571504/2198423539.webp",
    name: "Tonia",
    rating: 5,
    location: "",
    starIcon: "https://ext.same-assets.com/2921571504/2744450724.svg"
  },
  {
    image: "https://ext.same-assets.com/2921571504/2097591303.webp",
    name: "Samuel",
    rating: 5,
    location: "",
    starIcon: "https://ext.same-assets.com/2921571504/3170004912.svg"
  },
  {
    image: "https://ext.same-assets.com/2921571504/2578442034.webp",
    name: "Juan",
    rating: 4.9,
    location: "Minnesota",
    starIcon: "https://ext.same-assets.com/2921571504/3939565216.svg"
  },
  {
    image: "https://ext.same-assets.com/2921571504/716539572.webp",
    name: "Regan",
    rating: 5,
    location: "",
    starIcon: "https://ext.same-assets.com/2921571504/2059979464.svg"
  }
];

const CreatorShowcase: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] py-14 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-5 text-[#42354e]">
          Sign up and connect with 5,000+ creators
        </h2>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className="text-xs sm:text-sm font-medium rounded-full px-4 py-2 border border-[#e5e6ea] bg-white hover:bg-[#ede8fd] text-[#42354e] shadow-sm transition-colors mb-1"
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Creator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {CREATORS.map((creator) => (
            <div key={creator.name} className="rounded-2xl bg-white p-4 shadow flex flex-col items-center">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-[#b88a59]"
              />
              <div className="font-semibold text-base mb-1">{creator.name}</div>
              <div className="flex items-center gap-1 text-[#b88a59] text-sm font-bold mb-1">
                {creator.rating} <img src={creator.starIcon} alt="star" className="h-4" />
              </div>
              {creator.location && (
                <span className="text-xs text-[#6f6290]">{creator.location}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a 
            href="#explore-creators" 
            className="inline-block bg-[#5b21b6] hover:bg-[#9b6074] text-white font-semibold px-8 py-3 rounded-full text-base shadow transition-colors"
          >
            Explore creators – it's free!
          </a>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase;