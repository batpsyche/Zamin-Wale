import React from "react";

const plans = [
  {
    name: "Basic",
    price: "₹9999",
    per: "/month",
    description: "Perfect for individual agents",
    features: [
      "10 Property Listings",
      "Standard Listing Priority",
      "Email Support",
      { text: "Digital Marketing", disabled: true },
      { text: "Free Photoshoot", disabled: true },
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "₹24,999",
    per: "/month",
    description: "For growing real estate businesses",
    features: [
      "25 Property Listings",
      "Enhanced Listing Priority",
      "Phone & Email Support",
      "Basic Digital Marketing",
      { text: "Free Photoshoot", disabled: true },
    ],
    popular: false,
  },
  {
    name: "Assist",
    price: "₹49,999",
    per: "/month",
    description: "For established agencies",
    features: [
      "50 Property Listings",
      "Premium Listing Priority",
      "Dedicated Support Manager",
      "Advanced Digital Marketing",
      "1 Free Photoshoot/month",
    ],
    popular: true,
  },
  {
    name: "Assist Plus",
    price: "₹99,999",
    per: "/month",
    description: "For premium real estate firms",
    features: [
      "100 Property Listings",
      "Top Listing Priority",
      "24/7 VIP Support",
      "Premium Digital Marketing",
      "3 Free Photoshoots/month",
    ],
    popular: false,
  },
];

const SubscriptionPlans = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 mb-10">
          Select the perfect subscription plan that suits your real estate business needs and budget.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border ${
                plan.popular ? "border-maroon-600" : "border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-maroon-600 text-white text-xs px-2 py-1 rounded-bl-md font-semibold">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">
                  {plan.price}
                  <span className="text-sm font-medium text-gray-600">{plan.per}</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-left">
                  {plan.features.map((feature, i) => {
                    const isDisabled = typeof feature === "object" && feature.disabled;
                    const text = typeof feature === "string" ? feature : feature.text;
                    return (
                      <li key={i} className={`flex items-center gap-2 ${isDisabled ? "text-gray-400 line-through" : ""}`}>
                        <span>{isDisabled ? "✕" : "✓"}</span> {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
