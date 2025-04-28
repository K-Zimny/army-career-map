import React from "react";

const ProgressBar = ({ position = "left", text = "" }) => {
  // Map positions to Tailwind classes for dynamic placement
  const positionClasses = {
    left: "left-0",
    quarter: "left-1/4",
    middle: "left-1/2",
    right: "left-full -translate-x-full",
  };

  return (
    <>
      <div className="mb-[45px] w-full">
        <div className="relative w-full border-1 bg-army-tan">
          {/* Pill-shaped indicator */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${positionClasses[position]} flex items-center justify-center px-[18px] py-[8px] bg-primary-army-black text-army-tan text-[14px] font-normal uppercase rounded-full border-2 border-army-tan`}
          >
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
