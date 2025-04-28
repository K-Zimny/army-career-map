"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "@/store/simulationStore";
import useQuestionnaireStore from "@/store/questionnaireStore";
import Loader from "@/components/loader/Loader";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Eyebrow from "@/components/eyebrow/Eyebrow";
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import MoreDetails from "@/components/moreDetails/MoreDetails";

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
    <div className="bg-primary-army-black text-army-tan-light pt-18">
      <Loader isLoading={isLoading} />
      <div className="p-4 max-w-3xl mx-auto">
        <section className="mb-8">
          <ProgressBar position="right" text="Results" />
          <Eyebrow type="bigger" className="mt-12 mb-12">
            Final Career Path Summary
          </Eyebrow>
          <h1 className="text-3xl mb-8 font-bold">Your Career Path Results</h1>
          <ComponentWrapper>
            <p className="text-lg">{results.description}</p>
          </ComponentWrapper>
        </section>

        <MoreDetails milestone={results} />

        <section className="mt-8">
          <button
            className={`text-lg uppercase text-center w-full p-[18px] rounded-[9px] mb-[18px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold`}
            onClick={() => {
              useSimulationStore.getState().resetSession();
              window.location.href = "/";
            }}
          >
            Restart Simulation
          </button>
        </section>
      </div>
    </div>
  );
};

export default ResultsPage;
