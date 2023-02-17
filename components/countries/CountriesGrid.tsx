import {Select, ThemeTypings} from '@chakra-ui/react';
import {
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {FaSearchLocation} from 'react-icons/fa';
import type {Country} from '@/utils/types/country';
import type {BasePagination, PaginationState} from '@/utils/types/pagination';
import {CountryFilterData, Regions} from '@/utils/types/filter';
import {useFilterCountries} from '@/utils/hooks/useFilterCountries';
import {usePagination} from '@/utils/hooks/usePagination';
import {Pagination} from '@/components/shared/pagination/Pagination';
import {CountryCard} from '@/components/countries/CountryCard';

interface Props<Country> extends BasePagination {
  countries: Country[];
  itemsPerPage?: number;
  colorScheme?: ThemeTypings['colorSchemes'];
}
export function CountriesGrid({
  countries,
  itemsPerPage = 6,
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

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryFilterData((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };
  const handleRegionFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilterData((prev) => ({
      ...prev,
      regionFilter: parseInt(e.target.value),
    }));
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        direction={{
          base: 'column',
          lg: 'row',
        }}
        gap={{
          base: '4',
          lg: '0',
        }}
        mb="8"
      >
        <InputGroup
          w={{
            base: 'full',
            lg: '60%',
            xl: '50%',
            '2xl': '40%',
          }}
          gap="4"
        >
          <InputLeftElement
            pointerEvents="none"
            children={
              <Icon
                as={FaSearchLocation}
                color="gray.500"
                _dark={{
                  color: 'gray.300',
                }}
              />
            }
          />
          <Input
            flex="2"
            type="text"
            placeholder="Search"
            onChange={handleSearchInput}
          />
          <Select
            flex="1"
            placeholder="Filter by region"
            onChange={handleRegionFilter}
          >
            <option value={Regions.Africa}>Africa</option>
            <option value={Regions.Americas}>Americas</option>
            <option value={Regions.Asia}>Asia</option>
            <option value={Regions.Europe}>Europe</option>
            <option value={Regions.Oceania}>Oceania</option>
          </Select>
        </InputGroup>
        {paginationState.totalPages > 1 && (
          <Pagination
            {...paginationState}
            onPageChange={(pageIndex) => {
              setPagination((prevState) => ({
                ...prevState,
                pageIndex,
              }));
            }}
          />
        )}
      </Flex>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
          '2xl': 'repeat(4, 1fr)',
        }}
        gap="6"
      >
        {paginationState.pageItems.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </Grid>
    </>
  );
}

CountriesGrid.displayName = 'CountriesGrid';
