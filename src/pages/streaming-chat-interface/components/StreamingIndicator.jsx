import React from "react";
import Icon from "../../../components/AppIcon";

const StreamingIndicator = ({ 
  isStreaming = false, 
  isConnected = true,
  streamProgress = 0,
  onRetry = () => {},
}) => {
  if (!isConnected) {
    return (
      <div className="flex items-center justify-between bg-error bg-opacity-10 text-error px-4 py-2 rounded-md">
        <div className="flex items-center">
          <Icon name="WifiOff" size={16} className="mr-2" />
          <span className="text-sm font-medium">Connection lost</span>
        </div>
        <button 
          onClick={onRetry}
          className="text-sm font-medium flex items-center hover:underline"
        >
          <Icon name="RefreshCw" size={14} className="mr-1" />
          Retry
        </button>
      </div>
    );
  }

  if (!isStreaming) return null;

  return (
    <div className="flex items-center justify-between bg-primary-50 px-4 py-2 rounded-md">
      <div className="flex items-center">
        <div className="relative mr-2">
          <Icon name="Radio" size={16} className="text-primary-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full animate-pulse-custom"></span>
        </div>
        <span className="text-sm font-medium text-primary-700">AI is responding...</span>
      </div>
      {streamProgress > 0 && (
        <div className="text-xs text-primary-600">
          {Math.round(streamProgress * 100)}% complete
        </div>
      )}
    </div>
  );
};

export default StreamingIndicator;