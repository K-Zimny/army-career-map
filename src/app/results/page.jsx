"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "@/store/simulationStore";
import useQuestionnaireStore from "@/store/questionnaireStore";
import Loader from "@/components/loader/Loader";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Eyebrow from "@/components/eyebrow/Eyebrow";
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import MoreDetails from "@/components/moreDetails/MoreDetails";
import CustomText from "@/components/customtext/CustomText";
import Image from "next/image";
import Walkthrough from "@/components/walkthrough/Walkthrough";

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
      <div className="h-screen bg-army-tan-light text-primary-army-black pt-18">
        <Loader isLoading={isLoading} />
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
      <div className="h-screen bg-army-tan-light text-primary-army-black pt-18">
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="flex flex-row justify-center">
        <Walkthrough />
        <div className="bg-primary-army-black max-w-[450px] m-auto">
          <Image
            className="max-w-[450px] w-full mb-8 mx-auto"
            src="/jane-old.png"
            alt="Jane Doe"
            width={768}
            height={554}
            priority
          />
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
            <Image
              className="max-w-[450px] w-full mb-8 mx-auto"
              src="/carousel.png"
              alt="Carousel"
              width={768}
              height={554}
              priority
            />
            <Image
              className="max-w-[450px] w-full mb-8 mx-auto"
              src="/benefits.png"
              alt="Benefits"
              width={768}
              height={554}
              priority
            />
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
