import React from "react";
import Icon from "../../../components/AppIcon";

const AnimatedStreamingIcon = ({ isStreaming }) => {
  if (!isStreaming) return null;

  return (
    <div className="flex items-center ml-3" aria-hidden="true">
      <Icon
        name="Radio"
        size={14}
        className="text-primary-500 animate-pulse-custom"
      />
      <span className="text-xs font-medium text-primary-500 ml-1">Streaming</span>
    </div>
  );
};

export default AnimatedStreamingIcon;