export default async function handler(req: any, res: any) {
  try {
    let searchVal = "Singapore";
    if (req.query) {
      searchVal = req.query.searchVal || req.query.q || searchVal;
    } else if (req.url) {
      try {
        const u = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
        searchVal = u.searchParams.get('searchVal') || u.searchParams.get('q') || searchVal;
      } catch {
        // fallback
      }
    }

    const r = await fetch(
      `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(searchVal)}&returnGeom=Y&getAddrDetails=Y`
    );
    if (r.ok) {
      const data = await r.json();
      return res.status(200).json(data);
    }
    return res.status(200).json({ found: 0, totalNumPages: 0, pageNum: 1, results: [] });
  } catch (err: any) {
    return res.status(200).json({
      found: 0,
      totalNumPages: 0,
      pageNum: 1,
      results: [],
      error: err.message || "Error searching onemap"
    });
  }
}
