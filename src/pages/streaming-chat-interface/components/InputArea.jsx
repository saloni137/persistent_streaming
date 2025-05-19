import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const InputArea = ({ 
  onSendMessage, 
  isStreaming = false,
  disabled = false
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isStreaming) {
      onSendMessage(message.trim());
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-white py-3 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isStreaming ? "Wait for AI to finish responding..." : "Type your message..."}
            disabled={disabled || isStreaming}
            className="w-full border border-border rounded-lg py-3 px-4 pr-12 resize-none min-h-[44px] max-h-[150px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:bg-surface disabled:text-text-tertiary"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!message.trim() || disabled || isStreaming}
            className="absolute right-2 bottom-2 p-2 rounded-md text-primary-500 hover:bg-primary-50 disabled:text-text-tertiary disabled:hover:bg-transparent"
            aria-label="Send message"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-2 text-xs text-text-tertiary px-1">
          <div className="flex items-center">
            <Icon name="Info" size={12} className="mr-1" />
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
          
          {isStreaming && (
            <div className="flex items-center text-primary-500">
              <Icon name="Radio" size={12} className="mr-1 animate-pulse" />
              <span>AI is responding...</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputArea;