import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/ui/Header";
import MessageContainer from "./components/MessageContainer";
import InputArea from "./components/InputArea";
import Icon from "../../components/AppIcon";

// Mock implementation of Vercel AI SDK functions
const mockStreamingResponse = (prompt, options = {}) => {
  return new Promise((resolve) => {
    const { onStartStreaming, onStream, onFinish, streamDelay = 50 } = options;
    
    // Sample AI responses based on user input
    const responses = {
      default: "I\'m an AI assistant. I can help answer questions, provide information, or just chat. What would you like to talk about today?",
      hello: "Hello! How can I assist you today? I\'m here to help with any questions or tasks you might have.",
      help: "I can help with a variety of tasks including answering questions, providing information, generating content, and more. Just let me know what you need!",
      features: "This chat interface includes several features:\n- Persistent streaming that resumes after page reload\n- Real-time message updates\n- Session state management\n- Error handling with reconnection\n- Responsive design for all devices",
      weather: "I don\'t have access to real-time weather data, but I can tell you that weather forecasts typically include temperature, precipitation chances, wind speed, and humidity levels. Would you like me to explain how weather forecasting works?",
    };
    
    // Select response based on prompt keywords
    let responseText = responses.default;
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes("hello") || promptLower.includes("hi")) {
      responseText = responses.hello;
    } else if (promptLower.includes("help") || promptLower.includes("assist")) {
      responseText = responses.help;
    } else if (promptLower.includes("feature") || promptLower.includes("capability")) {
      responseText = responses.features;
    } else if (promptLower.includes("weather")) {
      responseText = responses.weather;
    }
    
    // Start streaming
    if (onStartStreaming) {
      onStartStreaming();
    }
    
    // Stream the response character by character
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < responseText.length) {
        const chunk = responseText.charAt(currentIndex);
        if (onStream) {
          onStream(chunk, currentIndex / responseText.length);
        }
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        if (onFinish) {
          onFinish(responseText);
        }
        resolve(responseText);
      }
    }, streamDelay);
  });
};

// Mock implementation of resumeStream function
const mockResumeStream = (sessionId, streamPosition, options = {}) => {
  return new Promise((resolve) => {
    const { onStartStreaming, onStream, onFinish } = options;
    
    // Get the stored session data
    const sessionData = JSON.parse(localStorage.getItem(`chat-session-${sessionId}`));
    if (!sessionData || !sessionData.currentResponse) {
      if (onFinish) onFinish("");
      resolve("");
      return;
    }
    
    const fullResponse = sessionData.currentResponse;
    const remainingText = fullResponse.substring(streamPosition);
    
    // Start streaming
    if (onStartStreaming) {
      onStartStreaming();
    }
    
    // Stream the remaining response
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < remainingText.length) {
        const chunk = remainingText.charAt(currentIndex);
        if (onStream) {
          const overallProgress = (streamPosition + currentIndex) / fullResponse.length;
          onStream(chunk, overallProgress);
        }
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        if (onFinish) {
          onFinish(fullResponse);
        }
        resolve(fullResponse);
      }
    }, 50);
  });
};

const StreamingChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [streamPosition, setStreamPosition] = useState(0);
  const [streamProgress, setStreamProgress] = useState(0);
  const [currentAiMessageId, setCurrentAiMessageId] = useState(null);
  
  // Initialize session or recover existing session
  useEffect(() => {
    const initSession = () => {
      // Check for existing session
      const storedSessionId = localStorage.getItem("current-session-id");
      
      if (storedSessionId) {
        // Recover existing session
        const sessionData = JSON.parse(localStorage.getItem(`chat-session-${storedSessionId}`));
        if (sessionData) {
          setSessionId(storedSessionId);
          setMessages(sessionData.messages || []);
          
          // Check if there was an ongoing stream
          if (sessionData.isStreaming && sessionData.currentAiMessageId) {
            setCurrentAiMessageId(sessionData.currentAiMessageId);
            setStreamPosition(sessionData.streamPosition || 0);
            
            // Resume streaming after a short delay
            setTimeout(() => {
              resumeStreamingFromLastPosition(
                storedSessionId, 
                sessionData.currentAiMessageId,
                sessionData.streamPosition || 0
              );
            }, 1000);
          }
        } else {
          // Create new session if data is corrupted
          createNewSession();
        }
      } else {
        // Create new session
        createNewSession();
      }
    };
    
    initSession();
    
    // Add event listeners for page visibility and beforeunload
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", saveSessionState);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", saveSessionState);
    };
  }, []);
  
  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setMessages([]);
    localStorage.setItem("current-session-id", newSessionId);
    localStorage.setItem(`chat-session-${newSessionId}`, JSON.stringify({
      messages: [],
      isStreaming: false,
      streamPosition: 0,
      currentAiMessageId: null,
      currentResponse: null,
      lastUpdated: new Date().toISOString()
    }));
  };
  
  // Save current session state
  const saveSessionState = useCallback(() => {
    if (sessionId) {
      localStorage.setItem(`chat-session-${sessionId}`, JSON.stringify({
        messages,
        isStreaming,
        streamPosition,
        currentAiMessageId,
        currentResponse: isStreaming ? 
          messages.find(m => m.id === currentAiMessageId)?.content : null,
        lastUpdated: new Date().toISOString()
      }));
    }
  }, [sessionId, messages, isStreaming, streamPosition, currentAiMessageId]);
  
  // Handle page visibility changes
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      // Save state when page is hidden
      saveSessionState();
    } else if (document.visibilityState === "visible" && !isConnected) {
      // Try to reconnect when page becomes visible again
      setIsConnected(true);
      
      // Resume streaming if needed
      if (isStreaming && currentAiMessageId) {
        resumeStreamingFromLastPosition(sessionId, currentAiMessageId, streamPosition);
      }
    }
  };
  
  // Resume streaming from last position
  const resumeStreamingFromLastPosition = (sid, messageId, position) => {
    setIsStreaming(true);
    
    mockResumeStream(sid, position, {
      onStartStreaming: () => {
        setIsStreaming(true);
      },
      onStream: (chunk, progress) => {
        setStreamProgress(progress);
        setStreamPosition(position + progress * (messages.find(m => m.id === messageId)?.content.length || 0));
        
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === messageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      },
      onFinish: (fullResponse) => {
        setIsStreaming(false);
        setStreamPosition(0);
        setCurrentAiMessageId(null);
        
        // Update session storage
        const updatedSession = {
          messages: messages.map(msg => 
            msg.id === messageId
              ? { ...msg, content: fullResponse }
              : msg
          ),
          isStreaming: false,
          streamPosition: 0,
          currentAiMessageId: null,
          currentResponse: null,
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(`chat-session-${sid}`, JSON.stringify(updatedSession));
      }
    });
  };
  
  // Handle sending a new message
  const handleSendMessage = async (content) => {
    if (!content.trim() || isStreaming) return;
    
    // Create user message
    const userMessageId = uuidv4();
    const userMessage = {
      id: userMessageId,
      content,
      sender: "user",
      timestamp: new Date()
    };
    
    // Create empty AI message
    const aiMessageId = uuidv4();
    const aiMessage = {
      id: aiMessageId,
      content: "",
      sender: "ai",
      timestamp: new Date()
    };
    
    // Update messages state
    setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
    setCurrentAiMessageId(aiMessageId);
    
    // Save to session storage
    const updatedMessages = [...messages, userMessage, aiMessage];
    localStorage.setItem(`chat-session-${sessionId}`, JSON.stringify({
      messages: updatedMessages,
      isStreaming: true,
      streamPosition: 0,
      currentAiMessageId: aiMessageId,
      currentResponse: "",
      lastUpdated: new Date().toISOString()
    }));
    
    // Start streaming AI response
    try {
      await mockStreamingResponse(content, {
        onStartStreaming: () => {
          setIsStreaming(true);
          setStreamPosition(0);
        },
        onStream: (chunk, progress) => {
          setStreamProgress(progress);
          setStreamPosition(progress * aiMessage.content.length);
          
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === aiMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        onFinish: (fullResponse) => {
          setIsStreaming(false);
          setStreamPosition(0);
          setCurrentAiMessageId(null);
          
          // Update final message and session storage
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === aiMessageId
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
          
          // Save completed conversation to storage
          const finalMessages = messages.map(msg => 
            msg.id === aiMessageId
              ? { ...msg, content: fullResponse }
              : msg
          );
          
          localStorage.setItem(`chat-session-${sessionId}`, JSON.stringify({
            messages: finalMessages,
            isStreaming: false,
            streamPosition: 0,
            currentAiMessageId: null,
            currentResponse: null,
            lastUpdated: new Date().toISOString()
          }));
        }
      });
    } catch (error) {
      console.error("Streaming error:", error);
      setIsConnected(false);
      setIsStreaming(false);
    }
  };
  
  // Handle retry after connection loss
  const handleRetryConnection = () => {
    setIsConnected(true);
    
    // If there was an ongoing stream, resume it
    if (currentAiMessageId) {
      resumeStreamingFromLastPosition(sessionId, currentAiMessageId, streamPosition);
    }
  };
  
  // Handle starting a new session
  const handleNewSession = () => {
    if (isStreaming) {
      // Confirm before discarding current session
      if (window.confirm("This will end your current conversation. Continue?")) {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <Header variant="default" />
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden" id="main-content">
        {/* Session info bar */}
        <div className="bg-surface border-b border-border px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center text-text-secondary mr-4">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              <span className="text-sm font-medium">Session ID: {sessionId.substring(0, 8)}...</span>
            </div>
            
            {isConnected ? (
              <div className="flex items-center text-success text-sm">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center text-error text-sm">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                <span>Disconnected</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleNewSession}
              className="text-sm text-primary-500 hover:text-primary-700 flex items-center"
            >
              <Icon name="Plus" size={14} className="mr-1" />
              New Chat
            </button>
            
            <div className="flex items-center space-x-2">
              <Link
                to="/session-recovery-dialog"
                className="text-sm text-text-secondary hover:text-text-primary flex items-center"
              >
                <Icon name="History" size={14} className="mr-1" />
                Recovery
              </Link>
              
              <Link
                to="/error-recovery-screen"
                className="text-sm text-text-secondary hover:text-text-primary flex items-center"
              >
                <Icon name="AlertTriangle" size={14} className="mr-1" />
                Error
              </Link>
            </div>
          </div>
        </div>
        
        {/* Messages container */}
        <MessageContainer 
          messages={messages}
          isStreaming={isStreaming}
          isConnected={isConnected}
          streamProgress={streamProgress}
          onRetry={handleRetryConnection}
        />
        
        {/* Input area */}
        <InputArea 
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          disabled={!isConnected}
        />
      </main>
    </div>
  );
};

export default StreamingChatInterface;