import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';

const SideBar = ({
  variant = 'expanded',
  onToggle,
  className = '',
  ...props
}) => {
  const location = useLocation();
  const [sessionHistory, setSessionHistory] = useState([
    { id: 1, title: 'Data Analysis Session', timestamp: '2 hours ago', status: 'completed' },
    { id: 2, title: 'Image Generation', timestamp: '3 hours ago', status: 'error' },
    { id: 3, title: 'Text Summarization', timestamp: 'Yesterday', status: 'completed' },
    { id: 4, title: 'Code Completion', timestamp: 'Yesterday', status: 'completed' },
    { id: 5, title: 'Current Session', timestamp: 'Just now', status: 'streaming' },
  ]);
  
  // Navigation items
  const navigationItems = [
    { name: 'Streaming Chat', path: '/streaming-chat-interface', icon: 'MessageSquare' },
    { name: 'Session Recovery', path: '/session-recovery-dialog', icon: 'History' },
    { name: 'Connection Status', path: '/connection-status-bar', icon: 'Activity' },
    { name: 'Error Recovery', path: '/error-recovery-screen', icon: 'AlertTriangle' },
  ];
  
  // Check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Handle session click
  const handleSessionClick = (sessionId) => {
    // In a real app, this would load the selected session
    console.log(`Loading session ${sessionId}`);
  };
  
  // Base classes for sidebar
  const baseClasses = 'bg-white border-r border-border h-screen flex flex-col transition-all duration-300 ease-in-out';
  
  // Variant specific classes
  const variantClasses = {
    expanded: 'w-64',
    collapsed: 'w-20',
    mobile: 'w-full md:w-64',
  };
  
  // Status icon mapping
  const statusIcons = {
    completed: { name: 'CheckCircle', className: 'text-success' },
    error: { name: 'AlertTriangle', className: 'text-error' },
    streaming: { name: 'Activity', className: 'text-processing-500 animate-pulse-custom' },
  };

  return (
    <aside 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.expanded} ${className}`}
      aria-label="Sidebar"
      {...props}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {variant !== 'collapsed' && (
          <h2 className="text-lg font-semibold text-text-primary">Sessions</h2>
        )}
        
        <Button
          variant="tertiary"
          icon={variant === 'expanded' || variant === 'mobile' ? 'ChevronsLeft' : 'ChevronsRight'}
          onClick={onToggle}
          aria-label={variant === 'expanded' || variant === 'mobile' ? 'Collapse sidebar' : 'Expand sidebar'}
          className={variant === 'collapsed' ? 'mx-auto' : ''}
        />
      </div>
      
      {/* Navigation Section */}
      <nav className="p-2 border-b border-border">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 my-1 rounded-md ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <Icon name={item.icon} size={20} className={variant === 'collapsed' ? 'mx-auto' : 'mr-3'} />
                {variant !== 'collapsed' && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Session Controls */}
      <div className="p-4 border-b border-border">
        {variant !== 'collapsed' && (
          <h3 className="text-sm font-medium text-text-secondary mb-3">Session Controls</h3>
        )}
        
        <div className={`flex ${variant === 'collapsed' ? 'flex-col items-center space-y-2' : 'space-x-2'}`}>
          <Button
            variant="primary"
            icon="Play"
            aria-label="Start session"
            className={variant === 'collapsed' ? 'w-10 h-10 p-0 flex items-center justify-center' : ''}
          >
            {variant !== 'collapsed' && 'Start'}
          </Button>
          
          <Button
            variant="secondary"
            icon="Pause"
            aria-label="Pause session"
            className={variant === 'collapsed' ? 'w-10 h-10 p-0 flex items-center justify-center' : ''}
          >
            {variant !== 'collapsed' && 'Pause'}
          </Button>
          
          <Button
            variant="danger"
            icon="Square"
            aria-label="Stop session"
            className={variant === 'collapsed' ? 'w-10 h-10 p-0 flex items-center justify-center' : ''}
          >
            {variant !== 'collapsed' && 'Stop'}
          </Button>
        </div>
      </div>
      
      {/* Session History */}
      <div className="flex-1 overflow-y-auto p-4">
        {variant !== 'collapsed' && (
          <h3 className="text-sm font-medium text-text-secondary mb-3">Session History</h3>
        )}
        
        <ul className="space-y-2">
          {sessionHistory.map((session) => (
            <li key={session.id}>
              <button
                onClick={() => handleSessionClick(session.id)}
                className={`w-full text-left rounded-md hover:bg-surface p-2 ${
                  variant === 'collapsed' ? 'flex justify-center' : 'flex items-start'
                }`}
              >
                <Icon 
                  name={statusIcons[session.status].name} 
                  size={variant === 'collapsed' ? 20 : 16} 
                  className={`${statusIcons[session.status].className} ${variant === 'collapsed' ? '' : 'mt-0.5 mr-2 flex-shrink-0'}`} 
                />
                
                {variant !== 'collapsed' && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {session.timestamp}
                    </p>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
        
        {variant === 'collapsed' && sessionHistory.length > 5 && (
          <div className="text-center mt-4">
            <Button
              variant="tertiary"
              icon="MoreHorizontal"
              aria-label="Show more sessions"
              onClick={onToggle}
            />
          </div>
        )}
      </div>
      
      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className={`flex ${variant === 'collapsed' ? 'justify-center' : 'items-center'}`}>
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 flex-shrink-0">
            <Icon name="User" size={16} />
          </div>
          
          {variant !== 'collapsed' && (
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-text-primary">User Name</p>
              <p className="text-xs text-text-tertiary">user@example.com</p>
            </div>
          )}
          
          {variant !== 'collapsed' && (
            <Button
              variant="tertiary"
              icon="LogOut"
              aria-label="Sign out"
              size="sm"
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;