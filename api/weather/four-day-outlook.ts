export default async function handler(req: any, res: any) {
  try {
    const r = await fetch('https://api-open.data.gov.sg/v2/real-time/api/four-day-outlook');
    res.status(r.status).json(await r.json());
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
