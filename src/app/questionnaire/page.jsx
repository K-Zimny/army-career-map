"use client";

import React, { useState } from "react";
import useSimulationStore from "@/store/simulationStore";
import Questionnaire from "@/components/Questionnaire/Questionnaire";

import Loader from "@/components/loader/Loader";
import Walkthrough from "@/components/walkthrough/Walkthrough";

const QuestionnairePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      console.error("No answers provided. Cannot submit questionnaire.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/generateCareerPath", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to generate career path. Do you have your .env added with OpenAI API Key?"
        );
      }

      const data = await response.json();
      const { careerPath } = data;

      console.log("Career Path from API:", careerPath); // Debugging log

      // Ensure careerPath is an object and add it to the path array
      if (careerPath && typeof careerPath === "object") {
        useSimulationStore.getState().setPath(careerPath); // add first milestone object
        useSimulationStore.getState().setCurrentMilestone(careerPath);
      } else {
        console.error("Invalid careerPath format:", careerPath);
      }

      console.log(
        "Path in store after setPath:",
        useSimulationStore.getState().path
      ); // Debugging log

      window.location.href = "/simulate";
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className={`block w-[450px] overflow-x-hidden`}>
          <div className="p-6 rounded w-full max-w-[450px] h-screen xl:h-auto bg-primary-army-black phone-wrapper relative">
            <Loader isLoading={isLoading} />
            <Questionnaire onSubmit={(answers) => handleSubmit(answers)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnairePage;
