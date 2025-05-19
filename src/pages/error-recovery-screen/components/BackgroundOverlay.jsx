import React from "react";

const BackgroundOverlay = () => {
  return (
    <>
      {/* This would be a blurred version of the actual application UI */}
      <div className="fixed inset-0 bg-text-primary bg-opacity-50 backdrop-blur-sm z-0"></div>
      
      {/* Simulated chat interface in the background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <div className="h-16 border-b border-border bg-white"></div>
          <div className="flex-1 flex">
            <div className="w-64 border-r border-border bg-surface"></div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-auto p-4">
                {/* Simulated chat messages */}
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <div className="bg-surface rounded-lg p-4 mb-2 w-3/4"></div>
                    <div className="bg-surface rounded-lg p-4 w-2/3"></div>
                  </div>
                  <div className="mb-6 ml-auto">
                    <div className="bg-primary-100 rounded-lg p-4 mb-2 w-3/4"></div>
                    <div className="bg-primary-100 rounded-lg p-4 w-1/2"></div>
                  </div>
                  <div className="mb-6">
                    <div className="bg-surface rounded-lg p-4 mb-2 w-4/5"></div>
                    <div className="bg-surface rounded-lg p-4 w-3/5"></div>
                  </div>
                </div>
              </div>
              <div className="h-24 border-t border-border bg-white p-4">
                <div className="h-full bg-surface rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundOverlay;