"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "@/store/simulationStore";
import useQuestionnaireStore from "@/store/questionnaireStore";
import Loader from "@/components/loader/Loader";
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import MoreDetails from "@/components/moreDetails/MoreDetails";
import CustomText from "@/components/customtext/CustomText";
import Image from "next/image";
import Walkthrough from "@/components/walkthrough/Walkthrough";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import ArrowIconWhite from "@/assets/icons/arrow-white.svg";
import CTA from "@/components/cta/CTA";

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { choices, path } = useSimulationStore();
  const { answers } = useQuestionnaireStore();

  useEffect(() => {
    if (!answers || choices.length === 0 || path.length === 0) {
      console.log("Waiting for data to be populated...");
      return;
    }
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/generateResults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers,
            choices,
            path,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data.resultsInfo);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [answers, choices, path]);

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className="bg-primary-army-black w-[450px] max-w-[450px] overflow-x-hidden phone-wrapper relative">
          <Loader isLoading={isLoading} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className="bg-primary-army-black w-[450px] max-w-[450px] overflow-x-hidden phone-wrapper relative">
          <Loader isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className="bg-primary-army-black max-w-[450px] overflow-x-hidden phone-wrapper relative">
          <Loader isLoading={isLoading} />
          <div
            className="relative bg-cover bg-center h-[735px] max-w-[450px] mx-auto mb-8"
            style={{ backgroundImage: "url('/Results-Dark.png')" }}
          >
            {/* Overlay Content */}
            <div className="absolute inset-0 px-[18px] pb-[45px] flex flex-col justify-end items-start gap-[36px]">
              {/* Overlay Image */}
              <Image
                className="w-[339px] h-[233px] mb-4"
                src="/BAYCB.png"
                alt="Be All You Can Be"
                width={339}
                height={233}
                priority
              />

              {/* Overlay Button */}
              <button
                href="https://www.goarmy.com"
                className="items-start inline-flex pl-[18px] py-[12px] pr-[12px] group font-bold text-army-gold hover:text-army-white border border-army-gold hover:border-army-white transition"
              >
                <div className="self-center pr-[9px] text-md font-semibold uppercase">
                  talk to a recruiter
                </div>
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
              </button>
            </div>
          </div>
          <div className="p-4 max-w-[450px] mx-auto">
            <section className="mb-8">
              <CustomText
                segments={[
                  {
                    text: "Take the ",
                    className:
                      "text-[36px] leading-[36px] font-normal text-army-tan-light",
                  },
                  {
                    text: "Next Step",
                    className:
                      "text-[36px] leading-[36px] font-normal text-army-gold",
                  },
                ]}
              />
              <ComponentWrapper>
                <p className="text-lg">{results.description}</p>
              </ComponentWrapper>
            </section>
            <MoreDetails milestone={results} />
            <div className="my-[45px]">
              <Image
                className="w-full mb-[45px]"
                src="/Housing.png"
                alt="Housing"
                layout="responsive"
                width={339}
                height={255}
                priority
              />
              <div className="">
                <h2 className="text-[36px] leading-[36px] mb-[18px]">
                  Be at home wherever you live.
                </h2>
                <div className="mb-[36px]">
                  The types of homes available to active-duty Soldiers depends
                  on marital status, rank, and location. After initial training
                  like Basic Combat Training, you’ll have access to
                  single-Soldier and family-style housing on base. Additionally,
                  Army Officers have access to housing during the Basic Officer
                  Leadership Course (BOLC).
                </div>
                <div className="flex flex-col items-start gap-[8px]">
                  <CTA
                    href="https://www.goarmy.com/army-life/housing"
                    text="Housing"
                  />
                  <CTA
                    href="https://www.goarmy.com/army-life/intro-to-army-life/deployment"
                    text="Deployment"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-army-green max-w-[450px] m-auto px-[18px] py-[45px]">
            <div className="">
              <h2 className="text-[36px] leading-[36px] mb-[18px]">
                For a lifetime.
              </h2>
              <div className="mb-[36px]">
                Whether you plan to serve in the Army for several years or until
                you reach retirement age, there are financial planning options
                available to get you closer to your goals.
              </div>
              <button
                href="https://www.goarmy.com/benefits/veterans/retirement"
                className="items-start mb-[36px] inline-flex pl-[18px] py-[12px] pr-[12px] group font-bold text-army-gold hover:text-army-white border border-army-gold hover:border-army-white transition"
              >
                <div className="self-center pr-[9px] text-md font-semibold uppercase">
                  Retirement & Pension Plans
                </div>
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
              </button>
              <div className="border-b border-army-tan-light">
                <h3 className="text-[27px] leading-[36px] mb-[18px]">
                  Keep your retirement plan after service.
                </h3>
                <div className="mb-[36px]">
                  Similar to a 401(k) plan, the Thrift Savings Plan puts a
                  percentage of every paycheck into your retirement fund. After
                  you leave the Army, your account stays open which means your
                  funds will continue to build and you can add money for other
                  qualifying retirement plans.
                </div>
              </div>
              <div className="border-b border-army-tan-light mt-[36px]">
                <h3 className="text-[27px] leading-[36px] mb-[18px]">
                  Earn an income in retirement.
                </h3>
                <div className="mb-[36px]">
                  After 20 years of service, you’ll be eligible for a pension
                  which offers the rare opportunity to earn a fixed paycheck for
                  the rest of your life—even after you stop working.
                </div>
              </div>
              <div className="border-b border-army-tan-light mt-[36px]">
                <h3 className="text-[27px] leading-[36px] mb-[18px]">
                  Choose how you want to receive your money.
                </h3>
                <div className="mb-[36px]">
                  Depending on your goals, you can choose to receive your
                  pension in one lump-sum payout at a reduced rate rather than
                  monthly payments over time.
                </div>
              </div>
            </div>
            <section className="mt-8">
              <button
                onClick={() => {
                  useSimulationStore.getState().resetSession();
                  window.location.href = "/";
                }}
                className={`text-lg uppercase text-center w-full p-[18px] rounded-[9px] mb-[18px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold`}
              >
                Restart Simulation
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
