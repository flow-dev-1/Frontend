
import React, { useEffect, useState } from 'react';
import '../newcourse.css';
import Modal from 'react-modal';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';



Modal.setAppElement('#root');

export default function CoreValuesQuestion() {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [connections, setConnections] = useState([]);


    const questionsArray = [
        {
            title: [
                "Generosity", "Respect", "Leadership", "Responsibility", 
                "Integrity", "Empathy", "Compassion", "Gratitude", 
                "Courage", "Forgiveness", "Perseverance", "Cooperation",
                "Kindness", "Tolerance", "Patience", "Friendship",
            ]
        },
    ];

    const [questionChecked, setQuestionChecked] = useState(
        questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
    );

    // const [questionChecked, setQuestionChecked] = useState(
    //     questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
    // );

    const handleQuestionCheck = (questionIndex, optionIndex) => {
        setQuestionChecked((prevState) => {
            const updated = { ...prevState };
            if (updated[questionIndex].includes(optionIndex)) {
                updated[questionIndex] = updated[questionIndex].filter(i => i !== optionIndex);
            } else {
                updated[questionIndex] = [...updated[questionIndex], optionIndex];
            }
            return updated;
        });
    };
    
    
    



    const renderQuestion = () => {
        const currentQuestion = questionsArray[0]; 
    
        if (currentQuestion && currentQuestion.title) {
            return (
                <div className="">
                    <div className="mindset question-box">
                        <div className='mt-2 '>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Instruction: </h1>
                                <h2 className='mb-0 d-flex ms-3 text-left'>Identify four (4) core values that resonate with you the most.</h2>
                            </div>
                            <div className="flip-div">
                                    <ul className="p-0 mt-4 ">
                                        {currentQuestion.title.map((item, index) => (
                                            <li key={index} className='d-flex align-items-center justify-content-between' >
                                           
                                                   {/* <p className='question-p'>{item}</p>   */}
                                                   <div>
                                                   <p className='question-p'>{item}</p>  
                                                </div>
                                                <img
                                                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                                                    className='cursor-pointer'
                                                    src={questionChecked[currentIndex - 1]?.includes(index) ? checkedImage : unCheckedImage}
                                                    alt=""
                                                />
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div >
            );
        }
    
        return null;
    };
    
    return (
        <div>
            {renderQuestion()}

        </div>
    );
}



