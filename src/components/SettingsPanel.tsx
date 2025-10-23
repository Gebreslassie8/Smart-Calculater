import React from 'react';
import { AngleMode, NumberFormat } from '../types/calculator';
import { FaTimes, FaAngleRight, FaCheck } from 'react-icons/fa';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Calculator Settings
          </h2>
          <button
            onClick={onClose}
            className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Angle Mode */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Angle Unit
            </h3>
            <div className="space-y-2">
              {angleModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => onAngleModeChange(mode.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    angleMode === mode.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {mode.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {mode.description}
                    </div>
                  </div>
                  {angleMode === mode.value && (
                    <FaCheck className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Number Format */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Number Format
            </h3>
            <div className="space-y-2">
              {numberFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => onNumberFormatChange(format.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    numberFormat === format.value
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {format.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {format.description}
                    </div>
                  </div>
                  {numberFormat === format.value && (
                    <FaCheck className="w-5 h-5 text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Changes are applied immediately
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;