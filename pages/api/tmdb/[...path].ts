import type { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@/lib/tmdbServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const endpoint = '/' + (Array.isArray(path) ? path.join('/') : path);
  
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'path' && value) {
      params[key] = Array.isArray(value) ? value[0] : value;
    }
  }

  try {
    const data = await get(endpoint, params);
    res.status(200).json(data);
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  }
}
