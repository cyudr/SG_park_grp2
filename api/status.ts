export default function handler(req: any, res: any) {
  const ltaKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_ACCOUNT_KEY;
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    ltaConfigured: Boolean(ltaKey && ltaKey.trim().length > 0)
  });
}
