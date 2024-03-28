
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import affirmationDecor from '../../../../../assets/affirmation-decor.png'
import AllAboutMeForm from './AllAboutMeForm';





export default function CourseProgessionOne({ course, onClose }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(null);

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
                //Afirmation
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
            case 4:
                //aboutme
                return (
                    <div className="all-about-me-page">
                        <h2 className=''>All About Me</h2>

                        <hr className="h-auto w-100 " />
                        <div className="mt-2h about-me-bg">

                            <div className="">

                                <AllAboutMeForm />

                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Submit</button>
                        </div>
                    </div>
                );

            case 5:
                //summayaboutme
                return (
                    <div className="summary-me">

                        <div className="aboutme-monkey">
                            <div className="about-me-tag">

                            </div>

                            <div className="about-me-boxes">
                                <div className="box favourite">
                                    <Icon icon="ph:heart-duotone" />
                                    <h6>What is your Favorites</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                        <li>Pet</li>
                                        <li>Subject</li>
                                    </ul>

                                </div>

                                <div className="fun-fact-boxes">
                                <div className="box favourite">
                                <Icon icon="mingcute:thumb-up-line" />
                                <h6>I Like</h6>
                                    <ul>
                                        <li>Dancing</li>
                                        <li>Swimming</li>
                                    </ul>

                                </div>
                                <div className="box favourite">
                                <Icon icon="fluent:emoji-48-regular" />
                                <h6>Fun Fact</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                    </ul>

                                </div>
                                <div className="box favourite">
                                    <Icon icon="ph:heart-duotone" />
                                    <h6>What is your Favorites</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                        <li>Pet</li>
                                        <li>Subject</li>
                                    </ul>

                                </div>
                                <div className="box favourite">
                                    <Icon icon="ph:heart-duotone" />
                                    <h6>What is your Favorites</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                        <li>Pet</li>
                                        <li>Subject</li>
                                    </ul>

                                </div>
                                <div className="box favourite">
                                    <Icon icon="ph:heart-duotone" />
                                    <h6>What is your Favorites</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                        <li>Pet</li>
                                        <li>Subject</li>
                                    </ul>

                                </div>
                                <div className="box favourite">
                                    <Icon icon="ph:heart-duotone" />
                                    <h6>What is your Favorites</h6>
                                    <ul>
                                        <li>Food</li>
                                        <li>animal</li>
                                        <li>Pet</li>
                                        <li>Subject</li>
                                    </ul>

                                </div>
                                </div>
                            </div>

                        </div>


                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next</button>
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



}