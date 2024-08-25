
import React, { useEffect, useState } from 'react';
import '../newcourse.css'
import Modal from 'react-modal';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal';

export default function WeekFourAssessmentForm({ onSubmit, previous }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [reviewPopUp, setReviewPopUp] = React.useState(false);

    

    const questionsArray = [

        {
            title: "What are values?",
            questionList: [

                "A. Beliefs and principles that guide our actions and decisions", "B. Emotions and feelings we experience daily", "C. Skills and talents we possess", "D. Goals and dreams we want to achieve"
            ],
        },

        {
            title: "Why are values important? (Select all that apply)",
            questionList: [

                "A. They help us make decisions", "B. They guide our behavior", "C. They define our talents", "D. They help us understand what is most important to us"
            ],
        },

        {
            title: "Which of the following is an example of a value?",
            questionList: [

                "A. Happiness", "B. Respect.", "C. Excitement", "D. Intelligent "
            ],
        },

        {
            title: "How can knowing your values help you in life?",
            questionList: [

                "A. It can make you rich", "B.It can help you make choices that align with your beliefs", "C. It can make you more popular", "D. It can give you superpowers"
            ],
        },

        {
            title: "Imagine you value honesty. What would you likely do in a situation where you found a lost wallet?",
            questionList: [

                "A. Keep the wallet for yourself", "B. Ignore the wallet and walk away", "C. Try to find the owner and return the wallet", "D. Take the money and leave the wallet"
            ],

        },

        {
            title: "6. Imagine you value responsibility, what would you likely do in a situation where the teacher asks the class to clean their lockers but nobody is doing it?",
            questionList: [

                "A. Wait for the cleaner to come and clean your locker", "B. Do nothing", "C. Clean your locker", "D. Ask your classmate to help you clean your locker"
            ],
        },

        {
            title: "My value can influence how I treat other people",
            questionList: [

                "True", "False"
            ],
        },

        {
            title: "If Honesty is one of your values, what would be your best response to the following scenario. I accidentally broke my friend's favorite toy. No one saw me doing it. I would rather:",
            questionList: [

                "A. Say it was someone else.",
                "B. Pretend nothing happened.",
                "C. Tell my friend the truth immediately.",
                "D. Replace the toy with a new one quietly.",
            ],
        },

        {
            title: "Sarah notices a classmate, David, looking downcast while carrying a heavy stack of books. Sarah offers to help David with the books. Sarah remembers she has her own after-school activity but suggests they put David's books in his locker first so he isn't late to his next class.",
           
            valuesDetails: [
                {
                    title: "Kindness",
                    scenario: "Sarah remembers she has her own after-school activity but suggest they put David’s books in his locker first so he isn’t lat to his next class."
                },
                {
                    title: "Respect",
                    scenario: "As they walk, Sarah ask David if everything is alright’ but doesn’t pry if he doesn’t want to talk."
                },
                {
                    title: "Responsibility",
                    scenario: "Sarah offers to help David with the books."
                }
            ],
        },

        {
            title: "Alex promised to help Ben with his science project, which is due tomorrow. Despite having a busy schedule, Alex prioritizes helping Ben, honoring their friendship. Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project. Both Alex and Ben arrive at Alex's house on time, ensuring they have maximum time to work on the project.Match the following statements in the scenario to their respective values.",
            valuesDetails: [
                {
                    title: "Loyalty",
                    scenario: "Both Alex and Ben arrive at Alex’s house on time, ensuring they have maximum time to work on the project."
                },
                {
                    title: "Punctuality",
                    scenario: "Alex offers to let Ben use his advanced science equipment at home, knowing it will significantly improve their project."
                },
                {
                    title: "Generosity",
                    scenario: "Despite having a busy schedule, Alex prioritizes helping Ben, honouring their friendship."
                }
            ],
        },


    ];


    const handleNextStepClick = () => {

        if (currentIndex < questionsArray.length) {
            setCurrentIndex(currentIndex + 1);


        } else {
            onSubmit();
        }

    };
    useEffect(() => {
        if (currentIndex === questionsArray.length) {
            const reviewTimeout = setTimeout(() => {
                setReviewPopUp(true);

                const popupTimeout = setTimeout(() => {
                    setReviewPopUp(false);
                }, 8000);

                // Cleanup for the popup timeout
                return () => clearTimeout(popupTimeout);
            }, 4000);

            // Cleanup for the review timeout
            return () => clearTimeout(reviewTimeout);
        }
    }, [currentIndex, questionsArray.length]);


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
                                Scenario around your values.
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

                            {questionsArray[currentIndex - 1].valuesDetails.map((item, index) => (
                            <div className="d-flex align-items-center justify-content-between mt-2" key={index}>
                                <div className='values-card'>
                                    <p >{item.title}</p>
                                </div>


                                <div className='values-scenario'>
                                    <p >{item.scenario}</p>
                                </div>

                            </div>
                            ))}

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
                            {questionsArray[currentIndex - 1].valuesDetails.map((item, index) => (
                            <div className="d-flex align-items-center justify-content-between mt-2" key={index}>
                                <div className='values-card'>
                                    <p >{item.title}</p>
                                </div>


                                <div className='values-scenario'>
                                    <p >{item.scenario}</p>
                                </div>

                            </div>
                            ))}

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



