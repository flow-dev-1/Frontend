
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import celebrate from '../../../../../assets/celebrate.png';

import selfAwareness from '../../../../../assets/selfawareness-images/self-awareness.png';
import personality from '../../../../../assets/selfawareness-images/personality.png';
import emotionalHand from '../../../../../assets/selfawareness-images/emotional.png';
import analyticHand from '../../../../../assets/selfawareness-images/analytic.png';
import friendshipHand from '../../../../../assets/selfawareness-images/friendship.png';
import actionHand from '../../../../../assets/selfawareness-images/action.png';
import ReviewPopUp from '../../../../modals-pages/dashboard-modals/ReviewModal';
import Modal from 'react-modal';
import AssessmentForm from './AssessmentForm';
import { useNavigate } from 'react-router-dom';
import DragDropComponent from './DragAndDrop';
import MyFireWorks from './Fireworks';







export default function WeekOneLearning({ course, onClose, currentWeekIndex }) {

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
                        <div className="question-box py-5">
                            <div className="question-box-header ">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 d-flex ms-3'> What do you think</h2>
                                <img src={selfAwareness} alt="selfAwareness image" className='mx-2' />
                                <h2 className=''>is?</h2>
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
                // personality question
                return (
                    <div className="personality-page">
                        <div className="question-box py-5">
                            <div className="question-box-header ">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 d-flex ms-3'> What do you understand by the word,</h2>
                                <img src={personality} alt="personality image" className='mx-2' />
                                <h2 className=''>?</h2>
                            </div>
                            <div className="text-area-box px-4 mt-4">
                                <textarea name="" id="" rows="6" placeholder="Type your answer here..." ></textarea>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 5:
                //animation video two
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

            case 6:
                // drag and drop
                return (
                    <div className="drag-drop-section">
                        {/* <div className="drag-drop">
                            <div className="card-slider">
                                <img src={cardOne} alt="card" />
                            </div>

                            <div className="drop-card">
                                <div className="drop-card-header">
                                    <img src={dragdropArrow} alt="" />
                                    <h2>Drag-and-drop the statements on the left into any of these bowls.</h2>
                                    <img src={dragdropArrow} alt="" className=' dragdropArrow ' />
                                </div>

                                <div className="bucket-section mt-3 py-2">
                                    <div className="bucket bucket-yes">
                                        <div className="yes bucket-item">
                                            <h3 className='mb-0'>0</h3>
                                        </div>
                                        <img src={bucketYes} alt="bucketYes" />
                                    </div>
                                    <div className="bucket bucket-yes">
                                        <div className="no bucket-item">
                                            <h3 className='mb-0'>2</h3>
                                        </div>
                                        <img src={bucketNo} alt="bucketYes" />
                                    </div>
                                    <div className="bucket bucket-yes">
                                        <div className="sometimes bucket-item">
                                            <h3 className='mb-0'>0</h3>
                                        </div>
                                        <img src={bucketSometimes} alt="bucketYes" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="refresh">
                            <div className="slider-indicator">
                                <ul className="p-0 my-5">
                                    <li className='answered'></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className='d-flex'>
                                <Icon icon="system-uicons:refresh" className='mx-3 fs-3' />
                                Refresh
                            </div>
                        </div> */}

                        <DragDropComponent />
                        <div className='d-flex align-items-center justify-content-around mt-3'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 7:
                // animation video three
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


            case 8:
                // personality description question
                return (
                    <div className="">
                        <div className="question-box">
                            <div className="question-box-header mt-3">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 d-flex ms-3 text-left'>Think about yourself, which of these personality colors describe you? Why do you think so?</h2>
                            </div>
                            <div className="personality-type mt-5">
                                <div className="">
                                    <img src={emotionalHand} alt="emotionalHand image" className='' />
                                    <p>Emotional</p>

                                </div>
                                <div className="">
                                    <img src={analyticHand} alt="analyticHand image" className='' />
                                    <p>Analytic</p>

                                </div>
                                <div className="">
                                    <img src={friendshipHand} alt="friendshipHand image" className='' />
                                    <p>Friendship</p>

                                </div>
                                <div className="">
                                    <img src={actionHand} alt="actionHand image" className='' />
                                    <p>Action</p>

                                </div>
                            </div>
                            <div className="text-area-box px-4 mt-4">
                                <textarea name="" id="" rows="6" placeholder="Type your answer here..." ></textarea>
                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div>
                );

            case 9:
                // animation video four
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

            case 10:
                // personality test video
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

            case 11:
                // animation video five
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

            case 12:
                // question and answer about personality
                return (
                    <div className="">
                        <div className="personality-question question-box">
                            <div className='mt-2'>
                                <div className="question-box-header">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>Did you get the same color as the color you identified for yourself earlier?</h2>
                                </div>
                                <div className="text-area-box px-4">
                                    <textarea name="" id="" rows="3" placeholder="Type your answer here..." ></textarea>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className="question-box-header">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>What was different? Why do you think this was different?</h2>
                                </div>
                                <div className="text-area-box px-4 ">
                                    <textarea name="" id="" rows="3" placeholder="Type your answer here..." ></textarea>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className="question-box-header">
                                    <h1 className='mb-0 '>Question: </h1>
                                    <h2 className='mb-0 d-flex ms-3 text-left'>Do you agree with this new result?</h2>
                                </div>
                                <div className="text-area-box px-4">
                                    <textarea name="" id="" rows="3" placeholder="Type your answer here..." ></textarea>
                                </div>
                            </div>
                        </div>


                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>
                    </div >
                );

            case 13:
                //  animation video six
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

            case 14:
                // assessment
                return (
                    <div className="assessment-page">

                        <div className="">

                            <AssessmentForm onSubmit={handleNext} />

                        </div>
                        {/* <button className='btn' onClick={handleReviewPopUp}>click here</button> */}

                        <div className='d-flex align-items-center justify-content-around mx-auto '>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Next {">>>"}</button>
                        </div>


                    </div>
                );

            case 15:
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