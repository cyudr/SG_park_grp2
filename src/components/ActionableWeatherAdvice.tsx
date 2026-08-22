import React from 'react';
import { Park } from '../types';

interface ActionableWeatherAdviceProps {
  park: Park;
  onOpenLegend?: () => void;
  onOpenSafety?: () => void;
  className?: string;
}

export interface RecommendationInfo {
  type: 'walk' | 'umbrella' | 'hot' | 'storm' | 'sunset' | 'breezy';
  headline: string;
  badgeText: string;
  badgeColor: string;
  icon: string;
  details: string;
  bestHours: string;
  suggestedGear: string[];
  crowdLevelText: string;
  crowdColor: string;
}

export function getParkRecommendation(park: Park): RecommendationInfo {
  const rainChance = park.rainProbability?.[0]?.percentage ?? 20;
  const conditionLower = (park.condition || '').toLowerCase();
  const hasThunderstorm = conditionLower.includes('thunder') || park.alerts.some(a => a.severity === 'high');
  const hasRain = rainChance >= 40 || conditionLower.includes('rain') || conditionLower.includes('shower');
  const isTooHot = (park.feelsLike >= 35) || (park.uvIndex.value >= 8 && park.currentTemp >= 32);

  // Time in Singapore (UTC+8)
  const now = new Date();
  const sgtHour = (now.getUTCHours() + 8) % 24;
  const isGoldenHour = (sgtHour >= 17 && sgtHour <= 19) && !hasRain && !hasThunderstorm;

  // Crowd calculation
  let crowdLevelText = 'Low Crowd (~25% Capacity)';
  let crowdColor = 'text-emerald-700 bg-emerald-100 border-emerald-300';
  if (sgtHour >= 17 && sgtHour <= 19) {
    crowdLevelText = 'Moderate Crowd (~60% Capacity)';
    crowdColor = 'text-amber-800 bg-amber-100 border-amber-300';
  } else if (sgtHour >= 7 && sgtHour <= 9) {
    crowdLevelText = 'Morning Joggers (~50% Capacity)';
    crowdColor = 'text-amber-800 bg-amber-100 border-amber-300';
  }

  // 1. Storm / Lightning Alert
  if (hasThunderstorm) {
    return {
      type: 'storm',
      headline: 'Seek Shelter Immediately',
      badgeText: 'Lightning & Storm Risk',
      badgeColor: 'bg-rose-600 text-white border-rose-700 shadow-rose-200',
      icon: 'thunderstorm',
      details: 'Active lightning advisory or convective thunderstorm reported. Stay under grounded park pavilions or indoor facilities.',
      bestHours: 'Wait ~30 mins after storm passes',
      suggestedGear: ['Shelter in pavilion', 'Avoid tall trees', 'Rain poncho'],
      crowdLevelText: 'Low — Parkgoers taking shelter',
      crowdColor: 'text-slate-600 bg-slate-100 border-slate-300'
    };
  }

  // 2. High Rain Probability
  if (hasRain) {
    return {
      type: 'umbrella',
      headline: 'Bring an Umbrella',
      badgeText: 'Rain Expected',
      badgeColor: 'bg-sky-600 text-white border-sky-700 shadow-sky-200',
      icon: 'umbrella',
      details: `High rain probability (${rainChance}%). Localized passing tropical showers are likely over the park.`,
      bestHours: sgtHour < 12 ? 'Late morning or after 4:00 PM' : 'After shower clearance (~1 hour)',
      suggestedGear: ['Compact umbrella', 'Waterproof footwear', 'Waterproof phone pouch'],
      crowdLevelText,
      crowdColor
    };
  }

  // 3. Excessive Midday Tropical Heat & UV
  if (isTooHot) {
    return {
      type: 'hot',
      headline: 'Too Hot — Consider Visiting Later',
      badgeText: 'High Heat & UV',
      badgeColor: 'bg-amber-500 text-white border-amber-600 shadow-amber-200',
      icon: 'wb_sunny',
      details: `Ambient feels like ${park.feelsLike}°C with high UV index (${park.uvIndex.value}). Best to avoid strenuous midday exercise under open sun.`,
      bestHours: 'Ideal after 5:00 PM or early morning before 9:00 AM',
      suggestedGear: ['SPF50+ Sunscreen', '1L Water bottle', 'Wide-brim hat', 'UV Sunglasses'],
      crowdLevelText,
      crowdColor
    };
  }

  // 4. Golden Hour Sunset
  if (isGoldenHour) {
    return {
      type: 'sunset',
      headline: 'Optimal for Sunset Stroll',
      badgeText: 'Golden Hour',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-orange-500 shadow-orange-200',
      icon: 'wb_twilight',
      details: 'Cooler evening breeze and comfortable tropical temperatures. Perfect for nature walks, photography, and evening jogs.',
      bestHours: 'Right now until 7:30 PM sunset',
      suggestedGear: ['Water bottle', 'Walking shoes', 'Insect repellent'],
      crowdLevelText,
      crowdColor
    };
  }

  // 5. Default Favorable Walk
  return {
    type: 'walk',
    headline: 'Good for a Walk',
    badgeText: 'Favorable Conditions',
    badgeColor: 'bg-[#006b47] text-white border-[#005235] shadow-emerald-200',
    icon: 'directions_walk',
    details: `Dry conditions (${park.currentTemp}°C, ${rainChance}% rain chance). Great for walking, jogging, cycling, and family recreation.`,
    bestHours: 'Good throughout current window',
    suggestedGear: ['Walking shoes', 'Water bottle', 'Light breathable attire'],
    crowdLevelText,
    crowdColor
  };
}

export const ActionableWeatherAdvice: React.FC<ActionableWeatherAdviceProps> = ({
  park,
  onOpenLegend,
  onOpenSafety,
  className = ''
}) => {
  const rec = getParkRecommendation(park);

  return (
    <div 
      className={`glass-card rounded-2xl p-4 sm:p-5 border transition-all duration-300 shadow-xs relative overflow-hidden bg-white/95 ${
        rec.type === 'storm' 
          ? 'border-red-300/80 bg-red-50/40' 
          : rec.type === 'umbrella'
          ? 'border-sky-300/80 bg-sky-50/40'
          : rec.type === 'hot'
          ? 'border-amber-300/80 bg-amber-50/40'
          : 'border-emerald-300/80 bg-emerald-50/30'
      } ${className}`}
      id="actionable-weather-advice-card"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs shrink-0 ${rec.badgeColor}`}>
            <span className="material-symbols-outlined text-[22px]">{rec.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Visitor Recommendation:
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${rec.badgeColor}`}>
                {rec.badgeText}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              {rec.headline}
            </h2>
          </div>
        </div>

        {/* Quick Data Legend Button */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {onOpenSafety && rec.type === 'storm' && (
            <button
              onClick={onOpenSafety}
              className="text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 px-3 py-1 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">health_and_safety</span>
              <span>Safety Measures</span>
            </button>
          )}
          {onOpenLegend && (
            <button
              onClick={onOpenLegend}
              className="text-xs font-bold text-[#006b47] bg-white hover:bg-emerald-50 border border-emerald-300/80 px-3 py-1 rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Open Data & Weather Legend guide"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006b47]">legend_toggle</span>
              <span>View Data Legend</span>
            </button>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
        {rec.details}
      </p>

      {/* Actionable Details 3-Pill Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-200/80">
        <div className="flex items-center gap-2 p-2 bg-white/80 rounded-xl border border-slate-200/70">
          <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0">schedule</span>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block leading-tight font-medium">Optimal Window:</span>
            <span className="font-bold text-slate-800 truncate text-[11px]">{rec.bestHours}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-white/80 rounded-xl border border-slate-200/70">
          <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0">backpack</span>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block leading-tight font-medium">Recommended Gear:</span>
            <span className="font-bold text-slate-800 truncate text-[11px]">{rec.suggestedGear.join(', ')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-white/80 rounded-xl border border-slate-200/70">
          <span className="material-symbols-outlined text-sky-600 text-[18px] shrink-0">groups</span>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block leading-tight font-medium">Park Footfall:</span>
            <span className="font-bold text-slate-800 truncate text-[11px]">{rec.crowdLevelText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
