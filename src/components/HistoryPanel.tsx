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
    <div 
      className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            History
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={onClearHistory}
              className="flex items-center space-x-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
              disabled={history.length === 0}
            >
              <FaTrash className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-6xl mb-4">🧮</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No calculations yet
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group cursor-pointer"
                onClick={() => onSelectHistory(item.expression)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {item.expression}
                    </div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white font-mono">
                      = {item.result}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.result);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <FaCopy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;