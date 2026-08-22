import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { RainProbHour, RainRiskTier } from '../types';
import { getRainTier, getRainTierInfo, getParkRainTrendData, RainTrendItem } from '../utils/weatherProjection';
import { formatSingaporeLiveTime12H } from '../utils/timeUtils';
import { useGovWeather } from '../context/GovWeatherContext';

interface RainProbabilityCardProps {
  data?: RainProbHour[];
  currentRainTier?: RainRiskTier;
}

export const RainProbabilityCard: React.FC<RainProbabilityCardProps> = ({ 
  data: _data, 
  currentRainTier 
}) => {
  const { rainTrendMode, setRainTrendMode, currentPark } = useGovWeather();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showTierModal, setShowTierModal] = useState<boolean>(false);
  const [timeTick, setTimeTick] = useState<number>(0);

  // Re-sync with live Singapore time every 10 seconds for real-time second/minute precision
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTick((t) => t + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Live Singapore Time in AM/PM format (e.g. "1:05 AM")
  const liveSgtTime = useMemo(() => {
    return formatSingaporeLiveTime12H(new Date());
  }, [timeTick]);

  // Dynamic 4-Hour high resolution vs 12-Hour extended outlook computed live for current park
  const activeDataSet: RainTrendItem[] = useMemo(() => {
    return getParkRainTrendData(currentPark, rainTrendMode);
  }, [currentPark, rainTrendMode, timeTick]);

  // Find peak probability hour
  const peakItem = [...activeDataSet].sort((a, b) => b.percentage - a.percentage)[0];

  // Derive current overall tier
  const currentPercentage = activeDataSet[0]?.percentage ?? 10;
  const activeTier = currentRainTier || getRainTier(currentPercentage);
  const tierInfo = getRainTierInfo(activeTier);

  // Selected bar item info
  const hoveredItem = activeIdx !== null ? activeDataSet[activeIdx] : null;

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full min-h-[300px] relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      id="rain-probability-card"
    >
      {/* Top Header with Title, Live SGT Time Clock, Mode Toggle, and Tier Badge */}
      <div className="flex flex-wrap items-start justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tierInfo.badgeBg} ${tierInfo.badgeText}`}>
            <span className="material-symbols-outlined text-[20px]">rainy</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-[#191c1a] leading-tight">
                Rain Probability Trend
              </h2>
              {/* Actual Live Time Badge in AM/PM */}
              <span 
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f5e9] text-[#006b47] border border-[#a5d6a7]/70 font-mono shadow-2xs"
                title="Current Real-time Singapore Standard Time (SGT, UTC+8)"
                id="rain-live-sgt-time-badge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Now: {liveSgtTime} SGT</span>
              </span>
            </div>
            <p className="text-[11px] text-[#3e4942]">
              NEA Doppler Radar • Singapore Convective Tracking
            </p>
          </div>
        </div>

        {/* 4h vs 12h Range Selector & Risk Tier Badge */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Trend Duration Switcher */}
          <div className="flex bg-[#e6ece7] p-0.5 rounded-lg border border-[#c1d0c4]/50">
            <button
              onClick={() => {
                setRainTrendMode('4h');
                setActiveIdx(null);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                rainTrendMode === '4h'
                  ? 'bg-white text-[#005235] shadow-xs'
                  : 'text-[#556258] hover:text-[#191c1a]'
              }`}
              id="rain-toggle-4h-btn"
            >
              4-Hour
            </button>
            <button
              onClick={() => {
                setRainTrendMode('12h');
                setActiveIdx(null);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                rainTrendMode === '12h'
                  ? 'bg-white text-[#005235] shadow-xs'
                  : 'text-[#556258] hover:text-[#191c1a]'
              }`}
              id="rain-toggle-12h-btn"
            >
              12-Hour
            </button>
          </div>

          <button
            onClick={() => setShowTierModal(true)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all hover:scale-105 ${tierInfo.badgeBg} ${tierInfo.badgeText} ${tierInfo.badgeBorder} cursor-pointer`}
            title="Click to view Singapore Rain Probability Tier breakdown"
            id="rain-tier-badge-btn"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: tierInfo.accentColor }} />
            <span>Tier: {tierInfo.tier}</span>
            <span className="material-symbols-outlined text-[12px]">info</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status / Peak Alert Banner */}
      <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 mb-3 ${tierInfo.badgeBg} ${tierInfo.badgeBorder}`}>
        <div className="flex items-center gap-2 text-[#191c1a] min-w-0">
          <span className="material-symbols-outlined text-sm shrink-0" style={{ color: tierInfo.accentColor }}>
            {tierInfo.icon}
          </span>
          <span className="truncate text-[11px] sm:text-xs">
            {hoveredItem ? (
              <span>
                <strong>{hoveredItem.time} ({hoveredItem.label}):</strong> {hoveredItem.percentage}% rain chance • est. {hoveredItem.rainfallMm}
              </span>
            ) : peakItem && peakItem.percentage >= 40 ? (
              <span>
                <strong>Peak Rain Alert ({liveSgtTime}):</strong> {peakItem.percentage}% chance around {peakItem.time} ({peakItem.label})
              </span>
            ) : (
              <span><strong>Forecast Trend (As of {liveSgtTime} SGT):</strong> Mostly dry tropical conditions expected over the next {rainTrendMode === '4h' ? '4 hours' : '12 hours'}.</span>
            )}
          </span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/95 shrink-0 font-mono shadow-2xs" style={{ color: tierInfo.accentColor }}>
          {hoveredItem ? `${hoveredItem.percentage}% (${hoveredItem.time})` : `${currentPercentage}% at ${liveSgtTime}`}
        </span>
      </div>

      {/* Interactive Trend Chart Bars */}
      <div className="flex-grow flex items-end gap-1.5 sm:gap-2.5 h-28 pt-2 pb-1 relative">
        {activeDataSet.map((item, index) => {
          const itemTier = getRainTier(item.percentage);
          const itemTierInfo = getRainTierInfo(itemTier);
          const isSelected = activeIdx === index;
          const heightPercent = Math.max(14, Math.min(100, item.percentage));

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => setActiveIdx(index === activeIdx ? null : index)}
              className="flex-1 flex flex-col justify-end items-center h-full relative group cursor-pointer"
              id={`rain-trend-bar-${index}`}
            >
              {/* Tooltip on Hover / Touch */}
              <div 
                className={`absolute -top-11 left-1/2 transform -translate-x-1/2 text-[10px] font-bold font-mono px-2 py-1 rounded-lg shadow-md text-white transition-all pointer-events-none z-20 whitespace-nowrap text-center ${
                  isSelected || activeIdx === null ? 'group-hover:opacity-100 group-hover:-top-12' : 'opacity-0'
                } ${isSelected ? 'opacity-100 -top-12 scale-105' : 'opacity-0'}`}
                style={{ backgroundColor: itemTierInfo.accentColor }}
              >
                <div>{item.time} ({item.label === 'Now' ? `Now • ${liveSgtTime}` : item.label}): {item.percentage}%</div>
                <div className="text-[9px] opacity-90">{itemTier} • {item.rainfallMm}</div>
              </div>

              {/* Weather icon above bar */}
              {item.conditionIcon && (
                <span className="material-symbols-outlined text-[13px] text-[#556258] mb-1">
                  {item.conditionIcon}
                </span>
              )}

              {/* Bar element */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-lg transition-all duration-300 ${itemTierInfo.barColor} ${
                  isSelected ? 'ring-2 ring-offset-1 ring-slate-700 scale-y-105' : 'opacity-90 hover:opacity-100'
                }`}
              />

              {/* Time Sub-label in AM/PM */}
              <div className="flex flex-col items-center mt-1 text-center">
                <span className="text-[10px] font-bold text-[#191c1a] truncate whitespace-nowrap">
                  {item.time}
                </span>
                <span className="text-[9px] text-[#556258]">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis Footer / Legend */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#dbe5dd]/60 text-[11px]">
        <div className="flex items-center gap-2 sm:gap-3 text-[#3e4942] flex-wrap">
          <span className="flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#006b47]" /> Low (&lt;25%)
          </span>
          <span className="flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#d97706]" /> Med (25-59%)
          </span>
          <span className="flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" /> High (≥60%)
          </span>
        </div>

        <button 
          onClick={() => setShowTierModal(true)}
          className="text-[#006b47] hover:underline font-semibold flex items-center gap-0.5 text-[11px] cursor-pointer"
        >
          <span>Tier Details</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </button>
      </div>

      {/* Rain Probability Tier Explanation Modal (Rendered at Root Portal to Prevent Any Parent Clipping) */}
      {showTierModal && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowTierModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 text-left"
            onClick={(e) => e.stopPropagation()}
            id="rain-tier-info-modal"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#006b47]">umbrella</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Singapore Rain Probability Tiers
                </h3>
              </div>
              <button 
                onClick={() => setShowTierModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Rain probability tiers are calibrated against NEA radar echoes, Doppler precipitation reflectivity, and localized tropical convective cycles in Singapore.
            </p>

            <div className="space-y-3">
              {/* Low Tier Card */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    LOW TIER (&lt; 25% Probability)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100">
                    Dry / Minimal Risk
                  </span>
                </div>
                <p className="text-xs text-emerald-900 mb-1.5 leading-relaxed">
                  Clear or partly cloudy tropical conditions. Isolated brief cloud drifts without sustained precipitation.
                </p>
                <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[13px] shrink-0">check_circle</span>
                  <span>Ideal for unshaded trails, lawns, TreeTop walks, picnics, and cycling.</span>
                </div>
              </div>

              {/* Medium Tier Card */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    MEDIUM TIER (25% - 59% Probability)
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-100">
                    Scattered Showers
                  </span>
                </div>
                <p className="text-xs text-amber-900 mb-1.5 leading-relaxed">
                  Cloud accumulation with localized passing showers. Rainfall is generally brief (15-30 mins) but can be brisk.
                </p>
                <div className="text-[11px] text-amber-800 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[13px] shrink-0">info</span>
                  <span>Keep a compact umbrella handy; stay within 10 minutes of park shelters.</span>
                </div>
              </div>

              {/* High Tier Card */}
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    HIGH TIER (≥ 60% Probability)
                  </span>
                  <span className="text-[11px] font-semibold text-red-700 bg-white px-2 py-0.5 rounded-full border border-red-100">
                    Heavy Downpour / Thunder
                  </span>
                </div>
                <p className="text-xs text-red-900 mb-1.5 leading-relaxed">
                  High likelihood of moderate to heavy tropical downpours accompanied by gusty winds or lightning.
                </p>
                <div className="text-[11px] text-red-800 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[13px] shrink-0">warning</span>
                  <span>Seek shelter immediately in covered pavilions or visitor centres; avoid open hills.</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowTierModal(false)}
                className="px-5 py-2.5 bg-[#006b47] hover:bg-[#005436] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
