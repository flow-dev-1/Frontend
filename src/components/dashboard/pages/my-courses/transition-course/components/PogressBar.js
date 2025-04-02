import React from "react";

function ProgressBar({ value, handleChange }) {
    return (
        <div className="w-full flex flex-col items-center space-y-3">
            {/* Display percentage above the bar */}
            <div className="text-center mb-5 mt-5">
                <h1 className="text-blue bg-white py-4 px-5 text-2xl rounded d-inline">
                    {value}
                </h1>
            </div>

            {/* Progress Bar */}
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                step={10}
                className="custom-range"
                style={{
                    '--range-progress': `${value}%`
                }}
            />

            <div className="flex justify-between w-full mt-2">
                <div className="flex-1 text-left d-inline"><h2 className="text-gray-500 text-3xl d-inline">0</h2></div>
                <div className="flex-1 text-center d-inline"><h2 className="text-gray-500 text-3xl d-inline">50</h2></div>
                <div className="flex-1 text-right d-inline"><h2 className="text-gray-500 text-3xl d-inline">100</h2></div>
            </div>


        </div>
    );
}

export default ProgressBar;