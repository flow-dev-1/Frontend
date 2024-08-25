
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import MyFireWorks from '../Fireworks';
import celebrate from '../../../../../../assets/celebrate.png';
import WeekFiveAssessmentForm from './WeekFiveAssessmentForm';
import EmojiEmotionMatch from './EmojiEmotionMatch';
import WeekFiveScenarioQuestions from './WeekFiveScenarioQuestions';
import EmojiRespond from './EmojiRespond';

// import WeaknessIdentification from './WeaknessIdentification';
// import ScenarioQuestions from './ScenarioQuestions';
// import WeekTwoAssessmentForm from './WeekTwoAssessmentForm';








export default function WeekFiveLearning({ course, currentWeekIndex }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({

        affirmation: '',
    });
    const [videoPlaying, setVideoPlaying] = useState(false)
    const navigate = useNavigate();


    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        console.log("Form Data submitted:", formData);
    }, [formData]);


    // Navigation function to handle proceeding to the next week
    const handleNextWeekCourse = () => {
        // Increment currentWeekIndex and navigate to the SelfAwarenessCourse with updated index
        const nextWeekIndex = currentWeekIndex + 1;
        navigate('/dashboard/self-awareness-course/1', { state: { course, weekIndex: nextWeekIndex } });
    };

    const backToCourse = () => {
        navigate('/dashboard/my-courses', { replace: true })
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
                        <EmojiEmotionMatch />
                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 3:
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

                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 4:
                //  self-awareness question
                return (
                    <div className="">
                        
                       <WeekFiveScenarioQuestions
                         previous={() => setCurrentStep(3)}
                         onSubmit={() => setCurrentStep(5)}
                       />


                    
                    </div>
                );

            case 5:
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

                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 6:
                //  self-awareness question
                return (
                    <div className="">
                       <EmojiRespond />
                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );
            case 7:
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

                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 8:
                // assessment
                return (
                    <div className="assessment-page">
                        <WeekFiveAssessmentForm
                            previous={() => setCurrentStep(7)}
                            onSubmit={() => setCurrentStep(9)}
                        />


                    </div>
                );

            case 9:
                //end
                return (
                    <div className="end-of-course-page">


                        <div className="congrats">
                            <img src={celebrate} alt="celebrate" />

                            {currentWeekIndex === 4 ? (
                                <div>             <h1>Congratulations!</h1>
                                    <p className='text-center fs-6 w-75 mx-auto'>We’re proud of the progress you’ve made, and we can’t wait to see how you apply these lessons in your life.</p></div>

                            ) : <div>
                                <h1>Hurray!</h1>
                                <p className='text-center fs-5 '>You have made it to the {<br />} Week {currentWeekIndex + 1}</p>
                            </div>
                            }

                        </div>
                        <MyFireWorks currentWeekIndex={currentWeekIndex} />

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            {currentWeekIndex === 4 ? (
                                <div>
                                    <button className='btn progress-btn btn-dark' onClick={backToCourse} >Go to My Courses {">>>"}</button>
                                </div>

                            ) : <div>
                                <button className='btn progress-btn btn-dark' onClick={handleNextWeekCourse} >Proceed to {(currentWeekIndex + 1) + 1}</button>
                            </div>
                            }

                            {/* <button className='btn progress-btn btn-dark' onClick={handleNextWeekCourse} >Proceed to {(currentWeekIndex + 1) + 1}</button> */}
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