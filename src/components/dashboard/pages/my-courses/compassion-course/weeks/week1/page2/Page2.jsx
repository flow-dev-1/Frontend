import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionBox from "../../../components/QuestionBox";
import compassion from "../../../../../../../../assets/compassion.png";
import BigTextBox from "../../../components/BigTextBox";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { adminData } from "../../../../../../../../redux/reducers/adminReducer";
import { userAnswer,saveActivity } from "../../../../../../../../redux/reducers/userAnswersReducer";
import { toast } from "react-toastify";
// ... existing code ...

function Page2() {
  const dispatch = useDispatch()
  const pageData = useSelector(selectPageData);
  const adminDatas = useSelector(adminData);
  const userAnswers = useSelector(userAnswer);

  console.log(pageData,"PageData")

  const [myAnswer, setMyAnswer] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");



  const handleInputChange = (e)=>{
    setErrorMessage(""); 
    setMyAnswer(e.target.value)
  }


  return (
    <>
      <QuestionBox>
        <div className="d-flex gap-3 ms-5 align-items-center">
          <h2 className="text-blue font-lg ">Question: </h2>
          <h2 className="text-gray font-lg">
            {pageData.question}{" "}
            {pageData.hasImage && <img src={compassion} alt="compassion" />} ?
          </h2>
        </div>
        <BigTextBox handleChange={handleInputChange} />
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
      </QuestionBox>
      <div className="d-flex justify-content-center gap-96px mt-4">
        <Button text="Prev" />
        <Button text="Next"
          customOnClick={saveUserInput}
        />
      </div>
    </>
  );
}

export default Page2;
