import React from "react";

const ProgressBar = ({ position = "left", text = "" }) => {
  const positionClasses = {
    left: "left-0",
    quarter: "left-1/4",
    middle: "left-1/2",
    right: "left-full -translate-x-full",
  };

  return (
    <>
      <div className="my-11 flex justfiy-center w-full">
        <div className="relative border-1 border-army-tan-light bg-army-tan-light w-full max-w-[450px] scale-[1.2]">
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${positionClasses[position]} scale-[0.8] flex items-center justify-center px-[18px] py-[8px] mx-[16px] bg-primary-army-black text-army-tan-light text-[14px] font-normal uppercase rounded-full border-2 border-army-tan-light`}
          >
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
