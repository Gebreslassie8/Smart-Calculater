import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { AngleMode, NumberFormat } from '../types/calculator';
import { BASIC_BUTTONS, SCIENTIFIC_BUTTONS, MEMORY_BUTTONS } from '../constants/buttons';
import Display from './Display';
import CalculatorButton from './CalculatorButton';
import HistoryPanel from './HistoryPanel';
import SettingsPanel from './SettingsPanel';

const SmartCalculator: React.FC = () => {
  const {
    state,
    handleNumber,
    handleOperator,
    handleEquals,
    handleScientific,
    handleMemory,
    handleClear,
    handleClearEntry,
    handleBackspace,
    handleDecimal,
    handleNegate,
    toggleScientificMode,
    setAngleMode,
    setNumberFormat,
    clearHistory,
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'clear':
        handleClear();
        break;
      case 'clearEntry':
        handleClearEntry();
        break;
      case 'backspace':
        handleBackspace();
        break;
      case 'decimal':
        handleDecimal();
        break;
      case 'equals':
        handleEquals();
        break;
      case 'negate':
        handleNegate();
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
      case '%':
      case '^':
        handleOperator(action as any);
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case '√':
      case 'x²':
      case 'x³':
      case 'π':
      case 'e':
      case '1/x':
      case 'x!':
      case '10^x':
      case 'e^x':
      case 'abs':
      case 'exp':
      case 'mod':
        handleScientific(action as any);
        break;
      case 'MC':
      case 'MR':
      case 'M+':
      case 'M-':
      case 'MS':
      case 'M↓':
        handleMemory(action as any);
        break;
      default:
        if (/^\d$/.test(action)) {
          handleNumber(action);
        }
        break;
    }
  };

  const handleSelectHistory = (expression: string) => {
    console.log('Selected history:', expression);
    setIsHistoryOpen(false);
  };

  // Logo Component (Integrated directly)
  const CalculatorLogo = () => (
    <div className="flex items-center gap-4">
      {/* Logo Icon */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-2xl border-4 ${
          isDarkMode 
            ? 'border-blue-400 bg-gradient-to-br from-blue-600 to-purple-600' 
            : 'border-blue-500 bg-gradient-to-br from-blue-400 to-purple-500'
        } flex items-center justify-center shadow-2xl`}>
          {/* Calculator Screen */}
          <div className="w-10 h-3 bg-green-400 rounded-lg mb-1 shadow-inner"></div>
          
          {/* Plus Sign */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-1 bg-white rounded-full shadow-sm"></div>
            <div className="w-1 h-6 bg-white rounded-full shadow-sm absolute"></div>
          </div>
        </div>
        
        {/* Decorative Dot */}
        <div className={`absolute -bottom-2 -right-2 w-4 h-4 rounded-full ${
          isDarkMode ? 'bg-cyan-400' : 'bg-cyan-500'
        } shadow-lg`}></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col text-left">
        <span className={`text-4xl font-bold ${
          isDarkMode 
            ? 'text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          CalcPro
        </span>
        <span className={`text-sm font-semibold ${
          isDarkMode ? 'text-gray-300' : 'text-gray-500'
        } mt-1`}>
          SCIENTIFIC EDITION
        </span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 text-gray-800'
    }`}>
      {/* Animated Background Elements for Light Mode */}
      {!isDarkMode && (
        <>
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse-soft"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce-gentle"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200 rounded-full opacity-25 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        </>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <CalculatorLogo />
          </div>
          <p className={`text-xl font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Control Bar */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={toggleScientificMode}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
                state.isScientificMode
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 border border-purple-200 hover:border-purple-300'
              }`}
            >
              <span className="text-xl">💡</span>
              {state.isScientificMode ? 'Scientific Mode' : 'Standard Mode'}
            </button>
            
            <button
              onClick={() => setIsHistoryOpen(true)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-blue-200'
              }`}
            >
              <span className="text-xl">📜</span>
              History
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white' 
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-200'
              }`}
            >
              <span className="text-xl">⚙️</span>
              Settings
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200'
              }`}
            >
              <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Scientific Functions Panel */}
            {state.isScientificMode && (
              <div className="lg:col-span-1">
                <div className={`rounded-3xl p-6 shadow-calculator backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/80 border border-blue-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-6 text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    🔬 Scientific Functions
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {SCIENTIFIC_BUTTONS.map((button) => (
                      <CalculatorButton
                        key={button.action}
                        label={button.label}
                        onClick={() => handleButtonClick(button.action)}
                        type={button.type}
                        className={`${button.className} ${
                          isDarkMode ? 'shadow-lg' : 'shadow-md'
                        }`}
                        title={button.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Calculator */}
            <div className={`${state.isScientificMode ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              <div className={`rounded-3xl p-8 shadow-2xl backdrop-blur-sm border ${
                isDarkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white/90 border-blue-100'
              }`}>
                {/* Memory Buttons */}
                <div className="grid grid-cols-6 gap-3 mb-6">
                  {MEMORY_BUTTONS.map((button) => (
                    <CalculatorButton
                      key={button.action}
                      label={button.label}
                      onClick={() => handleButtonClick(button.action)}
                      type={button.type}
                      className={`${button.className} ${
                        isDarkMode ? 'shadow-lg' : 'shadow-md'
                      }`}
                      title={`Memory ${button.label}`}
                    />
                  ))}
                </div>

                {/* Display */}
                <Display
                  currentInput={state.currentInput}
                  previousInput={state.previousInput}
                  operator={state.operator}
                  memory={state.memory}
                  memoryIndex={state.memoryIndex}
                  angleMode={state.angleMode}
                  numberFormat={state.numberFormat}
                  isError={state.isError}
                  isScientificMode={state.isScientificMode}
                  isDarkMode={isDarkMode}
                  className="mb-8"
                />

                {/* Main Buttons Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {BASIC_BUTTONS.map((button) => (
                    <CalculatorButton
                      key={button.action}
                      label={button.label}
                      onClick={() => handleButtonClick(button.action)}
                      type={button.type}
                      className={`${button.className} ${
                        isDarkMode ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
                      } transition-all duration-200`}
                      title={button.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 pt-8 border-t ${
          isDarkMode 
            ? 'border-gray-700 text-gray-400' 
            : 'border-blue-200 text-gray-600'
        }`}>
     <p className="text-xl font-semibold text-blue-600">
  🚀 Professional Smart Calculator developed by Gebreslassie Dessie
</p> 
        </div>
      </div>

      {/* Modals */}
      <HistoryPanel
        history={state.history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onClearHistory={clearHistory}
        onSelectHistory={handleSelectHistory}
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        angleMode={state.angleMode}
        onAngleModeChange={setAngleMode}
        numberFormat={state.numberFormat}
        onNumberFormatChange={setNumberFormat}
      />
    </div>
  );
};

export default SmartCalculator;