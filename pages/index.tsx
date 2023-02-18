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
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const countries: Country[] = await res.json();

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
