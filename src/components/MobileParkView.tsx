import React from 'react';
import { Park, AppTab } from '../types';
import { useGovWeather } from '../context/GovWeatherContext';
import { useLanguage } from '../context/LanguageContext';
import { PARKS_DATA, NATIONAL_ALERTS } from '../data/parksData';
import { SaveAppShortcutButton } from './SaveAppShortcutButton';
import { GoogleAdZone } from './GoogleAdZone';
import { RainProbabilityCard } from './RainProbabilityCard';
import { HeatStressIndexCard } from './HeatStressIndexCard';
import { WeatherHistoryAndProjectionCard } from './WeatherHistoryAndProjectionCard';
import { UVIndexCard } from './UVIndexCard';
import { BestTimeToVisitCard } from './BestTimeToVisitCard';
import { SolarTimesCard } from './SolarTimesCard';
import { ParkTransportCard } from './ParkTransportCard';
import { NearbyParksCard } from './NearbyParksCard';
import { RecentAlertsCard } from './RecentAlertsCard';
import { MiniMapCard } from './MiniMapCard';

interface MobileParkViewProps {
  park: Park;
  onSelectPark: (parkId: string) => void;
  onOpenQrPass: () => void;
  onOpenPlanModal: () => void;
  onNavigateTab: (tab: AppTab) => void;
}

