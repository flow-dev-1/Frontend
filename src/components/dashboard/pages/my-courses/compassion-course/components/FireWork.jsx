import React, { useEffect, useRef } from "react";
import Fireworks from "fireworks-js";

const FireWorks = ({ currentWeekIndex, setFirework }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fireworks = new Fireworks(canvasRef.current, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1,
        particles: 100,
        interval: 1000,
      });
      fireworks.start();

      // Stop fireworks after 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        fireworks.stop();
        setFirework(false);
      }, 5000);

      // Cleanup function to stop fireworks if the component unmounts
      return () => {
        fireworks.stop();
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div
      className="position-fixed top-0 end-0"
      style={{ height: "60%", width: "70%" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default FireWorks;
