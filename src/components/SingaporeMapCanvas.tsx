import React from 'react';
import { Park } from '../types';
import { getRainTierInfo } from '../utils/weatherProjection';
import { MAJOR_PARK_IDS } from './GoogleSingaporeMap';

interface SingaporeMapCanvasProps {
  parks: Park[];
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
  radarOverlay: boolean;
  mapStyle: 'terrain' | 'radar' | 'satellite' | 'tactical';
  userLocation: { lat: number; lng: number; nearestParkName: string } | null;
}

export const SingaporeMapCanvas: React.FC<SingaporeMapCanvasProps> = ({
  parks,
  currentPark,
  onSelectPark,
  radarOverlay,
  mapStyle,
  userLocation
}) => {
  // Precise GPS projection for Singapore (Mainland + Offshore Islands)
  const calculatePosition = (lat: number, lng: number) => {
    const minLat = 1.205;
    const maxLat = 1.475;
    const minLng = 103.620;
    const maxLng = 104.030;

    const topPct = Math.max(4, Math.min(94, 100 - ((lat - minLat) / (maxLat - minLat)) * 100));
    const leftPct = Math.max(4, Math.min(94, ((lng - minLng) / (maxLng - minLng)) * 100));

    return { top: `${topPct.toFixed(2)}%`, left: `${leftPct.toFixed(2)}%` };
  };

  const bgTheme = 
    mapStyle === 'tactical' ? 'bg-[#0f172a]' :
    mapStyle === 'radar' ? 'bg-[#061e1b]' :
    mapStyle === 'satellite' ? 'bg-[#1b3a4b]' :
    'bg-[#d5e8df]';

  const seaColor = 
    mapStyle === 'tactical' ? '#0f172a' :
    mapStyle === 'radar' ? '#061e1b' :
    mapStyle === 'satellite' ? '#1b3a4b' :
    '#c8e2d8';

  const landColor = 
    mapStyle === 'tactical' ? '#1e293b' :
    mapStyle === 'radar' ? '#0f382c' :
    mapStyle === 'satellite' ? '#2d4a3e' :
    '#eef5f0';

  const reservoirColor = 
    mapStyle === 'tactical' ? '#0284c7' :
    mapStyle === 'radar' ? '#00b4d8' :
    mapStyle === 'satellite' ? '#1b3a4b' :
    '#a2cfc4';

  const coastlineBorder = 
    mapStyle === 'tactical' ? '#38bdf8' :
    mapStyle === 'radar' ? '#10b981' :
    mapStyle === 'satellite' ? '#4ade80' :
    '#9fc2b2';

  return (
    <div className={`relative w-full h-[520px] sm:h-[580px] rounded-2xl overflow-hidden ${bgTheme} border border-slate-300/80 shadow-inner select-none transition-colors duration-300`}>
      
      {/* SVG Singapore Basemap Layer (Mainland, Islands, Reservoirs, Straits) */}
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radar Sweep Radial Gradient */}
          <radialGradient id="radarSweepGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#059669" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>

          {/* Cloud Rain Glow */}
          <filter id="cloudBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>

          {/* Heavy Squall Blur */}
          <filter id="squallBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* Sea Background */}
        <rect width="1000" height="650" fill={seaColor} />

        {/* Latitude / Longitude Grid Lines for Cartographic Look */}
        <g stroke={mapStyle === 'terrain' ? '#bad3c7' : '#ffffff15'} strokeWidth="1" strokeDasharray="4,4">
          <line x1="0" y1="130" x2="1000" y2="130" />
          <line x1="0" y1="260" x2="1000" y2="260" />
          <line x1="0" y1="390" x2="1000" y2="390" />
          <line x1="0" y1="520" x2="1000" y2="520" />
          <line x1="200" y1="0" x2="200" y2="650" />
          <line x1="400" y1="0" x2="400" y2="650" />
          <line x1="600" y1="0" x2="600" y2="650" />
          <line x1="800" y1="0" x2="800" y2="650" />
        </g>

        {/* Major Singapore Areas Regional Labels for Geographic Reference */}
        <g fill={mapStyle === 'terrain' ? '#2d4f40' : '#ffffffbb'} fontWeight="bold" letterSpacing="2">
          <text x="430" y="145" fontSize="11" textAnchor="middle">WOODLANDS / NORTH</text>
          <text x="210" y="310" fontSize="11" textAnchor="middle">JURONG / WEST</text>
          <text x="480" y="275" fontSize="11" textAnchor="middle">CENTRAL CATCHMENT</text>
          <text x="545" y="465" fontSize="11" textAnchor="middle">DOWNTOWN / MARINA BAY</text>
          <text x="785" y="325" fontSize="11" textAnchor="middle">TAMPINES / EAST</text>
          <text x="635" y="195" fontSize="10" textAnchor="middle">PUNGGOL / SENGKANG</text>
        </g>

        {/* ========================================================================= */}
        {/* MAINLAND SINGAPORE GEOGRAPHIC ISLAND SVG PATH */}
        {/* ========================================================================= */}
        <g filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.08))">
          {/* Singapore Mainland */}
          <path
            d="M 210,145 
               C 240,130 280,120 330,115 
               C 380,110 430,112 480,118 
               C 530,124 570,135 620,135 
               C 660,135 700,125 740,130 
               C 780,135 820,150 855,175 
               C 890,200 910,230 920,270 
               C 925,300 905,330 870,360 
               C 835,390 790,415 740,435 
               C 690,455 640,470 590,480 
               C 540,490 490,492 440,485 
               C 390,478 340,465 295,450 
               C 250,435 205,410 165,375 
               C 125,340 95,300 80,260 
               C 70,230 75,200 95,180 
               C 115,160 145,155 175,150 Z"
            fill={landColor}
            stroke={coastlineBorder}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Pulau Ubin */}
          <path
            d="M 750,155 C 780,145 815,150 835,165 C 825,180 790,185 760,180 C 745,175 740,165 750,155 Z"
            fill={landColor}
            stroke={coastlineBorder}
            strokeWidth="1.8"
          />
          <text x="785" y="170" fill={mapStyle === 'terrain' ? '#3e5c50' : '#ffffffaa'} fontSize="9" fontWeight="bold" textAnchor="middle">
            Pulau Ubin
          </text>

          {/* Pulau Tekong */}
          <path
            d="M 855,140 C 885,135 915,145 925,165 C 930,190 905,210 880,210 C 855,205 845,175 855,140 Z"
            fill={landColor}
            stroke={coastlineBorder}
            strokeWidth="1.8"
          />

          {/* Sentosa Island */}
          <path
            d="M 470,515 C 505,510 535,520 545,535 C 530,550 490,550 460,540 C 455,530 460,520 470,515 Z"
            fill={landColor}
            stroke={coastlineBorder}
            strokeWidth="1.8"
          />
          <text x="502" y="534" fill={mapStyle === 'terrain' ? '#3e5c50' : '#ffffffaa'} fontSize="9" fontWeight="bold" textAnchor="middle">
            Sentosa
          </text>

          {/* Jurong Island */}
          <path
            d="M 230,480 C 275,470 310,490 315,520 C 300,545 255,555 220,540 C 210,515 215,490 230,480 Z"
            fill={landColor}
            stroke={coastlineBorder}
            strokeWidth="1.8"
          />

          {/* Southern Islands (St. John's, Lazarus, Sisters') */}
          <ellipse cx="545" cy="575" rx="14" ry="8" fill={landColor} stroke={coastlineBorder} strokeWidth="1.5" />
          <ellipse cx="570" cy="578" rx="12" ry="7" fill={landColor} stroke={coastlineBorder} strokeWidth="1.5" />
          <ellipse cx="515" cy="580" rx="9" ry="6" fill={landColor} stroke={coastlineBorder} strokeWidth="1.5" />
          <text x="548" y="598" fill={mapStyle === 'terrain' ? '#3e5c50' : '#ffffffaa'} fontSize="8" fontWeight="bold" textAnchor="middle">
            Southern Islands
          </text>

          {/* Semakau / Sudong */}
          <ellipse cx="370" cy="570" rx="18" ry="10" fill={landColor} stroke={coastlineBorder} strokeWidth="1.5" />
          <ellipse cx="320" cy="585" rx="15" ry="8" fill={landColor} stroke={coastlineBorder} strokeWidth="1.5" />
        </g>

        {/* ========================================================================= */}
        {/* MAJOR RESERVOIRS, WATER BODIES & NATURE CORRIDORS */}
        {/* ========================================================================= */}
        <g>
          {/* Central Catchment Reservoirs (MacRitchie, Upper & Lower Peirce, Upper Seletar) */}
          <path
            d="M 440,240 C 470,225 500,230 520,250 C 510,270 480,285 450,275 Z"
            fill={reservoirColor}
            stroke={coastlineBorder}
            strokeWidth="1"
          />
          <text x="475" y="260" fill={mapStyle === 'terrain' ? '#1b4d3e' : '#ffffffdd'} fontSize="8" fontWeight="bold" textAnchor="middle">
            Central Catchment
          </text>

          {/* Lower Seletar Reservoir */}
          <path
            d="M 520,180 C 555,170 580,185 575,200 C 550,210 525,200 520,180 Z"
            fill={reservoirColor}
            stroke={coastlineBorder}
            strokeWidth="1"
          />

          {/* Kranji Reservoir (North-West) */}
          <path
            d="M 230,170 C 255,160 270,180 260,205 C 240,215 225,195 230,170 Z"
            fill={reservoirColor}
            stroke={coastlineBorder}
            strokeWidth="1"
          />

          {/* Jurong Lake & Pandan Reservoir (West) */}
          <path
            d="M 235,325 C 255,320 265,340 255,360 C 240,365 230,345 235,325 Z"
            fill={reservoirColor}
            stroke={coastlineBorder}
            strokeWidth="1"
          />
          <ellipse cx="295" cy="405" rx="16" ry="12" fill={reservoirColor} stroke={coastlineBorder} strokeWidth="1" />

          {/* Bedok Reservoir (East) */}
          <ellipse cx="730" cy="335" rx="18" ry="11" fill={reservoirColor} stroke={coastlineBorder} strokeWidth="1" />

          {/* Marina Bay & Kallang Basin */}
          <path
            d="M 535,445 C 555,435 565,455 550,470 C 540,465 530,455 535,445 Z"
            fill={reservoirColor}
            stroke={coastlineBorder}
            strokeWidth="1"
          />
        </g>

        {/* ========================================================================= */}
        {/* MAJOR CORRIDORS & EXPRESSWAYS (PIE, CTE, AYE, SLE, ECP) */}
        {/* ========================================================================= */}
        <g stroke={mapStyle === 'terrain' ? '#d0e0d5' : '#ffffff20'} strokeWidth="1.5" fill="none" strokeDasharray="3,3">
          {/* PIE (West to East) */}
          <path d="M 180,340 Q 450,330 830,335" />
          {/* AYE (West to South) */}
          <path d="M 170,390 Q 350,420 540,470" />
          {/* ECP (South to Changi) */}
          <path d="M 540,475 Q 700,430 860,320" />
          {/* CTE / SLE (North to South Central) */}
          <path d="M 460,130 Q 480,280 520,450" />
        </g>

        {/* ========================================================================= */}
        {/* GEOSPATIAL WEATHER RADAR OVERLAY (Doppler Rain Cloud Reflectivity Simulation) */}
        {/* ========================================================================= */}
        {radarOverlay && (
          <g>
            {/* Dynamic Doppler Rain Cells across Singapore */}
            {/* Rain Cell 1: Central Catchment / Bukit Timah Light Rain (20-30 dBZ Cyan) */}
            <ellipse
              cx="460"
              cy="255"
              rx="90"
              ry="65"
              fill="#00b4d8"
              opacity="0.38"
              filter="url(#cloudBlur)"
            />

            {/* Rain Cell 2: West Coast & Jurong Rain Showers (35-45 dBZ Green/Yellow) */}
            <ellipse
              cx="260"
              cy="340"
              rx="80"
              ry="55"
              fill="#10b981"
              opacity="0.42"
              filter="url(#cloudBlur)"
            />
            <ellipse
              cx="255"
              cy="335"
              rx="45"
              ry="30"
              fill="#eab308"
              opacity="0.5"
              filter="url(#cloudBlur)"
            />

            {/* Rain Cell 3: North / Woodlands / Yishun Thunder Squall (>50 dBZ Red) */}
            <ellipse
              cx="480"
              cy="145"
              rx="85"
              ry="50"
              fill="#ef4444"
              opacity="0.45"
              filter="url(#squallBlur)"
            />
            <ellipse
              cx="485"
              cy="140"
              rx="40"
              ry="25"
              fill="#a855f7"
              opacity="0.55"
              filter="url(#squallBlur)"
            />

            {/* Rain Cell 4: Changi / East Coast Passing Showers */}
            <ellipse
              cx="800"
              cy="310"
              rx="70"
              ry="45"
              fill="#38bdf8"
              opacity="0.32"
              filter="url(#cloudBlur)"
            />

            {/* Rotating 360-degree Radar Scanning Beam Cone */}
            <g className="origin-[500px_325px] animate-[spin_6s_linear_infinite] pointer-events-none">
              <path
                d="M 500,325 L 1000,100 A 600,600 0 0,1 1000,450 Z"
                fill="url(#radarSweepGrad)"
              />
              <line x1="500" y1="325" x2="1000" y2="450" stroke="#10b981" strokeWidth="2" strokeOpacity="0.8" />
            </g>

            {/* Concentric Radar Distance Rings (10km, 20km, 30km) */}
            <g stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.3" fill="none" strokeDasharray="5,5">
              <circle cx="500" cy="325" r="120" />
              <circle cx="500" cy="325" r="240" />
              <circle cx="500" cy="325" r="360" />
            </g>
          </g>
        )}
      </svg>

      {/* ========================================================================= */}
      {/* HTML DYNAMIC PIN MARKERS (Major Parks + Selected Park) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        {parks
          .filter((p) => MAJOR_PARK_IDS.has(p.id) || p.id === currentPark.id)
          .map((park) => {
          const pos = calculatePosition(park.lat, park.lng);
          const isSelected = park.id === currentPark.id;
          const tierInfo = getRainTierInfo(park.rainTier || 'Low');

          return (
            <div
              key={park.id}
              style={{ top: pos.top, left: pos.left }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPark(park.id);
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-200 ${
                isSelected ? 'z-40 scale-110' : 'z-20 hover:scale-115 hover:z-30'
              }`}
              id={`map-pin-${park.id}`}
            >
              <div className="flex flex-col items-center group">
                
                {/* Active Pulsing Halo */}
                {isSelected && (
                  <div className="absolute -inset-2 bg-emerald-500/30 rounded-full animate-ping pointer-events-none"></div>
                )}

                {/* Park Pin Badge */}
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1 border transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#005235] text-white border-white ring-2 ring-emerald-400 shadow-xl'
                      : 'bg-white/95 text-slate-800 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tierInfo.dotColor}`}></span>
                  <span className="truncate max-w-[90px] sm:max-w-[120px]">{park.name.split(' ')[0]}</span>
                  <span className="text-[9px] font-extrabold text-emerald-800 shrink-0">{park.currentTemp}°</span>
                </div>

                {/* Pin Arrow Tip */}
                <div
                  className={`w-1.5 h-1.5 transform rotate-45 -mt-0.5 ${
                    isSelected ? 'bg-[#005235]' : 'bg-white'
                  }`}
                ></div>

                {/* Hover Quick Card */}
                <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white p-2.5 rounded-xl text-xs w-48 shadow-xl z-50 pointer-events-none backdrop-blur-sm">
                  <div className="font-bold text-emerald-300 truncate">{park.name}</div>
                  <div className="text-[10px] text-slate-300 mt-0.5 flex justify-between">
                    <span>{park.region} Region</span>
                    <span className="font-bold">{park.currentTemp}°C</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${tierInfo.dotColor}`}></span>
                    <span>{tierInfo.tier} Rain Risk ({park.rainProbability[0]?.percentage || 10}%)</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {/* User GPS Pin on Singapore Map */}
        {userLocation && (
          <div
            style={calculatePosition(userLocation.lat, userLocation.lng)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            title={`Your Current Location: Near ${userLocation.nearestParkName}`}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute"></div>
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <span className="absolute top-5 bg-blue-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                You are here
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Radar Reflectivity Legend & Scan Status */}
      {radarOverlay && (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-xs shadow-md max-w-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              NEA Doppler Radar
            </span>
            <span className="text-[10px] font-mono text-emerald-800 font-semibold">128km S-Band</span>
          </div>

          {/* dBZ Color Gradient Bar */}
          <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-600">
            <span>0 dBZ</span>
            <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-300 via-emerald-400 via-amber-400 to-rose-600"></div>
            <span>65+ dBZ</span>
          </div>
          <div className="flex justify-between text-[8px] text-slate-400 mt-0.5">
            <span>Drizzle</span>
            <span>Moderate</span>
            <span>Heavy Squall</span>
          </div>
        </div>
      )}

      {/* Map Style Switcher (Bottom Right) */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-sm text-xs">
        <span className="material-symbols-outlined text-sm text-emerald-800 ml-1.5">layers</span>
        <span className="text-[10px] font-bold text-slate-700 mr-1 hidden sm:inline">Singapore Island Map</span>
      </div>

    </div>
  );
};
