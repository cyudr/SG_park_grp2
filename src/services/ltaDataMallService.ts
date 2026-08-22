export interface LtaNextBus {
  originCode: string;
  destinationCode: string;
  estimatedArrival: string; // ISO string
  minutesUntilArrival: number; // calculated
  isArriving: boolean;
  latitude: string;
  longitude: string;
  visitNumber: string;
  load: 'Seats Available' | 'Standing Available' | 'Limited Standing' | 'Unknown';
  rawLoad: 'SEA' | 'SDA' | 'LSD' | string;
  feature: string; // WAB = Wheelchair Accessible
  type: 'Single Deck' | 'Double Deck' | 'Bendy' | 'Standard';
  rawType: 'SD' | 'DD' | 'BD' | string;
}

export interface LtaBusService {
  serviceNo: string;
  operator: string;
  nextBus: LtaNextBus | null;
  nextBus2: LtaNextBus | null;
  nextBus3: LtaNextBus | null;
}

export interface LtaBusArrivalResult {
  busStopCode: string;
  services: LtaBusService[];
  source: 'lta_datamall_live' | 'simulation_missing_key' | 'simulation_error_fallback';
  lastUpdated: string;
  isLive: boolean;
  message?: string;
}

export interface LtaCarparkLot {
  carParkId: string;
  area: string;
  development: string;
  availableLots: number;
  lotType: string;
  agency: string;
  lat?: number;
  lng?: number;
  distanceKm?: number;
  occupancyPercent?: number;
}

export interface LtaTrafficIncident {
  type: string;
  latitude: number;
  longitude: number;
  message: string;
}

export interface LtaTrainAlert {
  status: 'Normal' | 'Disrupted';
  line?: string;
  message: string;
}

export interface LtaApiStatus {
  configured: boolean;
  keyMasked: string | null;
  endpoints: Record<string, string>;
}

function parseLoad(loadCode: string): 'Seats Available' | 'Standing Available' | 'Limited Standing' | 'Unknown' {
  switch (loadCode) {
    case 'SEA':
      return 'Seats Available';
    case 'SDA':
      return 'Standing Available';
    case 'LSD':
      return 'Limited Standing';
    default:
      return 'Seats Available';
  }
}

function parseType(typeCode: string): 'Single Deck' | 'Double Deck' | 'Bendy' | 'Standard' {
  switch (typeCode) {
    case 'SD':
      return 'Single Deck';
    case 'DD':
      return 'Double Deck';
    case 'BD':
      return 'Bendy';
    default:
      return 'Single Deck';
  }
}

function parseNextBus(rawBus: any): LtaNextBus | null {
  if (!rawBus || !rawBus.EstimatedArrival) return null;

  const arrivalTime = new Date(rawBus.EstimatedArrival).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(0, Math.round((arrivalTime - now) / 60000));

  return {
    originCode: rawBus.OriginCode || '',
    destinationCode: rawBus.DestinationCode || '',
    estimatedArrival: rawBus.EstimatedArrival,
    minutesUntilArrival: diffMinutes,
    isArriving: diffMinutes <= 1,
    latitude: rawBus.Latitude || '',
    longitude: rawBus.Longitude || '',
    visitNumber: rawBus.VisitNumber || '1',
    load: parseLoad(rawBus.Load),
    rawLoad: rawBus.Load || 'SEA',
    feature: rawBus.Feature || 'WAB',
    type: parseType(rawBus.Type),
    rawType: rawBus.Type || 'SD'
  };
}

