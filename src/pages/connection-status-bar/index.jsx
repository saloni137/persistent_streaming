import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusIndicator from "./components/StatusIndicator";
import ConnectionLabel from "./components/ConnectionLabel";
import RefreshButton from "./components/RefreshButton";
import AnimatedStreamingIcon from "./components/AnimatedStreamingIcon";

const ConnectionStatusBar = () => {
  // Connection status states: "connected", "reconnecting", "offline"
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [isStreaming, setIsStreaming] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Mock function to simulate connection status changes
  const simulateConnectionChange = () => {
    const statuses = ["connected", "reconnecting", "offline"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setConnectionStatus(randomStatus);

    if (randomStatus === "reconnecting") {
      startRetryCountdown();
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setRetryCountdown(0);
    }

    // Randomly toggle streaming state
    setIsStreaming(Math.random() > 0.5);
  };

  // Start a countdown timer for reconnection attempts
  const startRetryCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    setRetryCountdown(5);
    const id = setInterval(() => {
      setRetryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
          // Simulate successful reconnection
          setConnectionStatus("connected");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  // Handle manual refresh
  const handleRefresh = () => {
    setConnectionStatus("reconnecting");
    startRetryCountdown();
  };

  // Simulate random connection status changes
  useEffect(() => {
    const changeInterval = setInterval(simulateConnectionChange, 10000);
    return () => clearInterval(changeInterval);
  }, []);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="relative">
      {/* Status Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[30px] bg-white border-b border-border z-50 flex items-center justify-between px-4 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center">
          <StatusIndicator status={connectionStatus} />
          <ConnectionLabel status={connectionStatus} nextRetry={retryCountdown} />
          <AnimatedStreamingIcon isStreaming={isStreaming} />
        </div>
        <div className="flex items-center">
          {connectionStatus === "offline" && <RefreshButton onClick={handleRefresh} />}
          <Link
            to="/error-recovery-screen"
            className="text-xs text-primary-500 ml-4 hover:underline"
          >
            View Error Recovery
          </Link>
        </div>
      </div>

      {/* Demo Content */}
      <div className="pt-[30px] p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Connection Status Bar Demo</h1>
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-medium text-text-primary mb-2">Current Status</h2>
            <div className="flex items-center mb-4">
              <StatusIndicator status={connectionStatus} />
              <span className="text-text-primary ml-2">
                Status: <strong>{connectionStatus}</strong>
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-text-primary mr-2">Streaming:</span>
              <span className={isStreaming ? "text-primary-500" : "text-text-tertiary"}>
                {isStreaming ? "Active" : "Inactive"}
              </span>
            </div>
            {connectionStatus === "reconnecting" && (
              <div className="text-warning">
                Attempting to reconnect in {retryCountdown} seconds...
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={simulateConnectionChange}
                className="btn btn-primary px-4 py-2"
              >
                Simulate Status Change
              </button>
              {connectionStatus === "offline" && (
                <button
                  onClick={handleRefresh}
                  className="btn btn-secondary px-4 py-2 ml-2"
                >
                  Manual Refresh
                </button>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-medium text-text-primary mb-2">About This Component</h2>
            <p className="text-text-secondary mb-3">
              This persistent status bar provides real-time feedback about your connection status.
              It shows:
            </p>
            <ul className="list-disc pl-5 text-text-secondary mb-4">
              <li>Connection state (Connected, Reconnecting, Offline)</li>
              <li>Active streaming indicator when content is being streamed</li>
              <li>Countdown timer for reconnection attempts</li>
              <li>Manual refresh option when offline</li>
            </ul>
            <p className="text-text-secondary">
              The status updates automatically based on your WebSocket connection to the Vercel AI SDK.
              For this demo, status changes are simulated randomly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatusBar;