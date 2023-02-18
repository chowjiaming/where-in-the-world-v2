import type {NextApiRequest, NextApiResponse} from 'next';
import {Country} from '@/utils/types/country';
import data from '@/data/countries.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Country
    | {
        statusCode: number;
        message: string;
      }
  >
) {
  const {name} = req.query;
  if (!name) {
    return res.status(400).json({statusCode: 400, message: 'Bad request'});
  }
  if (Array.isArray(name)) {
    return res.status(400).json({statusCode: 400, message: 'Invalid query'});
  }

  const response: Country | undefined = data.countries.find(
    (country) => country.name.common.toLowerCase() === name.toLowerCase()
  );

  if (!response) {
    return res.status(404).json({statusCode: 404, message: 'Not found'});
  }

  return res.status(200).json(response);
}
