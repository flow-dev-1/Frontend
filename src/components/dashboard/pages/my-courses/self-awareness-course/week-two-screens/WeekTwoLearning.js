
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import MyFireWorks from '../Fireworks';
import celebrate from '../../../../../../assets/celebrate.png';
import selfAwareness from '../../../../../../assets/selfawareness-images/strengthweakness.png';
import StrengthIdentification from './StrengthIdentification';
import WeaknessIdentification from './WeaknessIdentification';
import ScenarioQuestions from './ScenarioQuestions';
import WeekTwoAssessmentForm from './WeekTwoAssessmentForm';








export default function WeekTwoLearning({ course, onClose, currentWeekIndex }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({

        affirmation: '',
    });
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [reviewPopUp, setReviewPopUp] = useState(false)
    const navigate = useNavigate();


    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const closeReviewPopUp = () => {
        setReviewPopUp(false);
    };

    useEffect(() => {
        console.log("Form Data submitted:", formData);
    }, [formData]);



    const handleReviewPopUp = () => {
        setReviewPopUp(true);
    };

    // Navigation function to handle proceeding to the next week
    const handleNextWeekCourse = () => {
        // Increment currentWeekIndex and navigate to the SelfAwarenessCourse with updated index
        const nextWeekIndex = currentWeekIndex + 1;
        navigate('/dashboard/self-awareness-course/1', { state: { course, weekIndex: nextWeekIndex } });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                // introductory-video
                return (
                    <div className="course-progression-step">
                        <div className="video-div">
                            <div className="video-div">
                                {videoPlaying ? (
                                    <iframe
                                        className="custom-video"
                                        src="https://www.youtube.com/embed/CW-f1RVjCws"
                                        title="YouTube video player"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="video-thumbnail">

                                        <div className="play-button" onClick={() => setVideoPlaying(true)}>
                                            <Icon icon="carbon:play-outline" className="play-icon" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="progression-buttons mt-3">
                            <button className="btn progress-btn btn-dark" onClick={handleNext}>
                                Next {">>>"}
                            </button>
                        </div>
                    </div>
                );

            case 2:
                //  self-awareness question
                return (
                    <div className="">
                        <div className="question-box py-4">
                            <div className="question-box-header ">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 ms-3 text-nowrap'> What do you understand by </h2>
                                <img src={selfAwareness} alt="selfAwareness image" className='mx-2' />
                                <h2 className=''>?</h2>
                            </div>
                            <div className="text-area-box px-4 mt-4">
                                <textarea name="" id="" rows="6" placeholder="Type your answer here..." />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 3:
                // animation video one
                return (
                    <div className="">

                        <div className="video-div">
                            <div className="video-div">
                                {videoPlaying ? (
                                    <iframe
                                        className="custom-video"
                                        src="https://www.youtube.com/embed/CW-f1RVjCws"
                                        title="YouTube video player"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="video-thumbnail">

                                        <div className="play-button" onClick={() => setVideoPlaying(true)}>
                                            <Icon icon="carbon:play-outline" className="play-icon" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 4:
                // Strength assessment
                return (
                    <div className="assessment-page">

                        <div className="">

                            <StrengthIdentification onSubmit={handleNext} />

                        </div>
                        {/* <button className='btn' onClick={handleReviewPopUp}>click here</button> */}

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5 '>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>


                    </div>
                );

            case 5:
                // Weaknesses assessment
                return (
                    <div className="assessment-page">

                        <div className="">

                            <WeaknessIdentification onSubmit={handleNext} />

                        </div>
                        {/* <button className='btn' onClick={handleReviewPopUp}>click here</button> */}

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5 '>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>


                    </div>
                );

                case 6:
                    // animation video one
                    return (
                        <div className="">
    
                            <div className="video-div">
                                <div className="video-div">
                                    {videoPlaying ? (
                                        <iframe
                                            className="custom-video"
                                            src="https://www.youtube.com/embed/CW-f1RVjCws"
                                            title="YouTube video player"
    
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="video-thumbnail">
    
                                            <div className="play-button" onClick={() => setVideoPlaying(true)}>
                                                <Icon icon="carbon:play-outline" className="play-icon" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
    
                            <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                                <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                                <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                            </div>
                        </div>
                    );

                    case 7:
                // assessment
                return (
                    <div className="assessment-page">

                        <div className="">

                            <ScenarioQuestions onSubmit={handleNext} />

                        </div>
                        {/* <button className='btn' onClick={handleReviewPopUp}>click here</button> */}

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5 '>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>


                    </div>
                );
                case 8:
                // animation video one
                return (
                    <div className="">

                        <div className="video-div">
                            <div className="video-div">
                                {videoPlaying ? (
                                    <iframe
                                        className="custom-video"
                                        src="https://www.youtube.com/embed/CW-f1RVjCws"
                                        title="YouTube video player"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="video-thumbnail">

                                        <div className="play-button" onClick={() => setVideoPlaying(true)}>
                                            <Icon icon="carbon:play-outline" className="play-icon" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

                case 9:
                    // assessment
                    return (
                        <div className="assessment-page">
    
                            <div className="">
    
                                <WeekTwoAssessmentForm onSubmit={handleNext} />
    
                            </div>
                            {/* <button className='btn' onClick={handleReviewPopUp}>click here</button> */}
    
                            <div className='d-flex align-items-center justify-content-around mx-auto mt-5 '>
                                <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                                <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                            </div>
    
    
                        </div>
                    );

            case 10:
                //end
                return (
                    <div className="end-of-course-page">


                        <div className="congrats">
                            <img src={celebrate} alt="celebrate" />
                            <h1>Hurray!</h1>
                            <p className='text-center fs-5'>You have made it to the {<br />} Week {currentWeekIndex + 1}</p>
                        </div>
                        <MyFireWorks />

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>

                            <button className='btn progress-btn btn-dark' onClick={handleNextWeekCourse} >Proceed to {(currentWeekIndex + 1) + 1}</button>
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