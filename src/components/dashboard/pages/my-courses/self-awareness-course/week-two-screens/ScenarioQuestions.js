
import React, { useEffect, useState } from 'react';
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import strengthImg from '../../../../../../assets/selfawareness-images/strength.png';

import weeknessImg from '../../../../../../assets/selfawareness-images/weakness.png';



export default function ScenarioQuestions({ onSubmit }) {

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
            }, 6000);
        }


    };




    const closeReviewPopUp = () => {
        setReviewPopUp(false);
    };


    const questionsArray = [

        {
            title: "A friend is feeling sad and needs someone to talk to because they just failed a test. They come to you for support. How would you help?",
            questionList: [

                "Empathy", "Active Listening", "Encouragement", "Problem-Solving", "Patience"
            ],
            questionListNegative: [

                "talkative", "selfishness", "impatience"
            ],

        },
        {
            title: "Imagine you’re working on a group project at school. Your group is struggling to come up with an idea for the project. As a member of the team, how would you help?",
            questionList: [

                "Leadership", "communication", "team-work", "Problem-Solving", "organization"
            ],
            questionListNegative: [

                "impatience", "de-organization", "inability to work with a team"
            ],
        },
        {
            title: "Is there a sport you dislike? What sport is this? Now imagine you were asked to represent your house in this particular sport, for your School’s inter-house sport competition, to win a laptop and a gaming console. How would you go about this?",
            questionList: [

                "determination", "goal-orientation", "adoptability", "team-spirit", "resilience"
            ],
            questionListNegative: [

                "laziness", "easily fed up", "distraction"
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

                // question one
                return (
                    <div className="week-two scenario">
                        <div className="assessment question-box ">
                        <div className="scenario-number px-4 mb-3 mx-auto">
                                <h1 className='text-center my-0'>Scenario 1</h1>
                            </div>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 ms-3 text-center'> {questionsArray[currentIndex - currentIndex].title}</h2>
                            </div>
                            <div className="d-flex justify-content-around mt-5">
                                <div className="text-center checkbox-questions strength">
                                    <img src={strengthImg} alt="" />
                                    <ul className="p-0 mt-4">

                                        {questionsArray[currentIndex - currentIndex].questionList.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
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
                                <div className="d-flex flex-column text-center checkbox-questions weakness">
                                    <img src={weeknessImg} alt="" />
                                    <ul className="p-0 mt-4">


                                        {questionsArray[currentIndex - currentIndex].questionListNegative.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
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
                    </div>
                );

            case 2:
                // question two
                return (
                    <div className="week-two scenario">
                        <div className="assessment question-box py-4">
                            <div className="scenario-number px-4 mb-3 mx-auto">
                                <h1 className='text-center my-0'>Scenario 2</h1>
                            </div>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 ms-3 text-center'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>

                            <div className="d-flex justify-content-around mt-5">
                                <div className="text-center checkbox-questions strength">
                                    <img src={strengthImg} alt="" />
                                    <ul className="p-0 mt-4">

                                        {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
                                                <img
                                                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                                                    className='cursor-pointer'
                                                    src={questionChecked[currentIndex - 1].includes(index) ? checkedImage : unCheckedImage}
                                                    alt=""
                                                />

                                                <p className='question-p ms-3'>{item}</p>
                                            </li>
                                        ))}


                                    </ul>


                                </div>
                                <div className="d-flex flex-column align-items-start  text-center checkbox-questions weakness">
                                    <img src={weeknessImg} alt="" />
                                    <ul className="p-0 mt-4">


                                        {questionsArray[currentIndex - 1].questionListNegative.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
                                                <img
                                                    onClick={() => handleQuestionCheck(currentIndex - currentIndex, index)}
                                                    className='cursor-pointer'
                                                    src={questionChecked[currentIndex - 1].includes(index) ? checkedImage : unCheckedImage}
                                                    alt=""
                                                />

                                                <p className='question-p ms-3'>{item}</p>
                                            </li>
                                        ))}


                                    </ul>


                                </div>
                            </div>


                        </div>
                    </div>
                );

            case 3:
                // question three
                return (
                    <div className="week-two scenario">
                        <div className="assessment question-box py-4">
                        <div className="scenario-number px-4 mb-3 mx-auto">
                                <h1 className='text-center my-0'>Scenario 3</h1>
                            </div>
                            <div className="question-box-header align-items-start">
                                <h1 className='mb-0 '>Question: </h1>
                                <h2 className='mb-0 ms-3 text-center'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                           
                            <div className="d-flex justify-content-around mt-5">
                                <div className="text-center checkbox-questions strength">
                                    <img src={strengthImg} alt="" />
                                    <ul className="p-0 mt-4">

                                        {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
                                                <img
                                                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                                                    className='cursor-pointer'
                                                    src={questionChecked[currentIndex - 1].includes(index) ? checkedImage : unCheckedImage}
                                                    alt=""
                                                />

                                                <p className='question-p ms-3'>{item}</p>
                                            </li>
                                        ))}


                                    </ul>


                                </div>
                                <div className="d-flex flex-column text-center checkbox-questions weakness">
                                    <img src={weeknessImg} alt="" />
                                    <ul className="p-0 mt-4">


                                        {questionsArray[currentIndex - 1].questionListNegative.map((item, index) => (
                                            <li key={index} className='d-flex my-2'>
                                                <img
                                                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                                                    className='cursor-pointer'
                                                    src={questionChecked[currentIndex - 1].includes(index) ? checkedImage : unCheckedImage}
                                                    alt=""
                                                />

                                                <p className='question-p ms-3'>{item}</p>
                                            </li>
                                        ))}


                                    </ul>


                                </div>
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
                    {Array.from({ length: questionsArray.length }, (_, index) => (
                        <li
                            key={index + 1}
                            className={currentIndex >= index + 1 ? 'answered' : ''}
                            onClick={() => handleStepClick(index + 1)}
                        ></li>
                    ))}
                </ul>
            </div>


        </div>
    );
}



