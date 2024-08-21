
import React, { useEffect, useState } from 'react';
import '../newcourse.css';



export default function QuestionFromVideo({ onSubmit, previous }) {

    const [currentIndex, setCurrentIndex] = useState(1);

    // const handleNextStepClick = (index) => {
    //     setCurrentIndex(index);
    //     if (currentIndex < currentIndex.length - 1) {
    //         setCurrentIndex(currentIndex + 1);
    //     } else {
    //         onSubmit();
    //     }
    // };

    const handleNextStepClick = () => {
        
        if (currentIndex < 2) { 
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
                                <div className="question-box-header">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>List five (5) lessons you got from the videos you watched</h2>
                                </div>
                                <div className='scrollable'>
                                    <div className="text-area-box px-4 my-4">
                                        <textarea name="" id="" rows="3" placeholder="1. Type your answer here..." ></textarea>
                                    </div>
                                    <div className="text-area-box px-4 my-4">
                                        <textarea name="" id="" rows="3" placeholder="2. Type your answer here..." ></textarea>
                                    </div>
                                    <div className="text-area-box px-4 my-4">
                                        <textarea name="" id="" rows="3" placeholder="3. Type your answer here..." ></textarea>
                                    </div>
                                    <div className="text-area-box px-4 my-4">
                                        <textarea name="" id="" rows="3" placeholder="4. Type your answer here..." ></textarea>
                                    </div>
                                    <div className="text-area-box px-4 my-4">
                                        <textarea name="" id="" rows="3" placeholder="5. Type your answer here..." ></textarea>
                                    </div>
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
                                <div className="question-box-header">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>List one (1) thing you will start working on, even on your growth journey.</h2>
                                </div>
                       
                                <div className="text-area-box px-4 mt-4">
                                <textarea name="" id="" rows="6" placeholder="Type your answer here..." />
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
                <ul className="p-0 mt-5">
                    {Array.from({ length: 2 }, (_, index) => (
                        <li
                            key={index + 1}
                            className={currentIndex >= index + 1 ? 'answered' : ''}
                            onClick={() => handleNextStepClick(index + 1)}
                        ></li>
                    ))}
                </ul>
            </div>
            <div className='d-flex align-items-center justify-content-around mx-auto mt-5 ' >
                    <button className='btn progress-btn btn-light' onClick={ handlePreviousStepClick}>{"<<<"} Back</button>
                    <button className='btn progress-btn btn-dark' onClick={ handleNextStepClick}>Next {">>>"}</button>
                </div>
        </div>
    );
}



