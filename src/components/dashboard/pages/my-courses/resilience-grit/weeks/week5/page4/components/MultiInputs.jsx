import '../page4.css';

const MultiInput = ({pageData}) => {
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
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="input-row">
              <div className="input-number">{num}.</div>
              <input 
                type="text" 
                className="multi-input-field"
                placeholder=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiInput;