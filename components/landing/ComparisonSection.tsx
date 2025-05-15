import React from 'react';
import { CheckCircle } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const plans = [
    {
      title: "Basic",
      price: "$29",
      features: [
        "Basic analytics dashboard",
        "Up to 1,000 monthly active users",
        "Standard support",
        "Basic integrations",
        "Community access"
      ]
    },
    {
      title: "Pro",
      price: "$99",
      featured: true,
      features: [
        "Advanced analytics",
        "Up to 10,000 monthly active users",
        "Priority support",
        "Advanced integrations",
        "API access",
        "Custom branding",
        "Team collaboration"
      ]
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Enterprise-grade analytics",
        "Unlimited monthly active users",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced API access",
        "White-labeling",
        "Advanced security features",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section className="bg-white py-14 border-b border-[#e5e6ea]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#42354e]">Why UGC Sensei?</h2>
        <p className="text-center mb-12 text-lg">See why UGC Sensei is the smarter choice for high-performing videos.</p>
        <div className="overflow-x-auto">
          <table className="min-w-[740px] mx-auto w-full bg-[#f7f8fa] rounded-2xl shadow-sm">
            <thead>
              <tr className="text-left text-[#42354e] text-base border-b border-[#e5e6ea]">
                <th className="p-4 font-semibold"> </th>
                <th className="p-4 font-semibold text-[#5b21b6]">UGC Sensei</th>
                <th className="p-4 font-semibold">Influencers</th>
                <th className="p-4 font-semibold">Production studio</th>
              </tr>
            </thead>
            <tbody className="text-[#42354e]">
              {[
                {feature: 'Cost-effective', ugcSensei: true, infl: false, studio: false},
                {feature: 'Fast', ugcSensei: true, infl: false, studio: false},
                {feature: 'Easy', ugcSensei: true, infl: false, studio: false},
                {feature: 'Customizable', ugcSensei: true, infl: true, studio: true},
                {feature: 'Scalable', ugcSensei: true, infl: false, studio: true},
                {feature: 'Authentic', ugcSensei: true, infl: true, studio: false},
                {feature: 'Ready-to-launch', ugcSensei: true, infl: false, studio: true},
              ].map((row, idx) => (
                <tr key={row.feature} className="border-b border-[#e5e6ea] last:border-0">
                  <td className="p-4 font-medium">{row.feature}</td>
                  {[row.ugcSensei, row.infl, row.studio].map((val, i) => (
                    <td className="p-4 text-center" key={i}>
                      {val ? (
                        <span className="inline-block w-6 h-6 rounded-full bg-[#5b21b6] text-white text-lg flex items-center justify-center">&#10003;</span>
                      ) : (
                        <span className="inline-block w-6 h-6 rounded-full bg-[#ede8fd] text-[#b88a59] text-lg flex items-center justify-center">&mdash;</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <a href="#try-now" className="inline-block bg-[#5b21b6] hover:bg-[#9b6074] text-white font-semibold px-7 py-3 rounded-full text-base shadow transition-colors">
            Try UGC Sensei now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;