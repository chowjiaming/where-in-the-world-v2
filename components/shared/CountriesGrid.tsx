import {GridItem, ThemeTypings} from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Text,
  Tooltip,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Image from 'next/image';
import {useState} from 'react';
import type {Country} from '@/utils/types/country';
import type {BasePagination, PaginationState} from '@/utils/types/pagination';
import {usePagination} from '@/utils/hooks/usePagination';
import {Pagination} from '@/components/shared/pagination/Pagination';

interface Props<Country> extends BasePagination {
  countries: Country[];
  itemsPerPage?: number;
  colorScheme?: ThemeTypings['colorSchemes'];
}
export function CountriesGrid({
  countries,
  itemsPerPage = 6,
}: Props<Country>): JSX.Element {
  const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: itemsPerPage,
  });

  const paginationState = usePagination<Country>({
    totalRegisters: countries.length,
    page: pageIndex,
    items: countries,
    itemsPerPage: pageSize,
  });

  return (
    <>
      <Pagination
        {...paginationState}
        onPageChange={(pageIndex) => {
          setPagination((prevState) => ({
            ...prevState,
            pageIndex,
          }));
        }}
      />
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
          <GridItem key={country.cca3}>
            <Card>
              <CardHeader>
                <Heading as="h2" size="lg">
                  {country.name.common}
                </Heading>
              </CardHeader>
              <CardBody as={Flex} justifyContent="center">
                <Tooltip label={country.flags.alt || 'No countries 😔'}>
                  <Image
                    aria-label="Country flag"
                    src={country.flags.svg}
                    alt={country.flags.alt || 'No countries 😔'}
                    width={300}
                    height={200}
                    style={{width: 'auto', height: 'auto'}}
                    priority
                  />
                </Tooltip>
              </CardBody>
              <CardFooter as={Flex} direction="column" gap="2">
                <Text>
                  <Text as="strong">Population:</Text> {country.population}
                </Text>
                <Text>
                  <Text as="strong">Region:</Text> {country.region}
                </Text>
                <Text>
                  <Text as="strong">Capital:</Text>{' '}
                  {country.capital ? country.capital : 'No countries 😔'}
                </Text>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
