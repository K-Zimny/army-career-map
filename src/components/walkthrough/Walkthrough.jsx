"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useEventContext } from "@/contexts/EventContext";

import Header from "../text/Header";
import Copy from "../text/Copy";
import Eyebrow from "../eyebrow/Eyebrow";
import ComponentWrapper from "../componentwrapper/ComponentWrapper";
import Button from "../text/Button";
import useSimulationStore from "@/store/simulationStore";
import AccordionWrapper from "../accordionwrapper/AccordionWrapper";

export default function Walkthrough() {
  const pathname = usePathname();
  const { eventState } = useEventContext(); // year
  const { path } = useSimulationStore(); // full career path
  const [content, setContent] = useState(null);
  const [isWalkthrough, setIsWalkthrough] = useState(true);

  const Home = () => (
    <>
      <Header type="h1" className="mt-4">
        Find a career that matters
      </Header>
      <Copy>
        This app empowers Army prospects to take control of their career journey
        by providing a clear, personalized roadmap beyond basic training.
        Through a brief questionnaire, users receive tailored career paths based
        on their goals and interests.
      </Copy>
      <Copy>
        With interactive mapping and detailed role insights, the tool serves as
        a professional guide for exploring career options and planning a
        successful future in the Army.
      </Copy>
      <Copy>Select "Get Started" in the App to begin your Journey.</Copy>
      <AccordionWrapper
        title="Additional Resources"
        className="pl-0 font-normal"
      >
        <Button className="pb-0" href="/menu">
          Mission
        </Button>
        <Button
          className="pb-0"
          href="https://github.com/OMC-Critical-Mass/hackathon-career-map"
        >
          Code
        </Button>
        <Button
          className="pb-0"
          href="https://www.figma.com/proto/qXn5GKshgExGESr2t8oVmD/Hackathon?page-id=0%3A1&node-id=25-18777&viewport=-746%2C1112%2C0.21&t=PWBUKRUnAdPeqtrP-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=25%3A18777"
        >
          UI/UX
        </Button>
        <Button
          className="pb-0"
          href="https://goarmy.atlassian.net/wiki/spaces/~712020696170008ebc451cb8fa003ba2c15690/pages/899940380/Army+Career+Map+Dreamin"
        >
          Product Vision
        </Button>
      </AccordionWrapper>
    </>
  );

  const Questionnaire = () => (
    <>
      <Header type="h1" className="mt-4">
        Questionnaire
      </Header>
      <Header>Are you boots on the ground or behind the scenes?</Header>
      <Copy>
        We’ll ask you a few quick questions about your goals, skills, and
        interests—like 'Do you want to lead a team?' or 'Are you into tech or
        hands-on work?' In just a few taps, we’ll start building a career path
        that’s all about you.
      </Copy>
    </>
  );

  const Simulate = () => {
    const milestone = path.find((m) => m.year === eventState); // Find milestone by year
    if (!milestone) return <p>Loading simulation...</p>;

    return (
      <>
        <Header type="h1">Simulation</Header>
        <Copy>
          The simulation page processes questionnaire responses and sends them
          to OpenAI's GPT model to generate a realistic career milestone,
          including details like rank, salary, benefits, and achievements.
        </Copy>
        <Copy>
          At each milestone, the user selects from predefined choices, which are
          appended to the simulation state and sent back to the model to
          generate the next stage. This creates a dynamic, branching experience
          tailored to the user's decisions.
        </Copy>
        <AccordionWrapper title="Milestone AI Response" className="pl-0">
          <div className="text-[12px] text-army-tan-light">
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {JSON.stringify(milestone, null, 2)}
            </pre>
          </div>
        </AccordionWrapper>
      </>
    );
  };

  const Results = () => (
    <>
      <Header type="h1">Results</Header>
      <Copy>
        The results page completes the simulation by sending the user's full
        journey—including questionnaire responses, selected choices, and the
        generated career path—to an API powered by OpenAI's GPT model.
      </Copy>
      <Copy>
        The API returns a final summary featuring a brief overview of the user’s
        simulated career and a curated list of 3–5 official goarmy.com
        resources. This marks the conclusion of the experience, providing a
        structured recap and actionable links to explore real-world Army
        opportunities.
      </Copy>
    </>
  );

  const handleClick = () => {
    setIsWalkthrough((prev) => !prev);
  };

  useEffect(() => {
    switch (pathname) {
      case "/":
        setContent(<Home />);
        break;
      case "/questionnaire":
        setContent(<Questionnaire />);
        break;
      case "/simulate":
        setContent(<Simulate />);
        break;
      case "/results":
        setContent(<Results />);
        break;
      default:
        setContent(<p>Page not recognized.</p>);
        break;
    }
  }, [pathname, eventState, path]); // 👈 Include `path` for accurate milestone lookups

  return (
    <>
      <button
        className={`hidden ${
          isWalkthrough ? "xl:hidden" : "xl:inline"
        } absolute top-10 left-4 text-sm uppercase text-center p-[14px] rounded-[9px] mb-[9px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold`}
        onClick={handleClick}
      >
        Notes
      </button>

      <section
        className={`hidden ${
          isWalkthrough ? "xl:block" : "hidden"
        } w-2/4 max-w-[550px] rounded`}
      >
        <ComponentWrapper className="sticky top-10 !p-0 !my-16">
          <div>
            <Eyebrow>Army Career Map</Eyebrow>
            {content}
            {pathname === "/" ? null : (
              <button
                className="mt-8 text-sm uppercase text-center p-[14px] rounded-[9px] mb-[9px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold"
                onClick={handleClick}
              >
                Close
              </button>
            )}
          </div>
        </ComponentWrapper>
      </section>
    </>
  );
}
