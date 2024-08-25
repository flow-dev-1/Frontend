
import React, { useEffect, useState } from 'react';
import '../newcourse.css';
import Modal from 'react-modal';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import imageMap from './imageMapping';


Modal.setAppElement('#root');

export default function MindSetFlipQuestion({ onSubmit, previous }) {

    const [currentIndex, setCurrentIndex] = useState(1);

    const [valueDescription, setValueDescription] = useState(null);

    const questionsArray = [
        {
            title: [
                "Generosity", "Respect", "Leadership", "Responsibility", "Integrity", "Empathy", "Compassion", "Gratitude", "Courage", "Forgiveness", "Perseverance", "Cooperation",
                "Kindness", "Tolerance", "Patience", "Friendship", "Teamwork", "Organization", "Grit", "Resilience", "Adaptability", "Contentment", "Honor", "Moderation",
                "Spirituality", "Healthy Life", "Family", "Resourcefulness", "Mindfulness", "Creativity", "Curiosity", "Punctuality", "Courtesy", "Self-control", "Self-discipline", "Optimism",
            ]
        },
        // You can add more questions here if needed
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
    
    
    
    const handleItemClick = (item) => {
        setValueDescription(item);
        console.log("clicked", item);
    };

    const handleModalClose = () => {
        setValueDescription(null);
    };


    const renderQuestion = () => {
        // Make sure to access the correct item in `questionsArray`
        const currentQuestion = questionsArray[0]; // Adjust index if you have multiple questions
    
        if (currentQuestion && currentQuestion.title) {
            return (
                <div className="">
                    <div className="mindset question-box">
                        <div className='mt-2 '>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Instruction: </h1>
                                <h2 className='mb-0 d-flex ms-3 text-left'>Flip each card to know more about the values. Select the box on each card to pick the values you feel are a big part of who you are.</h2>
                            </div>
                            <div className='scrollable'>
                                <div className="flip-div">
                                    <ul className="p-0 mt-4 ">
                                        {currentQuestion.title.map((item, index) => (
                                            <li key={index} className='d-flex align-items-center justify-content-between' >
                                           
                                                   {/* <p className='question-p'>{item}</p>   */}
                                                   <div onClick={() => handleItemClick(item)}>
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
                    </div>
                </div >
            );
        }
    
        return null;
    };
    
    return (
        <div>
            {renderQuestion()}

            {valueDescription && (
                   <Modal
                   isOpen={valueDescription}
                   onRequestClose={handleModalClose}
                   contentLabel="Example Modal"
                   className="custom-modal"
                   overlayClassName="custom-overlay"
                   shouldCloseOnOverlayClick={true}
               >
              <div className=" w-0">
                    {valueDescription && (
                        <img
                            src={imageMap[valueDescription] || ''}
                            alt={valueDescription}
                            onClick={handleModalClose}
                            className='value-description-img'
                        />
                    )}
                </div>
                </Modal>
            )}
        </div>
    );
}



