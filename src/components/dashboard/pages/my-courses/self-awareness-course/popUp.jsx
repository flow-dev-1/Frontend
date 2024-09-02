import React from "react";

const BuyCoursePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto w-full">
        <h2 className="text-lg font-bold mb-4">Buy this course</h2>
        <p className="mb-4">You need to purchase this course to gain access.</p>
      </div>
    </div>
  );
};

export default BuyCoursePopup;
