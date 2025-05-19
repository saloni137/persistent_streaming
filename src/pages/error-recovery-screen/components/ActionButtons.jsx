import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButtons = ({ onRetry, onReset, onReport, isRetrying }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="btn btn-primary py-2 px-4 flex-1 flex items-center justify-center"
        aria-label="Retry Connection"
      >
        {isRetrying ? (
          <>
            <Icon name="Loader" size={18} className="mr-2 animate-spin" />
            Retrying...
          </>
        ) : (
          <>
            <Icon name="RefreshCw" size={18} className="mr-2" />
            Retry Connection
          </>
        )}
      </button>
      
      <button
        onClick={onReset}
        className="btn btn-secondary py-2 px-4 flex-1 flex items-center justify-center"
        aria-label="Reset Session"
      >
        <Icon name="RotateCcw" size={18} className="mr-2" />
        Reset Session
      </button>
      
      <button
        onClick={onReport}
        className="btn btn-tertiary py-2 px-4 flex-1 flex items-center justify-center"
        aria-label="Report Issue"
      >
        <Icon name="Flag" size={18} className="mr-2" />
        Report Issue
      </button>
    </div>
  );
};

export default ActionButtons;