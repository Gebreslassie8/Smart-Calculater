import { Operator, ScientificFunction, AngleMode } from '../types/calculator';

export class CalculationEngine {
  static calculateBasic(a: number, b: number, operator: Operator): number {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': 
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      case '%': return a % b;
      case '^': return Math.pow(a, b);
      default: return b;
    }
  }

  static calculateScientific(value: number, func: ScientificFunction, angleMode: AngleMode = 'DEG'): number {
    let angleValue = value;
    
    // Convert to radians if needed
    if (['sin', 'cos', 'tan'].includes(func)) {
      switch (angleMode) {
        case 'DEG':
          angleValue = value * Math.PI / 180;
          break;
        case 'GRAD':
          angleValue = value * Math.PI / 200;
          break;
        case 'RAD':
        default:
          angleValue = value;
      }
    }

    switch (func) {
      case 'sin': return Math.sin(angleValue);
      case 'cos': return Math.cos(angleValue);
      case 'tan': return Math.tan(angleValue);
      case 'log': 
        if (value <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log10(value);
      case 'ln': 
        if (value <= 0) throw new Error('Natural log of non-positive number');
        return Math.log(value);
      case '√': 
        if (value < 0) throw new Error('Square root of negative number');
        return Math.sqrt(value);
      case 'x²': return Math.pow(value, 2);
      case 'x³': return Math.pow(value, 3);
      case 'π': return Math.PI;
      case 'e': return Math.E;
      case '1/x': 
        if (value === 0) throw new Error('Division by zero');
        return 1 / value;
      case 'x!': 
        if (value < 0 || !Number.isInteger(value)) throw new Error('Factorial requires non-negative integer');
        if (value === 0 || value === 1) return 1;
        let result = 1;
        for (let i = 2; i <= value; i++) {
          result *= i;
        }
        return result;
      case '10^x': return Math.pow(10, value);
      case 'e^x': return Math.exp(value);
      case 'abs': return Math.abs(value);
      case 'exp': return Math.exp(value);
      case 'mod': return value; // Placeholder
      default: return value;
    }
  }

  static formatNumber(value: number, format: string = 'DEC'): string {
    switch (format) {
      case 'HEX': return Math.round(value).toString(16).toUpperCase();
      case 'BIN': return Math.round(value).toString(2);
      case 'OCT': return Math.round(value).toString(8);
      case 'DEC':
      default:
        // Handle very large/small numbers with scientific notation
        if (Math.abs(value) > 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
          return value.toExponential(6);
        }
        return value.toString();
    }
  }

  static parseInput(input: string, format: string = 'DEC'): number {
    if (format === 'DEC') {
      return parseFloat(input);
    }
    return parseInt(input, this.getBaseFromFormat(format));
  }

  private static getBaseFromFormat(format: string): number {
    switch (format) {
      case 'HEX': return 16;
      case 'BIN': return 2;
      case 'OCT': return 8;
      default: return 10;
    }
  }
}