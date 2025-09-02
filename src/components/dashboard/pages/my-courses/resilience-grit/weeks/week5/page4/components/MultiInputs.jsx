import '../page4.css';

const MultiInput = ({  answers,setAnswers, setErrorMessage }) => {


    const handleInputChange = (index, value) => {
      setErrorMessage("");
      // Update answers state with the new value
      setAnswers((prevAnswers) => {
        // Check if the answer already exists
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer.index === index
        );
        if (existingAnswerIndex > -1) {
          // Update existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex] = {
            ...updatedAnswers[existingAnswerIndex],
            value,
          };
          return updatedAnswers;
        } else {
          // Add new answer
          return [...prevAnswers, { index, value }];
        }
      });
    };
  return (
    <div className="multi-input-container">
      <div className="multi-input-content">
        <h2 className="multi-input-title week-2-question-text text-gray">
          Other words for coping could be: <span className="highlight-words">Deal with</span> <span className="highlight-words">Handle</span>
        </h2>
        <h2 className="multi-input-title week-2-question-text text-gray">
          Let me know if you have other words in mind.
        </h2>

        <div className="input-list">
          {[1, 2, 3, 4, 5].map((num,index) => (
            <div key={num} className="input-row">
              <div className="input-number">{num}.</div>
              <input
                type="text"
                className="multi-input-field"
                placeholder=""
                value={
                  answers?.find((answer) => answer.index === index)?.value ||
                  ""
                }
                onChange={(e)=>handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiInput;