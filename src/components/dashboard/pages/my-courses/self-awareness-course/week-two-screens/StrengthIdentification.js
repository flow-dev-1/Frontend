import React, { useState } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';

import '../newcourse.css';

export default function StrengthIdentification({ onSubmit }) {

   

    const questionsArray = [
        "creative", "energetic", "honest", "responsible", "organized", 
        "patient", "friendly", "confident", "good listener", "team player", 
        "brave", "analytical", "compassionate", "hardworking", "trustworthy", 
        "flexible", "determined", "emphatic", "cooperative", "problem solver", 
        "curious", "dependable", "adaptable", "enthusiastic", "kind", 
        "generous", "respectful", "good communicator", "ability to lead", "detail-oriented",           
    ];
    
    const [questionChecked, setQuestionChecked] = useState(
        questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}) // Initialize with false (unchecked)
    );

    const handleQuestionCheck = (questionIndex) => {
        setQuestionChecked((prevState) => ({
            ...prevState,
            [questionIndex]: !prevState[questionIndex], // Toggle the checked state
        }));
    };

    return (
        <div className="">
            <div className="week-two question-box py-4">
                <div className='d-flex align-items-start'>
                    <div className="question-box-header mx-auto">
                        <h1 className='mb-0 '>Question: </h1>
                        <h2 className='mb-0 d-flex ms-3'> Identify Your Strength </h2>
                    </div>
                </div>
                <div className="assessment checkbox-questions mt-4">
                    <ul className="p-0">
                        {questionsArray.map((item, index) => (
                            <li key={index} className='d-flex'>
                                <img
                                    onClick={() => handleQuestionCheck(index)} // Use index directly
                                    className='cursor-pointer'
                                    src={questionChecked[index] ? checkedImage : unCheckedImage} // Check if current question is checked
                                    alt=""
                                />
                                <p className='question-p ms-2 text-nowrap'>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
