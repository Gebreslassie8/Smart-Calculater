import React from 'react';
import { AngleMode, NumberFormat } from '../types/calculator';

interface DisplayProps {
  currentInput: string;
  previousInput: string;
  operator: string | null;
  memory: number[];
  memoryIndex: number;
  angleMode: AngleMode;
  numberFormat: NumberFormat;
  isError: boolean;
  isScientificMode: boolean;
  className?: string;
  isDarkMode?: boolean;
}

const Display: React.FC<DisplayProps> = ({
  currentInput,
  previousInput,
  operator,
  memory,
  memoryIndex,
  angleMode,
  numberFormat,
  isError,
  isScientificMode,
  className = '',
  isDarkMode = false,
}) => {
  const formatDisplayNumber = (num: string): string => {
    if (isError) return num;
    
    if (numberFormat === 'DEC' && !num.includes('e')) {
      const parts = num.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    return num;
  };

  const getMemoryText = () => {
    const memValue = memory[memoryIndex];
    if (memValue === 0) return '';
    return `M${memoryIndex + 1}: ${memValue}`;
  };

  return (
    <div className={`bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl w-full ${className}`}>
      
      {/* Top Status Bar */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          {isScientificMode && (
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-blue-500 text-white">
              SCI
            </span>
          )}
          <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-purple-500 text-white">
            {angleMode}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-green-500 text-white">
            {numberFormat}
          </span>
        </div>
        
        {getMemoryText() && (
          <div className="font-mono text-[10px] sm:text-xs font-semibold text-green-400">
            {getMemoryText()}
          </div>
        )}
      </div>

      {/* Previous Operation */}
      <div className="text-right text-gray-400 min-h-[20px] text-sm sm:text-base font-mono truncate">
        {previousInput} {operator && <span className="mx-1">{operator}</span>}
      </div>

      {/* Current Input */}
      <div className={`text-right break-all flex items-end justify-end ${
        isError ? 'text-red-400' : 'text-white'
      }`}>
        {/* Changed text size for mobile */}
        <span className="text-3xl sm:text-5xl font-mono font-bold leading-tight tracking-tight drop-shadow-md">
          {formatDisplayNumber(currentInput)}
        </span>
      </div>

    </div>
  );
};

export default Display;