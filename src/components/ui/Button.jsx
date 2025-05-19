import React from "react";
import Icon from "../AppIcon";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-2.5 text-lg",
  };

  // Base button classes
  const baseClasses = "btn rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center justify-center";
  
  // Variant specific classes
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
    danger: "btn-danger",
  };

  // Disabled state
  const disabledClass = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant] || ""} ${sizeClasses[size] || ""} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <Icon name="Loader" className="animate-spin" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
        </span>
      )}
      
      {icon && iconPosition === "left" && !isLoading && (
        <Icon name={icon} className="mr-2" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      )}
      
      {children}
      
      {icon && iconPosition === "right" && (
        <Icon name={icon} className="ml-2" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      )}
    </button>
  );
};

export default Button;