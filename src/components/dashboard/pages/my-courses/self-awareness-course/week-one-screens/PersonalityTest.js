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
      const redPercentage = (colorCount.red / totalQuestions) * 100
      const greenPercentage = (colorCount.green / totalQuestions) * 100
      const bluePercentage = (colorCount.blue / totalQuestions) * 100
      const yellowPercentage = (colorCount.yellow / totalQuestions) * 100

      // Update the chart data with percentages
      setChartData([
        { name: 'Red', value: redPercentage, color: '#FF6384' },
        { name: 'Green', value: greenPercentage, color: '#36A2EB' },
        { name: 'Blue', value: bluePercentage, color: '#4BC0C0' },
        { name: 'Yellow', value: yellowPercentage, color: '#FFCE56' },
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
        <h2>Personality Color Test Results</h2>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className='d-flex justify-content-end mt-4'>
          <button
            className='btn btn-secondary me-3'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className='btn btn-primary' onClick={handleModalNextClick}>
            Next
          </button>
        </div>
      </Modal>
    </div>
  )
}
