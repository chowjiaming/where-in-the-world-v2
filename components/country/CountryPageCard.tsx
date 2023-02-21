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
import {type Currencies, type Languages} from '@/utils/types/country';
import {type CountryPageProps} from '@/pages/country/[name]';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export function CountryCard({
  country,
  borderCountries,
}: CountryPageProps): JSX.Element {
  const router = useRouter();
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
        {country.coatOfArms.svg && (
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
        )}
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
        <Box flex="1" w="full">
          <Heading as="h3" size="lg" mb="8">
            Country Info
          </Heading>
          <Grid
            templateColumns="repeat(2, 1fr)"
            columnGap={{
              base: '4',
              lg: '8',
            }}
            rowGap="4"
          >
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">Native Name:</Text>{' '}
                {country.name.nativeName
                  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    Object.values(country.name.nativeName)[0].official
                  : 'No data 😔'}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">Population:</Text>{' '}
                {country.population.toLocaleString()}
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
                {country.currencies
                  ? Object.keys(country.currencies).map((key, i) => (
                      <Fragment key={key}>
                        {i > 0 && ', '}
                        <Text as="span" textTransform="capitalize">
                          {country.currencies &&
                            country.currencies[key as keyof Currencies]?.name}
                        </Text>
                      </Fragment>
                    ))
                  : 'No data 😔'}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">Languages:</Text>{' '}
                {country.languages
                  ? Object.keys(country.languages).map((key, i) => (
                      <Fragment key={key}>
                        {i > 0 && ', '}
                        <Text as="span">
                          {country.languages &&
                            country.languages[key as keyof Languages]}
                        </Text>
                      </Fragment>
                    ))
                  : 'No data 😔'}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">
                  {!!country.demonyms &&
                    `Demonym${
                      country.demonyms.eng.m === country.demonyms.eng.f
                        ? ''
                        : 's'
                    }:`}
                </Text>{' '}
                {country.demonyms ? (
                  <Text as="span" textTransform="capitalize">
                    {country.demonyms.eng.m === country.demonyms.eng.f
                      ? country.demonyms.eng.m
                      : `${country.demonyms.eng.m}, ${country.demonyms.eng.f}`}
                  </Text>
                ) : (
                  'No data 😔'
                )}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">Start of Week:</Text>{' '}
                {country.startOfWeek ? (
                  <Text as="span" textTransform="capitalize">
                    {country.startOfWeek}
                  </Text>
                ) : (
                  'No data 😔'
                )}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">Independent:</Text>{' '}
                {country.independent ? 'Yes' : 'No'}
              </Text>
            </GridItem>
            <GridItem>
              <Text wordBreak="keep-all">
                <Text as="strong">UN Member:</Text>{' '}
                {country.unMember ? 'Yes' : 'No'}
              </Text>
            </GridItem>
          </Grid>
        </Box>
      </CardBody>
      <Divider />
      <CardFooter as={Flex} justify="center" align="center">
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
          {!borderCountries.length && (
            <Text as="span" fontWeight="normal">
              {`${country.name.common} has no bordering countries`}
            </Text>
          )}
        </Text>
        <ButtonGroup flexWrap="wrap" gap="2" ml="2">
          {!!borderCountries.length && (
            <>
              {borderCountries.map((key) => (
                <Button
                  key={key}
                  colorScheme="telegram"
                  textTransform="capitalize"
                  onClick={() => router.push(`/country/${key}`)}
                >
                  {key}
                </Button>
              ))}
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

CountryCard.displayName = 'CountryCard';
