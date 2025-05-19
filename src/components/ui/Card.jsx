import React from 'react';
import Icon from '../../components/AppIcon';

const Card = ({
  children,
  variant = 'default',
  title,
  subtitle,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  // Base classes for all card variants
  const baseClasses = 'card rounded-lg border border-border bg-white shadow-sm';
  
  // Variant specific classes
  const variantClasses = {
    default: 'p-6',
    interactive: 'p-6 hover:shadow-md transition-shadow cursor-pointer',
    streaming: 'p-6 border-l-4 border-l-processing-500 animate-pulse-custom',
    completed: 'p-6 border-l-4 border-l-success',
    error: 'p-6 border-l-4 border-l-error',
  };
  
  // Status indicator for streaming, completed, and error variants
  const StatusIndicator = () => {
    if (variant === 'streaming') {
      return (
        <div className="flex items-center text-processing-500 mb-4">
          <Icon name="Activity" className="mr-2" size={20} />
          <span className="text-sm font-medium">Streaming</span>
        </div>
      );
    } else if (variant === 'completed') {
      return (
        <div className="flex items-center text-success mb-4">
          <Icon name="CheckCircle" className="mr-2" size={20} />
          <span className="text-sm font-medium">Completed</span>
        </div>
      );
    } else if (variant === 'error') {
      return (
        <div className="flex items-center text-error mb-4">
          <Icon name="AlertTriangle" className="mr-2" size={20} />
          <span className="text-sm font-medium">Error</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
      onClick={variant === 'interactive' ? onClick : undefined}
      role={variant === 'interactive' ? 'button' : undefined}
      tabIndex={variant === 'interactive' ? 0 : undefined}
      onKeyDown={variant === 'interactive' ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(e);
        }
      } : undefined}
      {...props}
    >
      <StatusIndicator />
      
      {(title || icon) && (
        <div className="flex items-center mb-4">
          {icon && (
            <div className="mr-3 text-primary-500">
              <Icon name={icon} size={24} />
            </div>
          )}
          <div>
            {title && <h3 className="text-xl font-medium text-text-primary">{title}</h3>}
            {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className={`${(title || icon) ? 'mt-4' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;