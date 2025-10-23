import { useState, useCallback, useRef } from 'react';
import { CalculatorState, Operator, ScientificFunction, MemoryOperation, AngleMode, NumberFormat, CalculationHistory } from '../types/calculator';
import { CalculationEngine } from '../utils/calculations';

const initialState: CalculatorState = {
  currentInput: '0',
  previousInput: '',
  operator: null,
  shouldResetInput: false,
  memory: [0, 0, 0, 0, 0], // Multiple memory registers
  memoryIndex: 0,
  isScientificMode: false,
  history: [],
  angleMode: 'DEG',
  numberFormat: 'DEC',
  isError: false,
  lastOperation: '',
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const calculationRef = useRef<{ a?: number; b?: number; operator?: Operator }>({});

  const addToHistory = useCallback((expression: string, result: string) => {
    const historyItem: CalculationHistory = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: Date.now(),
    };
    
    setState(prev => ({
      ...prev,
      history: [historyItem, ...prev.history.slice(0, 49)], // Keep last 50 items
    }));
  }, []);

  const setError = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      currentInput: message,
      isError: true,
      shouldResetInput: true,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, isError: false }));
  }, []);

  const handleNumber = useCallback((number: string) => {
    setState(prev => {
      if (prev.isError) clearError();
      
      if (prev.shouldResetInput) {
        return {
          ...prev,
          currentInput: number,
          shouldResetInput: false,
        };
      }

      // Prevent multiple leading zeros
      if (prev.currentInput === '0' && number === '0') {
        return prev;
      }

      // Replace initial zero unless it's a decimal
      if (prev.currentInput === '0' && number !== '.') {
        return {
          ...prev,
          currentInput: number,
        };
      }

      return {
        ...prev,
        currentInput: prev.currentInput + number,
      };
    });
  }, [clearError]);

  const handleOperator = useCallback((operator: Operator) => {
    setState(prev => {
      if (prev.isError) return prev;

      const currentValue = CalculationEngine.parseInput(prev.currentInput, prev.numberFormat);

      // If we have a previous operation pending, calculate it first
      if (prev.operator && !prev.shouldResetInput) {
        try {
          const previousValue = CalculationEngine.parseInput(prev.previousInput, prev.numberFormat);
          const result = CalculationEngine.calculateBasic(previousValue, currentValue, prev.operator);
          
          const expression = `${prev.previousInput} ${prev.operator} ${prev.currentInput}`;
          addToHistory(expression, CalculationEngine.formatNumber(result, prev.numberFormat));

          return {
            ...prev,
            currentInput: CalculationEngine.formatNumber(result, prev.numberFormat),
            previousInput: CalculationEngine.formatNumber(result, prev.numberFormat),
            operator,
            shouldResetInput: true,
            lastOperation: expression,
          };
        } catch (error) {
          return { ...prev, isError: true, currentInput: 'Error' };
        }
      }

      // Start new operation
      return {
        ...prev,
        previousInput: prev.currentInput,
        operator,
        shouldResetInput: true,
      };
    });
  }, [addToHistory]);

  const handleEquals = useCallback(() => {
    setState(prev => {
      if (prev.isError || !prev.operator || !prev.previousInput) return prev;

      try {
        const a = CalculationEngine.parseInput(prev.previousInput, prev.numberFormat);
        const b = CalculationEngine.parseInput(prev.currentInput, prev.numberFormat);
        const result = CalculationEngine.calculateBasic(a, b, prev.operator);
        
        const expression = `${prev.previousInput} ${prev.operator} ${prev.currentInput}`;
        addToHistory(expression, CalculationEngine.formatNumber(result, prev.numberFormat));

        return {
          ...prev,
          currentInput: CalculationEngine.formatNumber(result, prev.numberFormat),
          previousInput: '',
          operator: null,
          shouldResetInput: true,
          lastOperation: expression,
        };
      } catch (error) {
        return { ...prev, isError: true, currentInput: 'Error' };
      }
    });
  }, [addToHistory]);

  const handleScientific = useCallback((func: ScientificFunction) => {
    setState(prev => {
      if (prev.isError) return prev;

      try {
        let result: number;
        
        if (func === 'π' || func === 'e') {
          result = CalculationEngine.calculateScientific(0, func, prev.angleMode);
        } else {
          const currentValue = CalculationEngine.parseInput(prev.currentInput, prev.numberFormat);
          result = CalculationEngine.calculateScientific(currentValue, func, prev.angleMode);
        }

        const expression = `${func}(${func === 'π' || func === 'e' ? '' : prev.currentInput})`;
        addToHistory(expression, CalculationEngine.formatNumber(result, prev.numberFormat));

        return {
          ...prev,
          currentInput: CalculationEngine.formatNumber(result, prev.numberFormat),
          shouldResetInput: true,
          lastOperation: expression,
        };
      } catch (error) {
        return { ...prev, isError: true, currentInput: 'Error' };
      }
    });
  }, [addToHistory]);

  const handleMemory = useCallback((operation: MemoryOperation) => {
    setState(prev => {
      if (prev.isError) return prev;

      const currentValue = CalculationEngine.parseInput(prev.currentInput, prev.numberFormat);
      const newMemory = [...prev.memory];

      switch (operation) {
        case 'MC':
          newMemory.fill(0);
          break;
        case 'MR':
          return {
            ...prev,
            currentInput: CalculationEngine.formatNumber(newMemory[prev.memoryIndex], prev.numberFormat),
            shouldResetInput: true,
          };
        case 'M+':
          newMemory[prev.memoryIndex] += currentValue;
          break;
        case 'M-':
          newMemory[prev.memoryIndex] -= currentValue;
          break;
        case 'MS':
          newMemory[prev.memoryIndex] = currentValue;
          break;
        case 'M↓':
          return {
            ...prev,
            memoryIndex: (prev.memoryIndex + 1) % newMemory.length,
          };
      }

      return { ...prev, memory: newMemory };
    });
  }, []);

  const handleClear = useCallback(() => setState(initialState), []);
  
  const handleClearEntry = useCallback(() => 
    setState(prev => ({ ...prev, currentInput: '0', isError: false })), []);

  const handleBackspace = useCallback(() => {
    setState(prev => {
      if (prev.isError) return { ...prev, currentInput: '0', isError: false };
      
      if (prev.currentInput.length === 1 || (prev.currentInput.length === 2 && prev.currentInput.startsWith('-'))) {
        return { ...prev, currentInput: '0' };
      }
      
      return { ...prev, currentInput: prev.currentInput.slice(0, -1) };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.isError) clearError();
      if (prev.shouldResetInput) {
        return { ...prev, currentInput: '0.', shouldResetInput: false };
      }
      if (!prev.currentInput.includes('.')) {
        return { ...prev, currentInput: prev.currentInput + '.' };
      }
      return prev;
    });
  }, [clearError]);

  const handleNegate = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;
      if (prev.currentInput === '0') return prev;
      
      return {
        ...prev,
        currentInput: prev.currentInput.startsWith('-') 
          ? prev.currentInput.slice(1) 
          : '-' + prev.currentInput
      };
    });
  }, []);

  const toggleScientificMode = useCallback(() => 
    setState(prev => ({ ...prev, isScientificMode: !prev.isScientificMode })), []);

  const setAngleMode = useCallback((mode: AngleMode) => 
    setState(prev => ({ ...prev, angleMode: mode })), []);

  const setNumberFormat = useCallback((format: NumberFormat) => 
    setState(prev => ({ ...prev, numberFormat: format, currentInput: '0' })), []);

  const clearHistory = useCallback(() => 
    setState(prev => ({ ...prev, history: [] })), []);

  return {
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
  };
};