import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/Accordion";
  
  export const FAQ = () => {
    const faqs = [
      {
        question: "Is UpHero free?",
        answer:
          "Yes, UpHero offers a free plan with essential features. After the 3-day trial, your subscription will automatically renew with the Freelancer Plan unless you cancel.",
      },
      {
        question: "How does the Proposal Generator work?",
        answer:
          "Simply input the job details, and UpHero generates a tailored proposal designed to get noticed. Our AI analyzes the job description, matches it with your skills and experience, and creates a customized proposal that highlights your strengths and addresses the client's specific needs.",
      },
      {
        question: "Is UpHero only for Upwork?",
        answer:
          "While UpHero is optimized for Upwork, it can be used for any freelance platform, including Fiverr, Freelancer.com, and others. The core features like proposal generation, cover letters, and client messaging can be adapted to any freelance marketplace.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel your subscription at any time without penalties. If you cancel, you'll continue to have access to your plan until the end of your current billing period.",
      },
      {
        question: "Does UpHero provide training?",
        answer:
          "Yes, we offer personalized training and strategies to help improve your proposal writing. Pro plan members get access to our complete library of freelancing courses, tutorials, and strategies designed to help you win more jobs and grow your freelance business.",
      },
    ];
  
    return (
      <section className="py-12 sm:py-24 bg-white" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl font-extrabold sm:text-3xl text-upwork-gray lg:text-4xl">
              Frequently Asked Questions
            </h2>
  
            <p className="mt-2 text-lg sm:text-xl text-upwork-gray-light max-w-3xl mx-auto">
              Got questions? We've got answers. If you can't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
  
          <div className="mt-8 sm:mt-12 w-full max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg sm:text-xl font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  };
  