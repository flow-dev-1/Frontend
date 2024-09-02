import React, { useState } from 'react'
import './FinalReport.css'

const FinalReport = ({rate}) => {
  const [expanded, setExpanded] = useState(false)

  const toggleWeek = () => {
    setExpanded(!expanded)
  }

  return (
    <div class='final-report'>
      <div>
        <h4 style={{ fontSize: '20px', color: '#fff' }}>
          Weekly Report
        </h4>
        <h1 class='icon-box'>{rate}%</h1>
      </div>

      <div class='text-box'>
        <br />
        Figma ipsum component variant main layer. Draft hand plugin arrow line
        plugin slice. Comment boolean background union stroke subtract underline
        vector. Italic move undo create pen strikethrough main arrange image.
        Component font.
      </div>
    </div>
  )
}

export default FinalReport
