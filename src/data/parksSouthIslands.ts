import { Park } from '../types';

export const PARKS_SOUTH_ISLANDS: Record<string, Omit<Park, 'historical24h' | 'forecast7Day'>> = {
  'gardens-by-the-bay': {
    id: 'gardens-by-the-bay',
    name: 'Gardens by the Bay & Bay East',
    region: 'South',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/gardens-by-the-bay',
    status: 'Open',
    updatedAgo: 'Updated 5 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Marina Waterfront Breeze',
    conditionIcon: 'local_florist',
    bgImageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2816,
    lng: 103.8636,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 55, time: '16:00', tier: 'Medium' },
      { label: '+12h', percentage: 25, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 10, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Supertrees, cooled Flower Dome & Cloud Forest conservatories.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '6:00 PM',
      end: '8:45 PM',
      description: 'Garden Rhapsody Supertree light and sound show (7:45 PM & 8:45 PM) with Marina skyline views.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Waterfront', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 66, windSpeed: '16 km/h SE' },
      { time: '15:00', condition: 'Partly Cloudy', icon: 'partly_cloudy_day', temp: 31, rainChance: 25, humidity: 71, windSpeed: '17 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'marina-barrage', name: 'Marina Barrage Green Roof', distanceKm: 0.9, temp: 32, icon: 'kitesurfing', condition: 'Kite Lawn' },
      { id: 'kallang-riverside-park', name: 'Kallang Riverside Park', distanceKm: 2.8, temp: 31, icon: 'waves', condition: 'River' }
    ],
    facilities: [
      { name: '18 Iconic Vertical Supertrees & OCBC Skyway', icon: 'forest', count: 18 },
      { name: 'Cooled Flower Dome & Cloud Forest Glass Houses', icon: 'ac_unit', count: 2 },
      { name: 'Far East Organization Children’s Garden Water Play', icon: 'sports_kabaddi', count: 1 }
    ],
    summary: 'A world-famous 101-hectare horticultural masterpiece boasting futuristic Supertree structures, the cooled Flower Dome & Cloud Forest, and tranquil Bay East waterfront promenade.',
    crowdLevel: 'High',
    humidity: 66,
    windSpeed: '16 km/h',
    airQualityPsi: 42,
    runningTrackKm: 8.8
  },

  'marina-barrage': {
    id: 'marina-barrage',
    name: 'Marina Barrage & Promenade',
    region: 'South',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/marina-barrage',
    status: 'Open',
    updatedAgo: 'Updated 5 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Open Ocean Breeze',
    conditionIcon: 'kitesurfing',
    bgImageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2806,
    lng: 103.8711,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 8,
      level: 'Very High',
      advice: 'Expansive elevated grass roof. Singapore’s premier kite flying venue.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Kite flying on the rooftop green lawn and unobstructed sunset view of Marina Bay Sands.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Windy', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 65, windSpeed: '20 km/h SSE' }
    ],
    alerts: [],
    nearby: [
      { id: 'gardens-by-the-bay', name: 'Gardens by the Bay', distanceKm: 0.9, temp: 32, icon: 'local_florist', condition: 'Supertrees' }
    ],
    facilities: [
      { name: 'Sloping Rooftop Green Lawn for Kite Flying & Picnics', icon: 'kitesurfing', count: 1 },
      { name: 'Sustainable Singapore Gallery & Water Fountain Plaza', icon: 'water', count: 1 }
    ],
    summary: 'Built across the mouth of Marina Channel creating Singapore’s 15th reservoir, famous for its elevated rooftop green lawn with 360-degree skyline and sea panoramas.',
    crowdLevel: 'High',
    humidity: 65,
    windSpeed: '20 km/h',
    airQualityPsi: 43,
    runningTrackKm: 4.5
  },

  'mount-faber': {
    id: 'mount-faber',
    name: 'Mount Faber Park & Faber Peak',
    region: 'South',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/mount-faber-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Hilltop Sea Breeze',
    conditionIcon: 'terrain',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2731,
    lng: 103.8181,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Cable car terminal connecting to Sentosa & Henderson Waves bridge.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:30 PM',
      end: '8:00 PM',
      description: 'Sunset over Sentosa island and evening walk across illuminated Henderson Waves.'
    },
    hourly: [
      { time: '14:00', condition: 'Hilltop Sun', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 68, windSpeed: '14 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'telok-blangah-hill-park', name: 'Telok Blangah Hill Park', distanceKm: 1.4, temp: 31, icon: 'park', condition: 'Canopy' },
      { id: 'labrador-nature-reserve', name: 'Labrador Nature Reserve', distanceKm: 2.8, temp: 31, icon: 'waves', condition: 'Coast' }
    ],
    facilities: [
      { name: 'Henderson Waves (Highest Pedestrian Bridge in SG - 36m)', icon: 'bridge', count: 1 },
      { name: 'Singapore Cable Car Sentosa Line Hub', icon: 'tram', count: 1 },
      { name: 'Faber Point Merlion Lookout & Polish Bell', icon: 'visibility', count: 1 }
    ],
    summary: 'One of the oldest parks in Singapore offering sweeping views of the city, harbour, and southern islands, linked to Telok Blangah Hill via Henderson Waves.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '14 km/h',
    airQualityPsi: 40,
    runningTrackKm: 4.8
  },

  'labrador-nature-reserve': {
    id: 'labrador-nature-reserve',
    name: 'Labrador Nature Reserve & Coastal Walk',
    region: 'South',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/labrador-nature-reserve',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Coastal Cliff Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2667,
    lng: 103.8021,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'The only mainland rocky sea-cliff in Singapore with WWII artillery guns.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Berlayer Creek mangrove boardwalk followed by sea-cliff sunset stroll.'
    },
    hourly: [
      { time: '14:00', condition: 'Coastal Sun', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 69, windSpeed: '16 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'mount-faber', name: 'Mount Faber Park', distanceKm: 2.8, temp: 31, icon: 'terrain', condition: 'Peak' },
      { id: 'hortpark', name: 'HortPark', distanceKm: 2.2, temp: 31, icon: 'local_florist', condition: 'Flora' }
    ],
    facilities: [
      { name: 'Bukit Chermin Coastal Boardwalk Overwater Walk', icon: 'hiking', count: 1 },
      { name: 'Berlayer Creek Mangrove Boardwalk (at Labrador MRT)', icon: 'water', count: 1 },
      { name: 'Historic WWII 6-Inch Gun Turrets & Tunnels', icon: 'shield', count: 2 },
      { name: 'Iconic Red Beacon (Dragon’s Teeth Gate replica)', icon: 'light', count: 1 }
    ],
    summary: 'A 22-hectare coastal nature reserve holding the only rocky sea cliff on mainland Singapore, featuring rich secondary forest, WWII war relics, and Berlayer Creek boardwalk.',
    crowdLevel: 'Moderate',
    humidity: 69,
    windSpeed: '16 km/h',
    airQualityPsi: 39,
    runningTrackKm: 4.2
  },

  'pulau-ubin': {
    id: 'pulau-ubin',
    name: 'Pulau Ubin & Chek Jawa Wetlands',
    region: 'Islands',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/pulau-ubin-and-chek-jawa-wetlands',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 29,
    feelsLike: 33,
    condition: 'Rustic Island Sea Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4128,
    lng: 103.9572,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Bumboat ferry from Changi Point Ferry Terminal ($4). Rustic trails & bike rentals.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '8:00 AM',
      end: '11:30 AM',
      description: 'Check Chek Jawa tide table for morning intertidal walks across 6 distinct ecosystems.'
    },
    hourly: [
      { time: '14:00', condition: 'Island Sea Breeze', icon: 'park', temp: 29, rainChance: 10, humidity: 75, windSpeed: '15 km/h ENE' }
    ],
    alerts: [],
    nearby: [
      { id: 'changi-beach', name: 'Changi Beach Park', distanceKm: 3.5, temp: 30, icon: 'waves', condition: 'Coast' }
    ],
    facilities: [
      { name: 'Chek Jawa 1.1km Coastal & Mangrove Boardwalk', icon: 'hiking', count: 1 },
      { name: 'Ketam Mountain Bike Park (International Grade)', icon: 'directions_bike', count: 1 },
      { name: 'Jejawi Tower 20m Canopy Lookout', icon: 'tower', count: 1 },
      { name: 'Authentic 1960s Rustic Kampung Heritage', icon: 'holiday_village', count: 1 }
    ],
    summary: 'A 1,020-hectare pristine island offering a nostalgic step back to 1960s Singapore, featuring the famed Chek Jawa intertidal coastal ecosystem and Ketam Mountain Bike Park.',
    crowdLevel: 'Moderate',
    humidity: 75,
    windSpeed: '15 km/h',
    airQualityPsi: 33,
    runningTrackKm: 18.5
  },

  'sisters-islands-marine-park': {
    id: 'sisters-islands-marine-park',
    name: 'Sisters’ Islands Marine Park',
    region: 'Islands',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/sisters-islands-marine-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Open Coral Reef Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2144,
    lng: 103.8339,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 8,
      level: 'Very High',
      advice: 'Singapore’s first Marine Park. Coral nursery and dive trails.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '8:30 AM',
      end: '11:30 AM',
      description: 'Morning intertidal reef exploration and ocean diving during clear slack tides.'
    },
    hourly: [
      { time: '14:00', condition: 'Ocean Sun', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 72, windSpeed: '18 km/h SSE' }
    ],
    alerts: [],
    nearby: [
      { id: 'st-johns-island', name: 'St John’s & Lazarus Island', distanceKm: 2.1, temp: 30, icon: 'beach_access', condition: 'White Beach' }
    ],
    facilities: [
      { name: 'Submerged Marine Dive Trails (Circular & Shallow)', icon: 'scuba_diving', count: 2 },
      { name: 'NParks Coral Nursery & Sea Turtle Sanctuary', icon: 'pets', count: 1 },
      { name: 'Intertidal Lagoon Boardwalk', icon: 'hiking', count: 1 }
    ],
    summary: 'Spanning 40 hectares of coral reefs and marine habitats, Singapore’s first Marine Park dedicated to marine biodiversity conservation, reef research, and public education.',
    crowdLevel: 'Low',
    humidity: 72,
    windSpeed: '18 km/h',
    airQualityPsi: 32,
    runningTrackKm: 2.5
  },

  'st-johns-island': {
    id: 'st-johns-island',
    name: 'St John’s & Lazarus Island (Pulau Sakijang)',
    region: 'Islands',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/st-john-island',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Turquoise Lagoon Breeze',
    conditionIcon: 'beach_access',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2185,
    lng: 103.8488,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 8,
      level: 'Very High',
      advice: 'Crescent-shaped white sand beach at Lazarus Island via paved causeway.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '9:00 AM',
      end: '12:30 PM',
      description: 'Lazarus C-shaped beach picnic and marine laboratory trail walk.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Lagoon', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 70, windSpeed: '17 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'sisters-islands-marine-park', name: 'Sisters’ Islands Marine Park', distanceKm: 2.1, temp: 30, icon: 'waves', condition: 'Marine Park' },
      { id: 'kusu-island', name: 'Kusu Island (Tortoise Island)', distanceKm: 1.8, temp: 30, icon: 'temple_buddhist', condition: 'Shrines' }
    ],
    facilities: [
      { name: 'Lazarus C-Shaped Pristine White Sand Beach', icon: 'beach_access', count: 1 },
      { name: 'St John’s Island National Marine Laboratory & Gallery', icon: 'biotech', count: 1 },
      { name: 'Paved Inter-Island Causeway & Solar Bicycle Hire', icon: 'directions_bike', count: 1 }
    ],
    summary: 'A tranquil southern island escape connected by a causeway to Lazarus Island, celebrated for Singapore’s cleanest turquoise waters, white sand beaches, and feline friends.',
    crowdLevel: 'Moderate',
    humidity: 70,
    windSpeed: '17 km/h',
    airQualityPsi: 32,
    runningTrackKm: 5.2
  },

  'kusu-island': {
    id: 'kusu-island',
    name: 'Kusu Island (Tortoise Island)',
    region: 'Islands',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/kusu-island',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Island Heritage Breeze',
    conditionIcon: 'temple_buddhist',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2228,
    lng: 103.8601,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 8,
      level: 'Very High',
      advice: 'Da Bo Gong Temple, 152 steps to Keramat shrines, and turtle sanctuary.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '9:00 AM',
      end: '11:30 AM',
      description: 'Visit the historic Chinese temple, climb to hilltop shrines, and stroll calm swimming lagoons.'
    },
    hourly: [
      { time: '14:00', condition: 'Lagoon Sun', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 71, windSpeed: '16 km/h S' }
    ],
    alerts: [],
    nearby: [
      { id: 'st-johns-island', name: 'St John’s & Lazarus Island', distanceKm: 1.8, temp: 30, icon: 'beach_access', condition: 'Lagoon' }
    ],
    facilities: [
      { name: 'Tua Pek Kong (Da Bo Gong) Chinese Temple (1923)', icon: 'temple_buddhist', count: 1 },
      { name: '152-Step Hilltop Malay Kramat Shrines', icon: 'stairs', count: 1 },
      { name: 'Live Tortoise Sanctuary Ponds', icon: 'pets', count: 2 },
      { name: 'Sheltered Swimming Beach Lagoons', icon: 'pool', count: 2 }
    ],
    summary: 'A sacred 5.6-hectare island legendarily formed by a giant sea tortoise, home to the popular Da Bo Gong temple, three hilltop Malay Kramat shrines, and turtle sanctuaries.',
    crowdLevel: 'Low',
    humidity: 71,
    windSpeed: '16 km/h',
    airQualityPsi: 33,
    runningTrackKm: 1.8
  }
};
