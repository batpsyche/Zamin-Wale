import React from "react";
import Footer from "@/components/organism/Footer";
import WhyChooseZaminWale from "@/components/organism/DealerPackages/WhyChooseZaminWale";
import SubscriptionPlans from "@/components/organism/DealerPackages/SubscriptionPlans";
import ClientTestimonials from "@/components/organism/DealerPackages/ClientTestimonials";
import FaqSection from "@/components/organism/DealerPackages/FaqSection";


const Page = () => {
  return (
    <div className="bg-[#fdf6f6] min-h-screen text-[#3b0a0a] font-sans">
      

      

      <section className=" bg-white shadow-inner">
        <SubscriptionPlans />
      </section>

      <section >
        <WhyChooseZaminWale />
      </section>

      <section >
        <ClientTestimonials />
      </section>

      <section >
      <FaqSection />
      </section>

     


      <footer className="bg-[#800000] text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Page;