import React from "react";
import Icon from "../../../components/AppIcon";

const TechnicalDetails = ({ isExpanded, setIsExpanded, errorDetails }) => {
  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full text-text-secondary hover:text-text-primary transition-colors"
        aria-expanded={isExpanded}
        aria-controls="technical-details"
      >
        <span className="text-sm mr-1">
          {isExpanded ? "Hide" : "Show"} Technical Details
        </span>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      
      {isExpanded && (
        <div 
          id="technical-details"
          className="mt-4 p-4 bg-surface rounded-md border border-border font-mono text-xs animate-fade-in"
        >
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <span className="text-text-tertiary w-24">Error:</span>
              <span className="text-text-primary">{errorDetails.code}</span>
            </div>
            <div className="flex">
              <span className="text-text-tertiary w-24">Timestamp:</span>
              <span className="text-text-primary">{errorDetails.timestamp}</span>
            </div>
            <div className="flex">
              <span className="text-text-tertiary w-24">Request ID:</span>
              <span className="text-text-primary">{errorDetails.requestId}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-tertiary mb-1">Details:</span>
              <p className="text-text-secondary whitespace-pre-wrap">
                {errorDetails.additionalInfo}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex items-center text-info">
                <Icon name="Info" size={14} className="mr-1" />
                <span>This information may help when reporting the issue.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalDetails;