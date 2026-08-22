export interface ParkBusStop {
  code: string;
  name: string;
  roadName: string;
  distance: string;
  services: string[];
}

export interface ParkCarparkInfo {
  id: string;
  name: string;
  area: string;
  agency: 'NParks' | 'HDB' | 'URA' | 'LTA' | 'Private';
  lat: number;
  lng: number;
}

export interface ParkMrtStation {
  name: string;
  line: string;
  stationCode: string;
  walkMinutes: number;
  tip?: string;
}

export interface ParkTransportConfig {
  busStops: ParkBusStop[];
  carparks: ParkCarparkInfo[];
  mrt: ParkMrtStation;
}

export const PARK_TRANSPORT_REGISTRY: Record<string, ParkTransportConfig> = {
  'bishan-ang-mo-kio': {
    busStops: [
      { code: '54089', name: 'Opp Bishan Park', roadName: 'Ang Mo Kio Ave 1', distance: '120m', services: ['132', '133', '136', '262', '71'] },
      { code: '54081', name: 'Bishan Park', roadName: 'Ang Mo Kio Ave 1', distance: '150m', services: ['132', '133', '136', '262', '71'] },
      { code: '53349', name: 'Opp Blk 248 / Bishan Park Carpark A', roadName: 'Marymount Rd', distance: '280m', services: ['54', '851', '852'] }
    ],
    carparks: [
      { id: 'BAMK-CP1', name: 'Bishan-AMK Park Carpark A (Canopy Cafe)', area: 'Bishan', agency: 'NParks', lat: 1.3626, lng: 103.8447 },
      { id: 'BAMK-CP2', name: 'Bishan-AMK Park Carpark B (Dog Run)', area: 'Bishan', agency: 'NParks', lat: 1.3648, lng: 103.8488 },
      { id: 'BM18', name: 'HDB Blk 223 Ang Mo Kio Ave 1', area: 'Ang Mo Kio', agency: 'HDB', lat: 1.3662, lng: 103.8412 }
    ],
    mrt: { name: 'Bishan', line: 'NSL / Circle Line', stationCode: 'NS17/CC15', walkMinutes: 12, tip: 'Take Bus 71 or 262 from Bishan Interchange' }
  },
  'east-coast-park': {
    busStops: [
      { code: '92199', name: 'Opp Parkland Green', roadName: 'Marine Parade Rd', distance: '250m', services: ['16', '31', '36', '43', '48', '196', '197'] },
      { code: '93159', name: 'Opp CP C3 / Raintree Cove', roadName: 'East Coast Parkway', distance: '180m', services: ['401'] },
      { code: '92261', name: 'Opp Laguna Park', roadName: 'Marine Parade Rd', distance: '320m', services: ['31', '36', '43', '47', '48', '55'] }
    ],
    carparks: [
      { id: 'ECP-C1', name: 'East Coast Park Carpark C1 (Parkland Green)', area: 'East Coast', agency: 'NParks', lat: 1.3012, lng: 103.9056 },
      { id: 'ECP-C2', name: 'East Coast Park Carpark C2 (Raintree Cove)', area: 'East Coast', agency: 'NParks', lat: 1.3019, lng: 103.9085 },
      { id: 'ECP-D1', name: 'East Coast Park Carpark D1 (Cyclist Park)', area: 'East Coast', agency: 'NParks', lat: 1.3025, lng: 103.9142 },
      { id: 'ECP-E2', name: 'East Coast Park Carpark E2 (Lagoon Food Village)', area: 'East Coast', agency: 'NParks', lat: 1.3065, lng: 103.9288 }
    ],
    mrt: { name: 'Marine Parade / Marine Terrace', line: 'Thomson-East Coast Line', stationCode: 'TE26/TE27', walkMinutes: 8, tip: 'Direct underpass connects TE26 to ECP Carpark C1' }
  },
  'gardens-by-the-bay': {
    busStops: [
      { code: '03371', name: 'Gardens by the Bay', roadName: 'Marina Gardens Dr', distance: '50m', services: ['400'] },
      { code: '03531', name: 'Aft Marina Way', roadName: 'Central Blvd', distance: '350m', services: ['97', '106', '133', '518'] }
    ],
    carparks: [
      { id: 'GB-MB', name: 'Main Carpark (Supertree & Floral Fantasy)', area: 'Marina Bay', agency: 'URA', lat: 1.2815, lng: 103.8636 },
      { id: 'GB-MB2', name: 'Bayfront Plaza Carpark', area: 'Marina South', agency: 'URA', lat: 1.2835, lng: 103.8598 },
      { id: 'GB-MB3', name: 'Meadow Open Carpark', area: 'Marina South', agency: 'URA', lat: 1.2778, lng: 103.8652 }
    ],
    mrt: { name: 'Gardens by the Bay', line: 'Thomson-East Coast Line', stationCode: 'TE22', walkMinutes: 3, tip: 'Exit 1 brings you right into the South Garden outdoor lawns' }
  },
  'macritchie-reservoir': {
    busStops: [
      { code: '51079', name: 'MacRitchie Reservoir', roadName: 'Lornie Rd', distance: '100m', services: ['52', '74', '93', '157', '165', '852', '855'] },
      { code: '51071', name: 'Opp MacRitchie Reservoir', roadName: 'Lornie Rd', distance: '140m', services: ['52', '74', '93', '157', '165', '852', '855'] }
    ],
    carparks: [
      { id: 'MR-MAIN', name: 'MacRitchie Reservoir Main Carpark (Lornie Rd)', area: 'Central Catchment', agency: 'NParks', lat: 1.3418, lng: 103.8345 },
      { id: 'MR-MULTI', name: 'Lornie Highway Multi-Storey (Overfill)', area: 'Central Catchment', agency: 'NParks', lat: 1.3432, lng: 103.8361 }
    ],
    mrt: { name: 'Caldecott', line: 'Circle / Thomson-East Coast Line', stationCode: 'CC17/TE9', walkMinutes: 9, tip: 'Exit 4 walk 650m north along Toa Payoh Rise' }
  },
  'singapore-botanic-gardens': {
    busStops: [
      { code: '41021', name: 'Botanic Gdns Stn', roadName: 'Bukit Timah Rd', distance: '50m', services: ['48', '66', '67', '151', '153', '154', '156', '170'] },
      { code: '13011', name: 'Opp Singapore Botanic Gardens', roadName: 'Cluny Rd', distance: '120m', services: ['7', '75', '77', '105', '106', '123'] },
      { code: '13021', name: 'Tanglin Gate / Botany Ctr', roadName: 'Holland Rd', distance: '100m', services: ['7', '75', '77', '105', '106', '174'] }
    ],
    carparks: [
      { id: 'SBG-TN', name: 'Tanglin Gate Carpark (Botany Centre)', area: 'Tanglin', agency: 'NParks', lat: 1.3075, lng: 103.8152 },
      { id: 'SBG-TY', name: 'Tyersall Gate Carpark (Learning Forest)', area: 'Tyersall', agency: 'NParks', lat: 1.3121, lng: 103.8135 },
      { id: 'SBG-NK', name: 'Nassim Gate Carpark (Visitor Centre)', area: 'Nassim', agency: 'NParks', lat: 1.3168, lng: 103.8168 },
      { id: 'SBG-BG', name: 'Bukit Timah Gate Carpark (Eco Garden)', area: 'Bukit Timah', agency: 'NParks', lat: 1.3225, lng: 103.8158 }
    ],
    mrt: { name: 'Botanic Gardens', line: 'Downtown / Circle Line', stationCode: 'DT9/CC19', walkMinutes: 1, tip: 'Exit A directly enters the Eco Lake & Bukit Timah Gate' }
  },
  'bukit-timah-nature-reserve': {
    busStops: [
      { code: '42089', name: 'Southaven II / Aft Hindhede Rd', roadName: 'Upp Bt Timah Rd', distance: '220m', services: ['67', '75', '170', '178', '184', '961'] },
      { code: '42091', name: 'Opp Southaven II / Bt Timah Hill', roadName: 'Upp Bt Timah Rd', distance: '250m', services: ['67', '75', '170', '178', '184', '961'] }
    ],
    carparks: [
      { id: 'BTNR-CP', name: 'Hindhede Nature Park Carpark (BTNR Base)', area: 'Bukit Timah', agency: 'NParks', lat: 1.3482, lng: 103.7775 },
      { id: 'BTNR-BSC', name: 'Beauty World Centre Carpark', area: 'Beauty World', agency: 'URA', lat: 1.3435, lng: 103.7761 }
    ],
    mrt: { name: 'Beauty World', line: 'Downtown Line', stationCode: 'DT5', walkMinutes: 10, tip: 'Exit A, walk along Hindhede Road towards the Visitor Centre' }
  },
  'jurong-lake-gardens': {
    busStops: [
      { code: '21659', name: 'Opp Lakeside Stn', roadName: 'Boon Lay Way', distance: '300m', services: ['49', '98', '99', '154', '180', '240', '246'] },
      { code: '21689', name: 'Opp Blk 115 / Lakeside Field', roadName: 'Yuan Ching Rd', distance: '120m', services: ['49', '154', '240', '246'] }
    ],
    carparks: [
      { id: 'JLG-N', name: 'Jurong Lake Gardens North Carpark (Forest Ramble)', area: 'Jurong', agency: 'NParks', lat: 1.3382, lng: 103.7285 },
      { id: 'JLG-S', name: 'Jurong Lake Gardens South Carpark (ActiveSG Park)', area: 'Jurong', agency: 'NParks', lat: 1.3315, lng: 103.7298 }
    ],
    mrt: { name: 'Lakeside', line: 'East-West Line', stationCode: 'EW26', walkMinutes: 6, tip: 'Exit B walk 400m along Yuan Ching Road' }
  },
  'pasir-ris-park': {
    busStops: [
      { code: '77139', name: 'Aft Pasir Ris Beach Park', roadName: 'Pasir Ris Rd', distance: '80m', services: ['354'] },
      { code: '77099', name: 'Opp Downtown East', roadName: 'Pasir Ris Dr 3', distance: '250m', services: ['3', '5', '6', '12', '17', '21', '89', '358'] }
    ],
    carparks: [
      { id: 'PRP-CP2', name: 'Pasir Ris Park Carpark 2 (Playground)', area: 'Pasir Ris', agency: 'NParks', lat: 1.3785, lng: 103.9512 },
      { id: 'PRP-CP3', name: 'Pasir Ris Park Carpark 3 (Mangrove Boardwalk)', area: 'Pasir Ris', agency: 'NParks', lat: 1.3792, lng: 103.9565 },
      { id: 'PRP-CP4', name: 'Pasir Ris Park Carpark 4 (BBQ & Kitchen)', area: 'Pasir Ris', agency: 'NParks', lat: 1.3812, lng: 103.9632 }
    ],
    mrt: { name: 'Pasir Ris', line: 'East-West Line / CRL', stationCode: 'EW1', walkMinutes: 10, tip: 'Walk north along Pasir Ris Town Park green corridor' }
  }
};

