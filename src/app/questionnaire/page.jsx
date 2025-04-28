"use client";

import React, { useState } from "react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import useSimulationStore from "@/store/simulationStore";
import Questionnaire from "@/components/Questionnaire/Questionnaire";

import Loader from "@/components/loader/Loader";

const QuestionnairePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const answers = useQuestionnaireStore.getState().answers;

  const handleSubmit = async () => {
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
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 rounded w-full max-w-3xl">
          <Questionnaire onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default QuestionnairePage;
