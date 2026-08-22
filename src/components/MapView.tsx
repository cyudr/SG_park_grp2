import React, { useState } from 'react';
import { Park } from '../types';
import { PARKS_DATA } from '../data/parksData';
import { useGovWeather } from '../context/GovWeatherContext';
import { getRainTierInfo } from '../utils/weatherProjection';
import { GoogleSingaporeMap } from './GoogleSingaporeMap';

interface MapViewProps {
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
  onSwitchToParkView: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ currentPark, onSelectPark, onSwitchToParkView }) => {
  const [radarOverlay, setRadarOverlay] = useState(true);
  const [radarOpacity, setRadarOpacity] = useState(0.65);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'terrain' | 'clean'>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Central' | 'East' | 'North' | 'South' | 'West' | 'Islands'>('All');

  const { userLocation } = useGovWeather();
  const allParks = Object.values(PARKS_DATA);

  const filteredParks = allParks.filter((p) => {
    const matchesRegion = selectedRegion === 'All' || p.region === selectedRegion;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const handleRegionChange = (region: 'All' | 'Central' | 'East' | 'North' | 'South' | 'West' | 'Islands') => {
    setSelectedRegion(region);
    if (region !== 'All') {
      const firstInRegion = allParks.find(p => p.region === region);
      if (firstInRegion) {
        onSelectPark(firstInRegion.id);
      }
    }
  };

  const activeTier = getRainTierInfo(currentPark.rainTier || 'Low');

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300" id="map-view-container">
      
      {/* Map Control Header */}
      <div className="glass-card rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs bg-white/95 border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#006b47]">radar</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#006b47]">
              Singapore National Geospatial Radar
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Interactive Google Map overlay with real-time NEA Doppler rain squall radar and island-wide park conditions.
          </p>
        </div>

        {/* Filter & Radar toggles */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Radar On/Off Toggle */}
          <button
            onClick={() => setRadarOverlay(!radarOverlay)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
              radarOverlay
                ? 'bg-[#006b47] text-white shadow-sm ring-2 ring-emerald-600/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">radar</span>
            <span>Doppler Radar: {radarOverlay ? 'ACTIVE' : 'OFF'}</span>
          </button>

          {/* Google Maps Style Layer Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(
              [
                { id: 'roadmap', label: 'Map' },
                { id: 'satellite', label: 'Satellite' },
                { id: 'terrain', label: 'Terrain' },
                { id: 'clean', label: 'Canvas' }
              ] as const
            ).map((layer) => (
              <button
                key={layer.id}
                onClick={() => setMapType(layer.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                  mapType === layer.id
                    ? 'bg-white text-[#005235] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search park or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006b47] w-40 sm:w-52"
            />
            <span className="material-symbols-outlined text-sm text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2">
              search
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Region Selector Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-slate-600 px-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-emerald-700">filter_alt</span>
          Filter Region:
        </span>
        {(['All', 'Central', 'East', 'North', 'South', 'West', 'Islands'] as const).map((region) => (
          <button
            key={region}
            onClick={() => handleRegionChange(region)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedRegion === region
                ? 'bg-[#006b47] text-white shadow-xs font-bold scale-102'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            {region === 'All' ? '🇸🇬 All Singapore' : region === 'Islands' ? '🏝️ Offshore Islands' : `${region} Region`}
          </button>
        ))}
      </div>

      {/* Main Interactive Singapore Google Map & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Google Map with Doppler Radar Overlays */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-4 overflow-hidden relative flex flex-col shadow-xs bg-white border border-slate-200">
          
          <GoogleSingaporeMap
            parks={filteredParks}
            currentPark={currentPark}
            onSelectPark={onSelectPark}
            radarOverlay={radarOverlay}
            radarOpacity={radarOpacity}
            mapType={mapType}
            onMapTypeChange={setMapType}
            userLocation={userLocation}
            onViewForecast={onSwitchToParkView}
          />

          {/* Map bottom active selection bar */}
          <div className="mt-3 bg-slate-50 px-4 py-3 rounded-xl text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#006b47] text-xl shrink-0">location_on</span>
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {currentPark.name} ({currentPark.region} Region)
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-2 mt-0.5">
                  <span>{currentPark.currentTemp}°C</span>
                  <span>•</span>
                  <span>Feels {currentPark.feelsLike}°C</span>
                  <span>•</span>
                  <span className={`font-bold ${activeTier.color}`}>{activeTier.label} Rain Risk</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onSwitchToParkView}
              className="bg-[#006b47] hover:bg-[#005235] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>View Park Forecast</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Parks Directory List in Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-xs bg-white border border-slate-200 flex flex-col h-full max-h-[660px]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h2 className="text-sm sm:text-base font-bold text-[#006b47] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span>Singapore Locations</span>
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {filteredParks.length} locations
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {filteredParks.map((p) => {
                const isSelected = p.id === currentPark.id;
                const tierInfo = getRainTierInfo(p.rainTier || 'Low');
                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectPark(p.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-[#006b47] shadow-xs ring-1 ring-[#006b47]/40'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-slate-900 truncate max-w-[170px] sm:max-w-[210px]">
                        {p.name}
                      </div>
                      <div className="text-xs font-extrabold text-[#006b47] shrink-0 font-mono">
                        {p.currentTemp}°C
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                      <span className="truncate">{p.region} • {p.condition}</span>
                      <span className={`font-bold shrink-0 ${tierInfo.color}`}>
                        {tierInfo.label}
                      </span>
                    </div>

                    {p.nparksUrl && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">NParks Portal:</span>
                        <a
                          href={p.nparksUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-0.5"
                        >
                          Official Guide ↗
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
