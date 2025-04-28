"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { didyouknow } from "@/data/didyouknow.js";

export default function Loader({ isLoading, currentMilestone }) {
  const [index, setIndex] = useState(0); // Default to 0 to match server-rendered HTML

  useEffect(() => {
    // Generate a random index when the milestone changes
    const randomIndex = Math.floor(Math.random() * didyouknow.length);
    setIndex(randomIndex);
  }, [currentMilestone]);

  useEffect(() => {
    if (isLoading) {
      // Force scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });

      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup function (in case component unmounts mid-loading)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div className={isLoading ? "block" : "hidden"}>
      <div className="absolute z-50 flex flex-col items-center inset-0 h-full w-full bg-army-tan text-primary-army-black text-center">
        <div className="sticky top-1/3">
          <Image
            src="/loader.svg"
            alt="Loader"
            width={60}
            height={60}
            className="spinner mb-12 mx-auto"
            priority
          />
          <h2 className="mb-4 text-md font-bold uppercase">
            Finding your path
          </h2>
          <div className="mt-16 max-w-[350px] p-2 flex flex-col">
            <p>{didyouknow[index]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
