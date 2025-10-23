export type Operator = '+' | '-' | '×' | '÷' | '%' | '^';
export type ScientificFunction = 'sin' | 'cos' | 'tan' | 'log' | 'ln' | '√' | 'x²' | 'x³' | 'π' | 'e' | '1/x' | 'x!' | '10^x' | 'e^x' | 'abs' | 'exp' | 'mod';
export type MemoryOperation = 'MC' | 'MR' | 'M+' | 'M-' | 'MS' | 'M↓';
export type AngleMode = 'DEG' | 'RAD' | 'GRAD';
export type NumberFormat = 'DEC' | 'HEX' | 'BIN' | 'OCT';

export interface CalculatorState {
  currentInput: string;
  previousInput: string;
  operator: Operator | null;
  shouldResetInput: boolean;
  memory: number[];
  memoryIndex: number;
  isScientificMode: boolean;
  history: CalculationHistory[];
  angleMode: AngleMode;
  numberFormat: NumberFormat;
  isError: boolean;
  lastOperation: string;
}

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export type ButtonType = 
  | 'number' 
  | 'operator' 
  | 'function' 
  | 'memory' 
  | 'equals' 
  | 'clear' 
  | 'decimal' 
  | 'backspace'
  | 'special';

export interface CalculatorButton {
  label: string;
  type: ButtonType;
  action: string;
  className?: string;
  secondaryLabel?: string;
}