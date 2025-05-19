import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../components/AppIcon';

const Dropdown = ({
  options = [],
  selected,
  onChange,
  placeholder = 'Select an option',
  variant = 'default',
  label,
  error,
  disabled = false,
  className = '',
  withSearch = false,
  multiSelect = false,
  grouped = false,
  id,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Generate a unique ID if not provided
  const dropdownId = id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && withSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, withSearch]);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  // Handle option selection
  const handleSelect = (option) => {
    if (multiSelect) {
      const isSelected = Array.isArray(selected) && selected.some(item => item.value === option.value);
      const newSelected = isSelected
        ? selected.filter(item => item.value !== option.value)
        : [...(selected || []), option];
      
      onChange(newSelected);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };
  
  // Filter options based on search term
  const filteredOptions = withSearch && searchTerm
    ? grouped
      ? options.map(group => ({
          ...group,
          options: group.options.filter(option => 
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(group => group.options.length > 0)
      : options.filter(option => 
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : options;
  
  // Render selected value(s)
  const renderSelectedValue = () => {
    if (multiSelect && Array.isArray(selected) && selected.length > 0) {
      return (
        <div className="flex flex-wrap gap-1">
          {selected.map((item, index) => (
            <span 
              key={item.value} 
              className="inline-flex items-center bg-primary-100 text-primary-700 rounded px-2 py-0.5 text-sm"
            >
              {item.label}
              <button
                type="button"
                className="ml-1 text-primary-500 hover:text-primary-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
      );
    }
    
    if (selected) {
      return <span>{selected.label}</span>;
    }
    
    return <span className="text-text-tertiary">{placeholder}</span>;
  };
  
  // Render dropdown options
  const renderOptions = () => {
    if (grouped && Array.isArray(options) && options.length > 0 && options[0].options) {
      return filteredOptions.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`}>
          <div className="px-3 py-2 text-sm font-semibold text-text-secondary bg-surface">
            {group.label}
          </div>
          {group.options.map((option) => renderOption(option))}
        </div>
      ));
    }
    
    return filteredOptions.map((option) => renderOption(option));
  };
  
  // Render individual option
  const renderOption = (option) => {
    const isSelected = multiSelect
      ? Array.isArray(selected) && selected.some(item => item.value === option.value)
      : selected && selected.value === option.value;
    
    return (
      <div
        key={option.value}
        className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-surface ${
          isSelected ? 'bg-primary-50 text-primary-700' : 'text-text-primary'
        }`}
        onClick={() => handleSelect(option)}
        role="option"
        aria-selected={isSelected}
      >
        <span>{option.label}</span>
        {isSelected && <Icon name="Check" size={16} className="text-primary-500" />}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={dropdownId} 
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={dropdownId}
          className={`relative w-full rounded-md border ${
            error ? 'border-error' : 'border-border'
          } bg-white px-3 py-2 text-left shadow-sm ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          } flex items-center justify-between`}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          {...props}
        >
          <div className="flex-1 truncate">
            {renderSelectedValue()}
          </div>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-tertiary" 
          />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-border max-h-60 overflow-auto">
            {withSearch && (
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon name="Search" size={16} className="text-text-tertiary" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            
            <div role="listbox" className="py-1">
              {renderOptions()}
              
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-text-tertiary text-center">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;