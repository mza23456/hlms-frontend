// AnimatedNumber.js
import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const duration = 1000; // ระยะเวลาของแอนิเมชัน (1 วินาที)
    const increment = value / (duration / 10); // เพิ่มค่าทุก 10ms

    const animate = () => {
      if (startValue < value) {
        startValue += increment;
        setDisplayValue(Math.min(startValue, value).toFixed(0)); // จำกัดเลขทศนิยม 2 ตำแหน่ง
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value]);

  return <p>{displayValue} %</p>;
};

export default AnimatedNumber;
