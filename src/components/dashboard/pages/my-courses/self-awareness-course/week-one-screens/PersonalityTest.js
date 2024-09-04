import React, { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import '../newcourse.css'
import personalityTest from '../../../../../../assets/selfawareness-images/colorTest.png'
import personalityHeader from '../../../../../../assets/selfawareness-images/personality-header.png'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'

// Set the app element for accessibility
Modal.setAppElement('#root')

// Toast notification (import from your preferred toast library)

export default function PersonalityTest({
  onNext,
  onBack,
  formData,
  activityIndex,
}) {
  const answers = [
    {
      title:
        "You're working on a group project, and it's time to divide the tasks. How do you approach this situation?",
      questionList: [
        'A. You immediately take charge, assigning tasks to ensure everything is done efficiently.', // Red
        'B. You suggest a detailed plan, making sure everyone understands their responsibilities and feels comfortable.', // Green
        "C. You prefer to discuss everyone's strengths and weaknesses first, ensuring tasks are assigned according to individual abilities.", // Blue
        'D. You focus on making the process enjoyable, suggesting creative ideas and encouraging a fun atmosphere.', // Yellow
      ],
    },
    {
      title:
        'You find yourself in a leadership position during a team meeting. What is your main focus?',
      questionList: [
        'A. Ensuring that tasks are delegated effectively and deadlines are met.', // Red
        'B. Making sure everyone feels included and their opinions are considered.', // Green
        'C. Analyzing the team’s skills and assigning tasks accordingly to maximize productivity.', // Blue
        'D. Encouraging a creative approach and fostering a positive team environment.', // Yellow
      ],
    },
    {
      title:
        'When faced with a new and challenging problem, what is your approach?',
      questionList: [
        'A. You jump straight in and start tackling the problem with a clear plan.', // Red
        'B. You gather information and consult with others before taking action.', // Green
        'C. You take time to understand the problem thoroughly and consider different solutions.', // Blue
        'D. You brainstorm with others to come up with innovative and unconventional solutions.', // Yellow
      ],
    },
    {
      title: 'I like to:',
      questionList: [
        'A. Act on a moment’s notice; do risky things.', // Red
        'B. Provide answers or give thought to people’s questions.', // Green
        'C. Help maintain a sense of harmony and togetherness.', // Blue
        'D. Be responsible, dependable, and helpful to others.', // Yellow
      ],
    },
    {
      title: 'One thing I am really good at is:',
      questionList: [
        'A. Acting courageously.', // Red
        'B. Thinking.', // Green
        'C. Being sensitive.', // Blue
        'D. Organizing.', // Yellow
      ],
    },
    {
      title: 'Friends who know me best would say that I am:',
      questionList: [
        'A. Competitive.', // Red
        'B. Reserved, thoughtful.', // Green
        'C. Emotional, friendly.', // Blue
        'D. Neat, prepared.', // Yellow
      ],
    },
    {
      title: 'My basic approach to life is:',
      questionList: [
        'A. To take one day at a time and have fun.', // Red
        'B. To figure out what life is all about.', // Green
        'C. To help others and be happy and succeed.', // Blue
        'D. To plan for the future and make it as good as possible.', // Yellow
      ],
    },
    {
      title: 'When I am feeling discouraged or “down in the dumps”:',
      questionList: [
        'A. I often become rude, mad, or sometimes even mean.', // Red
        'B. I withdraw, don’t talk very much, and try to think my way out of the problem.', // Green
        'C. I feel emotional, am sad, and usually like to talk it over with someone close to me.', // Blue
        'D. I try to figure out what’s causing the problem and fix it.', // Yellow
      ],
    },
    {
      title: 'I feel good about myself when:',
      questionList: [
        'A. I can do things that are difficult.', // Red
        'B. I can solve problems or figure things out.', // Green
        'C. I can help other people.', // Blue
        'D. I am appreciated or rewarded for things I do.', // Yellow
      ],
    },
    {
      title:
        'Teachers at school (who like me and in whose class I do pretty well) would probably describe me as:',
      questionList: [
        'A. Charming, a natural leader, clever, someone who is fun to have around.', // Red
        'B. Thoughtful, someone who has good answers, someone who likes to figure out problems.', // Green
        'C. Nice, friendly, someone who gets along with other students and is helpful to the teacher and others.', // Blue
        'D. Neat, organized, prepared, someone who does assignments and is a good student.', // Yellow
      ],
    },
    {
      title:
        'Teachers at school who saw me when I wasn’t on my best behavior might describe me as:',
      questionList: [
        'A. Rowdy or a little wild.', // Red
        'B. Arrogant.', // Green
        'C. Talkative.', // Blue
        'D. Someone who wants things my way; dominant; worrying.', // Yellow
      ],
    },
    {
      title: 'When I am faced with a challenge:',
      questionList: [
        'A. I dive in headfirst and take immediate action.', // Red
        'B. I analyze the situation and come up with a strategy.', // Green
        'C. I consider how it will impact the people involved and try to keep everyone calm.', // Blue
        'D. I make a detailed plan and follow it step by step.', // Yellow
      ],
    },

    // Add more questions here
  ]

  // Retrieve the initial state from formData if available
  const initialState =
    formData?.activities?.find((act) => act.activity === activityIndex) || {}

  // Set up the component's state
  const [currentIndex, setCurrentIndex] = useState(
    initialState.currentIndex || 1
  )
  const [questionChecked, setQuestionChecked] = useState(
    initialState.questionChecked ||
      answers.reduce((acc, _, index) => ({ ...acc, [index]: null }), {})
  )

  const [showModal, setShowModal] = useState(false)
  const [chartData, setChartData] = useState([
    { name: 'Red', value: 0, color: '#FF6384' },
    { name: 'Green', value: 0, color: '#36A2EB' },
    { name: 'Blue', value: 0, color: '#4BC0C0' },
    { name: 'Yellow', value: 0, color: '#FFCE56' },
  ])

  // Handle the "Next" button click
  const handleNextStepClick = () => {
    const questionIndex = currentIndex - 2
    if (questionIndex >= 0 && questionChecked[questionIndex] === null) {
      toast.error('Please select an answer before proceeding.')
      return
    }

    if (currentIndex < answers.length + 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      const totalQuestions = Object.keys(questionChecked).length

      // Count the selections for each color
      const colorCount = { red: 0, green: 0, blue: 0, yellow: 0 }
      Object.values(questionChecked).forEach(({ index }) => {
        switch (index) {
          case 0: // Red
            colorCount.red++
            break
          case 1: // Green
            colorCount.green++
            break
          case 2: // Blue
            colorCount.blue++
            break
          case 3: // Yellow
            colorCount.yellow++
            break
          default:
            break
        }
      })

      // Calculate the percentages
      const redPercentage = Math.round((colorCount.red / totalQuestions) * 100)
      const greenPercentage = Math.round(
        (colorCount.green / totalQuestions) * 100
      )
      const bluePercentage = Math.round(
        (colorCount.blue / totalQuestions) * 100
      )
      const yellowPercentage = Math.round(
        (colorCount.yellow / totalQuestions) * 100
      )

      // Update the chart data with percentages
      setChartData([
        { name: 'Red', value: redPercentage, color: '#FF0500' },
        { name: 'Green', value: greenPercentage, color: '#2CCF4F' },
        {
          name: 'Blue',
          value: bluePercentage,
          color: '#0093FF',
        },
        {
          name: 'Yellow',
          value: yellowPercentage,
          color: '#FEF900',
        },
      ])
      setShowModal(true)
    }
  }

  // Handle question selection
  const handleQuestionCheck = (questionIndex, optionIndex) => {
    const selectedText = answers[questionIndex].questionList[optionIndex]
    setQuestionChecked((prevState) => ({
      ...prevState,
      [questionIndex]: { index: optionIndex, text: selectedText },
    }))
  }

  // Handle the "Back" button click
  const handleBackClick = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    } else {
      onBack()
    }
  }

  // Handle the "Next" button click in the modal
  const handleModalNextClick = () => {
    setShowModal(false)
    // Pass the updated answers to the onNext function
    onNext({
      currentIndex,
      questionChecked,
    })
  }

  // Render the current question
  const renderQuestion = () => {
    if (currentIndex === 1) {
      return (
        <div className='assessment question-box'>
          <img src={personalityTest} alt='Personality Test' />
        </div>
      )
    } else {
      const questionIndex = currentIndex - 2
      if (questionIndex >= 0 && questionIndex < answers.length) {
        return (
          <div className='assessment question-box py-4'>
            <div className='d-flex align-items-start'>
              <h1>{currentIndex - 1}.</h1>
              <h2 className='text-center mb-0 fs-1 ms-3'>
                {answers[questionIndex].title}
              </h2>
            </div>
            <div className='checkbox-questions'>
              <ul className='p-0'>
                {answers[questionIndex].questionList.map((item, index) => (
                  <li key={index} className='d-flex my-3'>
                    <img
                      onClick={() => handleQuestionCheck(questionIndex, index)}
                      className='cursor-pointer'
                      src={
                        questionChecked[questionIndex]?.index === index
                          ? checkedImage
                          : unCheckedImage
                      }
                      alt=''
                    />
                    <p className='question-p ms-3'>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      } else {
        return <div>Error: Question not found.</div>
      }
    }
  }

  return (
    <div>
      {renderQuestion()}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {Array.from({ length: answers.length + 1 }, (_, index) => (
            <li
              key={index}
              className={currentIndex >= index + 1 ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <div className='d-flex align-items-center justify-content-around mx-auto mt-5'>
        <button
          className='btn progress-btn btn-light'
          onClick={handleBackClick}
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

      {/* Modal for displaying the pie chart */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel='Personality Color Test Results'
        className='custom-modal-otp-three'
        overlayClassName='custom-overlay'
      >
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
        >
          <img width={250} src={personalityHeader} alt='' />
        </div>
        <button
          style={{ width: '10%', marginLeft: '95%', marginTop:"-8rem" }}
          className='btn '
          onClick={() => setShowModal(false)}
        >
          <Icon width={25} icon='formkit:close' />
        </button>

        <ResponsiveContainer width='100%' height={170}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              label={({ index }) => chartData[index].name}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <p
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
        >
          Check the feedback section for more details.
        </p>

        <div className='d-flex justify-content-end mt-4'>
          <button
            className='btn progress-btn'
            style={{ backgroundColor: '#329BD6', color: '#fff' }}
            onClick={handleModalNextClick}
          >
            Next {'>>>'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
