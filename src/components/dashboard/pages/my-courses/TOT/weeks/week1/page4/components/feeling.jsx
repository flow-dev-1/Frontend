import feeling1 from "../../../../../../../../../assets/tot-images/feeling1.png";
import feeling2 from "../../../../../../../../../assets/tot-images/feeling2.png";
import feeling3 from "../../../../../../../../../assets/tot-images/feeling3.png";
import feeling4 from "../../../../../../../../../assets/tot-images/feeling4.png";
import feeling5 from "../../../../../../../../../assets/tot-images/feeling5.png";

import "../page4.css"

export default function Feeling({ answers = [], setAnswers }) {
  // Find if there's already a selected feeling
  const selectedFeeling = answers.find(a => a.name === 'feeling')?.value;

  const handleEmojiClick = (value) => {
    setAnswers(prev => {
      const otherAnswers = prev.filter(a => a.name !== 'feeling');
      return [...otherAnswers, { name: 'feeling', value }];
    });
  }

  return (
    <div className="modal-content position-absolute p-4 feeling-modal">
      <div className="tot-text">
        <div className="px-5 text-center">
          <h1 className="text-blue mb-4">
            How are you feeling today?
          </h1>
        </div>

        <div className="d-flex justify-content-center review-buttons gap-3">
          <button 
            className={`btn sad ${selectedFeeling === "sad" ? "selected" : ""}`}
            onClick={() => handleEmojiClick("sad")}
          >
            <img src={feeling1} alt="sadEmoji" />
            <p className="text-center mt-2">Sad</p>
          </button>
          <button 
            className={`btn sad ${selectedFeeling === "okay1" ? "selected" : ""}`}
            onClick={() => handleEmojiClick("okay1")}
          >
            <img src={feeling2} alt="okayEmoji" />
            <p className="text-center mt-2">Okay</p>
          </button>
          <button 
            className={`btn sad ${selectedFeeling === "happy" ? "selected" : ""}`}
            onClick={() => handleEmojiClick("happy")}
          >
            <img src={feeling3} alt="happyEmoji" />
            <p className="text-center mt-2">Happy</p>
          </button>
          <button 
            className={`btn sad ${selectedFeeling === "okay2" ? "selected" : ""}`}
            onClick={() => handleEmojiClick("okay2")}
          >
            <img src={feeling4} alt="okayEmoji" />
            <p className="text-center mt-2">Okay</p>
          </button>
          <button 
            className={`btn sad ${selectedFeeling === "veryhappy" ? "selected" : ""}`}
            onClick={() => handleEmojiClick("veryhappy")}
          >
            <img src={feeling5} alt="happyEmoji" />
            <p className="text-center mt-2">Happy</p>
          </button>
        </div>
      </div>
    </div>
  );
}
