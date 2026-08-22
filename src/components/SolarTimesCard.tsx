import React, { useState, useEffect } from 'react';
import { Park } from '../types';
import { getSolarTimes, SolarInfo } from '../utils/solarCalculator';

interface SolarTimesCardProps {
  park: Park;
}

export const SolarTimesCard: React.FC<SolarTimesCardProps> = ({ park }) => {
  const [solarInfo, setSolarInfo] = useState<SolarInfo>(() => getSolarTimes(new Date(), park.lat, park.lng));

  useEffect(() => {
    setSolarInfo(getSolarTimes(new Date(), park.lat, park.lng));
    const interval = setInterval(() => {
      setSolarInfo(getSolarTimes(new Date(), park.lat, park.lng));
    }, 60000);
    return () => clearInterval(interval);
  }, [park.lat, park.lng]);

  // Calculate sun position along an SVG parabolic arc (0 to 100)
  // X: maps 10% to 90% along the width (viewBox 0 0 240 100)
  // Y: vertex at top (y=20), base at bottom (y=80)
  const progressClamped = Math.min(100, Math.max(0, solarInfo.dayProgressPercent));
  const sunX = 24 + (progressClamped / 100) * 192; // 24 to 216
  // Parabola: y = a*(x-120)^2 + 22, where at x=24 y=80 => 80 = a*(96)^2 + 22 => a = 58 / 9216 ~= 0.00629
  const sunY = 22 + 0.00629 * Math.pow(sunX - 120, 2);

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-[#c1d0c4]/60 bg-white flex flex-col justify-between h-full"
      id="solar-times-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-fluid-card-title font-bold text-[#006b47] flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-amber-500">
            {solarInfo.nextEvent === 'sunset' ? 'wb_twilight' : 'wb_sunny'}
          </span>
          <span>Sun & Solar Schedule</span>
        </h2>

        {/* Live Event Countdown Pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>{solarInfo.statusText.split('(')[0].trim()}</span>
        </span>
      </div>

      {/* Sun Arc Path Visualizer */}
      <div className="relative w-full my-2 px-2">
        <svg viewBox="0 0 240 100" className="w-full h-24 sm:h-28 overflow-visible">
          <defs>
            <linearGradient id="solarArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Horizon Line */}
          <line x1="16" y1="80" x2="224" y2="80" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Sun Trajectory Arc */}
          <path 
            d="M 24 80 Q 120 -15 216 80" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* Daylight Elapsed Arc (Progress) */}
          <path 
            d="M 24 80 Q 120 -15 216 80" 
            fill="none" 
            stroke="url(#solarArcGrad)" 
            strokeWidth="3.5" 
            strokeDasharray="260"
            strokeDashoffset={260 - (260 * (progressClamped / 100))}
            strokeLinecap="round"
          />

          {/* Horizon Labels */}
          <text x="24" y="94" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">
            Dawn {solarInfo.dawnFormatted}
          </text>
          <text x="120" y="94" fontSize="9" fontWeight="700" fill="#006b47" textAnchor="middle">
            Solar Noon ({solarInfo.solarNoonFormatted})
          </text>
          <text x="216" y="94" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">
            Dusk {solarInfo.duskFormatted}
          </text>

          {/* Sun Marker */}
          {solarInfo.isDaytime && (
            <g transform={`translate(${sunX}, ${sunY})`}>
              <circle r="14" fill="url(#sunGlow)" opacity="0.6" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" shadow-md="true" />
            </g>
          )}

          {!solarInfo.isDaytime && (
            <g transform="translate(120, 80)">
              <circle r="6" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="0" y="-10" fontSize="8.5" fontWeight="600" fill="#64748b" textAnchor="middle">
                Night (Moonlit)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* 2-Column Key Metrics: Sunrise vs Sunset */}
      <div className="grid grid-cols-2 gap-3 my-2">
        {/* Sunrise Block */}
        <div className="bg-[#fcfaf5] rounded-xl p-3 border border-amber-200/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              Sunrise
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#191c1a] font-mono leading-tight">
              {solarInfo.sunriseFormatted}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Ideal for morning jogs
            </span>
          </div>
        </div>

        {/* Sunset Block */}
        <div className="bg-[#fff8f5] rounded-xl p-3 border border-orange-200/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-orange-800 uppercase tracking-wider">
              Sunset
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#191c1a] font-mono leading-tight">
              {solarInfo.sunsetFormatted}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Golden Hour {solarInfo.goldenHourFormatted.split('-')[0].trim()}
            </span>
          </div>
        </div>
      </div>

      {/* Status Bar & Photography / Outdoor Advisory */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-[#005235]">
            {solarInfo.statusText}
          </span>
          <span className="font-mono text-emerald-700 font-bold">
            {solarInfo.dayProgressPercent}% Daylight Elapsed
          </span>
        </div>

        {/* Daylight Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-400 via-emerald-500 to-orange-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${solarInfo.dayProgressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#556258] mt-0.5 bg-[#f6faf7] px-2.5 py-1.5 rounded-lg border border-[#e1ece4]">
          <span className="material-symbols-outlined text-[15px] text-[#006b47] shrink-0">
            photo_camera
          </span>
          <span className="truncate">
            {solarInfo.subText}
          </span>
        </div>
      </div>
    </div>
  );
};
