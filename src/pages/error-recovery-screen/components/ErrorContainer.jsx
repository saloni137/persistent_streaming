import React from "react";
import Icon from "../../../components/AppIcon";

const ErrorContainer = ({ errorMessage, errorCode, children }) => {
  return (
    <div className="bg-white bg-opacity-95 rounded-xl shadow-xl border border-border p-8 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-error bg-opacity-10 flex items-center justify-center">
          <Icon name="AlertOctagon" size={32} className="text-error" />
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold text-text-primary text-center mb-2">
        Connection Error
      </h1>
      
      <div className="text-center mb-4">
        <p className="text-text-secondary mb-1">{errorMessage}</p>
        <p className="text-sm text-text-tertiary">Error Code: {errorCode}</p>
      </div>
      
      <div className="border-t border-border my-6"></div>
      
      {children}
    </div>
  );
};

export default ErrorContainer;