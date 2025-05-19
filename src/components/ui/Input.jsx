import React, { forwardRef } from 'react';
import Icon from '../../components/AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  readOnly = false,
  error,
  icon,
  iconPosition = 'left',
  variant = 'default',
  className = '',
  required = false,
  id,
  name,
  ...props
}, ref) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Determine input classes based on variant and error state
  const getInputClasses = () => {
    const baseClasses = 'input-base block w-full rounded-md border bg-white px-3 py-2 text-text-primary shadow-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    // Variant specific classes
    const variantClasses = {
      default: error 
        ? 'border-error focus:border-error focus:ring-error' :'border-border focus:border-primary-500 focus:ring-primary-500',
      search: 'pl-10 border-border focus:border-primary-500 focus:ring-primary-500',
    };
    
    // Icon padding
    const iconClasses = icon && iconPosition === 'left' && variant !== 'search' 
      ? 'pl-10' 
      : icon && iconPosition === 'right' ?'pr-10' :'';
    
    return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${iconClasses} ${className}`;
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        {(icon && iconPosition === 'left' || variant === 'search') && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon 
              name={variant === 'search' ? 'Search' : icon} 
              size={20} 
              className="text-text-tertiary" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          className={getInputClasses()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        
        {icon && iconPosition === 'right' && variant !== 'search' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon name={icon} size={20} className="text-text-tertiary" />
          </div>
        )}
        
        {error && variant === 'default' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon name="AlertCircle" size={20} className="text-error" />
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;