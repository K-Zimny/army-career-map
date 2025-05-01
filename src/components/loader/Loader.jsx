"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { didyouknow } from "@/data/didyouknow.js";

export default function Loader({ isLoading, currentMilestone }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * didyouknow.length);
    setIndex(randomIndex);
  }, [currentMilestone]);

  useEffect(() => {
    const phone = document.querySelector(".phone-wrapper");
    if (isLoading && phone) {
      phone.scrollTo({ top: 0, behavior: "smooth" });
      phone.style.overflow = "hidden";
      phone.style.height = "80dvh";
    }

    return () => {
      if (phone) {
        phone.style.overflow = "";
        phone.style.height = "";
      }
    };
  }, [isLoading]);

  return (
    <div
      className={`absolute z-50 flex flex-col items-center inset-0 h-full w-full bg-primary-army-black text-army-tan-light text-center transition-opacity duration-500 ease-in-out ${
        isLoading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="sticky top-1/3">
        <Image
          src="/loader.svg"
          alt="Loader"
          width={60}
          height={60}
          className="spinner mb-12 mx-auto"
          priority
        />
        <h2 className="mb-4 text-md font-bold uppercase">Finding your path</h2>
        <div className="mt-16 max-w-[350px] p-2 flex flex-col">
          <p>{didyouknow[index]}</p>
        </div>
      </div>
    </div>
  );
}
