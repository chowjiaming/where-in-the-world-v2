import {type NextApiRequest, type NextApiResponse} from 'next';
import {type Country} from '@/utils/types/country';
import data from '@/data/countries.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | string
    | {
        statusCode: number;
        message: string;
      }
  >
) {
  const {code} = req.query;
  if (!code) {
    return res.status(400).json({statusCode: 400, message: 'Bad request'});
  }
  if (Array.isArray(code)) {
    return res.status(400).json({statusCode: 400, message: 'Invalid query'});
  }

  const country: Country | undefined = data.countries.find(
    (country) => country.cca3 === code
  );

  if (!country) {
    return res.status(404).json({statusCode: 404, message: 'Not found'});
  }

  return res.status(200).json(country.name.common.toLowerCase());
}
