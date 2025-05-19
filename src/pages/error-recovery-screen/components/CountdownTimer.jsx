import React from "react";

const CountdownTimer = ({ seconds, totalSeconds }) => {
  // Calculate progress percentage
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-text-secondary text-sm mb-2">
        Retrying in <span className="font-semibold">{seconds}</span> seconds...
      </div>
      
      <div className="w-full bg-surface rounded-full h-2 mb-4">
        <div 
          className="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;