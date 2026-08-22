import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Park } from '../types';
import { PARKS_DATA } from '../data/parksData';
import { useGovWeather } from '../context/GovWeatherContext';
import { calculateDistanceKm } from '../utils/geolocation';
import { getRainTierInfo } from '../utils/weatherProjection';

interface ParkDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
}

export const ParkDirectoryModal: React.FC<ParkDirectoryModalProps> = ({
  isOpen,
  onClose,
  currentPark,
  onSelectPark
}) => {
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<'All' | 'Favorites' | 'Central' | 'East' | 'North' | 'South' | 'West' | 'Islands' | 'Nature Reserve'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { userLocation, favoriteParkIds, toggleFavorite, isFavorite } = useGovWeather();

  const allParks = useMemo(() => Object.values(PARKS_DATA), []);

  const filteredParks = useMemo(() => {
    return allParks.filter((p) => {
      // Area or category or favorites filter
      const matchesArea = 
        selectedAreaFilter === 'All' ? true :
        selectedAreaFilter === 'Favorites' ? favoriteParkIds.includes(p.id) :
        selectedAreaFilter === 'Nature Reserve' ? p.category === 'Nature Reserve' :
        p.region === selectedAreaFilter;

      // Keyword search
      const matchesSearch = 
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.facilities.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesArea && matchesSearch;
    });
  }, [allParks, selectedAreaFilter, searchQuery, favoriteParkIds]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
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

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      id="park-directory-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="park-directory-title"
    >
      <div 
        className="relative my-auto w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden shrink-0 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="park-directory-modal-container"
      >
        {/* Modal Header & Search */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-[#005235] to-emerald-950 text-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined text-2xl">travel_explore</span>
              </div>
              <div>
                <h2 id="park-directory-title" className="text-base sm:text-lg font-bold leading-tight">
                  Singapore Parks Directory
                </h2>
                <p className="text-xs text-emerald-200">
                  Live weather and visitor guides for 30+ Singapore parks & nature reserves
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Close popup"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Search Bar & Location Badge */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by park name, region, or facility..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 bg-white/95 text-slate-900 placeholder:text-slate-400 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                id="park-modal-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {userLocation && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 text-xs text-emerald-100 shrink-0">
                <span className="material-symbols-outlined text-sm text-emerald-300">my_location</span>
                <span>GPS: {userLocation.nearestParkName} ({userLocation.distanceKm} km)</span>
              </div>
            )}
          </div>

          {/* Area Tier Switcher Tabs */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-emerald-800/80">
            {(['All', 'Favorites', 'Central', 'East', 'North', 'South', 'West', 'Islands', 'Nature Reserve'] as const).map((area) => (
              <button
                key={area}
                onClick={() => setSelectedAreaFilter(area)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedAreaFilter === area
                    ? 'bg-white text-[#005235] shadow-sm font-bold scale-105'
                    : 'bg-emerald-950/40 text-emerald-100 hover:bg-white/20'
                }`}
              >
                {area === 'Favorites' ? (
                  <>
                    <span className="material-symbols-outlined text-[14px] text-amber-400">star</span>
                    <span>Favorites ({favoriteParkIds.length})</span>
                  </>
                ) : area === 'All' ? 'All Areas' : area === 'Nature Reserve' ? '🌲 Nature Reserves' : area === 'Islands' ? '🏝️ Offshore Islands' : `${area} Region`}
              </button>
            ))}
          </div>
        </div>

        {/* Park List Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0 bg-slate-50 divide-y divide-slate-100 overscroll-contain">
          {filteredParks.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2 text-slate-400">
                {selectedAreaFilter === 'Favorites' ? 'star_outline' : 'search_off'}
              </span>
              <p className="text-sm font-semibold">
                {selectedAreaFilter === 'Favorites' 
                  ? 'No favorite parks saved yet' 
                  : `No Singapore parks found matching "${searchQuery}"`}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {selectedAreaFilter === 'Favorites'
                  ? 'Click the star icon on any park card to save it as a favorite'
                  : 'Try clearing your search or switching area filter'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredParks.map((p) => {
                const isSelected = p.id === currentPark.id;
                const isFav = isFavorite(p.id);
                const tierInfo = getRainTierInfo(p.rainTier || 'Low');
                const dist = userLocation?.lat && userLocation?.lng && p.lat && p.lng
                  ? calculateDistanceKm(userLocation.lat, userLocation.lng, p.lat, p.lng)
                  : null;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPark(p.id);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#006b47] ring-2 ring-[#006b47]/20'
                        : 'bg-white border-slate-200/90 hover:border-emerald-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-sm text-slate-900 truncate">
                              {p.name}
                            </h3>
                            {isSelected && (
                              <span className="text-[10px] bg-[#006b47] text-white px-2 py-0.5 rounded-full font-semibold">
                                Current
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p.id);
                              }}
                              className={`p-1 rounded-full transition-colors cursor-pointer ${
                                isFav ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-amber-500'
                              }`}
                              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {isFav ? 'star' : 'star_border'}
                              </span>
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="font-semibold text-emerald-800">{p.region} Region</span>
                            <span>•</span>
                            <span>{p.category || 'Park'}</span>
                            {dist !== null && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-emerald-700 font-semibold">{dist} km away</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-bold text-slate-900 font-mono">
                            {p.currentTemp}°C
                          </span>
                          <div className="text-[10px] text-slate-400 font-medium">
                            Feels {p.feelsLike}°C
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {p.summary}
                      </p>
                    </div>

                    {/* Card Bottom Meta & NParks Direct Link */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      {/* Rain Tier Badge */}
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${tierInfo.badgeBg} ${tierInfo.badgeText} ${tierInfo.badgeBorder}`}>
                        {tierInfo.tier} Rain Risk ({p.rainProbability[0]?.percentage || 10}%)
                      </span>

                      {/* Official NParks Portal Link */}
                      {p.nparksUrl && (
                        <a
                          href={p.nparksUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-colors"
                          title={`Visit official NParks portal for ${p.name}`}
                        >
                          <span>NParks Portal</span>
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Showing {filteredParks.length} of {allParks.length} Singapore Parks</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
