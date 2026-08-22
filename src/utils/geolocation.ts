import { Park } from '../types';

/**
 * Calculates the great-circle distance between two geographic coordinates
 * using the Haversine formula (returns distance in kilometers).
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 decimal place
}

export interface NearestParkResult {
  parkId: string;
  park: Park;
  distanceKm: number;
  walkingMinutes: number;
}

/**
 * Identifies the closest Singapore park to given user coordinates
 */
export function findNearestPark(
  userLat: number,
  userLng: number,
  parks: Record<string, Park>
): NearestParkResult | null {
  let closestParkId: string | null = null;
  let minDistance = Infinity;

  for (const [id, park] of Object.entries(parks)) {
    if (park.lat && park.lng) {
      const dist = calculateDistanceKm(userLat, userLng, park.lat, park.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestParkId = id;
      }
    }
  }

  if (!closestParkId || !parks[closestParkId]) return null;

  return {
    parkId: closestParkId,
    park: parks[closestParkId],
    distanceKm: minDistance,
    walkingMinutes: Math.round((minDistance / 4.5) * 60) // approx 4.5 km/h walking speed
  };
}
