import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import ErrorContainer from "./components/ErrorContainer";
import ActionButtons from "./components/ActionButtons";
import CountdownTimer from "./components/CountdownTimer";
import TechnicalDetails from "./components/TechnicalDetails";
import BackgroundOverlay from "./components/BackgroundOverlay";

const ErrorRecoveryScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    message: "Unable to connect to AI service",
    code: "ERR_CONNECTION_REFUSED",
    timestamp: new Date().toISOString(),
    requestId: "req_" + Math.random().toString(36).substring(2, 15),
    additionalInfo: "The application was unable to establish a connection with the AI service. This could be due to network issues, service outage, or server-side problems."
  });

  // Calculate backoff time based on retry count
  const calculateBackoffTime = useCallback(() => {
    const baseTime = 3;
    const backoffTime = baseTime * Math.pow(2, retryCount);
    return Math.min(backoffTime, 30); // Cap at 30 seconds
  }, [retryCount]);

  // Handle retry logic
  const handleRetry = useCallback(() => {
    setIsRetrying(true);
    const backoffTime = calculateBackoffTime();
    setCountdown(backoffTime);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRetrying(false);
          setRetryCount(prev => prev + 1);
          // Simulate retry attempt
          // In a real app, this would trigger the actual reconnection logic
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateBackoffTime, retryCount]);

  // Reset session
  const handleReset = () => {
    // Clear localStorage session data
    localStorage.removeItem("chatSession");
    localStorage.removeItem("lastPosition");
    
    // Reset retry count
    setRetryCount(0);
    
    // In a real app, this would redirect to a fresh session
    window.location.href = "/streaming-chat-interface";
  };

  // Report issue
  const handleReport = () => {
    // In a real app, this would open a form or send telemetry
    console.log("Reporting issue:", errorDetails);
    alert("Thank you for reporting this issue. Our team has been notified.");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      } else if (e.key === "r" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRetry();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRetry]);

  // Store last stable state on mount
  useEffect(() => {
    // Check if we already have a stored state
    if (!localStorage.getItem("lastStableState")) {
      // In a real app, this would store the actual application state
      localStorage.setItem("lastStableState", JSON.stringify({
        timestamp: new Date().toISOString(),
        conversationId: "conv_" + Math.random().toString(36).substring(2, 10)
      }));
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background overlay that shows the dimmed application behind */}
      <BackgroundOverlay />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto p-6">
        <ErrorContainer 
          errorMessage={errorDetails.message}
          errorCode={errorDetails.code}
        >
          <div className="mt-6 space-y-6">
            {isRetrying && (
              <CountdownTimer 
                seconds={countdown} 
                totalSeconds={calculateBackoffTime()}
              />
            )}
            
            <ActionButtons 
              onRetry={handleRetry}
              onReset={handleReset}
              onReport={handleReport}
              isRetrying={isRetrying}
            />
            
            <TechnicalDetails 
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              errorDetails={errorDetails}
            />
            
            <div className="mt-8 text-center">
              <Link 
                to="/streaming-chat-interface"
                className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Return to Chat Interface
              </Link>
            </div>
          </div>
        </ErrorContainer>
      </div>
    </div>
  );
};

export default ErrorRecoveryScreen;