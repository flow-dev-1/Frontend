import React, { useState } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import '../newcourse.css';


export default function WeaknessIdentification({ onSubmit }) {

   

    const questionsArray = [
        "anxious", "insecure", "pessimistic", "easily distracted", "shy", 
        "jealous", "talkative", "forgetful", "overly competitive", "rigid", 
        "passive", "impulse", "overconfident", "perfectionist", "stubborn", 
        "lazy", "inflexible", "judgemental", "procrastinator", "overly emotional", 
        "moody", "sensitive", "overly critical", "disorganized", "too independent",           
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
                        <h2 className='mb-0 d-flex ms-3'> Identify your Weaknesses </h2>
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
                                <p className='question-p ms-2'>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
