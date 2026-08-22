import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Park } from '../types';
import { getRainTierInfo } from '../utils/weatherProjection';

interface GoogleSingaporeMapProps {
  parks: Park[];
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
  radarOverlay: boolean;
  radarOpacity?: number;
  mapType: 'roadmap' | 'satellite' | 'terrain' | 'clean';
  onMapTypeChange?: (type: 'roadmap' | 'satellite' | 'terrain' | 'clean') => void;
  userLocation: { lat: number; lng: number; nearestParkName: string } | null;
  onViewForecast?: () => void;
}

// Tile layers configurations (reliable, fast, high-uptime providers)
const TILE_LAYERS: Record<string, { url: string; subdomains?: string[]; attribution: string; maxZoom: number }> = {
  roadmap: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    maxZoom: 19
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19
  },
  terrain: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    maxZoom: 19
  },
  clean: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 19
  }
};

// Major Singapore Geographic Areas for clean spatial reference
export const SINGAPORE_MAJOR_AREAS = [
  { id: 'area-north', name: 'Woodlands / North', region: 'North', lat: 1.4382, lng: 103.7890 },
  { id: 'area-west', name: 'Jurong / West', region: 'West', lat: 1.3329, lng: 103.7436 },
  { id: 'area-central-catchment', name: 'Central Catchment', region: 'Central', lat: 1.3650, lng: 103.8150 },
  { id: 'area-downtown', name: 'Downtown / Marina Bay', region: 'Central', lat: 1.2840, lng: 103.8580 },
  { id: 'area-east', name: 'Tampines / East', region: 'East', lat: 1.3530, lng: 103.9450 },
  { id: 'area-northeast', name: 'Punggol / Sengkang', region: 'North-East', lat: 1.4000, lng: 103.9020 },
  { id: 'area-south', name: 'Sentosa & South', region: 'South', lat: 1.2480, lng: 103.8280 },
  { id: 'area-islands', name: 'Pulau Ubin', region: 'Islands', lat: 1.4120, lng: 103.9650 }
];

// Curated Key National Parks across all Singapore regions
export const MAJOR_PARK_IDS = new Set([
  'gardens-by-the-bay',
  'botanic-gardens',
  'macritchie',
  'bukit-timah',
  'fort-canning',
  'east-coast-park',
  'jurong-lake-gardens',
  'sungei-buloh',
  'bishan-ang-mo-kio',
  'pasir-ris',
  'bedok-reservoir',
  'labrador-nature-reserve',
  'mount-faber',
  'punggol-waterway-park',
  'coney-island-park',
  'pulau-ubin',
  'woodlands-waterfront-park',
  'changi-beach',
  'west-coast-park',
  'marina-barrage'
]);