export const ltaDataMallService = {
  /**
   * Check if the LTA DataMall account key is configured in backend environment
   */
  async checkStatus(): Promise<LtaApiStatus> {
    try {
      const res = await fetch('/api/lta/status');
      if (!res.ok) throw new Error('Status check failed');
      return await res.json();
    } catch (e) {
      return {
        configured: false,
        keyMasked: null,
        endpoints: {}
      };
    }
  },

  /**
   * Fetch live bus arrival v3 timings for a bus stop
   */
  async getBusArrival(busStopCode: string, serviceNo?: string): Promise<LtaBusArrivalResult> {
    const url = `/api/lta/bus-arrival?busStopCode=${encodeURIComponent(busStopCode)}${serviceNo ? `&serviceNo=${encodeURIComponent(serviceNo)}` : ''}`;
    try {
      const res = await fetch(url);
      const json = await res.json();

      const rawServices = json.Services || [];
      const services: LtaBusService[] = rawServices.map((svc: any) => ({
        serviceNo: svc.ServiceNo,
        operator: svc.Operator,
        nextBus: parseNextBus(svc.NextBus),
        nextBus2: parseNextBus(svc.NextBus2),
        nextBus3: parseNextBus(svc.NextBus3)
      }));

      // Sort services naturally (e.g. 13, 54, 71, 132, 262)
      services.sort((a, b) => a.serviceNo.localeCompare(b.serviceNo, undefined, { numeric: true }));

      return {
        busStopCode: json.BusStopCode || busStopCode,
        services,
        source: json._source || 'simulation_missing_key',
        lastUpdated: new Date().toLocaleTimeString('en-SG', { hour12: false }),
        isLive: json._source === 'lta_datamall_live',
        message: json._message
      };
    } catch (err: any) {
      return {
        busStopCode,
        services: [],
        source: 'simulation_error_fallback',
        lastUpdated: new Date().toLocaleTimeString('en-SG', { hour12: false }),
        isLive: false,
        message: err.message
      };
    }
  },

  /**
   * Fetch live carpark lot availability (HDB + LTA + URA)
   */
  async getCarparks(): Promise<{ carparks: LtaCarparkLot[]; isLive: boolean; lastUpdated: string }> {
    try {
      const res = await fetch('/api/lta/carparks');
      const json = await res.json();
      const rawList = json.value || [];

      const carparks: LtaCarparkLot[] = rawList.map((cp: any) => {
        let lat: number | undefined;
        let lng: number | undefined;

        if (cp.Location && typeof cp.Location === 'string') {
          const parts = cp.Location.trim().split(/\s+/);
          if (parts.length >= 2) {
            lat = parseFloat(parts[0]);
            lng = parseFloat(parts[1]);
          }
        }

        return {
          carParkId: cp.CarParkID,
          area: cp.Area || 'Singapore',
          development: cp.Development || `Carpark ${cp.CarParkID}`,
          availableLots: typeof cp.AvailableLots === 'number' ? cp.AvailableLots : parseInt(cp.AvailableLots, 10) || 0,
          lotType: cp.LotType || 'C',
          agency: cp.Agency || 'HDB',
          lat,
          lng
        };
      });

      return {
        carparks,
        isLive: json._source === 'lta_datamall_live',
        lastUpdated: new Date().toLocaleTimeString('en-SG', { hour12: false })
      };
    } catch (err) {
      return {
        carparks: [],
        isLive: false,
        lastUpdated: new Date().toLocaleTimeString('en-SG', { hour12: false })
      };
    }
  },

  /**
   * Fetch live traffic incidents
   */
  async getTrafficIncidents(): Promise<{ incidents: LtaTrafficIncident[]; isLive: boolean }> {
    try {
      const res = await fetch('/api/lta/traffic-incidents');
      const json = await res.json();
      const raw = json.value || [];
      return {
        incidents: raw.map((item: any) => ({
          type: item.Type || 'Incident',
          latitude: item.Latitude,
          longitude: item.Longitude,
          message: item.Message || ''
        })),
        isLive: json._source === 'lta_datamall_live'
      };
    } catch (e) {
      return { incidents: [], isLive: false };
    }
  },

  /**
   * Fetch MRT / LRT Train Service Alerts
   */
  async getTrainAlerts(): Promise<{ alert: LtaTrainAlert; isLive: boolean }> {
    try {
      const res = await fetch('/api/lta/train-alerts');
      const json = await res.json();
      const val = json.value || {};
      const isDisrupted = val.Status === 2;
      const msg = Array.isArray(val.Message) && val.Message[0]?.Content
        ? val.Message[0].Content
        : isDisrupted ? 'MRT service delay or disruption reported on rail network.' : 'All MRT and LRT lines operating normally with normal train frequency.';

      return {
        alert: {
          status: isDisrupted ? 'Disrupted' : 'Normal',
          line: val.Line,
          message: msg
        },
        isLive: json._source === 'lta_datamall_live'
      };
    } catch (e) {
      return {
        alert: {
          status: 'Normal',
          message: 'All MRT and LRT lines operating normally.'
        },
        isLive: false
      };
    }
  }
};
