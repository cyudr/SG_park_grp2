import { Park } from '../types';

export const PARKS_WEST: Record<string, Omit<Park, 'historical24h' | 'forecast7Day'>> = {
  'jurong-lake-gardens': {
    id: 'jurong-lake-gardens',
    name: 'Jurong Lake Gardens',
    region: 'West',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/jurong-lake-gardens',
    status: 'Open',
    updatedAgo: 'Updated 5 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Open Grassland Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3404,
    lng: 103.7298,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 60, time: '16:00', tier: 'High' },
      { label: '+12h', percentage: 30, time: '17:00', tier: 'Medium' },
      { label: '+18h', percentage: 10, time: '20:00', tier: 'Low' },
      { label: '+24h', percentage: 5, time: '14:00+1', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Expansive open grasslands around the Lone Tree and Grasslands.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:45 PM',
      description: 'Iconic sunset at The Grasslands, Rasau Walk, and Forest Ramble playground.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Warm', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 66, windSpeed: '12 km/h W' },
      { time: '15:00', condition: 'Partly Cloudy', icon: 'partly_cloudy_day', temp: 31, rainChance: 30, humidity: 72, windSpeed: '15 km/h WSW' }
    ],
    alerts: [],
    nearby: [
      { id: 'jurong-central-park', name: 'Jurong Central Park', distanceKm: 1.8, temp: 32, icon: 'sports_esports', condition: 'Board Game Park' },
      { id: 'pandan-reservoir', name: 'Pandan Reservoir', distanceKm: 3.6, temp: 31, icon: 'waves', condition: 'Waterside' }
    ],
    facilities: [
      { name: 'Forest Ramble Nature Playground (13 Play Zones)', icon: 'toys', count: 1 },
      { name: 'Rasau Walk Meandering Wetland Boardwalk', icon: 'hiking', count: 1 },
      { name: 'Clusia Cove Water Play Pool', icon: 'water', count: 1 },
      { name: 'Water Sports Kayaking & Dragon Boating Hub', icon: 'kayaking', count: 1 }
    ],
    summary: 'Singapore’s third national garden spanning 90 hectares, crafted around Jurong Lake with restored freshwater swamp forests, Rasau Walk, and the iconic Lone Tree.',
    crowdLevel: 'Moderate',
    humidity: 66,
    windSpeed: '12 km/h',
    airQualityPsi: 41,
    runningTrackKm: 9.5
  },

  'west-coast-park': {
    id: 'west-coast-park',
    name: 'West Coast Park',
    region: 'West',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/west-coast-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Port Sea Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2882,
    lng: 103.7668,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 30, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'The "Play Centre in the West" with mega climbing pyramid.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Evening ocean view, kite flying on Grand Lawn, and campsite breeze.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Coast', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 68, windSpeed: '16 km/h SSW' }
    ],
    alerts: [],
    nearby: [
      { id: 'clementi-woods-park', name: 'Clementi Woods Park', distanceKm: 1.2, temp: 31, icon: 'park', condition: 'Woodland' },
      { id: 'labrador-nature-reserve', name: 'Labrador Nature Reserve', distanceKm: 4.8, temp: 31, icon: 'waves', condition: 'Coast' }
    ],
    facilities: [
      { name: 'Adventure Play Area (Giant Pyramid & Flying Fox)', icon: 'toys', count: 8 },
      { name: 'Grand Lawn Kite Flying Field', icon: 'kitesurfing', count: 1 },
      { name: 'Dog Run & Seaside BBQ Pits', icon: 'pets', count: 1 }
    ],
    summary: 'A 50-hectare coastal park dubbed the "Play Centre in the West", featuring a massive adventure playground with 8 play areas, sea views, and dog runs.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '16 km/h',
    airQualityPsi: 40,
    runningTrackKm: 6.8
  },

  'bukit-batok-nature-park': {
    id: 'bukit-batok-nature-park',
    name: 'Bukit Batok Nature Park',
    region: 'West',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/bukit-batok-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Quarry Cliff Shade',
    conditionIcon: 'terrain',
    bgImageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3498,
    lng: 103.7631,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 40, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Towering granite quarry cliff and WWII memorial site.',
      peakTime: '11:30 - 14:30'
    },
    bestTime: {
      start: '7:00 AM',
      end: '9:30 AM',
      description: 'Morning misty reflection over the quarry pool and WWII memorial stair climb.'
    },
    hourly: [
      { time: '14:00', condition: 'Cliff Breeze', icon: 'terrain', temp: 30, rainChance: 15, humidity: 75, windSpeed: '9 km/h W' }
    ],
    alerts: [],
    nearby: [
      { id: 'bukit-batok-town-park', name: 'Bukit Batok Town Park (Little Guilin)', distanceKm: 1.4, temp: 30, icon: 'terrain', condition: 'Granite Lake' },
      { id: 'bukit-timah', name: 'Bukit Timah Nature Reserve', distanceKm: 1.9, temp: 29, icon: 'park', condition: 'Summit' }
    ],
    facilities: [
      { name: 'Disused Granite Quarry Pool Lookout', icon: 'terrain', count: 1 },
      { name: 'WWII Syonan Chureito Memorial Plaque', icon: 'history', count: 1 }
    ],
    summary: 'A 36-hectare serene nature park developed on an abandoned quarry site featuring deep quarry waters, dramatic granite cliff faces, and WWII memorial history.',
    crowdLevel: 'Low',
    humidity: 75,
    windSpeed: '9 km/h',
    airQualityPsi: 37,
    runningTrackKm: 3.5
  },

  'bukit-batok-town-park': {
    id: 'bukit-batok-town-park',
    name: 'Bukit Batok Town Park (Little Guilin)',
    region: 'West',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/bukit-batok-town-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Granite Lake Reflection',
    conditionIcon: 'terrain',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3582,
    lng: 103.7548,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Spectacular granite cliffs rising out of the water like Guilin in China.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:30 PM',
      description: 'Evening photography capturing dramatic cliff reflections in the still lake.'
    },
    hourly: [
      { time: '14:00', condition: 'Lakeside Sun', icon: 'wb_sunny', temp: 30, rainChance: 15, humidity: 73, windSpeed: '10 km/h W' }
    ],
    alerts: [],
    nearby: [
      { id: 'bukit-batok-nature-park', name: 'Bukit Batok Nature Park', distanceKm: 1.4, temp: 30, icon: 'terrain', condition: 'Quarry' }
    ],
    facilities: [
      { name: 'Little Guilin Towering Granite Rock Dome', icon: 'terrain', count: 1 },
      { name: 'Lakeside Chinese Viewing Pavilions', icon: 'temple_buddhist', count: 2 }
    ],
    summary: 'A 42-hectare scenic landscape transformed from an old granite quarry into a majestic lake resembling the famous limestone karst formations in Guilin, China.',
    crowdLevel: 'Moderate',
    humidity: 73,
    windSpeed: '10 km/h',
    airQualityPsi: 37,
    runningTrackKm: 2.4
  },

  'dairy-farm-nature-park': {
    id: 'dairy-farm-nature-park',
    name: 'Dairy Farm Nature Park',
    region: 'West',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/dairy-farm-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 12 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Canopy & Quarry Shade',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3638,
    lng: 103.7761,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 45, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Singapore Quarry wetland lookout & Wallace Education Centre.',
      peakTime: '11:00 - 14:30'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Morning Wallace Trail hike and birdwatching at Singapore Quarry.'
    },
    hourly: [
      { time: '14:00', condition: 'Shaded Rainforest', icon: 'park', temp: 29, rainChance: 20, humidity: 79, windSpeed: '8 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'chestnut-nature-park', name: 'Chestnut Nature Park', distanceKm: 1.6, temp: 29, icon: 'terrain', condition: 'MTB Trails' },
      { id: 'bukit-timah', name: 'Bukit Timah Nature Reserve', distanceKm: 1.2, temp: 29, icon: 'park', condition: 'Summit' }
    ],
    facilities: [
      { name: 'Singapore Quarry Wetland & Bird Deck', icon: 'visibility', count: 1 },
      { name: 'Wallace Education Centre & Trail', icon: 'menu_book', count: 1 },
      { name: 'Dairy Farm Mountain Biking Trail', icon: 'directions_bike', count: 1 }
    ],
    summary: 'A 75-hectare rustic nature park featuring the educational Wallace Trail, mountain biking trails, and the magnificent wetland sanctuary at Singapore Quarry.',
    crowdLevel: 'Low',
    humidity: 79,
    windSpeed: '8 km/h',
    airQualityPsi: 36,
    runningTrackKm: 6.5
  },

  'chestnut-nature-park': {
    id: 'chestnut-nature-park',
    name: 'Chestnut Nature Park',
    region: 'West',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/chestnut-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Forest Trail Breeze',
    conditionIcon: 'terrain',
    bgImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3745,
    lng: 103.7842,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 45, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Largest nature park in Singapore (81 hectares) with separate hiking & MTB tracks.',
      peakTime: '11:00 - 14:30'
    },
    bestTime: {
      start: '7:00 AM',
      end: '9:30 AM',
      description: 'Morning mountain biking on specialized technical trails (North & South loops).'
    },
    hourly: [
      { time: '14:00', condition: 'Forest Breeze', icon: 'terrain', temp: 29, rainChance: 20, humidity: 78, windSpeed: '9 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'dairy-farm-nature-park', name: 'Dairy Farm Nature Park', distanceKm: 1.6, temp: 29, icon: 'park', condition: 'Quarry' },
      { id: 'zhenghua-nature-park', name: 'Zhenghua Nature Park', distanceKm: 1.2, temp: 30, icon: 'park', condition: 'Ridge' }
    ],
    facilities: [
      { name: '8.2km Dedicated Mountain Bike Trails (North & South)', icon: 'directions_bike', count: 1 },
      { name: '5.6km Separate Hiking Nature Trails', icon: 'hiking', count: 1 },
      { name: 'Chestnut Observation Tower (Panoramic Canopy)', icon: 'tower', count: 1 }
    ],
    summary: 'Singapore’s largest nature park (81 hectares) featuring separate distinct trails for hikers and mountain bikers, plus the Chestnut Observation Tower.',
    crowdLevel: 'Moderate',
    humidity: 78,
    windSpeed: '9 km/h',
    airQualityPsi: 36,
    runningTrackKm: 13.8
  },

  'clementi-woods-park': {
    id: 'clementi-woods-park',
    name: 'Clementi Woods Park',
    region: 'West',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/clementi-woods-park',
    status: 'Open',
    updatedAgo: 'Updated 20 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Woodland Shade',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.2991,
    lng: 103.7698,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Mature native trees and tranquil woodland walking trails.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Peaceful stroll under mature oak and tembusu trees.'
    },
    hourly: [
      { time: '14:00', condition: 'Woodland Sun', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 70, windSpeed: '12 km/h SW' }
    ],
    alerts: [],
    nearby: [
      { id: 'west-coast-park', name: 'West Coast Park', distanceKm: 1.2, temp: 32, icon: 'waves', condition: 'Coast' }
    ],
    facilities: [
      { name: 'Heritage Woodland Walking Trails', icon: 'hiking', count: 1 },
      { name: 'Sakura-inspired Bistro & Cafe', icon: 'restaurant', count: 1 }
    ],
    summary: 'A 12-hectare serene wooded sanctuary located beside West Coast Road, featuring mature tall trees, a stream, and quiet gravel trails.',
    crowdLevel: 'Low',
    humidity: 70,
    windSpeed: '12 km/h',
    airQualityPsi: 38,
    runningTrackKm: 3.1
  },

  'jurong-central-park': {
    id: 'jurong-central-park',
    name: 'Jurong Central Park',
    region: 'West',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/jurong-central-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 32,
    feelsLike: 36,
    condition: 'Sunny Play Lawn',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3418,
    lng: 103.7042,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Features life-sized Snakes & Ladders and Ludo board games.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Family life-sized board game play and ponds.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Warm', icon: 'wb_sunny', temp: 32, rainChance: 10, humidity: 67, windSpeed: '11 km/h W' }
    ],
    alerts: [],
    nearby: [
      { id: 'jurong-lake-gardens', name: 'Jurong Lake Gardens', distanceKm: 1.8, temp: 32, icon: 'park', condition: 'Lake' }
    ],
    facilities: [
      { name: 'Life-Sized Snakes and Ladders Board Game', icon: 'casino', count: 1 },
      { name: 'Life-Sized Ludo Board Game Playground', icon: 'extension', count: 1 }
    ],
    summary: 'An 8-hectare green park that is the first in Singapore to incorporate life-sized classic board games (Snakes and Ladders & Ludo) into its landscape.',
    crowdLevel: 'Moderate',
    humidity: 67,
    windSpeed: '11 km/h',
    airQualityPsi: 40,
    runningTrackKm: 2.8
  },

  'pandan-reservoir': {
    id: 'pandan-reservoir',
    name: 'Pandan Reservoir Fitness Park',
    region: 'West',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/pandan-reservoir-fitness-corner',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Open Reservoir Wind',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3148,
    lng: 103.7482,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: '6km continuous flat gravel running circuit.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '6:00 PM',
      end: '8:00 PM',
      description: 'Popular evening 6km training run around open waters.'
    },
    hourly: [
      { time: '14:00', condition: 'Water Breeze', icon: 'waves', temp: 31, rainChance: 10, humidity: 68, windSpeed: '15 km/h SW' }
    ],
    alerts: [],
    nearby: [
      { id: 'jurong-lake-gardens', name: 'Jurong Lake Gardens', distanceKm: 3.6, temp: 32, icon: 'park', condition: 'Gardens' }
    ],
    facilities: [
      { name: '6.0km Continuous Gravel Running Track', icon: 'directions_run', count: 1 },
      { name: 'Singapore Rowing Club Water Facility', icon: 'rowing', count: 1 }
    ],
    summary: 'A premier endurance training destination centered around a 6.0km uninterrupted gravel loop encircling Pandan Reservoir, home of the Singapore Rowing National Team.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '15 km/h',
    airQualityPsi: 40,
    runningTrackKm: 6.0
  },

  'zhenghua-nature-park': {
    id: 'zhenghua-nature-park',
    name: 'Zhenghua Nature Park',
    region: 'West',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/zhenghua-nature-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Linear Ridge Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3824,
    lng: 103.7712,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Linear 2.5km park buffering Central Catchment Nature Reserve.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '7:30 AM',
      end: '10:00 AM',
      description: 'Morning jog along the linear ridgeline connecting to Chestnut Nature Park.'
    },
    hourly: [
      { time: '14:00', condition: 'Ridge Shade', icon: 'park', temp: 30, rainChance: 15, humidity: 76, windSpeed: '10 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'chestnut-nature-park', name: 'Chestnut Nature Park', distanceKm: 1.2, temp: 29, icon: 'terrain', condition: 'MTB' }
    ],
    facilities: [
      { name: '2.5km Linear Ridge Fitness Track', icon: 'directions_walk', count: 1 },
      { name: 'Multi-generational Play & Exercise Pods', icon: 'fitness_center', count: 3 }
    ],
    summary: 'A 13.5-hectare linear park stretching 2.5km, serving as an important green buffer between Bukit Panjang town and the Central Catchment forest.',
    crowdLevel: 'Low',
    humidity: 76,
    windSpeed: '10 km/h',
    airQualityPsi: 36,
    runningTrackKm: 3.2
  },

  'kranji-marshes': {
    id: 'kranji-marshes',
    name: 'Kranji Marshes',
    region: 'West',
    category: 'Ecological & Wetland',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/kranji-marshes',
    status: 'Open',
    updatedAgo: 'Updated 20 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Freshwater Marsh Breeze',
    conditionIcon: 'visibility',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4218,
    lng: 103.7231,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: '10.65m Raptor Tower for 360-degree wetland views.',
      peakTime: '11:00 - 14:30'
    },
    bestTime: {
      start: '7:00 AM',
      end: '9:30 AM',
      description: 'Climb Raptor Tower to watch birds of prey hunting across Kranji Reservoir.'
    },
    hourly: [
      { time: '14:00', condition: 'Marsh Breeze', icon: 'visibility', temp: 29, rainChance: 20, humidity: 80, windSpeed: '10 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'sungei-buloh', name: 'Sungei Buloh Wetland Reserve', distanceKm: 4.1, temp: 29, icon: 'water', condition: 'Mangroves' }
    ],
    facilities: [
      { name: '10.65m Raptor Tower Observation Deck', icon: 'tower', count: 1 },
      { name: 'Marsh Bird Hides (Swamphen, Moorhen, Crake Hides)', icon: 'visibility', count: 3 }
    ],
    summary: 'A 56.8-hectare freshwater marshland, one of the largest in Singapore, featuring the 10.65m Raptor Tower providing 360-degree panoramic birdwatching views.',
    crowdLevel: 'Low',
    humidity: 80,
    windSpeed: '10 km/h',
    airQualityPsi: 35,
    runningTrackKm: 3.5
  }
};
