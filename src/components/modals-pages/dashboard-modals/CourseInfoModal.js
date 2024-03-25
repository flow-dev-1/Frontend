import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import '../modals.css'

export default function CourseInfoModal({ course, onClose }) {
    return (
        <div className="course-info-modal modal-content">
            <div className="p-4">
                <div className="course-info-modal-header ">
                    <h2 className='mb-0'>{course.title} Course Guide</h2>
                    <button className="close-btn" onClick={onClose}><Icon icon="mingcute:close-fill" /></button>
                </div>
                <hr className='w-100 h-auto mb-0' />
                <div className="course-info-modal-body ">
                    <h3>Course Overview</h3>
                    <p>{course.description}</p>
                    <div className="mt-4">
                        <h3>Course Objectives</h3>
                        Upon completion of the Growth Mindset Course, students will be able to:
                        <div className="objectives">
                            <ul>
                                {course.objectives.map((objective, index) => (
                                    <li key={index}>
                                        <p className='fw-bold'>{objective.title}:</p> {objective.description}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>


            <div className="course-info-modal-footer container-fluid py-2 px-4">
                <p>For more details, enroll in the course now!</p>
                <button className="btn modal-btn cart"><Icon icon="f7:cart" /> N{course.amount}</button>
            </div>
        </div>
    );
}
