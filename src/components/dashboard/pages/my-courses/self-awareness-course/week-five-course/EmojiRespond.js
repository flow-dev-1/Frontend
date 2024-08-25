import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import '../newcourse.css';

import emojiSad from '../../../../../../assets/selfawareness-images/emocom-images/sad.png';
import emojiAngry from '../../../../../../assets/selfawareness-images/emocom-images/angry.png';
import emojiAnxiety from '../../../../../../assets/selfawareness-images/emocom-images/anxiety.png';
import emojiBored from '../../../../../../assets/selfawareness-images/emocom-images/bored.png';
import emojiHappy from '../../../../../../assets/selfawareness-images/emocom-images/happy.png';
import emojiEnvy from '../../../../../../assets/selfawareness-images/emocom-images/envy.png';
import emojiFear from '../../../../../../assets/selfawareness-images/emocom-images/fear.png';
import emojiJoy from '../../../../../../assets/selfawareness-images/emocom-images/joy.png';
import emojiNostalgia from '../../../../../../assets/selfawareness-images/emocom-images/nostalgia.png';

export default function EmojiRespond() {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const dropdownRefs = useRef([]);

    const emojis = [
        {
            src: emojiJoy,
            label: 'Joy',
            options: [emojiHappy, emojiNostalgia, emojiJoy]
        },
        {
            src: emojiAnxiety,
            label: 'Anxiety',
            options: [emojiBored, emojiAnxiety, emojiJoy]
        },
        {
            src: emojiHappy,
            label: 'Happy',
            options: [emojiHappy, emojiAnxiety, emojiJoy]
        },
        {
            src: emojiAngry,
            label: 'Angry',
            options: [emojiAngry, emojiJoy, emojiSad]
        },
        {
            src: emojiSad,
            label: 'Sad',
            options: [emojiHappy, emojiAnxiety, emojiSad]
        },
    ];

    const handleEmojiClick = (index) => {
        setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    const handleOptionClick = (index, option) => {
        setSelectedOptions(prev => ({ ...prev, [index]: option }));
        setOpenDropdownIndex(null); // Close dropdown after selection
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
                setOpenDropdownIndex(null); // Close dropdown if click is outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="week-two question-box py-4">
                <div className="align-items-start">
                    <div className="question-box-header mx-auto align-items-start">
                        <h1 className='mb-0'>Instructions:</h1>
                        <h2 className='mb-0 d-flex ms-3'>All you need to do is select how you would respond to a colleague wearing a facial expression with facial responses.</h2>
                    </div>

                    <div className="dropdown-select-section mt-5">
                        {emojis.map((emoji, index) => (
                            <div
                                key={index}
                                ref={el => dropdownRefs.current[index] = el}
                                className="dropdown-container"
                            >
                                <div className="dropdown-div">
                                    <img src={emoji.src} alt={emoji.label} />
                                    {/* <span className="selected-option">
                                        <img src={selectedOptions[index] || ""} alt={emoji.label} />
                                    </span> */}
                                    <span className="selected-option">
                                        {selectedOptions[index] ? (
                                            <img
                                                src={selectedOptions[index]}
                                                alt={emoji.label}

                                            />
                                        ) : (
                                            null
                                        )}
                                    </span>

                                    <Icon
                                        icon={openDropdownIndex === index ? "iconamoon:arrow-up-2-thin" : "iconamoon:arrow-down-2-thin"}
                                        className='fs-2 cursor-pointer'
                                        onClick={() => handleEmojiClick(index)}
                                    />
                                </div>

                                {openDropdownIndex === index && (
                                    <ul className='emoji-value-option'>
                                        {emoji.options.map((option, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => handleOptionClick(index, option)}
                                            >
                                                <img src={option} alt="" />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
