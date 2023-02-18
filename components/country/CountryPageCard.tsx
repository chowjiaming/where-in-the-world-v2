import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {Fragment} from 'react';
import type {CountryPageProps} from '@/pages/country/[name]';
import Image from 'next/image';
import Link from 'next/link';

export function CountryCard({
  country,
  borderCountries,
}: CountryPageProps): JSX.Element {
  return (
    <Card
      mt={{
        base: '4',
        lg: '8',
      }}
    >
      <CardHeader as={Flex} align="baseline">
        <Heading as="h2" size="lg" mr="2">
          {country.name.common}
        </Heading>
        <Box w="8" h="8">
          <Image
            src={country.coatOfArms.svg}
            alt={`Coat of arms of ${country.name.common}`}
            width={24}
            height={24}
            style={{width: 'auto', height: 'auto'}}
            priority
          />
        </Box>
      </CardHeader>
      <CardBody
        as={Flex}
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align="center"
        gap="8"
      >
        <Box flex="1">
          <Tooltip label={country.flags.alt || 'No data 😔'}>
            <Image
              aria-label={`Country flag of ${country.name.common}`}
              src={country.flags.svg}
              alt={country.flags.alt || 'No data 😔'}
              width={300}
              height={200}
              style={{width: 'auto', height: 'auto'}}
              priority
            />
          </Tooltip>
        </Box>
        <Grid
          flex="1"
          templateColumns="repeat(2, 1fr)"
          gap={{
            base: '4',
            lg: '8',
          }}
        >
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Native Name:</Text>{' '}
              {Object.values(country.name.nativeName)[0].official}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Population:</Text> {country.population}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Region:</Text> {country.region}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Sub Region:</Text> {country.subregion}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Capital:</Text>{' '}
              {country.capital ? country.capital : 'No data 😔'}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Top Level Domain:</Text>{' '}
              {country.tld
                ? country.tld.map((key, i) => (
                    <Fragment key={key}>
                      {i > 0 && ', '}
                      <Text as="span">{key}</Text>
                    </Fragment>
                  ))
                : 'No data 😔'}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Currencies:</Text>{' '}
              {Object.keys(country.currencies).map((key, i) => (
                <Fragment key={key}>
                  {i > 0 && ', '}
                  <Text as="span">{country.currencies[key].name}</Text>
                </Fragment>
              ))}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Languages:</Text>{' '}
              {Object.keys(country.languages).map((key, i) => (
                <Fragment key={key}>
                  {i > 0 && ', '}
                  <Text as="span">{country.languages[key]}</Text>
                </Fragment>
              ))}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Start of Week:</Text>{' '}
              {country.startOfWeek ? country.startOfWeek : 'No data 😔'}
            </Text>
          </GridItem>
          <GridItem>
            <Text wordBreak="keep-all">
              <Text as="strong">Independent:</Text>{' '}
              {country.independent ? 'Yes' : 'No'}
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
      <Divider />
      <CardFooter as={Flex} justify="center" align="center" gap="4">
        <Text wordBreak="keep-all">
          <Text as="strong">
            Border{' '}
            {`${
              !borderCountries.length
                ? 'Countries'
                : borderCountries.length === 1
                ? 'Country'
                : 'Countries'
            }`}
            :
          </Text>{' '}
        </Text>
        {borderCountries.length ? (
          <ButtonGroup flexWrap="wrap" gap="4">
            {borderCountries.map((key) => (
              <Button
                key={key}
                as={Link}
                href={`/country/${key.toLowerCase()}`}
              >
                {key}
              </Button>
            ))}
          </ButtonGroup>
        ) : (
          <Text as="span" fontWeight="normal">
            {`${country.name.common} has no bordering countries`}
          </Text>
        )}
      </CardFooter>
    </Card>
  );
}

CountryCard.displayName = 'CountryCard';
