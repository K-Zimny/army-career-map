"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "../../store/simulationStore";
import useQuestionnaireStore from "@/store/questionnaireStore";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import MoreDetails from "@/components/moreDetails/MoreDetails"; // <-- Updated import
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import StatsBar from "@/components/statsBar/StatsBar";
import Eyebrow from "@/components/eyebrow/Eyebrow";
import Option from "@/components/option/Option";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import LineChart from "@/components/charts/LineChart/LineChart";
import PieChart from "@/components/charts/PieChart/PieChart";
import AccordionWrapper from "@/components/accordionwrapper/AccordionWrapper";

const SimulatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentMilestone,
    setCurrentMilestone,
    addChoice,
    choices,
    setPath,
    path,
  } = useSimulationStore();
  const { answers } = useQuestionnaireStore();

  useEffect(() => {
    let isMounted = true;

    const fetchInitialMilestone = async () => {
      console.log("Fetching initial milestone...", {
        answers,
        choices: [],
        path: [],
      });
      try {
        console.log("Answers being sent to the API:", answers);
        const response = await fetch("/api/generateCareerPath", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers, choices: [], path: [] }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch initial milestone");
        }

        const data = await response.json();
        console.log("Initial milestone data:", data.milestone);

        if (isMounted) {
          setCurrentMilestone(data.milestone);
        }
      } catch (error) {
        console.error("Error fetching initial milestone:", error);
      }
    };

    const initializeMilestone = () => {
      const { path, currentMilestone } = useSimulationStore.getState();

      if (!currentMilestone) {
        if (path.length > 0) {
          console.log("Setting first milestone from saved path...");
          setCurrentMilestone(path[0]);
        } else {
          console.log("Path is empty, fetching new initial milestone...");
          fetchInitialMilestone();
        }
      } else {
        console.log("Current milestone already set.");
      }
    };

    initializeMilestone();

    return () => {
      isMounted = false;
    };
  }, [setCurrentMilestone, answers]);

  const handleChoice = async (choice) => {
    setIsLoading(true);

    addChoice(choice);

    try {
      const response = await fetch("/api/generateCareerPath", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
          choices: [...choices, choice],
          path: useSimulationStore.getState().path,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch next milestone");
      }

      const data = await response.json();
      console.log("Next milestone data:", data);

      const nextMilestone = data.careerPath;

      setPath(nextMilestone); // Update the full path
      setCurrentMilestone(nextMilestone); // Move to the next milestone
    } catch (error) {
      console.error("Error fetching next milestone:", error);
    }

    setIsLoading(false);
  };

  if (!currentMilestone || Array.isArray(currentMilestone)) {
    return <Loader isLoading={isLoading} />; // Still loading...
  }

  return (
    <div className="bg-primary-army-black text-army-tan-light">
      <Loader isLoading={isLoading} currentMilestone={currentMilestone} />
      <div className="p-4 max-w-3xl mx-auto">
        <section className="mb-8">
          <ProgressBar position="middle" text={`YOUR PATH`} />
          <Eyebrow type="bigger" className="mt-12 mb-12">
            Year {currentMilestone.year}
          </Eyebrow>
          <h1 className="text-3xl mb-8">
            Based on your answers, here’s what year {currentMilestone.year} of
            Service might look like.
          </h1>
          <Image
            className="w-full"
            src="/jane.svg"
            alt="Jane Doe"
            width={768}
            height={554}
            priority
          />

          <StatsBar
            rank={currentMilestone.rank}
            age={currentMilestone.age}
            salary={currentMilestone.currentSalary}
          ></StatsBar>
          <ComponentWrapper>
            <Eyebrow type="bigger">Summary</Eyebrow>
            <p className="text-lg">{currentMilestone.description}</p>
          </ComponentWrapper>

          <AccordionWrapper
            title={`${currentMilestone.rank.title} (${currentMilestone.rank.shortTitle})`}
          >
            <p className="mb-2">{currentMilestone.rank.description}</p>
          </AccordionWrapper>

          <AccordionWrapper title={`${currentMilestone.benefitInfo.title}`}>
            <p className="mb-2">{currentMilestone.benefitInfo.description}</p>
          </AccordionWrapper>

          <AccordionWrapper title="Compensation">
            <p className="mb-2">
              Your total compensation is $
              {currentMilestone.currentSalary +
                currentMilestone.benefitValueToDate}
              , here's how it breaks down:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Base Salary: ${currentMilestone.currentSalary}</li>
              {Object.entries(currentMilestone.benefits).map(
                ([key, value], index) => (
                  <li key={index}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
                  </li>
                )
              )}
            </ul>
          </AccordionWrapper>
        </section>
        <section className="mt-8">
          <Eyebrow type="bigger" className="mb-12 mt-12">
            What&apos;s Next
          </Eyebrow>
          <div className="flex flex-col">
            {currentMilestone.year === 20 ? (
              // Show "See a Summary" button only on the final 20-year milestone
              <button
                className={`text-lg uppercase text-center w-full p-[18px] rounded-[9px] mb-[18px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold`}
                onClick={() => (window.location.href = "/results")}
              >
                See a Summary
              </button>
            ) : (
              // Render choices for other milestones
              currentMilestone.choices.map((choice, index) => (
                <Option
                  key={index}
                  choice={choice}
                  index={index}
                  description={choice.description}
                  onClick={() => handleChoice(choice)}
                ></Option>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SimulatePage;
