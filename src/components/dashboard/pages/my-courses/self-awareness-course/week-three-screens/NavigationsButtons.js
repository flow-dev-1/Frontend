const NavigationButtons = ({ onBack, onNext, isBackDisabled = false }) => (
  <div className="d-flex align-items-center justify-content-around mx-auto mt-5">
    {!isBackDisabled && (
      <button className="btn progress-btn btn-light" onClick={onBack}>
        {"<<<"} Back
      </button>
    )}
    <button className="btn progress-btn btn-dark" onClick={onNext}>
      Next {">>>"}
    </button>
  </div>
);

export default NavigationButtons;
