import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DataLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: 'all' | 'rain' | 'heat' | 'uv' | 'crowd' | 'transit' | 'air';
}

export const DataLegendModal: React.FC<DataLegendModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'all'
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rain' | 'heat' | 'uv' | 'crowd' | 'transit' | 'air'>(initialSection);

  useEffect(() => {
    setActiveFilter(initialSection);
  }, [initialSection]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      id="data-legend-modal-backdrop"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="glass-card bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="data-legend-modal-content"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005235] via-[#006b47] to-emerald-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-emerald-200">
              <span className="material-symbols-outlined text-[24px]">legend_toggle</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight flex items-center gap-2">
                <span>Weather & Metrics Data Legend</span>
              </h2>
              <p className="text-xs text-emerald-100">Official NEA, MSS, & NParks telemetry benchmark guides</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold shrink-0">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mr-1 shrink-0">Filter:</span>
          {[
            { id: 'all', label: 'All Metrics' },
            { id: 'rain', label: 'Rain Risk' },
            { id: 'heat', label: 'Heat Stress (WBGT)' },
            { id: 'uv', label: 'UV Index' },
            { id: 'crowd', label: 'Crowd Density' },
            { id: 'transit', label: 'LTA Bus & Transit' },
            { id: 'air', label: 'PSI & Air Quality' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-[#006b47] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs">
          
          {/* SECTION 1: RAIN PROBABILITY */}
          {(activeFilter === 'all' || activeFilter === 'rain') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">rainy</span>
                <span>Rain Probability Risk Tiers</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Computed from live NEA 5-minute radar reflectivity, Doppler convective clouds, and local weather station rain gauges.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900">Low Risk (0% – 20%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Mostly dry skies. Passing fair-weather clouds; optimal for walking, running, and outdoor sports.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-900">Moderate (21% – 50%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Possible scattered localized tropical showers. Keep an umbrella handy and stay near park pavilions.</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-900">High Risk (&gt; 50%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">High chance of moderate-to-heavy convective downpours or thundery showers. Plan indoor backup.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HEAT STRESS (WBGT) */}
          {(activeFilter === 'all' || activeFilter === 'heat') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">thermostat</span>
                <span>Tropical Park Heat Stress Index (WBGT Guidelines)</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Wet Bulb Globe Temperature (WBGT) combines air temperature, humidity, wind velocity, and solar radiation to measure thermal stress on the human body.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900">Low (&lt; 31°C WBGT)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Low risk of heat injury. Normal outdoor physical activities and running can proceed as usual.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-900">Moderate (31°C – 33°C)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Moderate heat stress. Drink water every 20-30 minutes, wear light clothing, and take regular rests in shade.</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-900">High (&gt; 33°C WBGT)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Elevated risk of heat exhaustion/stroke. Minimize prolonged vigorous physical exertion during peak hours.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: UV INDEX */}
          {(activeFilter === 'all' || activeFilter === 'uv') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">wb_sunny</span>
                <span>Solar Ultraviolet (UV) Index Scale</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-emerald-900 block">1 – 2 Low</span>
                  <span className="text-[10px] text-slate-600">No protection required for healthy skin.</span>
                </div>
                <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-yellow-900 block">3 – 5 Moderate</span>
                  <span className="text-[10px] text-slate-600">Wear sunglasses, SPF30+ hat in open areas.</span>
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-amber-900 block">6 – 7 High</span>
                  <span className="text-[10px] text-slate-600">Apply SPF50+ sunscreen, seek shade at midday.</span>
                </div>
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-red-900 block">8 – 10 Very High</span>
                  <span className="text-[10px] text-slate-600">Extra protection essential. Avoid midday sun.</span>
                </div>
                <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-xs font-bold text-purple-900 block">11+ Extreme</span>
                  <span className="text-[10px] text-slate-600">Severe sunburn risk within 15 min without cover.</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: PARK CROWD MONITORING */}
          {(activeFilter === 'all' || activeFilter === 'crowd') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">groups</span>
                <span>NParks Park Crowd & Footfall Density</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900">Low Density (&lt; 40%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Serene atmosphere with uncrowded running tracks, ample benches, and quiet picnic lawns.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-900">Moderate (40% – 75%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Normal steady visitor flow. Playgrounds, dog runs, and cycling trails are active but comfortable.</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-900">High Density (&gt; 75%)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Peak weekend or holiday activity. Carpark wait times possible; consider nearby park alternatives.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: LTA BUS & TRANSIT */}
          {(activeFilter === 'all' || activeFilter === 'transit') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">directions_bus</span>
                <span>LTA DataMall Bus Passenger Load Indicators</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-900">Seats Available (SEA)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Bus has available seating capacity. Comfortable for families and carrying gear.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-900">Standing Available (SDA)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Seats are occupied, but standing space is readily available.</p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-rose-900">Limited Standing (LSD)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  </div>
                  <p className="text-slate-700 leading-snug">Bus is near maximum capacity. You may wish to wait for the subsequent bus.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: AIR QUALITY (PSI & PM2.5) */}
          {(activeFilter === 'all' || activeFilter === 'air') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#006b47] border-b pb-1.5 border-emerald-100">
                <span className="material-symbols-outlined text-lg">air</span>
                <span>Pollutant Standards Index (PSI) & 1-hr PM2.5</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="font-bold text-emerald-900 block mb-1">Good (PSI 0 – 50)</span>
                  <p className="text-slate-700 leading-snug">Air quality is clean and healthy. All outdoor activities can be enjoyed normally.</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="font-bold text-blue-900 block mb-1">Moderate (PSI 51 – 100)</span>
                  <p className="text-slate-700 leading-snug">Acceptable air quality for general public; sensitive individuals should monitor symptoms.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <span className="font-bold text-amber-900 block mb-1">Unhealthy (PSI 101 – 200)</span>
                  <p className="text-slate-700 leading-snug">Haze conditions. Reduce prolonged strenuous outdoor exertion; wear appropriate masks if needed.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-slate-500">Telemetry updated in real-time from GovTech & NEA APIs</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#006b47] hover:bg-[#005235] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
          >
            Got It
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
