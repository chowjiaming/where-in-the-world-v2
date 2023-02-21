import {Box, type ThemeTypings} from '@chakra-ui/react';
import {Grid} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import type {Country} from '@/utils/types/country';
import type {BasePagination, PaginationState} from '@/utils/types/pagination';
import {type CountryFilterData, Regions} from '@/utils/types/filter';
import {useFilterCountries} from '@/utils/hooks/useFilterCountries';
import {usePagination} from '@/utils/hooks/usePagination';
import {CountryCard} from '@/components/countries/CountryCard';
import {CountriesControl} from '@/components/countries/CountriesControl';

interface Props<Country> extends BasePagination {
  countries: Country[];
  itemsPerPage?: number;
  colorScheme?: ThemeTypings['colorSchemes'];
}
export function CountriesGrid({
  countries,
  itemsPerPage = 10,
}: Props<Country>): JSX.Element {
  const [countryFilterData, setCountryFilterData] = useState<CountryFilterData>(
    {
      searchTerm: '',
      regionFilter: Regions.All,
    }
  );
  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: itemsPerPage,
  });

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: 1,
    }));
  }, [countryFilterData]);

  const filteredCountries = useFilterCountries(countries, countryFilterData);

  const paginationState = usePagination<Country>({
    totalRegisters: filteredCountries.length,
    page: pageIndex,
    items: filteredCountries,
    itemsPerPage: pageSize,
  });

  return (
    <Box as="section" flex="1" role="contentinfo">
      <CountriesControl
        paginationState={paginationState}
        setCountryFilterData={setCountryFilterData}
        setPagination={setPagination}
      />
      <Grid
        role="grid"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
          '2xl': 'repeat(5, 1fr)',
        }}
        gap="6"
      >
        {paginationState.pageItems.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </Grid>
    </Box>
  );
}

CountriesGrid.displayName = 'CountriesGrid';
