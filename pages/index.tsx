import {useState} from 'react';
import {Meta} from '@/components/Meta';
import {CountriesGrid} from '@/components/countries/CountriesGrid';
import type {Country} from '@/utils/types/country';

const URL = 'https://restcountries.com/v3.1/';

export async function getStaticProps() {
  const res = await fetch(`${URL}all`);
  const data = await res.json();

  return {
    props: {
      countries: data,
    },
  };
}

type Props = {
  countries: Country[];
};
export default function Home({countries}: Props): JSX.Element {
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
