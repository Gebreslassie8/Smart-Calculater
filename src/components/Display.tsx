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
    
    // Add thousands separators for better readability
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

  const getStatusColor = (type: string) => {
    if (isDarkMode) {
      return {
        sci: 'bg-blue-500 text-white',
        angle: 'bg-purple-500 text-white',
        format: 'bg-green-500 text-white',
        memory: 'text-green-400'
      }[type];
    } else {
      return {
        sci: 'bg-blue-100 text-blue-800 border border-blue-200',
        angle: 'bg-purple-100 text-purple-800 border border-purple-200',
        format: 'bg-green-100 text-green-800 border border-green-200',
        memory: 'text-green-600'
      }[type];
    }
  };

  return (
    <div className={`bg-gradient-to-br ${
      isDarkMode 
        ? 'from-slate-800 to-slate-900 border-slate-600 text-white' 
        : 'from-slate-700 to-slate-800 border-slate-500 text-white'
    } rounded-3xl p-8 shadow-2xl border-2 backdrop-blur-sm ${className}`}>
      
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          {isScientificMode && (
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${getStatusColor('sci')}`}>
              🔬 SCI
            </span>
          )}
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${getStatusColor('angle')}`}>
            {angleMode === 'DEG' ? '°' : angleMode === 'RAD' ? 'rad' : 'grad'} {angleMode}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${getStatusColor('format')}`}>
            {numberFormat === 'DEC' ? 'DEC' : numberFormat === 'HEX' ? 'HEX' : numberFormat === 'BIN' ? 'BIN' : 'OCT'}
          </span>
        </div>
        
        {getMemoryText() && (
          <div className={`font-mono text-sm font-semibold ${getStatusColor('memory')} bg-black/20 px-3 py-1.5 rounded-full`}>
            💾 {getMemoryText()}
          </div>
        )}
      </div>

      {/* Previous Operation */}
      <div className="text-right mb-4 min-h-[28px]">
        <span className={`text-lg font-light truncate ${
          isDarkMode ? 'text-gray-300' : 'text-gray-200'
        }`}>
          {previousInput} {operator && (
            <span className="mx-2 opacity-75">{operator}</span>
          )}
        </span>
      </div>

      {/* Current Input */}
      <div className={`text-right break-all min-h-[100px] flex items-end justify-end transition-colors duration-300 ${
        isError 
          ? 'text-red-400' 
          : isDarkMode 
            ? 'text-white' 
            : 'text-gray-50'
      }`}>
        <span className="text-5xl md:text-6xl font-mono font-bold leading-tight tracking-tight drop-shadow-lg">
          {formatDisplayNumber(currentInput)}
        </span>
      </div>

      {/* Memory Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {memory.map((mem, index) => (
          <div
            key={index}
            className={`flex flex-col items-center transition-all duration-300 ${
              index === memoryIndex ? 'scale-125' : 'scale-100'
            }`}
            title={`M${index + 1}: ${mem}`}
          >
            <div className={`w-3 h-3 rounded-full mb-1 transition-all ${
              mem !== 0 
                ? index === memoryIndex 
                  ? 'bg-green-400 ring-2 ring-green-200' 
                  : 'bg-green-500' 
                : isDarkMode 
                  ? 'bg-gray-600' 
                  : 'bg-gray-500'
            }`} />
            <span className={`text-xs font-mono ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              M{index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-600">
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
          {isScientificMode ? 'Scientific Mode' : 'Basic Mode'}
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
          {memory.filter(m => m !== 0).length} memory banks used
        </div>
      </div>
    </div>
  );
};

export default Display;