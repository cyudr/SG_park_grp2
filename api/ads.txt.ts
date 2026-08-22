export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('google.com, pub-8369709738621970, DIRECT, f08c47fec0942fa0\n');
}
