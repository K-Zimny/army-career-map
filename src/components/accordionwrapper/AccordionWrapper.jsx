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
        <Eyebrow type="bigger" className="!mb-0">
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
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
