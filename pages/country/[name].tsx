import type {GetStaticProps, GetStaticPaths} from 'next';
import type {Country} from '@/utils/types/country';
import {Button, ButtonGroup, Container, Icon} from '@chakra-ui/react';
import {FaArrowLeft, FaHome} from 'react-icons/fa';
import {Meta} from '@/components/Meta';
import {CountryCard} from '@/components/country/CountryPageCard';
import {useRouter} from 'next/router';
import Link from 'next/link';

const URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}/api/countries/`
    : `${process.env.URL}/api/countries/`;

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
        <ButtonGroup>
          <Button
            leftIcon={<Icon as={FaArrowLeft} onClick={() => router.back()} />}
          >
            Back
          </Button>
          <Button as={Link} leftIcon={<Icon as={FaHome} />} href="/">
            Home
          </Button>
        </ButtonGroup>
        <CountryCard {...props} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let countries: Country[] = [];

  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        // update with your user-agent
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
        Accept: 'application/json; charset=UTF-8',
      },
    });
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
    const res = await fetch(`${URL}name/${context?.params?.name}`, {
      method: 'GET',
      headers: {
        // update with your user-agent
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
        Accept: 'application/json; charset=UTF-8',
      },
    });
    country = await res.json();
  } catch (error) {
    console.error(error);
  }

  let borderCountries: Country[] = [];

  try {
    borderCountries = country.borders
      ? await Promise.all(
          country.borders.map(async (borderCode) => {
            const res = await fetch(`${URL}cca3/${borderCode}`, {
              method: 'GET',
              headers: {
                // update with your user-agent
                'User-Agent':
                  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
                Accept: 'application/json; charset=UTF-8',
              },
            });
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
