import React from 'react';
import { Park } from '../types';

interface UVIndexCardProps {
  uvIndex: Park['uvIndex'];
}

export const UVIndexCard: React.FC<UVIndexCardProps> = ({ uvIndex }) => {
  // 2 * PI * r = 2 * 3.14159 * 40 = ~251.3
  const circumference = 251.2;
  // UV scale up to 12. Offset calculation:
  // For UV 6, gauge fills approx 40-50%
  const percentage = Math.min(uvIndex.value / 12, 1);
  const strokeDashoffset = circumference - circumference * percentage * 0.75;

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-between h-full min-h-[220px]"
      id="uv-index-card"
    >
      {/* Card Header */}
      <h2 className="text-fluid-card-title font-bold text-[#006b47] mb-2 self-start flex items-center gap-2 w-full">
        <span className="material-symbols-outlined text-[#006b47] text-[22px]">light_mode</span>
        <span>UV Index</span>
      </h2>

      {/* Circular Gauge matching screenshot */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 my-1 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Base Track */}
          <circle 
            cx="50" 
            cy="50" 
            fill="none" 
            r="40" 
            stroke="#e0e3e1" 
            strokeWidth="8"
          />
          {/* Progress Arc in warm earth tone */}
          <circle 
            className="transition-all duration-1000 ease-out" 
            cx="50" 
            cy="50" 
            fill="none" 
            r="40" 
            stroke="#9b6c49" 
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Value & Level */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold text-[#9b6c49] leading-none font-mono">
            {uvIndex.value}
          </span>
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#3e4942] uppercase mt-0.5">
            {uvIndex.level}
          </span>
        </div>
      </div>

      {/* Advisory Text */}
      <p className="text-xs sm:text-sm text-[#3e4942] text-center font-medium mt-1">
        {uvIndex.advice}
      </p>
    </div>
  );
};
