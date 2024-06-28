
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import affirmationDecor from '../../../../../assets/affirmation-decor.png'
import celebrate from '../../../../../assets/celebrate.png';
import aboutMeTag from '../../../../../assets/all-about-me-tag.png'
import AllAboutMeForm from './AllAboutMeForm';





export default function CourseProgessionOne({ course, onClose, currentWeekIndex }) {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({

        affirmation: '',
    });


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

    const handleDownload = () => {
        const aboutMeNode = document.getElementById('aboutme-monkey');

        html2canvas(aboutMeNode)
            .then(canvas => {
                canvas.toBlob(blob => {
                    saveAs(blob, 'about_me.png');
                });
            });
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
                        <div className='d-flex align-items-center justify-content-around mt-3'>
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
                                    <textarea
                                        name="affirmation"
                                        value={formData.affirmation}
                                        rows="10"
                                        placeholder='Type your affirmations in here...'
                                        onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
                                    />
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

                                <AllAboutMeForm onSubmit={handleNext} formData={formData} />

                            </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={() => handleNext()}>Submit</button>
                        </div>
                    </div>
                );

            case 5:
                //summayaboutme
                return (
                    <div className="summary-me">

                        <div>
                            <div className="aboutme-monkey" id="aboutme-monkey">
                                <div className="about-me-tag">
                                    <img src={aboutMeTag} alt="" />
                                </div>

                                <div className="about-me-boxes mt-4">
                                    <div className="box favourite large">
                                        <Icon icon="ph:heart-duotone" />
                                        <h5>What is your {<br />} Favorites</h5>
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
                                            <h5>I Like</h5>
                                            <ul>
                                                <li>Dancing</li>
                                                <li>Swimming</li>
                                            </ul>

                                        </div>
                                        <div className="box favourite">
                                            <Icon icon="fluent:emoji-48-regular" />
                                            <h5>Fun Fact</h5>
                                            <ul>
                                                <li>Food</li>
                                                <li>animal</li>
                                            </ul>

                                        </div>
                                        <div className="box favourite ">
                                            <Icon icon="heroicons:puzzle-piece" />
                                            <h5>Hobby</h5>
                                            <ul>
                                                <li>Dancing</li>

                                            </ul>

                                        </div>

                                        <div className="box favourite ">
                                            <Icon icon="heroicons:briefcase" />
                                            <h5>Job</h5>
                                            <ul>
                                                <li>Sailor</li>
                                            </ul>

                                        </div>

                                        <div className="box favourite">
                                            <Icon icon="fluent:people-28-regular" />
                                            <h5>Friend</h5>
                                            <ul>
                                                <li>Adams</li>
                                            </ul>

                                        </div>

                                        <div className="box favourite">
                                            <Icon icon="icon-park-twotone:color-card" />
                                            <h5>Colour</h5>
                                            <ul>
                                                <li>Brown</li>
                                            </ul>

                                        </div>
                                    </div>
                                    <div className="box favourite large">
                                        <Icon icon="dashicons:format-chat" />
                                        <h5>People say that...</h5>
                                        <ul>
                                            <li>
                                                <Icon icon="mdi-light:check-circle" className='tick-icon' />
                                                I am a nice person
                                            </li>

                                            <li>
                                                <Icon icon="mdi-light:check-circle" className='tick-icon' />
                                                I am a sporty
                                            </li>
                                            <li>
                                                <Icon icon="mdi-light:check-circle" className='tick-icon' />
                                                I am a funny person
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="download-about-me" onClick={handleDownload}>
                                Download
                                <Icon icon="heroicons-outline:download" />
                            </div>
                        </div>



                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
                            <button className='btn progress-btn btn-light' onClick={handlePrevious}>{"<<<"} Back</button>
                            <button className='btn progress-btn btn-dark' onClick={handleNext}>Finish</button>
                        </div>
                    </div>

                );

            case 6:
                //end
                return (
                    <div className="end-of-course-page">

                        <div className="congrats">
                            <img src={celebrate} alt="celebrate" />
                            <h1>Hurray!</h1>
                            <p>You have made it to the {<br />} Week {currentWeekIndex + 1}</p>
                        </div>


                        <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>

                            <button className='btn progress-btn btn-dark' onClick={handlePrevious} >Proceed to {(currentWeekIndex + 1) + 1}</button>
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