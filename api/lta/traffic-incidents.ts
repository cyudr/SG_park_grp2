export default async function handler(req: any, res: any) {
  try {
    const key = (process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_ACCOUNT_KEY) as string;
    
    if (key) {
      const r = await fetch(
        "https://datamall2.mytransport.sg/ltaodataservice/TrafficIncidents",
        { headers: { AccountKey: key } }
      );
      if (r.ok) {
        const data = await r.json();
        return res.status(200).json(data);
      }
    }

    return res.status(200).json({
      value: [
        {
          Type: "Road Works",
          Latitude: 1.362,
          Longitude: 103.844,
          Message: "Road maintenance on Ang Mo Kio Ave 1 near Bishan Park entrance."
        }
      ]
    });
  } catch (err: any) {
    return res.status(200).json({
      value: [],
      error: err.message || "Error fetching traffic incidents"
    });
  }
}
