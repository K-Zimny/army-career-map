"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "../../store/simulationStore";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import MoreDetails from "@/components/moreDetails/MoreDetails"; // <-- Updated import
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import StatsBar from "@/components/statsBar/StatsBar";
import Eyebrow from "@/components/eyebrow/Eyebrow";
import Option from "@/components/option/Option";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

const SimulatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { currentMilestone, setCurrentMilestone, addChoice, choices, setPath } =
    useSimulationStore();

  useEffect(() => {
    let isMounted = true;

    const fetchInitialMilestone = async () => {
      console.log("Fetching initial milestone...");
      try {
        const response = await fetch("/api/generateCareerPath", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: {}, choices: [] }),
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
  }, [setCurrentMilestone]);

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
          answers: {},
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
    <div className="bg-army-tan-light text-primary-army-black pt-18">
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
            src="/user-image.png"
            alt="User Image"
            width={300}
            height={300}
          />

          <StatsBar
            rank={currentMilestone.rank}
            age={currentMilestone.age}
            salary={currentMilestone.currentSalary}
          ></StatsBar>
          {/* <ComponentWrapper>
            <Eyebrow type="bigger">Summary</Eyebrow> */}
          <p className="mb-8 text-lg">{currentMilestone.description}</p>
          {/* </ComponentWrapper> */}

          <ComponentWrapper>
            <Eyebrow type="bigger">Financial Snapshot</Eyebrow>
            <p className="mb-2">
              Current Salary: ${currentMilestone.currentSalary}
            </p>
            <p className="mb-2">Savings: ${currentMilestone.savings}</p>
            <p className="mb-2">
              Retirement Account: ${currentMilestone.retirementAccount}
            </p>
            <p className="mb-2">Debt: ${currentMilestone.debt}</p>
            <p className="mb-2">
              Benefit Value to Date: ${currentMilestone.benefitValueToDate}
            </p>
            <ul className="list-disc list-inside mt-4">
              {Object.entries(currentMilestone.benefits).map(
                ([key, value], index) => (
                  <li key={index}>
                    {key}: ${value}
                  </li>
                )
              )}
            </ul>
          </ComponentWrapper>

          {/* "More Details" section that resets when milestone changes */}
          <MoreDetails
            key={currentMilestone.year}
            milestone={currentMilestone}
          />
        </section>
        <section className="mt-8">
          <Eyebrow type="bigger" className="mb-12 mt-12">
            What&apos;s Next
          </Eyebrow>
          <div className="flex flex-col gap-4">
            {currentMilestone.choices.map((choice, index) => (
              <Option
                key={index}
                choice={choice}
                index={index}
                description={choice.description}
                onClick={() => handleChoice(choice)}
              ></Option>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SimulatePage;
