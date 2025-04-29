"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../text/Header";
import Copy from "../text/Copy";
import Eyebrow from "../eyebrow/Eyebrow";
import ComponentWrapper from "../componentwrapper/ComponentWrapper";
import Button from "../text/Button";

export default function Walkthrough() {
  const pathname = usePathname();
  const [content, setContent] = useState(null);
  const [isWalkthrough, setIsWalkthrough] = useState(true);

  const Home = () => {
    return (
      <>
        <Header type="h1" className="mt-4">
          Meet Jane Rambo
        </Header>
        <Header>Description</Header>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>Select "Get Started" in the App to begin your Journey.</Copy>
        <Button>Walkthrough</Button>
        <Button>UI/UX</Button>
        <Button>Code</Button>
        <Button>Reflections</Button>
      </>
    );
  };

  const Questionnaire = () => {
    return (
      <>
        <Header type="h1" className="mt-4">
          Questionnaire
        </Header>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
      </>
    );
  };

  const Simulate = () => {
    return (
      <>
        <Header type="h1">Simulation</Header>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
      </>
    );
  };

  const Results = () => {
    return (
      <>
        <Header type="h1">Results</Header>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
        <Copy>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          libero omnis quo quasi facere tempore, explicabo voluptatibus unde
          velit a adipisci dolor, ea aperiam dolorem animi perferendis iste
          saepe placeat?
        </Copy>
      </>
    );
  };

  const handleClick = () => {
    setIsWalkthrough((prev) => {
      return !prev;
    });
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
  }, [pathname]);

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
        } w-2/4 p-6 min-h-screen max-w-[550px] rounded`}
      >
        <ComponentWrapper className="sticky top-10">
          <div>
            <Eyebrow>Army Career Map</Eyebrow>
            {content}
            <button
              className="mt-8 text-sm uppercase text-center p-[14px] rounded-[9px] mb-[9px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black hover:font-bold"
              onClick={handleClick}
            >
              Close
            </button>
          </div>
        </ComponentWrapper>
      </section>
    </>
  );
}
