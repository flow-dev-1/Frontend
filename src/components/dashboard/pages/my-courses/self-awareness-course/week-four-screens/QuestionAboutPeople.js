
import React, { useEffect, useState } from 'react';
import '../newcourse.css';



export default function QuestionAboutPeople({ onSubmit, previous }) {

    const [currentIndex, setCurrentIndex] = useState(1);

   

    const handleNextStepClick = () => {

        if (currentIndex < 3) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onSubmit();
        }
    };

    const handlePreviousStepClick = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        } else {
            previous();
        }
    };



    // Render the appropriate question based on the current index
    const renderQuestion = () => {
        switch (currentIndex) {
            case 1:

                // question one
                return (
                    <div className="">
                        <div className="mindset question-box">
                            <div className='mt-2 '>
                                <div className="question-box-header align-items-start">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>Identify three (3) important people in your live and list their names below.</h2>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="1. Type your answer here..." ></textarea>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="2. Type your answer here..." ></textarea>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="3. Type your answer here..." ></textarea>
                                </div>
                            </div>
                        </div>
                    </div >
                );

            case 2:
                // question two
                return (
                    <div className="">
                    <div className="mindset question-box">
                        <div className='mt-2 '>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 d-flex ms-3 text-left'>Write out what these people think about you.</h2>
                            </div>
                            <div className="text-area-box px-4 mt-1">
                                <textarea name="" id="" rows="3" placeholder="1. Type your answer here..." ></textarea>
                            </div>
                            <div className="text-area-box px-4 mt-1">
                                <textarea name="" id="" rows="3" placeholder="2. Type your answer here..." ></textarea>
                            </div>
                            <div className="text-area-box px-4 mt-1">
                                <textarea name="" id="" rows="3" placeholder="3. Type your answer here..." ></textarea>
                            </div>
                        </div>
                    </div>
                </div >
                );

                case 3:
                    // question two
                    return (
                        <div className="">
                        <div className="mindset question-box">
                            <div className='mt-2 '>
                                <div className="question-box-header align-items-start">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>Are you happy with what these people think about you? If no, what would you like to change? If yes, type “YES” in the box.</h2>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="1. Type your answer here..." ></textarea>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="2. Type your answer here..." ></textarea>
                                </div>
                                <div className="text-area-box px-4 mt-1">
                                    <textarea name="" id="" rows="3" placeholder="3. Type your answer here..." ></textarea>
                                </div>
                            </div>
                        </div>
                    </div >
                    );


            default:
                return null;
        }
    };

    return (
        <div>
            {renderQuestion()}

            <div className="slider-indicator">
                <ul className="p-0 mt-3">
                    {Array.from({ length: 3 }, (_, index) => (
                        <li
                            key={index + 1}
                            className={currentIndex >= index + 1 ? 'answered' : ''}
                            onClick={() => handleNextStepClick(index + 1)}
                        ></li>
                    ))}
                </ul>
            </div>
            <div className='d-flex align-items-center justify-content-around mx-auto mt-4 ' >
                <button className='btn progress-btn btn-light' onClick={handlePreviousStepClick}>{"<<<"} Back</button>
                <button className='btn progress-btn btn-dark' onClick={handleNextStepClick}>Next {">>>"}</button>
            </div>
        </div>
    );
}



