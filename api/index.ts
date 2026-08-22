export default function handler(req: any, res: any) {
  const data = {
    status: "ok",
    service: "SG ParkWeather Serverless API",
    version: "2026.1",
    timestamp: new Date().toISOString()
  };

  if (typeof res.status === 'function') {
    if (typeof res.json === 'function') {
      return res.status(200).json(data);
    }
    res.status(200);
  } else if (res.statusCode !== undefined) {
    res.statusCode = 200;
  }

  if (typeof res.setHeader === 'function' && !res.headersSent) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  if (typeof res.end === 'function') {
    res.end(JSON.stringify(data));
  }
}