export const MobileParkView: React.FC<MobileParkViewProps> = ({
  park,
  onSelectPark,
  onOpenQrPass,
  onOpenPlanModal,
  onNavigateTab,
}) => {
  const { 
    requestUserLocation, 
    isLocatingUser,
    favoriteParkIds,
    isFavorite,
    toggleFavorite,
  } = useGovWeather();

  const { t } = useLanguage();
  const isCurrentFav = isFavorite(park.id);

  // Popular & favorite parks for the quick horizontal strip
  const quickParkList = Object.values(PARKS_DATA);

  // Weather icon mapping
  const getWeatherIcon = (iconStr: string, condition: string): string => {
    const s = (iconStr + ' ' + condition).toLowerCase();
    if (s.includes('thunder')) return 'thunderstorm';
    if (s.includes('rain') || s.includes('shower')) return 'rainy';
    if (s.includes('partly') || s.includes('cloud')) return 'partly_cloudy_day';
    if (s.includes('night')) return 'nights_stay';
    return 'wb_sunny';
  };

  const weatherIconName = getWeatherIcon(park.conditionIcon, park.condition);

  return (
    <div 
      className="flex flex-col gap-5 pb-10 w-full max-w-md mx-auto animate-in fade-in duration-200 overflow-x-hidden touch-pan-y" 
      id="mobile-park-view"
    >
      
      {/* 1. Quick Horizontal Park Switcher Carousel */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="overflow-x-auto pb-1.5 flex items-center gap-2 no-scrollbar overscroll-x-contain touch-pan-x w-full">
          {quickParkList.map((p) => {
            const isSelected = p.id === park.id;
            const isFav = favoriteParkIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => onSelectPark(p.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#006b47] text-white border-[#005235] shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50/80 border-slate-200 shadow-2xs'
                }`}
              >
                {isFav && (
                  <span className={`material-symbols-outlined text-[13px] ${isSelected ? 'text-amber-300' : 'text-amber-500'}`}>
                    star
                  </span>
                )}
                <span className="truncate max-w-[110px]">{p.name.replace('Park', '').trim()}</span>
                <span className={`font-mono text-[11px] ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {p.currentTemp}°
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Mobile Hero Weather Card */}
      <div className="bg-gradient-to-br from-[#005235] via-[#006b47] to-[#00472e] rounded-3xl text-white p-5 shadow-lg border border-emerald-600/30 relative overflow-hidden w-full max-w-full">
        {/* Background Atmosphere Graphic */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top bar inside hero: Region, Trail info, GPS, Fav */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-white/20 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {park.region} SG
            </span>
            <span className="text-white/70 text-[11px]">
              {park.runningTrackKm}km {t('hero.runningTrail', 'Trail')}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* GPS quick locate */}
            <button
              onClick={() => requestUserLocation()}
              disabled={isLocatingUser}
              className="p-1.5 bg-white/15 hover:bg-white/25 rounded-full text-white transition-colors cursor-pointer"
              title={t('hero.gpsLocate', 'Locate Nearest Park via GPS')}
            >
              <span className={`material-symbols-outlined text-[16px] ${isLocatingUser ? 'animate-spin' : ''}`}>
                my_location
              </span>
            </button>

            {/* Favorite toggle */}
            <button
              onClick={() => toggleFavorite(park.id)}
              className="p-1.5 bg-white/15 hover:bg-white/25 rounded-full text-white transition-colors cursor-pointer"
              title={isCurrentFav ? t('hero.favorited', 'Favorited') : t('hero.addToFav', 'Add to Favorites')}
            >
              <span className={`material-symbols-outlined text-[16px] ${isCurrentFav ? 'text-amber-300' : ''}`}>
                {isCurrentFav ? 'star' : 'star_border'}
              </span>
            </button>
          </div>
        </div>

        {/* Park Title */}
        <h1 className="text-fluid-hero-title font-black tracking-tight text-white leading-tight">
          {park.name}
        </h1>
        <p className="text-xs text-emerald-100/90 mt-0.5 line-clamp-1">
          {park.summary || 'Singapore City in Nature'}
        </p>

        {/* Big Temperature & Condition Grid */}
        <div className="flex items-center justify-between my-3 sm:my-4 pt-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-fluid-temp font-black tracking-tight">{park.currentTemp}°</span>
              <span className="text-lg text-emerald-200 font-semibold">C</span>
            </div>
            <div className="text-xs text-emerald-100 flex items-center gap-2 mt-1">
              <span>{t('hero.feelsLike', 'Feels')} {park.feelsLike}°C</span>
              <span>•</span>
              <span>{t('hero.high', 'H')}: {park.currentTemp + 1}° {t('hero.low', 'L')}: {park.currentTemp - 3}°</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[clamp(40px,10vw,54px)] text-amber-300 drop-shadow-md">
              {weatherIconName}
            </span>
            <span className="text-xs font-bold text-emerald-50 mt-0.5 text-center">
              {park.condition}
            </span>
          </div>
        </div>

        {/* Key Metrics Quick 4-Grid Pill */}
        <div className="grid grid-cols-4 gap-2 bg-black/25 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10 text-center text-xs w-full">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-emerald-200 font-medium">{t('hero.rainRisk', 'Rain Risk')}</span>
            <span className="font-bold text-white mt-0.5">{park.rainProbability[0]?.percentage ?? 20}%</span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-emerald-200 font-medium">{t('hero.uvIndex', 'UV Index')}</span>
            <span className="font-bold text-amber-300 mt-0.5">{park.uvIndex.value} ({park.uvIndex.level})</span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-emerald-200 font-medium">{t('hero.humidity', 'Humidity')}</span>
            <span className="font-bold text-white mt-0.5">{park.humidity}%</span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <span className="text-[10px] text-emerald-200 font-medium">{t('hero.wind', 'Wind')}</span>
            <span className="font-bold text-white mt-0.5">{park.windSpeed}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 mt-3.5 w-full">
          <SaveAppShortcutButton park={park} className="flex-1 justify-center py-2" />
          
          <button
            onClick={onOpenQrPass}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold border border-white/20 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
            <span>{t('hero.digitalPass', 'Digital Pass')}</span>
          </button>
        </div>
      </div>

      {/* 3. Rain Probability Trend (4h vs 12h) */}
      <RainProbabilityCard data={park.rainProbability} />

      {/* 4. Tropical Heat Stress Index (TP-HSI) Card */}
      <HeatStressIndexCard />

      {/* 5. Historical Weather Data & 7-Day / On-Demand Projection */}
      <WeatherHistoryAndProjectionCard park={park} />

      {/* 6. UV Index Gauge */}
      <UVIndexCard uvIndex={park.uvIndex} />

      {/* 7. Best Time to Visit & Planning Widget */}
      <BestTimeToVisitCard
        park={park}
        onOpenPlanModal={onOpenPlanModal}
      />

      {/* 8. Google AdSense In-Feed Monetization Zone */}
      <GoogleAdZone
        format="in-feed"
        adSlot="sg-parkweather-mobile-feed"
        id="mobile-infeed-ad"
        className="my-1 w-full"
      />

      {/* 9. Sunrise & Sunset Solar Times Card */}
      <SolarTimesCard park={park} />

      {/* 10. Live Transport, Bus Arrivals & Carpark Lot Availability */}
      <ParkTransportCard park={park} />

      {/* 11. Nearby Singapore Parks Strip */}
      <NearbyParksCard
        nearby={park.nearby}
        onSelectPark={onSelectPark}
      />

      {/* 12. Recent Weather Alerts */}
      <RecentAlertsCard
        alerts={park.alerts.length > 0 ? park.alerts : NATIONAL_ALERTS.slice(0, 1)}
        onViewAllAlerts={() => onNavigateTab('alerts')}
      />

      {/* 13. Map Mini-View */}
      <MiniMapCard
        park={park}
        onOpenFullMap={() => onNavigateTab('map')}
      />

    </div>
  );
};
