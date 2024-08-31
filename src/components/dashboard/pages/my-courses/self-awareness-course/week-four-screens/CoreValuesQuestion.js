import React, { useState } from "react";
import "../newcourse.css";
import checkedImage from "../../../../../../assets/selfawareness-images/checked.png";
import unCheckedImage from "../../../../../../assets/selfawareness-images/not-checked.png";
import NavigationButtons from "./NavigationButtons";

const chunkSize = 8; // Define chunk size for pagination

export default function CoreValuesQuestion({ onBack, onNext, onSubmit }) {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);

  const questionsArray = [
    [
      "Generosity",
      "Respect",
      "Leadership",
      "Responsibility",
      "Integrity",
      "Empathy",
      "Compassion",
      "Gratitude",
      "Courage",
      "Forgiveness",
      "Perseverance",
      "Cooperation",
      "Kindness",
      "Tolerance",
      "Patience",
      "Friendship"
    ]
  ];

  // Split the questions into chunks
  const questionChunks = questionsArray[0].reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = []; // start a new chunk
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);

  const handleQuestionCheck = (item) => {
    setSelectedValues((prevState) => {
      if (prevState.includes(item)) {
        return prevState.filter((value) => value !== item);
      } else {
        return [...prevState, item];
      }
    });
  };

  const handleNextChunk = () => {
    if (currentChunkIndex < questionChunks.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    } else {
      // Ensure at least 4 values are selected
      if (selectedValues.length < 4) {
        alert("Please select at least four core values before proceeding.");
        return;
      }
      // Submit the selected values
      onSubmit({ activity: 8, answers: selectedValues });
    }
  };

  const handlePreviousChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    } else {
      onBack();
    }
  };

  const renderQuestion = () => {
    const currentChunk = questionChunks[currentChunkIndex];

    if (currentChunk) {
      return (
        <div className="">
          <div className="mindset question-box">
            <div className="mt-2">
              <div className="question-box-header align-items-start">
                <h1 className="mb-0">Instruction:</h1>
                <h2 className="mb-0 d-flex ms-3 text-left">
                  Select the core values that resonate with you the most.
                </h2>
              </div>
              <div className="flip-div">
                <ul
                  className="p-0 mt-4 d-flex flex-wrap"
                  style={{ justifyContent: "center" }}
                >
                  {currentChunk.map((item, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-center m-2"
                      style={{
                        flex: "0 0 30%",
                        maxWidth: "25%",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <p className="question-p">{item}</p>
                      </div>
                      <img
                        onClick={() => handleQuestionCheck(item)}
                        className="cursor-pointer"
                        src={
                          selectedValues.includes(item)
                            ? checkedImage
                            : unCheckedImage
                        }
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {renderQuestion()}

      <div className="progress-container">
        <span>
          Progress: {currentChunkIndex + 1} / {questionChunks.length}
        </span>
      </div>

      <NavigationButtons
        onBack={handlePreviousChunk}
        onNext={handleNextChunk}
      />
    </div>
  );
}
