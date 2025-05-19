import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import StreamingIndicator from "./StreamingIndicator";

const MessageContainer = ({ 
  messages, 
  isStreaming, 
  isConnected,
  streamProgress,
  onRetry
}) => {
  const containerRef = useRef(null);

  // Auto-scroll to bottom when messages change or streaming status changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Empty state when no messages
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center bg-surface">
        <div className="text-center max-w-md p-6 rounded-lg bg-white border border-border">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-500">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Start a conversation</h3>
          <p className="text-text-secondary mb-4">
            Send a message to begin chatting with the AI assistant. Your conversation will be saved automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 bg-surface"
      id="message-container"
    >
      <div className="max-w-4xl mx-auto">
        {/* Connection status indicator */}
        {!isConnected && (
          <div className="mb-4 sticky top-0 z-10">
            <StreamingIndicator 
              isConnected={isConnected} 
              onRetry={onRetry} 
            />
          </div>
        )}
        
        {/* Messages */}
        {messages.map((message, index) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isStreaming={isStreaming && index === messages.length - 1 && message.sender === "ai"}
            isLastMessage={index === messages.length - 1}
          />
        ))}
        
        {/* Streaming indicator */}
        {isStreaming && isConnected && (
          <div className="mt-2 mb-4">
            <StreamingIndicator 
              isStreaming={isStreaming} 
              isConnected={isConnected}
              streamProgress={streamProgress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;