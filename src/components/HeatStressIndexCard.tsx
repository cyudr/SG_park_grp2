import React, { useState } from 'react';
import { useGovWeather } from '../context/GovWeatherContext';
import { calculateHeatStressIndex } from '../services/heatStressCalculator';

export const HeatStressIndexCard: React.FC = () => {
  const { heatStressResult, currentPark } = useGovWeather();
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'simulator'>('overview');

  // Simulator states
  const [simTemp, setSimTemp] = useState(heatStressResult.temperature);
  const [simHumidity, setSimHumidity] = useState(heatStressResult.relativeHumidity);
  const [simWind, setSimWind] = useState(heatStressResult.windSpeedKmh);
  const [simUv, setSimUv] = useState(heatStressResult.uvIndex);

  const simResult = calculateHeatStressIndex(simTemp, simHumidity, simWind, simUv);

  // Risk colors
  const getRiskBadgeClasses = (risk: string) => {
    switch (risk) {
      case 'Extreme':
        return 'bg-[#93000a] text-white';
      case 'Very High':
        return 'bg-[#ba1a1a] text-white';
      case 'High':
        return 'bg-[#d97706] text-white';
      case 'Moderate':
        return 'bg-[#0284c7] text-white';
      default:
        return 'bg-[#006b47] text-white';
    }
  };

  const getRiskBgLight = (risk: string) => {
    switch (risk) {
      case 'Extreme':
        return 'bg-[#ffdad6]/60 border-[#ffb4ab] text-[#93000a]';
      case 'Very High':
        return 'bg-[#ffdad6]/40 border-[#ffb4ab] text-[#ba1a1a]';
      case 'High':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'Moderate':
        return 'bg-sky-50 border-sky-200 text-sky-900';
      default:
        return 'bg-[#e6f4ea] border-[#71dba6] text-[#005235]';
    }
  };

  return (
    <div 
      className="glass-card rounded-2xl p-6 flex flex-col justify-between shadow-xs border border-white/80 transition-all"
      id="heat-stress-index-card"
    >
      {/* Card Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d97706] text-[24px]">thermostat</span>
            <h2 className="text-fluid-card-title font-bold text-[#006b47]">
              Tropical Heat Stress Index (TP-HSI)
            </h2>
          </div>
          <p className="text-xs text-[#3e4942] mt-0.5">
            Custom Singapore outdoor physiological thermal index based on live Dry Bulb Temp, Relative Humidity, Wind, and Solar UV.
          </p>
        </div>

        {/* Mini Tab switcher */}
        <div className="flex bg-[#e0e3e1]/50 p-1 rounded-xl text-xs font-semibold gap-1 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-white text-[#006b47] shadow-xs' : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'breakdown' ? 'bg-white text-[#006b47] shadow-xs' : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
          >
            Formula
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'simulator' ? 'bg-white text-[#006b47] shadow-xs' : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
          >
            Simulator
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Main Metric Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${getRiskBgLight(heatStressResult.riskLevel)}`}>
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Heat Stress Index
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-tight font-mono leading-none">
                    {heatStressResult.heatStressIndexC}°C
                  </span>
                  <span className="text-xs font-bold opacity-80">sWBGT</span>
                </div>
              </div>

              <div className="h-10 w-px bg-current opacity-20 hidden sm:block mx-1"></div>

              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-block uppercase tracking-wider ${getRiskBadgeClasses(heatStressResult.riskLevel)}`}>
                  {heatStressResult.riskLevel} Risk
                </span>
                <div className="text-xs font-semibold mt-1">
                  Thermal Load: {heatStressResult.heatStressScore} / 100
                </div>
              </div>
            </div>

            {/* Quick stats on the right */}
            <div className="grid grid-cols-2 gap-2 text-xs w-full sm:w-auto">
              <div className="bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-white/60">
                <div className="text-[#6e7a71]">Hydration Target</div>
                <div className="font-bold text-[#006b47]">{heatStressResult.hydrationRateMlPerHr} ml/hr</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-white/60">
                <div className="text-[#6e7a71]">Apparent Temp</div>
                <div className="font-bold text-[#181c1b]">{heatStressResult.apparentTempC}°C Feels</div>
              </div>
            </div>
          </div>

          {/* Core Live Input Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-[#f8faf9] p-2.5 rounded-xl border border-[#e0e3e1] flex flex-col">
              <span className="text-[#6e7a71] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006b47]">thermostat</span>
                Air Temp (T)
              </span>
              <span className="text-base font-extrabold text-[#181c1b] mt-0.5">{heatStressResult.temperature}°C</span>
            </div>

            <div className="bg-[#f8faf9] p-2.5 rounded-xl border border-[#e0e3e1] flex flex-col">
              <span className="text-[#6e7a71] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#00629d]">humidity_percentage</span>
                Humidity (RH)
              </span>
              <span className="text-base font-extrabold text-[#181c1b] mt-0.5">{heatStressResult.relativeHumidity}%</span>
            </div>

            <div className="bg-[#f8faf9] p-2.5 rounded-xl border border-[#e0e3e1] flex flex-col">
              <span className="text-[#6e7a71] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006b47]">air</span>
                Wind (V)
              </span>
              <span className="text-base font-extrabold text-[#181c1b] mt-0.5">{heatStressResult.windSpeedKmh} km/h</span>
            </div>

            <div className="bg-[#f8faf9] p-2.5 rounded-xl border border-[#e0e3e1] flex flex-col">
              <span className="text-[#6e7a71] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#9b6c49]">light_mode</span>
                Solar UV
              </span>
              <span className="text-base font-extrabold text-[#181c1b] mt-0.5">{heatStressResult.uvIndex} UV</span>
            </div>
          </div>

          {/* Activity Recommendations */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-bold text-[#3e4942] uppercase tracking-wider">
              Activity Safety Guidelines for {currentPark.name}:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-[#f1f4f2] rounded-xl border border-[#e0e3e1]">
                <div className="font-bold text-[#006b47] flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[16px]">directions_run</span>
                  Runners & Hikers
                </div>
                <p className="text-[#3e4942] leading-relaxed">
                  {heatStressResult.activityRecommendations.runningJogging}
                </p>
              </div>

              <div className="p-3 bg-[#f1f4f2] rounded-xl border border-[#e0e3e1]">
                <div className="font-bold text-[#00629d] flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[16px]">family_restroom</span>
                  Family & Playgrounds
                </div>
                <p className="text-[#3e4942] leading-relaxed">
                  {heatStressResult.activityRecommendations.familyPlay}
                </p>
              </div>

              <div className="p-3 bg-[#f1f4f2] rounded-xl border border-[#e0e3e1]">
                <div className="font-bold text-[#9b6c49] flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[16px]">pets</span>
                  Seniors & Pet Walks
                </div>
                <p className="text-[#3e4942] leading-relaxed">
                  {heatStressResult.activityRecommendations.seniorsPets}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* BREAKDOWN & FORMULA TAB */}
      {activeTab === 'breakdown' && (
        <div className="space-y-3.5 text-xs text-[#3e4942] animate-in fade-in leading-relaxed">
          <div className="bg-[#f8faf9] p-3.5 rounded-xl border border-[#e0e3e1]">
            <h3 className="font-bold text-sm text-[#006b47] mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">functions</span>
              Singapore Tropical Heat Stress Model & Advisory Thresholds
            </h3>
            <p>
              In Singapore's equatorial climate, residents are naturally acclimatized to warm humid weather. Aligned with <strong>Meteorological Service Singapore (MSS)</strong> and <strong>SAF/Sports SG WBGT Guidelines</strong>, our formula uses higher thermal tolerance thresholds: <strong>Low (&lt;31.0°C)</strong>, <strong>Moderate (31.0°C - 32.9°C)</strong>, and <strong>High (≥33.0°C)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 bg-white rounded-xl border border-[#e0e3e1]">
              <div className="font-bold text-[#006b47] font-sans mb-1">1. Magnus Vapor Pressure (e):</div>
              <code>e = (RH/100) × 6.105 × exp((17.27 × T) / (237.7 + T))</code>
              <div className="mt-1 text-[#6e7a71]">
                Current e = <strong>{heatStressResult.vaporPressureHpa} hPa</strong> (Dew Point: {heatStressResult.dewPointC}°C)
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e0e3e1]">
              <div className="font-bold text-[#006b47] font-sans mb-1">2. Base Simplified WBGT (sWBGT):</div>
              <code>sWBGT = 0.567 × T + 0.393 × e + 3.94</code>
              <div className="mt-1 text-[#6e7a71]">
                Base sWBGT = <strong>{heatStressResult.simplifiedWbgtC}°C</strong>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e0e3e1]">
              <div className="font-bold text-[#9b6c49] font-sans mb-1">3. Solar Radiation Loading (ΔT_solar):</div>
              <code>ΔT_solar = min(UV × 0.20, 2.4)</code>
              <div className="mt-1 text-[#6e7a71]">
                Canopy-filtered solar load = <strong>+{heatStressResult.solarAdjustmentC}°C</strong> (UV {heatStressResult.uvIndex})
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#e0e3e1]">
              <div className="font-bold text-[#00629d] font-sans mb-1">4. Wind & Local Acclimatization:</div>
              <code>ΔT_wind = min((V / 12) × 1.1, 2.8) | Offset = -1.0°C</code>
              <div className="mt-1 text-[#6e7a71]">
                Breeze cooling = <strong>-{heatStressResult.windCoolingC}°C</strong> ({heatStressResult.windSpeedKmh} km/h)
              </div>
            </div>
          </div>

          <div className="bg-[#e6f4ea] p-3 rounded-xl border border-[#006b47]/30 text-[#005235]">
            <strong>Final Result:</strong> <code>TP-HSI = {heatStressResult.simplifiedWbgtC} + {heatStressResult.solarAdjustmentC} - {heatStressResult.windCoolingC} - 1.0 = <strong>{heatStressResult.heatStressIndexC}°C</strong> ({heatStressResult.riskLevel} Risk)</code>
          </div>
        </div>
      )}

      {/* SIMULATOR TAB */}
      {activeTab === 'simulator' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="text-xs text-[#3e4942]">
            Adjust the sliders below to simulate different tropical microclimates and observe how Singapore park heat stress shifts dynamically.
          </div>

          {/* Simulator Result Preview */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${getRiskBgLight(simResult.riskLevel)}`}>
            <div>
              <div className="text-xs font-bold uppercase opacity-80">Simulated Heat Stress</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono">
                {simResult.heatStressIndexC}°C sWBGT
              </div>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${getRiskBadgeClasses(simResult.riskLevel)}`}>
                {simResult.riskLevel} Risk
              </span>
              <div className="text-xs font-medium mt-1">Hydration: {simResult.hydrationRateMlPerHr} ml/hr</div>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Air Temperature:</span>
                <span className="font-mono text-[#006b47] font-bold">{simTemp}°C</span>
              </div>
              <input
                type="range"
                min="24"
                max="38"
                step="0.5"
                value={simTemp}
                onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                className="w-full accent-[#006b47]"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Relative Humidity:</span>
                <span className="font-mono text-[#00629d] font-bold">{simHumidity}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="98"
                step="1"
                value={simHumidity}
                onChange={(e) => setSimHumidity(parseInt(e.target.value, 10))}
                className="w-full accent-[#00629d]"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Wind Speed:</span>
                <span className="font-mono text-[#006b47] font-bold">{simWind} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={simWind}
                onChange={(e) => setSimWind(parseInt(e.target.value, 10))}
                className="w-full accent-[#006b47]"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span>Solar UV Index:</span>
                <span className="font-mono text-[#9b6c49] font-bold">{simUv}</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="1"
                value={simUv}
                onChange={(e) => setSimUv(parseInt(e.target.value, 10))}
                className="w-full accent-[#9b6c49]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setSimTemp(heatStressResult.temperature);
                setSimHumidity(heatStressResult.relativeHumidity);
                setSimWind(heatStressResult.windSpeedKmh);
                setSimUv(heatStressResult.uvIndex);
              }}
              className="text-xs text-[#006b47] hover:underline font-semibold"
            >
              Reset to Current Live Readings
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
