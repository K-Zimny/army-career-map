"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useQuestionnaireStore from "@/store/questionnaireStore";
import useSimulationStore from "@/store/simulationStore";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import ArrowIconBlack from "@/assets/icons/arrow-black.svg";

const HomePage = () => {
  const router = useRouter();

  const handleStart = () => {
    try {
      useQuestionnaireStore.getState().resetAnswers();
      useSimulationStore.getState().resetSession();
      router.push("/questionnaire");
    } catch (error) {
      console.error("Error resetting state or navigating simulation:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="p-4 max-w-3xl min-h-screen flex flex-col items-start justify-center">
          <ProgressBar position="left" text="Welcome" />
          <h1 className="text-4xl text-army-tan-light font-normal mb-6 mt-[27px]">
            Welcome! Let's map your Army journey.
          </h1>
          <p className="text-lg text-army-tan-light mb-8 text-left">
            In just a few taps, we'll start building a career path that's
            specific to your interests and goals.
          </p>
          <button
            onClick={handleStart}
            className="group flex uppercase font-medium bg-primary-army-black border border-army-gold text-army-gold px-6 py-3 mt-[45px] rounded-lg hover:bg-army-gold hover:text-primary-army-black transition"
          >
            <div className="self-center pr-2">Get Started</div>
            <img
              src={ArrowIconGold}
              alt="Arrow Icon"
              className="group-hover:hidden"
            />
            <img
              src={ArrowIconBlack}
              alt="Arrow Icon"
              className="hidden group-hover:block"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
