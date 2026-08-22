import React from 'react';
import { NATIONAL_ALERTS } from '../data/parksData';
import { Park } from '../types';

interface AlertsViewProps {
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
  onOpenParkPass: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ currentPark, onOpenParkPass }) => {
  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300" id="alerts-view-container">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-[#ba1a1a] flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px]">warning</span>
            Meteorological Alerts & Park Safety Advisory
          </h1>
          <p className="text-sm text-[#3e4942] mt-0.5">
            Active warnings from Meteorological Service Singapore (MSS) and National Parks Board (NParks).
          </p>
        </div>

        <button
          onClick={onOpenParkPass}
          className="bg-[#006b47] hover:bg-[#00875a] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">roofing</span>
          <span>Find Shelters Directory</span>
        </button>
      </div>

      {/* Active Bulletins */}
      <div className="flex flex-col gap-4">
        {NATIONAL_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`glass-card rounded-2xl p-5 border-l-4 shadow-xs ${
              alert.severity === 'high'
                ? 'border-l-[#ba1a1a] bg-[#ffdad6]/40'
                : alert.severity === 'medium'
                ? 'border-l-[#9b6c49] bg-[#ffdcc5]/40'
                : 'border-l-[#006b47] bg-[#e6f4ea]/40'
            }`}
          >
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    alert.severity === 'high'
                      ? 'text-[#ba1a1a]'
                      : alert.severity === 'medium'
                      ? 'text-[#9b6c49]'
                      : 'text-[#006b47]'
                  }`}
                >
                  {alert.severity === 'high' ? 'thunderstorm' : alert.severity === 'medium' ? 'wb_sunny' : 'info'}
                </span>
                <h3 className="text-base font-bold text-[#181c1b]">{alert.title}</h3>
              </div>

              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 text-[#3e4942]">
                Valid: {alert.timeWindow}
              </span>
            </div>

            <p className="text-sm text-[#3e4942] leading-relaxed mb-3">
              {alert.description}
            </p>

            <div className="flex items-center justify-between text-xs font-semibold text-[#006b47]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Meteorological Telemetry
              </span>
              <button 
                onClick={onOpenParkPass}
                className="underline hover:text-[#00875a] cursor-pointer"
              >
                {alert.actionText || 'View Safety Measures →'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Protocol Guide for Tropical Park Visitors */}
      <div className="glass-card rounded-2xl p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#006b47] mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined">health_and_safety</span>
          Tropical Park Safety Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-[#f1f4f2] rounded-xl">
            <div className="font-bold text-[#006b47] flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Lightning Protection (30/30 Rule)
            </div>
            <p className="text-[#3e4942] leading-relaxed">
              Singapore is one of the lightning capitals of the world. If thunder is heard, immediately proceed to designated park pavilions equipped with lightning conductors. Avoid open fields and lone tall trees.
            </p>
          </div>

          <div className="p-3.5 bg-[#f1f4f2] rounded-xl">
            <div className="font-bold text-[#006b47] flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-[18px]">flood</span>
              River & Canal Water Levels
            </div>
            <p className="text-[#3e4942] leading-relaxed">
              During heavy downpours, naturalized waterways (such as Bishan-Ang Mo Kio Park river) can rise rapidly within 10 minutes. Step back from the river edge when red warning sirens flash.
            </p>
          </div>

          <div className="p-3.5 bg-[#f1f4f2] rounded-xl">
            <div className="font-bold text-[#006b47] flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
              Heat Index & Hydration
            </div>
            <p className="text-[#3e4942] leading-relaxed">
              Tropical ambient temperatures of 31°C - 33°C combine with 75%+ relative humidity to yield "feels like" index of 35°C+. Drink water every 20-30 minutes and rest in shaded spots.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
