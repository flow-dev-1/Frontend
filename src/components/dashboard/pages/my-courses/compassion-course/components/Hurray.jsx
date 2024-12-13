// src/components/Hurray.js
import React, { useState } from "react";
import celebrate from "../../../../../../assets/celebrate.png";
import FireWorks from "./FireWork";
import Button from "./Button";

const Hurray = ({ currentWeek = 3 }) => {
  const [showFireWork, setShowFireWork] = useState(true);
  return (
    <>
      {showFireWork && <FireWorks setFirework={setShowFireWork} />}
      <div className="bg-sky-blue custom-border-20 question-box-container w-1029px d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-white font-lg">Hurray!</h1>
        <p className="text-center fs-5">
          You have made it to the <br /> end of Week {currentWeek}
        </p>
      </div>
      <div className="d-flex justify-content-center w-1029px mt-4">
        <Button text={"Next"} />
      </div>
    </>
  );
};

export default Hurray;
