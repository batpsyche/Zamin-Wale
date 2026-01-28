import React from "react";

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your subscription plan at any time. Changes will be effective from the next billing cycle.",
  },
  {
    question: "How does the listing priority work?",
    answer:
      "Listing priority determines how prominently your properties appear in search results. Higher-tier plans get better visibility, appearing at the top of search results and featured sections.",
  },
  {
    question: "What's included in the digital marketing support?",
    answer:
      "Digital marketing includes social media promotion, targeted email campaigns, and search engine optimization for your listings. Higher-tier plans receive more comprehensive marketing strategies.",
  },
];

const FaqSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