export const GoogleSingaporeMap: React.FC<GoogleSingaporeMapProps> = ({
  parks,
  currentPark,
  onSelectPark,
  radarOverlay,
  radarOpacity = 0.65,
  mapType = 'roadmap',
  onMapTypeChange,
  userLocation,
  onViewForecast
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const areasGroupRef = useRef<L.LayerGroup | null>(null);
  const radarGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [radarTimeIndex, setRadarTimeIndex] = useState<number>(3); // 0: -45m, 1: -30m, 2: -15m, 3: NOW
  const [isPlayingRadar, setIsPlayingRadar] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Animation loop for radar timeline playback
  useEffect(() => {
    if (!isPlayingRadar) return;
    const interval = setInterval(() => {
      setRadarTimeIndex((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlayingRadar]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset container if Leaflet was previously attached to prevent "Map container is already initialized" error
    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const singaporeCenter: L.LatLngTuple = [1.3521, 103.8198];

    const map = L.map(mapContainerRef.current, {
      center: singaporeCenter,
      zoom: 12,
      minZoom: 10,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false
    });

    const activeConfig = TILE_LAYERS[mapType] || TILE_LAYERS.roadmap;
    const tileLayer = L.tileLayer(activeConfig.url, {
      maxZoom: activeConfig.maxZoom,
      subdomains: activeConfig.subdomains || ['a', 'b', 'c', 'd'],
      attribution: activeConfig.attribution
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Layer Groups
    radarGroupRef.current = L.layerGroup().addTo(map);
    areasGroupRef.current = L.layerGroup().addTo(map);
    userMarkerRef.current = L.layerGroup().addTo(map);
    markersGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Dynamic resize handling
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // Staggered invalidateSize passes to guarantee layout calculation
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 300);
    const t3 = setTimeout(() => map.invalidateSize(), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Fullscreen toggle resizing
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Update Tile Layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const activeConfig = TILE_LAYERS[mapType] || TILE_LAYERS.roadmap;
    
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(activeConfig.url, {
      maxZoom: activeConfig.maxZoom,
      subdomains: activeConfig.subdomains || ['a', 'b', 'c', 'd'],
      attribution: activeConfig.attribution
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [mapType]);

  // Update Radar Layer Overlays based on radarOverlay & timeIndex
  useEffect(() => {
    if (!mapInstanceRef.current || !radarGroupRef.current) return;
    const radarGroup = radarGroupRef.current;
    radarGroup.clearLayers();

    if (!radarOverlay) return;

    // Radar distance rings from Singapore Doppler Radar Station
    const center = L.latLng(1.3521, 103.8198);
    [10000, 20000, 30000].forEach((radiusMeters, idx) => {
      L.circle(center, {
        radius: radiusMeters,
        color: '#00875a',
        weight: 1,
        dashArray: '3, 6',
        fill: false,
        opacity: 0.45
      }).addTo(radarGroup);
    });

    // Time offset factor for animated squall progression
    const timeShiftLat = (3 - radarTimeIndex) * -0.008;
    const timeShiftLng = (3 - radarTimeIndex) * -0.012;

    // Rain Squall Cell 1: Central Catchment / Bukit Timah Showers
    L.circle([1.365 + timeShiftLat, 103.820 + timeShiftLng], {
      radius: 4800,
      color: '#00b4d8',
      fillColor: '#00b4d8',
      fillOpacity: radarOpacity * 0.4,
      weight: 0
    }).addTo(radarGroup);
    L.circle([1.360 + timeShiftLat, 103.815 + timeShiftLng], {
      radius: 2800,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: radarOpacity * 0.6,
      weight: 0
    }).addTo(radarGroup);

    // Rain Squall Cell 2: West Coast & Jurong Lake
    L.circle([1.335 + timeShiftLat, 103.730 + timeShiftLng], {
      radius: 5400,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: radarOpacity * 0.45,
      weight: 0
    }).addTo(radarGroup);
    L.circle([1.340 + timeShiftLat, 103.725 + timeShiftLng], {
      radius: 3200,
      color: '#eab308',
      fillColor: '#eab308',
      fillOpacity: radarOpacity * 0.65,
      weight: 0
    }).addTo(radarGroup);

    // Rain Squall Cell 3: North / Woodlands / Yishun Thunder Squall (Heavy Squall)
    L.circle([1.425 + timeShiftLat, 103.830 + timeShiftLng], {
      radius: 6000,
      color: '#f97316',
      fillColor: '#f97316',
      fillOpacity: radarOpacity * 0.5,
      weight: 0
    }).addTo(radarGroup);
    L.circle([1.435 + timeShiftLat, 103.825 + timeShiftLng], {
      radius: 3400,
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: radarOpacity * 0.75,
      weight: 0
    }).addTo(radarGroup);

    // Rain Squall Cell 4: East Coast & Changi Light Rain
    L.circle([1.345 + timeShiftLat, 103.965 + timeShiftLng], {
      radius: 4200,
      color: '#38bdf8',
      fillColor: '#38bdf8',
      fillOpacity: radarOpacity * 0.4,
      weight: 0
    }).addTo(radarGroup);

  }, [radarOverlay, radarOpacity, radarTimeIndex]);

  // Update User GPS Marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userMarkerRef.current) return;
    const group = userMarkerRef.current;
    group.clearLayers();

    if (!userLocation) return;

    const userLatLng = L.latLng(userLocation.lat, userLocation.lng);

    // Accuracy Circle
    L.circle(userLatLng, {
      radius: 500,
      color: '#2563eb',
      fillColor: '#60a5fa',
      fillOpacity: 0.25,
      weight: 1.5
    }).addTo(group);

    // Google Maps Blue Dot GPS Indicator
    const userIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="w-8 h-8 relative flex items-center justify-center pointer-events-none">
          <div class="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute"></div>
          <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center z-10">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
          <div class="absolute top-7 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap border border-white/20">
            Your Location
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(userLatLng, { icon: userIcon }).addTo(group);
  }, [userLocation]);

  // Render Clean Major Singapore Area Geographic Labels
  useEffect(() => {
    if (!mapInstanceRef.current || !areasGroupRef.current) return;
    const areasGroup = areasGroupRef.current;
    areasGroup.clearLayers();

    SINGAPORE_MAJOR_AREAS.forEach((area) => {
      const latLng = L.latLng(area.lat, area.lng);
      const areaHtml = `
        <div class="pointer-events-none select-none flex flex-col items-center">
          <div class="px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase shadow-xs border border-white/20 whitespace-nowrap">
            ${area.name}
          </div>
        </div>
      `;
      const areaIcon = L.divIcon({
        className: 'custom-leaflet-area-label',
        html: areaHtml,
        iconSize: [140, 26],
        iconAnchor: [70, 13]
      });
      L.marker(latLng, { icon: areaIcon, interactive: false }).addTo(areasGroup);
    });
  }, []);

  // Filter parks by category and search (Defaults to Major Parks + active park to keep Geospatial Radar uncluttered)
  const filteredParks = parks.filter((p) => {
    const isMajor = MAJOR_PARK_IDS.has(p.id) || p.id === currentPark.id;

    // In default 'All' view with no active search, show only curated Major National Parks
    if (selectedCategory === 'All' && searchQuery.trim() === '') {
      return isMajor;
    }

    const matchesCategory = 
      selectedCategory === 'All' ||
      (selectedCategory === 'Nature' && (p.category?.toLowerCase().includes('reserve') || p.name.includes('Nature') || p.name.includes('Hill'))) ||
      (selectedCategory === 'Coastal' && (p.name.includes('Coast') || p.name.includes('Beach') || p.name.includes('Cove') || p.region === 'East')) ||
      (selectedCategory === 'Reservoir' && (p.name.includes('Reservoir') || p.name.includes('Water'))) ||
      (selectedCategory === 'Garden' && (p.name.includes('Garden') || p.name.includes('Botanic')));

    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Render Google Maps Style Pin Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;
    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();

    filteredParks.forEach((park) => {
      const isSelected = park.id === currentPark.id;
      const tierInfo = getRainTierInfo(park.rainTier || 'Low');
      const latLng = L.latLng(park.lat, park.lng);

      // Real Google Maps Pin SVG Teardrop with Compact Pill Label
      // Container is 84x48 with anchor at (42, 48) pointing directly at park coordinates
      const markerHtml = `
        <div class="group relative w-[84px] h-[48px] flex flex-col items-center justify-end cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-110 z-50' : 'hover:scale-105 z-30'
        }" id="gmap-pin-${park.id}">
          
          <!-- Pulse Halo for Selected Pin -->
          ${isSelected ? '<div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500/35 rounded-full animate-ping pointer-events-none"></div>' : ''}
          
          <div class="flex flex-col items-center drop-shadow-sm">
            
            <!-- Temperature Badge Chip -->
            <div class="px-1.5 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 border shadow-xs transition-all whitespace-nowrap mb-0.5 ${
              isSelected
                ? 'bg-[#005235] text-white border-white ring-1.5 ring-emerald-400'
                : 'bg-white text-slate-800 border-slate-300 group-hover:bg-emerald-50 group-hover:border-emerald-600'
            }">
              <span class="w-1.5 h-1.5 rounded-full shrink-0 ${tierInfo.dotColor}"></span>
              <span class="truncate max-w-[54px] font-semibold text-[9.5px]">${park.name.split(' ')[0]}</span>
              <span class="text-[9px] font-mono font-extrabold ${isSelected ? 'text-emerald-200' : 'text-emerald-800'}">${park.currentTemp}°</span>
            </div>

            <!-- Google Maps Classic Teardrop Pin (Compact 20x26) -->
            <div class="w-5 h-6.5 relative flex items-center justify-center">
              <svg viewBox="0 0 24 32" class="w-full h-full filter drop-shadow-xs">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20s12-11.5 12-20c0-6.627-5.373-12-12-12z"
                  fill="${isSelected ? '#006b47' : '#ea4335'}"
                  stroke="#ffffff"
                  stroke-width="1.0"
                />
                <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
              </svg>
              
              <!-- Center Icon -->
              <span class="material-symbols-outlined text-[10px] absolute top-1 left-1/2 -translate-x-1/2 ${
                isSelected ? 'text-[#006b47]' : 'text-[#ea4335]'
              }">
                park
              </span>
            </div>

          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [84, 48],
        iconAnchor: [42, 48]
      });

      const marker = L.marker(latLng, { icon: customIcon });

      marker.on('click', () => {
        onSelectPark(park.id);
        mapInstanceRef.current?.panTo(latLng, { animate: true, duration: 0.5 });
      });

      marker.addTo(markersGroup);
    });
  }, [filteredParks, currentPark, onSelectPark]);

  // Pan to currentPark when changed externally
  useEffect(() => {
    if (!mapInstanceRef.current || !currentPark) return;
    const latLng = L.latLng(currentPark.lat, currentPark.lng);
    mapInstanceRef.current.panTo(latLng, { animate: true, duration: 0.5 });
  }, [currentPark.id]);

  // Controls Handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetSingapore = () => {
    mapInstanceRef.current?.setView([1.3521, 103.8198], 12, { animate: true });
  };
  const handleLocateMe = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14, { animate: true });
    } else {
      navigator.geolocation?.getCurrentPosition((pos) => {
        mapInstanceRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 14, { animate: true });
      });
    }
  };

  const toggleLayer = () => {
    const nextType: Record<string, 'roadmap' | 'satellite' | 'terrain' | 'clean'> = {
      roadmap: 'satellite',
      satellite: 'clean',
      clean: 'terrain',
      terrain: 'roadmap'
    };
    const next = nextType[mapType] || 'roadmap';
    onMapTypeChange?.(next);
  };

  const activeTier = getRainTierInfo(currentPark.rainTier || 'Low');

  return (
    <div
      className={`relative w-full transition-all duration-300 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-[#e5e3df] ${
        isFullscreen ? 'fixed inset-0 z-[9999] h-screen rounded-none' : 'h-[580px] sm:h-[660px]'
      }`}
      id="google-singapore-map-wrapper"
    >
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" id="google-map-viewport" />

      {/* TOP LEFT: Google Maps Floating Search Card & Quick Category Chips */}
      <div className="absolute top-3 left-3 z-[400] max-w-sm sm:max-w-md w-[calc(100%-24px)] pointer-events-auto flex flex-col gap-2">
        
        {/* Google Style Floating Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 px-3.5 py-2 flex items-center gap-2.5 backdrop-blur-md">
          
          {/* Green App Icon / Menu */}
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[19px]">park</span>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Singapore parks, trails, nature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none"
          />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full text-xs font-bold"
            >
              ✕
            </button>
          ) : (
            <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          )}

          {/* Quick Directions Button */}
          {currentPark.nparksUrl && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${currentPark.lat},${currentPark.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors cursor-pointer"
              title="Get Directions in Google Maps"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
            </a>
          )}
        </div>

        {/* Quick Filter Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'All', label: 'All Parks', icon: 'explore' },
            { id: 'Nature', label: 'Nature Reserves', icon: 'forest' },
            { id: 'Coastal', label: 'Coastal & Beaches', icon: 'beach_access' },
            { id: 'Reservoir', label: 'Reservoirs & Lakes', icon: 'water' },
            { id: 'Garden', label: 'Botanical Gardens', icon: 'local_florist' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm border transition-all flex items-center gap-1 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TOP RIGHT: Google Map Type & Live Doppler Radar Badge */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col items-end gap-2 pointer-events-auto">
        
        {/* Doppler Live Radar Controller Badge */}
        {radarOverlay && (
          <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-lg text-xs max-w-[210px] sm:max-w-[240px]">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Doppler Rain Radar</span>
              </span>
              <button
                onClick={() => setIsPlayingRadar(!isPlayingRadar)}
                className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px]">
                  {isPlayingRadar ? 'pause' : 'play_arrow'}
                </span>
                <span>{isPlayingRadar ? 'Pause' : 'Loop'}</span>
              </button>
            </div>

            {/* Radar Timeline Steps */}
            <div className="grid grid-cols-4 gap-1 text-center my-1.5 text-[9px] font-semibold">
              {['-45m', '-30m', '-15m', 'NOW'].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => {
                    setIsPlayingRadar(false);
                    setRadarTimeIndex(idx);
                  }}
                  className={`py-0.5 rounded transition-all cursor-pointer ${
                    radarTimeIndex === idx
                      ? 'bg-[#005235] text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* dBZ Reflectivity Scale */}
            <div className="flex items-center gap-1 text-[8px] font-semibold text-slate-500 mt-1">
              <span>0</span>
              <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-blue-300 via-emerald-400 via-amber-400 to-rose-600 shadow-inner"></div>
              <span>65 dBZ</span>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM LEFT: Google Maps Layer Switcher Thumbnail */}
      <div className="absolute bottom-4 left-3 z-[400] pointer-events-auto">
        <button
          onClick={toggleLayer}
          className="group relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-xl hover:scale-105 transition-all cursor-pointer bg-slate-800"
          title="Click to Switch Google Maps Layer"
        >
          <img
            src={
              mapType === 'satellite'
                ? 'https://maps.gstatic.com/tactile/layers/roadmap_1x.png'
                : 'https://maps.gstatic.com/tactile/layers/satellite_1x.png'
            }
            alt="Toggle Map Layer"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback styling if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex flex-col justify-end p-1">
            <span className="text-[10px] font-bold text-white leading-tight capitalize truncate text-center drop-shadow">
              {mapType === 'satellite' ? 'Map' : 'Satellite'}
            </span>
          </div>
        </button>
      </div>

      {/* BOTTOM RIGHT: Google Maps Standard Navigation Dock */}
      <div className="absolute bottom-4 right-3 z-[400] flex flex-col items-center gap-2 pointer-events-auto">
        
        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 shadow-lg border border-slate-200/90 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
        >
          <span className="material-symbols-outlined text-[20px] text-slate-700">
            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
        </button>

        {/* Reset Singapore Center Compass */}
        <button
          onClick={handleResetSingapore}
          className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 shadow-lg border border-slate-200/90 flex items-center justify-center transition-all hover:scale-105 cursor-pointer font-bold text-xs"
          title="Reset to All Singapore (North Up)"
        >
          <span className="material-symbols-outlined text-[20px] text-[#006b47]">explore</span>
        </button>

        {/* Locate User (GPS Crosshair) */}
        <button
          onClick={handleLocateMe}
          className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 shadow-lg border border-slate-200/90 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          title="My Location"
        >
          <span className="material-symbols-outlined text-[20px]">my_location</span>
        </button>

        {/* Google Maps Zoom In / Out Pill */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 overflow-hidden flex flex-col">
          <button
            onClick={handleZoomIn}
            className="w-10 h-9 hover:bg-slate-50 text-slate-800 flex items-center justify-center font-bold text-lg border-b border-slate-100 transition-colors cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-9 hover:bg-slate-50 text-slate-800 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
            title="Zoom Out"
          >
            −
          </button>
        </div>
      </div>

      {/* SELECTED PARK GOOGLE MAPS PLACE CARD */}
      {currentPark && (
        <div className="absolute bottom-20 left-3 right-16 sm:left-24 sm:right-auto sm:w-88 z-[400] bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-auto">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#006b47] flex items-center justify-center shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-2xl">park</span>
              </div>
              <div className="truncate">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                  {currentPark.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="text-amber-500 font-bold">4.8 ★</span>
                  <span>(NParks Sanctuary)</span>
                  <span>•</span>
                  <span>{currentPark.region}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-base font-extrabold text-[#006b47] font-mono">
                {currentPark.currentTemp}°C
              </span>
              <div className={`text-[10px] font-bold ${activeTier.color}`}>
                {activeTier.label} Risk
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-600 font-medium">
              <span>Rain Prob: </span>
              <strong className="text-slate-900 font-bold">{currentPark.rainProbability[0]?.percentage || 10}%</strong>
            </div>

            <div className="flex items-center gap-2">
              {currentPark.nparksUrl && (
                <a
                  href={currentPark.nparksUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>NParks</span>
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              )}
              {onViewForecast && (
                <button
                  onClick={onViewForecast}
                  className="text-xs font-bold text-white bg-[#006b47] hover:bg-[#005235] px-3 py-1 rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Forecast</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Attribution Badge */}
      <div className="absolute bottom-1 right-1 z-[300] bg-white/80 px-2 py-0.5 rounded text-[9px] text-slate-500 font-medium pointer-events-none">
        Map data &copy; 2026 Google / NEA Doppler
      </div>

    </div>
  );
};
