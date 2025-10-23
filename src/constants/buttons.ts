import { CalculatorButton } from '../types/calculator';

export const BASIC_BUTTONS: CalculatorButton[] = [
  { label: 'C', type: 'clear', action: 'clear', className: 'bg-calculator-danger hover:bg-red-600' },
  { label: 'CE', type: 'clear', action: 'clearEntry', className: 'bg-calculator-danger hover:bg-red-600' },
  { label: '⌫', type: 'backspace', action: 'backspace', className: 'bg-calculator-warning hover:bg-yellow-600' },
  { label: '÷', type: 'operator', action: '÷', className: 'bg-calculator-accent hover:bg-purple-600' },

  { label: '7', type: 'number', action: '7' },
  { label: '8', type: 'number', action: '8' },
  { label: '9', type: 'number', action: '9' },
  { label: '×', type: 'operator', action: '×', className: 'bg-calculator-accent hover:bg-purple-600' },

  { label: '4', type: 'number', action: '4' },
  { label: '5', type: 'number', action: '5' },
  { label: '6', type: 'number', action: '6' },
  { label: '-', type: 'operator', action: '-', className: 'bg-calculator-accent hover:bg-purple-600' },

  { label: '1', type: 'number', action: '1' },
  { label: '2', type: 'number', action: '2' },
  { label: '3', type: 'number', action: '3' },
  { label: '+', type: 'operator', action: '+', className: 'bg-calculator-accent hover:bg-purple-600' },

  { label: '±', type: 'special', action: 'negate', className: 'bg-calculator-secondary hover:bg-slate-600' },
  { label: '0', type: 'number', action: '0' },
  { label: '.', type: 'decimal', action: 'decimal' },
  { label: '=', type: 'equals', action: 'equals', className: 'bg-calculator-success hover:bg-green-600' },
];

export const SCIENTIFIC_BUTTONS: CalculatorButton[] = [
  { label: 'sin', type: 'function', action: 'sin', className: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'cos', type: 'function', action: 'cos', className: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'tan', type: 'function', action: 'tan', className: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'π', type: 'function', action: 'π', className: 'bg-purple-500 hover:bg-purple-600' },

  { label: 'log', type: 'function', action: 'log', className: 'bg-indigo-500 hover:bg-indigo-600' },
  { label: 'ln', type: 'function', action: 'ln', className: 'bg-indigo-500 hover:bg-indigo-600' },
  { label: 'e', type: 'function', action: 'e', className: 'bg-indigo-500 hover:bg-indigo-600' },
  { label: '^', type: 'operator', action: '^', className: 'bg-calculator-accent hover:bg-purple-600' },

  { label: '√', type: 'function', action: '√', className: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'x²', type: 'function', action: 'x²', className: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'x³', type: 'function', action: 'x³', className: 'bg-blue-500 hover:bg-blue-600' },
  { label: '1/x', type: 'function', action: '1/x', className: 'bg-blue-500 hover:bg-blue-600' },

  { label: 'x!', type: 'function', action: 'x!', className: 'bg-cyan-500 hover:bg-cyan-600' },
  { label: '10^x', type: 'function', action: '10^x', className: 'bg-cyan-500 hover:bg-cyan-600' },
  { label: 'e^x', type: 'function', action: 'e^x', className: 'bg-cyan-500 hover:bg-cyan-600' },
  { label: 'mod', type: 'function', action: 'mod', className: 'bg-cyan-500 hover:bg-cyan-600' },
];

export const MEMORY_BUTTONS: CalculatorButton[] = [
  { label: 'MC', type: 'memory', action: 'MC', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
  { label: 'MR', type: 'memory', action: 'MR', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
  { label: 'M+', type: 'memory', action: 'M+', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
  { label: 'M-', type: 'memory', action: 'M-', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
  { label: 'MS', type: 'memory', action: 'MS', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
  { label: 'M↓', type: 'memory', action: 'M↓', className: 'bg-sky-500 hover:bg-sky-600 text-sm' },
];