import { HeatStressResult } from '../types';

/**
 * Singapore Tropical Park Heat Stress Index (TP-HSI) Calculator
 * 
 * Calibrated specifically for Singapore's equatorial maritime climate and acclimatized population.
 * Aligned with the Meteorological Service Singapore (MSS) and SAF / Sports Singapore WBGT advisory standards:
 * - Low Heat Stress (< 31.0°C sWBGT): Safe for continuous physical exercise and trail exploration.
 * - Moderate Heat Stress (31.0°C - 32.9°C sWBGT): Standard Singapore afternoon warmth. Hydrate regularly and take periodic shade breaks.
 * - High Heat Stress (≥ 33.0°C sWBGT): Elevated midday thermal strain. Rest in shaded pavilions, hydrate 800ml/hr.
 * - Extreme Heat Stress (≥ 35.0°C sWBGT): Rare severe condition under unshaded direct sun.
 */

export function calculateHeatStressIndex(
  temperature: number, // in °C
  relativeHumidity: number, // in % (e.g. 70)
  windSpeedKmh: number = 10, // in km/h
  uvIndex: number = 6 // 0 - 12+
): HeatStressResult {
  // Clamp input values to realistic meteorological bounds
  const T = Math.max(18, Math.min(45, temperature));
  const RH = Math.max(20, Math.min(100, relativeHumidity));
  const V_kmh = Math.max(0, Math.min(80, windSpeedKmh));
  const V_ms = V_kmh / 3.6;
  const UV = Math.max(0, Math.min(15, uvIndex));

  // 1. Vapor Pressure e (hPa) via Magnus-Tetens formula
  const e = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));

  // 2. Dew Point Tdp (°C)
  const lnRatio = Math.log(Math.max(0.001, e / 6.105));
  const dewPointC = (237.7 * lnRatio) / (17.27 - lnRatio);

  // 3. Steadman Apparent Temperature (°C)
  const apparentTempC = T + 0.33 * e - 0.70 * V_ms - 4.0;

  // 4. Base Simplified Wet-Bulb Globe Temperature sWBGT (°C)
  const simplifiedWbgtC = 0.567 * T + 0.393 * e + 3.94;

  // 5. Solar Radiation Loading from UV Index (°C)
  // Scaled for tropical park tree canopy filtration
  const solarAdjustmentC = Math.min(UV * 0.20, 2.4);

  // 6. Convective Park Wind / Sea Breeze Cooling (°C)
  const windCoolingC = Math.min((V_kmh / 12) * 1.1, 2.8);

  // 7. Singapore Acclimatization Factor (-1.0°C adjustment for local acclimatized physiology)
  const sgAcclimatizationOffset = 1.0;

  // Final Tropical Park Heat Stress Index (°C)
  const rawHSI = simplifiedWbgtC + solarAdjustmentC - windCoolingC - sgAcclimatizationOffset;
  const heatStressIndexC = Math.round(rawHSI * 10) / 10;

  // 0 - 100 Relative Thermal Strain Score calibrated to Singapore baseline
  // 24°C = 10, 31°C = 50, 33°C = 75, 35°C = 95
  const rawScore = ((heatStressIndexC - 24) / (36 - 24)) * 100;
  const heatStressScore = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Singapore MSS / NEA Heat Stress Advisory Classification
  let riskLevel: HeatStressResult['riskLevel'] = 'Low';
  let badgeColor = '#006b47'; // Green
  let headline = 'Low Heat Stress — Ideal for Outdoor Trails';
  let advisoryText = 'Thermal load is well within normal Singapore tolerance. Body heat dissipation is effective with standard hydration.';
  let workRestRatio = 'Continuous park activities allowed (drink water regularly)';
  let hydrationRateMlPerHr = 400;

  let runningJogging = 'Great conditions for endurance jogging and walking. Keep a standard hydration routine.';
  let familyPlay = 'Ideal for playgrounds, open field picnics, and cycling.';
  let seniorsPets = 'Very comfortable for leisurely walks along park connectors and shaded trails.';

  if (heatStressIndexC >= 35.0) {
    riskLevel = 'Extreme';
    badgeColor = '#93000a'; // Dark Red / Crimson
    headline = 'Extreme Heat Stress — Severe Heat Hazard';
    advisoryText = 'Dangerous thermal strain. Direct sun and high moisture severely hinder heat loss.';
    workRestRatio = '15 mins light movement / 45 mins rest in shaded pavilion';
    hydrationRateMlPerHr = 1000;
    runningJogging = 'Avoid strenuous running outdoors. Reschedule to early morning (<7:30 AM) or after sunset.';
    familyPlay = 'Limit open playground play. Seek indoor nature galleries or shaded gazebos.';
    seniorsPets = 'High risk. Avoid hot asphalt paths; pavement temperature may exceed 50°C.';
  } else if (heatStressIndexC >= 33.0) {
    riskLevel = 'High';
    badgeColor = '#ba1a1a'; // Red
    headline = 'High Heat Stress — Caution Advised in Direct Sun';
    advisoryText = 'Elevated equatorial thermal strain. Prolonged unshaded workouts can lead to heat exhaustion.';
    workRestRatio = '30 mins active / 15 mins rest in shade';
    hydrationRateMlPerHr = 750;
    runningJogging = 'Pace yourself moderately. Opt for shaded forest boardwalks rather than open turf.';
    familyPlay = 'Wear wide-brim hats, apply sunscreen SPF 50+, and take cooling water breaks every 20 minutes.';
    seniorsPets = 'Walk along river breeze corridors. Check pavement temperature for pet paws.';
  } else if (heatStressIndexC >= 31.0) {
    riskLevel = 'Moderate';
    badgeColor = '#d97706'; // Amber / Orange
    headline = 'Moderate Heat Stress — Standard Singapore Warmth';
    advisoryText = 'Typical Singapore afternoon tropical conditions. Well-tolerated by acclimatized residents with regular hydration.';
    workRestRatio = '45 mins active / 10 mins rest in shade';
    hydrationRateMlPerHr = 550;
    runningJogging = 'Standard tropical running conditions. Drink water or isotonic fluids every 30-40 minutes.';
    familyPlay = 'Good for park visits, cycling, and lawn games. Keep a water bottle handy.';
    seniorsPets = 'Pleasant under tree canopies and along water bodies.';
  }

  return {
    temperature: Math.round(T * 10) / 10,
    relativeHumidity: Math.round(RH),
    windSpeedKmh: Math.round(V_kmh * 10) / 10,
    windSpeedMs: Math.round(V_ms * 10) / 10,
    uvIndex: Math.round(UV * 10) / 10,
    vaporPressureHpa: Math.round(e * 10) / 10,
    dewPointC: Math.round(dewPointC * 10) / 10,
    apparentTempC: Math.round(apparentTempC * 10) / 10,
    simplifiedWbgtC: Math.round(simplifiedWbgtC * 10) / 10,
    solarAdjustmentC: Math.round(solarAdjustmentC * 10) / 10,
    windCoolingC: Math.round(windCoolingC * 10) / 10,
    heatStressIndexC,
    heatStressScore,
    riskLevel,
    badgeColor,
    headline,
    advisoryText,
    workRestRatio,
    hydrationRateMlPerHr,
    activityRecommendations: {
      runningJogging,
      familyPlay,
      seniorsPets
    }
  };
}
