import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Import serverless API handlers
import healthHandler from './api/health.ts';
import statusHandler from './api/status.ts';
import ltaStatusHandler from './api/lta/status.ts';
import ltaCarparksHandler from './api/lta/carparks.ts';
import ltaBusArrivalHandler from './api/lta/bus-arrival.ts';
import ltaTrafficIncidentsHandler from './api/lta/traffic-incidents.ts';
import ltaTrainAlertsHandler from './api/lta/train-alerts.ts';
import onemapSearchHandler from './api/onemap/search.ts';
import weatherTwoHrHandler from './api/weather/two-hr-forecast.ts';
import weather24HrHandler from './api/weather/twenty-four-hr-forecast.ts';
import weatherFourDayHandler from './api/weather/four-day-outlook.ts';
import weatherAirTempHandler from './api/weather/air-temperature.ts';
import weatherRainfallHandler from './api/weather/rainfall.ts';
import weatherPsiHandler from './api/weather/psi.ts';
import weatherPm25Handler from './api/weather/pm25.ts';
import weatherUvHandler from './api/weather/uv.ts';
import weatherHumidityHandler from './api/weather/relative-humidity.ts';
import weatherWindSpeedHandler from './api/weather/wind-speed.ts';
import weatherWindDirHandler from './api/weather/wind-direction.ts';
import weatherCarparksHandler from './api/weather/carparks.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Ads.txt for Google AdSense verification
  app.get('/ads.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('google.com, pub-8369709738621970, DIRECT, f08c47fec0942fa0\n');
  });

  // Health & Status
  app.all('/api/health', (req, res) => healthHandler(req, res));
  app.all('/api/status', (req, res) => statusHandler(req, res));

  // LTA routes
  app.all('/api/lta/status', (req, res) => ltaStatusHandler(req, res));
  app.all('/api/lta/carparks', (req, res) => ltaCarparksHandler(req, res));
  app.all('/api/lta/bus-arrival', (req, res) => ltaBusArrivalHandler(req, res));
  app.all('/api/lta/traffic-incidents', (req, res) => ltaTrafficIncidentsHandler(req, res));
  app.all('/api/lta/train-alerts', (req, res) => ltaTrainAlertsHandler(req, res));

  // OneMap routes
  app.all('/api/onemap/search', (req, res) => onemapSearchHandler(req, res));

  // Weather routes
  app.all('/api/weather/two-hr-forecast', (req, res) => weatherTwoHrHandler(req, res));
  app.all('/api/weather/twenty-four-hr-forecast', (req, res) => weather24HrHandler(req, res));
  app.all('/api/weather/four-day-outlook', (req, res) => weatherFourDayHandler(req, res));
  app.all('/api/weather/air-temperature', (req, res) => weatherAirTempHandler(req, res));
  app.all('/api/weather/rainfall', (req, res) => weatherRainfallHandler(req, res));
  app.all('/api/weather/psi', (req, res) => weatherPsiHandler(req, res));
  app.all('/api/weather/pm25', (req, res) => weatherPm25Handler(req, res));
  app.all('/api/weather/uv', (req, res) => weatherUvHandler(req, res));
  app.all('/api/weather/relative-humidity', (req, res) => weatherHumidityHandler(req, res));
  app.all('/api/weather/wind-speed', (req, res) => weatherWindSpeedHandler(req, res));
  app.all('/api/weather/wind-direction', (req, res) => weatherWindDirHandler(req, res));
  app.all('/api/weather/carparks', (req, res) => weatherCarparksHandler(req, res));

  // Default /api handler
  app.all('/api', (req, res) => {
    res.json({
      status: "ok",
      service: "SG ParkWeather API",
      time: new Date().toISOString()
    });
  });

  // Vite middleware for dev or static build serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SG ParkWeather server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
