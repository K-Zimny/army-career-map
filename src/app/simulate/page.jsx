"use client";

import React, { useState, useEffect } from "react";
import useSimulationStore from "../../store/simulationStore";
import useQuestionnaireStore from "@/store/questionnaireStore";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import ComponentWrapper from "@/components/componentwrapper/ComponentWrapper";
import StatsBar from "@/components/statsBar/StatsBar";
import Eyebrow from "@/components/eyebrow/Eyebrow";
import Option from "@/components/option/Option";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import AccordionWrapper from "@/components/accordionwrapper/AccordionWrapper";
import CustomText from "@/components/customtext/CustomText";
import { headlines } from "@/data/headlines";
import Walkthrough from "@/components/walkthrough/Walkthrough";
import { useEventContext } from "@/contexts/EventContext";

const SimulatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("/jane.svg");

  const {
    currentMilestone,
    setCurrentMilestone,
    addChoice,
    choices,
    setPath,
    path,
  } = useSimulationStore();
  const { answers } = useQuestionnaireStore();
  const { setEventState } = useEventContext();

  useEffect(() => {
    let isMounted = true;

    const fetchInitialMilestone = async () => {
      try {
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
          setCurrentMilestone(path[0]);
        } else {
          fetchInitialMilestone();
        }
      }
    };

    initializeMilestone();

    return () => {
      isMounted = false;
    };
  }, [setCurrentMilestone, answers]);

  useEffect(() => {
    if (currentMilestone) {
      const milestoneImages = {
        1: "/1.png",
        5: "/2.png",
        10: "/3.png",
        15: "/4.png",
        20: "/5.png",
      };
      setImageSrc(milestoneImages[currentMilestone.year] || "/jane.svg");
    }
  }, [currentMilestone]);

  useEffect(() => {
    if (currentMilestone?.year) {
      setEventState(currentMilestone.year);
    }
  }, [currentMilestone?.year, setEventState]);

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
      setPath(data.careerPath);
      setCurrentMilestone(data.careerPath);
    } catch (error) {
      console.error("Error fetching next milestone:", error);
    }

    setIsLoading(false);
  };

  if (!currentMilestone || Array.isArray(currentMilestone)) {
    return <Loader isLoading={isLoading} />;
  }

  const currentHeadline = headlines.find((headline) => {
    if (currentMilestone.year === 1) return headline.id === "headline1";
    if (currentMilestone.year === 5) return headline.id === "headline2";
    if (currentMilestone.year === 10) return headline.id === "headline3";
    if (currentMilestone.year === 15) return headline.id === "headline4";
    if (currentMilestone.year === 20) return headline.id === "headline5";
  });

  return (
    <div className="text-army-tan-light">
      <div className="flex flex-row justify-center min-h-screen items-center gap-32">
        <Walkthrough />
        <div className="p-4 max-w-[450px] bg-primary-army-black overflow-x-hidden phone-wrapper relative">
          <div className="fade">
            <Loader isLoading={isLoading} currentMilestone={currentMilestone} />
            <section className="mb-8">
              <ProgressBar position="middle" text="YOUR PATH" />
              <Eyebrow type="bigger" className="mt-12 mb-12">
                Year {currentMilestone.year}
              </Eyebrow>
              <div className="text-3xl mb-8">
                {currentHeadline && (
                  <CustomText segments={currentHeadline.segments} />
                )}
              </div>
              <Image
                className="w-full"
                src={imageSrc}
                alt="Jane Doe"
                width={768}
                height={554}
                priority
              />

              <StatsBar
                rank={currentMilestone.rank}
                age={currentMilestone.age}
                salary={currentMilestone.currentSalary}
              />

              <h2 className="text-[21px] mb-[18px]">Profile</h2>
              <ComponentWrapper>
                <p className="text-lg">{currentMilestone.description}</p>
              </ComponentWrapper>

              <AccordionWrapper
                title={`${currentMilestone.rank.title} (${currentMilestone.rank.shortTitle})`}
              >
                <p className="mb-2">{currentMilestone.rank.description}</p>
              </AccordionWrapper>

              <AccordionWrapper title={currentMilestone.benefitInfo.title}>
                <p className="mb-2">
                  {currentMilestone.benefitInfo.description}
                </p>
              </AccordionWrapper>

              <AccordionWrapper title="Compensation">
                <p className="mb-2">
                  Your total compensation is $
                  {currentMilestone.currentSalary +
                    currentMilestone.benefitValueToDate}
                  , here's how it breaks down:
                </p>
                <ul className="list-disc list-inside mt-4 text-army-tan-light">
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
                  <button
                    className="text-lg uppercase text-center w-full p-[18px] rounded-[9px] mb-[18px] bg-army-tan-light text-primary-army-black hover:bg-army-gold hover:text-primary-army-black font-bold"
                    onClick={() => (window.location.href = "/results")}
                  >
                    Take the Next Step
                  </button>
                ) : (
                  currentMilestone.choices.map((choice, index) => (
                    <Option
                      key={index}
                      choice={choice}
                      index={index}
                      description={choice.description}
                      onClick={() => handleChoice(choice)}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatePage;
