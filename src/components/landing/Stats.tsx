const stats = [
  { number: "93%", label: "Profile Improvement" },
  { number: "75%", label: "Higher Response Rate" },
  { number: "2.5x", label: "More Interviews" },
  { number: "85%", label: "Client Satisfaction" },
];

export const Stats = () => {
  return (
    <div className="relative bg-white py-12 sm:py-16 lg:py-24" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-upwork-green">
                {stat.number}
              </div>
              <div className="mt-2 text-sm sm:text-base text-upwork-gray-light">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
