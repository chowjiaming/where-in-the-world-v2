import type {GetStaticProps, GetStaticPaths} from 'next';
import type {Country} from '@/utils/types/country';
import {Button, Container, Icon} from '@chakra-ui/react';
import {FaHome} from 'react-icons/fa';
import {Meta} from '@/components/Meta';
import {CountryCard} from '@/components/country/CountryPageCard';
import {URL} from '@/utils/settings/constants';
import {useRouter} from 'next/navigation';

export type CountryPageProps = {
  country: Country;
  borderCountries: string[];
};
export default function CountryPage(props: CountryPageProps): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Meta page={props.country.name.common} icon={props.country.flags.svg} />
      <Container
        maxW={{
          base: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
          '2xl': 'container.2xl',
        }}
        flex="1"
      >
        <Button
          leftIcon={<Icon as={FaHome} />}
          colorScheme="telegram"
          onClick={() => router.push('/')}
        >
          Home
        </Button>
        <CountryCard {...props} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let countries: Country[] = [];

  try {
    const res = await fetch(URL);
    countries = await res.json();
  } catch (error) {
    console.error(error);
  }

  const paths = countries.map((country) => {
    return {
      params: {name: country.name.common.toLowerCase()},
    };
  });

  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (context) => {
  let country = {} as Country;

  try {
    const res = await fetch(`${URL}name/${context?.params?.name}`);
    country = await res.json();
  } catch (error) {
    console.error(error);
  }

  let borderCountries: Country[] = [];

  try {
    borderCountries = country.borders
      ? await Promise.all(
          country.borders.map(async (borderCode) => {
            const res = await fetch(`${URL}cca3/${borderCode}`);
            const borderCountries: Country = await res.json();
            return borderCountries;
          })
        )
      : [];
  } catch (error) {
    console.error(error);
  }

  return {props: {country: country, borderCountries}};
};
