import React from "react";

const ConnectionLabel = ({ status, nextRetry }) => {
  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "Connected";
      case "reconnecting":
        return `Reconnecting in ${nextRetry}s`;
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "connected":
        return "text-success";
      case "reconnecting":
        return "text-warning";
      case "offline":
        return "text-error";
      default:
        return "text-text-tertiary";
    }
  };

  return (
    <span className={`text-xs font-medium ${getStatusClass()}`} aria-live="polite">
      {getStatusText()}
    </span>
  );
};

export default ConnectionLabel;