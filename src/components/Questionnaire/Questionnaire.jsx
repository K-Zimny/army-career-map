import React, { useState } from "react";
import Question from "./Question";
import { questions } from "@/data/questionnaire";
import useQuestionnaireStore from "@/store/questionnaireStore";
import ArrowIcon from "@/assets/icons/arrow.svg";
import ProgressBar from "../ProgressBar/ProgressBar";

const Questionnaire = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { answers, setAnswer } = useQuestionnaireStore();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onSubmit(answers); // Submit answers when all questions are answered
      console.log(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="max-w-3xl">
      <ProgressBar position="quarter" text={`Intro`} />
      <div className="bar"></div>
      <Question
        question={questions[currentQuestionIndex]}
        selectedAnswer={answers[questions[currentQuestionIndex].id]}
        onAnswer={setAnswer}
      />
      <div className="flex justify-end mt-[45px]">
        {currentQuestionIndex > 0 && (
          <button className="px-4 py-2 rounded" onClick={handleBack}>
            Back
          </button>
        )}
        <button className="px-4 py-2 rounded font-bold" onClick={handleNext}>
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
        </button>
        <img src={ArrowIcon} alt="Arrow Icon" className="" />
      </div>
    </div>
  );
};

export default Questionnaire;
