
import React, { useEffect, useState } from 'react';
import '../newcourse.css'
import Modal from 'react-modal';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal';

export default function WeekThreeAssessmentForm({ onSubmit, previous }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [reviewPopUp, setReviewPopUp] = React.useState(false)

    const questionsArray = [

        {
            title: "Flowie believes that she can improve her drawing skills with practice and effort. Which mindset does this describe?",
            questionList: [

                "A. Fixed mindset", "B. Growth mindset", "C. Stagnant mindset", "D. Neutral mindset"
            ],
        },

        {
            title: "If someone says, I can't play the piano because I'm just not musically talented, which type of mindset are they demonstrating?",
            questionList: [

                "A. Fixed mindset", "B. Growth mindset", "C. Stagnant mindset", "D. Neutral mindset"
            ],
        },

        {
            title: "Why is it beneficial to have a growth mindset when facing challenges?",
            questionList: [

                "A. It helps you avoid mistakes altogether.", "B. It encourages you to embrace challenges and learn from mistakes.", "C. It ensures that you will never fail..", "D. It makes tasks easier and less challenging. "
            ],
        },

        {
            title: "Which of the following statements reflects a growth mindset?",
            questionList: [

                "A. I'm either good at something, or I'm not.", "B. I can get better at this if I try.", "C. There's no point in trying if I'm going to fail.", " D. My abilities are fixed and cannot be changed"
            ],
        },

        {
            title: "Why is mindset important in how you approach learning and life?",
            questionList: [

                "A. It determines whether you can control your surroundings.", "B. It affects your openness to new experiences and resilience in the face of setbacks.", "C. It guarantees success in all endeavors.", "D. It limits your ability to change and grow."
            ],

        },

        {
            title: "After receiving a poor grade, Flowa decides to work harder and seek help to improve. What mindset is she demonstrating?",
            questionList: [

                "A. Fixed mindset", "B. Growth mindset.", "C. Static mindset.", "D. Rigid mindset."
            ],
        },

        {
            title: "How can someone develop a growth mindset?",
            questionList: [

                "A. By avoiding all challenges and playing it safe.", "B. By changing the way they think and being open to learning and growth. ", "C. By focusing only on their existing strengths.", "D. By believing that their abilities are unchangeable."
            ],
        },

        {
            title: "Which of the following best describes the attitude of someone with a fixed mindset towards making mistakes?",
            questionList: [

                "A. They see mistakes as opportunities to learn.",
                "B. They believe mistakes mean they are not good at something and cannot improve.",
                "C. They are indifferent to making mistakes.",
                "D. They see mistakes as a natural part of the learning process.",
            ],
        },

        {
            title: "What activity could help someone practice thinking in new ways and developing a growth mindset?",
            questionList: [

                "A. Avoiding any new challenges.",
                "B. Setting goals, identifying challenges, and making a plan to tackle those challenges. ",
                "C. Sticking to familiar tasks and routines.",
                "D. Focusing solely on their current abilities.",
            ],
        },
        {
            title: " Which mindset is more likely to lead to resilience and perseverance in the face of setbacks?",
            questionList: [

                "A. Fixed mindset",
                "B. Growth mindset",
                "C. Static mindset",
                "D. Neutral mindset",
            ],
        },


    ];


    const handleNextStepClick = () => {

        if (currentIndex < questionsArray.length) {
            setCurrentIndex(currentIndex + 1);

            setTimeout(() => {
                setReviewPopUp(true);

                setTimeout(() => {
                    setReviewPopUp(false);
                }, 8000);
            }, 4000);
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

    const closeReviewPopUp = () => {
        setReviewPopUp(false);
    };

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
                    <div className="week-two ">
                        <div className="assessment question-box ">
                            <div className="assessment-box">
                                <h2>Assessment</h2>
                                Scenario around your mindset.
                            </div>
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - currentIndex].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">

                                <ul className="p-0 mt-4 d-flex flex-column">

                                    {questionsArray[currentIndex - currentIndex].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center'>

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
            case 2:
                // question two
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );
            case 3:
                // question three
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );

            case 4:
                // question four
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );

            case 5:
                // question five
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );

            case 6:
                // question six
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );


            case 7:
                // question seven
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );

            case 8:
                // question eight
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );
            case 9:
                // question nine
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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
                );
            case 10:
                // question 10
                return (
                    <div className="week-two">
                        <div className="assessment question-box py-4">
                            <div className='d-flex  align-items-start mt-3'>
                                <h1>{currentIndex}.</h1>

                                <h2 className='text-center mb-0 fs-1 ms-3'> {questionsArray[currentIndex - 1].title}</h2>
                            </div>
                            <div className="text-center checkbox-questions">
                                <ul className="p-0 mt-4 d-flex flex-column">
                                    {questionsArray[currentIndex - 1].questionList.map((item, index) => (
                                        <li key={index} className='d-flex align-items-center '>

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

                        ></li>
                    ))}
                </ul>
            </div>

            <div className='d-flex align-items-center justify-content-around mx-auto mt-5 ' >
                <button className='btn progress-btn btn-light' onClick={handlePreviousStepClick}>{"<<<"} Back</button>
                <button className='btn progress-btn btn-dark' onClick={handleNextStepClick}>Next {">>>"}</button>
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



