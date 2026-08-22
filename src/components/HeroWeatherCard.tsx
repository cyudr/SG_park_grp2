import React, { useState, useEffect } from 'react';
import { Park } from '../types';
import { useGovWeather } from '../context/GovWeatherContext';
import { SaveAppShortcutModal } from './SaveAppShortcutModal';
import { getSolarTimes, SolarInfo } from '../utils/solarCalculator';

interface HeroWeatherCardProps {
  park: Park;
  onOpenQrPass: () => void;
}

export const HeroWeatherCard: React.FC<HeroWeatherCardProps> = ({ park, onOpenQrPass }) => {
  const [showShortcutModal, setShowShortcutModal] = useState(false);
  const [solarInfo, setSolarInfo] = useState<SolarInfo>(() => getSolarTimes(new Date(), park.lat, park.lng));

  const { 
    refreshNow, 
    isRefreshing, 
    secondsSinceRefresh, 
    heatStressResult, 
    userLocation,
    requestUserLocation,
    isLocatingUser,
    toggleFavorite,
    isFavorite
  } = useGovWeather();

  const isFav = isFavorite(park.id);

  // Update solar calculations
  useEffect(() => {
    setSolarInfo(getSolarTimes(new Date(), park.lat, park.lng));
    const interval = setInterval(() => {
      setSolarInfo(getSolarTimes(new Date(), park.lat, park.lng));
    }, 60000);
    return () => clearInterval(interval);
  }, [park.lat, park.lng]);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    refreshNow();
  };

  const handleAppActiveClick = async () => {
    const promptEvent = (window as any).__deferredInstallPrompt;
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          (window as any).__deferredInstallPrompt = null;
          return;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    setShowShortcutModal(true);
  };

  // Translate icon strings to clean Material Symbols
  const getWeatherIcon = (iconStr: string, condition: string): string => {
    const s = (iconStr + ' ' + condition).toLowerCase();
    if (s.includes('thunder')) return 'thunderstorm';
    if (s.includes('rain') || s.includes('shower')) return 'rainy';
    if (s.includes('partly') || s.includes('cloud')) return 'partly_cloudy_day';
    if (s.includes('night')) return 'nights_stay';
    return 'wb_sunny';
  };

  const weatherIconName = getWeatherIcon(park.conditionIcon, park.condition);

  // Check if this park is the user's nearest park
  const isNearestPark = userLocation?.nearestParkId === park.id;
  const userDistance = userLocation?.distanceKm;

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden h-auto min-h-[260px] shadow-sm border border-[#006b47]/15 bg-gradient-to-br from-white/95 via-[#f6faf7]/90 to-[#edf5f0]/85"
      id="hero-weather-card"
    >
      {/* Background Image Layer with soft organic feel */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-all duration-700 filter saturate-120" 
        style={{ backgroundImage: `url('${park.bgImageUrl}')` }}
      />

      {/* Subtle overlay gradient to ensure high readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent pointer-events-none" />

      {/* Left Info Column */}
      <div className="z-10 flex flex-col gap-2 relative max-w-xl">
        {/* Geolocation Tag */}
        <div className="flex items-center gap-2 flex-wrap">
          {isNearestPark ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#006b47] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
              <span className="material-symbols-outlined text-[13px]">near_me</span>
              Nearest Park to You ({userDistance !== undefined ? `${userDistance} km away` : 'Active'})
            </span>
          ) : userLocation ? (
            <button
              onClick={() => requestUserLocation()}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#006b47] bg-[#eef7f1] hover:bg-[#e1f0e6] px-2.5 py-0.5 rounded-full transition-colors border border-[#006b47]/20"
              title="Click to recalculate nearest park"
            >
              <span className="material-symbols-outlined text-[13px]">my_location</span>
              <span>{userDistance !== undefined ? `${userDistance} km away` : 'Locate nearest'}</span>
            </button>
          ) : (
            <button
              onClick={() => requestUserLocation()}
              disabled={isLocatingUser}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#00629d] bg-[#e6f1f8] hover:bg-[#d5e7f4] px-2.5 py-0.5 rounded-full transition-colors border border-[#00629d]/20 cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[13px] ${isLocatingUser ? 'animate-spin' : ''}`}>
                near_me
              </span>
              <span>{isLocatingUser ? 'Detecting GPS...' : '📍 Auto-detect Nearest Park'}</span>
            </button>
          )}
          
          {/* Direct Install App Button - Clearly identifiable for Desktop & Mobile Installation */}
          <button
            onClick={handleAppActiveClick}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#006b47] hover:bg-[#005235] text-white shadow-xs transition-all hover:scale-103 active:scale-97 cursor-pointer border border-[#005235]"
            title="Install SG ParkWeather as a fast Web App on your device (Desktop / Mobile / Offline)"
            id="hero-install-app-btn"
          >
            <span className="material-symbols-outlined text-[15px] text-[#71dba6]">
              install_desktop
            </span>
            <span className="whitespace-nowrap font-bold">Install App</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse ml-0.5"></span>
          </button>
          
          <span className="text-[11px] text-[#556258] font-medium">
            {park.region} Region • {park.runningTrackKm}km Trail
          </span>
        </div>

        {/* Park Title & Favorite & Manual Refresh */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-fluid-hero-title font-bold text-[#005235] tracking-tight">
            {park.name}
          </h1>

          {/* Favorite Toggle Button */}
          <button
            onClick={() => toggleFavorite(park.id)}
            className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center border hover:scale-105 ${
              isFav
                ? 'bg-amber-100 text-amber-600 border-amber-300 hover:bg-amber-200'
                : 'bg-white/80 text-[#556258] border-[#c1d0c4] hover:text-amber-600 hover:bg-white'
            }`}
            title={isFav ? 'Favorited park (Saved to cookies)' : 'Add to favorite parks (Saved to cookies)'}
            id="hero-favorite-btn"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isFav ? 'star' : 'star_border'}
            </span>
          </button>

          <button 
            onClick={handleRefresh}
            title="Refresh live data from all 12 Singapore Open Data APIs (or press 'R' key)"
            className="text-[#556258] hover:text-[#006b47] transition-colors p-1.5 rounded-full hover:bg-white/80 cursor-pointer flex items-center justify-center border border-transparent hover:border-[#c1d0c4]"
            id="refresh-hero-btn"
          >
            <span className={`material-symbols-outlined text-[19px] ${isRefreshing ? 'animate-spin text-[#006b47]' : ''}`}>
              sync
            </span>
          </button>
          {park.nparksUrl && (
            <a
              href={park.nparksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#006b47] hover:text-[#005235] bg-[#eef7f1] hover:bg-[#dcf0e2] px-2.5 py-1 rounded-lg border border-[#006b47]/20 transition-all hover:scale-105"
              title="Open official National Parks Board (NParks) page"
              id="hero-nparks-link-btn"
            >
              <span>NParks Site</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          )}
        </div>

        {/* Status Pill & Real-time Live Badges */}
        <div className="flex gap-2 items-center flex-wrap mt-0.5">
          <span className="bg-[#71dba6]/50 text-[#005235] px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider inline-flex items-center gap-1 shadow-2xs">
            <span className="material-symbols-outlined text-[14px] font-bold">check_circle</span> 
            {park.status}
          </span>
          <span className="text-[#3e4942] text-xs font-medium">
            {secondsSinceRefresh < 60
              ? 'Live synced <1 min ago'
              : `Synced ${Math.floor(secondsSinceRefresh / 60)} min ago`}
          </span>

          {/* Live Sunrise / Sunset Countdown Tag */}
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50/90 text-amber-900 border border-amber-200/80 shadow-2xs"
            title={`Sunrise: ${solarInfo.sunriseFormatted} | Sunset: ${solarInfo.sunsetFormatted}`}
          >
            <span className="material-symbols-outlined text-[14px] text-amber-600">
              {solarInfo.nextEvent === 'sunset' ? 'wb_twilight' : 'wb_sunny'}
            </span>
            <span>{solarInfo.statusText}</span>
          </span>
        </div>

        {/* Temperature & Condition Block */}
        <div className="mt-2.5 flex items-baseline gap-3 sm:gap-4 flex-wrap">
          <span className="text-fluid-temp font-extrabold text-[#191c1a] tracking-tighter leading-none font-mono">
            {park.currentTemp}°
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006b47] text-[22px]">
                {weatherIconName}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#005235] leading-tight">
                {park.condition}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs sm:text-sm text-[#3e4942] font-medium">
                Feels like {park.feelsLike}°
              </span>
              <span className="text-xs bg-[#e6f4ea] text-[#005235] px-2 py-0.5 rounded-md font-semibold font-mono border border-[#006b47]/20">
                TP-HSI: {heatStressResult.heatStressIndexC}°C ({heatStressResult.riskLevel})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Visual: Solar Times & Digital Park Pass Widget */}
      <div className="z-10 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-[#d3dfd5] pt-3 md:pt-0 md:pl-6">
        {/* Sunrise & Sunset Widget */}
        <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-[#c1d0c4]/70 shadow-2xs min-w-[210px]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-1.5 text-[11px] font-bold">
            <div className="flex items-center gap-1 text-amber-700">
              <span className="material-symbols-outlined text-[15px] text-amber-500">wb_sunny</span>
              <span>Rise: {solarInfo.sunriseFormatted}</span>
            </div>
            <div className="flex items-center gap-1 text-orange-700">
              <span className="material-symbols-outlined text-[15px] text-orange-500">wb_twilight</span>
              <span>Set: {solarInfo.sunsetFormatted}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
            <span className="font-semibold">{solarInfo.statusText.split('(')[0].trim()}</span>
            <span className="font-mono text-emerald-700 font-semibold">{solarInfo.dayProgressPercent}% day</span>
          </div>
          {/* Solar Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 via-emerald-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${solarInfo.dayProgressPercent}%` }}
            />
          </div>
          <div className="text-[9.5px] text-[#556258] italic truncate">
            {solarInfo.subText}
          </div>
        </div>

        {/* Digital Park Pass Action Button */}
        <button
          onClick={onOpenQrPass}
          className="group flex items-center gap-2 bg-[#006b47] hover:bg-[#005235] text-white px-4 py-2 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer shrink-0"
          title="Click to view digital park pass, interactive trail map & amenities"
          id="hero-qr-pass-btn"
        >
          <span className="material-symbols-outlined text-[20px] text-[#71dba6] group-hover:scale-110 transition-transform">
            qr_code_2
          </span>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-none tracking-wide">Park Pass & Trails</span>
            <span className="text-[10px] text-white/80 mt-0.5 font-normal">Offline Trail Guide</span>
          </div>
        </button>
      </div>

      {/* App Active / Install Modal */}
      <SaveAppShortcutModal
        isOpen={showShortcutModal}
        onClose={() => setShowShortcutModal(false)}
        park={park}
      />
    </div>
  );
};
