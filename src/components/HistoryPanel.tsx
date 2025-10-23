import React from 'react';
import { CalculationHistory } from '../types/calculator';
import { FaTimes, FaTrash, FaCopy } from 'react-icons/fa';

interface HistoryPanelProps {
  history: CalculationHistory[];
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  onSelectHistory: (expression: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  isOpen,
  onClose,
  onClearHistory,
  onSelectHistory,
}) => {
  if (!isOpen) return null;

  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Calculation History
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={onClearHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              disabled={history.length === 0}
            >
              <FaTrash className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🧮</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No calculations yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Your calculation history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group cursor-pointer"
                  onClick={() => onSelectHistory(item.expression)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {item.expression}
                      </div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white font-mono">
                        = {item.result}
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(item.result);
                        }}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        title="Copy result"
                      >
                        <FaCopy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatTime(item.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {history.length} calculation{history.length !== 1 ? 's' : ''} in history
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;