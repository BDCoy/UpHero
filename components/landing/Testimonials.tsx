/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "UpHero transformed how I write proposals. It saved me hours and helped me win more jobs. The profile analysis feature alone was worth the investment.",
      author: "Jane D.",
      role: "Graphic Designer",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      stars: 5,
    },
    {
      quote:
        "The ATS feature alone is worth it. My proposals now stand out to clients, and I've seen a 40% increase in interview invitations since I started using UpHero.",
      author: "John M.",
      role: "Web Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
    },
    {
      quote:
        "I was skeptical at first, but after using UpHero for just one month, I landed two long-term clients. The proposal templates are professional and easy to customize.",
      author: "Sarah K.",
      role: "Content Writer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
    },
    // {
    //   quote:
    //     "As a non-native English speaker, UpHero has been invaluable for crafting professional-sounding proposals. The client message templates also help me communicate clearly.",
    //   author: "Miguel R.",
    //   role: "UI/UX Designer",
    //   image: "https://randomuser.me/api/portraits/men/67.jpg",
    //   stars: 4,
    // },
    // {
    //   quote:
    //     "UpHero has simplified the proposal process for me. I now know exactly what to include, and my clients appreciate the professionalism.",
    //   author: "Alex T.",
    //   role: "Web Designer",
    //   image: "https://randomuser.me/api/portraits/men/35.jpg",
    //   stars: 5,
    // },
    // {
    //   quote:
    //     "I highly recommend UpHero to any freelancer looking to improve their proposals. The AI tools are powerful, and I've already noticed more success in landing jobs.",
    //   author: "Emily L.",
    //   role: "Copywriter",
    //   image: "https://randomuser.me/api/portraits/women/56.jpg",
    //   stars: 5,
    // },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-upwork-gray">
            What Freelancers Are Saying
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-upwork-gray-light max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what freelancers like you
            have to say about UpHero.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group flex flex-col h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-upwork-green to-upwork-green-light rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-lg ring-1 ring-gray-100/50 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-upwork-blue text-upwork-green"
                    />
                  ))}
                  {[...Array(5 - testimonial.stars)].map((_, i) => (
                    <Star
                      key={i + testimonial.stars}
                      className="h-5 w-5 text-upwork-gray-lighter"
                    />
                  ))}
                </div>

                <blockquote className="text-left mb-6 italic text-upwork-gray-light leading-relaxed text-base sm:text-lg">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full mr-4 object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-upwork-gray text-sm sm:text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-sm sm:text-base text-upwork-gray-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