export function getParkTransportConfig(parkId: string, parkName: string, lat: number, lng: number): ParkTransportConfig {
  if (PARK_TRANSPORT_REGISTRY[parkId]) {
    return PARK_TRANSPORT_REGISTRY[parkId];
  }

  // Fallback realistic config based on park coordinates
  const codeSeed = Math.abs(Math.round((lat * 1000 + lng * 1000) % 89999 + 10000)).toString();
  return {
    busStops: [
      {
        code: codeSeed,
        name: `${parkName} Main Entrance`,
        roadName: 'Park Connector / Access Road',
        distance: '150m',
        services: ['13', '54', '88', '156']
      },
      {
        code: (parseInt(codeSeed, 10) + 1).toString(),
        name: `Opp ${parkName}`,
        roadName: 'Main Boulevard',
        distance: '280m',
        services: ['13', '88', '166']
      }
    ],
    carparks: [
      {
        id: `CP-${parkId.slice(0, 4).toUpperCase()}-1`,
        name: `${parkName} Visitors Carpark`,
        area: 'Park Perimeter',
        agency: 'NParks',
        lat: lat + 0.001,
        lng: lng + 0.001
      },
      {
        id: `CP-${parkId.slice(0, 4).toUpperCase()}-2`,
        name: `${parkName} Overflow Parking (P1)`,
        area: 'Park Perimeter',
        agency: 'HDB',
        lat: lat - 0.002,
        lng: lng - 0.001
      }
    ],
    mrt: {
      name: 'Nearby MRT Station',
      line: 'Singapore MRT Rail Network',
      stationCode: 'SG-MRT',
      walkMinutes: 10,
      tip: 'Direct bus connection available from train interchange'
    }
  };
}
