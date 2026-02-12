import React, { useState, useEffect } from 'react';
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png';
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png';
import { toast } from 'react-toastify';
import userService from '../../../../../../services/api/user.js';
import { useSelector, useDispatch } from 'react-redux';
import { userAnswer, updateData } from '../../../../../../redux/reducers/userAnswersReducer.js';

import { useMutation } from '@tanstack/react-query';
import { RotatingLines } from 'react-loader-spinner';

export default function WeekThreeAssessmentForm({ onNext, onBack, course, activityData, isCompleted }) {
  const dispatch = useDispatch();
  const userAnswers = useSelector(userAnswer);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [assessment, setAssessment] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const questionsArray = [
    {
      title: 'Flowie believes that she can improve her drawing skills with practice and effort. Which mindset does this describe?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Stagnant mindset',
        'D. Neutral mindset',
      ],
    },

    {
      title: "If someone says, I can't play the piano because I'm just not musically talented, which type of mindset are they demonstrating?",
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Stagnant mindset',
        'D. Neutral mindset',
      ],
    },

    {
      title: 'Why is it beneficial to have a growth mindset when facing challenges?',
      questionList: [
        'A. It helps you avoid mistakes altogether.',
        'B. It encourages you to embrace challenges and learn from mistakes.',
        'C. It ensures that you will never fail.',
        'D. It makes tasks easier and less challenging.',
      ],
    },

    {
      title: 'Which of the following statements reflects a growth mindset?',
      questionList: [
        "A. I'm either good at something, or I'm not.",
        'B. I can get better at this if I try.',
        "C. There's no point in trying if I'm going to fail.",
        'D. My abilities are fixed and cannot be changed.',
      ],
    },

    {
      title: 'Why is mindset important in how you approach learning and life?',
      questionList: [
        'A. It determines whether you can control your surroundings.',
        'B. It affects your openness to new experiences and resilience in the face of setbacks.',
        'C. It guarantees success in all endeavors.',
        'D. It limits your ability to change and grow.',
      ],
    },

    {
      title: 'After receiving a poor grade, Flowa decides to work harder and seek help to improve. What mindset is she demonstrating?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Static mindset',
        'D. Rigid mindset.',
      ],
    },

    {
      title: 'How can someone develop a growth mindset?',
      questionList: [
        'A. By avoiding all challenges and playing it safe.',
        'B. By changing the way they think and being open to learning and growth.',
        'C. By focusing only on their existing strengths.',
        'D. By believing that their abilities are unchangeable.',
      ],
    },

    {
      title: 'Which of the following best describes the attitude of someone with a fixed mindset towards making mistakes?',
      questionList: [
        'A. They see mistakes as opportunities to learn.',
        'B. They believe mistakes mean they are not good at something and cannot improve.',
        'C. They are indifferent to making mistakes.',
        'D. They see mistakes as a natural part of the learning process.',
      ],
    },

    {
      title: 'What activity could help someone practice thinking in new ways and developing a growth mindset?',
      questionList: [
        'A. Avoiding any new challenges.',
        'B. Setting goals, identifying challenges, and making a plan to tackle those challenges.',
        'C. Sticking to familiar tasks and routines.',
        'D. Focusing solely on their current abilities.',
      ],
    },
    {
      title: ' Which mindset is more likely to lead to resilience and perseverance in the face of setbacks?',
      questionList: [
        'A. Fixed mindset',
        'B. Growth mindset',
        'C. Static mindset',
        'D. Neutral mindset',
      ],
    },
  ];

  useEffect(() => {
    // Load saved answers from localStorage on component mount
    const savedAnswers = localStorage.getItem('weekThreeAssessmentData');

    if (savedAnswers) {
      const parsedData = JSON.parse(savedAnswers);
      if (parsedData?.formattedData?.assessments) {
        setSelectedAnswers(parsedData?.formattedData?.assessments?.[0].answers);
      } else {
        setSelectedAnswers(JSON.parse(savedAnswers));
      }
    }
  }, []);

  useEffect(() => {
    // Save answers to localStorage whenever selectedAnswers changes
    localStorage.setItem('weekThreeAssessmentData', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);
  // Mutation for saving user data
  const mutation = useMutation({
    mutationFn: (data) => userService.submitCourseData(data), // Dispatch saveAssessment action
    onSuccess: (data) => {
      setDisableButton(false);
      toast.dismiss();
      toast.success(data.message || 'Answers saved successfully!'); // Show success toast
      dispatch(
        updateData({
          course: null,
          courseEnrollmentId: null,
          week: 1,
          activities: [],
          assessments: [],
        })
      );
      localStorage.removeItem('weekThreeAssessmentData');
      onNext();
    },
    onError: (error) => {
      console.log(error, 'errorrrr');
      toast.dismiss();
      toast.error(error?.message || error?.error || 'Error saving answers'); // Show error toast
    },
  });

  const handleNextStepClick = () => {
    // Validate current question before moving forward or submitting
    const isAnswered = selectedAnswers[currentIndex - 1] !== undefined;

    if (!isCompleted && !isAnswered) {
      toast.error('Please select an answer before proceeding.');
      return;
    }

    if (currentIndex < questionsArray.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (isCompleted) {
        onNext();
      } else {
        const result = {
          week: 3,
          assessments: { answers: Object.values(selectedAnswers) },
        };
        saveWeekThreeAssessment(result);
      }
    }
  };


  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const handleQuestionCheck = (questionIndex, optionIndex) => {
    if (isCompleted || selectedAnswers[questionIndex] !== undefined) {
      toast.error('You cannot change your answer once it is saved.');
      return;
    }
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex,
    }));
  };

  const saveWeekThreeAssessment = async (result) => {
    if (disableButton || isCompleted) return

    if (!activityData?.activities || activityData?.activities?.length !== 7) {
      toast.error("Please complete all activities before submitting the assessment.")
      return
    }

    // Final check for all 10 assessment answers
    const answersArray = Object.values(selectedAnswers);
    if (answersArray.length !== 10 || answersArray.some(ans => ans === undefined)) {
      toast.error('Please ensure all 10 assessment questions are answered.');
      return;
    }
    try {
      const correctAnswers = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]

      const totalQuestions = Object.keys(selectedAnswers).length
      const correctCount = Object.keys(selectedAnswers).reduce((count, key) => {
        const selectedAnswerIndex = key // Adjusting for 0-indexing in correctAnswers array
        return selectedAnswers[key] === correctAnswers[selectedAnswerIndex]
          ? count + 1
          : count
      }, 0)

      const percentage = Math.round((correctCount / totalQuestions) * 100)

      toast.success(`You scored ${percentage}% in the quiz`)

      const dataToSend = {
        rating: percentage,
        assessments: result.assessments,
        week: 3,
      }

      const mutationData = {
        ...userAnswers,
        assessments: [result.assessments],
        activities: activityData?.activities,
        rating: percentage.toString()
      };

      mutation.mutate(mutationData);


    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error('Something went wrong. Please contact flow admin for support!');
    }
  }


  const renderQuestion = () => {
    const question = questionsArray[currentIndex - 1];
    return (
      <div className="week-three">
        <div className="assessment question-box py-4">
          {currentIndex <= 1 && (
            <div className="assessment-box">
              <h2 style={{ color: '#FAFAFA', textAlign: 'center' }}>Assessment</h2>
              <p style={{ color: '#FAFAFA' }} className="text-center">
                Scenario around your values.
              </p>
            </div>
          )}
          <div className="d-flex align-items-start mt-3">
            <h1 style={{ color: '#5B616A' }}>{currentIndex}.</h1>
            <h2 style={{ color: '#5B616A' }} className="text-start mb-0 fs-1 ms-3">
              {question.title}
            </h2>
          </div>
          <div className="text-center checkbox-questions">
            <ul className="p-0 mt-4 d-flex flex-column">
              {question.questionList.map((item, index) => (
                <li key={index} className="d-flex align-items-center my-2">
                  <img
                    onClick={() => handleQuestionCheck(currentIndex - 1, index)}
                    className="cursor-pointer"
                    src={
                      selectedAnswers[currentIndex - 1] === index
                        ? checkedImage
                        : unCheckedImage
                    }
                    alt=""
                  />
                  <p className="question-p ms-3">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderQuestion()}

      <div className="slider-indicator">
        <ul className="p-0 mt-3">
          {Array.from({ length: questionsArray.length }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className="progression-btns">
        <button
          className="btn prev light"
          onClick={handlePreviousStepClick}
          disabled={mutation.isPending}
        >
          {'<<< Back'}
        </button>
        <button
          className="btn next dark"
          onClick={handleNextStepClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <RotatingLines
              className="me-2 text-white"
              type="Oval"
              strokeColor="white"
              height={20}
              width={20}
            />
          ) : currentIndex === questionsArray.length ? (
            isCompleted ? 'Continue' : 'Submit'
          ) : (
            'Next >>>'
          )}
        </button>
      </div>
    </div>
  );
}
