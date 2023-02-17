import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  GridItem,
  Text,
  Tooltip,
  Flex,
  Heading,
} from '@chakra-ui/react';
import type {Country} from '@/utils/types/country';
import Image from 'next/image';

type Props = {
  country: Country;
};
export function CountryCard({country}: Props): JSX.Element {
  return (
    <GridItem>
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
    </GridItem>
  );
}

CountryCard.displayName = 'CountryCard';
