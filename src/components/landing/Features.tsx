import {
  BookOpen,
  BrainCircuit,
  CheckCircle,
  FileSearch,
  FileSpreadsheet,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Profile Analysis",
    description:
      "Our AI-powered analyzer scans your Upwork profile, identifies weak spots, and provides actionable recommendations to stand out from competitors.",
    benefits: [
      "Keyword optimization for better visibility",
      "Portfolio presentation analysis",
      "Rate positioning recommendations",
      "Success rate improvement tips",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Cover Letter",
    description:
      "Create professional, optimized cover letters that highlight your expertise and increase your hiring potential.",
    benefits: [
      "ATS-friendly templates",
      "Skill-based customization",
      "Automatic formatting",
      "PDF export capability",
    ],
  },
  {
    icon: BrainCircuit,
    title: "ATS Optimizer",
    description:
      "Our ATS Optimizer ensures your proposals and profiles are ATS-friendly, improving your chances of being noticed by clients.",
    benefits: [
      "Optimized resume formatting",
      "Keyword optimization for ATS",
      "Job description tailoring",
      "Improved proposal rankings",
    ],
  },
  {
    icon: FileSearch,
    title: "Proposal Generator",
    description:
      "Generate highly personalized proposals that resonate with clients using our advanced AI technology trained on successful Upwork bids.",
    benefits: [
      "Client-specific customization",
      "Success rate analysis",
      "Competitive differentiation",
      "Tone and style optimization",
    ],
  },
  {
    icon: BookOpen,
    title: "Client Messages",
    description:
      "Enhance your communication with clients using personalized templates for better engagement and relationship building.",
    benefits: [
      "Pre-written message templates",
      "Personalized communication",
      "Response improvement suggestions",
      "Time-saving templates",
    ],
  },
  {
    icon: BookOpen,
    title: "Personalized Training",
    description:
      "Access custom-tailored training modules and expert advice to enhance your freelancing success on Upwork.",
    benefits: [
      "Industry-specific guidance",
      "Proposal writing workshops",
      "Client communication tips",
      "Success story analysis",
    ],
  },
];


export const Features = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-upwork-gray">
            Comprehensive Tools for Upwork Excellence
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-upwork-gray-light max-w-3xl mx-auto">
            Everything you need to analyze, optimize, and succeed on Upwork
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group flex flex-col h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-upwork-green to-upwork-green-light rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg ring-1 ring-gray-100/50 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-upwork-green to-upwork-green-light text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-4 text-lg sm:text-xl font-semibold text-upwork-gray">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-upwork-gray-light leading-relaxed text-base sm:text-lg">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-upwork-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-upwork-gray-light text-sm sm:text-base">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
