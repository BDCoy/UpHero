import React from 'react';

const CATEGORIES = [
  'Cosmetics & Beauty', 'Apparel & Fashion', 'Apps & Digital Services', 
  'Health & Wellness', 'Children & Family', 'Technology & Gadgets', 
  'Food & Beverage', 'Home & Lifestyle', 'Pets', 'Automotive'
];

const CREATORS = [
  {
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    name: "Sophia",
    rating: 5,
    location: "Los Angeles, CA",
    specialties: ["Beauty", "Lifestyle", "Fashion"],
    languages: ["English", "Spanish"],
    completedProjects: 156,
    responseTime: "2 hours",
    videoSamples: ["https://images.pexels.com/videos/3045163/free-video-3045163.mp4"],
    starIcon: "https://ext.same-assets.com/2921571504/2744450724.svg"
  },
  {
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    name: "Marcus",
    rating: 5,
    location: "New York, NY",
    specialties: ["Tech", "Gaming", "Education"],
    languages: ["English"],
    completedProjects: 98,
    responseTime: "1 hour",
    videoSamples: ["https://images.pexels.com/videos/3045163/free-video-3045163.mp4"],
    starIcon: "https://ext.same-assets.com/2921571504/3170004912.svg"
  },
  {
    image: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
    name: "Elena",
    rating: 4.9,
    location: "Miami, FL",
    specialties: ["Fitness", "Health", "Wellness"],
    languages: ["English", "Russian"],
    completedProjects: 203,
    responseTime: "3 hours",
    videoSamples: ["https://images.pexels.com/videos/3045163/free-video-3045163.mp4"],
    starIcon: "https://ext.same-assets.com/2921571504/3939565216.svg"
  },
  {
    image: "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg",
    name: "James",
    rating: 5,
    location: "London, UK",
    specialties: ["Food", "Travel", "Lifestyle"],
    languages: ["English", "French"],
    completedProjects: 167,
    responseTime: "4 hours",
    videoSamples: ["https://images.pexels.com/videos/3045163/free-video-3045163.mp4"],
    starIcon: "https://ext.same-assets.com/2921571504/2059979464.svg"
  }
];

const CreatorShowcase: React.FC = () => {
  return (
    <section className="bg-[#f7f8fa] py-20 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#42354e]">
          Connect with 5,000+ talented creators
        </h2>
        <p className="text-center mb-12 text-lg text-[#6f6290] max-w-2xl mx-auto">
          Find the perfect creator for your brand from our diverse community of professionals
        </p>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className="text-sm font-medium rounded-full px-4 py-2 border border-[#e5e6ea] bg-white hover:bg-[#ede8fd] text-[#42354e] shadow-sm transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Creator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CREATORS.map((creator) => (
            <div key={creator.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative mb-6">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <video 
                  className="absolute bottom-2 right-2 w-20 h-36 rounded-lg object-cover cursor-pointer hover:scale-150 transition-transform origin-bottom-right"
                  loop
                  muted
                  autoPlay
                  playsInline
                >
                  <source src={creator.videoSamples[0]} type="video/mp4" />
                </video>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{creator.name}</h3>
                  <div className="flex items-center gap-1 text-[#b88a59]">
                    <span className="font-bold">{creator.rating}</span>
                    <img src={creator.starIcon} alt="star" className="h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-[#6f6290]">{creator.location}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {creator.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-[#ede8fd] text-[#5b21b6] rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#e5e6ea] space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6f6290]">Completed Projects</span>
                      <span className="font-semibold">{creator.completedProjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6f6290]">Response Time</span>
                      <span className="font-semibold">{creator.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6f6290]">Languages</span>
                      <span className="font-semibold">{creator.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 mt-4 border-2 border-[#5b21b6] text-[#5b21b6] rounded-lg font-semibold hover:bg-[#5b21b6] hover:text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a 
            href="#explore-creators" 
            className="inline-block bg-[#5b21b6] hover:bg-[#4a1d96] text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105 duration-300"
          >
            Explore all creators
          </a>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase;