import React from 'react'
import './Week1.css' // Import the CSS file for styling
import PersonalityFeedback from './PersonalityFeedback'
import checkedImage from '../../../../../assets/selfawareness-images/checked.png'
import unCheckedImage from '../../../../../assets/selfawareness-images/not-checked.png'
import { Icon } from '@iconify/react'
import FinalReport from './FinalReport'

const activities = [
  {
    activity: 1,
    question: 'What do you think "Self Awareness" is?',
    answer: 'Figma ipsum component variant main layer...',
    feedback: 'Figma ipsum component variant main layer...',
  },
  {
    activity: 2, // New activity
    question:
      'Drag-and-drop the statements on the left into any of these bowls.',
    answer: {
      yes: [
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
      ],
      no: [
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
        'I enjoy meeting new people.',
      ],
      sometimes: ['I enjoy meeting new people.', 'I enjoy meeting new people.'],
    },
    feedback:
      'Figma ipsum component variant main layer. Font duplicate component effect vertical fill list team content editor...',
  },
]

const questions = [
  {
    question: 'When I make decisions:',
    options: [
      {
        label: 'A. I do it quickly and go with the first impressions.',
        color: 'Red',
        checked: true,
      },
      {
        label: 'B. I think about it, consider the options, and then decide.',
        color: 'Green',
        checked: false,
      },
      {
        label:
          'C. I listen to my feelings and consider how my decisions will affect others.',
        color: 'Blue',
        checked: false,
      },
      {
        label:
          'D. I take it seriously and always try to make the right decision.',
        color: 'Yellow',
        checked: false,
      },
    ],
  },
]

