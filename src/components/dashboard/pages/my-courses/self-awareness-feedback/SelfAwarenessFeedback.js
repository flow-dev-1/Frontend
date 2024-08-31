import React, { useState } from 'react'
import Week1 from './Week1'
import Week2 from './Week2'
import Week3 from './Week3'
import Week4 from './Week4'
import Week5 from './Week5'
import './selfawareness-feedback.css'
import { Icon } from '@iconify/react'

const SelfAwarenessFeedback = () => {
  const [expandedWeek, setExpandedWeek] = useState(null) // State to track which week is expanded

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber) // Toggle the week
  }

  return (
    <div className='feedback-container'>
      {/* Week 1 */}
      <div className='week-title-container'>
        <div className='week-title'>
          <h2 onClick={() => toggleWeek(1)} style={{ fontSize: '24px' }}>
            Week 1:{' '}
            <span style={{ fontSize: '14px' }}>
              Introduction to Self-Awareness
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1
                ? 'simple-line-icons:arrow-up'
                : 'simple-line-icons:arrow-down'
            }
            onClick={() => toggleWeek(1)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {expandedWeek === 1 && <Week1 />}
      </div>

      {/* Week 2 */}
      <div className='week-title-container'>
        <div className='week-title'>
          <h2 onClick={() => toggleWeek(2)} style={{ fontSize: '24px' }}>
            Week 2:{' '}
            <span style={{ fontSize: '14px' }}>
              Identifying Strengths and Weaknesses
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1
                ? 'simple-line-icons:arrow-up'
                : 'simple-line-icons:arrow-down'
            }
            onClick={() => toggleWeek(2)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {expandedWeek === 2 && <Week2 />}
      </div>

      {/* Week 3 */}
      <div className='week-title-container'>
        <div className='week-title'>
          <h2 onClick={() => toggleWeek(3)} style={{ fontSize: '24px' }}>
            Week 3:{' '}
            <span style={{ fontSize: '14px' }}>Understanding Mindset</span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1
                ? 'simple-line-icons:arrow-up'
                : 'simple-line-icons:arrow-down'
            }
            onClick={() => toggleWeek(3)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {expandedWeek === 3 && <Week3 />}
      </div>

      {/* Week 4 */}
      <div className='week-title-container'>
        <div className='week-title'>
          <h2 onClick={() => toggleWeek(4)} style={{ fontSize: '24px' }}>
            Week 4: <span style={{ fontSize: '14px' }}>Identifying Values</span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1
                ? 'simple-line-icons:arrow-up'
                : 'simple-line-icons:arrow-down'
            }
            onClick={() => toggleWeek(4)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {expandedWeek === 4 && <Week4 />}
      </div>

      {/* Week 5 */}
      <div className='week-title-container'>
        <div className='week-title'>
          <h2 onClick={() => toggleWeek(5)} style={{ fontSize: '24px' }}>
            Week 5:{' '}
            <span style={{ fontSize: '14px' }}>
              Emotional Intelligence and Communication Skills
            </span>
          </h2>
          <Icon
            icon={
              expandedWeek === 1
                ? 'simple-line-icons:arrow-up'
                : 'simple-line-icons:arrow-down'
            }
            onClick={() => toggleWeek(5)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {expandedWeek === 5 && <Week5 />}
      </div>

      {/* Final Report Section */}
      <div
        style={{ backgroundColor: '#5CE1E6' }}
        className='final-report-container'
      >
        <div className='final-report-title'>
          <h2>
            Final Report:{' '}
            <span style={{ fontSize: '14px' }}>
              {' '}
              Summary of your journey through Self Awareness
            </span>
          </h2>

          <a
            href='/path/to/pdf'
            download='SelfAwarenessSummary.pdf'
            className='download-link'
          >
            (Download PDF)
          </a>
          <Icon
            icon={
              expandedWeek === 6
                ? 'simple-line-icons:arrow-down'
                : 'simple-line-icons:arrow-up'
            }
            onClick={() => toggleWeek(6)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {/* Add any content you want to display when the Final Report is expanded */}
      </div>
    </div>
  )
}

export default SelfAwarenessFeedback
