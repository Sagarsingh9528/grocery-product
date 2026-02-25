import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">

      
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />

      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

     
      <div className="absolute inset-0 bg-[#EAF6F0]/10"></div>

      
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-6">

        <div className="max-w-md">

         
          <h1 className="text-2xl md:text-4xl font-bold text-green-600 mb-8 text-center md:text-left">
            Why We Are the Best?
          </h1>

         
          <div className="space-y-6">

            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">

                
                <div className="bg-green-500 p-3 rounded-xl flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-5 md:w-6 h-5 md:h-6 invert"
                  />
                </div>

               
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default BottomBanner;