const questionsQuiz = [
  {
    question: 'When I make decisions:',
    options: [
      {
        label: 'A. I do it quickly and go with the first impressions.',
        color: 'Red',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label: 'B. I think about it, consider the options, and then decide.',
        color: 'Green',
        checked: true, // This is the correct option
        isCorrect: true,
      },
      {
        label:
          'C. I listen to my feelings and consider how my decisions will affect others.',
        color: 'Blue',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
      {
        label:
          'D. I take it seriously and always try to make the right decision.',
        color: 'Yellow',
        checked: false, // This is not the correct option
        isCorrect: false,
      },
    ],
  },
]

const personalityFeedback = {
  chartData: {
    red: 25,
    green: 25,
    blue: 25,
    yellow: 25,
  },
  colors: {
    red: {
      title: 'Red',
      traits:
        'Energetic, action-oriented, competitive, spontaneous, and adventurous.',
      strengths:
        'Strong leadership qualities, enjoys taking risks, excels in fast-paced environments.',
      challenges:
        'May be impulsive, impatient, and can sometimes overlook details in favor of quick decisions.',
      challengesExp:
        'People who align more with the Red personality often thrive in dynamic situations where quick thinking and decisive action are needed. However, they may need to be mindful of their tendency to act before fully considering all consequences.',
    },
    green: {
      title: 'Green',
      traits: 'Analytical, logical, strategic, and thoughtful.',
      strengths:
        'Problem-solving abilities, enjoys intellectual challenges, values precision and accuracy.',
      challenges:
        'May overthink or become indecisive, can be perceived as distant or overly critical.',
      challengesExp:
        'If you dominantly have a Green personality, you likely excel in situations that require careful thought and analysis. Your logical approach is a valuable asset, but balancing it with consideration for emotional and social factors is important.',
    },
    blue: {
      title: 'Blue',
      traits: 'Compassionate, empathetic, harmonious, and cooperative.',
      strengths:
        'Excellent interpersonal skills, values relationships, excels in teamwork and communication.',
      challenges:
        'May struggle with setting boundaries, can be overly sensitive or avoid conflict.',
      challengesExp:
        'If your results aligned more with the Blue personality are often the glue that holds groups together, providing support and fostering harmony. However, it’s essential to establish boundaries to avoid becoming overwhelmed by others’ needs.',
    },
    yellow: {
      title: 'Yellow',
      traits: 'Optimistic, spontaneous, sociable, and enthusiastic.',
      strengths:
        'Good at creating a positive atmosphere, enjoys networking, brings energy to group settings.',
      challenges:
        'May avoid serious tasks or become easily distracted, struggles with long-term focus.',
      challengesExp:
        'If your results aligned more with the Yellow personality, your strength lies in your ability to create order and maintain stability. You are the person others rely on for consistency and thoroughness, though it’s beneficial to remain open to new ideas and changes.',
    },
  },
}

const Week1 = () => {
  return (
    <div className='week-content'>
      {activities.map((activity, index) => (
        <div style={{ border: 'none' }} className='activity' key={index}>
          <p className='activity-badge'>Activity {activity.activity}</p>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span> {activity.question}</span>
          </p>

          {activity.answer.yes ? ( // Check if the activity has the special answer format
            <div
              style={{ width: '90%', margin: '1rem auto' }}
              className='drag-drop-activity'
            >
              <div className='drag-drop-section'>
                <h5 id='yes'>YES</h5>
                <ul>
                  {activity.answer.yes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className='drag-drop-section'>
                <h5 id='no'>NO</h5>
                <ul>
                  {activity.answer.no.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className='drag-drop-section'>
                <h5 id='sometimes'>SOMETIMES</h5>
                <ul>
                  {activity.answer.sometimes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className='d-flex align-items-center justify-content-between'>
              <div className='answer d-flex align-items-center gap-2'>
                <h4 style={{ color: '#555', marginTop: '.3rem' }}>Answer:</h4>{' '}
                <p style={{ fontSize: '14px' }}>{activity.answer}</p>
              </div>
              <Icon
                style={{ color: '#D6D6D6' }}
                width={20}
                icon='hugeicons:comment-01'
              />
            </p>
          )}

          <p className='feedback'>
            <div id='badge'>Feedback:</div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div className='feedback-card'>{activity.feedback}</div>
              <Icon
                style={{ color: '#275DAD' }}
                width={20}
                icon='lucide:edit'
              />
            </div>
          </p>
        </div>
      ))}

      {questions.map((q, index) => (
        <div className='question-block' key={index}>
          <p className='activity-badge'>
            Activity {index + 1 + activities.length}
          </p>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span> {q.question}</span>
          </p>
          <div className='options'>
            {q.options.map((option, idx) => (
              <div className='option' key={idx}>
                <img
                  src={option.checked ? checkedImage : unCheckedImage}
                  alt={option.checked ? 'Checked' : 'Unchecked'}
                  style={{ width: '20px', marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }} className='option-label'>
                  {option.label}
                </span>
                <span className={`color-label ${option.color.toLowerCase()}`}>
                  {option.color}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <PersonalityFeedback feedback={personalityFeedback} />

      {questionsQuiz.map((q, index) => (
        <div className='question-block' key={index}>
          <p className='activity-badge'>Activity 4</p>
          <p className='question d-flex align-items-center gap-2'>
            <h4 style={{ color: '#275DAD', marginTop: '.3rem' }}>Question:</h4>
            <span> {q.question}</span>
          </p>
          <div className='options'>
            {q.options.map((option, idx) => (
              <div className='option' key={idx}>
                <img
                  src={option.isCorrect ? checkedImage : unCheckedImage}
                  alt={option.isCorrect ? 'Checked' : 'Unchecked'}
                  style={{ width: '20px', marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }} className='option-label'>
                  {option.label}
                </span>
                <p style={{ width: '120px', textAlign: 'center' }}>
                  {option.isCorrect ? (
                    <span
                      style={{ color: '#50AA50' }}
                      className='d-flex align-items-center justify-content-center gap-1 '
                    >
                      <Icon width={17} icon='ph:seal-check-light' />
                      Correct
                    </span>
                  ) : (
                    <span
                      style={{ color: '#FD483D' }}
                      className='d-flex align-items-center justify-content-center gap-1'
                    >
                      <Icon width={17} icon='mdi:cross-circle-outline' />
                      Wrong
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <FinalReport />
    </div>
  )
}

export default Week1
