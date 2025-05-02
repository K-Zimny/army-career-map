import React, { useState } from "react";
import Question from "./Question";
import { questions } from "@/data/questionnaire";
import useQuestionnaireStore from "@/store/questionnaireStore";
import ArrowIconWhite from "@/assets/icons/arrow-white.svg";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import ProgressBar from "../ProgressBar/ProgressBar";

const Questionnaire = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { answers, setAnswer } = useQuestionnaireStore();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onSubmit(answers);
      console.log(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-[450px]">
      <ProgressBar position="quarter" text={`Intro`} />
      <div className="bar"></div>
      <Question
        question={questions[currentQuestionIndex]}
        selectedAnswer={answers[questions[currentQuestionIndex].id]}
        onAnswer={setAnswer}
      />
      <div className="flex justify-end mt-[45px]">
        {currentQuestionIndex > 0 && (
          <button
            className="px-4 py-2 rounded hover:text-army-gold"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          className="group flex px-4 py-2 rounded font-bold text-army-tan-light xl:hover:text-army-gold"
          onClick={handleNext}
        >
          <div className="self-center pr-2">
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </div>
          <img
            src={ArrowIconWhite}
            alt="Arrow Icon"
            className="xl:group-hover:hidden"
          />
          <img
            src={ArrowIconGold}
            alt="Arrow Icon"
            className="hidden xl:group-hover:block"
          />
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
