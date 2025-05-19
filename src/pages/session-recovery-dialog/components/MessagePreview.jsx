import React from "react";
import Icon from "../../../components/AppIcon";

const MessagePreview = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center text-text-tertiary py-4">
        <Icon name="MessageSquare" className="mx-auto mb-2" />
        <p>No previous messages found</p>
      </div>
    );
  }

  // Get the last user message and assistant response
  const lastMessages = messages.slice(-2);

  return (
    <div className="space-y-3">
      {lastMessages.map((message) => (
        <div key={message.id} className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.role === "user" ?"bg-primary-100 text-primary-600" :"bg-processing-100 text-processing-600"
          }`}>
            <Icon 
              name={message.role === "user" ? "User" : "Bot"} 
              size={16} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary mb-0.5">
              {message.role === "user" ? "You" : "Assistant"}
            </p>
            <p className="text-sm text-text-secondary line-clamp-2">
              {message.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagePreview;