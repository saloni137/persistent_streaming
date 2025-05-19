import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import SessionRecoveryModal from "./components/SessionRecoveryModal";
import MessagePreview from "./components/MessagePreview";
import ActionButtons from "./components/ActionButtons";

const SessionRecoveryDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [previousSession, setPreviousSession] = useState(null);
  const navigate = useNavigate();

  // Mock session data that would normally be retrieved from localStorage
  useEffect(() => {
    const mockPreviousSession = {
      messages: [
        {
          id: "msg-1",
          role: "user",
          content: "Can you explain how streaming works in Next.js with Vercel AI SDK?",
          timestamp: new Date(Date.now() - 120000).toISOString(),
        },
        {
          id: "msg-2",
          role: "assistant",
          content: "Certainly! The Vercel AI SDK provides a streamlined way to implement AI streaming in Next.js applications. It handles the complexities of server-sent events and provides a simple API for creating persistent streaming connections...",
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
      ],
      positionToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbiI6MTI0LCJzZXNzaW9uSWQiOiJhYmMxMjMifQ",
      lastActive: new Date(Date.now() - 300000).toISOString(),
    };

    setPreviousSession(mockPreviousSession);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleResume();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Enter") {
        handleResume();
      } else if (e.key === "Escape") {
        handleStartNew();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleResume = useCallback(() => {
    // In a real implementation, this would:
    // 1. Load the previous session state from localStorage
    // 2. Call the resumeStream API with the stored position token
    console.log("Resuming previous session with token:", previousSession?.positionToken);
    
    setIsOpen(false);
    navigate("/streaming-chat-interface", { 
      state: { 
        resumedSession: true,
        positionToken: previousSession?.positionToken 
      } 
    });
  }, [navigate, previousSession]);

  const handleStartNew = useCallback(() => {
    // In a real implementation, this would clear previous session data
    console.log("Starting new session, clearing previous data");
    
    // Clear localStorage session data
    // localStorage.removeItem("streamingSession");
    
    setIsOpen(false);
    navigate("/streaming-chat-interface");
  }, [navigate]);

  if (!previousSession) {
    return null; // Don't show dialog if there's no previous session
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-opacity-50">
      <SessionRecoveryModal 
        isOpen={isOpen} 
        timeLeft={timeLeft}
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Icon name="History" size={24} className="text-primary-600" />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center text-text-primary mb-2">
            Resume Previous Conversation?
          </h2>
          
          <p className="text-text-secondary text-center mb-6">
            We detected an interrupted conversation. Would you like to resume where you left off?
          </p>
          
          <div className="bg-surface rounded-lg p-4 mb-6">
            <MessagePreview messages={previousSession.messages} />
          </div>
          
          <ActionButtons 
            onResume={handleResume} 
            onStartNew={handleStartNew} 
            timeLeft={timeLeft}
          />
          
          <div className="mt-4 text-center text-sm text-text-tertiary">
            <p>Press <span className="font-medium">Enter</span> to resume or <span className="font-medium">Esc</span> to start new</p>
          </div>
        </div>
      </SessionRecoveryModal>
    </div>
  );
};

export default SessionRecoveryDialog;