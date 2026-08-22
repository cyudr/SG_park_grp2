import React, { useState } from 'react';
import { NearbyPark } from '../types';
import { useGovWeather } from '../context/GovWeatherContext';

interface NearbyParksCardProps {
  nearby: NearbyPark[];
  onSelectPark: (parkId: string) => void;
}

// Maps any condition/icon string safely to standard Material Symbols ligatures
const getValidWeatherIcon = (icon?: string, condition?: string): string => {
  const s = `${icon || ''} ${condition || ''}`.toLowerCase();
  if (s.includes('thunder') || s.includes('lightning')) return 'thunderstorm';
  if (s.includes('heavy') || s.includes('downpour')) return 'rainy';
  if (s.includes('shower') || s.includes('rain')) return 'rainy';
  if (s.includes('partly') || s.includes('scattered') || s.includes('cloud')) return 'partly_cloudy_day';
  if (s.includes('overcast') || s.includes('mist') || s.includes('fog')) return 'cloud';
  if (s.includes('forest') || s.includes('canopy') || s.includes('tree')) return 'park';
  if (s.includes('historic') || s.includes('fort') || s.includes('ruin')) return 'castle';
  if (s.includes('quarry') || s.includes('hill') || s.includes('peak')) return 'terrain';
  if (s.includes('beach') || s.includes('coast') || s.includes('sea') || s.includes('island')) return 'waves';
  if (s.includes('night')) return 'nights_stay';
  return 'wb_sunny';
};

export const NearbyParksCard: React.FC<NearbyParksCardProps> = ({ nearby, onSelectPark }) => {
  const { isFavorite, toggleFavorite } = useGovWeather();
  const [filterFavsOnly, setFilterFavsOnly] = useState(false);

  const displayedParks = filterFavsOnly
    ? nearby.filter((p) => isFavorite(p.id))
    : nearby;

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 shadow-xs border border-[#bdcac0]/40 bg-white/95 transition-all duration-300"
      id="nearby-parks-card"
    >
      {/* Header section with expanded controls */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-fluid-card-title font-bold text-[#006b47] flex items-center gap-2">
          <span className="material-symbols-outlined text-[24px] text-[#006b47]">
            near_me
          </span>
          <span>Nearby Green Spaces</span>
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterFavsOnly(!filterFavsOnly)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer border flex items-center gap-1 ${
              filterFavsOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-[#eef7f1] text-[#005235] hover:bg-[#e1f0e6] border-[#006b47]/20'
            }`}
            title={filterFavsOnly ? 'Show all nearby' : 'Show starred favorites only'}
          >
            <span className="material-symbols-outlined text-[13px]">
              {filterFavsOnly ? 'star' : 'filter_list'}
            </span>
            <span>{filterFavsOnly ? 'Starred' : `${nearby.length} Parks`}</span>
          </button>
        </div>
      </div>

      {displayedParks.length === 0 ? (
        <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <span className="material-symbols-outlined text-slate-400 text-3xl mb-1">star_border</span>
          <p className="text-xs text-slate-500 font-medium">No favorite parks marked nearby yet.</p>
          <button
            onClick={() => setFilterFavsOnly(false)}
            className="text-xs text-[#006b47] font-bold mt-2 hover:underline cursor-pointer"
          >
            View All Nearby Parks
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {displayedParks.map((item, idx) => {
            const iconName = getValidWeatherIcon(item.icon, item.condition);
            const isFav = isFavorite(item.id);
            const isClosest = idx === 0;

            return (
              <div
                key={item.id}
                onClick={() => onSelectPark(item.id)}
                className="p-3.5 sm:p-4 rounded-xl bg-[#f8faf8] hover:bg-[#edf5f0] border border-[#e3ebe5] hover:border-[#006b47]/30 transition-all text-left group cursor-pointer shadow-2xs hover:shadow-xs"
                title={`Switch view to ${item.name} (${item.distanceKm} km away)`}
              >
                {/* Top Row: Park Name, Favorite Star, and Temperature + Icon */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5 flex-1 min-w-0">
                    <span className="text-sm sm:text-base font-bold text-[#181c1b] group-hover:text-[#006b47] transition-colors leading-snug break-words">
                      {item.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 mt-[-2px] ${
                        isFav ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-amber-500'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isFav ? 'star' : 'star_border'}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-base sm:text-lg font-bold text-[#181c1b] font-mono leading-none">
                      {item.temp}°C
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#eef7f1] flex items-center justify-center text-[#006b47] group-hover:bg-[#006b47] group-hover:text-white transition-colors shrink-0">
                      <span 
                        className="material-symbols-outlined text-[20px]"
                        aria-hidden="true"
                      >
                        {iconName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Proximity Badge + Weather Condition Badge */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Distance Pill */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005235] bg-[#eef7f1] px-2 py-0.5 rounded-md border border-[#006b47]/15">
                      <span className="material-symbols-outlined text-[13px] text-[#006b47]">near_me</span>
                      <span>{item.distanceKm} km away</span>
                    </span>

                    {/* Closest Highlight Tag */}
                    {isClosest && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Closest
                      </span>
                    )}

                    {/* Weather Condition Chip */}
                    {item.condition && (
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.condition}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-[#006b47] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 ml-auto">
                    <span>View</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
