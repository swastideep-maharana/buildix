import React from "react";
import { Button } from "../ui/button";
import Lookup from "@/data/Lookup";

const PricingModel = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div className="border p-7 flex rounded-xl flex-col gap-3" key={index}>
          <h2 className="font-bold text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens}</h2>
          <p className="text-gray-400">{pricing.desc}</p>

          <h2 className="font-bold text-4xl text-center mt-6">
            ${pricing.price}
          </h2>
          <Button>Upgrade to {pricing.name}</Button>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
