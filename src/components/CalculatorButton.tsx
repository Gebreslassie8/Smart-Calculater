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
    const baseStyles = 'flex items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg h-16 ';
    
    const typeStyles: Record<ButtonType, string> = {
      number: 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg',
      operator: 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-2 border-purple-400 shadow-lg hover:shadow-xl',
      function: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-blue-400 shadow-lg hover:shadow-xl',
      memory: 'bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-2 border-cyan-400 shadow-md hover:shadow-lg text-sm font-semibold',
      equals: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-2 border-green-400 shadow-lg hover:shadow-xl',
      clear: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-2 border-red-400 shadow-lg hover:shadow-xl',
      decimal: 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg',
      backspace: 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-2 border-amber-400 shadow-lg hover:shadow-xl',
      special: 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-2 border-gray-400 shadow-md hover:shadow-lg',
    };

    const activeStyle = isActive ? 'ring-4 ring-blue-300 ring-opacity-50 transform scale-105' : '';
    
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