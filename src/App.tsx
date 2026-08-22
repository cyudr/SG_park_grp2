/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GovWeatherProvider, useGovWeather } from './context/GovWeatherContext';
import { LanguageProvider } from './context/LanguageContext';
import { NATIONAL_ALERTS } from './data/parksData';
import { AppTab } from './types';
import { useWindowSize } from './utils/useWindowSize';
import { detectDevice } from './utils/deviceDetection';
import { getSavedViewMode, saveViewModeToCookie } from './utils/cookieUtils';
import { Header } from './components/Header';
import { ApiStatusBar } from './components/ApiStatusBar';
import { ApiStatusModal } from './components/ApiStatusModal';
import { ViewMode } from './components/ViewModeSwitcher';
import { MobileParkView } from './components/MobileParkView';
import { HeroWeatherCard } from './components/HeroWeatherCard';
import { HeatStressIndexCard } from './components/HeatStressIndexCard';
import { SolarTimesCard } from './components/SolarTimesCard';
import { RainProbabilityCard } from './components/RainProbabilityCard';
import { UVIndexCard } from './components/UVIndexCard';
import { BestTimeToVisitCard } from './components/BestTimeToVisitCard';
import { WeatherHistoryAndProjectionCard } from './components/WeatherHistoryAndProjectionCard';
import { ParkTransportCard } from './components/ParkTransportCard';
import { RecentAlertsCard } from './components/RecentAlertsCard';
import { NearbyParksCard } from './components/NearbyParksCard';
import { MiniMapCard } from './components/MiniMapCard';
import { GoogleAdZone } from './components/GoogleAdZone';
import { MapView } from './components/MapView';
import { CommunityView } from './components/CommunityView';
import { AlertsView } from './components/AlertsView';
import { DataSourceView } from './components/DataSourceView';
import { Footer } from './components/Footer';
import { PlanVisitModal } from './components/PlanVisitModal';
import { ParkPassModal } from './components/ParkPassModal';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>('parks');
  const { width, isMobile, isTablet, isDesktop } = useWindowSize();
  
  // View mode management with auto-detection for mobile devices & user manual override
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = getSavedViewMode();
    if (saved) return saved;
    const dev = detectDevice();
    if (typeof window !== 'undefined' && (dev.isMobile || window.innerWidth < 768)) {
      return 'mobile';
    }
    return 'desktop';
  });

  const handleToggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    saveViewModeToCookie(mode);
  };
  
  const { currentPark, setSelectedParkId } = useGovWeather();
  
  // Modals state
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isQrPassModalOpen, setIsQrPassModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleSelectPark = (parkId: string) => {
    setSelectedParkId(parkId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`bg-[#F4F7F5] text-[#181c1b] font-['Inter'] min-h-screen flex flex-col overflow-x-hidden w-full max-w-[100vw] selection:bg-[#71dba6]/40 selection:text-[#005235] ${
        viewMode === 'mobile' ? 'text-sm' : isMobile ? 'text-sm' : ''
      }`}
      id="app-root"
      data-viewport-width={width}
      data-view-mode={viewMode}
    >
      
      {/* Live Gov API Scheduler & Refresh Bar with View Mode Switcher */}
      <ApiStatusBar 
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Top Navbar with Data Source link & Favorite Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPark={currentPark}
        onSelectPark={handleSelectPark}
        onOpenQrPass={() => setIsQrPassModalOpen(true)}
        alerts={currentPark.alerts.length > 0 ? currentPark.alerts : NATIONAL_ALERTS.slice(0, 1)}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Main Content Area with Adaptive Responsive Layout */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6 transition-all duration-300">

        {/* PARKS DASHBOARD VIEW */}
        {activeTab === 'parks' && (
          viewMode === 'mobile' ? (
            /* Dedicated Touch-Optimized Mobile View */
            <MobileParkView
              park={currentPark}
              onSelectPark={handleSelectPark}
              onOpenQrPass={() => setIsQrPassModalOpen(true)}
              onOpenPlanModal={() => setIsPlanModalOpen(true)}
              onNavigateTab={setActiveTab}
            />
          ) : (
            /* Full Multi-Column Desktop Grid View - switches gracefully on window resize */
            <div className="flex flex-col gap-6 animate-in fade-in duration-200" id="desktop-grid-view">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Main Dashboard Area (7 cols on lg, 8 cols on xl) */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 lg:gap-7 min-w-0">
                  
                  {/* Hero Weather Card with Refined Visual & Auto-detected Nearest Park */}
                  <HeroWeatherCard
                    park={currentPark}
                    onOpenQrPass={() => setIsQrPassModalOpen(true)}
                  />

                  {/* 4-Hour & 12-Hour Rain Probability Trend */}
                  <RainProbabilityCard data={currentPark.rainProbability} />

                  {/* Custom Tropical Heat Stress Index (TP-HSI) Card */}
                  <HeatStressIndexCard />

                  {/* Historical Weather Data & 7-Day / On-Demand Projection */}
                  <WeatherHistoryAndProjectionCard park={currentPark} />

                  {/* Weather Metrics & Planning 2-Column Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* UV Index Gauge */}
                    <UVIndexCard uvIndex={currentPark.uvIndex} />

                    {/* Best Time to Visit Widget */}
                    <BestTimeToVisitCard
                      park={currentPark}
                      onOpenPlanModal={() => setIsPlanModalOpen(true)}
                    />
                  </div>

                  {/* Non-intrusive In-feed Monetization Zone */}
                  <GoogleAdZone
                    format="leaderboard"
                    adSlot="sg-parkweather-incontent-leaderboard"
                    id="incontent-leaderboard-ad"
                    className="my-1"
                  />

                  {/* Sun, Sunrise, Sunset & Astronomical Solar Schedule Card */}
                  <SolarTimesCard park={currentPark} />

                  {/* Live Transport, Bus Arrivals (v3), & Carpark Lot Availability (LTA DATAMALL) */}
                  <ParkTransportCard park={currentPark} />

                </div>

                {/* Sidebar Area (5 cols on lg, 4 cols on xl) */}
                <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:gap-7 min-w-0">
                  
                  {/* Nearby Parks with Proximity Calculation & Favorites */}
                  <NearbyParksCard
                    nearby={currentPark.nearby}
                    onSelectPark={handleSelectPark}
                  />

                  {/* Recent Alerts */}
                  <RecentAlertsCard
                    alerts={currentPark.alerts.length > 0 ? currentPark.alerts : NATIONAL_ALERTS.slice(0, 1)}
                    onViewAllAlerts={() => setActiveTab('alerts')}
                  />

                  {/* Sidebar 300x250 IAB Compliant Medium Rectangle Ad */}
                  <div className="flex justify-center my-1">
                    <GoogleAdZone
                      format="rectangle"
                      adSlot="sidebar-monetization-300x250"
                      id="sidebar-rectangle-ad"
                      className="w-full my-0"
                    />
                  </div>

                  {/* Map Mini-View */}
                  <MiniMapCard
                    park={currentPark}
                    onOpenFullMap={() => setActiveTab('map')}
                  />

                </aside>

              </div>

              {/* Bottom Content Monetization Banner */}
              <GoogleAdZone
                format="banner"
                adSlot="bottom-content-banner"
                id="bottom-banner-ad"
                className="mt-6 mb-2"
              />
            </div>
          )
        )}

        {/* MAP VIEW */}
        {activeTab === 'map' && (
          <MapView
            currentPark={currentPark}
            onSelectPark={handleSelectPark}
            onSwitchToParkView={() => setActiveTab('parks')}
          />
        )}

        {/* DATA SOURCE PAGE (Requirement 2: Dedicated live API feeds & telemetry monitor) */}
        {activeTab === 'datasource' && (
          <DataSourceView />
        )}

        {/* COMMUNITY VIEW */}
        {activeTab === 'community' && (
          <CommunityView
            currentPark={currentPark}
            onSelectPark={(id) => {
              handleSelectPark(id);
              setActiveTab('parks');
            }}
          />
        )}

        {/* ALERTS VIEW */}
        {activeTab === 'alerts' && (
          <AlertsView
            currentPark={currentPark}
            onSelectPark={(id) => {
              handleSelectPark(id);
              setActiveTab('parks');
            }}
            onOpenParkPass={() => setIsQrPassModalOpen(true)}
          />
        )}

      </main>

      {/* Footer with Government Data Sources Entry Point */}
      <Footer
        currentParkId={currentPark.id}
        onSelectPark={handleSelectPark}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        onNavigateTab={setActiveTab}
      />

      {/* Interactive Modals */}
      <ApiStatusModal />

      <PlanVisitModal
        park={currentPark}
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />

      <ParkPassModal
        park={currentPark}
        isOpen={isQrPassModalOpen}
        onClose={() => setIsQrPassModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* AdSense & Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <GovWeatherProvider>
        <MainAppContent />
      </GovWeatherProvider>
    </LanguageProvider>
  );
}
