import {type NextApiRequest, type NextApiResponse} from 'next';
import {type Country} from '@/utils/types/country';
import data from '@/data/countries.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Country[]>
) {
  return res.status(200).json(data.countries);
}
