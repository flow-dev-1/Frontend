import React from 'react'
import './Week1.css' // Ensure your CSS is adapted for the new component
import PersonalityDiagram from '../../../../../assets/selfawareness-images/personality-diagram.png'
import PersonalityBanner from '../../../../../assets/selfawareness-images/personalityBanner.png'
const PersonalityFeedback = ({ feedback }) => {
  return (
    <div className='personality-feedback'>
      <div className='personalityBanner'>
        <img src={PersonalityBanner} alt='' />
      </div>

      <p style={{ fontSize: '14px', color: '#000' }}>
        Your results from the True Colors Personality Test reflect different
        aspects of your personality. Each color represents a unique set of
        traits that influence how you think, feel, and interact with the world.
        Understanding these traits can help you  recognize your strengths and
        areas for growth. Here's what each color means:
      </p>
      <div className='chart'>
        {/* Image component or an actual chart rendering can be placed here */}
        <img src={PersonalityDiagram} alt='Personality Chart' />
      </div>
      <div className='feedback-details'>
        {Object.keys(feedback.colors).map((color, index) => (
          <div key={index}>
            <p className={`color-feedback ${color}`}>
              {feedback.colors[color].title}
            </p>
            <p className='d-flex align-items-center gap-2'>
              <h4 style={{ color: '#000', marginTop: '.4rem' }}>Traits:</h4>{' '}
              {feedback.colors[color].traits}
            </p>
            <p className='d-flex align-items-center gap-2'>
              <h4 style={{ color: '#000', marginTop: '.4rem' }}>Strengths:</h4>{' '}
              {feedback.colors[color].strengths}
            </p>
            <p className='d-flex align-items-center gap-2'>
              <h4 style={{ color: '#000', marginTop: '.4rem' }}>Challenges:</h4>{' '}
              <p style={{ fontSize: '14px' }}>
                {' '}
                {feedback.colors[color].challenges}
              </p>
            </p>
            <p style={{ fontSize: '14px' }}>
              {' '}
              {feedback.colors[color].challengesExp}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalityFeedback
