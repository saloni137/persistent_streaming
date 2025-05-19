import React from "react";
import Icon from "../../../components/AppIcon";

const MessageBubble = ({ 
  message, 
  isStreaming = false,
  isLastMessage = false
}) => {
  const isAI = message.sender === "ai";
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}
      id={isLastMessage ? "last-message" : undefined}
    >
      <div 
        className={`flex max-w-[85%] md:max-w-[70%] ${isAI ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isAI ? "mr-3" : "ml-3"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAI ? "bg-primary-100 text-primary-600" : "bg-surface text-text-secondary"
          }`}>
            <Icon name={isAI ? "Bot" : "User"} size={16} />
          </div>
        </div>

        {/* Message content */}
        <div>
          <div className={`rounded-lg px-4 py-3 ${
            isAI 
              ? "bg-surface border border-border" :"bg-primary-500 text-white"
          }`}>
            <div className="text-sm font-medium mb-1">
              {isAI ? "AI Assistant" : "You"}
            </div>
            <div className={`whitespace-pre-wrap ${isAI ? "text-text-primary" : ""}`}>
              {message.content}
              {isStreaming && isAI && isLastMessage && (
                <span className="inline-block w-2 h-4 ml-1 bg-primary-500 animate-pulse-custom"></span>
              )}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-text-tertiary mt-1 ${isAI ? "text-left" : "text-right"}`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;