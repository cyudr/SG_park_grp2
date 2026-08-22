import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Park } from '../types';
import { PARKS_DATA } from '../data/parksData';
import { getRainTierInfo } from '../utils/weatherProjection';
import { useGovWeather } from '../context/GovWeatherContext';

interface MiniMapCardProps {
  park: Park;
  onOpenFullMap: () => void;
}

export const MiniMapCard: React.FC<MiniMapCardProps> = ({ park, onOpenFullMap }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { userLocation } = useGovWeather();

  const activeTier = getRainTierInfo(park.rainTier || 'Low');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset container if Leaflet was previously attached to prevent "Map container is already initialized"
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const center: L.LatLngTuple = [park.lat || 1.3521, park.lng || 103.8198];

    // Create interactive Leaflet map instance matching MapView styling
    const map = L.map(mapContainerRef.current, {
      center,
      zoom: 13,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
      dragging: false, // keep mini map clean as preview card
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false
    });

    // CartoDB Voyager Tile Layer (exact match with MapView)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: ['a', 'b', 'c', 'd'],
      maxZoom: 19
    }).addTo(map);

    // Doppler Radar Squalls Overlay (matching MapView)
    const radarGroup = L.layerGroup().addTo(map);

    // Radar distance rings from Singapore Doppler Radar Station
    const radarCenter = L.latLng(1.3521, 103.8198);
    [10000, 20000].forEach((radiusMeters) => {
      L.circle(radarCenter, {
        radius: radiusMeters,
        color: '#00875a',
        weight: 1,
        dashArray: '3, 6',
        fill: false,
        opacity: 0.35
      }).addTo(radarGroup);
    });

    // Rain Squall Cells matching live Doppler radar
    L.circle([1.365, 103.820], {
      radius: 3500,
      color: '#00b4d8',
      fillColor: '#00b4d8',
      fillOpacity: 0.3,
      weight: 0
    }).addTo(radarGroup);
    L.circle([1.360, 103.815], {
      radius: 2000,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.45,
      weight: 0
    }).addTo(radarGroup);

    if (park.region === 'West') {
      L.circle([1.340, 103.725], {
        radius: 3200,
        color: '#eab308',
        fillColor: '#eab308',
        fillOpacity: 0.5,
        weight: 0
      }).addTo(radarGroup);
    } else if (park.region === 'North') {
      L.circle([1.435, 103.825], {
        radius: 3000,
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.55,
        weight: 0
      }).addTo(radarGroup);
    }

    // Render User Location Pin if available
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="w-6 h-6 relative flex items-center justify-center pointer-events-none">
            <div class="w-6 h-6 rounded-full bg-blue-500/30 animate-ping absolute"></div>
            <div class="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center z-10">
              <div class="w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
    }

    // Render Nearby Parks Pinpoint Markers
    const allParks = Object.values(PARKS_DATA);
    allParks.forEach((p) => {
      if (p.id === park.id) return; // Main park rendered separately with prominence
      const dist = Math.hypot((p.lat || 0) - park.lat, (p.lng || 0) - park.lng);
      if (dist > 0.08) return; // Only render nearby pins within mini viewport

      const pTier = getRainTierInfo(p.rainTier || 'Low');
      const nearbyMarkerHtml = `
        <div class="flex flex-col items-center drop-shadow-sm opacity-85 hover:opacity-100 transition-opacity">
          <div class="px-1.5 py-0.2 rounded-full text-[8.5px] font-bold bg-white text-slate-800 border border-slate-300 shadow-xs flex items-center gap-1 mb-0.5 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full ${pTier.dotColor}"></span>
            <span class="truncate max-w-[50px]">${p.name.split(' ')[0]}</span>
            <span class="text-[8.5px] font-mono text-emerald-800 font-bold">${p.currentTemp}°</span>
          </div>
          <div class="w-4 h-5 relative flex items-center justify-center">
            <svg viewBox="0 0 24 32" class="w-full h-full">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20c0-6.627-5.373-12-12-12z" fill="#ea4335" stroke="#ffffff" stroke-width="1.0" />
              <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
            </svg>
            <span class="material-symbols-outlined text-[9px] absolute top-0.5 left-1/2 -translate-x-1/2 text-[#ea4335]">park</span>
          </div>
        </div>
      `;

      const nearbyIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: nearbyMarkerHtml,
        iconSize: [70, 38],
        iconAnchor: [35, 38]
      });

      L.marker([p.lat, p.lng], { icon: nearbyIcon }).addTo(map);
    });

    // Render Current Active Park Prominent Pin (Exact Match with MapView Google Singapore Map)
    const currentMarkerHtml = `
      <div class="group relative w-[84px] h-[48px] flex flex-col items-center justify-end cursor-pointer scale-110 z-50">
        <!-- Pulse Halo for Selected Pin -->
        <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500/35 rounded-full animate-ping pointer-events-none"></div>
        
        <div class="flex flex-col items-center drop-shadow-sm">
          <!-- Temperature Badge Chip -->
          <div class="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 border shadow-xs whitespace-nowrap mb-0.5 bg-[#005235] text-white border-white ring-1.5 ring-emerald-400">
            <span class="w-1.5 h-1.5 rounded-full shrink-0 ${activeTier.dotColor}"></span>
            <span class="truncate max-w-[54px] font-semibold text-[9.5px]">${park.name.split(' ')[0]}</span>
            <span class="text-[9px] font-mono font-extrabold text-emerald-200">${park.currentTemp}°</span>
          </div>

          <!-- Google Maps Classic Teardrop Pin -->
          <div class="w-5 h-6.5 relative flex items-center justify-center">
            <svg viewBox="0 0 24 32" class="w-full h-full filter drop-shadow-xs">
              <path
                d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20c0-6.627-5.373-12-12-12z"
                fill="#006b47"
                stroke="#ffffff"
                stroke-width="1.0"
              />
              <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
            </svg>
            <span class="material-symbols-outlined text-[10px] absolute top-1 left-1/2 -translate-x-1/2 text-[#006b47]">
              park
            </span>
          </div>
        </div>
      </div>
    `;

    const currentIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: currentMarkerHtml,
      iconSize: [84, 48],
      iconAnchor: [42, 48]
    });

    L.marker([park.lat, park.lng], { icon: currentIcon }).addTo(map);

    mapInstanceRef.current = map;

    // Trigger invalidateSize to ensure correct canvas sizing
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [park.id, park.lat, park.lng, park.name, park.currentTemp, park.rainTier, userLocation]);

  return (
    <div 
      onClick={onOpenFullMap}
      className="glass-card rounded-2xl overflow-hidden h-72 sm:h-80 relative group cursor-pointer shadow-xs border border-slate-200 bg-white flex flex-col transition-all duration-300 hover:shadow-lg hover:border-emerald-300"
      id="mini-map-card"
      title="Click to open interactive Singapore Geospatial Radar Map"
    >
      {/* Real Interactive Leaflet Tile & Doppler Canvas */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0 transition-transform duration-500 group-hover:scale-[1.02]" 
      />

      {/* Top Floating Radar Live Badge (matching MapView) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-800 font-bold pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-[#005235]">NEA Radar Live</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-1 text-[11px] text-slate-700 font-semibold pointer-events-auto">
          <span className="material-symbols-outlined text-[14px] text-emerald-700">radar</span>
          <span>{park.region} Region</span>
        </div>
      </div>

      {/* Bottom Floating Action Bar with Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-3 pt-6 z-10 flex items-center justify-between pointer-events-none">
        <div className="text-white drop-shadow">
          <div className="font-bold text-xs flex items-center gap-1">
            <span>{park.name}</span>
          </div>
          <div className="text-[10px] text-emerald-200 font-medium">
            {park.currentTemp}°C • {activeTier.label} Rain Risk
          </div>
        </div>

        <span className="bg-white hover:bg-emerald-50 text-[#006b47] px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 transition-all group-hover:scale-105 pointer-events-auto">
          <span>View Full Map</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </span>
      </div>
    </div>
  );
};
