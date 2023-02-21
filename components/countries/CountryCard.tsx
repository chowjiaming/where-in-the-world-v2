import {
  Card,
  CardBody,
  GridItem,
  Text,
  Tooltip,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import {type Country} from '@/utils/types/country';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

type Props = {
  country: Country;
};
export function CountryCard({country}: Props): JSX.Element {
  const router = useRouter();
  return (
    <GridItem role="gridcell">
      <Card
        role="contentinfo"
        h="full"
        boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
      >
        <CardBody as={Flex} direction="column" gap="2">
          <Tooltip label={country.flags.alt || 'No data 😔'}>
            <Image
              aria-label={`Country flag of ${country.name.common}`}
              src={country.flags.svg}
              alt={country.flags.alt || 'No data 😔'}
              width={100}
              height={100}
              style={{width: 'auto', height: 'auto'}}
              priority
            />
          </Tooltip>
          <Heading as="h2" size="lg">
            {country.name.common}
          </Heading>
          <Flex direction="column" mb="2">
            <Text>
              <Text as="strong">Population:</Text>{' '}
              {country.population.toLocaleString()}
            </Text>
            <Text>
              <Text as="strong">Area:</Text>{' '}
              {`${country.area.toLocaleString()} km²`}
            </Text>
            <Text>
              <Text as="strong">Region:</Text> {country.region}
            </Text>
            <Text>
              <Text as="strong">Capital:</Text>{' '}
              {country.capital ? country.capital : 'No data 😔'}
            </Text>
          </Flex>
          <Button
            mt="auto"
            colorScheme="telegram"
            onClick={() =>
              router.push(`/country/${country.name.common.toLowerCase()}`)
            }
          >
            See More
          </Button>
        </CardBody>
      </Card>
    </GridItem>
  );
}

CountryCard.displayName = 'CountryCard';
