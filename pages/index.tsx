import {type GetStaticProps} from 'next';
import {useState} from 'react';
import {Meta} from '@/components/Meta';
import {CountriesGrid} from '@/components/countries/CountriesGrid';
import {type Country} from '@/utils/types/country';
import {URL} from '@/utils/settings/constants';
import {api} from '@/utils/api';

type CountriesProps = {
  countries: Country[];
};
export const getStaticProps: GetStaticProps = async (): Promise<{
  props: CountriesProps;
}> => {
  const countries = await api<Country[]>(URL);
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
