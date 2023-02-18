import type {NextApiRequest, NextApiResponse} from 'next';
import {Country} from '@/utils/types/country';
import data from '@/data/countries.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {
  return res.status(200).json(data.countries);
}
