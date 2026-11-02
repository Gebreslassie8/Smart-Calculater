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
      case 'clear': handleClear(); break;
      case 'clearEntry': handleClearEntry(); break;
      case 'backspace': handleBackspace(); break;
      case 'decimal': handleDecimal(); break;
      case 'equals': handleEquals(); break;
      case 'negate': handleNegate(); break;
      case '+': case '-': case '×': case '÷': case '%': case '^':
        handleOperator(action as any); break;
      case 'sin': case 'cos': case 'tan': case 'log': case 'ln': case '√':
      case 'x²': case 'x³': case 'π': case 'e': case '1/x': case 'x!':
      case '10^x': case 'e^x': case 'abs': case 'exp': case 'mod':
        handleScientific(action as any); break;
      case 'MC': case 'MR': case 'M+': case 'M-': case 'MS': case 'M↓':
        handleMemory(action as any); break;
      default:
        if (/^\d$/.test(action)) handleNumber(action);
        break;
    }
  };

  const handleSelectHistory = (expression: string) => {
    console.log('Selected history:', expression);
    setIsHistoryOpen(false);
  };

  // Logo Component
  const CalculatorLogo = () => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className={`w-10 h-10 rounded-xl border-2 ${
          isDarkMode 
            ? 'border-blue-400 bg-gradient-to-br from-blue-600 to-purple-600' 
            : 'border-blue-500 bg-gradient-to-br from-blue-400 to-purple-500'
        } flex items-center justify-center shadow-lg`}>
          <div className="w-6 h-2 bg-green-400 rounded-sm mb-0.5 shadow-inner"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-white rounded-full"></div>
            <div className="w-0.5 h-4 bg-white rounded-full absolute"></div>
          </div>
        </div>
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
          isDarkMode ? 'bg-cyan-400' : 'bg-cyan-500'
        } shadow-sm`}></div>
      </div>
      <div className="flex flex-col text-left">
        <span className={`text-xl font-bold leading-tight ${
          isDarkMode 
            ? 'text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          CalcPro
        </span>
        <span className={`text-[10px] font-semibold tracking-wider ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
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

      {/* ═══════════════════════════════════════════════════
          HORIZONTAL HEADER (STICKY) 
      ═══════════════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-blue-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT: Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.location.reload()}>
              <CalculatorLogo />
            </div>

            {/* RIGHT: Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Scientific Mode Toggle */}
              <button
                onClick={toggleScientificMode}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  state.isScientificMode
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                    : isDarkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-base">💡</span>
                <span className="hidden sm:inline">{state.isScientificMode ? 'Scientific' : 'Standard'}</span>
              </button>

              {/* History */}
              <button
                onClick={() => setIsHistoryOpen(true)}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-base">📜</span>
                <span className="hidden sm:inline">History</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-base">⚙️</span>
                <span className="hidden sm:inline">Settings</span>
              </button>

              {/* Divider */}
              <div className={`w-px h-8 mx-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md'
                }`}
              >
                <span className="text-base">{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
            
            {/* Scientific Functions Panel */}
            {state.isScientificMode && (
              <div className="lg:col-span-1">
                <div className={`rounded-3xl p-6 shadow-calculator backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/80 border border-blue-100'
                }`}>
                  <h3 className={`text-lg font-bold mb-6 text-center ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    🔬 Scientific
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
              <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm border ${
                isDarkMode 
                  ? 'bg-gray-800/95 border-gray-700' 
                  : 'bg-white/90 border-blue-100'
              }`}>
                
                {/* Memory Buttons */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-6">
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
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
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
      </main>

      {/* Footer */}
      <footer className={`text-center py-8 mt-4 border-t ${
        isDarkMode 
          ? 'border-gray-700 text-gray-400' 
          : 'border-blue-200 text-gray-600'
      }`}>
        <p className="text-sm font-medium">
          🚀 Professional Smart Calculator developed by <span className="font-bold">Gebreslassie Dessie</span>
        </p>
      </footer>

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