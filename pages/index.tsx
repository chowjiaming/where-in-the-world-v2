import type {GetStaticProps} from 'next';
import {useState} from 'react';
import {Meta} from '@/components/Meta';
import {CountriesGrid} from '@/components/countries/CountriesGrid';
import type {Country} from '@/utils/types/country';

const URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}/api/countries/`
    : `${process.env.URL}/api/countries/`;

type CountriesProps = {
  countries: Country[];
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: CountriesProps;
}> => {
  let countries: Country[] = [];

  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        // update with your user-agent
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
        Accept: 'application/json; charset=UTF-8',
      },
    });
    countries = await res.json();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      countries,
    },
  };
};

export default function Home({countries}: CountriesProps): JSX.Element {
  const [page, setPage] = useState(1);
  return (
    <>
      <Meta />
      <CountriesGrid
        countries={countries}
        totalRegisters={countries.length}
        page={page}
        onPageChange={(page) => setPage(page)}
      />
    </>
  );
}
