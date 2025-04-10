import React from "react";

function ProgressBar({ value, handleChange }) {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Display percentage above the bar */}
            <div className="text-center mb-5 mt-5">
                <h1 className="text-blue bg-white py-10 px-5 text-2xl rounded d-inline py-4">
                    {value}
                </h1>
            </div>
            <style>
                {`
                    input[type=range] {
                        -webkit-appearance: none;
                        width: 100%;
                        height: 16px;
                        border-radius: 8px;
                        background: linear-gradient(to right, #2563eb 0%, #2563eb ${value}%, #d1d5db ${value}%, #d1d5db 100%);
                    }
                    
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 28px;
                        height: 28px;
                        background-color: #2563eb;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid white;
                    }
                    
                    input[type=range]::-moz-range-thumb {
                        width: 28px;
                        height: 28px;
                        background-color: #2563eb;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid white;
                    }
                `}
                </style>
          

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



<div className="w-full grid grid-cols-3 mt-2 text-blue-600 text-2xl font-bold px-2">
    <span className="text-left">0</span>
    <span className="text-center">50</span>
    <span className="text-right">100</span>
</div>
        </div>
    );
}

export default ProgressBar;