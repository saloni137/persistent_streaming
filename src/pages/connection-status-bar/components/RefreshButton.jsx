import React from "react";
import Icon from "../../../components/AppIcon";

const RefreshButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-surface transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Refresh connection"
    >
      <Icon name="RefreshCw" size={14} className="text-text-primary" />
    </button>
  );
};

export default RefreshButton;