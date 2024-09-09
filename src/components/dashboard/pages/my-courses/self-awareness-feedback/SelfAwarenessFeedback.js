import React, { useState, useRef } from 'react'
import Week1 from './Week1'
import Week2 from './Week2'
import Week3 from './Week3'
import Week4 from './Week4'
import Week5 from './Week5'
import './selfawareness-feedback.css'
import { Icon } from '@iconify/react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const SelfAwarenessFeedback = () => {
  const [expandedWeek, setExpandedWeek] = useState(null) // State to track which week is expanded
  const contentRef = useRef() // Reference to the entire content

  const toggleWeek = (weekNumber) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber) // Toggle the week
  }

  // Function to generate PDF
  const generatePDF = () => {
    const input = contentRef.current

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save('SelfAwarenessFeedback.pdf')
    })
  }

  return (
    <div ref={contentRef} className='feedback-container'>
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
              expandedWeek === 2
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
              expandedWeek === 3
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
              expandedWeek === 4
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
              expandedWeek === 5
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

          <div>
            <a download='SelfAwarenessSummary.pdf' className='download-link'>
              (Download PDF)
            </a>
            <Icon onClick={generatePDF} icon='bi:download' />
          </div>
        </div>
        {/* Add any content you want to display when the Final Report is expanded */}
      </div>
    </div>
  )
}

export default SelfAwarenessFeedback
