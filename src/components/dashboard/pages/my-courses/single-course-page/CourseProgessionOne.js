
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import affirmationDecor from '../../../../../assets/affirmation-decor.png'





export default function CourseProgessionOne({ course, onClose }) {

    const [currentStep, setCurrentStep] = useState(1);


    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="course-progression-step">
                        <div className="video-div">
                            <div className="video-div">
                                <iframe
                                    className="custom-video"
                                    src="https://www.youtube.com/embed/CW-f1RVjCws"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            </div>
                        </div>

                        <div className="progression-buttons mt-5">
                            <div className="pause-play-btn">
                                <Icon icon="heroicons-outline:pause" />
                                <Icon icon="heroicons-outline:stop" />
                            </div>
                            <button className="btn progress-btn btn-dark" onClick={handleNext}>
                                Next {">>>"}
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="">
                        <div className="course-info-modal">
                            <div className="">
                                <div className="course-info-modal-header ">
                                    <h2 className='mb-0'>{course.subtitle} Course Guide</h2>

                                </div>
                                <hr className='w-100 h-auto my-0' />
                                <div className="course-info-modal-body ">
                                    <p className='progress-course-info-p'>Course Overview</p>
                                    <p>{course.description}</p>
                                    <div className="mt-4">
                                        <p className='progress-course-info-p'>Course Objectives</p>

                                        Upon completion of the Growth Mindset Course, students will be able to:
                                        <div className="objectives">
                                            <ul>
                                                {course.objectives.map((objective, index) => (
                                                    <li key={index}>
                                                        <p className='progress-course-info-p'>{objective.title}:</p> {objective.description}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );


            case 3:
                return (
                    <div className="affirmation-page">

                        <div className="d-flex flex-column align-items-center">
                            <div className="decor">
                                <img src={affirmationDecor} alt="" />
                            </div>
                            <div className="video-div">
                                <h2 className='mb-0 mt-2'>My Affirmation</h2>

                                <hr className="h-auto w-100 my-0" />

                                <div className="text-area-input mt-3">
                                    <textarea name="" id="" cols="" rows="10" placeholder='Type your affirmations in here...' />
                                </div>
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <div className="course-progression-page">
            {renderStepContent()}
        </div>
    );


    // return (
    //     <div className="course-pogression-page">
    //         <div className="video-div">
    //             <iframe
    //                 className="custom-video"
    //                 src="https://www.youtube.com/embed/CW-f1RVjCws"
    //                 title="YouTube video player"
    //                 frameborder="0"
    //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //                 allowfullscreen
    //             ></iframe>
    //         </div>
    //         <div className="progression-buttons mt-5">
    //             <div className=" pause-play-btn">
    //                 <Icon icon="heroicons-outline:pause" />
    //                 <Icon icon="heroicons-outline:stop" />

    //             </div>
    //             <button className="btn progress-btn btn-next-dark">
    //                 Next {">>>"}
    //             </button>
    //         </div>
    //     </div>
    // )
}