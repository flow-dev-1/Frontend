
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import checkedImage from '../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../assets/selfawareness-images/not-checked.png';

import './newcourse.css'
import Modal from 'react-modal';
import ReviewPopUp from '../../../../modals-pages/dashboard-modals/ReviewModal';



export default function AssessmentForm({ onSubmit }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [reviewPopUp, setReviewPopUp] = React.useState(false)

    const handleStepClick = (index) => {
        setCurrentIndex(index);
        if (currentIndex < currentIndex.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }

        if (currentIndex === 5) {

            setTimeout(() => {
                setReviewPopUp(true);
    
                setTimeout(() => {
                    setReviewPopUp(false);
                }, 10000);
            }, 8000);
        }
        
        
    };




    const closeReviewPopUp = () => {
        setReviewPopUp(false);
    };


    const questionsArray = [

        {
            title: "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
            questionList: [
                "A. You immediately take charge, assigning tasks to ensure everything is done efficiently.",
                "B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.",
                "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.",
                "D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.",

            ]
        },
        {
            title: "A disagreement arises between two of your friends. How do you handle the situation?",
            questionList: [
                "A. You step in quickly, mediating the situation and making sure a decision is reached promptly.",
                "B. You listen carefully to both sides, offering thoughtful advice and ensuring everyone feels heard.",
                "C. You stay calm and analyze the situation, considering all factors before suggesting a fair solution.",
                "D. You try to lighten the mood with humor, helping everyone to see the brighter side of things.",
            ],
        },
        {
            title: "You have an important test coming up. How do you prepare?",
            questionList: [
                "A. You create a strict study schedule and stick to it, making sure you cover all the material thoroughly.",
                "B. You focus on the key concepts and practice what you find challenging, working efficiently.",
                "C. You organize a study group, where you can discuss and review the material with friends.",
                "D. You take a systematic approach, reviewing your notes and making sure you understand everything in detail.",

            ],
        },
        {
            title: "Your friends ask you to plan a fun weekend activity. What do you decide to do?",
            questionList: [
                "A. You organize a well-structured day, with planned activities that everyone will enjoy.",
                "B. You suggest a spontaneous adventure, keeping the plans flexible and open to change.",
                "C. You propose a competitive game or sport, something that challenges everyone and brings out their best.",
                "D. You choose a relaxing activity, like a nature walk or a visit to a quiet spot where everyone can unwind.",
            ],
        },
        {
            title: "You’re given a challenging task with a tight deadline. How do you handle the pressure?",
            questionList: [
                "A. You take control and work swiftly, focusing on getting the task done efficiently.",
                "B. You stay organized and methodical, breaking down the task into manageable steps.",
                "C. You seek help or advice from others to ensure the task is completed to a high standard.",
                "D. You try to keep the situation light, using humor to stay relaxed and motivated.",
            ],
        },

    ];



    const [questionChecked, setQuestionChecked] = useState(
        questionsArray.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {})
    );

    const handleQuestionCheck = (questionIndex, optionIndex) => {
        setQuestionChecked((prevState) => {
            const updated = { ...prevState };
            // Toggle the checked state for the specific question and option
            if (updated[questionIndex].includes(optionIndex)) {
                updated[questionIndex] = updated[questionIndex].filter(i => i !== optionIndex);
            } else {
                updated[questionIndex] = [...updated[questionIndex], optionIndex];
            }
            return updated;
        });
    };


    // Render the appropriate question based on the current index
    const renderQuestion = () => {
        switch (currentIndex) {
            case 1:
                return (
                    <div className="">
                        <div className="assessment question-box py-5">
                            <div className='mt-2'>
                                <div className="assessment-box">
                                    <h2>Assesment</h2>
                                    Scenario around your personality colors.
                                </div>
                                <h2 className='my-5 text-justify mx-auto w-75'>
                                    Before we proceed, please write down the result of your personality test. What is your personality colour?
                                </h2>
                                <div className="text-area-box px-4">
                                    <textarea name="" id="" rows="3" placeholder="Type your answer here..." ></textarea>
                                </div>
                            </div>

                        </div>

                    </div>
                );

            case 2:

                // question one
                return (
                    <div className="">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start'>
                                <h1>1.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - currentIndex].title}</h2>
                            </div>
                            <div className="checkbox-questions">
                                <ul className="p-0">

                                    {questionsArray[currentIndex - currentIndex].questionList.map((item, index) => (
                                        <li key={index} className='d-flex my-3'>
                                            <img
                                                onClick={() => handleQuestionCheck(currentIndex - currentIndex, index)}
                                                className='cursor-pointer'
                                                src={questionChecked[currentIndex - currentIndex].includes(index) ? checkedImage : unCheckedImage}
                                                alt=""
                                            />

                                            <p className='question-p ms-3'>{item}</p>
                                        </li>
                                    ))}


                                </ul>


                            </div>

                        </div>
                    </div>
                );

            case 3:
                // question two
                return (
                    <div className="">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start'>
                                <h1>2.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 2].title}</h2>
                            </div>
                            <div className="checkbox-questions">
                                <ul className="p-0">

                                    {questionsArray[currentIndex - 2].questionList.map((item, index) => (
                                        <li key={index} className='d-flex my-3'>
                                            <img
                                                onClick={() => handleQuestionCheck(currentIndex - 2, index)}
                                                className='cursor-pointer'
                                                src={questionChecked[currentIndex - 2].includes(index) ? checkedImage : unCheckedImage}
                                                alt=""
                                            />

                                            <p className='question-p ms-3'>{item}</p>
                                        </li>
                                    ))}


                                </ul>


                            </div>

                        </div>
                    </div>
                );

            case 4:
                // question three
                return (
                    <div className="">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start'>
                                <h1>3.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 2].title}</h2>
                            </div>
                            <div className="checkbox-questions">
                                <ul className="p-0">

                                    {questionsArray[currentIndex - 2].questionList.map((item, index) => (
                                        <li key={index} className='d-flex my-3'>
                                            <img
                                                onClick={() => handleQuestionCheck(currentIndex - 2, index)}
                                                className='cursor-pointer'
                                                src={questionChecked[currentIndex - 2].includes(index) ? checkedImage : unCheckedImage}
                                                alt=""
                                            />

                                            <p className='question-p ms-3'>{item}</p>
                                        </li>
                                    ))}


                                </ul>


                            </div>

                        </div>
                    </div>
                );

            case 5:
                // question four
                return (
                    <div className="">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start'>
                                <h1>4.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 2].title}</h2>
                            </div>
                            <div className="checkbox-questions">
                                <ul className="p-0">

                                    {questionsArray[currentIndex - 2].questionList.map((item, index) => (
                                        <li key={index} className='d-flex my-3'>
                                            <img
                                                onClick={() => handleQuestionCheck(currentIndex - 2, index)}
                                                className='cursor-pointer'
                                                src={questionChecked[currentIndex - 2].includes(index) ? checkedImage : unCheckedImage}
                                                alt=""
                                            />

                                            <p className='question-p ms-3'>{item}</p>
                                        </li>
                                    ))}


                                </ul>


                            </div>

                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start'>
                                <h1>5.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 2].title}</h2>
                            </div>
                            <div className="checkbox-questions">
                                <ul className="p-0">

                                    {questionsArray[currentIndex - 2].questionList.map((item, index) => (
                                        <li key={index} className='d-flex my-3'>
                                            <img
                                                onClick={() => handleQuestionCheck(currentIndex - 2, index)}
                                                className='cursor-pointer'
                                                src={questionChecked[currentIndex - 2].includes(index) ? checkedImage : unCheckedImage}
                                                alt=""
                                            />

                                            <p className='question-p ms-3'>{item}</p>
                                        </li>
                                    ))}


                                </ul>


                            </div>

                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            {renderQuestion()}

            <div className="slider-indicator">
                <ul className="p-0 mt-5">
                    {Array.from({ length: 6 }, (_, index) => (
                        <li
                            key={index + 1}
                            className={currentIndex >= index + 1 ? 'answered' : ''}
                            onClick={() => handleStepClick(index + 1)}
                        ></li>
                    ))}
                </ul>
            </div>

            {reviewPopUp && (
                <Modal
                    isOpen={reviewPopUp}
                    onRequestClose={closeReviewPopUp}
                    contentLabel="Example Modal"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    shouldCloseOnOverlayClick={true}
                >
                    <ReviewPopUp />
                </Modal>
            )}
        </div>
    );
}



