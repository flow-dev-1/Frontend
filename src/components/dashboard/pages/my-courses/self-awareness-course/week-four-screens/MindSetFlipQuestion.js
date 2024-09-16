import React, { useEffect, useState } from 'react'
import '../newcourse.css'
import Modal from 'react-modal'
import checkedImage from '../../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../../assets/selfawareness-images/not-checked.png'
import imageMap from './imageMapping'
import NavigationButtons from './NavigationButtons'
import { toast } from 'react-toastify'

Modal.setAppElement('#root')

export default function MindSetFlipQuestion({
  onSubmit,
  onBack,
  onNext,
  activityIndex,
  formData,
}) {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
  const [valueDescription, setValueDescription] = useState(null)
  const [answers, setAnswers] = useState([])

  const questionsArray = [
    [
      'Generosity',
      'Respect',
      'Leadership',
      'Responsibility',
      'Integrity',
      'Empathy',
      'Compassion',
      'Gratitude',
      'Courage',
      'Forgiveness',
      'Perseverance',
      'Cooperation',
      'Kindness',
      'Tolerance',
      'Patience',
      'Friendship',
      'Teamwork',
      'Organization',
      'Grit',
      'Resilience',
      'Adaptability',
      'Contentment',
      'Honor',
      'Moderation',
      'Spirituality',
      'Healthy Life',
      'Family',
      'Resourcefulness',
      'Mindfulness',
      'Creativity',
      'Curiosity',
      'Punctuality',
      'Courtesy',
      'Self-control',
      'Self-discipline',
      'Optimism',
    ],
  ]

  // Splitting the questions into chunks of 12 (3 rows x 4 columns)
  const chunkSize = 12
  const questionChunks = questionsArray[0].reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [] // start a new chunk
    }
    chunks[chunkIndex].push(item)
    return chunks
  }, [])

  // Extract answers from formData for activity 4, if available
  const preFilledAnswers =
    formData.activities.find((activity) => activity.activity === 4)?.answers ||
    []

  // Initialize questionChecked state based on pre-filled answers
  const initializeCheckedState = () => {
    return questionChunks.reduce((acc, chunk, chunkIndex) => {
      const checkedIndices = chunk.reduce(
        (checkedIndices, question, questionIndex) => {
          if (preFilledAnswers.includes(question)) {
            checkedIndices.push(questionIndex)
          }
          return checkedIndices
        },
        []
      )
      acc[chunkIndex] = checkedIndices
      return acc
    }, {})
  }

  const [questionChecked, setQuestionChecked] = useState(initializeCheckedState)

  // Initialize chunkCompletion state based on pre-filled answers
  const initializeChunkCompletion = () => {
    return questionChunks.reduce((acc, chunk, chunkIndex) => {
      acc[chunkIndex] = questionChecked[chunkIndex].length > 0
      return acc
    }, {})
  }

  const [chunkCompletion, setChunkCompletion] = useState(
    initializeChunkCompletion
  )

  useEffect(() => {
    // Update chunk completion if the checked state changes
    setChunkCompletion((prev) => ({
      ...prev,
      [currentChunkIndex]: questionChecked[currentChunkIndex].length > 0,
    }))
  }, [questionChecked, currentChunkIndex])

  const handleQuestionCheck = (chunkIndex, optionIndex) => {
    setQuestionChecked((prevState) => {
      const updated = { ...prevState }
      if (updated[chunkIndex].includes(optionIndex)) {
        updated[chunkIndex] = updated[chunkIndex].filter(
          (i) => i !== optionIndex
        )
      } else {
        updated[chunkIndex] = [...updated[chunkIndex], optionIndex]
      }
      return updated
    })
  }

  const handleItemClick = (item) => {
    setValueDescription(item)
  }

  const handleModalClose = () => {
    setValueDescription(null)
  }

  const renderQuestion = () => {
    const currentChunk = questionChunks[currentChunkIndex]

    if (currentChunk) {
      return (
        <div className=''>
          <div className='mindset question-box'>
            <div className='mt-2 '>
              <div className='question-box-header align-items-start'>
                <h1 className='mb-0 '>Instruction: </h1>
                <h2
                  style={{ color: '#5b6161' }}
                  className='mb-0 d-flex ms-3 text-left'
                >
                  Flip each card to know more about the values. Select the box
                  on each card to pick the values you feel are a big part of who
                  you are.
                </h2>
              </div>
              <div className='scrollable'>
                <div className='flip-div'>
                  <ul
                    className='p-0 mt-4 '
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr 1fr',
                      justifyContent: 'center',
                    }}
                  >
                    {currentChunk.map((item, index) => (
                      <li
                        key={index}
                        className='d-flex align-items-center m-2'
                        style={{
                          flex: '0 0 30%',
                          maxWidth: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div onClick={() => handleItemClick(item)}>
                          <p className='question-p'>{item}</p>
                        </div>
                        <img
                          onClick={() =>
                            handleQuestionCheck(currentChunkIndex, index)
                          }
                          className='cursor-pointer'
                          src={
                            questionChecked[currentChunkIndex]?.includes(index)
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
          </div>
        </div>
      )
    }

    return null
  }

  const handleNextChunk = () => {
    const checkedItems = questionChecked[currentChunkIndex]
    if (checkedItems.length === 0) {
      toast.error('Please select at least one item before proceeding.')
      return
    }

    // Add checked items from current chunk to the answers array
    const updatedAnswers = [
      ...answers,
      ...checkedItems.map((index) => questionChunks[currentChunkIndex][index]),
    ]
    setAnswers(updatedAnswers)

    // Move to the next chunk if not the last one, otherwise submit
    if (currentChunkIndex < questionChunks.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1)
    } else {
      if (Object.values(chunkCompletion).every(Boolean)) {
        // Submit the form after updating the answers state with the last chunk's answers
        onNext(updatedAnswers)
      } else {
        alert('Please complete all chunks before submitting.')
      }
    }
  }

  const handlePreviousChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1)
    } else {
      onBack()
    }
  }

  return (
    <div>
      {renderQuestion()}

      {valueDescription && (
        <Modal
          isOpen={valueDescription}
          onRequestClose={handleModalClose}
          contentLabel='Value Description Modal'
          className='custom-modal'
          overlayClassName='custom-overlay'
          shouldCloseOnOverlayClick={true}
        >
          <div className='w-0'>
            {valueDescription && (
              <img
                src={imageMap[valueDescription] || ''}
                alt={valueDescription}
                onClick={handleModalClose}
                className='value-description-img'
              />
            )}
          </div>
        </Modal>
      )}

      <div className='slider-indicator'>
        <ul className='p-0 mt-5'>
          {questionChunks.map((_, index) => (
            <li
              key={index}
              className={currentChunkIndex >= index ? 'answered' : ''}
            ></li>
          ))}
        </ul>
      </div>

      <NavigationButtons
        onBack={handlePreviousChunk}
        onNext={handleNextChunk}
      />
    </div>
  )
}
