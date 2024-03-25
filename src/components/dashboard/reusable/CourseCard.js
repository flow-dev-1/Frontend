// src/components/CourseCard.js

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './reusable.css'
import Modal from 'react-modal';
import CourseInfoModal from '../../modals-pages/dashboard-modals/CourseInfoModal';

const CourseCard = ({ course }) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal()
  };



  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div className="reusable-course-card">
      <div className="course-card">
        <img src={course.image} alt="" />
        <div className="course-details">
          <h3>{course.title}</h3>
          {course.subtitle && <h4>{course.subtitle}</h4>}
          <p>{course.description}</p>
          <div className="d-flex icons">
            <span><Icon icon="fluent:people-24-regular" /> {course.viewed}</span>
            <span><Icon icon="mingcute:thumb-up-line" /> {course.likes}</span>
          </div>
          <div className="course-card-btn">
            <button className='btn card-btn preview' onClick={openModal}><Icon icon="prime:eye" /> Preview</button>
            <button className='btn card-btn cart'><Icon icon="f7:cart" /> N{course.amount}</button>
          </div>
        </div>
      </div>
      {/* <img src={`images/${course.id}.jpg`} alt={course.title} /> */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
      // closeTimeoutMS={2000}
      >
        <CourseInfoModal course={course} onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default CourseCard;
