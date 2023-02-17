import {Country} from '@/utils/types/country';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {Meta} from '@/components/Meta';
import Image from 'next/image';

const URL = 'https://restcountries.com/v3.1/';

export default function CountryPage({country}: {country: Country}) {
  return (
    <>
      <Meta page={country.name.common} icon={country.flags.svg} />
      <Card>
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
            <Text as="strong">Capital:</Text>{' '}
            {country.capital ? country.capital : 'No data 😔'}
          </Text>
        </CardFooter>
      </Card>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${URL}all`);
  const countries: Country[] = await res.json();
  const paths = countries.map((country) => ({
    params: {name: country.name.common.toLowerCase()},
  }));

  return {paths, fallback: false};
}

export async function getStaticProps({params}: {params: {name: string}}) {
  const res = await fetch(`${URL}name/${params.name}`);
  const country: Country[] = await res.json();

  return {props: {country: country[0]}};
}
