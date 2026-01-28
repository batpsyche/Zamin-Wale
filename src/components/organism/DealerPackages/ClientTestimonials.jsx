import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "RK",
    name: "Rahul Kumar",
    company: "Delhi Properties",
    rating: 5,
    text: "Since subscribing to the Assist plan, our property listings have received 3x more inquiries. The dedicated support manager has been incredibly helpful!",
  },
  {
    initials: "SP",
    name: "Sunita Patel",
    company: "Mumbai Realty Group",
    rating: 5,
    text: "The digital marketing support with the Premium plan has transformed our business. We’re reaching clients we never could before. Worth every rupee!",
  },
  {
    initials: "AJ",
    name: "Arjun Joshi",
    company: "Bangalore Home Finders",
    rating: 4,
    text: "The free photoshoots with the Assist Plus plan have made our listings stand out. Professional photos make all the difference in this competitive market.",
  },
];

const ClientTestimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-maroon-100 text-maroon-600 flex items-center justify-center font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 mr-1 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                    fill={i < testimonial.rating ? "#FACC15" : "none"}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
