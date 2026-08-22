import { Park } from '../types';

export const PARKS_NORTH: Record<string, Omit<Park, 'historical24h' | 'forecast7Day'>> = {
  'sungei-buloh': {
    id: 'sungei-buloh',
    name: 'Sungei Buloh Wetland Reserve',
    region: 'North',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/sungei-buloh-wetland-reserve',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 29,
    feelsLike: 32,
    condition: 'Coastal Mangrove Breeze',
    conditionIcon: 'water',
    bgImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4468,
    lng: 103.7302,
    rainProbability: [
      { label: 'Now', percentage: 20, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 40, time: '15:00', tier: 'Medium' },
      { label: '+8h', percentage: 65, time: '16:00', tier: 'High' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 5,
      level: 'Moderate',
      advice: 'Extensive boardwalks over tidal mudflats. Crocodile safety notices posted.',
      peakTime: '11:00 - 14:30'
    },
    bestTime: {
      start: '7:00 AM',
      end: '9:30 AM',
      description: 'Morning low tide when migratory shorebirds and estuarine crocodiles feed actively.'
    },
    hourly: [
      { time: '14:00', condition: 'Wetland Breeze', icon: 'water', temp: 29, rainChance: 20, humidity: 82, windSpeed: '10 km/h NW' }
    ],
    alerts: [],
    nearby: [
      { id: 'kranji-marshes', name: 'Kranji Marshes', distanceKm: 4.1, temp: 29, icon: 'visibility', condition: 'Wetland' },
      { id: 'admiralty-park', name: 'Admiralty Park', distanceKm: 6.8, temp: 30, icon: 'park', condition: 'Mangrove' }
    ],
    facilities: [
      { name: 'Tidal Mudflat Observation Pods & Hides', icon: 'visibility', count: 6 },
      { name: 'Mangrove Gallery & Visitor Centre', icon: 'info', count: 1 },
      { name: 'Estuarine Crocodile Watching Boardwalk', icon: 'pets', count: 1 }
    ],
    summary: 'Singapore’s first ASEAN Heritage Park, spanning 202 hectares of globally significant mangrove wetlands serving as a vital stopover for migratory birds on the East Asian-Australasian Flyway.',
    crowdLevel: 'Low',
    humidity: 82,
    windSpeed: '10 km/h',
    airQualityPsi: 34,
    runningTrackKm: 5.8
  },

  'admiralty-park': {
    id: 'admiralty-park',
    name: 'Admiralty Park',
    region: 'North',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/admiralty-park',
    status: 'Open',
    updatedAgo: 'Updated 12 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Valley Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4428,
    lng: 103.7798,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 35, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Largest park in the north featuring 26 distinct slides.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '4:30 PM',
      end: '7:00 PM',
      description: 'Family play at the 26 unique slides and mangrove nature walk.'
    },
    hourly: [
      { time: '14:00', condition: 'Partly Cloudy', icon: 'partly_cloudy_day', temp: 30, rainChance: 15, humidity: 73, windSpeed: '11 km/h N' }
    ],
    alerts: [],
    nearby: [
      { id: 'woodlands-waterfront-park', name: 'Woodlands Waterfront Park', distanceKm: 1.8, temp: 30, icon: 'waves', condition: 'Jetty' },
      { id: 'marsiling-park', name: 'Marsiling Park', distanceKm: 2.3, temp: 30, icon: 'park', condition: 'Lakeside' }
    ],
    facilities: [
      { name: '26 Distinct Playground Slides (Singapore Record)', icon: 'toys', count: 26 },
      { name: 'Sunbird Scented Mangrove Boardwalk', icon: 'hiking', count: 1 }
    ],
    summary: 'A 27-hectare park with undulating hilly terrain, boasting the largest number of playground slides (26) in Singapore and a 20-hectare secondary forest and mangrove river area.',
    crowdLevel: 'Moderate',
    humidity: 73,
    windSpeed: '11 km/h',
    airQualityPsi: 36,
    runningTrackKm: 4.6
  },

  'sembawang-park': {
    id: 'sembawang-park',
    name: 'Sembawang Park & Beach',
    region: 'North',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/sembawang-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Straits Sea Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4628,
    lng: 103.8375,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Seaside heritage park with Battleship playground and Beaulieu House.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Sunset breeze over the Straits of Johor and heritage naval walk.'
    },
    hourly: [
      { time: '14:00', condition: 'Sea Sun', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 71, windSpeed: '15 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'canberra-park', name: 'Canberra Park', distanceKm: 2.8, temp: 31, icon: 'toys', condition: 'Playground' },
      { id: 'yishun-park', name: 'Yishun Park', distanceKm: 4.2, temp: 31, icon: 'park', condition: 'Nature' }
    ],
    facilities: [
      { name: 'Heritage Battleship Themed Playground', icon: 'directions_boat', count: 1 },
      { name: 'Historic Beaulieu House Coastal Restaurant', icon: 'restaurant', count: 1 },
      { name: 'Sembawang Beachfront Fishing Jetty', icon: 'phishing', count: 1 }
    ],
    summary: 'A tranquil 15-hectare coastal heritage park facing Johor Straits, showcasing Singapore’s naval heritage, sandy beaches, and Beaulieu House.',
    crowdLevel: 'Moderate',
    humidity: 71,
    windSpeed: '15 km/h',
    airQualityPsi: 35,
    runningTrackKm: 3.2
  },

  'woodlands-waterfront-park': {
    id: 'woodlands-waterfront-park',
    name: 'Woodlands Waterfront Park',
    region: 'North',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/woodlands-waterfront-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Coastal Promenade Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4538,
    lng: 103.7801,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Features a 400m coastal jetty extending into Johor Straits.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:45 PM',
      description: 'Breathtaking sunset from the 400m jetty with views of the Causeway and Johor Bahru skyline.'
    },
    hourly: [
      { time: '14:00', condition: 'Jetty Breeze', icon: 'waves', temp: 30, rainChance: 10, humidity: 70, windSpeed: '16 km/h N' }
    ],
    alerts: [],
    nearby: [
      { id: 'admiralty-park', name: 'Admiralty Park', distanceKm: 1.8, temp: 30, icon: 'park', condition: 'Slides' },
      { id: 'marsiling-park', name: 'Marsiling Park', distanceKm: 2.5, temp: 30, icon: 'water', condition: 'Pond' }
    ],
    facilities: [
      { name: '400m Longest Recreational Coastal Jetty in SG', icon: 'directions_walk', count: 1 },
      { name: 'Multi-generational Sky Walk Rope Bridge Playground', icon: 'toys', count: 1 }
    ],
    summary: 'A 11-hectare coastal park with a 1.5km waterfront promenade and Singapore’s longest coastal jetty (400m), offering panoramic cross-border sea views.',
    crowdLevel: 'Moderate',
    humidity: 70,
    windSpeed: '16 km/h',
    airQualityPsi: 36,
    runningTrackKm: 3.5
  },

  'marsiling-park': {
    id: 'marsiling-park',
    name: 'Marsiling Park (Woodlands Town Garden)',
    region: 'North',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/marsiling-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Lakeside Serenity',
    conditionIcon: 'water',
    bgImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4392,
    lng: 103.7745,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Illuminated boardwalk at night & butterfly gym.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:30 PM',
      end: '8:00 PM',
      description: 'Lakeside reflection walk with night lighting along Chinese pavilions.'
    },
    hourly: [
      { time: '14:00', condition: 'Lakeside Sun', icon: 'wb_sunny', temp: 30, rainChance: 10, humidity: 72, windSpeed: '10 km/h N' }
    ],
    alerts: [],
    nearby: [
      { id: 'woodlands-waterfront-park', name: 'Woodlands Waterfront Park', distanceKm: 2.5, temp: 30, icon: 'waves', condition: 'Jetty' }
    ],
    facilities: [
      { name: 'Illuminated Mangrove Boardwalk', icon: 'flare', count: 1 },
      { name: 'Butterfly-themed Outdoor Fitness Gym', icon: 'fitness_center', count: 1 }
    ],
    summary: 'A picturesque 11-hectare town garden featuring a natural pond, viewing bridge, Chinese architectural pavilions, and butterfly-friendly gardens.',
    crowdLevel: 'Low',
    humidity: 72,
    windSpeed: '10 km/h',
    airQualityPsi: 36,
    runningTrackKm: 2.8
  },

  'yishun-park': {
    id: 'yishun-park',
    name: 'Yishun Park & Pond',
    region: 'North',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/yishun-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Fruit Orchard Shade',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4238,
    lng: 103.8398,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Tropical fruit tree collections (durian, rambutan, starfruit).',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Morning botanical walk learning about tropical fruit trees.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Orchard', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 70, windSpeed: '11 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'lower-seletar-reservoir-park', name: 'Lower Seletar Reservoir', distanceKm: 2.1, temp: 31, icon: 'waves', condition: 'Waterside' },
      { id: 'sembawang-park', name: 'Sembawang Park', distanceKm: 4.2, temp: 30, icon: 'waves', condition: 'Beach' }
    ],
    facilities: [
      { name: 'Tropical Fruit Tree Arboretum (Durian, Guava)', icon: 'park', count: 1 },
      { name: 'SAFRA Yishun Adventure Obstacle Centre', icon: 'sports_score', count: 1 }
    ],
    summary: 'A 14-hectare park developed on an old rubber estate, housing a rich collection of tropical fruit trees like durian, jackfruit, and rambutan.',
    crowdLevel: 'Low',
    humidity: 70,
    windSpeed: '11 km/h',
    airQualityPsi: 38,
    runningTrackKm: 3.2
  },

  'lower-seletar-reservoir-park': {
    id: 'lower-seletar-reservoir-park',
    name: 'Lower Seletar Reservoir Park & Rower’s Bay',
    region: 'North',
    category: 'Coastal & Waterfront',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/lower-seletar-reservoir-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 34,
    condition: 'Open Water Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4085,
    lng: 103.8378,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Water sports hub and Rower’s Bay boardwalk node.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:45 PM',
      description: 'Watching dragon boaters glide across calm water at sunset.'
    },
    hourly: [
      { time: '14:00', condition: 'Water Breeze', icon: 'waves', temp: 31, rainChance: 10, humidity: 69, windSpeed: '13 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'upper-seletar-reservoir-park', name: 'Upper Seletar Reservoir', distanceKm: 4.8, temp: 30, icon: 'terrain', condition: 'Rocket Tower' },
      { id: 'yishun-park', name: 'Yishun Park', distanceKm: 2.1, temp: 31, icon: 'park', condition: 'Orchard' }
    ],
    facilities: [
      { name: 'Water Sports Kayaking & Dragon Boat Centre', icon: 'kayaking', count: 1 },
      { name: 'Heritage Fishing Jetty & Children’s Water Play', icon: 'phishing', count: 1 },
      { name: 'Rower’s Bay Park Wetland Lookout Node', icon: 'visibility', count: 1 }
    ],
    summary: 'A peaceful lakeside park along the edge of Lower Seletar Reservoir, featuring a Family Bay water play area, kayak launch, and Rower’s Bay boardwalk.',
    crowdLevel: 'Moderate',
    humidity: 69,
    windSpeed: '13 km/h',
    airQualityPsi: 38,
    runningTrackKm: 4.2
  },

  'upper-seletar-reservoir-park': {
    id: 'upper-seletar-reservoir-park',
    name: 'Upper Seletar Reservoir Park',
    region: 'North',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/upper-seletar-reservoir-park',
    status: 'Open',
    updatedAgo: 'Updated 15 mins ago',
    currentTemp: 30,
    feelsLike: 33,
    condition: 'Tranquil Reservoir Forest',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4018,
    lng: 103.8052,
    rainProbability: [
      { label: 'Now', percentage: 15, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Iconic 1969 Rocket Tower overlooking reservoir expanse.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '6:30 AM',
      end: '9:00 AM',
      description: 'Climb Rocket Tower for a sunrise view above the morning reservoir mist.'
    },
    hourly: [
      { time: '14:00', condition: 'Reservoir Wind', icon: 'park', temp: 30, rainChance: 15, humidity: 74, windSpeed: '10 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'lower-seletar-reservoir-park', name: 'Lower Seletar Reservoir', distanceKm: 4.8, temp: 31, icon: 'waves', condition: 'Waterside' },
      { id: 'mandai-wildlife', name: 'Singapore Zoo & Mandai Corridor', distanceKm: 1.5, temp: 30, icon: 'pets', condition: 'Wildlife' }
    ],
    facilities: [
      { name: '18m Retro 1969 Rocket Tower Lookout', icon: 'rocket', count: 1 },
      { name: 'Iconic Lone Casuarina Tree Photo Spot', icon: 'photo_camera', count: 1 }
    ],
    summary: 'A 15-hectare tranquil forested sanctuary bordering Central Catchment, famous for its retro space-age 18m Rocket Tower and picturesque lone lakeside Casuarina tree.',
    crowdLevel: 'Low',
    humidity: 74,
    windSpeed: '10 km/h',
    airQualityPsi: 36,
    runningTrackKm: 3.4
  },

  'punggol-waterway-park': {
    id: 'punggol-waterway-park',
    name: 'Punggol Waterway Park',
    region: 'North',
    category: 'Urban & Heritage',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/punggol-waterway-park',
    status: 'Open',
    updatedAgo: 'Updated 8 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Waterway Promenade Breeze',
    conditionIcon: 'waves',
    bgImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4091,
    lng: 103.9022,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' },
      { label: '+4h', percentage: 25, time: '15:00', tier: 'Medium' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 7,
      level: 'High',
      advice: 'Paved cycling loops spanning Nature Cove, Recreation Zone, Heritage Zone & Green Gallery.',
      peakTime: '11:00 - 15:30'
    },
    bestTime: {
      start: '5:30 PM',
      end: '7:45 PM',
      description: 'Sunset at Jewel Bridge followed by evening breeze along Sunrise Bridge.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny Waterway', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 68, windSpeed: '14 km/h ENE' }
    ],
    alerts: [],
    nearby: [
      { id: 'coney-island-park', name: 'Coney Island Park', distanceKm: 2.4, temp: 30, icon: 'park', condition: 'Rustic Island' },
      { id: 'sengkang-riverside-park', name: 'Sengkang Riverside Park', distanceKm: 3.1, temp: 31, icon: 'water', condition: 'Wetland' }
    ],
    facilities: [
      { name: '4 Iconic Themed Bridges (Jewel, Sunrise, Wave, Adventure)', icon: 'bridge', count: 4 },
      { name: 'Waterway Water Play & Sand Play Area', icon: 'sports_kabaddi', count: 1 },
      { name: '8.4km Continuous Cycling Circuit', icon: 'directions_bike', count: 1 }
    ],
    summary: 'A 12.25-hectare riverine park flanking the 4.2km Punggol Waterway, featuring four architectural bridges and vibrant waterfront dining.',
    crowdLevel: 'Moderate',
    humidity: 68,
    windSpeed: '14 km/h',
    airQualityPsi: 39,
    runningTrackKm: 8.4
  },

  'coney-island-park': {
    id: 'coney-island-park',
    name: 'Coney Island Park (Pulau Serangoon)',
    region: 'North',
    category: 'Nature Reserve',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/coney-island-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 30,
    feelsLike: 34,
    condition: 'Coastal Casuarina Breeze',
    conditionIcon: 'park',
    bgImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4098,
    lng: 103.9215,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Rustic unpaved gravel trails. Gates close strictly at 7:00 PM.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '8:00 AM',
      end: '10:30 AM',
      description: 'Rustic cycling under towering casuarina trees and secluded beach areas.'
    },
    hourly: [
      { time: '14:00', condition: 'Island Sea Breeze', icon: 'park', temp: 30, rainChance: 10, humidity: 71, windSpeed: '15 km/h ENE' }
    ],
    alerts: [],
    nearby: [
      { id: 'punggol-waterway-park', name: 'Punggol Waterway Park', distanceKm: 2.4, temp: 31, icon: 'waves', condition: 'Waterway' },
      { id: 'pasir-ris', name: 'Pasir Ris Park', distanceKm: 4.8, temp: 31, icon: 'waves', condition: 'Mangrove' }
    ],
    facilities: [
      { name: '5 Secluded Coastal Beach Access Areas (A to E)', icon: 'beach_access', count: 5 },
      { name: 'Casuarina Forest Gravel Trail (2.4km)', icon: 'directions_bike', count: 1 },
      { name: 'Mangrove Boardwalk at Serangoon Reservoir', icon: 'hiking', count: 1 }
    ],
    summary: 'A 50-hectare rustic ecological island sanctuary boasting diverse habitats including coastal forests, grasslands, mangroves, and secluded beaches.',
    crowdLevel: 'Moderate',
    humidity: 71,
    windSpeed: '15 km/h',
    airQualityPsi: 37,
    runningTrackKm: 4.8
  },

  'sengkang-riverside-park': {
    id: 'sengkang-riverside-park',
    name: 'Sengkang Riverside Park & Floating Wetland',
    region: 'North',
    category: 'Ecological & Wetland',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/sengkang-riverside-park',
    status: 'Open',
    updatedAgo: 'Updated 10 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'River Wetland Breeze',
    conditionIcon: 'water',
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.3972,
    lng: 103.8864,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Largest man-made wetland in Singapore (Sengkang Floating Wetland).',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Stroll across Singapore’s largest floating wetland boardwalk.'
    },
    hourly: [
      { time: '14:00', condition: 'Wetland Sun', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 70, windSpeed: '12 km/h NE' }
    ],
    alerts: [],
    nearby: [
      { id: 'punggol-waterway-park', name: 'Punggol Waterway Park', distanceKm: 3.1, temp: 31, icon: 'waves', condition: 'Waterway' }
    ],
    facilities: [
      { name: 'Sengkang Floating Island Wetland Boardwalk', icon: 'water', count: 1 },
      { name: 'Fruit Tree Trail & Artisan Bakery Cafe', icon: 'restaurant', count: 1 }
    ],
    summary: 'A 21-hectare tranquil riverine park straddling Sungei Punggol, home to the largest man-made floating wetland in Singapore.',
    crowdLevel: 'Low',
    humidity: 70,
    windSpeed: '12 km/h',
    airQualityPsi: 39,
    runningTrackKm: 3.9
  },

  'canberra-park': {
    id: 'canberra-park',
    name: 'Canberra Park',
    region: 'North',
    category: 'Community Park',
    nparksUrl: 'https://www.nparks.gov.sg/visit/parks/park-detail/canberra-park',
    status: 'Open',
    updatedAgo: 'Updated 20 mins ago',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'Open Playground Sun',
    conditionIcon: 'wb_sunny',
    bgImageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1400&q=80',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86PBTiUqeBpKJinBxNX71gxshxsqreXMKbfeJfpAnsv3JP9bm3PqhkhMSiVDWe1qLeb_Ng3sug3r4XkxBzk4OHmmzJEvoIubXdfygiO-LVR5y4CLBQDuIYRAusNb50OrFRw1CpLc80XXENx1IMoJ1dPDLDimEz2qEWEnINfeDAkp5jFHzSg-hNBUE8U2Nh0sSKwpOI-LwqwnvLe6AEREU5HNzWJft1-L0pjhcTGCqT2xRHPCdDFIR',
    lat: 1.4485,
    lng: 103.8291,
    rainProbability: [
      { label: 'Now', percentage: 10, time: '14:00', tier: 'Low' }
    ],
    rainTier: 'Low',
    uvIndex: {
      value: 6,
      level: 'High',
      advice: 'Singapore’s first all-inclusive playground.',
      peakTime: '11:30 - 15:00'
    },
    bestTime: {
      start: '5:00 PM',
      end: '7:30 PM',
      description: 'Inclusive swings and multi-generational play.'
    },
    hourly: [
      { time: '14:00', condition: 'Sunny & Playful', icon: 'wb_sunny', temp: 31, rainChance: 10, humidity: 69, windSpeed: '11 km/h N' }
    ],
    alerts: [],
    nearby: [
      { id: 'sembawang-park', name: 'Sembawang Park', distanceKm: 2.8, temp: 30, icon: 'waves', condition: 'Beach' }
    ],
    facilities: [
      { name: 'All-Inclusive Wheelchair Swings & Ramps', icon: 'accessible', count: 1 },
      { name: 'Dino Bone Climbing Structures', icon: 'toys', count: 1 }
    ],
    summary: 'A trailblazing community park featuring Singapore’s first all-inclusive playground designed for children of all abilities, including wheelchair-accessible swings.',
    crowdLevel: 'Low',
    humidity: 69,
    windSpeed: '11 km/h',
    airQualityPsi: 37,
    runningTrackKm: 2.1
  }
};
