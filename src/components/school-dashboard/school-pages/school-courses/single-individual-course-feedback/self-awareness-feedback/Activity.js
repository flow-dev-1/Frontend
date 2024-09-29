import React from 'react'

const Activity = ({ index, activity }) => {
  return (
    <div className='activity'>
      <div className='activity-title'>Activity {index + 1}</div>
      <div className='question'>Question: {activity.question}</div>
      <div className='answer'>Answer: {activity.answer}</div>
    </div>
  )
}

export default Activity
