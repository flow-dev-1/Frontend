import React from 'react'
import logo from '../../assets/logo.png' // Adjust the path to your logo

const Loading = () => {
  return (
    <div
      className='loading-overlay'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "2rem"
      }}
    >
      <img
        src={logo}
        alt='flow'
        style={{
          maxWidth: '100px',
          maxHeight: '100px',
          animation: 'pulse 2s infinite',
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Loading
