import React from "react";

const StatusIndicator = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-success";
      case "reconnecting":
        return "bg-warning";
      case "offline":
        return "bg-error";
      default:
        return "bg-text-tertiary";
    }
  };

  return (
    <div className="flex items-center">
      <div
        className={`h-2.5 w-2.5 rounded-full ${getStatusColor()} mr-2`}
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default StatusIndicator;