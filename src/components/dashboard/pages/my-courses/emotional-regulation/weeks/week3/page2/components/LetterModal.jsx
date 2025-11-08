import React, { useState, useEffect } from "react";
import QuestionBox from "../../../../components/QuestionBox";
import BigTextBox from "../../../../components/BigTextBox";

function LetterModal({
  letter,
  pageQuestion,
  existingAnswer,
  onClose,
  onSave,
}) {
  const [myAnswer, setMyAnswer] = useState("");

  useEffect(() => {
    setMyAnswer(existingAnswer || "");
  }, [existingAnswer, letter]);

  const handleInputChange = (e) => {
    setMyAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (!myAnswer || myAnswer.trim() === "") return;
    onSave(letter.key, myAnswer.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn mt-4" onClick={onClose}>
          ✕
        </button>

        <QuestionBox>
          <div className="p-3 p-md-4 text-center">
            <div className="d-flex gap-3 flex-column flex-md-row flex-md-nowrap align-items-center text-center">
              <h2 className="text-blue fs-1 mb-0 flex-shrink-0 question-text">
                {letter.labelFull}:
              </h2>

              <div className="d-flex align-items-center flex-grow-1 min-w-0">
                <h2 className="text-gray fs-1 mb-0 flex-grow-1 md:text-truncate">
                  {pageQuestion}
                </h2>
              </div>
            </div>

            <div className="mt-4">
              <BigTextBox handleChange={handleInputChange} value={myAnswer} />
            </div>
          </div>
        </QuestionBox>

        <div className="d-flex justify-content-center gap-3 mt-4">
          {/* <button
            className="btn fs-5 rounded w-200px h-40px d-flex align-items-center justify-content-center bg-white text-button-blue border border-blue"
            onClick={onClose}
          >
            {"<<<"} Prev
          </button> */}
          <button
            className="fs-5 rounded w-200px h-40px d-flex align-items-center justify-content-center bg-button text-white border-0"
            onClick={handleSubmit}
            disabled={!myAnswer || myAnswer.trim() === ""}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default LetterModal;
