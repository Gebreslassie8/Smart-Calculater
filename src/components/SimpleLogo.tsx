import React from 'react';

interface SimpleLogoProps {
  className?: string;
  darkMode?: boolean;
}

const SimpleLogo: React.FC<SimpleLogoProps> = ({ className = '', darkMode = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Symbol */}
      <div className="relative">
        <div className={`w-12 h-12 rounded-2xl border-4 ${
          darkMode 
            ? 'border-blue-400 bg-blue-500/20' 
            : 'border-blue-500 bg-blue-100'
        } flex items-center justify-center shadow-lg`}>
          {/* Calculator Screen */}
          <div className="w-8 h-3 bg-green-400 rounded-lg mb-1 shadow-inner"></div>
          
          {/* Plus Sign */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-white rounded-full"></div>
            <div className="w-0.5 h-4 bg-white rounded-full absolute"></div>
          </div>
        </div>
        
        {/* Decorative Dots */}
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
          darkMode ? 'bg-purple-400' : 'bg-purple-500'
        }`}></div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`text-2xl font-bold ${
          darkMode 
            ? 'text-white' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
        }`}>
          CalcPro
        </span>
        <span className={`text-xs ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        } -mt-1`}>
          SCIENTIFIC
        </span>
      </div>
    </div>
  );
};

export default SimpleLogo;