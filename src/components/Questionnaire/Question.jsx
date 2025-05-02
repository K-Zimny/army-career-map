import React from "react";

const Question = ({ question, selectedAnswer, onAnswer }) => {
  const isMultipleSelection = question.allowMultiple;

  const handleOptionClick = (option) => {
    if (isMultipleSelection) {
      const currentSelections = Array.isArray(selectedAnswer)
        ? selectedAnswer
        : [];
      const updatedSelections = currentSelections.includes(option)
        ? currentSelections.filter((item) => item !== option) // Remove if already selected
        : [...currentSelections, option]; // Add if not selected
      onAnswer(question.id, updatedSelections); // Update the answer with the new selections
    } else {
      onAnswer(question.id, option);
    }
  };

  return (
    <div>
      <div className="text-[14px] mb-[45px] text-left font-bold uppercase leading-[36px] text-army-tan-light">
        {question.id.replace("q", "")}/4
      </div>
      <h2 className="text-[27px] text-left font-normal leading-[36px] text-army-tan-light">
        {question.question}
      </h2>
      {question.subtitle && (
        <h3 className="text-[18px] mt-[18px] text-army-tan-light">
          {question.subtitle}
        </h3>
      )}
      <ul className="mt-[45px]">
        {question.options.map((option) => (
          <li key={option}>
            <button
              className={`w-full text-[14px] text-army-tan-light text-left p-[18px] rounded-[9px] mb-[18px] border border-army-tan-light hover:bg-army-tan-light hover:text-primary-army-black ${
                Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                  ? "bg-army-tan-light text-primary-army-black"
                  : selectedAnswer === option
                  ? "bg-army-tan-light text-primary-army-black"
                  : "bg-primary-army-black text-army-tan-light"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
