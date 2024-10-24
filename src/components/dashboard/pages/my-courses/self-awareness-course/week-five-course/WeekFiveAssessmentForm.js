import React, { useState, useEffect } from 'react'
import '../newcourse.css'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import { toast } from 'react-toastify'
import userService from '../../../../../../services/api/user.js'

export default function NewAssessmentForm({ onNext, onBack,course}) {
  const questionsArray = [
    {
      title:
        'From what you have learnt so far in the course, what do you understand by the term, ‘Self-Awareness? Please select from the following options.',
      questionList: [
        'A. Self-awareness is knowing only your strengths and trying to hide your weaknesses from others',
        'B. Self-awareness means understanding your own thoughts, feelings, strengths, and weaknesses, and knowing how they affect your actions and relationships.',
        'C. Self-awareness is about comparing yourself to others to see how you measure up in life.',
        "D. Self-awareness means focusing on your goals without considering how you feel or what you've experienced in the past.",
      ],
    },
    {
      title:
        'To the best of your understanding, which of the following best describes the terms, ‘Strengths’ and ‘Weaknesses’?',
      questionList: [
        'A. Strengths are the things you’re naturally good at and enjoy doing, while weaknesses are the things you dislike and should avoid altogether.',
        'B. Strengths are skills or qualities that help you succeed and make you feel confident, while weaknesses are areas where you might struggle or need improvement. Understanding both helps you grow.',
        'C. Strengths are the tasks you find easy to do, and weaknesses are the things you fail at, which means you should focus only on your strengths.',
        'D. Strengths are the things your parents say you can do, and weaknesses are things your parents say you cannot do.',
      ],
    },
    {
      title: 'Why is it important to identify your personal values?',
      questionList: [
        'A. So you can have the same values as everyone else.',
        'B. So you can prioritize what truly matters to you in life and make decisions that align with your beliefs.',
        'C. So you can easily change your values to fit different situations.',
        'D. So you can compare your values to those of others.',
      ],
    },
    {
      title: 'What is a growth mindset?',
      questionList: [
        'A. Believing that your abilities and intelligence are fixed and cannot be changed.',
        'B. Believing that you can develop your abilities and intelligence through hard work, learning, and perseverance.',
        'C. Believing that you should avoid challenges to prevent failure.',
        'D. Believing that success comes from natural talent alone.',
      ],
    },
    {
      title:
        'After failing a test, how would someone with a growth mindset respond?',
      questionList: [
        'A. They would give up because they believe they aren’t smart enough.',
        'B. They would reflect on what they can learn from the experience and try harder next time.',
        'C. They would blame others for their failure.',
        'D. They would ignore the failure and move on without trying to improve.',
      ],
    },
    {
      title: 'What is Emotional Intelligence?',
      questionList: [
        'A. The ability to understand and manage your own emotions.',
        'B. The ability to influence the emotions of others.',
        'C. The ability to be self-reliant.',
        "D. Knowing how to read people's minds.",
      ],
    },
    {
      title: 'Why is it important to be emotionally intelligent?',
      questionList: [
        'A. To communicate better with others.',
        'B. To understand why you feel the way you do.',
        'C. To be able to react impulsively in situations.',
        'D. To help you fight better.',
      ],
    },
    {
      title: 'In a conflict, how can emotional intelligence help you?',
      questionList: [
        'A. By helping you avoid the conflict entirely.',
        'B. By helping you understand your emotions and respond calmly and effectively.',
        'C. By allowing you to dominate the conversation without considering others’ feelings.',
        'D. By suppressing your emotions until the conflict is over.',
      ],
    },
    {
      title:
        'Your friends want candies, but you only want some cake because you think it is healthier. How will you communicate this to your friends?',
      questionList: [
        'A. By expressing your emotions clearly.',
        'B. By aggressively telling your friends what is right.',
        'C. By understanding your friends emotions and responding appropriately.',
        'D. By ignoring your friends feelings.',
      ],
    },
    {
      title:
        'You’re facing a difficult task that feels overwhelming. Which approach best reflects a growth mindset?',
      questionList: [
        'A. Avoiding the task because you’re afraid of failing.',
        'B. Breaking the task into smaller, manageable steps and seeking help if needed.',
        'C. Complaining about how hard the task is without trying to solve it.',
        'D. Giving up because you think it’s too difficult for you to handle.',
      ],
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(() => {
    const storedData = localStorage.getItem('new-assessment')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        return parsedData.assessment?.answers || []
      } catch (e) {
        console.error('Error parsing local storage data', e)
        return []
      }
    }
    return []
  })
  const [isSubmitted, setIsSubmitted] = useState(() => {
    const storedData = localStorage.getItem('new-assessment')
    return storedData ? JSON.parse(storedData).submitted || false : false
  })

  const handleQuestionCheck = (optionIndex) => {
    if (isSubmitted) {
      toast.error('You cannot change your answers after submission.')
      return
    }

    // Check if the answer has already been persisted
    if (
      answers[currentIndex] !== undefined &&
      answers[currentIndex] !== optionIndex
    ) {
      toast.error('You cannot change this answer.')
      return
    }

    setAnswers((prevState) => {
      const newAnswers = [...prevState]
      newAnswers[currentIndex] = optionIndex
      return newAnswers
    })
  }

  const handleNextStepClick = () => {
    if (answers[currentIndex] === undefined) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    if (currentIndex < questionsArray.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      saveNewAssessment()
      onNext()
    }
  }

  const handlePreviousStepClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  const saveNewAssessment = () => {
    const storedData = localStorage.getItem('new-assessment')
    let savedAnswers = JSON.parse(storedData)
    const correctAnswers = [1, 0, 0] // Adjust according to correct answers
    const valuesToCheck = savedAnswers.assessment.answers
    const totalQuestions = valuesToCheck.length
    const correctCount = valuesToCheck.reduce((count, current, index) => {
      return current === correctAnswers[index] ? count + 1 : count
    }, 0)

    const percentage = Math.round((correctCount / totalQuestions) * 100)
    toast.success(`You scored ${percentage}% in the quiz`)

    const dataToSend = {
      rating: percentage,
      assessments: savedAnswers.assessment,
      week: 5,
    }
    userService
      .postMyAssessment(course?._id, dataToSend)
      .then((response) => {
        if (response.message === 'You have already taken the assessment') {
          toast.error('You have already taken the assessment')
        } else {
          console.log('Submission successful:', response)
          toast.success('Submitted your assessment score')
          setIsSubmitted(true) // Set the submitted flag to true
        }
      })
      .catch((error) => {
        console.error('Submission failed:', error)
      })
  }

  useEffect(() => {
    const assessmentData = {
      week: 5,
      assessment: { answers },
      submitted: isSubmitted,
    }
    localStorage.setItem('new-assessment', JSON.stringify(assessmentData))
    console.log(assessmentData)
  }, [answers, isSubmitted])

  const renderQuestion = () => {
    const question = questionsArray[currentIndex]

    return (
      <div className='week-two'>
        <div style={{ height: '550px' }} className='assessment question-box'>
          {currentIndex === 0 && (
            <div style={{marginTop:"1rem"}} className='assessment-box'>
              <h2 style={{ color: '#FAFAFA' }}>Assessment</h2>
              <p style={{ color: '#FAFAFA' }} className='text-center'>
                Scenario around your values.
              </p>
            </div>
          )}
          <div className='d-flex align-items-start mt-3'>
            <h1 style={{ color: '#5B616A' }}>{currentIndex + 1}.</h1>
            <h2
              style={{ color: '#5B616A' }}
              className='text-center mb-0 fs-1 ms-3'
            >
              {question.title}
            </h2>
          </div>
          <div className='text-center checkbox-questions'>
            <ul className='p-0 mt-4 d-flex flex-column'>
              {question.questionList.map((item, index) => (
                <li key={index} className='d-flex align-items-center'>
                  <img
                    onClick={() => handleQuestionCheck(index)}
                    className='cursor-pointer'
                    src={
                      answers[currentIndex] === index
                        ? checkedImage
                        : unCheckedImage
                    }
                    alt={
                      answers[currentIndex] === index ? 'Checked' : 'Unchecked'
                    }
                    style={{
                      cursor:
                        isSubmitted && answers[currentIndex] !== index
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  />
                  <p className='question-p ms-3'>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {Array.from({ length: questionsArray.length }, (_, index) => (
            <li
              key={index}
              className={currentIndex >= index ? 'answered' : ''}
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
        <button
          className='btn progress-btn btn-dark'
          onClick={handleNextStepClick}
        >
          Next {'>>>'}
        </button>
      </div>
    </div>
  )
}
