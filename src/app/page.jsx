"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useQuestionnaireStore from "@/store/questionnaireStore";
import useSimulationStore from "@/store/simulationStore";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import ArrowIconBlack from "@/assets/icons/arrow-black.svg";
import CustomText from "@/components/customtext/CustomText";
import Image from "next/image";
import Walkthrough from "@/components/walkthrough/Walkthrough";

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
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className="block max-w-[450px]">
          <div className="p-6 rounded w-full bg-primary-army-black phone-wrapper h-screen overflow-hidden">
            <div className="">
              <ProgressBar position="left" text="Welcome" />
              <CustomText
                segments={[
                  {
                    text: "Welcome, Jane! ",
                    className: "text-[27px] font-normal text-army-tan-light",
                  },
                  {
                    text: "Let's map your Army journey.",
                    className: "text-[27px] font-normal text-army-gold",
                  },
                ]}
              />
              <Image
                className="w-full my-8"
                src="/jane.svg"
                alt="Jane Doe"
                width={768}
                height={554}
                priority
              />
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
