import { Park } from '../types';

export const PARKS_EAST: Record<string, Omit<Park, 'historical24h' | 'forecast7Day'>> = {
  'east-coast-park': {
    id: 'east-coast-park',
    name: 'East Coast Park',
    region: 'East',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/east-coast-park',
    status: 'Open',
    updatedAgo: 'Updated 4 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Coastal Sea Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3008,
    lng: 103.9122,
    rainProbability: [
      { label: 'Now', percentage: 5, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 20, time: '15:00', tier: 'Low' },
      { label: '+8h', percentage: 45, time: '16:00', tier: 'Medium' },
      { label: '+12h', percentage: 25, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 10, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 8,
      level: 'Very High',
      advice: 'High UV exposure along open sandy beaches. Sunglasses and sunscreen essential.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:45 PM',
      description: 'Golden hour ocean breezes, perfect for seaside rollerblading, cycling, and beachside BBQ.'
    },
    hourly: [
      { time: '14:00', condition: 'Sea Breeze & Sun', icon: 'wb_sunny', temp: 31, rainChance: 5, humidity: 66, windSpeed: '18 km/h ESE' },
      { time: '15:00', condition: 'Partly Cloudy', icon: 'partly_cloudy_day', temp: 31, rainChance: 20, humidity: 70, windSpeed: '19 km/h ESE' },
      { time: '16:00', condition: 'Passing Coastal Clouds', icon: 'cloud', temp: 30, rainChance: 45, humidity: 76, windSpeed: '22 km/h SE' }
    ],
    alerts: [],
    nearby: [
      { id: 'bedok-reservoir', name: 'Bedok Reservoir Park', distanceKm: 4.8, temp: 31, icon: 'waves', condition: 'Reservoir Breeze' },
      { id: 'changi-beach', name: 'Changi Beach Park', distanceKm: 8.5, temp: 30, icon: 'waves', condition: 'Coastal' }
    ],
    facilities: [
      { name: '15km Dedicated Coastline Cycling Lane', icon: 'directions_bike', count: 1 },
      { name: 'Coastal PlayGrove 16m Vertical Tower', icon: 'toys', count: 1 },
      { name: 'BBQ Pit Clusters (Area B to G)', icon: 'outdoor_grill', count: 80 },
      { name: 'Marine Cove Beach Playground', icon: 'sports_kabaddi', count: 1 }
    ],
    summary: 'Singapore’s most cherished coastal escape spanning 185 hectares along 15km of scenic shoreline, offering beach sports, camping, and cycling.',
    crowdLevel: 'High',
    humidity: 66,
    windSpeed: '18 km/h',
    airQualityPsi: 44,
    runningTrackKm: 15.0
  },

  'pasir-ris': {
    id: 'pasir-ris',
    name: 'Pasir Ris Park',
    region: 'East',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/pasir-ris-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Mangrove Coastal Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3785,
    lng: 103.9515,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 50, time: '16:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: '6-hectare mangrove boardwalk provides good natural shade.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Mangrove boardwalk birdwatching and mudskipper spotting before high tide.'
    },
    hourly: [
      { time: '14:00', condition: 'Breezy Coast', icon: 'waves', temp: 31, rainChance: 10, humidity: 70, windSpeed: '15 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'pasir-ris-town-park', name: 'Pasir Ris Town Park', distanceKm: 1.2, temp: 31, icon: 'park', condition: 'Fishing Pond' },
      { id: 'changi-beach', name: 'Changi Beach Park', distanceKm: 6.2, temp: 30, icon: 'waves', condition: 'Beach' }
    ],
    facilities: [
      { name: '6-Hectare Preserved Mangrove Boardwalk', icon: 'hiking', count: 1 },
      { name: '3-Storey Bird Watching Observation Tower', icon: 'visibility', count: 1 },
      { name: 'Pasir Ris Giant Adventure Playground', icon: 'toys', count: 1 }
    ],
    summary: 'A 70-hectare seaside park featuring a preserved 6-hectare mangrove forest, a 3-storey bird watching tower, and expansive beach picnic grounds.',
    crowdLevel: 'Moderate',
    humidity: 70,
    windSpeed: '15 km/h',
    airQualityPsi: 40,
    runningTrackKm: 7.2
  },

  'changi-beach': {
    id: 'changi-beach',
    name: 'Changi Beach Park',
    region: 'East',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/changi-beach-park',
    status: 'Open',
    updatedAgo: 'Updated 8 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Open Sea Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3912,
    lng: 103.9934,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 20, time: '15:00', tier: 'Low' },
      { label: '+8h', percentage: 40, time: '16:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Pristine white sandy beaches with airplane spotting.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:30 PM',
      description: 'Spectacular sunset stroll watching low-altitude flights landing into Changi Airport.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Coastal Breeze', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 68, windSpeed: '17 km/h ENE' }
    ],
    alerts: [],
    nearby: [
      { id: 'changi-point-coastal-walk', name: 'Changi Point Coastal Walk', distanceKm: 1.5, temp: 30, icon: 'waves', condition: 'Cliff Walk' },
      { id: 'pulau-ubin', name: 'Pulau Ubin (Ferry from Changi)', distanceKm: 3.5, temp: 29, icon: 'park', condition: 'Rustic' }
    ],
    facilities: [
      { name: '3.3km Coastal Beachfront Promenade', icon: 'directions_walk', count: 1 },
      { name: 'Low-flying Plane Spotting Beachfront', icon: 'flight_land', count: 1 },
      { name: 'Changi Beach Seafood & Bistro Area', icon: 'restaurant', count: 2 }
    ],
    summary: 'One of the oldest coastal parks in Singapore retaining a distinct 1960s rustic kampung beach atmosphere, extending from Changi Point to Telok Paku.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '17 km/h',
    airQualityPsi: 39,
    runningTrackKm: 6.6
  },

  'bedok-reservoir': {
    id: 'bedok-reservoir',
    name: 'Bedok Reservoir Park',
    region: 'East',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/bedok-reservoir-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Open Reservoir Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3402,
    lng: 103.9312,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 55, time: '16:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Paved & pebbled 4.3km continuous running track around waters.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '6:00 PM',
      end: '8:00 PM',
      description: 'Cool evening running loop and sunset reflections on the reservoir.'
    },
    hourly: [
      { time: '14:00', condition: 'Sun & Lake Wind', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 68, windSpeed: '14 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'tampines-eco-green', name: 'Tampines Eco Green', distanceKm: 2.8, temp: 31, icon: 'park', condition: 'Eco Reserve' },
      { id: 'east-coast-park', name: 'East Coast Park', distanceKm: 4.8, temp: 31, icon: 'waves', condition: 'Beach' }
    ],
    facilities: [
      { name: '4.3km Continuous Reservoir Jogging Loop', icon: 'directions_run', count: 1 },
      { name: 'Forest Adventure Treetop Obstacle Course', icon: 'sports_score', count: 1 },
      { name: 'Water Sports Kayaking & Dragon Boat Deck', icon: 'kayaking', count: 1 }
    ],
    summary: 'Surrounding a former sand quarry converted into a 88-hectare reservoir, popular for dragon boating, jogging, and Forest Adventure treetop obstacles.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '14 km/h',
    airQualityPsi: 41,
    runningTrackKm: 4.3
  },

  'tampines-eco-green': {
    id: 'tampines-eco-green',
    name: 'Tampines Eco Green',
    region: 'East',
    category: 'Ecological & Wetland',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/tampines-eco-green',
    status: 'Open',
    updatedAgo: 'Updated 12 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Natural Meadow Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3592,
    lng: 103.9472,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Rustic natural grass paths. No streetlights (closes at 7pm).',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Spot diverse bird species, wetland dragonflies, and natural freshwater marsh.'
    },
    hourly: [
      { time: '14:00', condition: 'Meadow Breeze', icon: 'park', temp: 31, rainChance: 10, humidity: 71, windSpeed: '12 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'sun-plaza-park', name: 'Sun Plaza Park', distanceKm: 1.1, temp: 31, icon: 'wb_sunny', condition: 'Park' },
      { id: 'bedok-reservoir', name: 'Bedok Reservoir Park', distanceKm: 2.8, temp: 31, icon: 'waves', condition: 'Reservoir' }
    ],
    facilities: [
      { name: 'Eco-Friendly Woodchip & Carpet Grass Trails', icon: 'hiking', count: 3 },
      { name: 'Natural Freshwater Wetland & Bird Hides', icon: 'visibility', count: 2 }
    ],
    summary: 'A 36-hectare eco-friendly non-motorized sanctuary featuring open grasslands, freshwater wetlands, and secondary rainforest without artificial lighting.',
    crowdLevel: 'Low',
    humidity: 71,
    windSpeed: '12 km/h',
    airQualityPsi: 39,
    runningTrackKm: 3.8
  },

  'tampines-central-park': {
    id: 'tampines-central-park',
    name: 'Tampines Central Park',
    region: 'East',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/tampines-central-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 32,
    feelsLike: 35,
    condition: 'Town Sunshine',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3538,
    lng: 103.9421,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Iconic retro fruit playground.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Family evening with the famous Watermelon and Mangosteen mosaic playgrounds.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Lively', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 67, windSpeed: '11 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'tampines-eco-green', name: 'Tampines Eco Green', distanceKm: 1.2, temp: 31, icon: 'park', condition: 'Eco Trails' }
    ],
    facilities: [
      { name: 'Iconic Mosaic Watermelon & Mangosteen Playground', icon: 'toys', count: 1 },
      { name: 'Community Amphitheatre Plaza', icon: 'theater_comedy', count: 1 }
    ],
    summary: 'A vibrant neighbourhood park renowned for its iconic 1980s heritage fruit playgrounds (Watermelon and Mangosteen) and open lawn plaza.',
    crowdLevel: 'Moderate',
    humidity: 67,
    windSpeed: '11 km/h',
    airQualityPsi: 41,
    runningTrackKm: 2.4
  },

  'sun-plaza-park': {
    id: 'sun-plaza-park',
    name: 'Sun Plaza Park',
    region: 'East',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/sun-plaza-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Pleasant Sun',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3615,
    lng: 103.9458,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Sense Discovery Garden with textured plants and sounds.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:30 AM',
      end: '10:30 AM',
      description: 'Sensory stroll through acoustic and aromatic plant trails.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Garden', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 68, windSpeed: '12 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'tampines-eco-green', name: 'Tampines Eco Green', distanceKm: 0.9, temp: 31, icon: 'park', condition: 'Marshland' }
    ],
    facilities: [
      { name: 'Sense Discovery Garden (Tactile & Acoustic)', icon: 'hearing', count: 1 },
      { name: 'Beach Volleyball Court', icon: 'sports_volleyball', count: 1 }
    ],
    summary: 'A 9.6-hectare park with an experiential Sense Discovery Garden featuring chimes, textured plants, and fitness corners.',
    crowdLevel: 'Low',
    humidity: 68,
    windSpeed: '12 km/h',
    airQualityPsi: 40,
    runningTrackKm: 2.6
  },

  'pasir-ris-town-park': {
    id: 'pasir-ris-town-park',
    name: 'Pasir Ris Town Park',
    region: 'East',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/pasir-ris-town-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Pond Breeze',
    conditionIcon: 'water',
    bgImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3718,
    lng: 103.9531,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Large commercial fishing pond and shaded footpaths.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Pondside stroll and open-air hawker dining nearby.'
    },
    hourly: [
      { time: '14:00', condition: 'Lake Sun', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 69, windSpeed: '13 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'pasir-ris', name: 'Pasir Ris Park', distanceKm: 1.2, temp: 31, icon: 'waves', condition: 'Coast' }
    ],
    facilities: [
      { name: 'Marine Fishing Pond & Catch-and-Release', icon: 'phishing', count: 1 },
      { name: 'Pasir Ris Central Hawker Centre', icon: 'restaurant', count: 1 }
    ],
    summary: 'A 14-hectare town park centered on a vast marine fishing pond, popular for anglers, morning tai chi, and evening family strolls.',
    crowdLevel: 'Moderate',
    humidity: 69,
    windSpeed: '13 km/h',
    airQualityPsi: 40,
    runningTrackKm: 2.5
  },

  'changi-point-coastal-walk': {
    id: 'changi-point-coastal-walk',
    name: 'Changi Point Coastal Walk',
    region: 'East',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/changi-point-coastal-walk',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Coastal Cliff Sea Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3934,
    lng: 103.9878,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Overwater wooden boardwalk skirting dramatic rocky coastline.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:45 PM',
      end: '7:30 PM',
      description: 'Famous Sunset Walk section on timber stilts over the sea.'
    },
    hourly: [
      { time: '14:00', condition: 'Sea Wind', icon: 'waves', temp: 30, rainChance: 10, humidity: 68, windSpeed: '16 km/h E' }
    ],
    alerts: [],
    nearby: [
      { id: 'changi-beach', name: 'Changi Beach Park', distanceKm: 1.5, temp: 30, icon: 'waves', condition: 'Beach' }
    ],
    facilities: [
      { name: '2.2km Timber Coastal Boardwalk (6 Distinct Sections)', icon: 'directions_walk', count: 1 },
      { name: 'Sunset Walk Overwater Lookouts', icon: 'wb_twilight', count: 3 }
    ],
    summary: 'A 2.2km continuous timber boardwalk hugging the coastline, composed of Creek Walk, Beach Walk, Sailing Point Walk, Cliff Walk, Kelong Walk, and Sunset Walk.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '16 km/h',
    airQualityPsi: 38,
    runningTrackKm: 2.2
  }
};
