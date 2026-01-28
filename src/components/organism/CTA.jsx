import React from "react";
import { Button } from "../ui/button";

export const CTA = () => {
  return (
    <div className="flex w-full sm:h-screen sm:max-h-[400px] bg-[url('/assets/banner-img/cta-img.jpg')] bg-cover bg-center">
      <div className="flex w-full h-full bg-black/40">
        <div className="flex w-full max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col w-full sm:items-center sm:justify-center text-white gap-6">
            <strong className="text-base font-normal">Unique Homes</strong>
            <h2 className="text-4xl font-semibold leading-10 drop-shadow-md sm:text-center">
              The Donald Trump Effect? Picturesque $88 Million Mansion Near
              Mar-a-Lago Tops the Week’s Most Expensive Homes
            </h2>
            <Button className="w-fit py-3 h-[unset] px-6 border border-white">
              Read Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
