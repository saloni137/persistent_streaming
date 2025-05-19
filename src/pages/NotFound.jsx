import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-500 mb-4">
            <Icon name="FileQuestion" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Page Not Found</h1>
          <p className="text-text-secondary mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/"
            className="btn btn-primary px-4 py-2"
          >
            <Icon name="Home" size={18} className="mr-2" />
            Go Home
          </Link>
          <Link 
            to="/streaming-chat-interface"
            className="btn btn-secondary px-4 py-2"
          >
            <Icon name="MessageSquare" size={18} className="mr-2" />
            Chat Interface
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;