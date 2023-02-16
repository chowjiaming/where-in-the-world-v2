import {Meta} from '@/components/Meta';
import type {Country} from '@/utils/types/country';
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
  return (
    <>
      <Meta />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
          '2xl': 'repeat(4, 1fr)',
        }}
        gap="6"
      >
        {countries.map((country) => (
          <Card key={country.cca3}>
            <CardHeader>
              <Heading as="h2" size="lg">
                {country.name.common}
              </Heading>
            </CardHeader>
            <CardBody as={Flex} justifyContent="center">
              <Tooltip label={country.flags.alt || 'No data 😔'}>
                <Image
                  aria-label="Country flag"
                  src={country.flags.svg}
                  alt={country.flags.alt || 'No data 😔'}
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
                <Text as="strong">Capital:</Text> {country.capital}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </>
  );
}
