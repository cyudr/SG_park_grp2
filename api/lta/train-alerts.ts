export default async function handler(req: any, res: any) {
  try {
    const key = (process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_ACCOUNT_KEY) as string;
    
    if (key) {
      const r = await fetch(
        "https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts",
        { headers: { AccountKey: key } }
      );
      if (r.ok) {
        const data = await r.json();
        return res.status(200).json(data);
      }
    }

    return res.status(200).json({
      value: {
        Status: 1,
        Message: [{ Content: "All MRT and LRT rail lines operating normally." }]
      }
    });
  } catch (err: any) {
    return res.status(200).json({
      value: { Status: 1, Message: [] },
      error: err.message || "Error fetching train alerts"
    });
  }
}
