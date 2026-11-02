import React from 'react';
import { ButtonType } from '../types/calculator';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  title?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  type = 'number',
  className = '',
  disabled = false,
  isActive = false,
  title = '',
}) => {
  const getButtonStyles = (): string => {
    // Changed h-16 to h-14 (mobile) and sm:h-16 (desktop). Reduced border thickness.
    const baseStyles = 'flex items-center justify-center font-bold rounded-xl sm:rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xl sm:text-2xl h-14 sm:h-16 w-full ';
    
    const typeStyles: Record<ButtonType, string> = {
      number: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm',
      operator: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md',
      function: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
      memory: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm text-sm sm:text-base',
      equals: 'bg-green-600 hover:bg-green-700 text-white shadow-md',
      clear: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
      decimal: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm',
      backspace: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md',
      special: 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm',
    };

    const activeStyle = isActive ? 'ring-2 ring-blue-400 ring-offset-2 transform scale-95' : '';
    
    return `${baseStyles} ${typeStyles[type]} ${activeStyle} ${className}`;
  };

  return (
    <button
      onClick={onClick}
      className={getButtonStyles()}
      disabled={disabled}
      title={title}
    >
      <span className="font-bold">{label}</span>
    </button>
  );
};

export default CalculatorButton;