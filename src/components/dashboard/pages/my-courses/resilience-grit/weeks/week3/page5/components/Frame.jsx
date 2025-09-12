import React, { useState } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import MediumTextBox from "../../../../components/MediumTextBox";
import futureMe from "../../../../../../../../../assets/dearFutureMe.png";

function Frame({ data, answers, setAnswers, setErrorMessage }) {
    const { step, title, questions } = data;

    const handleInputChange = (value) => {
        setErrorMessage("");
        // Update answers state with the new value
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            const stepIndex = updatedAnswers.findIndex(
                (answer) => answer.stepId === step
            );

            if (stepIndex !== -1) {
                updatedAnswers[stepIndex] = {
                    ...updatedAnswers[stepIndex],
                    value: value
                };
            } else {
                updatedAnswers.push({
                    stepId: step,
                    value: value,
                });
            }

            return updatedAnswers;
        });
    };

    return (
        <QuestionBox>
            <div className="d-flex flex-column align-items-center text-start text-md-center w-100">

                {questions.map((q, index) => (
                    <div
                        key={index}
                        className="mb-2 w-100 d-flex flex-column align-items-start"
                    >
                        <div className="d-flex gap-2 flex-column flex-md-row justify-content-md-center align-items-md-baseline mb-2">
                            <h2 className="text-blue text-nowrap week-2-question-text">Situation {step - 1}:</h2>
                            <h2 className="text-gray text-start week-2-question-text">{q.question}</h2>
                        </div>

                        <MediumTextBox
                            value={
                                answers.find((answer) => answer.stepId === step)?.value || ""
                            }
                            handleChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </QuestionBox>
    );
}

export default Frame;
