export default function handler(req: any, res: any) {
  const key = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_ACCOUNT_KEY;
  const configured = Boolean(key && key.trim().length > 0);
  res.status(200).json({
    configured,
    keyMasked: configured ? `${key!.slice(0, 4)}...${key!.slice(-4)}` : null,
    status: "ok"
  });
}
