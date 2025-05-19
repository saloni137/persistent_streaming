import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import StreamingChatInterface from "./pages/streaming-chat-interface";
import ErrorRecoveryScreen from "./pages/error-recovery-screen";
import SessionRecoveryDialog from "./pages/session-recovery-dialog";
import ConnectionStatusBar from "./pages/connection-status-bar";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<StreamingChatInterface />} />
          <Route path="/streaming-chat-interface" element={<StreamingChatInterface />} />
          <Route path="/error-recovery-screen" element={<ErrorRecoveryScreen />} />
          <Route path="/session-recovery-dialog" element={<SessionRecoveryDialog />} />
          <Route path="/connection-status-bar" element={<ConnectionStatusBar />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;