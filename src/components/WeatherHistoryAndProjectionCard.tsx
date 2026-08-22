import React, { useState } from 'react';
import { Park, WeatherProjectionResult, DailyForecast, HistoricalDataPoint } from '../types';
import { calculateOnDemandProjection, getRainTierInfo, getPark3DayForecast, getParkHistorical24h } from '../utils/weatherProjection';
import { getSingaporeNow, getSingaporeDateISO, getSingaporeHour } from '../utils/timeUtils';

interface WeatherHistoryAndProjectionCardProps {
  park: Park;
}

export const WeatherHistoryAndProjectionCard: React.FC<WeatherHistoryAndProjectionCardProps> = ({ park }) => {
  // Navigation tabs: 'forecast' (Feature A), 'historical' (Feature A), 'ondemand' (Feature B)
  const [activeTab, setActiveTab] = useState<'forecast' | 'historical' | 'ondemand'>('forecast');

  // Today + 7 days max constraint using Singapore Time
  const now = getSingaporeNow();
  const todayStr = getSingaporeDateISO(now);
  const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
  const maxDateStr = getSingaporeDateISO(maxDate);

  const initialHour = (getSingaporeHour(now) + 1) % 24;
  const initialTimeStr = `${String(initialHour).padStart(2, '0')}:00`;

  // Feature B On-Demand State
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>(initialTimeStr);
  const [projectionResult, setProjectionResult] = useState<WeatherProjectionResult | null>(() => 
    calculateOnDemandProjection(park, todayStr, initialTimeStr)
  );
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Recalculate projection on demand
  const handleRunProjection = (dateVal: string, timeVal: string) => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = calculateOnDemandProjection(park, dateVal, timeVal);
      setProjectionResult(res);
      setIsCalculating(false);
    }, 200);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    handleRunProjection(val, selectedTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedTime(val);
    handleRunProjection(selectedDate, val);
  };

  // Quick preset shortcuts
  const applyPreset = (daysFromNow: number, timeStr: string) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysFromNow);
    const dStr = getSingaporeDateISO(d);
    setSelectedDate(dStr);
    setSelectedTime(timeStr);
    handleRunProjection(dStr, timeStr);
  };

  const historicalPoints: HistoricalDataPoint[] = 
    (park.historical24h && park.historical24h.length > 0) ? park.historical24h : getParkHistorical24h(park);
  const forecastDays: DailyForecast[] = 
    (park.forecast3Day && park.forecast3Day.length > 0) ? park.forecast3Day : getPark3DayForecast(park);

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border border-[#dbe5dd]/80"
      id="weather-history-projection-card"
    >
      {/* Top Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#dbe5dd]/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006b47]/10 text-[#006b47] flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">insights</span>
            </div>
            <div>
              <h2 className="text-fluid-card-title font-bold text-[#191c1a] leading-tight">
                Weather Forecast, History & Projection
              </h2>
              <p className="text-xs text-[#3e4942]">
                3-Day Synoptic Outlook & On-Demand Meteorological Simulator
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#f0f4f1] p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'forecast' 
                ? 'bg-white text-[#006b47] shadow-sm font-bold' 
                : 'text-[#3e4942] hover:text-[#191c1a]'
            }`}
            id="tab-forecast-btn"
          >
            <span className="material-symbols-outlined text-[15px]">calendar_month</span>
            <span>3-Day Forecast</span>
          </button>

          <button
            onClick={() => setActiveTab('historical')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'historical' 
                ? 'bg-white text-[#006b47] shadow-sm font-bold' 
                : 'text-[#3e4942] hover:text-[#191c1a]'
            }`}
            id="tab-historical-btn"
          >
            <span className="material-symbols-outlined text-[15px]">history</span>
            <span>24h History</span>
          </button>

          <button
            onClick={() => setActiveTab('ondemand')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ondemand' 
                ? 'bg-[#006b47] text-white shadow-sm font-bold' 
                : 'text-[#006b47] hover:bg-white/60'
            }`}
            id="tab-ondemand-btn"
          >
            <span className="material-symbols-outlined text-[15px]">online_prediction</span>
            <span>On-Demand Simulation</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 3-DAY ESTIMATION FORECAST (FEATURE A) */}
      {activeTab === 'forecast' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-[#3e4942] flex-wrap gap-2">
            <span className="font-medium">
              3-Day synoptic estimation for <strong>{park.name}</strong> ({park.region} Region)
            </span>
            <span className="text-[11px] bg-[#eef7f1] text-[#006b47] font-semibold px-2 py-0.5 rounded-md border border-[#71dba6]/30">
              Singapore Meteorological Microclimate Model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecastDays.map((day, idx) => {
              const rainPercent = day.rainChance !== undefined ? day.rainChance : (day.rainProbability !== undefined ? day.rainProbability : 25);
              const tierInfo = getRainTierInfo(day.rainTier || 'Low');
              const isToday = idx === 0;
              const maxT = day.tempMax ?? day.maxTemp ?? park.currentTemp;
              const minT = day.tempMin ?? day.minTemp ?? 25;
              const iconName = day.icon || day.conditionIcon || 'partly_cloudy_day';
              const dayLabel = day.dayName || day.date || (idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : 'Day 3');

              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    isToday ? 'bg-gradient-to-br from-[#f4faf6] to-white border-[#006b47]/35 ring-2 ring-[#006b47]/15 shadow-sm' : 'bg-white/90 border-slate-200/90'
                  }`}
                >
                  <div>
                    {/* Top Day Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">{dayLabel}</span>
                        {isToday && (
                          <span className="text-[10px] bg-[#006b47] text-white px-2 py-0.5 rounded-full font-bold">
                            Live Today
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{day.date}</span>
                    </div>

                    {/* Main Condition & Temp Display */}
                    <div className="flex items-center justify-between my-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-3xl">
                            {iconName}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 leading-tight">
                            {day.condition}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Max UV: {day.uvMax}/12 • {day.humidity || 75}% Humidity
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                          {maxT}°C
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          Low {minT}°C
                        </div>
                      </div>
                    </div>

                    {/* Rain Chance Progress Bar */}
                    <div className="my-2.5 bg-slate-100 rounded-lg p-2.5 border border-slate-200/60">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-blue-600">rainy</span>
                          Precipitation Probability
                        </span>
                        <span className="font-bold text-slate-900 font-mono">{rainPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            rainPercent >= 60 ? 'bg-rose-500' : rainPercent >= 25 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${rainPercent}%` }}
                        />
                      </div>
                    </div>

                    {day.description && (
                      <p className="text-xs text-slate-600 line-clamp-2 my-2 leading-relaxed">
                        {day.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Meta Badges */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs flex-wrap">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${tierInfo.badgeBg} ${tierInfo.badgeText} ${tierInfo.badgeBorder}`}>
                      {tierInfo.tier} Risk
                    </span>
                    <span className="text-[11px] text-[#006b47] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      {day.bestWindow || '07:30 AM - 10:30 AM'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Insight Bar */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <span className="material-symbols-outlined text-lg text-emerald-700">recommend</span>
              <span>
                <strong>Singapore Tropical Climate Tip:</strong> Early morning hours (07:30 - 10:30 AM) offer lowest heat strain and minimal thundery shower risks across all regions.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('ondemand')}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Test specific date & time</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: 24-HOUR HISTORICAL WEATHER DATA (FEATURE A) */}
      {activeTab === 'historical' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-[#3e4942]">
            <span className="font-medium">
              Past 24-Hour Telemetry records from nearest NEA weather station to <strong>{park.name}</strong>
            </span>
            <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
              Station Altitude: 18m ASL
            </span>
          </div>

          {/* Table / Grid of 24h Telemetry */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="p-2.5">Time Log</th>
                  <th className="p-2.5">Temperature</th>
                  <th className="p-2.5">Historical Rainfall</th>
                  <th className="p-2.5">Relative Humidity</th>
                  <th className="p-2.5">Recorded Condition</th>
                  <th className="p-2.5">Air Quality (PSI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historicalPoints.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold font-mono text-slate-800">
                      {item.time}
                    </td>
                    <td className="p-2.5 font-semibold text-slate-900">
                      {item.temp}°C
                    </td>
                    <td className="p-2.5">
                      {item.rainfallMm > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200">
                          <span className="material-symbols-outlined text-[13px]">water_drop</span>
                          {item.rainfallMm} mm
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0.0 mm (Dry)</span>
                      )}
                    </td>
                    <td className="p-2.5 text-slate-700 font-mono">
                      {item.humidity}%
                    </td>
                    <td className="p-2.5 text-slate-700">
                      {item.condition}
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                        {item.psi} (Good)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ON-DEMAND WEATHER PROJECTION (FEATURE B) */}
      {activeTab === 'ondemand' && (
        <div className="space-y-4 animate-in fade-in" id="ondemand-projection-section">
          {/* Controls Bar: Date & Time Picker */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Select Target Date (Within 1 Week / 7 Days)
                </label>
                <input
                  type="date"
                  min={todayStr}
                  max={maxDateStr}
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006b47]"
                  id="projection-date-picker"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Select Planned Time of Day
                </label>
                <select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006b47]"
                  id="projection-time-picker"
                >
                  <option value="07:00">07:00 AM (Early Morning Stride)</option>
                  <option value="09:00">09:00 AM (Morning Exercise / Dog Walk)</option>
                  <option value="11:30">11:30 AM (Midday Stroll / Lunch)</option>
                  <option value="14:00">02:00 PM (Afternoon Tropical Peak)</option>
                  <option value="16:00">04:00 PM (Late Afternoon Convection)</option>
                  <option value="17:30">05:30 PM (Golden Hour / Sunset)</option>
                  <option value="19:30">07:30 PM (Evening Night Walk)</option>
                  <option value="21:00">09:00 PM (Cool Breeze Night)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => handleRunProjection(selectedDate, selectedTime)}
                  disabled={isCalculating}
                  className="w-full md:w-auto px-4 py-2 bg-[#006b47] hover:bg-[#005436] text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  id="run-simulation-btn"
                >
                  <span className={`material-symbols-outlined text-[16px] ${isCalculating ? 'animate-spin' : ''}`}>
                    {isCalculating ? 'autorenew' : 'bolt'}
                  </span>
                  <span>{isCalculating ? 'Calculating...' : 'Run Simulation'}</span>
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-slate-500 font-semibold text-[11px]">Quick Presets:</span>
              <button
                onClick={() => applyPreset(1, '08:00')}
                className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-medium transition-colors"
              >
                Tomorrow Morning (8 AM)
              </button>
              <button
                onClick={() => applyPreset(1, '16:00')}
                className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-medium transition-colors"
              >
                Tomorrow Afternoon (4 PM)
              </button>
              <button
                onClick={() => applyPreset(2, '17:30')}
                className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-medium transition-colors"
              >
                +2 Days Sunset (5:30 PM)
              </button>
              <button
                onClick={() => applyPreset(5, '09:00')}
                className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-medium transition-colors"
              >
                +5 Days Weekend (9 AM)
              </button>
            </div>
          </div>

          {/* Simulation Output Card */}
          {projectionResult && (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 shadow-xl border border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-2xl">
                    online_prediction
                  </span>
                  <div>
                    <h3 className="text-base font-bold">
                      Projected Conditions for {park.name}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Date: <strong>{projectionResult.targetDate}</strong> @ <strong>{projectionResult.targetTime}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Model Confidence:</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                    {projectionResult.confidenceScore}% Accurate
                  </span>
                </div>
              </div>

              {/* 4-Stat Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {/* 1. Temp & Feels Like */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm text-amber-400">thermostat</span>
                    <span>Temperature</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {projectionResult.projectedTemp}°C
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Feels like <strong>{projectionResult.projectedFeelsLike}°C</strong>
                  </div>
                </div>

                {/* 2. Rain Probability & Tier */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm text-blue-400">rainy</span>
                    <span>Rain Probability</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {projectionResult.rainChance}%
                  </div>
                  <div className="text-[11px] font-bold">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                      projectionResult.rainTier === 'Low' ? 'bg-emerald-500/30 text-emerald-300' :
                      projectionResult.rainTier === 'Medium' ? 'bg-amber-500/30 text-amber-300' :
                      'bg-red-500/30 text-red-300'
                    }`}>
                      {projectionResult.rainTier} Rain Risk Tier
                    </span>
                  </div>
                </div>

                {/* 3. Heat Stress Level */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm text-orange-400">local_fire_department</span>
                    <span>Heat Strain</span>
                  </div>
                  <div className="text-lg font-bold text-white truncate">
                    {projectionResult.heatStressLevel} Risk
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Score: {projectionResult.heatStressScore}/100
                  </div>
                </div>

                {/* 4. UV Index & Wind */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-sm text-yellow-400">wb_sunny</span>
                    <span>UV & Breeze</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    UV {projectionResult.uvIndex}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    Wind: {projectionResult.windSpeed}
                  </div>
                </div>
              </div>

              {/* Actionable Visit Recommendation */}
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-200">
                <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0 mt-0.5">
                  info
                </span>
                <div>
                  <div className="font-bold text-white mb-0.5">
                    Actionable Visiting Advice:
                  </div>
                  <p>{projectionResult.recommendation}</p>
                  {projectionResult.bestAlternateWindow && (
                    <p className="mt-1 text-emerald-300 font-medium">
                      💡 <strong>Alternate Window:</strong> {projectionResult.bestAlternateWindow}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
