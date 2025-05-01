import React, { useState } from "react";
import CaratDown from "@/assets/icons/down-carat.svg";
import Eyebrow from "../eyebrow/Eyebrow";

export default function AccordionWrapper({ title, children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-primary-army-black-light text-army-white p-4 my-4 rounded-2xl ${className}`}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <Eyebrow type="bigger" className="!mb-0 !pr-2">
          {title}
        </Eyebrow>
        <img
          src={CaratDown}
          alt="Toggle Accordion"
          width={16}
          height={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
