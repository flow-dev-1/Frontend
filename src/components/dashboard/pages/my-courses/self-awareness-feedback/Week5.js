import React from 'react'
import Activity from './Activity'

const Week5 = () => {
  const activities = [
    { question: 'Topic for the week', answer: 'Topic for the week' },
    { question: 'Topic for the week', answer: 'Topic for the week' },
    { question: 'Topic for the week', answer: 'Topic for the week' },
    { question: 'Topic for the week', answer: 'Topic for the week' },
    { question: 'Topic for the week', answer: 'Topic for the week' },
  ]

  return (
    <div className='week-content'>
      {activities.map((activity, index) => (
        <Activity key={index} index={index} activity={activity} />
      ))}
    </div>
  )
}

export default Week5
