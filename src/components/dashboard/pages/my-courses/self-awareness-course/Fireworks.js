import React, { useEffect, useRef } from 'react';
import Fireworks from 'fireworks-js';

const MyFireWorks = ({currentWeekIndex,setFirework}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fireworks = new Fireworks(canvasRef.current, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1,
        particles: 100,
        interval: 1000
      });
      fireworks.start();

      // Stop fireworks after 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        fireworks.stop();
        setFirework(false)
      }, 5000);

      // Cleanup function to stop fireworks if the component unmounts
      return () => {
        fireworks.stop();
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, right: 60, height: '60%', width: '70%' }} />
    </div>
  );
};

export default MyFireWorks;
// , backgroundColor:"red"