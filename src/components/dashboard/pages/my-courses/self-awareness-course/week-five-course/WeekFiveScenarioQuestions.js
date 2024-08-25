import React, { useEffect, useState, useRef } from 'react';
import '../newcourse.css'
import { Icon } from '@iconify/react';

export default function WeekFiveScenarioQuestions({ onSubmit, previous }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const questionsArray = [

        {
            title: "Two classmates, Sarah and Alex, have been assigned to work on a group project together. However, they have different ideas about how to approach the project, and tensions are rising between them. Sarah wants to take the lead and implement her ideas, while Alex feels sidelined and frustrated. If you were Sarah, how would you respond to this situation?",
            options: ["A. Reach out to the class teacher.", "B. Try to speak to Alex in private.", "C. Try to speak our friend Jim to speak to Sarah and Alex in private.", "D. Do nothing and wait for them to sort out their differences."]
        
        },
        {
            title: "During lunch break, a group of students starts pressuring Jack to skip class and join them in going to an off-campus party. Jack is torn between wanting to fit in with his peers and knowing that skipping class is against school rules and could negatively affect his grades. If you were Jack, how would you respond to this peer pressure situation?",
            options: ["A. Reach out to the class teacher.", "B. Try to speak to them one after the other.", "C. Join them in going to the off-campus party.", "D. Do nothing and wait for them to go alone."]
        },
        {
            title: "During a class presentation, James receives feedback from his teacher and classmates that his delivery was too monotone and he needs to work on his public speaking skills. James feels embarrassed and defensive, as he put a lot of effort into preparing for the presentation. If you were James, how would you respond to this situation?",
            options: ["A. Listen carefully to the feedback.", "B. Ask for more detailed feedback.", "C. Practice public speaking.", "D. Ignore the feedback.", "E. Give up on presentation."]
        },
        {
            title: "Tom has been feeling overwhelmed with schoolwork and family issues at home. This is beginning to make him quiet and easily tired. If you were Tom, how would you respond to this situation?",
            options: ["A. Talk  to a trusted adult.", "B. Seek support from friends.", "C. Practice relaxation techniques.", "D. Isolate myself.", "E. Ignore the problem."]
        },
        {
            title: "Emily has been rehearsing for weeks to audition for the school play. However, when the cast list is posted, she discovers that she didn't get a part. She feels disappointed, rejected, and unsure of her abilities. If you were Emily, how would you respond to this situation?",
            options: ["A. Talk  to the drama teacher.", "B. Support her friends.", "C. Stay positive.", "D. Give up on acting.", "E. Withdraw from friends."]
        },
        
        ];

    const handleNextStepClick = () => {
        if (currentIndex < questionsArray.length) {
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

    const handleEmojiClick = (index) => {
        setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    const handleOptionClick = (index, type, option) => {
        setSelectedOptions(prev => ({ 
            ...prev, 
            [`${index}-${type}`]: option 
        }));
        setOpenDropdownIndex(null); // Close dropdown after selection
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdownIndex(null); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderQuestion = () => {
        const currentQuestion = questionsArray[currentIndex - 1];
        const options = currentQuestion.options;

        return (
            <div className="week-two scenario">
                <div className="assessment question-box py-4">
                    <div className="scenario-number px-4 mb-3 mx-auto">
                        <h1 className='text-center my-0'>Scenario {currentIndex}</h1>
                    </div>
                    <div className="question-box-header align-items-start">
                        <h2 className='mb-0 ms-3 text-center'>{currentQuestion.title}</h2>
                    </div>
                    <div className="d-flex align-items-center justify-content-around">
                        <div className="dropdown-select-section mt-5">
                            <div
                                key={`${currentIndex}-will`}
                                ref={el => dropdownRefs.current[`${currentIndex}-will`] = el}
                                className=""
                            >
                                <div className="dropdown-div">
                                    <p>I will</p>
                                    <span className="selected-option">
                                        {selectedOptions[`${currentIndex}-will`] || ''}
                                    </span>
                                    <Icon
                                        icon={openDropdownIndex === `${currentIndex}-will` ? "iconamoon:arrow-up-2-thin" : "iconamoon:arrow-down-2-thin"}
                                        className='fs-2'
                                        onClick={() => handleEmojiClick(`${currentIndex}-will`)}
                                    />
                                </div>

                                {openDropdownIndex === `${currentIndex}-will` && (
                                    <ul className='emoji-value-option my-3'>
                                        {options.map((option, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => handleOptionClick(currentIndex, 'will', option)}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="dropdown-select-section mt-5">
                            <div
                                key={`${currentIndex}-will-not`}
                                ref={el => dropdownRefs.current[`${currentIndex}-will-not`] = el}
                                className=""
                            >
                                <div className="dropdown-div">
                                    <p>I will not</p>
                                    <span className="selected-option">
                                        {selectedOptions[`${currentIndex}-will-not`] || ''}
                                    </span>
                                    <Icon
                                        icon={openDropdownIndex === `${currentIndex}-will-not` ? "iconamoon:arrow-up-2-thin" : "iconamoon:arrow-down-2-thin"}
                                        className='fs-2 cursor-pointer'
                                        onClick={() => handleEmojiClick(`${currentIndex}-will-not`)}
                                    />
                                </div>

                                {openDropdownIndex === `${currentIndex}-will-not` && (
                                    <ul className='emoji-value-option'>
                                        {options.map((option, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => handleOptionClick(currentIndex, 'will-not', option)}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderQuestion()}

            <div className="slider-indicator">
                <ul className="p-0 mt-3 justify-content-center">
                    {Array.from({ length: questionsArray.length }, (_, index) => (
                        <li
                            key={index + 1}
                            className={currentIndex >= index + 1 ? 'answered' : ''}
                            onClick={() => setCurrentIndex(index + 1)}
                        ></li>
                    ))}
                </ul>
            </div>
            <div className='d-flex align-items-center justify-content-around mx-auto mt-4'>
                <button className='btn progress-btn btn-light' onClick={handlePreviousStepClick}>{"<<<"} Back</button>
                <button className='btn progress-btn btn-dark' onClick={handleNextStepClick}>Next {">>>"}</button>
            </div>
        </div>
    );
}
