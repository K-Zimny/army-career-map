import React from "react";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import ArrowIconWhite from "@/assets/icons/arrow-white.svg";

const CTA = ({ href, text, className = "", onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`items-center inline-flex gap-[8px] group py-2 font-bold text-army-gold hover:text-army-white border-b-1 border-army-gold hover:border-army-white transition ${className}`}
    >
      <div>{text}</div>
      <img
        src={ArrowIconGold}
        alt="Arrow Icon"
        className="group-hover:hidden"
      />
      <img
        src={ArrowIconWhite}
        alt="Arrow Icon"
        className="hidden group-hover:block"
      />
    </a>
  );
};

export default CTA;
