export default async function handler(req: any, res: any) {
  try {
    const r = await fetch('https://api.data.gov.sg/v1/transport/carpark-availability');
    res.status(r.status).json(await r.json());
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
