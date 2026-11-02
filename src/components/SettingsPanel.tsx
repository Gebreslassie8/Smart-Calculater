import React from 'react';
import { AngleMode, NumberFormat } from '../types/calculator';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  angleMode: AngleMode;
  onAngleModeChange: (mode: AngleMode) => void;
  numberFormat: NumberFormat;
  onNumberFormatChange: (format: NumberFormat) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  angleMode,
  onAngleModeChange,
  numberFormat,
  onNumberFormatChange,
}) => {
  if (!isOpen) return null;

  const angleModes: { value: AngleMode; label: string; description: string }[] = [
    { value: 'DEG', label: 'Degrees', description: '360° in a circle' },
    { value: 'RAD', label: 'Radians', description: '2π radians in a circle' },
    { value: 'GRAD', label: 'Gradians', description: '400 gradians in a circle' },
  ];

  const numberFormats: { value: NumberFormat; label: string; description: string }[] = [
    { value: 'DEC', label: 'Decimal', description: 'Base 10' },
    { value: 'HEX', label: 'Hexadecimal', description: 'Base 16' },
    { value: 'BIN', label: 'Binary', description: 'Base 2' },
    { value: 'OCT', label: 'Octal', description: 'Base 8' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Angle Unit
            </h3>
            <div className="space-y-2">
              {angleModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onAngleModeChange(mode.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    angleMode === mode.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">
                      {mode.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {mode.description}
                    </div>
                  </div>
                  {angleMode === mode.value && <FaCheck className="text-blue-500" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Number Format
            </h3>
            <div className="space-y-2">
              {numberFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => onNumberFormatChange(format.value)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    numberFormat === format.value
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">
                      {format.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {format.description}
                    </div>
                  </div>
                  {numberFormat === format.value && <FaCheck className="text-green-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;