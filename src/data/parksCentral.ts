import { Park } from '../types';

export const PARKS_CENTRAL: Record<string, Omit<Park, 'historical24h' | 'forecast7Day'>> = {
  'bishan-ang-mo-kio': {
    id: 'bishan-ang-mo-kio',
    name: 'Bishan-Ang Mo Kio Park',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/bishan-ang-mo-kio-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Partly Cloudy',
    conditionIcon: 'partly_cloudy_day',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3626,
    lng: 103.8447,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 65, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 40, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 20, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Sun protection recommended in open lawns.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '4:00 PM',
      end: '6:30 PM',
      description: 'Conditions are ideal for walking and jogging between 4:00 PM and 6:30 PM today. Expect lower humidity and gentle breezes along the riverbanks.'
    },
    hourly: [
      { time: '14:00', condition: 'Partly Cloudy', icon: 'partly_cloudy_day', temp: 31, rainChance: 10, humidity: 68, windSpeed: '12 km/h E' },
      { time: '15:00', condition: 'Cloudy', icon: 'cloud', temp: 30, rainChance: 30, humidity: 72, windSpeed: '14 km/h ESE' },
      { time: '16:00', condition: 'Heavy Rain', icon: 'rainy', temp: 28, rainChance: 65, humidity: 88, windSpeed: '22 km/h NE' },
      { time: '17:00', condition: 'Thunderstorm', icon: 'thunderstorm', temp: 27, rainChance: 75, humidity: 92, windSpeed: '26 km/h N' },
      { time: '18:00', condition: 'Light Rain', icon: 'rainy', temp: 27, rainChance: 35, humidity: 85, windSpeed: '15 km/h NE' },
      { time: '19:00', condition: 'Cloudy Sunset', icon: 'cloud', temp: 28, rainChance: 15, humidity: 78, windSpeed: '10 km/h E' },
      { time: '20:00', condition: 'Clear Breeze', icon: 'nights_stay', temp: 28, rainChance: 5, humidity: 75, windSpeed: '8 km/h E' }
    ],
    alerts: [
      {
        id: 'alert-b-1',
        type: 'warning',
        title: 'Heavy Rain Warning (Central SG)',
        timeWindow: '16:00 - 18:00',
        description: 'Expected between 16:00 and 18:00. Seek shelter in designated pavilions along River Plains.',
        severity: 'high'
      }
    ],
    nearby: [
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 2.5, temp: 30, icon: 'cloud', condition: 'Cloudy' },
      { id: 'toa-payoh', name: 'Toa Payoh Town Park', distanceKm: 3.1, temp: 32, icon: 'wb_sunny', condition: 'Sunny' },
      { id: 'botanic-gardens', name: 'Singapore Botanic Gardens', distanceKm: 5.4, temp: 31, icon: 'partly_cloudy_day', condition: 'Partly Sunny' }
    ],
    facilities: [
      { name: 'Resting Pavilions & Shelters', icon: 'roofing', count: 18 },
      { name: 'Dog Run Area', icon: 'pets', count: 2 },
      { name: 'Water Play Area & Inclusive Playground', icon: 'sports_kabaddi', count: 3 },
      { name: 'Canopy / McDonald’s Dining', icon: 'restaurant', count: 4 },
      { name: 'Accessible Restrooms', icon: 'wc', count: 8 },
      { name: 'Carpark Lots (P1 & P2)', icon: 'local_parking', count: 240 }
    ],
    summary: 'One of the largest urban parks in central Singapore, featuring a 3km naturalized meandering river, open lawns, lush wildflower banks, and dog runs.',
    crowdLevel: 'Moderate',
    humidity: 74,
    windSpeed: '12 km/h',
    airQualityPsi: 42,
    runningTrackKm: 6.2
  },

  'macritchie': {
    id: 'macritchie',
    name: 'MacRitchie Reservoir',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/central-catchment-nature-reserve',
    status: 'Open',
    updatedAgo: 'Updated 5 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Overcast & Shaded',
    conditionIcon: 'cloud',
    bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3444,
    lng: 103.8344,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 45, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 70, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 35, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 15, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 10, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Canopy shade available, wear insect repellent and sturdy shoes.',
      peakTime: '11:00 - 14:30'
    },
    bestTime: {
      start: '7:00 AM',
      end: '10:00 AM',
      description: 'Cool morning breeze around reservoir boardwalks. Excellent for trail runners and TreeTop Walk hikers before mid-day heat.'
    },
    hourly: [
      { time: '14:00', condition: 'Cloudy', icon: 'cloud', temp: 30, rainChance: 20, humidity: 75, windSpeed: '9 km/h NE' },
      { time: '15:00', condition: 'Passing Showers', icon: 'rainy', temp: 29, rainChance: 45, humidity: 82, windSpeed: '14 km/h N' },
      { time: '16:00', condition: 'Heavy Rain', icon: 'thunderstorm', temp: 27, rainChance: 70, humidity: 94, windSpeed: '24 km/h NW' },
      { time: '17:00', condition: 'Light Mist', icon: 'rainy', temp: 26, rainChance: 40, humidity: 90, windSpeed: '12 km/h W' },
      { time: '18:00', condition: 'Fresh Clearing', icon: 'partly_cloudy_day', temp: 27, rainChance: 15, humidity: 82, windSpeed: '8 km/h S' }
    ],
    alerts: [
      {
        id: 'alert-m-1',
        type: 'advisory',
        title: 'TreeTop Walk Slippery Steps',
        timeWindow: 'Wet weather hours',
        description: 'Boardwalk and suspended bridge steps are slick after rain. Proper trekking shoes required.',
        severity: 'medium'
      }
    ],
    nearby: [
      { id: 'bishan-ang-mo-kio', name: 'Bishan-Ang Mo Kio Park', distanceKm: 2.5, temp: 31, icon: 'partly_cloudy_day', condition: 'Partly Cloudy' },
      { id: 'thomson-nature-park', name: 'Thomson Nature Park', distanceKm: 3.2, temp: 30, icon: 'park', condition: 'Shaded Trails' },
      { id: 'botanic-gardens', name: 'Singapore Botanic Gardens', distanceKm: 4.9, temp: 31, icon: 'partly_cloudy_day', condition: 'Partly Sunny' }
    ],
    facilities: [
      { name: 'TreeTop Walk Suspension Bridge', icon: 'hiking', count: 1 },
      { name: 'Kayak & Canoe Rental Pontoon', icon: 'kayaking', count: 1 },
      { name: 'Nature Trail Loops (3km - 11km)', icon: 'directions_walk', count: 5 },
      { name: 'Shower & Locker Amenities', icon: 'shower', count: 2 }
    ],
    summary: 'Singapore’s oldest reservoir and prime nature sanctuary with forest trails, macaque monkeys, and the famous 250m free-standing TreeTop Walk suspension bridge.',
    crowdLevel: 'Moderate',
    humidity: 78,
    windSpeed: '9 km/h',
    airQualityPsi: 38,
    runningTrackKm: 11.0
  },

  'botanic-gardens': {
    id: 'botanic-gardens',
    name: 'Singapore Botanic Gardens',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/singapore-botanic-gardens',
    status: 'Open',
    updatedAgo: 'Updated 6 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Partly Sunny & Lush',
    conditionIcon: 'partly_cloudy_day',
    bgImageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3138,
    lng: 103.8159,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 65, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 40, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 15, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Ample shaded gazebos and historic heritage trees.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Morning symphony lake stroll and National Orchid Garden tour during mild tropical coolness.'
    },
    hourly: [
      { time: '14:00', condition: 'Partly Sunny', icon: 'partly_cloudy_day', temp: 31, rainChance: 10, humidity: 68, windSpeed: '10 km/h E' },
      { time: '15:00', condition: 'Overcast Cloud', icon: 'cloud', temp: 30, rainChance: 30, humidity: 74, windSpeed: '14 km/h E' },
      { time: '16:00', condition: 'Tropical Downpour', icon: 'rainy', temp: 28, rainChance: 65, humidity: 90, windSpeed: '22 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 4.9, temp: 30, icon: 'cloud', condition: 'Cloudy' },
      { id: 'fort-canning', name: 'Fort Canning Park', distanceKm: 4.2, temp: 31, icon: 'castle', condition: 'Historic Slopes' }
    ],
    facilities: [
      { name: 'UNESCO World Heritage Grounds', icon: 'verified', count: 1 },
      { name: 'National Orchid Garden (VIP Orchids)', icon: 'local_florist', count: 1 },
      { name: 'Shaw Foundation Symphony Stage', icon: 'theater_comedy', count: 1 },
      { name: 'Learning Forest & Canopy Web', icon: 'park', count: 1 }
    ],
    summary: 'Singapore’s first UNESCO World Heritage site dating back 165 years, housing over 10,000 species of flora and world-renowned VIP orchid hybrids.',
    crowdLevel: 'Moderate',
    humidity: 71,
    windSpeed: '10 km/h',
    airQualityPsi: 41,
    runningTrackKm: 8.4
  },

  'bukit-timah': {
    id: 'bukit-timah',
    name: 'Bukit Timah Nature Reserve',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/bukit-timah-nature-reserve',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Rainforest Canopy Shade',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3547,
    lng: 103.7764,
    rainProbability: [
      { label: 'Now', percentage: 25, time: '14:00', tier: 'Medium' },
      { label: '+4h', percentage: 50, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 75, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 35, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 10, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Medium',
    uvIndex: {
      value: 4,
      level: 'Moderate',
      advice: '90% canopy shade on summit trail.',
      peakTime: '11:30 - 14:00'
    },
    bestTime: {
      start: '6:30 AM',
      end: '9:00 AM',
      description: 'Hike to Singapore’s highest natural peak (163.63m) before midday heat.'
    },
    hourly: [
      { time: '14:00', condition: 'Canopy Breeze', icon: 'park', temp: 29, rainChance: 25, humidity: 80, windSpeed: '8 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'dairy-farm-nature-park', name: 'Dairy Farm Nature Park', distanceKm: 1.2, temp: 29, icon: 'park', condition: 'Shaded' },
      { id: 'chestnut-nature-park', name: 'Chestnut Nature Park', distanceKm: 2.1, temp: 29, icon: 'terrain', condition: 'Mountain Bike Trails' },
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 6.8, temp: 30, icon: 'cloud', condition: 'Reservoir' }
    ],
    facilities: [
      { name: 'Summit Trail (163m Elevation)', icon: 'terrain', count: 1 },
      { name: 'Visitor Exhibition Centre', icon: 'info', count: 1 },
      { name: 'Cave Path & Taban Loop', icon: 'hiking', count: 3 }
    ],
    summary: 'A primary rainforest pocket holding more tree species than North America, crowned by Singapore’s highest natural point (163.63 meters).',
    crowdLevel: 'Moderate',
    humidity: 80,
    windSpeed: '8 km/h',
    airQualityPsi: 36,
    runningTrackKm: 5.5
  },

  'fort-canning': {
    id: 'fort-canning',
    name: 'Fort Canning Park',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/fort-canning-park',
    status: 'Open',
    updatedAgo: 'Updated 12 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Partly Sunny',
    conditionIcon: 'partly_cloudy_day',
    bgImageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2953,
    lng: 103.8466,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 35, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 60, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 30, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 10, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Historic tunnels and shaded spice gardens provide heat relief.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '4:30 PM',
      end: '7:00 PM',
      description: 'Late afternoon sunset stroll around the Sang Nila Utama Garden and Fort Canning Green.'
    },
    hourly: [
      { time: '14:00', condition: 'Partly Sunny', icon: 'partly_cloudy_day', temp: 31, rainChance: 15, humidity: 70, windSpeed: '11 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'dhoby-ghaut-green', name: 'Dhoby Ghaut Green', distanceKm: 0.8, temp: 32, icon: 'park', condition: 'Civic Lawn' },
      { id: 'pearls-hill-city-park', name: 'Pearl’s Hill City Park', distanceKm: 1.6, temp: 31, icon: 'terrain', condition: 'Hilltop' },
      { id: 'botanic-gardens', name: 'Singapore Botanic Gardens', distanceKm: 4.2, temp: 31, icon: 'partly_cloudy_day', condition: 'Heritage' }
    ],
    facilities: [
      { name: 'Sang Nila Utama Royal Garden', icon: 'temple_buddhist', count: 1 },
      { name: 'Battlebox WWII Underground Bunker', icon: 'shield', count: 1 },
      { name: 'Fort Canning Tree Tunnel', icon: 'photo_camera', count: 1 },
      { name: 'Heritage Spice Garden & Galley', icon: 'yard', count: 1 }
    ],
    summary: 'An iconic hilltop landmark steeped in 14th-century Malay royalty and WWII military history, featuring 9 historical gardens.',
    crowdLevel: 'Moderate',
    humidity: 70,
    windSpeed: '11 km/h',
    airQualityPsi: 40,
    runningTrackKm: 4.2
  },

  'thomson-nature-park': {
    id: 'thomson-nature-park',
    name: 'Thomson Nature Park',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/thomson-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 20 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Canopy Shaded',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3831,
    lng: 103.8286,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 40, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 70, time: '16:00', tier: 'High' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Forest canopy provides gentle shading throughout.',
      peakTime: '11:30 - 14:30'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Spot critically endangered Raffles’ Banded Langurs and explore rustic 1930s Hainan Village ruins.'
    },
    hourly: [
      { time: '14:00', condition: 'Cloudy Mist', icon: 'cloud', temp: 30, rainChance: 20, humidity: 77, windSpeed: '10 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'windsor-nature-park', name: 'Windsor Nature Park', distanceKm: 2.2, temp: 30, icon: 'park', condition: 'Fresh Trails' },
      { id: 'lower-peirce-reservoir', name: 'Lower Peirce Reservoir', distanceKm: 2.8, temp: 30, icon: 'waves', condition: 'Waterside' }
    ],
    facilities: [
      { name: 'Ruins & Figs Trail (Hainan Village)', icon: 'history', count: 1 },
      { name: 'Macaque & Langur Wildlife Corridors', icon: 'pets', count: 1 }
    ],
    summary: 'A 50-hectare buffer park safeguarding Central Catchment, rich in biodiversity and preserving remnants of an old 1930s Hainan village.',
    crowdLevel: 'Low',
    humidity: 77,
    windSpeed: '10 km/h',
    airQualityPsi: 38,
    runningTrackKm: 3.8
  },

  'windsor-nature-park': {
    id: 'windsor-nature-park',
    name: 'Windsor Nature Park',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/windsor-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Stream Shaded',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3653,
    lng: 103.8248,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 40, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 65, time: '16:00', tier: 'High' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Boardwalk follows clear freshwater streams.',
      peakTime: '11:00 - 14:00'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Morning Drongo Trail canopy walk and freshwater stream dragonfly spotting.'
    },
    hourly: [
      { time: '14:00', condition: 'Gentle Breeze', icon: 'park', temp: 30, rainChance: 15, humidity: 76, windSpeed: '8 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 1.8, temp: 30, icon: 'cloud', condition: 'Overcast' },
      { id: 'bishan-ang-mo-kio', name: 'Bishan-Ang Mo Kio Park', distanceKm: 2.8, temp: 31, icon: 'partly_cloudy_day', condition: 'Sunny' }
    ],
    facilities: [
      { name: 'Drongo Canopy Boardwalk', icon: 'hiking', count: 1 },
      { name: 'Hanguana Freshwater Stream Trail', icon: 'water', count: 1 }
    ],
    summary: 'A 75-hectare green buffer park with specially curated elevated boardwalks over marshlands and rare native plant conservation zones.',
    crowdLevel: 'Low',
    humidity: 76,
    windSpeed: '8 km/h',
    airQualityPsi: 37,
    runningTrackKm: 4.4
  },

  'lower-peirce-reservoir': {
    id: 'lower-peirce-reservoir',
    name: 'Lower Peirce Reservoir Park',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/lower-peirce-reservoir-park',
    status: 'Open',
    updatedAgo: 'Updated 8 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Tranquil Waterside',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3702,
    lng: 103.8298,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 35, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Boardwalk runs along mature rubber tree plantations.',
      peakTime: '11:00 - 14:00'
    },
    bestTime: {
      start: '7:00 AM',
      end: '9:30 AM',
      description: 'Peaceful sunrise boardwalk overlooking tranquil reservoir waters.'
    },
    hourly: [
      { time: '14:00', condition: 'Water Breeze', icon: 'waves', temp: 30, rainChance: 15, humidity: 75, windSpeed: '9 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'upper-peirce-reservoir', name: 'Upper Peirce Reservoir', distanceKm: 2.1, temp: 29, icon: 'waves', condition: 'Quiet Reservoir' },
      { id: 'bishan-ang-mo-kio', name: 'Bishan-Ang Mo Kio Park', distanceKm: 2.4, temp: 31, icon: 'partly_cloudy_day', condition: 'Park' }
    ],
    facilities: [
      { name: '900m Scenic Timber Boardwalk', icon: 'directions_walk', count: 1 },
      { name: 'Historic Kalang Dam Lookout', icon: 'history', count: 1 }
    ],
    summary: 'Singapore’s second oldest reservoir, featuring a 900m wooden boardwalk through mature secondary rainforest and lakeside habitats.',
    crowdLevel: 'Low',
    humidity: 75,
    windSpeed: '9 km/h',
    airQualityPsi: 38,
    runningTrackKm: 3.2
  },

  'upper-peirce-reservoir': {
    id: 'upper-peirce-reservoir',
    name: 'Upper Peirce Reservoir Park',
    region: 'Central',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/upper-peirce-reservoir-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Secluded Waterside',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3688,
    lng: 103.8112,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 40, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Open dam crest with wide sky views.',
      peakTime: '11:00 - 14:00'
    },
    bestTime: {
      start: '6:30 AM',
      end: '9:00 AM',
      description: 'Ultra-quiet sunrise spot with misty water reflections.'
    },
    hourly: [
      { time: '14:00', condition: 'Quiet Breeze', icon: 'waves', temp: 29, rainChance: 20, humidity: 76, windSpeed: '8 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'lower-peirce-reservoir', name: 'Lower Peirce Reservoir', distanceKm: 2.1, temp: 30, icon: 'waves', condition: 'Boardwalk' },
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 3.5, temp: 30, icon: 'cloud', condition: 'Forest' }
    ],
    facilities: [
      { name: 'Reservoir Dam Promenade', icon: 'straighten', count: 1 },
      { name: 'Birdwatching Gazebos', icon: 'roofing', count: 2 }
    ],
    summary: 'A serene and secluded reservoir park nestled beside the Central Catchment forest, beloved for tranquil panoramic water views and monkey watching.',
    crowdLevel: 'Low',
    humidity: 76,
    windSpeed: '8 km/h',
    airQualityPsi: 36,
    runningTrackKm: 2.8
  },

  'toa-payoh': {
    id: 'toa-payoh',
    name: 'Toa Payoh Town Park',
    region: 'Central',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/toa-payoh-town-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 32,
    feelsLike: 35,
    condition: 'Sunny with Willow Pond',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3312,
    lng: 103.8488,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 55, time: '16:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Classic observation tower & weeping willows.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Evening stroll around the vintage 1970s Chinese garden bridges.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Bright', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 66, windSpeed: '11 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'bishan-ang-mo-kio', name: 'Bishan-Ang Mo Kio Park', distanceKm: 3.1, temp: 31, icon: 'partly_cloudy_day', condition: 'River' },
      { id: 'macritchie', name: 'MacRitchie Reservoir', distanceKm: 2.9, temp: 30, icon: 'cloud', condition: 'Trails' }
    ],
    facilities: [
      { name: 'Iconic 25m Observation Tower', icon: 'tower', count: 1 },
      { name: 'Rustic Willow Pond & Arched Bridges', icon: 'water', count: 1 }
    ],
    summary: 'A nostalgic retro 1970s town park featuring weeping willows, a picturesque koi and tortoise pond, arched bridges, and an iconic observation tower.',
    crowdLevel: 'Moderate',
    humidity: 66,
    windSpeed: '11 km/h',
    airQualityPsi: 43,
    runningTrackKm: 2.2
  },

  'kallang-riverside-park': {
    id: 'kallang-riverside-park',
    name: 'Kallang Riverside Park',
    region: 'Central',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/kallang-riverside-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'River Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3061,
    lng: 103.8681,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Water sports & riverside cycling corridor.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:30 PM',
      description: 'Golden hour kayak viewing and cycling along Kallang Basin with Singapore Sports Hub backdrop.'
    },
    hourly: [
      { time: '14:00', condition: 'Breezy River', icon: 'waves', temp: 31, rainChance: 10, humidity: 69, windSpeed: '14 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'gardens-by-the-bay', name: 'Gardens by the Bay', distanceKm: 2.8, temp: 32, icon: 'local_florist', condition: 'Waterfront' },
      { id: 'fort-canning', name: 'Fort Canning Park', distanceKm: 3.1, temp: 31, icon: 'castle', condition: 'Historic' }
    ],
    facilities: [
      { name: 'Water Sports Kayak/Canoe Launch Point', icon: 'kayaking', count: 2 },
      { name: 'Riverside Jogging Promenade', icon: 'directions_run', count: 1 }
    ],
    summary: 'A vibrant waterfront park flanked along both sides of the Kallang River, popular for dragon boating, kayaking, and scenic sunset running.',
    crowdLevel: 'Moderate',
    humidity: 69,
    windSpeed: '14 km/h',
    airQualityPsi: 41,
    runningTrackKm: 5.1
  },

  'ang-mo-kio-town-garden-west': {
    id: 'ang-mo-kio-town-garden-west',
    name: 'Ang Mo Kio Town Garden West',
    region: 'Central',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/ang-mo-kio-town-garden-west',
    status: 'Open',
    updatedAgo: 'Updated 18 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Hillside Breeze',
    conditionIcon: 'terrain',
    bgImageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3742,
    lng: 103.8441,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: '120-step staircase for cardio training.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '6:30 AM',
      end: '9:00 AM',
      description: 'Morning hill climbing and lotus pond stroll.'
    },
    hourly: [
      { time: '14:00', condition: 'Partly Sunny', icon: 'partly_cloudy_day', temp: 31, rainChance: 10, humidity: 68, windSpeed: '10 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'bishan-ang-mo-kio', name: 'Bishan-Ang Mo Kio Park', distanceKm: 1.2, temp: 31, icon: 'partly_cloudy_day', condition: 'Park' }
    ],
    facilities: [
      { name: '120-Step Forest Hilltop Staircase', icon: 'stairs', count: 1 },
      { name: 'Lotus Pond & Dragon Playground', icon: 'water', count: 1 }
    ],
    summary: 'Built on secondary forest hillock featuring a 120-step staircase to a hilltop plaza, lotus ponds, and forest trails.',
    crowdLevel: 'Low',
    humidity: 68,
    windSpeed: '10 km/h',
    airQualityPsi: 40,
    runningTrackKm: 3.5
  },

  'telok-blangah-hill-park': {
    id: 'telok-blangah-hill-park',
    name: 'Telok Blangah Hill Park',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/telok-blangah-hill-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Canopy Forest Walk',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2785,
    lng: 103.8118,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Elevated metal walkway through tree canopy.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Morning Forest Walk canopy trail connecting to Henderson Waves.'
    },
    hourly: [
      { time: '14:00', condition: 'Hilltop Breeze', icon: 'park', temp: 31, rainChance: 10, humidity: 70, windSpeed: '12 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'mount-faber', name: 'Mount Faber Park', distanceKm: 1.4, temp: 31, icon: 'terrain', condition: 'Ridge Peak' },
      { id: 'hortpark', name: 'HortPark', distanceKm: 1.1, temp: 31, icon: 'yard', condition: 'Gardening Hub' }
    ],
    facilities: [
      { name: '1.3km Elevated Forest Walk Grid', icon: 'hiking', count: 1 },
      { name: 'Terrace Garden 360° Panorama', icon: 'panorama', count: 1 },
      { name: 'Alkaff Mansion Heritage Dining', icon: 'restaurant', count: 1 }
    ],
    summary: 'Part of the Southern Ridges featuring the famous 1.3km elevated Forest Walk walkway weaving through secondary rainforest canopy.',
    crowdLevel: 'Moderate',
    humidity: 70,
    windSpeed: '12 km/h',
    airQualityPsi: 39,
    runningTrackKm: 4.8
  },

  'hortpark': {
    id: 'hortpark',
    name: 'HortPark (The Gardening Hub)',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/hortpark',
    status: 'Open',
    updatedAgo: 'Updated 14 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Flora & Sunshine',
    conditionIcon: 'local_florist',
    bgImageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2801,
    lng: 103.7997,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Themed gardens and native plant nurseries.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Explore butterfly gardens and native plant showcases.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Blooms', icon: 'local_florist', temp: 31, rainChance: 10, humidity: 69, windSpeed: '11 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'kent-ridge-park', name: 'Kent Ridge Park', distanceKm: 1.3, temp: 31, icon: 'park', condition: 'Canopy' },
      { id: 'telok-blangah-hill-park', name: 'Telok Blangah Hill Park', distanceKm: 1.1, temp: 31, icon: 'terrain', condition: 'Southern Ridges' }
    ],
    facilities: [
      { name: 'Butterfly Habitat Sanctuary', icon: 'flutter', count: 1 },
      { name: 'NParks Community Garden Showcase', icon: 'yard', count: 10 },
      { name: 'Nature Playgarden for Toddlers', icon: 'toys', count: 1 }
    ],
    summary: 'A one-stop 23-hectare gardening resource hub connecting Kent Ridge Park and Telok Blangah Hill Park, filled with themed trial gardens and educational workshops.',
    crowdLevel: 'Low',
    humidity: 69,
    windSpeed: '11 km/h',
    airQualityPsi: 38,
    runningTrackKm: 3.6
  },

  'kent-ridge-park': {
    id: 'kent-ridge-park',
    name: 'Kent Ridge Park',
    region: 'Central',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/kent-ridge-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Coastal Ridge Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2828,
    lng: 103.7915,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Historical WWII battle site and canopy walk.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '4:30 PM',
      end: '7:00 PM',
      description: 'Canopy Walk birdwatching and sea view across Pasir Panjang port.'
    },
    hourly: [
      { time: '14:00', condition: 'Ridge Wind', icon: 'park', temp: 31, rainChance: 10, humidity: 70, windSpeed: '13 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'hortpark', name: 'HortPark', distanceKm: 1.3, temp: 31, icon: 'local_florist', condition: 'Flora' },
      { id: 'west-coast-park', name: 'West Coast Park', distanceKm: 3.2, temp: 32, icon: 'waves', condition: 'Seaside' }
    ],
    facilities: [
      { name: '280m Canopy Walkway Suspended Boardwalk', icon: 'hiking', count: 1 },
      { name: 'Reflections at Bukit Chandu WWII Museum', icon: 'museum', count: 1 },
      { name: 'Heritage Mountain Fitness Trails', icon: 'fitness_center', count: 2 }
    ],
    summary: 'A 47-hectare historical park with rich biodiversity and commanding views of the southern coast, site of the valiant WWII Battle of Pasir Panjang.',
    crowdLevel: 'Low',
    humidity: 70,
    windSpeed: '13 km/h',
    airQualityPsi: 39,
    runningTrackKm: 4.0
  },

  'dhoby-ghaut-green': {
    id: 'dhoby-ghaut-green',
    name: 'Dhoby Ghaut Green & Istana Park',
    region: 'Central',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/dhoby-ghaut-green',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Urban Sunshine',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2989,
    lng: 103.8461,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Open urban lawn right at Orchard Road gateway.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '8:00 PM',
      description: 'Evening open-air amphitheatre and Istana Festival Arch reflection pool stroll.'
    },
    hourly: [
      { time: '14:00', condition: 'Urban Sun', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 65, windSpeed: '10 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'fort-canning', name: 'Fort Canning Park', distanceKm: 0.8, temp: 31, icon: 'castle', condition: 'Historic' }
    ],
    facilities: [
      { name: 'Open Lawn Amphitheatre & Sculpture Plaza', icon: 'theater_comedy', count: 1 },
      { name: 'Visual Arts Centre Gallery', icon: 'palette', count: 1 }
    ],
    summary: 'A modern urban civic park serving as a tranquil green lung in the heart of the Orchard shopping and arts precinct.',
    crowdLevel: 'Moderate',
    humidity: 65,
    windSpeed: '10 km/h',
    airQualityPsi: 42,
    runningTrackKm: 1.8
  },

  'pearls-hill-city-park': {
    id: 'pearls-hill-city-park',
    name: 'Pearl’s Hill City Park',
    region: 'Central',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/pearls-hill-city-park',
    status: 'Open',
    updatedAgo: 'Updated 20 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Hilltop Lotus Haven',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2847,
    lng: 103.8406,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Hidden hilltop oasis above Chinatown.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Peaceful stroll by the hilltop pond blooming with pink water lilies.'
    },
    hourly: [
      { time: '14:00', condition: 'Hilltop Shade', icon: 'park', temp: 31, rainChance: 10, humidity: 68, windSpeed: '11 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'fort-canning', name: 'Fort Canning Park', distanceKm: 1.6, temp: 31, icon: 'castle', condition: 'Heritage' }
    ],
    facilities: [
      { name: 'Historic Service Reservoir Pond', icon: 'water', count: 1 },
      { name: 'Tembusu Heritage Woodland', icon: 'park', count: 1 }
    ],
    summary: 'A secluded hilltop sanctuary nestled above Chinatown, centered around a historic reservoir pond surrounded by mature Tembusu trees.',
    crowdLevel: 'Low',
    humidity: 68,
    windSpeed: '11 km/h',
    airQualityPsi: 41,
    runningTrackKm: 2.1
  }
};
