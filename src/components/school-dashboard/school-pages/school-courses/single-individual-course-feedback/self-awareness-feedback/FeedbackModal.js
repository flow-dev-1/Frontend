import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import './FeedbackModal.css'

function FeedbackModal({ onClose, onSubmit, initialFeedback }) {
    const [feedback, setFeedback] = useState(initialFeedback || '') // Initialize with existing feedback

    useEffect(() => {
        setFeedback(initialFeedback || '') // Ensure that feedback state updates if initialFeedback changes
    }, [initialFeedback])

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value) // Update feedback state
    }

    const handleSubmit = () => {
        if (feedback.trim()) {
            onSubmit(feedback)
            setFeedback('')
        }
    }

    return (
        <div className='modal-overlay-feed'>
            <div className='feed-container'>
                <div className='header-section-feed'>
                    <div className='modal-header-feed'>
                        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Feedback Form</h2>
                    </div>
                    <button className='modal-close-btn' onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon icon='formkit:close' color='#333' width={24} />
                    </button>
                </div>

                <p style={{ color: '#329bd6', margin: '10px 0' }}>Drop feedback based on the student’s response to this activity.</p>

                <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder='Type your feedback here'
                    style={{
                        width: '100%',
                        height: '150px',
                        padding: '10px',
                        borderRadius: '5px',
                        resize: 'none',
                        margin: '10px 0',
                        border: '1px solid #ddd'
                    }}
                />
                <div className='but-cont' style={{ width: 'fit-content', marginLeft: 'auto' }}>
                    <button
                        className='feed-but'
                        onClick={handleSubmit}
                        style={{
                            background: '#275dad',
                            borderRadius: '5px',
                            color: 'white',
                            padding: '7px 15px',
                            fontSize: '14px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedbackModal
