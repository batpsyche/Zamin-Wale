import React from "react";
import { Eye, Clock, BarChart, CreditCard } from "lucide-react";

const features = [
  {
    icon: <Eye className="w-8 h-8 text-maroon-600" />,
    title: "Maximum Visibility",
    description: "Get your properties seen by thousands of potential buyers every day.",
  },
  {
    icon: <Clock className="w-8 h-8 text-maroon-600" />,
    title: "Quick Response",
    description: "Connect with interested buyers faster with our lead management system.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-maroon-600" />,
    title: "Market Analytics",
    description: "Access detailed insights about property trends and buyer preferences.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-maroon-600" />,
    title: "Secure Transactions",
    description: "Ensure safe and transparent dealings with our secure platform.",
  },
];

const WhyChooseZaminWale = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Choose ZaminWale?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="bg-maroon-100 p-3 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseZaminWale;
