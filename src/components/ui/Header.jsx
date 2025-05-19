import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';

const Header = ({ 
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Navigation items
  const navigationItems = [
    { name: 'Streaming Chat', path: '/streaming-chat-interface', icon: 'MessageSquare' },
    { name: 'Session Recovery', path: '/session-recovery-dialog', icon: 'History' },
    { name: 'Connection Status', path: '/connection-status-bar', icon: 'Activity' },
    { name: 'Error Recovery', path: '/error-recovery-screen', icon: 'AlertTriangle' },
  ];
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Base classes for header
  const baseClasses = 'bg-white border-b border-border';
  
  // Variant specific classes
  const variantClasses = {
    default: 'py-4',
    compact: 'py-2',
  };

  return (
    <header 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-primary-500 mr-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 22V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10H16.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className={`font-semibold text-text-primary ${variant === 'compact' ? 'text-lg' : 'text-xl'}`}>
                  Streaming Platform
                </h1>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <div className="flex items-center">
                  <Icon name={item.icon} size={16} className="mr-2" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            
            <div className="ml-4">
              <Button 
                variant="primary" 
                size="sm"
                icon="Plus"
              >
                New Session
              </Button>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="tertiary"
              icon={isMobileMenuOpen ? "X" : "Menu"}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav 
            id="mobile-menu" 
            className="md:hidden mt-4 pb-3 space-y-1 animate-fade-in"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Icon name={item.icon} size={18} className="mr-2" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            
            <div className="mt-4 px-3">
              <Button 
                variant="primary" 
                icon="Plus"
                className="w-full justify-center"
              >
                New Session
              </Button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary-500"
      >
        Skip to main content
      </a>
    </header>
  );
};

export default Header;