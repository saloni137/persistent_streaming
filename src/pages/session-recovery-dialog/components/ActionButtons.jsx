import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButtons = ({ onResume, onStartNew, timeLeft }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={onResume}
        className="btn btn-primary py-2.5 px-4 flex-1 flex items-center justify-center gap-2"
        autoFocus
      >
        <Icon name="RotateCcw" size={18} />
        Resume ({timeLeft}s)
      </button>
      
      <button
        onClick={onStartNew}
        className="btn btn-secondary py-2.5 px-4 flex-1 flex items-center justify-center gap-2"
      >
        <Icon name="Plus" size={18} />
        Start New
      </button>
    </div>
  );
};

export default ActionButtons;