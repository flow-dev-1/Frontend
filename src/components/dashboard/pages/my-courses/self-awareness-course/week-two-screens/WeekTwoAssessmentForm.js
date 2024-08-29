import React, { useEffect, useState } from 'react'
import '../newcourse.css'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import ReviewPopUp from '../../../../../modals-pages/dashboard-modals/ReviewModal'
import userService from "../../../../../../services/api/user.js";

export default function WeekTwoAssessmentForm({ onSubmit, previous }) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [reviewPopUp, setReviewPopUp] = React.useState(false)
  const [assessment, setAssessment] = useState(() => {
    // Initialize assessment from localStorage if it exists
    const storedAssessment = localStorage.getItem('assessment')
    return storedAssessment
      ? JSON.parse(storedAssessment)
      : { week: 2, assessment: { answers: [] } }
  })

  const questionsArray = [
    {
      title:
        'Which quality would help you best manage your chores and responsibilities at home well?',
      questionList: [
        'Empathy',
        'Good Listener',
        'detail-oriented',
        'responsible',
      ],
    },
    {
      title:
        'You’ve identified that your weakness is impatience and your classmate asked you to wait for him so you can get lunch together while he uses the toilet. What will you do as someone trying to improve on their weakness?',
      questionList: [
        'Do Nothing',
        'Wait for him to get lunch together.',
        'Wait for only 1 minute and leave if he doesn’t show up.',
        'Tell him you’re hungry and cannot wait.',
      ],
    },
    {
      title:
        'You’ve identified your strength is honesty and your class teacher is asking who was making noise. You know it is Adetola, your best friend that was making noise because he is your seatmate. What will you do next?',
      questionList: [
        'Choose not to say anything',
        'Tell the teacher that Adetola was making noise',
        'Tell Adetola to report himself or else you would.',
        'Ask to go to the toilet because you don’t want to talk about it',
      ],
    },
    {
      title:
        "You're trying to solve a difficult puzzle. Which quality would be most helpful in this situation?",
      questionList: ['patience', 'self-critical', 'optimistic', 'brave'],
    },
    {
      title:
        'You realized your best friend, John, has a weakness and you are interested in helping him work on this weakness. What would you do?',
      questionList: [
        'Ignore it to protect your friendship.',
        'Tell him about the strengths you have noticed he has and identify how to manage his weakness.',
        'Tell your other friends about this weakness.',
        'Tell him about your own weakness in hopes that it will get him to share as well.',
      ],
    },
    {
      title:
        'What activity do you enjoy the most, and why do you think you are good at it?',
    },
    {
      title:
        'When working in a group, what role do you naturally take on (e.g., leader, planner, helper)? Can you give an example?',
    },
    {
      title:
        'Is there a task or subject that you avoid because you find it difficult? Why do you think it’s challenging for you?',
    },
  ]

  const handleStepClick = () => {
    if (currentIndex < questionsArray.length) {
      if (assessment.assessment.answers[currentIndex - 1]) {
        setCurrentIndex(currentIndex + 1)
      } else {
        alert('Please answer the question before proceeding.')
      }
    } else {
    }

    if (currentIndex === 8) {
      setTimeout(() => {
        setReviewPopUp(true)
        setTimeout(() => {
          setReviewPopUp(false)
        }, 10000)
      }, 1000)
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      previous()
    }
  }

  const closeReviewPopUp = () => {
    setReviewPopUp(false)
  }

const correctAnswerIndices = [3, 1, 2, 0, 2];

const handleQuestionCheck = (questionIndex, optionIndex) => {
  const updatedAnswers = [...assessment.assessment.answers];
  updatedAnswers[questionIndex] =
    questionsArray[questionIndex].questionList[optionIndex];

  const updatedAssessment = {
    ...assessment,
    assessment: { ...assessment.assessment, answers: updatedAnswers }
  };

  setAssessment(updatedAssessment);
  localStorage.setItem("assessment", JSON.stringify(updatedAssessment));
  console.log("Assessment updated:", updatedAssessment);
};

const calculateScore = () => {
  const correctAnswers = correctAnswerIndices.map(
    (correctIndex, questionIndex) => {
      return (
        questionsArray[questionIndex].questionList[correctIndex] ===
        assessment.assessment.answers[questionIndex]
      );
    }
  );

  const correctCount = correctAnswers.filter(Boolean).length;
  const percentageScore = (correctCount / correctAnswerIndices.length) * 100;

  console.log(`Your score is: ${percentageScore}%`);
  return percentageScore;
};

// Example usage:
// After handling question check, you might want to calculate the score:
const percentageScore = calculateScore();



  //Todo Asssement
  console.log('Assement to Post', assessment)

  const handleInputChange = (questionIndex, value) => {
    const updatedAnswers = [...assessment.assessment.answers]
    updatedAnswers[questionIndex] = value

    const updatedAssessment = {
      ...assessment,
      assessment: { ...assessment.assessment, answers: updatedAnswers },
    }

    setAssessment(updatedAssessment)
    localStorage.setItem('assessment', JSON.stringify(updatedAssessment))
    console.log('Assessment updated:', updatedAssessment)
  }

  const renderQuestion = () => {
    const questionIndex = currentIndex - 1
    const questionData = questionsArray[questionIndex]

    if (questionData.questionList) {
      return (
        <div className='week-two'>
          <div className='assessment question-box'>
            <div className='assessment-box'>
              <h2>Assessment</h2>
              Scenario around your strengths and weaknesses.
            </div>
            <div className='d-flex align-items-start mt-3'>
              <h1>{currentIndex}.</h1>
              <h2 className='text-center mb-0 fs-1 ms-3'>
                {questionData.title}
              </h2>
            </div>
            <div className='text-center checkbox-questions'>
              <ul className='p-0 mt-4'>
                {questionData.questionList.map((item, index) => (
                  <li
                    key={index}
                    className='d-flex flex-column align-items-center my-2'
                  >
                    <p className='question-p ms-3'>{item}</p>
                    <img
                      onClick={() => handleQuestionCheck(questionIndex, index)}
                      className='cursor-pointer mt-2'
                      src={
                        assessment.assessment.answers[questionIndex] === item
                          ? checkedImage
                          : unCheckedImage
                      }
                      alt=''
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='week-two'>
          <div className='assessment question-box py-4'>
            <div className='d-flex align-items-start mt-3'>
              <h1>{currentIndex}.</h1>
              <h2 className='text-center mb-0 fs-1 ms-3'>
                {questionData.title}
              </h2>
            </div>
            <div className='text-area-box px-4 mt-4'>
              <textarea
                rows='6'
                placeholder='Type your answer here...'
                onChange={(e) =>
                  handleInputChange(questionIndex, e.target.value)
                }
                value={assessment.assessment.answers[questionIndex] || ''}
              ></textarea>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {Array.from({ length: questionsArray.length }, (_, index) => (
            <li
              key={index + 1}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-light'
          onClick={handlePreviousStepClick}
        >
          {'<<<'} Back
        </button>
        <button className='btn progress-btn btn-dark' onClick={handleStepClick}>
          Next {'>>>'}
        </button>
      </div>

      {reviewPopUp && (
        <Modal
          isOpen={reviewPopUp}
          onRequestClose={closeReviewPopUp}
          contentLabel='Example Modal'
          className='custom-modal'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={true}
        >
          <ReviewPopUp />
        </Modal>
      )}
    </div>
  )
}
